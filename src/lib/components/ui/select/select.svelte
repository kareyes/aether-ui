<script lang="ts" module>
	export type { SelectProps, SelectOption, SelectOptionGroup, SelectVariant, SelectSize } from './utils/select-types.js';
	export { selectVariants } from './utils/select-variants.js';
</script>

<script lang="ts">
	import { 
		SelectRoot, 
		SelectTrigger, 
		SelectContent, 
		SelectItem, 
		SelectLabel, 
		SelectSeparator 
	} from "./index.js";
	import Group from "./select-group.svelte";
	import { cn } from "$lib/utils.js";
	import type { SelectProps } from './utils/select-types.js';
	import { useFindOption, useDisplayValue } from './utils/select-hooks.js';

	let {
		ref = $bindable(null),
		class: className,
		placeholder = "Select an option...",
		options = [],
		groups = [],
		value = $bindable(undefined),
		multiple = false,
		disabled = false,
		required = false,
		name,
		size = "default",
		variant = "default",
		contentClass,
		triggerClass,
		itemClass,
		sideOffset = 4,
		error = false,
		loading = false,
		onError,
		onSelectionChange,
		...restProps
	}: SelectProps = $props();

	// Use hooks for option lookup and display value - pass getters for reactivity
	const findOptionByValue = useFindOption(() => options, () => groups);
	const getDisplayValue = useDisplayValue(
		() => value, 
		() => multiple, 
		() => placeholder, 
		findOptionByValue
	);
	const displayValue = $derived(getDisplayValue());

	// Handle value changes
	$effect(() => {
		if (onSelectionChange) {
			if (multiple && Array.isArray(value)) {
				(onSelectionChange as (value: string[]) => void)(value);
			} else if (!multiple && typeof value === 'string') {
				(onSelectionChange as (value: string | undefined) => void)(value);
			}

		}
	});

	// Track error state and notify parent
	$effect(() => {
		if (onError) {
			onError(error);
		}
	});

</script>

{#snippet triggerContent()}
	<SelectTrigger
		bind:ref
		{size}
		{variant}
		{error}
		{loading}
		{onError}
		class={cn(triggerClass, className)}
	>
		{displayValue}
	</SelectTrigger>
{/snippet}

{#snippet contentItems()}
	<SelectContent
		{sideOffset}
		class={contentClass}
	>
		<!-- Direct Options -->
		{#each options as option (option.value)}
			<SelectItem
				value={option.value}
				disabled={option.disabled}
				class={itemClass}
			>
				{option.label}
			</SelectItem>
		{/each}

		<!-- Grouped Options -->
		{#each groups as group, groupIndex (groupIndex)}
			{#if groupIndex > 0 || options.length > 0}
				<SelectSeparator />
			{/if}
			
			{#if group.label}
				<SelectLabel>
					{group.label}
				</SelectLabel>
			{/if}

			<Group>
				{#each group.options as option (option.value)}
					<SelectItem
						value={option.value}
						disabled={option.disabled}
						class={itemClass}
					>
						{option.label}
					</SelectItem>
				{/each}
			</Group>
		{/each}
	</SelectContent>
{/snippet}

{#if multiple}
<SelectRoot
	bind:value={value as string[]}
	type="multiple"
	disabled={loading || disabled}
	{required}
	{name}
	{...restProps}
>
	{@render triggerContent()}
	{@render contentItems()}
</SelectRoot>
{:else}
<SelectRoot
	bind:value={value as string | undefined}
	type="single"
	disabled={loading || disabled}
	{required}
	{name}
	{...restProps}
>
	{@render triggerContent()}
	{@render contentItems()}
</SelectRoot>
{/if}