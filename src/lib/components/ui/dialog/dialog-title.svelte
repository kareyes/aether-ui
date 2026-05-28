<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { dialogVariants } from "./dialog-variants.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.TitleProps = $props();

	const variants = dialogVariants();
</script>

<DialogPrimitive.Title
	bind:ref
	data-slot="dialog-title"
	class={cn(variants.title(), className)}
	{...restProps}
/>
