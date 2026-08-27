/**
 * Contract tests for the design-token layer.
 *
 * These exist because `--destructive-foreground` was declared in `:root` and
 * `.dark` for months but never mapped into `@theme inline`, so
 * `text-destructive-foreground` did not exist as a utility. Components worked
 * around the hole by reaching for `text-white` or, worse, borrowing
 * `text-danger-foreground` from a different red family — which rendered a
 * near-black glyph in dark mode where every other destructive surface was
 * white. A missing mapping is invisible at review time; this is the guard.
 */

import { describe, expect, it } from "bun:test";

const css = await Bun.file(new URL("./theme.css", import.meta.url)).text();

/** Extract the body of a top-level block, brace-matched. */
const block = (opener: string): string => {
	const start = css.indexOf(opener);
	if (start === -1) throw new Error(`no ${opener} block in theme.css`);
	let depth = 1;
	let i = start + opener.length;
	// Bounded on purpose. Unbounded, an unbalanced brace walks `i` past the end
	// of the string, where `css[i]` is undefined and matches neither branch —
	// the loop never terminates and CI hangs instead of reporting the stray
	// brace this file exists to catch.
	while (depth > 0 && i < css.length) {
		if (css[i] === "{") depth++;
		else if (css[i] === "}") depth--;
		i++;
	}
	if (depth > 0) throw new Error(`unbalanced ${opener} block in theme.css`);
	return css.slice(start + opener.length, i - 1);
};

/** Custom-property declarations in a block, comments stripped. */
const declarations = (body: string): Map<string, string> =>
	new Map(
		[
			...body
				.replace(/\/\*[\s\S]*?\*\//g, "")
				.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g),
		].map(([, name, value]) => [name, value.replace(/\s+/g, " ").trim()]),
	);

const root = declarations(block(":root {"));
const dark = declarations(block(".dark {"));
const theme = declarations(block("@theme inline {"));

describe("theme.css token contract", () => {
	it("every --color-* alias points at a token declared in :root", () => {
		const dangling: string[] = [];
		for (const [name, value] of theme) {
			for (const [, ref] of value.matchAll(/var\((--[\w-]+)\)/g)) {
				// --color-* may reference another --color-* (e.g. --color-primary-light
				// is mixed from --color-primary); only bare tokens must exist in :root.
				if (ref.startsWith("--color-")) {
					if (!theme.has(ref)) dangling.push(`${name} -> ${ref}`);
				} else if (!root.has(ref)) {
					dangling.push(`${name} -> ${ref}`);
				}
			}
		}
		expect(dangling).toEqual([]);
	});

	it("an exposed role token exposes its paired foreground too", () => {
		// The rule that would have caught the --destructive-foreground hole.
		const unpaired = [...root.keys()]
			.filter((name) => name.endsWith("-foreground"))
			// Strip both the leading "--" and the "-foreground" suffix, leaving
			// the bare role name (destructive, success, ...).
			.map((name) => name.slice(2, -"-foreground".length))
			.filter(
				(role) =>
					theme.has(`--color-${role}`) &&
					!theme.has(`--color-${role}-foreground`),
			)
			.map(
				(role) =>
					`--color-${role} is exposed but --color-${role}-foreground is not`,
			);
		expect(unpaired).toEqual([]);
	});

	it(".dark only overrides tokens :root already declares", () => {
		// A token introduced only in .dark is undefined in light mode.
		expect([...dark.keys()].filter((name) => !root.has(name))).toEqual([]);
	});

	it("--destructive is the single red role token", () => {
		// --danger survives only as a deprecated alias; it must not carry a
		// literal value of its own, or the two reds drift apart again.
		expect(root.get("--danger")).toBe("var(--destructive)");
		expect(root.get("--danger-foreground")).toBe(
			"var(--destructive-foreground)",
		);
		expect(dark.has("--danger")).toBe(false);
		expect(dark.has("--danger-foreground")).toBe(false);
	});

	it("the status scale derives its red rather than copying it", () => {
		expect(root.get("--status-danger")).toBe("var(--destructive)");
		expect(dark.get("--status-danger")).toBe("var(--destructive)");
	});

	it("illustration accents derive from role tokens", () => {
		expect(root.get("--aether-danger")).toBe("var(--destructive)");
		expect(root.get("--aether-success")).toBe("var(--success)");
		expect(root.get("--aether-warning")).toBe("var(--warning)");
	});
});
