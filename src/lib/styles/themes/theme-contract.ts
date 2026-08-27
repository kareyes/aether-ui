/**
 * The shared contract every aether-ui theme has to satisfy.
 *
 * A theme is a scoped re-declaration of the token layer, which gives it two
 * failure modes the base `theme.test.ts` cannot see:
 *
 *  1. **A token that only exists in the theme.** `.theme-<name>` may only
 *     *override* names `:root` already declares. A new name here compiles, but
 *     no `@theme inline` alias points at it, so no utility ever reads it.
 *
 *  2. **The day palette leaking into dark mode.** `.theme-<name>` and `.dark`
 *     are both one class deep, so the day palette wins on source order alone.
 *     Any mode-reactive token declared for day and forgotten for night keeps
 *     its daylight value on a night background — exactly the bug the base
 *     `.dark` block cannot produce, because it has nothing above it.
 *
 * Each theme's own test file supplies its name and its mode-invariant token
 * list and calls `describeThemeContract`; theme-specific assertions go beside
 * that call rather than in here.
 *
 * The brace matchers below use a mutable cursor against the house `const`-only
 * style, deliberately: brace matching is a scan, and expressing it functionally
 * costs more than it buys in a test-only parser. They are bounded on the input
 * length — an unbalanced brace has to fail, never spin.
 */

import { describe, expect, it } from "bun:test";
import {
	foregroundPairs,
	pairRatio,
	TEXT_ON_SURFACE,
	TEXT_SURFACES,
} from "./contrast";

type Rule = { readonly selector: string; readonly body: string };

