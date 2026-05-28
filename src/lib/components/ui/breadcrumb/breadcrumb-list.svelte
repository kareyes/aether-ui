<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const breadcrumbListVariants = tv({
		base: "flex flex-wrap items-center break-words",
		variants: {
			variant: {
				default: "text-muted-foreground",
				solid: "text-foreground",
				subtle: "text-muted-foreground/70",
				bold: "text-foreground font-medium"
			},
			size: {
				sm: "gap-1 text-xs sm:gap-1.5",
				default: "gap-1.5 text-sm sm:gap-2.5",
				lg: "gap-2 text-base sm:gap-3"
			},
			spacing: {
				compact: "gap-1",
				default: "gap-1.5 sm:gap-2.5",
				relaxed: "gap-3 sm:gap-4"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			spacing: "default"
		}
	});

	export type BreadcrumbListVariant = VariantProps<typeof breadcrumbListVariants>["variant"];
	export type BreadcrumbListSize = VariantProps<typeof breadcrumbListVariants>["size"];
	export type BreadcrumbListSpacing = VariantProps<typeof breadcrumbListVariants>["spacing"];
</script>

<script lang="ts">
	import type { HTMLOlAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		size = "default",
		spacing = "default",
		children,
		...restProps
	}: WithElementRef<HTMLOlAttributes> & {
		variant?: BreadcrumbListVariant;
		size?: BreadcrumbListSize;
		spacing?: BreadcrumbListSpacing;
	} = $props();
</script>

<ol
	bind:this={ref}
	data-slot="breadcrumb-list"
	class={cn(breadcrumbListVariants({ variant, size, spacing }), className)}
	{...restProps}
>
	{@render children?.()}
</ol>
