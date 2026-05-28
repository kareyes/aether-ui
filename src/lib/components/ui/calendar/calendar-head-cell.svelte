<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";
	import type { CalendarSize } from "./calendar.svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.HeadCellProps = $props();

	const getSize = getContext<() => CalendarSize>("calendar-size");
	const size = $derived(getSize?.() ?? "default");
	const isFullSize = $derived(size === "full");
</script>

<CalendarPrimitive.HeadCell
	bind:ref
	class={cn(
		"text-muted-foreground text-[length:var(--head-text)] font-normal",
		isFullSize
			? "flex-1 py-2 px-1 text-center  font-medium"
			: "w-(--cell-size) rounded-md",
		className,
	)}
	{...restProps}
/>
