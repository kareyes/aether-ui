/**
 * Contract tests for the Capiz theme.
 *
 * The shared rules live in `theme-contract.ts`; what is asserted here is what
 * makes this theme *Capiz* — panes you can see through, and a window that
 * transmits after dark instead of reflecting.
 */

import { expect, it } from "bun:test";
import { describeThemeContract } from "./theme-contract";

const { day, night } = await describeThemeContract({
	name: "capiz",
	cssUrl: new URL("./capiz.css", import.meta.url),
	modeInvariant: [
		"--capiz-shell",
		"--capiz-sea",
		"--capiz-sea-hi",
		"--capiz-lagoon",
		"--capiz-coral",
		"--capiz-sand",
		"--capiz-frond",
		"--capiz-dusk",
		"--capiz-corner",
		"--capiz-corner-sm",
		"--capiz-hairline",
		// The blur radius is the material. It does not change with the room
		// light any more than the shell does.
		"--capiz-blur",
		"--font-capiz-display",
		"--font-capiz-body",
	],
});

/** `rgb(… / α)` with α strictly below 1 — an actually translucent value. */
const isTranslucent = (value: string | undefined): boolean => {
	const alpha = value?.match(/\/\s*(0?\.\d+)\s*\)/)?.[1];
	return alpha !== undefined && Number(alpha) < 1;
};

it("keeps the panes translucent in both modes", () => {
	// The premise of the theme. A solid --card here is not a duller Capiz, it
	// is a different theme: every chrome rule below blurs what is behind these
	// surfaces, and blurring an opaque fill renders nothing.
	for (const scope of [day, night])
		for (const token of ["--card", "--muted", "--accent"])
			expect(isTranslucent(scope.get(token))).toBe(true);
});

it("keeps popovers more opaque than cards", () => {
	// A card floats over a page you are allowed to see. A popover covers what
	// you were just reading, and at 0.62 the text underneath shows through it.
	const alpha = (value: string | undefined): number =>
		Number(value?.match(/\/\s*(0?\.\d+)\s*\)/)?.[1] ?? 1);
	expect(alpha(day.get("--popover"))).toBeGreaterThan(alpha(day.get("--card")));
});

it("never goes square", () => {
	expect(day.get("--capiz-corner")).toBe("1rem");
	expect(day.get("--radius")).toBe("1rem");
	expect(night.get("--radius")).toBe("1rem");
});

it("transmits after dark — the lagoon comes through the pane", () => {
	// By day the shell reflects and the primary is the deep sea behind it. At
	// night the pane transmits, so the primary becomes the light coming out.
	expect(day.get("--primary")).toBe("var(--capiz-sea)");
	expect(night.get("--primary")).toBe("var(--capiz-lagoon)");
});