const stripComments = (css: string): string =>
	css.replace(/\/\*[\s\S]*?\*\//g, "");

/** Top-level rules, brace-matched. Nested at-rules stay inside their body. */
const topLevelRules = (css: string): Rule[] => {
	const rules: Rule[] = [];
	let start = 0;
	for (let i = 0; i < css.length; i++) {
		if (css[i] !== "{") continue;
		const selector = css.slice(start, i).trim();
		let depth = 1;
		let j = i + 1;
		while (depth > 0 && j < css.length) {
			if (css[j] === "{") depth++;
			else if (css[j] === "}") depth--;
			j++;
		}
		rules.push({ selector, body: css.slice(i + 1, j - 1) });
		i = j - 1;
		start = j;
	}
	return rules;
};

/** Custom-property declarations in a rule body. */
const declarations = (body: string): Map<string, string> =>
	new Map(
		[...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [
			name,
			value.replace(/\s+/g, " ").trim(),
		]),
	);

const merge = (rules: Rule[]): Map<string, string> => {
	const all = new Map<string, string>();
	for (const rule of rules)
		for (const [name, value] of declarations(rule.body)) all.set(name, value);
	return all;
};

/** The body of a top-level block in the base sheet, brace-matched. */
const baseBlock = (css: string, opener: string): string => {
	const open = css.indexOf(opener);
	if (open === -1) throw new Error(`no ${opener} block in theme.css`);
	const start = open + opener.length;
	let depth = 1;
	let i = start;
	while (depth > 0 && i < css.length) {
		if (css[i] === "{") depth++;
		else if (css[i] === "}") depth--;
		i++;
	}
	if (depth > 0) throw new Error(`unbalanced ${opener} block in theme.css`);
	return css.slice(start, i - 1);
};

/**
 * The base `:root` and `.dark` blocks. `:root` is the only set of names a theme
 * is allowed to override; `.dark` is what a theme's night scope inherits for
 * everything it does not re-declare, which the contrast check needs.
 */
const baseScopes = async (): Promise<{
	root: Map<string, string>;
	dark: Map<string, string>;
}> => {
	const base = stripComments(
		await Bun.file(new URL("../theme.css", import.meta.url)).text(),
	);
	return {
		root: declarations(baseBlock(base, ":root {")),
		dark: declarations(baseBlock(base, ".dark {")),
	};
};

export type ThemeScopes = {
	/** Declarations in `.theme-<name>`. */
	readonly day: Map<string, string>;
	/** Declarations in the three `.dark` variants of the scope. */
	readonly night: Map<string, string>;
	/** Declarations in the base `:root`. */
	readonly root: Map<string, string>;
	/** Declarations in the base `.dark`, which a night scope inherits. */
	readonly rootDark: Map<string, string>;
};

export type ThemeContract = {
	/** Bare theme name — `"pelican"` for `.theme-pelican` / `pelican.css`. */
	readonly name: string;
	/** The theme stylesheet, normally `new URL("./<name>.css", import.meta.url)`. */
	readonly cssUrl: URL;
	/**
	 * Names the night block is allowed to leave alone: fixed identity hues that
	 * read the same after dark, structural constants, and font stacks — the
	 * things with no colour to get wrong.
	 */
	readonly modeInvariant: readonly string[];
};

/**
 * Registers the shared contract suite and hands back the parsed scopes so a
 * theme can assert on its own palette afterwards.
 */
export const describeThemeContract = async (
	contract: ThemeContract,
): Promise<ThemeScopes> => {
	const { name, cssUrl } = contract;
	const css = await Bun.file(cssUrl).text();
	const scope = `.theme-${name}`;
	const modeInvariant = new Set(contract.modeInvariant);

	const rules = topLevelRules(stripComments(css)).filter((rule) =>
		rule.selector.includes(scope),
	);
	const day = merge(
		rules.filter((rule) => rule.selector === scope && rule.body.includes("--")),
	);
	const night = merge(rules.filter((rule) => rule.selector.includes(".dark")));
	const { root, dark: rootDark } = await baseScopes();

	/** The theme's own namespace: `--<name>-*` and `--font-<name>-*`. */
	const isPaletteLocal = (token: string): boolean =>
		token.startsWith(`--${name}-`) || token.startsWith(`--font-${name}-`);

	describe(`${name} theme token contract`, () => {
		it("parses both scopes", () => {
			expect(day.size).toBeGreaterThan(50);
			expect(night.size).toBeGreaterThan(40);
			expect(root.size).toBeGreaterThan(50);
		});

		it("only overrides tokens the base :root declares", () => {
			// A name invented here has no --color-* alias pointing at it, so no
			// utility can ever read it.
			const invented = [...day.keys()].filter(
				(token) => !isPaletteLocal(token) && !root.has(token),
			);
			expect(invented).toEqual([]);
		});

		it("the night scope only overrides tokens the day scope declares", () => {
			expect([...night.keys()].filter((token) => !day.has(token))).toEqual([]);
		});

		it("every mode-reactive token the day scope sets has a night value", () => {
			// The leak guard. The theme scope outranks `.dark` on source order, so
			// a day-only literal survives into dark mode.
			const leaking = [...day]
				.filter(([token, value]) => {
					if (modeInvariant.has(token)) return false;
					// A pure alias re-resolves inside whichever scope wins.
					if (/^var\(--[\w-]+\)$/.test(value)) return false;
					return !night.has(token);
				})
				.map(([token, value]) => `${token}: ${value}`);
			expect(leaking).toEqual([]);
		});

		it("keeps role tokens paired with their foreground", () => {
			const unpaired: string[] = [];
			for (const [label, tokens] of [
				["day", day],
				["night", night],
			] as const) {
				for (const token of tokens.keys()) {
					if (token.endsWith("-foreground")) continue;
					const paired = `${token}-foreground`;
					if (root.has(paired) && !tokens.has(paired))
						unpaired.push(
							`${label}: ${token} is re-themed but ${paired} is not`,
						);
				}
			}
			expect(unpaired).toEqual([]);
		});

		it("re-points the derived reds inside the scope", () => {
			// `--danger: var(--destructive)` in the base :root is substituted on
			// the element that block matched. Scope the theme to a subtree and
			// that element is above it, so the alias keeps the base red —
			// overriding --destructive here never reaches it, and the theme
			// ships two different reds.
			expect(day.get("--danger")).toBe("var(--destructive)");
			expect(day.get("--danger-foreground")).toBe(
				"var(--destructive-foreground)",
			);
			expect(day.get("--status-danger")).toBe("var(--destructive)");
			expect(day.get("--aether-danger")).toBe("var(--destructive)");
			expect(night.get("--status-danger")).toBe("var(--destructive)");
		});

		it("derives the illustration accents from the role tokens", () => {
			expect(day.get("--aether-success")).toBe("var(--success)");
			expect(day.get("--aether-warning")).toBe("var(--warning)");
		});

		it("references no token it does not declare", () => {
			// Covers the chrome layer too, which reads --border / --ring / etc.
			const dangling = [
				...new Set(
					[...stripComments(css).matchAll(/var\((--[\w-]+)\)/g)].map(
						([, token]) => token,
					),
				),
			].filter((token) => !day.has(token) && !root.has(token));
			expect(dangling).toEqual([]);
		});

		it("clears WCAG AA on every pair it defines, in both modes", () => {
			// The assertion behind THEMES.md's contrast claim. Two pair families:
			// each --X-foreground on its --X fill, and the role tokens components
			// render as *text* on a surface — the family with no -foreground to
			// make an omission obvious, and the one that slips.
			const AA = 4.5;
			const failures: string[] = [];
			for (const [label, scope, base] of [
				["day", day, root],
				["night", night, new Map([...root, ...rootDark])],
			] as const) {
				const lookup = (token: string): string | undefined =>
					scope.get(token) ?? base.get(token);
				const has = (token: string): boolean => lookup(token) !== undefined;
				const pairs = [
					...foregroundPairs(scope.keys(), has),
					...TEXT_ON_SURFACE.filter((token) => scope.has(token)).flatMap(
						(token) =>
							TEXT_SURFACES.map(
								(surface) => [token, surface] as readonly [string, string],
							),
					),
				];
				for (const [foreground, background] of pairs) {
					const ratio = pairRatio(foreground, background, lookup);
					// `null` means one side is not a colour we can measure — a
					// gradient, a shadow, `transparent`. Not a failure.
					if (ratio !== null && ratio < AA)
						failures.push(
							`${label}: ${foreground} on ${background} is ${ratio.toFixed(2)}:1`,
						);
				}
			}
			expect(failures).toEqual([]);
		});

		it("carries the dark palette on all three scope selectors", () => {
			// Overlays portal to <body>. Whichever element ends up wearing the
			// theme class and whichever wears `.dark`, night has to win.
			const selectors = rules
				.map((rule) => rule.selector)
				.filter((selector) => selector.includes(".dark"));
			const joined = selectors.join(" ");
			for (const required of [
				`${scope}.dark`,
				`.dark ${scope}`,
				`${scope} .dark`,
			])
				expect(joined).toContain(required);
		});
	});

	return { day, night, root, rootDark };
};
