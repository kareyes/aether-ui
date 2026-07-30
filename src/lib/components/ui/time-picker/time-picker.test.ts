import { describe, it, expect } from "bun:test";
import {
	buildHourOptions,
	buildStepOptions,
	formatTimeParts,
	hourSpan,
	isSpanDisabled,
	isWithinBounds,
	minuteSpan,
	normalizeStep,
	nowOnGrid,
	pad,
	periodOf,
	periodSpan,
	secondSpan,
	snapPartsToStep,
	snapToStep,
	to12Hour,
	to24Hour,
	toSeconds,
	truncateToGranularity,
} from "./time-picker-utils.js";
import { timePickerVariants } from "./time-picker-variants.js";

describe("toSeconds", () => {
	it("counts from midnight", () => {
		expect(toSeconds({ hour: 0, minute: 0, second: 0 })).toBe(0);
		expect(toSeconds({ hour: 1, minute: 1, second: 1 })).toBe(3661);
		expect(toSeconds({ hour: 23, minute: 59, second: 59 })).toBe(86399);
	});
});

describe("periodOf", () => {
	it("splits the day at noon", () => {
		expect(periodOf(0)).toBe("AM");
		expect(periodOf(11)).toBe("AM");
		expect(periodOf(12)).toBe("PM");
		expect(periodOf(23)).toBe("PM");
	});
});

describe("to12Hour", () => {
	it("maps midnight and noon onto 12", () => {
		expect(to12Hour(0)).toBe(12);
		expect(to12Hour(12)).toBe(12);
	});

	it("maps the rest by modulo", () => {
		expect(to12Hour(1)).toBe(1);
		expect(to12Hour(13)).toBe(1);
		expect(to12Hour(23)).toBe(11);
	});
});

describe("to24Hour", () => {
	it("converts AM hours", () => {
		expect(to24Hour(12, "AM")).toBe(0);
		expect(to24Hour(1, "AM")).toBe(1);
		expect(to24Hour(11, "AM")).toBe(11);
	});

	it("converts PM hours", () => {
		expect(to24Hour(12, "PM")).toBe(12);
		expect(to24Hour(1, "PM")).toBe(13);
		expect(to24Hour(11, "PM")).toBe(23);
	});

	it("round-trips every hour of the day", () => {
		for (let hour = 0; hour < 24; hour++) {
			expect(to24Hour(to12Hour(hour), periodOf(hour))).toBe(hour);
		}
	});
});

describe("buildHourOptions", () => {
	it("lists 1..12 on a 12-hour clock", () => {
		const hours = buildHourOptions(12);
		expect(hours).toHaveLength(12);
		expect(hours[0]).toBe(1);
		expect(hours[11]).toBe(12);
	});

	it("lists 0..23 on a 24-hour clock", () => {
		const hours = buildHourOptions(24);
		expect(hours).toHaveLength(24);
		expect(hours[0]).toBe(0);
		expect(hours[23]).toBe(23);
	});
});

describe("normalizeStep", () => {
	it("keeps usable steps", () => {
		expect(normalizeStep(1)).toBe(1);
		expect(normalizeStep(15)).toBe(15);
		expect(normalizeStep(60)).toBe(60);
	});

	it("floors fractional steps", () => {
		expect(normalizeStep(5.7)).toBe(5);
	});

	it("clamps steps that would break the column", () => {
		expect(normalizeStep(0)).toBe(1);
		expect(normalizeStep(-5)).toBe(1);
		expect(normalizeStep(90)).toBe(60);
		expect(normalizeStep(Number.NaN)).toBe(1);
		expect(normalizeStep(Number.POSITIVE_INFINITY)).toBe(1);
	});
});

describe("buildStepOptions", () => {
	it("covers the hour at the given step", () => {
		expect(buildStepOptions(15)).toEqual([0, 15, 30, 45]);
		expect(buildStepOptions(30)).toEqual([0, 30]);
		expect(buildStepOptions(1)).toHaveLength(60);
	});

	it("never emits an entry at or past 60", () => {
		for (const step of [1, 5, 7, 13, 45, 60]) {
			for (const value of buildStepOptions(step)) {
				expect(value).toBeLessThan(60);
				expect(value).toBeGreaterThanOrEqual(0);
			}
		}
	});

	it("survives a step that does not divide 60", () => {
		expect(buildStepOptions(7)).toEqual([0, 7, 14, 21, 28, 35, 42, 49, 56]);
	});
});

