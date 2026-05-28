<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const tabsListVariants = tv({
		base: [
			"inline-flex items-center justify-center p-[3px]",
			// Responsive: scroll on mobile, wrap on tablet
			"max-sm:w-full max-sm:justify-start max-sm:overflow-x-auto max-sm:flex-nowrap max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden",
			"max-md:w-full",
			"w-fit",
			// Vertical orientation support
			"data-[orientation=vertical]:flex-col data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-fit data-[orientation=vertical]:items-stretch",
		],
		variants: {
			variant: {
				default: "bg-muted text-muted-foreground rounded-lg",
				underline: "bg-transparent border-b border-border gap-1 p-0 data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r",
				pills: "bg-muted/50 rounded-full gap-1 data-[orientation=vertical]:rounded-lg",
				solid: "bg-card border border-border rounded-lg shadow-sm",
				segmented: "bg-muted rounded-lg gap-0.5"
			},
			size: {
				default: "h-9 max-sm:h-11 data-[orientation=vertical]:h-auto",
				sm: "h-8 max-sm:h-10 data-[orientation=vertical]:h-auto",
				lg: "h-10 max-sm:h-12 data-[orientation=vertical]:h-auto"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	});

	export type TabsListVariant = VariantProps<typeof tabsListVariants>["variant"];
	export type TabsListSize = VariantProps<typeof tabsListVariants>["size"];
</script>

<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		size = "default",
		...restProps
	}: TabsPrimitive.ListProps & {
		variant?: TabsListVariant;
		size?: TabsListSize;
	} = $props();
</script>

<TabsPrimitive.List
	bind:ref
	data-slot="tabs-list"
	class={cn(tabsListVariants({ variant, size }), className)}
	{...restProps}
/>
