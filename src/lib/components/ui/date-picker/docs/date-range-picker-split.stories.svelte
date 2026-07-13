<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { DateRangePickerSplit } from "$lib/components/ui/date-picker";
	import { today, getLocalTimeZone } from "@internationalized/date";
	import type { DateRange } from "bits-ui";
	import * as Field from "$lib/components/ui/field";
	import { type Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/DatePicker/DateRangePickerSplit",
		component: DateRangePickerSplit,
		tags: ["autodocs"],
	});
</script>

<script lang="ts">
	let dateRange = $state<DateRange | undefined>();

	const preset = $state<DateRange>({
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone()).add({ days: 2 }),
	});
</script>

<!-- Default: split From / To fields with a connecting arrow -->
<Story name="Default">
	{#snippet template(args: Args)}
		<div class="max-w-xl">
			<DateRangePickerSplit bind:value={dateRange} buttonVariant="link" {...args} />
			{#if dateRange?.start && dateRange?.end}
				<div class="mt-3 text-sm text-muted-foreground">
					Selected: {dateRange.start
						.toDate(getLocalTimeZone())
						.toLocaleDateString()} - {dateRange.end
						.toDate(getLocalTimeZone())
						.toLocaleDateString()}
				</div>
			{/if}
		</div>
	{/snippet}
</Story>

<!-- Card variant: fields + arrow wrapped in a bordered card with a heading -->
<Story name="Card">
	{#snippet template(args: Args)}
		<div class="max-w-xl">
			<DateRangePickerSplit variant="card" value={preset} {...args} />
		</div>
	{/snippet}
</Story>

<!-- Card variant with a custom heading + field labels -->
<Story name="Card - Custom Labels">
	{#snippet template(args: Args)}
		<div class="max-w-xl">
			<DateRangePickerSplit
				variant="card"
				label="Booking Window"
				fromLabel="Start Half"
				toLabel="End Half"
				value={preset}
				{...args}
			/>
		</div>
	{/snippet}
</Story>

<!-- Custom labels -->
<Story name="Custom Labels">
	{#snippet template(args: Args)}
		<div class="max-w-xl">
			<DateRangePickerSplit
				fromLabel="Check-in"
				toLabel="Check-out"
				{...args}
			/>
		</div>
	{/snippet}
</Story>

<!-- Pre-filled value -->
<Story name="With Value">
	{#snippet template(args: Args)}
		<div class="max-w-xl">
			<DateRangePickerSplit value={preset} {...args} />
		</div>
	{/snippet}
</Story>

<!-- Disabled -->
<Story name="Disabled">
	{#snippet template(args: Args)}
		<div class="max-w-xl">
			<DateRangePickerSplit disabled value={preset} {...args} />
		</div>
	{/snippet}
</Story>

<!-- Error state -->
<Story name="Error">
	{#snippet template(args: Args)}
		<div class="max-w-xl">
			<DateRangePickerSplit error {...args} />
		</div>
	{/snippet}
</Story>

<!-- With Field wrapper + section label -->
<Story name="Field with Label">
	{#snippet template(args: Args)}
		<div class="max-w-xl">
			<Field.Field
				label="Date Range"
				description="Select the start and end dates"
			>
				<DateRangePickerSplit {...args} />
			</Field.Field>
		</div>
	{/snippet}
</Story>
