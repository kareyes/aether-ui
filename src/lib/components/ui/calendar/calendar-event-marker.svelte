<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";
	import type { CalendarEvent, CalendarSize } from "./calendar.svelte";

	type Props = {
		events: CalendarEvent[];
		class?: string;
	};

	let { events, class: className }: Props = $props();

	const getSize = getContext<() => CalendarSize>("calendar-size");
	const size = $derived(getSize?.() ?? "default");

	// Determine display mode based on size
	const isFullSize = $derived(size === "full");
	const maxDots = $derived(size === "sm" ? 2 : 3);
	const maxFullEvents = 3; // Max events to show in full size

	// Get unique colors from events (for dots display)
	const eventColors = $derived.by(() => {
		const colors = events
			.map((e) => e.color || "var(--color-primary)")
			.slice(0, maxDots);
		return colors;
	});

	// For badges, show count if more than one event
	const eventCount = $derived(events.length);
	const firstEventLabel = $derived(events[0]?.label);
	const firstEventColor = $derived(
		events[0]?.color || "var(--color-primary)",
	);

	// Events to display in full size mode
	const displayEvents = $derived(events.slice(0, maxFullEvents));
	const remainingCount = $derived(events.length - maxFullEvents);
</script>

{#if events.length > 0}
	{#if isFullSize}
		<!-- Mobile: Show dots -->
		<span
			class={cn(
				"absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 md:hidden",
				className,
			)}
		>
			{#each eventColors as color}
				<span
					class="size-1.5 rounded-full"
					style:background-color={color}
				></span>
			{/each}
			{#if events.length > maxDots}
				<span class="text-[0.5rem] leading-none text-muted-foreground"
					>+{events.length - maxDots}</span
				>
			{/if}
		</span>
		<!-- Desktop: Show full event cards -->
		<div
			class={cn(
				"absolute inset-x-1 top-7 hidden md:flex flex-col gap-0.5 overflow-hidden",
				className,
			)}
		>
			{#each displayEvents as event}
				<div
					class="flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.65rem] leading-tight text-white truncate cursor-pointer hover:opacity-90 transition-opacity"
					style:background-color={event.color ||
						"var(--color-primary)"}
					title={event.description || event.label || "Event"}
				>
					<span class="truncate">{event.label || "Event"}</span>
				</div>
			{/each}
			{#if remainingCount > 0}
				<div class="text-[0.6rem] text-muted-foreground px-1">
					+{remainingCount} more
				</div>
			{/if}
		</div>
	{:else}
		<!-- Dots display for sm/default sizes -->
		<span
			class={cn(
				"absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5",
				className,
			)}
		>
			{#each eventColors as color}
				<span class="size-1 rounded-full" style:background-color={color}
				></span>
			{/each}
			{#if events.length > maxDots}
				<span class="text-[0.5rem] leading-none text-muted-foreground"
					>+{events.length - maxDots}</span
				>
			{/if}
		</span>
	{/if}
{/if}
