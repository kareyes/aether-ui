/**
 * Contract tests for the Sampaguita theme.
 *
 * The shared rules live in `theme-contract.ts`; what is asserted here is what
 * makes this theme *Sampaguita* — soft layered light instead of edges, and a
 * flower that opens after dark.
 */

import { expect, it } from "bun:test";
import { describeThemeContract } from "./theme-contract";

const { day, night } = await describeThemeContract({
	name: "sampaguita",
	cssUrl: new URL("./sampaguita.css", import.meta.url),
	modeInvariant: [
		"--sampaguita-petal",
		"--sampaguita-petal-2",
		"--sampaguita-leaf",
		"--sampaguita-leaf-hi",
		"--sampaguita-stem",
		"--sampaguita-stamen",
		"--sampaguita-bougainvillea",
		"--sampaguita-sky",
		"--sampaguita-earth",
		"--sampaguita-gumamela",
		"--sampaguita-corner",
		"--sampaguita-corner-sm",
		"--sampaguita-hairline",
		"--font-sampaguita-display",
		"--font-sampaguita-body",
	],
});

it("never goes square", () => {
	expect(day.get("--sampaguita-corner")).toBe("0.875rem");
	expect(day.get("--radius")).toBe("0.875rem");
	expect(night.get("--radius")).toBe("0.875rem");
});

it("opens the flower after dark — petal on top of leaf, not leaf on black", () => {
	// The deep leaf green is the daylight primary; in the night garden it
	// disappears, so the primary becomes the flower sitting on it.
	expect(day.get("--primary")).toBe("var(--sampaguita-leaf)");
	expect(night.get("--primary")).toBe("#6fbe95");
});
