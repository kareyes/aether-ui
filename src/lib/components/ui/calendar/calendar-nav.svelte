<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import type { CalendarSize } from "./calendar.svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();

	const getSize = getContext<() => CalendarSize>("calendar-size");
	const size = $derived(getSize?.() ?? "default");
	const isFullSize = $derived(size === "full");
</script>

<nav
	{...restProps}
	bind:this={ref}
	class={cn(
		"flex items-center gap-1",
		isFullSize
			? "static justify-end"
			: "absolute inset-x-0 top-0 w-full justify-between",
		className
	)}
>
	{@render children?.()}
</nav>
