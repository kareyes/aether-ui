<script lang="ts" module>
	import { cn } from "$lib/utils.js";
	import { type VariantProps, tv } from "tailwind-variants";
	import type { CheckboxSize, CheckboxVariant } from "./checkbox.svelte";

	export const checkboxGroupVariants = tv({
		base: "space-y-2",
		variants: {
			orientation: {
				vertical: "flex flex-col space-y-2",
				horizontal: "flex flex-row space-x-4 flex-wrap",
			},
			size: {
				sm: "text-sm",
				default: "",
				lg: "text-base",
			},
		},
		defaultVariants: {
			orientation: "vertical",
			size: "default",
		},
	});

	export type CheckboxGroupOrientation = VariantProps<typeof checkboxGroupVariants>["orientation"];
	export type CheckboxGroupSize = VariantProps<typeof checkboxGroupVariants>["size"];

	export interface CheckboxGroupOption {
		id: string;
		label: string;
		value: string;
		description?: string;
		disabled?: boolean;
	}

	export type CheckboxGroupProps = {
		options: CheckboxGroupOption[];
		values?: string[];
		orientation?: CheckboxGroupOrientation;
		size?: CheckboxGroupSize;
		checkboxSize?: CheckboxSize;
		variant?: CheckboxVariant;
		lineThrough?: boolean;
		disabled?: boolean;
		class?: string;
		label?: string;
		description?: string;
		required?: boolean;
		/**
		 * Error state - when true, applies error styling via aria-invalid
		 */
		error?: boolean;
		/**
		 * Callback function called when error state changes
		 */
		onError?: (error: boolean) => void;
		onValuesChange?: (values: string[]) => void;
	};
</script>

<script lang="ts">
	import Checkbox from "./checkbox.svelte";

	let {
		options,
		values = $bindable([]),
		orientation = "vertical",
		size = "default",
		checkboxSize = "default",
		variant = "default",
		lineThrough = false,
		disabled = false,
		class: className,
		label,
		description,
		required = false,
		error = false,
		onError,
		onValuesChange,
		...restProps
	}: CheckboxGroupProps = $props();

	// Track error state and notify parent
	$effect(() => {
		if (onError) {
			onError(error);
		}
	});

	// Handle individual checkbox changes
	function handleCheckboxChange(optionValue: string, checked: boolean) {
		if (checked) {
			// Add value if not already present
			if (!values.includes(optionValue)) {
				values = [...values, optionValue];
			}
		} else {
			// Remove value
			values = values.filter(v => v !== optionValue);
		}
		
		// Call callback if provided
		onValuesChange?.(values);
	}

	// Determine if an option is checked
	function isOptionChecked(optionValue: string): boolean {
		return values.includes(optionValue);
	}

	// Generate unique IDs for accessibility
	function getOptionId(option: CheckboxGroupOption): string {
		return `checkbox-group-${option.id}`;
	}
</script>

<fieldset 
	class={cn("space-y-3", className)}
	{disabled}
	{...restProps}
>
	{#if label}
		<legend class={cn(
			"text-sm font-medium leading-none",
			required && "after:content-['*'] after:ml-0.5 after:text-destructive",
			disabled && "opacity-50",
			error && "text-destructive"
		)}>
			{label}
		</legend>
	{/if}
	
	{#if description}
		<p class={cn(
			"text-sm text-muted-foreground",
			disabled && "opacity-50",
			error && "text-destructive"
		)}>
			{description}
		</p>
	{/if}

	<div class={checkboxGroupVariants({ orientation, size })}>
		{#each options as option (option.id)}
			<Checkbox
				id={getOptionId(option)}
				checked={isOptionChecked(option.value)}
				size={checkboxSize}
				{variant}
				{lineThrough}
				{error}
				disabled={disabled || option.disabled}
				label={option.label}
				description={option.description}
				onCheckedChange={(checked) => handleCheckboxChange(option.value, checked)}
			/>
		{/each}
	</div>
</fieldset>