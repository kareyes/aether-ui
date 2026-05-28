<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const breadcrumbPageVariants = tv({
		base: "",
		variants: {
			variant: {
				default: "text-foreground font-normal",
				bold: "text-foreground font-semibold",
				muted: "text-muted-foreground font-normal",
				accent: "text-primary font-medium"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	});

	export type BreadcrumbPageVariant = VariantProps<typeof breadcrumbPageVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> & {
		variant?: BreadcrumbPageVariant;
	} = $props();
</script>

<span
	bind:this={ref}
	data-slot="breadcrumb-page"
	role="link"
	aria-disabled="true"
	aria-current="page"
	class={cn(breadcrumbPageVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</span>
