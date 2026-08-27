/**
 * Contract tests for the Ledger theme.
 *
 * The shared rules live in `theme-contract.ts`; what is asserted here is what
 * makes this theme *Ledger* — square corners and figures that line up.
 */

import { expect, it } from "bun:test";
import { describeThemeContract } from "./theme-contract";

const { day, night } = await describeThemeContract({
	name: "ledger",
	cssUrl: new URL("./ledger.css", import.meta.url),
	modeInvariant: [
		"--ledger-ink",
		"--ledger-green",
		"--ledger-green-deep",
		"--ledger-green-hi",
		"--ledger-red",
		"--ledger-blue",
		"--ledger-ochre",
		"--ledger-violet",
		"--ledger-stock",
		"--ledger-stock-hi",
		"--ledger-bar",
		"--ledger-bar-deep",
		"--ledger-rule-width",
		"--ledger-rule-heavy",
		"--ledger-corner",
		"--font-ledger-display",
		"--font-ledger-utility",
	],
});

it("keeps printed matter square in both modes", () => {
	expect(day.get("--ledger-corner")).toBe("0px");
});

it("reads its red from the fixed ink in day and lifts it after dark", () => {
	// Red ink on stock can deepen; on a dark ground it has to climb, or the
	// negative figures go muddy.
	expect(day.get("--destructive")).toBe("var(--ledger-red)");
	expect(night.get("--destructive")).not.toBe("var(--ledger-red)");
});
