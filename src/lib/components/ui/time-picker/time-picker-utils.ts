/**
 * Pure time helpers backing the TimePicker's option columns.
 *
 * Everything here works on a plain `{ hour, minute, second }` shape rather than
 * on `Time` / `CalendarDateTime` / `ZonedDateTime` directly. All three of
 * bits-ui's `TimeValue` types expose those three fields, so the column maths
 * stays type-agnostic — and unit-testable without constructing calendar values.
 */

export type Period = "AM" | "PM";

/** The subset of any `TimeValue` this module needs. */
export type TimeParts = {
	readonly hour: number;
	readonly minute: number;
	readonly second: number;
};

export const SECONDS_PER_MINUTE = 60;
export const MINUTES_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;

/** Seconds since midnight — the comparison currency for every range check. */
export function toSeconds(parts: TimeParts): number {
	return (
		parts.hour * MINUTES_PER_HOUR * SECONDS_PER_MINUTE +
		parts.minute * SECONDS_PER_MINUTE +
		parts.second
	);
}

export function periodOf(hour24: number): Period {
	return hour24 < 12 ? "AM" : "PM";
}

/** 0 → 12, 13 → 1. The 12-hour clock has no zero. */
export function to12Hour(hour24: number): number {
	const hour = hour24 % 12;
	return hour === 0 ? 12 : hour;
}

export function to24Hour(hour12: number, period: Period): number {
	const base = hour12 % 12;
	return period === "PM" ? base + 12 : base;
}

/** Column entries: `1..12` on a 12-hour clock, `0..23` on a 24-hour one. */
export function buildHourOptions(hourCycle: 12 | 24): number[] {
	return hourCycle === 24
		? Array.from({ length: HOURS_PER_DAY }, (_, i) => i)
		: Array.from({ length: 12 }, (_, i) => i + 1);
}

/**
 * Column entries for minutes/seconds at the given step.
 *
 * A step that does not divide 60 evenly (7, say) still yields only in-range
 * entries — the last one is simply closer to its neighbour than the rest.
 */
export function buildStepOptions(step: number): number[] {
	const safeStep = normalizeStep(step);
	return Array.from(
		{ length: Math.ceil(MINUTES_PER_HOUR / safeStep) },
		(_, i) => i * safeStep,
	);
}

/**
 * Guard the step against values that would produce an empty or infinite column
 * (`0`, negatives, fractions, anything past a full hour).
 */
export function normalizeStep(step: number): number {
	if (!Number.isFinite(step)) return 1;
	const floored = Math.floor(step);
	if (floored < 1) return 1;
	if (floored > MINUTES_PER_HOUR) return MINUTES_PER_HOUR;
	return floored;
}

/**
 * Snap a value down onto the column's grid.
 *
 * An unsnapped value (10:03 against a 5-minute step) matches no entry, so the
 * column would open with nothing highlighted. Snapping down rather than to the
 * nearest keeps the result within any max bound the caller already validated.
 */
export function snapToStep(value: number, step: number): number {
	const safeStep = normalizeStep(step);
	return Math.floor(value / safeStep) * safeStep;
}

export function snapPartsToStep(
	parts: TimeParts,
	minuteStep: number,
	secondStep: number,
): TimeParts {
	return {
		hour: parts.hour,
		minute: snapToStep(parts.minute, minuteStep),
		second: snapToStep(parts.second, secondStep),
	};
}

export type TimeRangeBounds = {
	readonly min?: TimeParts;
	readonly max?: TimeParts;
};

/** Inclusive on both ends, matching bits-ui's `minValue` / `maxValue`. */
export function isWithinBounds(
	parts: TimeParts,
	bounds: TimeRangeBounds,
): boolean {
	const seconds = toSeconds(parts);
	if (bounds.min && seconds < toSeconds(bounds.min)) return false;
	if (bounds.max && seconds > toSeconds(bounds.max)) return false;
	return true;
}

