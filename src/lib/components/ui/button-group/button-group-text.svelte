<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		child,
		variant = "bg",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
			child?: Snippet<[{ props: Record<string, unknown> }]>,
			variant?: "bg" | "ghost" | string;
	} = $props();

	// `$derived.by`, not `$derived(() => …)`. The latter makes `variantBase` the
	// closure itself, and `cn` drops a function without complaining — the label
	// rendered as bare text with none of its ground, padding or border.
	const variantBase = $derived.by(() => {
		switch (variant) {
			case "ghost":
				return "bg-transparent shadow-none flex items-center gap-2 rounded-md px-3 text-sm font-medium";
			case "bg":
			default:
				return "bg-muted shadow-xs flex items-center gap-2 rounded-md border px-4 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none";
		}
	});

	const mergedProps = $derived({
		...restProps,
		"data-slot": "button-group-text",
		class: cn(variantBase, className),
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div bind:this={ref} {...mergedProps}>
		{@render mergedProps.children?.()}
	</div>
{/if}
