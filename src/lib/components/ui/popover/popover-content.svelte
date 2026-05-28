<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const popoverContentVariants = tv({
		base: "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out outline-hidden origin-(--bits-popover-content-transform-origin) z-50 rounded-md border",
		variants: {
			variant: {
				default: "shadow-md",
				bordered: "border-2 shadow-sm",
				elevated: "shadow-lg border-0",
				minimal: "shadow-sm border-border/50",
				ghost: "border-0 shadow-none bg-transparent"
			},
			size: {
				sm: "w-56 p-3 text-sm",
				default: "w-72 p-4",
				lg: "w-96 p-6 text-base",
				auto: "p-4"
			},
			animation: {
				default: "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				fade: "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				scale: "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
				slide: "data-[side=bottom]:slide-in-from-top-4 data-[side=left]:slide-in-from-right-4 data-[side=right]:slide-in-from-left-4 data-[side=top]:slide-in-from-bottom-4",
				none: ""
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			animation: "default"
		}
	});

	export type PopoverContentVariant = VariantProps<typeof popoverContentVariants>["variant"];
	export type PopoverContentSize = VariantProps<typeof popoverContentVariants>["size"];
	export type PopoverContentAnimation = VariantProps<typeof popoverContentVariants>["animation"];
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Popover as PopoverPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		align = "center",
		variant = "default",
		size = "default",
		animation = "default",
		portalProps,
		children,
		...restProps
	}: PopoverPrimitive.ContentProps & {
		variant?: PopoverContentVariant;
		size?: PopoverContentSize;
		animation?: PopoverContentAnimation;
		portalProps?: PopoverPrimitive.PortalProps;
		children?: Snippet;
	} = $props();
</script>

<PopoverPrimitive.Portal {...portalProps}>
	<PopoverPrimitive.Content
		bind:ref
		data-slot="popover-content"
		{sideOffset}
		{align}
		class={cn(popoverContentVariants({ variant, size, animation }), className)}
		{...restProps}
	>
		{@render children?.()}
	</PopoverPrimitive.Content>
</PopoverPrimitive.Portal>
