<script lang="ts">
	import { TimeField as TimeFieldPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<TimeFieldPrimitive.LabelProps> = $props();
</script>

<TimeFieldPrimitive.Label
	bind:ref
	data-slot="time-field-label"
	class={cn(
		"text-sm font-medium leading-none select-none",
		"peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		"data-[disabled]:opacity-70",
		className,
	)}
	{...restProps}
>
	{@render children?.()}
</TimeFieldPrimitive.Label>
