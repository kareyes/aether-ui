<script context="module" lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Time } from "@internationalized/date";
	import { TimePicker } from "../index.js";
	import type {
		TimePickerVariant,
		TimePickerSize,
	} from "../time-picker-variants.js";
	import type { TimeGranularity } from "../time-picker-utils.js";

	const { Story } = defineMeta({
		title: "Components/TimePicker",
		component: TimePicker,
		tags: ["autodocs"],
		argTypes: {
			variant: {
				control: "select",
				options: ["default", "outline", "filled", "ghost", "underline"],
				description: "Visual variant of the field",
				table: {
					type: { summary: "default | outline | filled | ghost | underline" },
					defaultValue: { summary: "default" },
				},
			},
			size: {
				control: "select",
				options: ["sm", "default", "lg"],
				description: "Size of the control",
				table: {
					type: { summary: "sm | default | lg" },
					defaultValue: { summary: "default" },
				},
			},
			hourCycle: {
				control: "inline-radio",
				options: [12, 24],
				description: "Clock convention for segments and columns",
				table: {
					type: { summary: "12 | 24" },
					defaultValue: { summary: "12" },
				},
			},
			granularity: {
				control: "select",
				options: ["hour", "minute", "second"],
				description: "Smallest visible unit",
				table: {
					type: { summary: "hour | minute | second" },
					defaultValue: { summary: "minute" },
				},
			},
			minuteStep: {
				control: "number",
				description: "Increment between minute column entries",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "5" },
				},
			},
			secondStep: {
				control: "number",
				description: "Increment between second column entries",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "5" },
				},
			},
			label: {
				control: "text",
				description: "Visible, associated label",
				table: { type: { summary: "string" } },
			},
			showPicker: {
				control: "boolean",
				description: "Show the dropdown trigger",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "true" },
				},
			},
			showNow: {
				control: "boolean",
				description: 'Show the "Now" shortcut in the footer',
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "true" },
				},
			},
			disabled: {
				control: "boolean",
				description: "Disable the control",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			readonly: {
				control: "boolean",
				description: "Display without allowing edits",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			error: {
				control: "boolean",
				description: "Error state",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
		},
		args: {
			variant: "default",
			size: "default",
			hourCycle: 12,
			granularity: "minute",
			minuteStep: 5,
			secondStep: 5,
			showPicker: true,
			showNow: true,
			disabled: false,
			readonly: false,
			error: false,
		},
		parameters: {
			layout: "centered",
			docs: {
				extractArgTypes: false,
			},
		},
	});

	type Args = {
		value?: Time;
		label?: string;
		variant?: TimePickerVariant;
		size?: TimePickerSize;
		hourCycle?: 12 | 24;
		granularity?: TimeGranularity;
		minuteStep?: number;
		secondStep?: number;
		minValue?: Time;
		maxValue?: Time;
		showPicker?: boolean;
		showNow?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		error?: boolean;
	};
</script>

<Story name="Default">
	{#snippet template(args: Args)}
		<TimePicker {...args} />
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet template(args: Args)}
		<TimePicker {...args} label="Shift start" value={new Time(9, 0)} />
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div class="space-y-4">
			{#each ["default", "outline", "filled", "ghost", "underline"] as const as variant (variant)}
				<div>
					<h3 class="mb-2 text-sm font-medium capitalize">{variant}</h3>
					<TimePicker {variant} value={new Time(9, 30)} />
				</div>
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div class="space-y-4">
			{#each ["sm", "default", "lg"] as const as size (size)}
				<div>
					<h3 class="mb-2 text-sm font-medium">{size}</h3>
					<TimePicker {size} value={new Time(14, 15)} />
				</div>
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="24-Hour Clock">
	{#snippet template()}
		<TimePicker hourCycle={24} value={new Time(18, 45)} label="Departure" />
	{/snippet}
</Story>

<Story name="Granularity">
	{#snippet template()}
		<div class="space-y-4">
			<div>
				<h3 class="mb-2 text-sm font-medium">Hour</h3>
				<TimePicker granularity="hour" value={new Time(11, 0)} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Minute (default)</h3>
				<TimePicker granularity="minute" value={new Time(11, 30)} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Second</h3>
				<TimePicker granularity="second" value={new Time(11, 30, 15)} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Minute Steps">
	{#snippet template()}
		<div class="space-y-4">
			{#each [1, 5, 15, 30] as step (step)}
				<div>
					<h3 class="mb-2 text-sm font-medium">Step {step}</h3>
					<TimePicker minuteStep={step} value={new Time(10, 0)} />
				</div>
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="Business Hours Only">
	{#snippet template()}
		<div class="space-y-2">
			<TimePicker
				label="Appointment"
				minValue={new Time(9, 30)}
				maxValue={new Time(17, 0)}
				value={new Time(10, 0)}
				minuteStep={15}
			/>
			<p class="text-muted-foreground max-w-xs text-xs">
				Options outside 09:30–17:00 are struck through. Hour 9 stays selectable
				because 09:30 is still reachable within it.
			</p>
		</div>
	{/snippet}
</Story>

<Story name="Field Only">
	{#snippet template()}
		<TimePicker showPicker={false} value={new Time(8, 0)} label="Clock in" />
	{/snippet}
</Story>

<Story name="Disabled and Readonly">
	{#snippet template()}
		<div class="space-y-4">
			<TimePicker disabled value={new Time(9, 0)} label="Disabled" />
			<TimePicker readonly value={new Time(9, 0)} label="Readonly" />
		</div>
	{/snippet}
</Story>

<Story name="Error State">
	{#snippet template()}
		<div class="space-y-2">
			<TimePicker error label="End time" />
			<p class="text-destructive text-xs">An end time is required.</p>
		</div>
	{/snippet}
</Story>
