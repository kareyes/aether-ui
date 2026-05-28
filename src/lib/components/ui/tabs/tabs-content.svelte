<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const tabsContentVariants = tv({
		base: "flex-1 outline-none",
		variants: {
			animation: {
				none: "",
				fade: "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:duration-200",
				slide: "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-1 data-[state=active]:duration-200",
				scale: "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95 data-[state=active]:duration-200"
			},
			padding: {
				none: "",
				default: "pt-4",
				sm: "pt-2",
				lg: "pt-6"
			}
		},
		defaultVariants: {
			animation: "fade",
			padding: "default"
		}
	});

	export type TabsContentAnimation = VariantProps<typeof tabsContentVariants>["animation"];
	export type TabsContentPadding = VariantProps<typeof tabsContentVariants>["padding"];
</script>

<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		animation = "fade",
		padding = "default",
		...restProps
	}: TabsPrimitive.ContentProps & {
		animation?: TabsContentAnimation;
		padding?: TabsContentPadding;
	} = $props();
</script>

<TabsPrimitive.Content
	bind:ref
	data-slot="tabs-content"
	class={cn(tabsContentVariants({ animation, padding }), className)}
	{...restProps}
/>
