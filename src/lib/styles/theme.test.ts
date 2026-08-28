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

describe("theme.css grouped-controls block", () => {
	// `input-group` and `button-group` are compositions whose parts give up
	// their own chrome, and the components say that with Tailwind utilities —
	// which lose to every unlayered rule in `styles/themes/*.css` whatever the
	// specificity. The block restates them unlayered; these guard the two
	// properties that make it work.
	const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");

	it("strips the input-group control with a selector a theme cannot outrank", () => {
		// Two attributes on the control plus one on the shell puts the rule at
		// three, above a theme's two-deep `.theme-x [data-slot="input"]` field
		// rule. Collapse the repeat as a tidy-up and every theme paints a whole
		// bordered field inside the group again.
		expect(stripped).toContain(
			'[data-slot="input-group-control"][data-slot="input-group-control"]',
		);
	});

	it("moves focus and invalid onto the input-group shell", () => {
		// The control has no border left to show either state on.
		expect(stripped).toContain(
			'[data-slot="input-group"]:has([data-slot="input-group-control"]:focus-visible)',
		);
		expect(stripped).toMatch(
			/\[data-slot="input-group"\]:has\(\s*\[data-slot="input-group-control"\]\[aria-invalid="true"\]\s*\)/,
		);
	});

	it("collapses both seams of a button group in both orientations", () => {
		// The declarations, not the selector text: a seam can be selected several
		// correct ways — the trailing one has to skip the hidden form shim a
		// Select leaves behind — and a guard pinned to one spelling fails the
		// next correct rewrite instead of the next regression.
		const seamRules = (orientation: string): string[] =>
			[
				...stripped.matchAll(
					new RegExp(
						`\\[data-slot="button-group"\\]\\[data-orientation="${orientation}"\\]([^{]*)\\{([^}]*)\\}`,
						"g",
					),
				),
			].map(([, , body]) => body);

		for (const [orientation, leading, trailing] of [
			["horizontal", "border-left-width", "border-top-right-radius"],
			["vertical", "border-top-width", "border-bottom-right-radius"],
		] as const) {
			const bodies = seamRules(orientation);
			expect(bodies.length).toBeGreaterThan(0);
			// One rule sheds the shared edge, another the trailing radii.
			expect(bodies.some((body) => body.includes(`${leading}: 0`))).toBe(true);
			expect(bodies.some((body) => body.includes(`${trailing}: 0`))).toBe(true);
		}
	});

	it("skips the hidden form shim when squaring the trailing seam", () => {
		// bits-ui leaves an `<input aria-hidden="true">` after a Select's trigger,
		// so the last child of a group is not always its last segment. Selecting
		// on `:not(:last-child)` squared the visible trigger's outer corner.
		// `border-bottom-right-radius` is the one declaration unique to the two
		// trailing rules: the vertical *leading* seam also sheds a top-right
		// radius, and the horizontal one a bottom-left.
		const trailing = [
			...stripped.matchAll(
				/\[data-slot="button-group"\]\[data-orientation="\w+"\]([^{]*)\{([^}]*border-bottom-right-radius[^}]*)\}/g,
			),
		].map(([, selector]) => selector.replace(/\s+/g, " ").trim());
		expect(trailing.length).toBe(2);
		for (const selector of trailing) {
			expect(selector).toContain('aria-hidden="true"');
			expect(selector).not.toContain(":last-child");
		}
	});
});
