import { describe, expect, test } from "bun:test";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import { commitDateTime } from "./date-time-commit";

const today = new CalendarDate(2026, 8, 14);

describe("commitDateTime", () => {
	test("an untouched picker stays empty", () => {
		// `defaultToNow={false}` means "blank keeps the existing value" — opening
		// and closing the popover must not become an overwrite.
		expect(
			commitDateTime({
				value: undefined,
				placeholder: new CalendarDateTime(2026, 8, 14, 9, 0),
				timeTouched: false,
				today,
			}),
		).toBeUndefined();
	});

	test("a time picked with no date commits as today at that time", () => {
		expect(
			commitDateTime({
				value: undefined,
				placeholder: new CalendarDateTime(2026, 8, 14, 9, 30),
				timeTouched: true,
				today,
			}),
		).toEqual(new CalendarDateTime(2026, 8, 14, 9, 30, 0, 0));
	});

	test("a browsed month does not leak into the committed date", () => {
		// The placeholder tracks whichever month the calendar is showing. Nobody
		// clicked March 14, so the commit must not produce it.
		expect(
			commitDateTime({
				value: undefined,
				placeholder: new CalendarDateTime(2026, 3, 14, 17, 15),
				timeTouched: true,
				today,
			}),
		).toEqual(new CalendarDateTime(2026, 8, 14, 17, 15, 0, 0));
	});

	test("seconds and milliseconds are zeroed", () => {
		const committed = commitDateTime({
			value: undefined,
			placeholder: new CalendarDateTime(2026, 8, 14, 9, 30, 45, 678),
			timeTouched: true,
			today,
		});
		expect(committed?.second).toBe(0);
		expect(committed?.millisecond).toBe(0);
	});

	test("a picked date-time is returned untouched", () => {
		const picked = new CalendarDateTime(2026, 7, 2, 22, 5);
		expect(
			commitDateTime({
				value: picked,
				placeholder: new CalendarDateTime(2026, 8, 14, 9, 0),
				timeTouched: true,
				today,
			}),
		).toBe(picked);
	});

	test("a picked date-time wins even when nothing was touched", () => {
		// The seeded `defaultToNow` case: the value exists from mount and the time
		// columns write straight into it, so there is nothing to commit.
		const seeded = new CalendarDateTime(2026, 8, 14, 8, 0);
		expect(
			commitDateTime({
				value: seeded,
				placeholder: undefined,
				timeTouched: false,
				today,
			}),
		).toBe(seeded);
	});

	test("a touched picker with no placeholder cannot commit", () => {
		expect(
			commitDateTime({
				value: undefined,
				placeholder: undefined,
				timeTouched: true,
				today,
			}),
		).toBeUndefined();
	});
});
