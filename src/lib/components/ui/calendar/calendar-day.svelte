<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { getContext } from "svelte";
	import type { CalendarEvent, CalendarSize } from "./calendar.svelte";
	import EventMarker from "./calendar-event-marker.svelte";

	let {
		ref = $bindable(null),
		class: className,
		date,
		showEventMarkers = true,
		...restProps
	}: CalendarPrimitive.DayProps & {
		date?: { year: number; month: number; day: number };
		showEventMarkers?: boolean;
	} = $props();

	const getSize = getContext<() => CalendarSize>("calendar-size");
	const size = $derived(getSize?.() ?? "default");
	const isFullSize = $derived(size === "full");

	const getEventsByDate =
		getContext<() => Map<string, CalendarEvent[]>>("calendar-events");

	// Format the date to ISO string for lookup
	const dateKey = $derived.by(() => {
		if (!date) return null;
		const year = date.year;
		const month = String(date.month).padStart(2, "0");
		const day = String(date.day).padStart(2, "0");
		return `${year}-${month}-${day}`;
	});

	// Get events for this date
	const dayEvents = $derived.by(() => {
		if (!dateKey || !getEventsByDate) return [];
		const eventsMap = getEventsByDate();
		return eventsMap.get(dateKey) || [];
	});
</script>

<CalendarPrimitive.Day
	bind:ref
	class={cn(
		buttonVariants({ variant: "ghost" }),
		"relative flex select-none whitespace-nowrap font-normal leading-none text-[length:var(--cell-text)] min-h-9 sm:min-h-10",
		// Full size specific styles
		isFullSize
			? "h-full w-full min-h-20 sm:min-h-24 md:min-h-28 items-start justify-start p-1 sm:p-2 rounded-none border-t"
			: "size-(--cell-size) flex-col items-center justify-center gap-0.5 sm:gap-1 p-0",
		"[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground [&[data-today][data-disabled]]:text-muted-foreground",
		isFullSize
			? "data-[selected]:bg-primary/10 data-[selected]:text-foreground"
			: "data-[selected]:bg-primary dark:data-[selected]:hover:bg-accent/50 data-[selected]:text-primary-foreground",
		// Outside months
		"[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground",
		isFullSize && "[&[data-outside-month]]:bg-muted/30",
		// Disabled
		"data-[disabled]:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		// Unavailable
		"data-[unavailable]:text-muted-foreground data-[unavailable]:line-through",
		// hover
		"dark:hover:text-accent-foreground",
		// focus
		"focus:border-ring focus:ring-ring/50 focus:relative",
		// inner spans (non-full only)
		!isFullSize &&
			"[&>span]:text-xs sm:[&>span]:text-sm [&>span]:opacity-70",
		className,
	)}
	{...restProps}
>
	{#snippet children({ day: dayValue })}
		<span
			class={cn(
				"relative z-10 text-xs sm:text-sm",
				isFullSize && "text-sm sm:text-base font-medium",
			)}
		>
			{dayValue}
		</span>
		{#if showEventMarkers && dayEvents.length > 0}
			<EventMarker events={dayEvents} />
		{/if}
	{/snippet}
</CalendarPrimitive.Day>
