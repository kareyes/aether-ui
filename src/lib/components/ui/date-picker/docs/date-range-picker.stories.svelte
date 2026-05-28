<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { DateRangePicker } from "$lib/components/ui/date-picker";
	import { today, getLocalTimeZone } from "@internationalized/date";
	import type { DateRange } from "bits-ui";
	import * as Field from '$lib/components/ui/field';
	import { Button } from '$lib/components/ui/button';
    import {type Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/DatePicker/DateRangePicker",
		component: DateRangePicker,
		tags: ["autodocs"],
	});
</script>

<script lang="ts">
	let dateRange = $state<DateRange | undefined>();
</script>

<!-- Basic DateRangePicker -->
<Story name="Default">
    {#snippet template(args: Args)}
	<div class="max-w-md">
		<DateRangePicker bind:value={dateRange} {...args} />
		{#if dateRange?.start && dateRange?.end}
			<div class="mt-2 text-sm text-muted-foreground">
				Selected: {dateRange.start.toDate(getLocalTimeZone()).toLocaleDateString()} - {dateRange.end.toDate(getLocalTimeZone()).toLocaleDateString()}
			</div>
		{/if}
	</div>
    {/snippet}
</Story>

<!-- Button Variants -->
<Story name="Variant - Outline">
    {#snippet template(args: Args)}
	<div class="max-w-md">
		<DateRangePicker buttonVariant="outline" {...args} />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: outline
		</div>
	</div>
    {/snippet}
</Story>

<Story name="Variant - Ghost">
    {#snippet template(args: Args)}
	<div class="max-w-md">
		<DateRangePicker buttonVariant="ghost" {...args} />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: ghost
		</div>
	</div>
    {/snippet}
</Story>

<Story name="Variant - Secondary">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DateRangePicker buttonVariant="secondary" {...args} />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: secondary
		</div>
	</div>
    {/snippet}
</Story>

<!-- Disabled State -->
<Story name="Disabled"> 
    {#snippet template(args: Args)}
	<div class="max-w-md">
		<DateRangePicker disabled {...args} />
		<div class="mt-2 text-sm text-muted-foreground">
			This date range picker is disabled
		</div>
	</div>
    {/snippet}
</Story>



<!-- With Field Component -->
<Story name="Field with Label">
	{#snippet template(args: Args)}
		<Field.Field
			label="Event Duration"
			description="Select the start and end dates for your event"
		>
			<DateRangePicker {...args} />
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Validation">
	{#snippet template(args: Args)}
		<Field.Field
			label="Vacation Dates"
			description="Select your vacation period"
			required
			error="Please select both start and end dates"
		>
			<DateRangePicker 
				error={true}
                {...args}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Full Width">
	{#snippet template(args: Args)}
		<Field.Field
			label="Project Timeline"
			description="Define the project start and end dates"
			required
		>
			<DateRangePicker 
				buttonVariant="outline"
				buttonClass="w-full"
                {...args}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Complete Booking Form">
	{#snippet template()}
		<div class="w-full max-w-md">
			<Field.Set>
				<Field.Legend>Event Booking</Field.Legend>
				<Field.Description>Select your event dates</Field.Description>
				
				<Field.Separator />
				
				<Field.Group class="gap-4">
					<Field.Field
						label="Event Period"
						description="Select check-in and check-out dates"
						required
					>
						<DateRangePicker 
							buttonVariant="outline"
							buttonClass="w-full"
						/>
					</Field.Field>
					
					<Field.Field
						label="Backup Dates"
						description="Optional alternative dates"
					>
						<DateRangePicker 
							buttonVariant="ghost"
							buttonClass="w-full"
						/>
					</Field.Field>
				</Field.Group>
				
				<div class="flex gap-4 pt-4">
					<Button type="submit">Book Event</Button>
					<Button variant="outline" type="button">Clear</Button>
				</div>
			</Field.Set>
		</div>
	{/snippet}
</Story>
