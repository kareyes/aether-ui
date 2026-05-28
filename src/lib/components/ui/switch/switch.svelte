<script lang="ts">
	import { Switch as SwitchPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { switchVariants } from './switch-variants.js';
	import type { SwitchProps } from './switch-types.js';

	let {
		ref = $bindable(null),
		class: className,
		checked = $bindable(false),
		variant = 'default',
		size = 'default',
		disabled = false,
		name,
		value,
		required = false,
		onCheckedChange,
		error = false,
		onError,
		...restProps
	}: SwitchProps = $props();

	const variants = $derived(switchVariants({ variant, size }));

	// Track error state and notify parent
	$effect(() => {
		if (onError) {
			onError(error);
		}
	});

	// Handle checked change event
	function handleCheckedChange(newChecked: boolean) {
		checked = newChecked;
		onCheckedChange?.(newChecked);
	}
</script>

<SwitchPrimitive.Root
	bind:ref
	checked={checked}
	onCheckedChange={handleCheckedChange}
	{disabled}
	{name}
	{value}
	{required}
	aria-invalid={error}
	data-slot="switch"
	class={cn(variants.root(), className)}
	{...restProps}
>
	<SwitchPrimitive.Thumb
		data-slot="switch-thumb"
		class={variants.thumb()}
	/>
</SwitchPrimitive.Root>
