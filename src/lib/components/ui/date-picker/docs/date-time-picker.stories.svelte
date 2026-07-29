<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { DateTimePicker } from "$lib/components/ui/date-picker";
	import { CalendarDateTime, getLocalTimeZone, today } from "@internationalized/date";
	import * as Field from "$lib/components/ui/field";

	import { type Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/DatePicker/DateTimePicker",
		component: DateTimePicker,
		tags: ["autodocs"],
	});
</script>

<script lang="ts">
	let dateTime = $state<CalendarDateTime | undefined>();
	let disabledDateTime = $state<CalendarDateTime | undefined>();
	let hour24DateTime = $state<CalendarDateTime | undefined>();
</script>

<Story name="Default">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DateTimePicker bind:value={dateTime} {...args} />
		{#if dateTime}
			<div class="mt-2 text-sm text-muted-foreground">
				Selected: {dateTime.toDate(getLocalTimeZone()).toLocaleString()}
			</div>
		{/if}
	</div>
	{/snippet}
</Story>

<Story name="With Initial Value">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DateTimePicker
			value={new CalendarDateTime(today(getLocalTimeZone()).year, today(getLocalTimeZone()).month, today(getLocalTimeZone()).day, 14, 30)}
			{...args}
		/>
		<div class="mt-2 text-sm text-muted-foreground">
			Initialized with today's date at 2:30 PM
		</div>
	</div>
	{/snippet}
</Story>

<Story name="Hour Cycle 24">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DateTimePicker bind:value={hour24DateTime} hourCycle={24} {...args} />
		{#if hour24DateTime}
			<div class="mt-2 text-sm text-muted-foreground">
				Selected: {hour24DateTime.toDate(getLocalTimeZone()).toLocaleString()}
			</div>
		{/if}
	</div>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DateTimePicker bind:value={disabledDateTime} disabled {...args} />
		<div class="mt-2 text-sm text-muted-foreground">
			This date-time picker is disabled
		</div>
	</div>
	{/snippet}
</Story>

<Story name="Field with Validation">
	{#snippet template(args: Args)}
		<Field.Field
			label="Meeting Start"
			description="When should the meeting begin?"
			required
			error="Please select a date and time"
		>
			<DateTimePicker error={true} {...args} />
		</Field.Field>
	{/snippet}
</Story>
