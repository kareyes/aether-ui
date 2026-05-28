<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";
	import type { CalendarSize } from "./calendar.svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.CellProps = $props();

	const getSize = getContext<() => CalendarSize>("calendar-size");
	const size = $derived(getSize?.() ?? "default");
	const isFullSize = $derived(size === "full");
</script>

<CalendarPrimitive.Cell
	bind:ref
	class={cn(
		"relative p-0 text-sm focus-within:z-20",
		isFullSize
			? "flex-1 text-left"
			: "size-(--cell-size) text-center [&:first-child[data-selected]_[data-bits-day]]:rounded-l-md [&:last-child[data-selected]_[data-bits-day]]:rounded-r-md",
		className
	)}
	{...restProps}
/>
