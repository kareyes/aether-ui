/**
 * Guards the colour vocabulary the library settled on.
 *
 * Three terms, three distinct jobs:
 *   destructive — the red *intent* variant on action-bearing components
 *                 (button, checkbox, radio, slider, switch, alert-dialog,
 *                 dropdown-menu-item). Resolves to `--destructive`.
 *   error       — the red *state* on components that report rather than act
 *                 (alert, sonner, stepper, timeline, field validation).
 *                 Also resolves to `--destructive`.
 *   red         — the red *hue* on `color` palette axes (badge, avatar,
 *                 timeline, button). A Tailwind palette name, not a role.
 *
 * `danger` is retired as a role token and as a component variant name. It
 * survives in three places, all deliberate: the `--status-*` scale, the
 * `--aether-*` illustration accents, and a component `color` axis whose other
 * members are `info` / `warning` / `success` — badge's role colours. The reason
 * is the same in all three: the siblings are *states*, and "destructive" is an
 * action word that would read wrong beside them. The value still resolves to
 * `--destructive` in every case; only the name differs, which is what the
 * `-danger` utility and `var(--danger)` guards below keep true.
 *
 * Each surviving declaration has to say which case it is, in the comment block
 * immediately above it — `DEPRECATED` for the aliases on their way out,
 * `STATES AXIS` for badge's. Deliberately not inferred from the siblings a file
 * happens to declare: `alert`, `sonner`, `alert-dialog` and `button` all list
 * `success` / `warning` / `info` somewhere, so a file-shaped test hands a free
 * pass to the four components the `error` rule was written for, and lets
 * `button`'s deprecated alias outlive its own DEPRECATED note.
 */

import { Glob } from "bun";
import { describe, expect, it } from "bun:test";

const componentsDir = new URL("../components/", import.meta.url).pathname;

const sources = await Promise.all(
	[...new Glob("**/*.{svelte,ts}").scanSync(componentsDir)]
		// docs/ is prose and stories; it is swept separately.
		.filter((path) => !path.includes("/docs/"))
		.map(
			async (path) =>
				[path, await Bun.file(componentsDir + path).text()] as const,
		),
);

/** Lines matching `pattern`, as "path:line: text" for a readable failure. */
const hits = (pattern: RegExp): string[] =>
	sources.flatMap(([path, text]) =>
		text
			.split("\n")
			.map((line, i) => [i + 1, line] as const)
			.filter(([, line]) => pattern.test(line))
			.map(([n, line]) => `${path}:${n}: ${line.trim().slice(0, 100)}`),
	);

describe("colour vocabulary", () => {
	it("no component uses a -danger utility class", () => {
		// `--danger` is a deprecated alias kept for published consumers only.
		expect(
			hits(/\b(bg|text|border|ring|fill|stroke|from|to|divide)-danger\b/),
		).toEqual([]);
	});

	it("no component references var(--danger)", () => {
		expect(hits(/var\(--danger[\w-]*\)/)).toEqual([]);
	});

	it("no component declares an unannotated `danger` variant or colour key", () => {
		// One escape hatch, and it has to be written down: a note in the comment
		// block immediately above the key saying which survivor this is.
		// `DEPRECATED` covers switch's and button's aliases, `STATES AXIS` covers
		// badge's `color` axis. No note, no pass.
		const ANNOTATION_WINDOW = 6;
		const ANNOTATED = /@deprecated|DEPRECATED|STATES AXIS/;
		const declarations = sources.flatMap(([path, text]) => {
			const lines = text.split("\n");
			return lines
				.map((line, i) => [i, line] as const)
				.filter(([i, line]) => {
					if (!/^\s*danger:/.test(line)) return false;
					const preceding = lines.slice(Math.max(0, i - ANNOTATION_WINDOW), i);
					return !preceding.some((l) => ANNOTATED.test(l));
				})
				.map(([i, line]) => `${path}:${i + 1}: ${line.trim()}`);
		});
		expect(declarations).toEqual([]);
	});

	it("no component hardcodes a palette class where a role token applies", () => {
		// Four directories own a literal-colour vocabulary of their own, where a
		// palette class is the correct answer and a role token would be wrong:
		// badge/ and avatar/ expose an explicit hue axis (red|orange|...|gray);
		// code-block/ ships syntax themes, which are colour systems in their own
		// right; dark-mode/ paints a sun amber because that is what a sun is.
		// Everywhere else, a hue that means success/warning/error/info has to
		// come from the token layer, or a theme moves half the component.
		//
		// This covers `text-` and every role hue deliberately. It used to check
		// only `bg|border|ring|fill|stroke` against `red`, which is how alert,
		// sonner and stepper kept `text-red-900` on token-driven grounds through
		// a green suite, and how slider and alert-dialog were missed entirely.
		const PALETTE_OWNERS = [
			"ui/badge/",
			"ui/avatar/",
			"ui/code-block/",
			"ui/dark-mode/",
		];
		const offenders = sources
			.filter(([path]) => !PALETTE_OWNERS.some((dir) => path.startsWith(dir)))
			.flatMap(([path, text]) =>
				text
					.split("\n")
					.map((line, i) => [i + 1, line] as const)
					.filter(([, line]) =>
						/\b(bg|text|border|ring|fill|stroke|from|to|divide)-(red|green|yellow|blue|orange|amber)-\d{2,3}\b/.test(
							line,
						),
					)
					.map(([n, line]) => `${path}:${n}: ${line.trim().slice(0, 100)}`),
			);
		expect(offenders).toEqual([]);
	});

	it("no component puts a bare text-white on a role-token fill", () => {
		// The workaround `--destructive-foreground` was mapped to eliminate. A
		// role fill moves per theme; a literal white label does not follow it.
		const offenders = hits(
			/\bbg-(destructive|success|warning|info|primary)\b(?![\w/-])[^"'`]*\btext-white\b/,
		);
		expect(offenders).toEqual([]);
	});
});
