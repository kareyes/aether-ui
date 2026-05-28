<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const accordionVariants = tv({
		base: "w-full",
		variants: {
			variant: {
				default: "",
				bordered: "border rounded-lg divide-y",
				splitted: "space-y-2",
				shadow: "border rounded-lg shadow-sm divide-y",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type AccordionVariant = VariantProps<typeof accordionVariants>["variant"];
</script>

<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { setContext } from "svelte";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		variant = "default",
		...restProps
	}: AccordionPrimitive.RootProps & {
		variant?: AccordionVariant;
	} = $props();

	// Provide variant context to child components
	setContext("accordion-variant", {
		get variant() {
			return variant;
		},
	});
</script>

<AccordionPrimitive.Root
	bind:ref
	bind:value={value as never}
	data-slot="accordion"
	data-variant={variant}
	class={cn(accordionVariants({ variant }), className)}
	{...restProps}
/>