/**
 * Whether a whole column entry should be struck out.
 *
 * An entry is only disabled when *no* time it could still become is reachable
 * — picking hour 9 with a 09:30 minimum has to stay enabled, because 09:45 is
 * a legal destination even though 09:00 is not. So each entry is tested as the
 * span it represents rather than as a single instant.
 */
export function isSpanDisabled(
	span: { readonly from: TimeParts; readonly to: TimeParts },
	bounds: TimeRangeBounds,
): boolean {
	const from = toSeconds(span.from);
	const to = toSeconds(span.to);
	if (bounds.max && from > toSeconds(bounds.max)) return true;
	if (bounds.min && to < toSeconds(bounds.min)) return true;
	return false;
}

/** The full second-range an hour column entry covers. */
export function hourSpan(hour24: number): {
	from: TimeParts;
	to: TimeParts;
} {
	return {
		from: { hour: hour24, minute: 0, second: 0 },
		to: { hour: hour24, minute: 59, second: 59 },
	};
}

/** The full second-range a minute column entry covers, within a known hour. */
export function minuteSpan(
	hour24: number,
	minute: number,
): { from: TimeParts; to: TimeParts } {
	return {
		from: { hour: hour24, minute, second: 0 },
		to: { hour: hour24, minute, second: 59 },
	};
}

/** A second column entry is a single instant, so its span is degenerate. */
export function secondSpan(
	hour24: number,
	minute: number,
	second: number,
): { from: TimeParts; to: TimeParts } {
	const at = { hour: hour24, minute, second };
	return { from: at, to: at };
}

/** The span an AM/PM entry covers — the twelve hours it would switch to. */
export function periodSpan(period: Period): {
	from: TimeParts;
	to: TimeParts;
} {
	const startHour = period === "AM" ? 0 : 12;
	return {
		from: { hour: startHour, minute: 0, second: 0 },
		to: { hour: startHour + 11, minute: 59, second: 59 },
	};
}

export type TimeGranularity = "hour" | "minute" | "second";

/**
 * Zero out everything below the displayed granularity, so an hour-granularity
 * picker never silently carries stray minutes from a seeded value.
 */
export function truncateToGranularity(
	parts: TimeParts,
	granularity: TimeGranularity,
): TimeParts {
	if (granularity === "hour") return { ...parts, minute: 0, second: 0 };
	if (granularity === "minute") return { ...parts, second: 0 };
	return parts;
}

/**
 * A wall-clock reading snapped onto a picker's own option grid — exactly what
 * the "Now" shortcut would commit.
 *
 * Pure (the clock is the caller's to read) so the bounds check and the commit
 * can be driven from one value. Without that they drift: a shortcut checked
 * against the raw clock but committing a snapped value can write past a bound
 * it just cleared, which is how "Now" ended up ignoring `maxValue`.
 */
export function nowOnGrid(
	current: TimeParts,
	options: {
		readonly minuteStep: number;
		readonly secondStep: number;
		readonly granularity: TimeGranularity;
	},
): TimeParts {
	return truncateToGranularity(
		{
			hour: current.hour,
			minute: snapToStep(current.minute, options.minuteStep),
			second: snapToStep(current.second, options.secondStep),
		},
		options.granularity,
	);
}

export function formatTimeParts(
	parts: TimeParts,
	options: {
		readonly hourCycle: 12 | 24;
		readonly granularity: TimeGranularity;
	},
): string {
	const { hourCycle, granularity } = options;
	const hour =
		hourCycle === 24 ? pad(parts.hour) : String(to12Hour(parts.hour));
	const segments = [hour];
	if (granularity !== "hour") segments.push(pad(parts.minute));
	if (granularity === "second") segments.push(pad(parts.second));
	const clock = segments.join(":");
	return hourCycle === 24 ? clock : `${clock} ${periodOf(parts.hour)}`;
}

export function pad(value: number): string {
	return String(value).padStart(2, "0");
}
