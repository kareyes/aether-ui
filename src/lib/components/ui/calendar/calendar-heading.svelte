<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";
	import type { CalendarSize } from "./calendar.svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.HeadingProps = $props();

	const getSize = getContext<() => CalendarSize>("calendar-size");
	const size = $derived(getSize?.() ?? "default");
	const isFullSize = $derived(size === "full");
</script>

<CalendarPrimitive.Heading
	bind:ref
	class={cn(
		"font-medium",
		isFullSize
			? "text-lg sm:text-2xl px-2"
			: "px-(--cell-size) text-xs sm:text-sm md:text-base",
		className,
	)}
	{...restProps}
/>
