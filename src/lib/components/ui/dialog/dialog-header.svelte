<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { dialogVariants } from "./dialog-variants.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	const variants = dialogVariants();
</script>

<div
	bind:this={ref}
	data-slot="dialog-header"
	class={cn(variants.header(), className)}
	{...restProps}
>
	{@render children?.()}
</div>
