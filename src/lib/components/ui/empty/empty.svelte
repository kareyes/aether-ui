<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const emptyVariants = tv({
		base: "flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg text-center text-balance",
		variants: {
			variant: {
				/** No visible border — same as original default */
				default: "border-dashed",
				/** Visible dashed border */
				outline: "border border-dashed",
				/** Dashed border + muted background */
				filled: "border border-dashed bg-muted/50",
				/** No border, no background */
				ghost: "",
			},
			size: {
				sm: "gap-4 p-4",
				default: "gap-6 p-6 md:p-12",
				lg: "gap-8 p-12 md:p-16",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type EmptyVariant = VariantProps<typeof emptyVariants>["variant"];
	export type EmptySize = VariantProps<typeof emptyVariants>["size"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		variant,
		size,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: EmptyVariant;
		size?: EmptySize;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="empty"
	class={cn(emptyVariants({ variant, size }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
