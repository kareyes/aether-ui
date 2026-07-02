<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		CalendarWeek,
		type CalendarEvent,
	} from "$lib/components/ui/calendar";
	import {
		today,
		getLocalTimeZone,
		isWeekend,
		type DateValue,
	} from "@internationalized/date";
	import type { Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/CalendarWeek",
		component: CalendarWeek,
		tags: ["autodocs"],
		parameters: {
			docs: {
				extractArgTypes: false,
			},
		},
	});
</script>

<script lang="ts">
	let selected = $state<DateValue | undefined>();
	let eventDate = $state<DateValue | undefined>();
	let constrainedDate = $state<DateValue | undefined>();

	const now = today(getLocalTimeZone());
	const iso = (day: number) =>
		`${now.year}-${String(now.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

	const sampleEvents: CalendarEvent[] = [
		{ date: iso(now.day), color: "#ef4444", label: "Standup" },
		{ date: iso(now.day), color: "#3b82f6", label: "1:1" },
		{
			date: iso(Math.min(now.day + 2, 28)),
			color: "#22c55e",
			label: "Review",
		},
	];
</script>

<Story name="Default">
	{#snippet template(args: Args)}
		<div class="max-w-md">
			<CalendarWeek type="single" bind:value={selected} {...args} />
			{#if selected}
				<div class="mt-3 text-sm text-muted-foreground">
					Selected: {selected
						.toDate(getLocalTimeZone())
						.toLocaleDateString()}
				</div>
			{/if}
		</div>
	{/snippet}
</Story>

<Story name="Week Starts On Monday">
	{#snippet template(args: Args)}
		<div class="max-w-md">
			<CalendarWeek type="single" weekStartsOn={1} {...args} />
			<div class="mt-3 text-sm text-muted-foreground">
				The week runs Monday → Sunday
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Events">
	{#snippet template(args: Args)}
		<div class="max-w-md">
			<CalendarWeek
				type="single"
				bind:value={eventDate}
				events={sampleEvents}
				{...args}
			/>
			<div class="mt-3 text-sm text-muted-foreground">
				Events render as dots below the day
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template(args: Args)}
		<div class="flex flex-col gap-6">
			<CalendarWeek type="single" size="sm" {...args} />
			<CalendarWeek type="single" size="default" {...args} />
			<CalendarWeek type="single" size="lg" {...args} />
			<CalendarWeek type="single" size="xl" {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Fluid (Full Width)">
	{#snippet template(args: Args)}
		<div class="w-full max-w-md">
			<CalendarWeek type="single" fluid events={sampleEvents} {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Custom Font Size">
	{#snippet template(args: Args)}
		<div class="flex flex-col gap-6">
			<CalendarWeek type="single" fontSize="0.7rem" {...args} />
			<CalendarWeek type="single" fontSize="1rem" {...args} />
			<CalendarWeek type="single" fontSize="1.25rem" {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Full Width (Scheduling)">
	{#snippet template(args: Args)}
		<div class="w-full">
			<CalendarWeek
				type="single"
				size="full"
				events={sampleEvents}
				{...args}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Date Constraints">
	{#snippet template(args: Args)}
		<div class="max-w-md">
			<CalendarWeek
				type="single"
				bind:value={constrainedDate}
				minValue={now}
				maxValue={now.add({ weeks: 3 })}
				{...args}
			/>
			<div class="mt-3 text-sm text-muted-foreground">
				Navigation stops once a week is fully out of range
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Disabled Weekends">
	{#snippet template(args: Args)}
		<div class="max-w-md">
			<CalendarWeek
				type="single"
				isDateDisabled={(date) => isWeekend(date, "en-US")}
				{...args}
			/>
			<div class="mt-3 text-sm text-muted-foreground">
				Weekends are not selectable
			</div>
		</div>
	{/snippet}
</Story>
