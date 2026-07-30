import Root from "./time-picker.svelte";
import Field from "./time-field.svelte";
import Input from "./time-field-input.svelte";
import Segment from "./time-field-segment.svelte";
import Label from "./time-field-label.svelte";

export {
	Field,
	Input,
	Segment,
	Label,
	//
	Root as TimePicker,
	Field as TimeField,
	Input as TimeFieldInput,
	Segment as TimeFieldSegment,
	Label as TimeFieldLabel,
};

export {
	timePickerVariants,
	type TimePickerVariant,
	type TimePickerSize,
} from "./time-picker-variants.js";

export type { TimePickerProps } from "./time-picker-types.js";

export {
	buildHourOptions,
	buildStepOptions,
	formatTimeParts,
	isWithinBounds,
	normalizeStep,
	nowOnGrid,
	periodOf,
	snapToStep,
	to12Hour,
	to24Hour,
	type Period,
	type TimeGranularity,
	type TimeParts,
} from "./time-picker-utils.js";
