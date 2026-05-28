import { Popover as PopoverPrimitive } from "bits-ui";
import type { Component } from "svelte";
import Content, {
	type PopoverContentVariant,
	type PopoverContentSize,
	type PopoverContentAnimation,
	popoverContentVariants,
} from "./popover-content.svelte";
import Trigger, {
	type PopoverTriggerVariant,
	type PopoverTriggerSize,
	popoverTriggerVariants,
} from "./popover-trigger.svelte";
import PopoverImpl from "./popover-impl.svelte";

const Root: Component = PopoverPrimitive.Root;
const Close: Component = PopoverPrimitive.Close;
const Arrow: Component = PopoverPrimitive.Arrow;

// Export variant arrays for Storybook and other use cases
const ContentVariants: PopoverContentVariant[] = Object.keys(
	popoverContentVariants.variants.variant,
) as PopoverContentVariant[];
const ContentSizes: PopoverContentSize[] = Object.keys(
	popoverContentVariants.variants.size,
) as PopoverContentSize[];
const ContentAnimations: PopoverContentAnimation[] = Object.keys(
	popoverContentVariants.variants.animation,
) as PopoverContentAnimation[];

const TriggerVariants: PopoverTriggerVariant[] = Object.keys(
	popoverTriggerVariants.variants.variant,
) as PopoverTriggerVariant[];
const TriggerSizes: PopoverTriggerSize[] = Object.keys(
	popoverTriggerVariants.variants.size,
) as PopoverTriggerSize[];

export {
	Root,
	Content,
	Trigger,
	Close,
	Arrow,
	// Declarative single-component API
	PopoverImpl as Popover,
	// Named aliases for primitive imports
	Root as PopoverRoot,
	Content as PopoverContent,
	Trigger as PopoverTrigger,
	Close as PopoverClose,
	Arrow as PopoverArrow,
	//
	popoverContentVariants,
	popoverTriggerVariants,
	ContentVariants,
	ContentSizes,
	ContentAnimations,
	TriggerVariants,
	TriggerSizes,
};

// Export types
export type {
	PopoverContentVariant,
	PopoverContentSize,
	PopoverContentAnimation,
	PopoverTriggerVariant,
	PopoverTriggerSize,
};
