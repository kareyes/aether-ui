<script lang="ts">
	import { TimeField as TimeFieldPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import {
		timePickerVariants,
		type TimePickerSize,
		type TimePickerVariant,
	} from "./time-picker-variants.js";
	import TimeFieldSegment from "./time-field-segment.svelte";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		size = "default",
		// Renamed: the `{#snippet children(...)}` below declares a local binding
		// of the same name, which would shadow this prop and make the render
		// call recurse into itself.
		children: childrenProp,
		...restProps
	}: TimeFieldPrimitive.InputProps & {
		variant?: TimePickerVariant;
		size?: TimePickerSize;
	} = $props();

	const styles = $derived(timePickerVariants({ variant, size }));
</script>

<TimeFieldPrimitive.Input
	bind:ref
	data-slot="time-field-input"
	class={cn(styles.field(), className)}
	{...restProps}
>
	{#snippet children(snippetProps)}
		{#if childrenProp}
			{@render childrenProp(snippetProps)}
		{:else}
			<!-- Index-keyed: `literal` separators repeat (":" twice at second
			     granularity), so part+value is not unique. -->
			{#each snippetProps.segments as segment, index (index)}
				<TimeFieldSegment part={segment.part} {size}>
					{segment.value}
				</TimeFieldSegment>
			{/each}
		{/if}
	{/snippet}
</TimeFieldPrimitive.Input>
