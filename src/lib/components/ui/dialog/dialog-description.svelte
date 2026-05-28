<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { dialogVariants } from "./dialog-variants.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.DescriptionProps = $props();

	const variants = dialogVariants();
</script>

<DialogPrimitive.Description
	bind:ref
	data-slot="dialog-description"
	class={cn(variants.description(), className)}
	{...restProps}
/>
