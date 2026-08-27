/**
 * Contract tests for the Pelican theme.
 *
 * The shared rules live in `theme-contract.ts`; what is asserted here is what
 * makes this theme *Pelican* — a wooden menu whose fixed hues are the palette's
 * identity and whose night mode is the same farm after dark.
 */

import { expect, it } from "bun:test";
import { describeThemeContract } from "./theme-contract";

const { day, night } = await describeThemeContract({
	name: "pelican",
	cssUrl: new URL("./pelican.css", import.meta.url),
	modeInvariant: [
		"--pelican-ink",
		"--pelican-wood-dark",
		"--pelican-wood",
		"--pelican-wood-light",
		"--pelican-parchment",
		"--pelican-parchment-hi",
		"--pelican-parchment-2",
		"--pelican-parchment-3",
		"--pelican-crop",
		"--pelican-crop-deep",
		"--pelican-sky",
		"--pelican-sky-deep",
		"--pelican-coin",
		"--pelican-coin-deep",
		"--pelican-heart",
		"--pelican-pumpkin",
		"--pelican-press-depth",
		"--pelican-outline-width",
		"--pelican-corner",
		"--font-pelican-display",
		"--font-pelican-utility",
	],
});

it("keeps the pixel grid — no radius the faces can fight", () => {
	expect(day.get("--pelican-corner")).toBe("3px");
	expect(day.get("--radius")).toBe("0.25rem");
});

it("climbs the red at night instead of deepening it", () => {
	// #c0342d sits on parchment by day; at night the same red sits on dark wood
	// and has to lift, or the button label on it goes under AA.
	expect(day.get("--destructive")).toBe("var(--pelican-heart)");
	expect(night.get("--destructive")).toBe("#ec736b");
});

it("splits the lit hues from the ones that carry text", () => {
	// The lit values are the palette's identity and stay on fills; as text on
	// parchment they run 1.69–2.97:1, so the role tokens take the deep
	// companions and hand the fill a parchment label instead of an ink one.
	expect(day.get("--success")).toBe("var(--pelican-crop-deep)");
	expect(day.get("--warning")).toBe("var(--pelican-coin-deep)");
	expect(day.get("--info")).toBe("var(--pelican-sky-deep)");
	for (const role of ["--success", "--warning", "--info"])
		expect(day.get(`${role}-foreground`)).toBe("var(--pelican-parchment)");
	// The lit hues keep the fills they were chosen for.
	expect(day.get("--chart-1")).toBe("var(--pelican-crop)");
	expect(day.get("--status-warning")).toBe("var(--pelican-coin)");
});
