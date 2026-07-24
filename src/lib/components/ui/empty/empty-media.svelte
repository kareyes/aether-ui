<script lang="ts" module>
	export {
		emptyMediaVariants,
		type EmptyMediaVariant,
	} from "./empty-media-variants.js";
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { emptyMediaVariants, type EmptyMediaVariant } from "./empty-media-variants.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "default",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { variant?: EmptyMediaVariant } = $props();
</script>

<div
	bind:this={ref}
	data-slot="empty-icon"
	data-variant={variant}
	class={cn(emptyMediaVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
