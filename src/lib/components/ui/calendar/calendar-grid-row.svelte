<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";
	import type { CalendarSize } from "./calendar.svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.GridRowProps = $props();

	const getSize = getContext<() => CalendarSize>("calendar-size");
	const size = $derived(getSize?.() ?? "default");
	const isFullSize = $derived(size === "full");
</script>

<CalendarPrimitive.GridRow
	bind:ref
	class={cn("flex", isFullSize && "flex-1", className)}
	{...restProps}
/>
