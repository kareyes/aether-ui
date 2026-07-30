import type { Time } from "@internationalized/date";
import type { ComponentProps, Snippet } from "svelte";
import type * as Popover from "$lib/components/ui/popover/index.js";
import type {
	TimePickerSize,
	TimePickerVariant,
} from "./time-picker-variants.js";
import type { TimeGranularity } from "./time-picker-utils.js";

/**
 * The declarative `TimePicker`'s full prop surface. Lives here rather than in
 * the component so the root stays readable — and so a consumer wrapping the
 * picker can spread a typed object at it.
 */
export type TimePickerProps = {
	/** The selected time. Bindable. */
	value?: Time;
	/**
	 * Seeds the field's format and its starting point when empty. Bindable —
	 * bits-ui fills it in with a granularity-appropriate default when unset.
	 */
	placeholder?: Time;
	/** Visible label, wired to the field via bits-ui's label association. */
	label?: string;
	/**
	 * Accessible name for the segment group, for fields whose label lives
	 * elsewhere — a start/end pair under one shared label, say. Ignored when
	 * `label` is set, which already names the group via `aria-labelledby`.
	 */
	ariaLabel?: string;
	variant?: TimePickerVariant;
	size?: TimePickerSize;
	/** 12-hour (AM/PM) or 24-hour segments and columns. Defaults to 12. */
	hourCycle?: 12 | 24;
	/** Which segments/columns are shown. Defaults to "minute". */
	granularity?: TimeGranularity;
	/** Increment between entries in the minute column. Defaults to 5. */
	minuteStep?: number;
	/** Increment between entries in the second column. Defaults to 5. */
	secondStep?: number;
	/** Earliest selectable time, inclusive. */
	minValue?: Time;
	/** Latest selectable time, inclusive. */
	maxValue?: Time;
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
	/**
	 * Name for the hidden input bits-ui renders, so the picker participates in
	 * native form / SvelteKit `enhance` submissions. Submits an ISO time string.
	 */
	name?: string;
	locale?: string;
	/**
	 * Show the dropdown column picker. With `false` the component is a
	 * keyboard-only segmented field. Defaults to true.
	 */
	showPicker?: boolean;
	/** Show the "Now" shortcut in the dropdown footer. Defaults to true. */
	showNow?: boolean;
	/**
	 * Force the error state — applies destructive styling and `aria-invalid`.
	 * The picker adds its own out-of-bounds verdict on top; see `onError`.
	 */
	error?: boolean;
	/**
	 * Fired with the picker's *own* validity: true when the field holds a time
	 * `minValue` / `maxValue` forbid. Reachable by typing into the segments —
	 * the dropdown's unreachable entries are struck out, the keyboard's are not.
	 * Not an echo of `error`, which the caller already owns.
	 */
	onError?: (error: boolean) => void;
	onValueChange?: (value: Time | undefined) => void;
	class?: string;
	/** Extra classes for the bordered field box. */
	fieldClass?: string;
	/** Replaces the leading clock icon. */
	icon?: Snippet;
	/**
	 * Forwarded to the popover's portal. Leave unset for the default, which
	 * auto-targets an ancestor `<dialog>` when there is one.
	 */
	portalProps?: ComponentProps<typeof Popover.Content>["portalProps"];
};
