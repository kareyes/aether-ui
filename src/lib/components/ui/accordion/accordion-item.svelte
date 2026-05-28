<script lang="ts" module>
	import { tv } from "tailwind-variants";
	import type { AccordionVariant } from "./accordion-root.svelte";

	export const accordionItemVariants = tv({
		base: "",
		variants: {
			variant: {
				default: "border-b last:border-b-0",
				bordered: "px-4",
				splitted: "border rounded-lg px-4",
				shadow: "px-4",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});
</script>

<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AccordionPrimitive.ItemProps = $props();

	const accordionContext = getContext<{ variant: AccordionVariant }>("accordion-variant");
	const variant = $derived(accordionContext?.variant ?? "default");
</script>

<AccordionPrimitive.Item
	bind:ref
	data-slot="accordion-item"
	class={cn(accordionItemVariants({ variant }), className)}
	{...restProps}
/>
