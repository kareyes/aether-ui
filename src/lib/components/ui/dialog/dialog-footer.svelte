<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
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
	data-slot="dialog-footer"
	class={cn(variants.footer(), className)}
	{...restProps}
>
	{@render children?.()}
</div>
