<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<main
	bind:this={ref}
	data-slot="sidebar-inset"
	class={cn(
		// `min-w-0` is load-bearing, not tidying. This is a flex item inside the
		// provider's `flex w-full` row, and a flex item defaults to
		// `min-width: auto` — it will not shrink below its content's intrinsic
		// width. Without it, one wide table pushes the inset past the viewport
		// and the *whole document* scrolls sideways, taking the sidebar and the
		// sticky header with it. With it, the overflow stays inside whichever
		// child owns it.
		"bg-background relative flex w-full min-w-0 flex-1 flex-col",
		"md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</main>
