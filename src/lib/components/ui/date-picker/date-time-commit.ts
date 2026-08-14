import {
	type CalendarDate,
	CalendarDateTime,
	toCalendarDateTime,
} from "@internationalized/date";

/**
 * What the date-time picker's "Done" resolves to.
 *
 * The picker has two places a time can live. Once a day has been clicked there
 * is a `value` and the time columns write straight into it. Before that they
 * write into `placeholder` — the object the calendar uses to seed its displayed
 * month — which nothing submits and no hidden input mirrors. So a user who set
 * only a time closed the popover on `undefined`: the trigger still read "Pick a
 * date and time" and the form saved nothing at all.
 *
 * "Done" commits such a selection as **today** at the chosen time. Today rather
 * than the placeholder's own date, because the placeholder also tracks whichever
 * month the calendar is browsing — paging to March and setting a time would
 * otherwise hand back March's matching day-number, a date the user never saw
 * highlighted.
 *
 * `timeTouched` is the gate, and it must be an *interaction* flag rather than
 * "is there a placeholder": under `defaultToNow={false}` an empty picker means
 * "keep the existing value", and seeding a popover that was merely opened and
 * closed would turn every visit into an overwrite of a value nobody touched.
 * That mode is what `CorrectionModal`'s adjust form is built on, where the
 * value being overwritten is a payroll timestamp.
 */
export const commitDateTime = (opts: {
	/** The picked date-time, if a day has been clicked. */
	readonly value: CalendarDateTime | undefined;
	/** Where the time columns wrote while there was no `value`. */
	readonly placeholder: CalendarDateTime | undefined;
	/** Has a time column been used against the placeholder? */
	readonly timeTouched: boolean;
	/** Today, in the caller's zone — resolved by the component, injected here. */
	readonly today: CalendarDate;
}): CalendarDateTime | undefined => {
	if (opts.value) return opts.value;
	if (!opts.timeTouched || !opts.placeholder) return undefined;
	return toCalendarDateTime(opts.today).set({
		hour: opts.placeholder.hour,
		minute: opts.placeholder.minute,
		second: 0,
		millisecond: 0,
	});
};
