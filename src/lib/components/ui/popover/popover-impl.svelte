<script lang="ts">
	import { Popover as PopoverPrimitive } from "bits-ui";
	import Root from "./popover-content.svelte";
	import Trigger from "./popover-trigger.svelte";
	import Content from "./popover-content.svelte";
	import type { PopoverContentVariant, PopoverContentSize, PopoverContentAnimation } from "./popover-content.svelte";
	import type { PopoverTriggerVariant, PopoverTriggerSize } from "./popover-trigger.svelte";
	import type { Snippet } from "svelte";

	type Props = {
		// Trigger
		/** Text label for the trigger button — use when no custom trigger snippet is needed */
		triggerText?: string;
		/** Visual style of the trigger button */
		triggerVariant?: PopoverTriggerVariant;
		/** Size of the trigger button */
		triggerSize?: PopoverTriggerSize;
		/** Extra CSS classes on the trigger element */
		triggerClass?: string;

		// Content
		/** Visual style of the popover panel */
		contentVariant?: PopoverContentVariant;
		/** Width / padding size of the popover panel */
		contentSize?: PopoverContentSize;
		/** Entry / exit animation */
		animation?: PopoverContentAnimation;
		/** Extra CSS classes on the content panel */
		contentClass?: string;

		// Positioning
		/** Which side of the trigger the popover appears on */
		side?: "top" | "right" | "bottom" | "left";
		/** Alignment relative to the trigger */
		align?: "start" | "center" | "end";
		/** Gap between trigger and popover in pixels */
		sideOffset?: number;

		// Controlled state
		open?: boolean;
		onOpenChange?: (open: boolean) => void;

		// Portal
		portalProps?: PopoverPrimitive.PortalProps;

		// Snippets
		/** Custom trigger element — overrides triggerText when provided */
		trigger?: Snippet;
		/** Popover panel content */
		children?: Snippet;
	};

	let {
		triggerText = "Open",
		triggerVariant = "button",
		triggerSize = "default",
		triggerClass,
		contentVariant = "default",
		contentSize = "default",
		animation = "default",
		contentClass,
		side = "bottom",
		align = "center",
		sideOffset = 4,
		open,
		onOpenChange,
		portalProps,
		trigger,
		children,
	}: Props = $props();
</script>

<PopoverPrimitive.Root {open} {onOpenChange}>
	<Trigger variant={triggerVariant} size={triggerSize} class={triggerClass}>
		{#if trigger}
			{@render trigger()}
		{:else}
			{triggerText}
		{/if}
	</Trigger>
	<Content
		variant={contentVariant}
		size={contentSize}
		{animation}
		{side}
		{align}
		{sideOffset}
		{portalProps}
		class={contentClass}
	>
		{@render children?.()}
	</Content>
</PopoverPrimitive.Root>
