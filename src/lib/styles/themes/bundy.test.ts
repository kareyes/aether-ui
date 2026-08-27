/**
 * Contract tests for the Bundy theme.
 *
 * The shared rules live in `theme-contract.ts`; what is asserted here is what
 * makes this theme *Bundy* — a machine on a wall, read across a room and hit
 * with a thumb.
 */

import { expect, it } from "bun:test";
import { describeThemeContract } from "./theme-contract";

const { day, night } = await describeThemeContract({
	name: "bundy",
	cssUrl: new URL("./bundy.css", import.meta.url),
	modeInvariant: [
		"--bundy-ink",
		"--bundy-case",
		"--bundy-case-hi",
		"--bundy-enamel",
		"--bundy-enamel-hi",
		"--bundy-punch",
		"--bundy-red",
		"--bundy-green",
		"--bundy-amber",
		"--bundy-blue",
		// The readout is a lamp behind smoked glass — dark ground, bright
		// filament, the same at noon and at midnight.
		"--bundy-readout-ground",
		"--bundy-lamp",
		"--bundy-edge",
		"--bundy-corner",
		"--bundy-press",
		"--bundy-touch",
		"--font-bundy-display",
		"--font-bundy-utility",
	],
});

it("keeps a kiosk-sized hit target", () => {
	// 52px. This is the whole reason the theme exists; if it drifts below the
	// 44px platform minimum the theme is just a dark palette.
	expect(day.get("--bundy-touch")).toBe("3.25rem");
});

it("swaps enamel paint for the lit filament after dark", () => {
	expect(day.get("--primary")).toBe("var(--bundy-punch)");
	expect(night.get("--primary")).toBe("#f07b2a");
});

it("holds the readout steady across modes", () => {
	// The night block must not re-tint the glass; a readout that changes colour
	// with the room light is not a readout.
	expect(night.has("--bundy-readout-ground")).toBe(false);
	expect(night.has("--bundy-lamp")).toBe(false);
});
