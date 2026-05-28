<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";
	import type { CalendarSize } from "./calendar.svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.HeaderProps = $props();

	const getSize = getContext<() => CalendarSize>("calendar-size");
	const size = $derived(getSize?.() ?? "default");
	const isFullSize = $derived(size === "full");
</script>

<CalendarPrimitive.Header
	bind:ref
	class={cn(
		"flex w-full items-center gap-1 sm:gap-1.5 font-medium",
		isFullSize
			? "h-auto py-3 sm:py-4 px-3 sm:px-4 text-xl sm:text-2xl justify-between"
			: "h-(--cell-size) text-xs sm:text-sm justify-center",
		className,
	)}
	{...restProps}
/>
