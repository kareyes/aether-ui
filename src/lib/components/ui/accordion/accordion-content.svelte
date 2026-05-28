<script lang="ts" module>
	import { tv } from "tailwind-variants";
	import type { AccordionVariant } from "./accordion-root.svelte";

	export const accordionContentVariants = tv({
		base: "pb-4 pt-0",
		variants: {
			variant: {
				default: "",
				bordered: "",
				splitted: "",
				shadow: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});
</script>

<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<AccordionPrimitive.ContentProps> = $props();

	const accordionContext = getContext<{ variant: AccordionVariant }>("accordion-variant");
	const variant = $derived(accordionContext?.variant ?? "default");
</script>

<AccordionPrimitive.Content
	bind:ref
	data-slot="accordion-content"
	class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
	{...restProps}
>
	<div class={cn(accordionContentVariants({ variant }), className)}>
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>
