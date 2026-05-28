<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const tabsTriggerVariants = tv({
		base: [
			"inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			// Responsive: touch-friendly on mobile, no shrink for scroll
			"max-sm:shrink-0 max-sm:min-h-[44px]",
			"max-md:text-sm",
			// Vertical orientation: left-align text, full width
			"data-[orientation=vertical]:justify-start data-[orientation=vertical]:w-full",
		],
		variants: {
			variant: {
				default: "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground h-[calc(100%-1px)] flex-1 rounded-md border border-transparent px-2 py-1 max-sm:px-3 data-[state=active]:shadow-sm",
				underline: "border-b-2 border-transparent rounded-none data-[state=active]:border-primary data-[state=active]:text-primary hover:text-primary/80 text-muted-foreground px-3 py-2 max-sm:px-4 flex-1 data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r-2",
				pills: "rounded-full px-4 py-1.5 max-sm:px-5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-background/50 text-muted-foreground",
				solid: "rounded-md px-3 py-1.5 max-sm:px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent hover:text-accent-foreground text-muted-foreground flex-1 data-[state=active]:shadow-sm",
				segmented: "rounded-md px-3 py-1.5 max-sm:px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-background/50 text-muted-foreground flex-1"
			},
			size: {
				default: "",
				sm: "text-xs px-2 py-1 max-sm:px-3",
				lg: "text-base px-4 py-2 max-sm:px-5"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	});

	export type TabsTriggerVariant = VariantProps<typeof tabsTriggerVariants>["variant"];
	export type TabsTriggerSize = VariantProps<typeof tabsTriggerVariants>["size"];
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
	}: TabsPrimitive.TriggerProps & {
		variant?: TabsTriggerVariant;
		size?: TabsTriggerSize;
	} = $props();
</script>

<TabsPrimitive.Trigger
	bind:ref
	data-slot="tabs-trigger"
	class={cn(tabsTriggerVariants({ variant, size }), className)}
	{...restProps}
/>
