<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { DatePickerWithPresets, DateRangePickerWithPresets } from "$lib/components/ui/date-picker";
	import { type DateValue, today, getLocalTimeZone } from "@internationalized/date";
	import type { DateRange } from "bits-ui";
	import * as Field from '$lib/components/ui/field';
	import { Button } from '$lib/components/ui/button';
    
    import {type Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/DatePicker/WithPresets",
		component: DatePickerWithPresets,
		tags: ["autodocs"],
	});
</script>

<script lang="ts">
	let presetDate = $state<DateValue | undefined>();
	let presetRange = $state<DateRange | undefined>();
</script>

<!-- DatePickerWithPresets -->
<Story name="Default">
    {#snippet template(args: Args)}
	<div class="max-w-md">
		<DatePickerWithPresets bind:value={presetDate} {...args} />
		{#if presetDate}
			<div class="mt-2 text-sm text-muted-foreground">
				Selected: {presetDate.toDate(getLocalTimeZone()).toLocaleDateString()}
			</div>
		{/if}
	</div>
    {/snippet}
</Story>

<Story name="Custom Single Date Presets">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DatePickerWithPresets
			presets={[
				{ label: "Today", value: today(getLocalTimeZone()) },
				{ label: "Next Monday", value: today(getLocalTimeZone()).add({ days: (8 - today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDay()) % 7 || 7 }) },
				{ label: "1st of Next Month", value: today(getLocalTimeZone()).add({ months: 1 }).set({ day: 1 }) },
				{ label: "New Year", value: today(getLocalTimeZone()).add({ years: 1 }).set({ month: 1, day: 1 }) },
			]}
            {...args}
		/>
		<div class="mt-2 text-sm text-muted-foreground">
			Custom presets: Today, Next Monday, 1st of Next Month, New Year
		</div>
	</div>
    {/snippet}
</Story>

<!-- Button Variants -->
<Story name="Variant - Outline">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DatePickerWithPresets buttonVariant="outline" {...args} />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: outline
		</div>
	</div>
    {/snippet}
</Story>

<Story name="Variant - Ghost">
    {#snippet template(args: Args)}
	<div class="max-w-md">
		<DatePickerWithPresets buttonVariant="ghost" {...args} />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: ghost
		</div>
	</div>
    {/snippet}
</Story>

<!-- DateRangePickerWithPresets -->
<Story name="Range With Presets">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DateRangePickerWithPresets bind:value={presetRange} {...args} />
		{#if presetRange?.start && presetRange?.end}
			<div class="mt-2 text-sm text-muted-foreground">
				Selected: {presetRange.start.toDate(getLocalTimeZone()).toLocaleDateString()} - {presetRange.end.toDate(getLocalTimeZone()).toLocaleDateString()}
			</div>
		{/if}
	</div>
    {/snippet}
</Story>

<Story name="Custom Range Presets">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DateRangePickerWithPresets
			presets={[
				{ 
					label: "Last 3 days", 
					value: { 
						start: today(getLocalTimeZone()).subtract({ days: 2 }), 
						end: today(getLocalTimeZone()) 
					} 
				},
				{ 
					label: "Last 14 days", 
					value: { 
						start: today(getLocalTimeZone()).subtract({ days: 13 }), 
						end: today(getLocalTimeZone()) 
					} 
				},
				{ 
					label: "Last 90 days", 
					value: { 
						start: today(getLocalTimeZone()).subtract({ days: 89 }), 
						end: today(getLocalTimeZone()) 
					} 
				},
			]}
            {...args}
		/>
		<div class="mt-2 text-sm text-muted-foreground">
			Custom preset options: Last 3, 14, and 90 days
		</div>
	</div>
    {/snippet}
</Story>

<!-- With Field Component -->
<Story name="Field with Single Date Presets">
	{#snippet template(args: Args)}
		<Field.Field
			label="Appointment Date"
			description="Choose a date or select from quick options"
		>
			<DatePickerWithPresets {...args} />
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Range Presets">
	{#snippet template(args: Args)}
		<Field.Field
			label="Report Period"
			description="Select the date range for your report"
			required
		>
			<DateRangePickerWithPresets 
				presets={[
					{
						label: "Next 7 Days",
						value: {
							start: today(getLocalTimeZone()),
							end: today(getLocalTimeZone()).add({ days: 7 }),
						},
					},
					{
						label: "Next 30 Days",
						value: {
							start: today(getLocalTimeZone()),
							end: today(getLocalTimeZone()).add({ days: 30 }),
						},
					},
					{
						label: "Next Quarter",
						value: {
							start: today(getLocalTimeZone()),
							end: today(getLocalTimeZone()).add({ months: 3 }),
						},
					},
				]}
                {...args}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Validation">
	{#snippet template(args: Args)}
		<Field.Field
			label="Meeting Date"
			description="Select a meeting date from presets or choose custom"
			required
			error="Please select a meeting date"
		>
			<DatePickerWithPresets 
				error={true}
                {...args}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Complete Form with Presets">
	{#snippet template()}
		<div class="w-full max-w-md">
			<Field.Set>
				<Field.Legend>Quick Booking</Field.Legend>
				<Field.Description>Use presets for faster booking</Field.Description>
				
				<Field.Separator />
				
				<Field.Group class="gap-4">
					<Field.Field
						label="Appointment Date"
						description="Select from common dates or pick custom"
						required
					>
						<DatePickerWithPresets 
							buttonVariant="outline"
							buttonClass="w-full"
							presets={[
								{ label: "Today", value: today(getLocalTimeZone()) },
								{ label: "Tomorrow", value: today(getLocalTimeZone()).add({ days: 1 }) },
								{ label: "In 1 Week", value: today(getLocalTimeZone()).add({ weeks: 1 }) },
							]}
						/>
					</Field.Field>
					
					<Field.Field
						label="Event Duration"
						description="Select from common periods or pick custom range"
					>
						<DateRangePickerWithPresets 
							buttonVariant="outline"
							buttonClass="w-full"
							presets={[
								{ 
									label: "This Week", 
									value: { 
										start: today(getLocalTimeZone()), 
										end: today(getLocalTimeZone()).add({ days: 7 }) 
									} 
								},
								{ 
									label: "This Month", 
									value: { 
										start: today(getLocalTimeZone()), 
										end: today(getLocalTimeZone()).add({ months: 1 }) 
									} 
								},
							]}
						/>
					</Field.Field>
				</Field.Group>
				
				<div class="flex gap-4 pt-4">
					<Button type="submit">Book Now</Button>
					<Button variant="outline" type="button">Clear</Button>
				</div>
			</Field.Set>
		</div>
	{/snippet}
</Story>
