/**
 * WCAG contrast maths for the theme contract.
 *
 * `THEMES.md` claims every palette in this directory clears AA (4.5:1) on each
 * foreground/background pair it defines, in both modes. That was a claim a
 * human had to re-check by hand, and it drifted — Pelican shipped five pairs
 * under the bar, one of them at 1.69:1, while the sentence still said
 * otherwise. This turns the claim into an assertion.
 *
 * Two things make it more than a ratio function:
 *
 *  1. **Alpha composites over the surface it actually sits on.** Capiz's
 *     surfaces carry an alpha, so a pair only holds over a known ground. A
 *     `--sidebar-*` fill lands on `--sidebar`, everything else on
 *     `--background`, and the page itself lands on white.
 *  2. **`var()` resolves through the scope first, then the base.** A theme
 *     overrides part of the token layer and inherits the rest, so a pair can
 *     straddle both.
 *
 * Colours that parse to nothing (a gradient, a shadow, `transparent`) are
 * skipped rather than guessed at — this file measures pairs it can be sure
 * about and leaves the rest to the eye.
 */

/** sRGB channel → linear light. */
const linear = (v: number): number =>
	v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;

/** An opaque or translucent colour, channels in 0–1. */
type Rgba = readonly [number, number, number, number];

const fromHex = (value: string): Rgba | null => {
	const raw = value.slice(1);
	const full =
		raw.length === 3 || raw.length === 4
			? raw
					.split("")
					.map((c) => c + c)
					.join("")
			: raw;
	if (full.length !== 6 && full.length !== 8) return null;
	if (!/^[0-9a-f]+$/i.test(full)) return null;
	const channel = (i: number): number =>
		parseInt(full.slice(i, i + 2), 16) / 255;
	return [
		channel(0),
		channel(2),
		channel(4),
		full.length === 8 ? channel(6) : 1,
	];
};

/** oklch → sRGB, via Oklab and linear sRGB. Out-of-gamut values clamp. */
const fromOklch = (l: number, c: number, hue: number, alpha: number): Rgba => {
	const h = (hue * Math.PI) / 180;
	const a = c * Math.cos(h);
	const b = c * Math.sin(h);
	const long = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const med = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const short = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
	const gamma = (u: number): number =>
		u <= 0.0031308 ? 12.92 * u : 1.055 * u ** (1 / 2.4) - 0.055;
	const clamp = (u: number): number => Math.min(1, Math.max(0, gamma(u)));
	return [
		clamp(4.0767416621 * long - 3.3077115913 * med + 0.2309699292 * short),
		clamp(-1.2684380046 * long + 2.6097574011 * med - 0.3413193965 * short),
		clamp(-0.0041960863 * long - 0.7034186147 * med + 1.707614701 * short),
		alpha,
	];
};

const alphaOf = (raw: string | undefined): number => {
	if (raw === undefined) return 1;
	const n = Number.parseFloat(raw);
	return raw.trim().endsWith("%") ? n / 100 : n;
};

/** How deep a `var()` chain may go before we call it a cycle. */
const MAX_VAR_DEPTH = 12;

/** Resolves one token value to a colour, following `var()` through `lookup`. */
export const parseColor = (
	value: string,
	lookup: (token: string) => string | undefined,
	depth = 0,
): Rgba | null => {
	if (depth > MAX_VAR_DEPTH) return null;
	const v = value.trim();

	const alias = v.match(/^var\((--[\w-]+)\)$/);
	if (alias) {
		const next = lookup(alias[1] as string);
		return next === undefined ? null : parseColor(next, lookup, depth + 1);
	}

	if (v.startsWith("#")) return fromHex(v);

	const oklch = v.match(
		/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?))?\s*\)$/,
	);
	if (oklch) {
		const lightness =
			oklch[2] === "%"
				? Number.parseFloat(oklch[1] as string) / 100
				: Number.parseFloat(oklch[1] as string);
		return fromOklch(
			lightness,
			Number.parseFloat(oklch[3] as string),
			Number.parseFloat(oklch[4] as string),
			alphaOf(oklch[5]),
		);
	}

	const rgb = v.match(
		/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[/,]\s*([\d.]+%?))?\s*\)$/,
	);
	if (rgb) {
		const channel = (i: number): number =>
			Number.parseFloat(rgb[i] as string) / 255;
		return [channel(1), channel(2), channel(3), alphaOf(rgb[4])];
	}

	return null;
};

/** Source-over composite of `top` onto an opaque `ground`. */
const over = (top: Rgba, ground: Rgba): Rgba => {
	if (top[3] >= 1) return top;
	const mix = (i: 0 | 1 | 2): number =>
		top[i] * top[3] + ground[i] * (1 - top[3]);
	return [mix(0), mix(1), mix(2), 1];
};

const relativeLuminance = (c: Rgba): number =>
	0.2126 * linear(c[0]) + 0.7152 * linear(c[1]) + 0.0722 * linear(c[2]);

/** WCAG 2.x contrast ratio between two opaque colours. */
export const contrastRatio = (a: Rgba, b: Rgba): number => {
	const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
		(x, y) => y - x,
	) as [number, number];
	return (lighter + 0.05) / (darker + 0.05);
};

const WHITE: Rgba = [1, 1, 1, 1];

/**
 * Contrast of `foreground` on `background`, with both composited down to the
 * surface each actually sits on. Returns `null` when either side is not a
 * colour this module can parse.
 */
export const pairRatio = (
	foregroundToken: string,
	backgroundToken: string,
	lookup: (token: string) => string | undefined,
): number | null => {
	const fgValue = lookup(foregroundToken);
	const bgValue = lookup(backgroundToken);
	if (fgValue === undefined || bgValue === undefined) return null;

	const fg = parseColor(fgValue, lookup);
	const bg = parseColor(bgValue, lookup);
	if (fg === null || bg === null) return null;

	// A --sidebar-* fill lands on the sidebar; everything else on the page.
	const groundToken =
		backgroundToken.startsWith("--sidebar") && backgroundToken !== "--sidebar"
			? "--sidebar"
			: "--background";
	const groundValue = lookup(groundToken);
	const ground =
		groundValue === undefined ? null : parseColor(groundValue, lookup);
	const page =
		groundToken === "--background"
			? WHITE
			: over(parseColor(lookup("--background") ?? "", lookup) ?? WHITE, WHITE);

	const surface = over(ground ?? WHITE, page);
	const opaqueBg = over(bg, surface);
	return contrastRatio(over(fg, opaqueBg), opaqueBg);
};

/**
 * Role tokens components render as *text* on a surface rather than as a fill —
 * `text-destructive` on a validation message, `text-info` in an alert. This is
 * the pair THEMES.md warns usually slips, because nothing pairs these with a
 * `-foreground` to make the omission obvious.
 */
export const TEXT_ON_SURFACE: readonly string[] = [
	"--primary",
	"--destructive",
	"--success",
	"--warning",
	"--info",
	"--muted-foreground",
];

/** The surfaces those role tokens are read against. */
export const TEXT_SURFACES: readonly string[] = ["--background", "--card"];

/**
 * Every `--X-foreground` / `--X` pair present in `tokens`. `--foreground`
 * pairs with `--background`; the rest strip the suffix.
 */
export const foregroundPairs = (
	tokens: Iterable<string>,
	has: (token: string) => boolean,
): readonly (readonly [string, string])[] =>
	[...tokens]
		.filter((token) => token.endsWith("-foreground"))
		.map((token) =>
			token === "--foreground"
				? (["--foreground", "--background"] as const)
				: ([token, token.slice(0, -"-foreground".length)] as const),
		)
		.filter(([, background]) => has(background));
