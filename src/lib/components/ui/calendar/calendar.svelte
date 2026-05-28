<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const calendarVariants = tv({
		base: "bg-background group/calendar [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
		variants: {
			size: {
				sm: "p-2 sm:p-3 [--cell-size:--spacing(6)] sm:[--cell-size:--spacing(7)] [--cell-text:0.65rem] sm:[--cell-text:0.75rem] [--head-text:0.6rem] sm:[--head-text:0.7rem]",
				default:
					"p-2 sm:p-3 md:p-4 [--cell-size:--spacing(6)] sm:[--cell-size:--spacing(8)] md:[--cell-size:--spacing(9)] [--cell-text:0.75rem] sm:[--cell-text:0.875rem] md:[--cell-text:0.9375rem] [--head-text:0.7rem] sm:[--head-text:0.8rem] md:[--head-text:0.875rem]",
				lg: "p-2 sm:p-3 md:p-4 [--cell-size:--spacing(7)] sm:[--cell-size:--spacing(10)] md:[--cell-size:--spacing(11)] [--cell-text:0.75rem] sm:[--cell-text:0.875rem] md:[--cell-text:1rem] [--head-text:0.7rem] sm:[--head-text:0.8rem] md:[--head-text:0.9rem]",
				xl: "p-3 sm:p-4 md:p-5 [--cell-size:--spacing(8)] sm:[--cell-size:--spacing(12)] md:[--cell-size:--spacing(13)] [--cell-text:0.875rem] sm:[--cell-text:1rem] md:[--cell-text:1.125rem] [--head-text:0.8rem] sm:[--head-text:0.875rem] md:[--head-text:1rem]",
				full: "p-0 w-full [--cell-text:0.75rem] sm:[--cell-text:0.875rem] md:[--cell-text:0.9375rem] [--head-text:0.75rem] sm:[--head-text:0.875rem] md:[--head-text:1rem]",
			},
		},
		defaultVariants: {
			size: "default",
		},
	});

	export type CalendarSize = VariantProps<typeof calendarVariants>["size"];

	export type CalendarEvent = {
		date: string; // ISO date string (YYYY-MM-DD)
		color?: string;
		label?: string;
		icon?: string; // Icon component or URL
		description?: string;
	};
</script>

<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import * as Calendar from "./index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ButtonVariant } from "../button/button.svelte";
	import { isEqualMonth, type DateValue } from "@internationalized/date";
	import type { Snippet } from "svelte";
	import { setContext } from "svelte";

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		weekdayFormat = "short",
		buttonVariant = "ghost",
		captionLayout = "label",
		locale = "en-US",
		months: monthsProp,
		years,
		monthFormat: monthFormatProp,
		yearFormat = "numeric",
		day,
		disableDaysOutsideMonth = false,
		size = "default",
		events = [],
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.RootProps> & {
		buttonVariant?: ButtonVariant;
		captionLayout?:
			| "dropdown"
			| "dropdown-months"
			| "dropdown-years"
			| "label";
		months?: CalendarPrimitive.MonthSelectProps["months"];
		years?: CalendarPrimitive.YearSelectProps["years"];
		monthFormat?: CalendarPrimitive.MonthSelectProps["monthFormat"];
		yearFormat?: CalendarPrimitive.YearSelectProps["yearFormat"];
		day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
		size?: CalendarSize;
		events?: CalendarEvent[];
	} = $props();

	const monthFormat = $derived.by(() => {
		if (monthFormatProp) return monthFormatProp;
		if (captionLayout.startsWith("dropdown")) return "short";
		return "long";
	});

	// Create a map of events by date for quick lookup
	const eventsByDate = $derived.by(() => {
		const map = new Map<string, CalendarEvent[]>();
		for (const event of events) {
			const existing = map.get(event.date) || [];
			existing.push(event);
			map.set(event.date, existing);
		}
		return map;
	});

	// Set context for child components to access size and events
	setContext("calendar-size", () => size);
	setContext("calendar-events", () => eventsByDate);
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<CalendarPrimitive.Root
	bind:value={value as never}
	bind:ref
	bind:placeholder
	weekdayFormat={size === "full" ? "long" : weekdayFormat}
	{disableDaysOutsideMonth}
	class={cn(calendarVariants({ size }), className)}
	{locale}
	{monthFormat}
	{yearFormat}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<Calendar.Months>
			{#if size !== "full"}
				<Calendar.Nav>
					<Calendar.PrevButton variant={buttonVariant} />
					<Calendar.NextButton variant={buttonVariant} />
				</Calendar.Nav>
			{/if}
			{#each months as month, monthIndex (month)}
				<Calendar.Month>
					<Calendar.Header>
						{#if size === "full"}
							<Calendar.Heading />
							<Calendar.Nav>
								<Calendar.PrevButton variant={buttonVariant} />
								<Calendar.NextButton variant={buttonVariant} />
							</Calendar.Nav>
						{:else}
							<Calendar.Caption
								{captionLayout}
								months={monthsProp}
								{monthFormat}
								{years}
								{yearFormat}
								month={month.value}
								bind:placeholder
								{locale}
								{monthIndex}
							/>
						{/if}
					</Calendar.Header>
					<Calendar.Grid>
						<Calendar.GridHead>
							<Calendar.GridRow class="select-none">
								{#each weekdays as weekday, i (weekday)}
									<Calendar.HeadCell>
										{#if size === "full"}
											<!-- Show short on mobile, full on desktop -->
											<span class="hidden md:inline"
												>{weekday}</span
											>
											<span class="md:hidden"
												>{weekday.slice(0, 2)}</span
											>
										{:else}
											{weekday.slice(0, 2)}
										{/if}
									</Calendar.HeadCell>
								{/each}
							</Calendar.GridRow>
						</Calendar.GridHead>
						<Calendar.GridBody>
							{#each month.weeks as weekDates (weekDates)}
								<Calendar.GridRow
									class={size === "full"
										? "w-full"
										: "mt-2 w-full"}
								>
									{#each weekDates as date (date)}
										<Calendar.Cell
											{date}
											month={month.value}
										>
											{#if day}
												{@render day({
													day: date,
													outsideMonth: !isEqualMonth(
														date,
														month.value,
													),
												})}
											{:else}
												<Calendar.Day {date} />
											{/if}
										</Calendar.Cell>
									{/each}
								</Calendar.GridRow>
							{/each}
						</Calendar.GridBody>
					</Calendar.Grid>
				</Calendar.Month>
			{/each}
		</Calendar.Months>
	{/snippet}
</CalendarPrimitive.Root>
