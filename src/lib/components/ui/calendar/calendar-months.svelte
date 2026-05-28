<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getContext } from "svelte";
	import type { CalendarSize } from "./calendar.svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	const getSize = getContext<() => CalendarSize>("calendar-size");
	const size = $derived(getSize?.() ?? "default");
	const isFullSize = $derived(size === "full");
</script>

<div
	bind:this={ref}
	class={cn(
		"relative flex flex-col",
		isFullSize ? "gap-0 w-full" : "gap-4 md:flex-row",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
