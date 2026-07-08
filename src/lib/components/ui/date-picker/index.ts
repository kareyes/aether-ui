import DatePicker from "./date-picker.svelte";
import DateRangePicker from "./date-range-picker.svelte";
import DatePickerWithPresets from "./date-picker-with-presets.svelte";
import DateRangePickerWithPresets from "./date-range-picker-with-presets.svelte";
import type { DateValue } from "@internationalized/date";
import { type ButtonVariant } from "$lib/components/ui/button/index.js";
import type { DateRange } from "bits-ui";

type DatePickerProps = {
	placeholder?: DateValue;
	disabled?: boolean;
	class?: string;
	name?: string;
	id?: string;
	buttonVariant?: ButtonVariant;
	buttonClass?: string;
	calendarProps?: Record<string, any>;
	/**
	 * Error state - when true, applies error styling
	 */
	error?: boolean;
	/**
	 * Callback function called when an error state is detected
	 */
	onError?: (error: boolean) => void;
};

export {
	type DateRange,
	type DatePickerProps,
	DatePicker,
	DateRangePicker,
	DatePickerWithPresets,
	DateRangePickerWithPresets,
};