describe("snapToStep", () => {
	it("snaps down onto the grid", () => {
		expect(snapToStep(0, 5)).toBe(0);
		expect(snapToStep(3, 5)).toBe(0);
		expect(snapToStep(7, 5)).toBe(5);
		expect(snapToStep(59, 15)).toBe(45);
	});

	it("produces a value the column actually contains", () => {
		const step = 15;
		const options = buildStepOptions(step);
		for (let minute = 0; minute < 60; minute++) {
			expect(options).toContain(snapToStep(minute, step));
		}
	});
});

describe("snapPartsToStep", () => {
	it("snaps minutes and seconds independently and leaves the hour alone", () => {
		expect(
			snapPartsToStep({ hour: 10, minute: 37, second: 44 }, 15, 30),
		).toEqual({ hour: 10, minute: 30, second: 30 });
	});
});

describe("nowOnGrid", () => {
	const clock = { hour: 19, minute: 43, second: 17 };

	it("snaps the clock onto the column grid", () => {
		expect(
			nowOnGrid(clock, {
				minuteStep: 15,
				secondStep: 30,
				granularity: "second",
			}),
		).toEqual({ hour: 19, minute: 30, second: 0 });
	});

	it("drops everything below the displayed granularity", () => {
		expect(
			nowOnGrid(clock, { minuteStep: 5, secondStep: 5, granularity: "minute" }),
		).toEqual({ hour: 19, minute: 40, second: 0 });
		expect(
			nowOnGrid(clock, { minuteStep: 5, secondStep: 5, granularity: "hour" }),
		).toEqual({ hour: 19, minute: 0, second: 0 });
	});

	// The bug this guards: "Now" checked the raw clock but committed the snapped
	// value, so a 09:45 clock under a 09:30 minimum passed the check and then
	// wrote 09:00. The check has to run on what would actually be written.
	it("can fall outside bounds the raw clock satisfies", () => {
		const bounds = { min: { hour: 9, minute: 30, second: 0 } };
		const raw = { hour: 9, minute: 45, second: 0 };
		expect(isWithinBounds(raw, bounds)).toBe(true);
		const snapped = nowOnGrid(raw, {
			minuteStep: 60,
			secondStep: 5,
			granularity: "minute",
		});
		expect(snapped).toEqual({ hour: 9, minute: 0, second: 0 });
		expect(isWithinBounds(snapped, bounds)).toBe(false);
	});

	it("leaves an in-range clock reachable", () => {
		const bounds = {
			min: { hour: 9, minute: 0, second: 0 },
			max: { hour: 17, minute: 0, second: 0 },
		};
		const snapped = nowOnGrid(
			{ hour: 13, minute: 7, second: 0 },
			{ minuteStep: 5, secondStep: 5, granularity: "minute" },
		);
		expect(snapped).toEqual({ hour: 13, minute: 5, second: 0 });
		expect(isWithinBounds(snapped, bounds)).toBe(true);
	});
});

describe("isWithinBounds", () => {
	const bounds = {
		min: { hour: 9, minute: 0, second: 0 },
		max: { hour: 17, minute: 30, second: 0 },
	};

	it("accepts times inside the range", () => {
		expect(isWithinBounds({ hour: 12, minute: 0, second: 0 }, bounds)).toBe(
			true,
		);
	});

	it("is inclusive on both ends", () => {
		expect(isWithinBounds({ hour: 9, minute: 0, second: 0 }, bounds)).toBe(
			true,
		);
		expect(isWithinBounds({ hour: 17, minute: 30, second: 0 }, bounds)).toBe(
			true,
		);
	});

	it("rejects times outside the range", () => {
		expect(isWithinBounds({ hour: 8, minute: 59, second: 59 }, bounds)).toBe(
			false,
		);
		expect(isWithinBounds({ hour: 17, minute: 30, second: 1 }, bounds)).toBe(
			false,
		);
	});

	it("treats a missing bound as unbounded on that side", () => {
		expect(
			isWithinBounds({ hour: 3, minute: 0, second: 0 }, { max: bounds.max }),
		).toBe(true);
		expect(
			isWithinBounds({ hour: 23, minute: 0, second: 0 }, { min: bounds.min }),
		).toBe(true);
		expect(isWithinBounds({ hour: 0, minute: 0, second: 0 }, {})).toBe(true);
	});
});

