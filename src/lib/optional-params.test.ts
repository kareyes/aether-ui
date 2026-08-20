import { describe, expect, it } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * The package ships .svelte files as source, so consumers compile them with
 * their own svelte. Svelte below 5.56.4 strips the type from an optional
 * parameter but leaves the `?` behind, emitting `function open(newConfig?)` -
 * not valid JavaScript - and their build dies with "Expected ',', got '?'".
 *
 * peerDependencies allows svelte ^5.0.0, so the fix is to avoid the syntax in
 * implementation positions rather than to force consumers to upgrade. Write
 * `x: T | undefined`, or give the parameter a default, instead of `x?: T`.
 *
 * Only the parameter's own `?` matters. A `?` nested inside a type literal -
 * `({ hour }: { hour?: number })` - is erased with the rest of the type, so
 * parameter lists are scanned with nested groups removed.
 *
 * `{#snippet}` parameters are not checked: they go through a different code
 * path and compile correctly even on svelte 5.39.12, verified against
 * dropdown-menu.svelte.
 */
const DECLARATIONS = [
	/function\s+\w+\s*\(/g,
	/(?:const|let|var)\s+\w+\s*=\s*(?:async\s+)?\(/g,
];

/** Text between `(` at `open` and its matching `)`. */
function parameterList(source: string, open: number): string {
	const pairs: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
	const stack: string[] = [];
	for (let i = open; i < source.length; i++) {
		const char = source[i];
		if (pairs[char]) stack.push(pairs[char]);
		else if (char === stack.at(-1)) {
			stack.pop();
			if (stack.length === 0) return source.slice(open + 1, i);
		}
	}
	return "";
}

/** Drop anything nested inside (), [], {} or <> so only top-level params remain. */
function topLevelOnly(params: string): string {
	let depth = 0;
	let out = "";
	for (const char of params) {
		if ("([{<".includes(char)) depth++;
		else if (")]}>".includes(char)) depth--;
		else if (depth === 0) out += char;
	}
	return out;
}

function svelteFiles(dir: string, found: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) svelteFiles(path, found);
		else if (entry.endsWith(".svelte")) found.push(path);
	}
	return found;
}

describe("shipped svelte sources", () => {
	it("declare no optional parameters in implementation positions", () => {
		const offenders: string[] = [];

		for (const file of svelteFiles("src/lib")) {
			const source = readFileSync(file, "utf8");
			for (const declaration of DECLARATIONS) {
				for (const match of source.matchAll(declaration)) {
					const open = match.index + match[0].length - 1;
					if (/\w\s*\?\s*:/.test(topLevelOnly(parameterList(source, open)))) {
						offenders.push(`${file}: ${match[0].trim()}...`);
					}
				}
			}
		}

		expect(offenders).toEqual([]);
	});
});
