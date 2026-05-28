<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Calendar, type CalendarEvent } from "$lib/components/ui/calendar";
	import {
		today,
		getLocalTimeZone,
		isWeekend,
		type DateValue,
	} from "@internationalized/date";
	import type { Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/Calendar",
		component: Calendar,
		tags: ["autodocs"],
		parameters: {
			docs: {
				extractArgTypes: false,
			},
		},
	});
</script>

<script lang="ts">
	let singleDate = $state<DateValue | undefined>();
	let dropdownDate = $state<DateValue | undefined>();
	let constrainedDate = $state<DateValue | undefined>();
	let multiMonthDate = $state<DateValue | undefined>();

	// Sample events for demonstrations
	const now = today(getLocalTimeZone());
	const sampleEvents: CalendarEvent[] = [
		{
			date: `${now.year}-${String(now.month).padStart(2, "0")}-05`,
			color: "#ef4444",
			label: "Meeting",
		},
		{
			date: `${now.year}-${String(now.month).padStart(2, "0")}-05`,
			color: "#3b82f6",
			label: "Call",
		},
		{
			date: `${now.year}-${String(now.month).padStart(2, "0")}-10`,
			color: "#22c55e",
			label: "Event",
		},
		{
			date: `${now.year}-${String(now.month).padStart(2, "0")}-15`,
			color: "#f59e0b",
			label: "Deadline",
		},
		{
			date: `${now.year}-${String(now.month).padStart(2, "0")}-15`,
			color: "#8b5cf6",
			label: "Review",
		},
		{
			date: `${now.year}-${String(now.month).padStart(2, "0")}-15`,
			color: "#ec4899",
		},
		{
			date: `${now.year}-${String(now.month).padStart(2, "0")}-20`,
			color: "#06b6d4",
			label: "Launch",
		},
		{
			date: `${now.year}-${String(now.month).padStart(2, "0")}-${String(now.day).padStart(2, "0")}`,
			color: "#ef4444",
			label: "Today",
		},
	];
</script>

<Story name="Default">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" bind:value={singleDate} {...args} />
			{#if singleDate}
				<div class="mt-2 text-sm text-muted-foreground">
					Selected: {singleDate
						.toDate(getLocalTimeZone())
						.toLocaleDateString()}
				</div>
			{/if}
		</div>
	{/snippet}
</Story>

<Story name="With Initial Value">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				value={today(getLocalTimeZone())}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Initialized with today's date
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Dropdown Navigation">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				bind:value={dropdownDate}
				captionLayout="dropdown"
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Use dropdowns to quickly navigate months and years
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Dropdown Months Only">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" captionLayout="dropdown-months" {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Month dropdown with year as text
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Dropdown Years Only">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" captionLayout="dropdown-years" {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Year dropdown with month as text
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Multiple Months">
	{#snippet template(args: Args)}
		<div>
			<Calendar
				type="single"
				bind:value={multiMonthDate}
				numberOfMonths={2}
				{...args}
			/>
			{#if multiMonthDate}
				<div class="mt-2 text-sm text-muted-foreground">
					Selected: {multiMonthDate
						.toDate(getLocalTimeZone())
						.toLocaleDateString()}
				</div>
			{/if}
		</div>
	{/snippet}
</Story>

<Story name="Three Months">
	{#snippet template(args: Args)}
		<div>
			<Calendar type="single" numberOfMonths={3} {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Date Constraints">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				bind:value={constrainedDate}
				minValue={today(getLocalTimeZone())}
				maxValue={today(getLocalTimeZone()).add({ months: 2 })}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Only dates from today to 2 months ahead are selectable
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Disabled Weekends">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				isDateDisabled={(date) => isWeekend(date, "en-US")}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Weekends are disabled
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Unavailable Dates">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				isDateUnavailable={(date) =>
					[5, 10, 15, 20, 25].includes(date.day)}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Dates 5, 10, 15, 20, 25 are marked as unavailable
				(strikethrough)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Week Starts Monday">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" weekStartsOn={1} {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Week starts on Monday
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Fixed Weeks">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" fixedWeeks={true} {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Always shows 6 weeks for consistent height
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Hide Days Outside Month">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" disableDaysOutsideMonth={true} {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Days outside the current month are disabled
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Spanish Locale">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" locale="es-ES" {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Spanish locale (es-ES)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="French Locale">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" locale="fr-FR" weekStartsOn={1} {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				French locale (fr-FR) with Monday start
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Japanese Locale">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" locale="ja-JP" {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Japanese locale (ja-JP)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Narrow Weekdays">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" weekdayFormat="narrow" {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Narrow weekday format (S, M, T, W, T, F, S)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Long Weekdays">
	{#snippet template(args: Args)}
		<div>
			<Calendar type="single" weekdayFormat="long" {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Long weekday format (Sunday, Monday, etc.)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" disabled {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Calendar is disabled
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Readonly">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				readonly
				value={today(getLocalTimeZone())}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Calendar is read-only (can navigate but not select)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Size Small">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" size="sm" {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Small size calendar (compact)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Size Large">
	{#snippet template(args: Args)}
		<div>
			<Calendar type="single" size="lg" {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Large size calendar
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Size Extra Large">
	{#snippet template(args: Args)}
		<div>
			<Calendar type="single" size="xl" {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Extra large size calendar
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Size Comparison">
	{#snippet template(args: Args)}
		<div class="grid grid-cols-2 gap-8">
			<div class="space-y-2">
				<div class="text-sm font-medium">Small</div>
				<Calendar type="single" size="sm" {...args} />
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium">Default</div>
				<Calendar type="single" size="default" {...args} />
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium">Large</div>
				<Calendar type="single" size="lg" {...args} />
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium">Extra Large</div>
				<Calendar type="single" size="xl" {...args} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Events with Dots">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" events={sampleEvents} {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Events shown as colored dots (default size). Check dates 5, 10,
				15, 20, and today.
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Events with Badges">
	{#snippet template(args: Args)}
		<div>
			<Calendar type="single" size="xl" events={sampleEvents} {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Events shown as badges (XL size). Check dates 5, 10, 15, 20, and
				today.
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Events Size Comparison">
	{#snippet template(args: Args)}
		<div class="grid grid-cols-2 gap-8">
			<div class="space-y-2">
				<div class="text-sm font-medium">Small (Dots)</div>
				<Calendar
					type="single"
					size="sm"
					events={sampleEvents}
					{...args}
				/>
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium">Default (Dots)</div>
				<Calendar
					type="single"
					size="default"
					events={sampleEvents}
					{...args}
				/>
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium">Large (Badges)</div>
				<Calendar
					type="single"
					size="lg"
					events={sampleEvents}
					{...args}
				/>
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium">XL (Badges)</div>
				<Calendar
					type="single"
					size="xl"
					events={sampleEvents}
					{...args}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Full Featured XL">
	{#snippet template(args: Args)}
		<div>
			<Calendar
				type="single"
				size="xl"
				events={sampleEvents}
				captionLayout="dropdown"
				fixedWeeks={true}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				XL calendar with events, dropdown navigation, and fixed weeks
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Full Size Calendar">
	{#snippet template(args: Args)}
		<div class="w-full max-w-4xl">
			<Calendar
				type="single"
				size="full"
				events={sampleEvents}
				fixedWeeks={true}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Full-width calendar with event cards. Responsive on
				mobile/desktop.
			</div>
		</div>
	{/snippet}
</Story>