describe("isSpanDisabled", () => {
	// The behaviour that makes the columns usable: an hour stays selectable when
	// any minute inside it is legal, even though the top of the hour is not.
	it("keeps the boundary hour enabled when a later minute is still legal", () => {
		const bounds = { min: { hour: 9, minute: 30, second: 0 } };
		expect(isSpanDisabled(hourSpan(9), bounds)).toBe(false);
	});

	it("disables hours wholly before the minimum", () => {
		const bounds = { min: { hour: 9, minute: 30, second: 0 } };
		expect(isSpanDisabled(hourSpan(8), bounds)).toBe(true);
	});

	it("disables hours wholly after the maximum", () => {
		const bounds = { max: { hour: 17, minute: 0, second: 0 } };
		expect(isSpanDisabled(hourSpan(18), bounds)).toBe(true);
		expect(isSpanDisabled(hourSpan(17), bounds)).toBe(false);
	});

	it("disables only the out-of-range minutes within the boundary hour", () => {
		const bounds = { min: { hour: 9, minute: 30, second: 0 } };
		expect(isSpanDisabled(minuteSpan(9, 15), bounds)).toBe(true);
		expect(isSpanDisabled(minuteSpan(9, 30), bounds)).toBe(false);
		expect(isSpanDisabled(minuteSpan(9, 45), bounds)).toBe(false);
	});

	it("treats seconds as single instants", () => {
		const bounds = { max: { hour: 9, minute: 0, second: 30 } };
		expect(isSpanDisabled(secondSpan(9, 0, 30), bounds)).toBe(false);
		expect(isSpanDisabled(secondSpan(9, 0, 31), bounds)).toBe(true);
	});

	it("disables a whole half-day when the range excludes it", () => {
		const morningOnly = { max: { hour: 11, minute: 59, second: 59 } };
		expect(isSpanDisabled(periodSpan("AM"), morningOnly)).toBe(false);
		expect(isSpanDisabled(periodSpan("PM"), morningOnly)).toBe(true);
	});

	it("leaves everything enabled without bounds", () => {
		for (let hour = 0; hour < 24; hour++) {
			expect(isSpanDisabled(hourSpan(hour), {})).toBe(false);
		}
	});
});

describe("truncateToGranularity", () => {
	const parts = { hour: 13, minute: 45, second: 30 };

	it("drops minutes and seconds at hour granularity", () => {
		expect(truncateToGranularity(parts, "hour")).toEqual({
			hour: 13,
			minute: 0,
			second: 0,
		});
	});

	it("drops seconds at minute granularity", () => {
		expect(truncateToGranularity(parts, "minute")).toEqual({
			hour: 13,
			minute: 45,
			second: 0,
		});
	});

	it("keeps everything at second granularity", () => {
		expect(truncateToGranularity(parts, "second")).toEqual(parts);
	});
});

describe("formatTimeParts", () => {
	const afternoon = { hour: 13, minute: 5, second: 9 };

	it("formats a 12-hour clock with a period suffix", () => {
		expect(
			formatTimeParts(afternoon, { hourCycle: 12, granularity: "minute" }),
		).toBe("1:05 PM");
	});

	it("formats a 24-hour clock with padded hours and no suffix", () => {
		expect(
			formatTimeParts(afternoon, { hourCycle: 24, granularity: "minute" }),
		).toBe("13:05");
	});

	it("respects granularity", () => {
		expect(
			formatTimeParts(afternoon, { hourCycle: 24, granularity: "hour" }),
		).toBe("13");
		expect(
			formatTimeParts(afternoon, { hourCycle: 24, granularity: "second" }),
		).toBe("13:05:09");
	});

	it("shows midnight as 12 AM", () => {
		expect(
			formatTimeParts(
				{ hour: 0, minute: 0, second: 0 },
				{ hourCycle: 12, granularity: "minute" },
			),
		).toBe("12:00 AM");
	});
});

describe("pad", () => {
	it("pads to two digits", () => {
		expect(pad(0)).toBe("00");
		expect(pad(7)).toBe("07");
		expect(pad(42)).toBe("42");
	});
});

describe("timePickerVariants", () => {
	it("returns field styles", () => {
		const styles = timePickerVariants();
		expect(styles.field()).toContain("rounded-md");
		expect(styles.field()).toContain("focus-within:ring-[3px]");
	});

	it("keeps segments from reflowing as digits change", () => {
		expect(timePickerVariants().segment()).toContain("tabular-nums");
	});

	it("applies size to the option columns", () => {
		expect(timePickerVariants({ size: "sm" }).columnItem()).toContain("h-7");
		expect(timePickerVariants({ size: "lg" }).columnItem()).toContain("h-9");
	});

	it("applies variant to the field box", () => {
		expect(timePickerVariants({ variant: "filled" }).field()).toContain(
			"bg-muted",
		);
		expect(timePickerVariants({ variant: "ghost" }).field()).toContain(
			"border-transparent",
		);
	});

	it("marks unreachable options as disabled", () => {
		expect(timePickerVariants().columnItem()).toContain(
			"disabled:line-through",
		);
	});
});
