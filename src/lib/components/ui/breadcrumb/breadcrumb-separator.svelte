<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const breadcrumbSeparatorVariants = tv({
		base: "",
		variants: {
			variant: {
				default: "[&>svg]:size-3.5",
				slash: "[&>svg]:size-4",
				dot: "[&>svg]:size-1.5",
				arrow: "[&>svg]:size-4"
			},
			size: {
				sm: "[&>svg]:size-3",
				default: "[&>svg]:size-3.5",
				lg: "[&>svg]:size-4"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	});

	export type BreadcrumbSeparatorVariant = VariantProps<typeof breadcrumbSeparatorVariants>["variant"];
	export type BreadcrumbSeparatorSize = VariantProps<typeof breadcrumbSeparatorVariants>["size"];
</script>

<script lang="ts">
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import SlashIcon from "@lucide/svelte/icons/slash";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import { Circle } from "@lucide/svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLLiAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		size = "default",
		children,
		...restProps
	}: WithElementRef<HTMLLiAttributes> & {
		variant?: BreadcrumbSeparatorVariant;
		size?: BreadcrumbSeparatorSize;
	} = $props();
</script>

<li
	bind:this={ref}
	data-slot="breadcrumb-separator"
	role="presentation"
	aria-hidden="true"
	class={cn(breadcrumbSeparatorVariants({ variant, size }), className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else if variant === "slash"}
		<SlashIcon />
	{:else if variant === "dot"}
		<Circle fill="currentColor" />
	{:else if variant === "arrow"}
		<ArrowRightIcon />
	{:else}
		<ChevronRightIcon />
	{/if}
</li>
