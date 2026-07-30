<script lang="ts">
	import { TimeField as TimeFieldPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import { timePickerVariants, type TimePickerSize } from "./time-picker-variants.js";

	let {
		ref = $bindable(null),
		class: className,
		size = "default",
		children,
		...restProps
	}: WithoutChild<TimeFieldPrimitive.SegmentProps> & {
		size?: TimePickerSize;
	} = $props();

	const styles = $derived(timePickerVariants({ size }));
</script>

<TimeFieldPrimitive.Segment
	bind:ref
	data-slot="time-field-segment"
	class={cn(styles.segment(), className)}
	{...restProps}
>
	{@render children?.()}
</TimeFieldPrimitive.Segment>
