/**
 * Contract tests for the Blueprint theme.
 *
 * The shared rules live in `theme-contract.ts`; what is asserted here is what
 * makes this theme *Blueprint* — a flat drawing whose two modes are two
 * different reprographic processes rather than one palette inverted.
 */

import { expect, it } from "bun:test";
import { describeThemeContract } from "./theme-contract";

const { day, night } = await describeThemeContract({
	name: "blueprint",
	cssUrl: new URL("./blueprint.css", import.meta.url),
	modeInvariant: [
		"--blueprint-prussian",
		"--blueprint-ink",
		"--blueprint-line",
		"--blueprint-line-soft",
		"--blueprint-paper",
		"--blueprint-paper-hi",
		"--blueprint-revision",
		"--blueprint-verdigris",
		"--blueprint-amber",
		"--blueprint-violet",
		"--blueprint-stroke",
		"--blueprint-stroke-heavy",
		"--blueprint-corner",
		"--blueprint-grid-pitch",
		"--font-blueprint-display",
		"--font-blueprint-utility",
	],
});

it("draws rather than fills — the ink and the ground swap between processes", () => {
	// Whiteprint is dark line on light paper; cyanotype is the reverse. If both
	// modes put the light value in the same role, one of them is an inversion.
	expect(day.get("--primary")).toBe("var(--blueprint-ink)");
	expect(night.get("--primary")).toBe("#6fb3e8");
});

it("keeps one stroke weight for the whole drawing", () => {
	expect(day.get("--blueprint-stroke")).toBe("1px");
	expect(day.get("--blueprint-stroke-heavy")).toBe("2px");
});
