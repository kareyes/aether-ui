/**
 * Contract tests for the Reticle theme.
 *
 * The shared rules live in `theme-contract.ts`; what is asserted here is what
 * makes this theme *Reticle* — an instrument overlay, square, with amber as
 * the signal and caution kept clear of it.
 */

import { expect, it } from "bun:test";
import { describeThemeContract } from "./theme-contract";

const { day, night } = await describeThemeContract({
	name: "reticle",
	cssUrl: new URL("./reticle.css", import.meta.url),
	modeInvariant: [
		// The signal set: each carries a lit value and a daylight value, so
		// neither block re-tints them.
		"--reticle-phosphor",
		"--reticle-phosphor-deep",
		"--reticle-cyan",
		"--reticle-cyan-deep",
		"--reticle-alert",
		"--reticle-alert-deep",
		"--reticle-lock",
		"--reticle-lock-deep",
		"--reticle-caution",
		"--reticle-caution-deep",
		"--reticle-violet",
		"--reticle-corner",
		"--reticle-bracket",
		"--reticle-stroke",
		"--reticle-grid",
		"--reticle-snap",
		"--font-reticle-display",
		"--font-reticle-utility",
	],
});

it("stays square", () => {
	expect(day.get("--reticle-corner")).toBe("2px");
	expect(day.get("--radius")).toBe("2px");
	expect(night.get("--radius")).toBe("2px");
});

it("runs on amber, not cyan", () => {
	// The one decision that keeps this out of the generic dark-with-a-glow
	// bucket. Cyan is demoted to informational data.
	expect(night.get("--primary")).toBe("var(--reticle-phosphor)");
	expect(night.get("--info")).toBe("var(--reticle-cyan)");
	expect(day.get("--primary")).toBe("var(--reticle-phosphor-deep)");
	expect(day.get("--info")).toBe("var(--reticle-cyan-deep)");
});

it("never puts two ambers on one panel", () => {
	// Amber is the primary here, so caution has to be a different signal or
	// the operator reads a warning as a call to action.
	expect(day.get("--warning")).not.toBe(day.get("--primary"));
	expect(night.get("--warning")).not.toBe(night.get("--primary"));
	expect(night.get("--warning")).toBe("var(--reticle-caution)");
});

it("deepens the phosphor for daylight and lights it again after dark", () => {
	// The lit amber is unreadable as text on a pale panel; the deep amber
	// disappears on an unlit one. Both values exist for that reason.
	expect(day.get("--primary")).not.toBe(night.get("--primary"));
	expect(day.get("--ring")).toBe(day.get("--primary"));
	expect(night.get("--ring")).toBe(night.get("--primary"));
});

it("keeps the bracket long enough to read as a bracket", () => {
	// Below ~8px it reads as a rounding artefact; at the full edge it is just
	// a border and the theme loses its one structural idea.
	expect(day.get("--reticle-bracket")).toBe("10px");
});
