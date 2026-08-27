/**
 * Contract tests for the Alloy theme.
 *
 * The shared rules live in `theme-contract.ts`; what is asserted here is what
 * makes this theme *Alloy* — one tolerance held everywhere, and exactly one
 * anodized colour on the object.
 */

import { expect, it } from "bun:test";
import { describeThemeContract } from "./theme-contract";

const { day, night } = await describeThemeContract({
	name: "alloy",
	cssUrl: new URL("./alloy.css", import.meta.url),
	modeInvariant: [
		"--alloy-anodize",
		"--alloy-anodize-hi",
		"--alloy-bronze",
		"--alloy-violet",
		"--alloy-teal",
		"--alloy-gold",
		"--alloy-red",
		// The tolerances. A milled part does not get rounder in the dark.
		"--alloy-corner",
		"--alloy-corner-sm",
		"--alloy-hairline",
		"--alloy-snap",
		"--font-alloy-display",
		"--font-alloy-utility",
	],
});

it("holds one radius and one seam width", () => {
	// The theme reads as machined because these never vary. A second radius
	// anywhere is the thing that makes it read as generic instead.
	expect(day.get("--alloy-corner")).toBe("0.375rem");
	expect(day.get("--alloy-hairline")).toBe("1px");
	expect(day.get("--radius")).toBe("0.375rem");
	expect(night.get("--radius")).toBe("0.375rem");
});

it("puts exactly one anodized colour on the object", () => {
	// Primary, ring and the illustration accent are the oxide layer. If they
	// drift apart the object looks assembled from two machines.
	expect(day.get("--primary")).toBe("var(--alloy-anodize)");
	expect(day.get("--ring")).toBe("var(--alloy-anodize)");
	expect(day.get("--illustration-primary")).toBe("var(--alloy-anodize)");
	expect(night.get("--primary")).toBe("var(--alloy-anodize-hi)");
	expect(night.get("--ring")).toBe("var(--alloy-anodize-hi)");
});

it("steps the accent up the ramp after dark", () => {
	// A deep anodize is invisible on graphite, so the accent climbs rather
	// than staying put.
	expect(night.get("--primary")).not.toBe(day.get("--primary"));
});

it("keeps the chart ramp on the anodizing series", () => {
	// Not a rainbow: five oxide thicknesses, in voltage order.
	expect([
		day.get("--chart-1"),
		day.get("--chart-2"),
		day.get("--chart-3"),
		day.get("--chart-4"),
		day.get("--chart-5"),
	]).toEqual([
		"var(--alloy-anodize)",
		"var(--alloy-teal)",
		"var(--alloy-bronze)",
		"var(--alloy-violet)",
		"var(--alloy-gold)",
	]);
});
