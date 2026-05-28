<script lang="ts" module>
	import { cn } from "$lib/utils.js";
	import { type VariantProps, tv } from "tailwind-variants";
	import type { RadioSize, RadioVariant } from "./radio.svelte";

	export const radioGroupVariants = tv({
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

	export type RadioGroupOrientation = VariantProps<typeof radioGroupVariants>["orientation"];
	export type RadioGroupSize = VariantProps<typeof radioGroupVariants>["size"];

	export interface RadioGroupOption {
		id: string;
		label: string;
		value: string;
		description?: string;
		disabled?: boolean;
	}

	export type RadioGroupProps = {
		options: RadioGroupOption[];
		isCard?: boolean;
		value?: string;
		orientation?: RadioGroupOrientation;
		size?: RadioGroupSize;
		radioSize?: RadioSize;
		variant?: RadioVariant;
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
		onValueChange?: (value: string) => void;
	};
</script>

<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import Radio from "./radio.svelte";

	let {
		options,
		isCard = false,
		value = $bindable(""),
		orientation = "vertical",
		size = "default",
		radioSize = "default",
		variant = "default",
		disabled = false,
		class: className,
		label,
		description,
		required = false,
		error = false,
		onError,
		onValueChange,
		...restProps
	}: RadioGroupProps = $props();

	// Track error state and notify parent
	$effect(() => {
		if (onError) {
			onError(error);
		}
	});

	// Handle value changes
	$effect(() => {
		if (onValueChange && value) {
			onValueChange(value);
		}
	});

	// Generate unique IDs for accessibility
	function getOptionId(option: RadioGroupOption): string {
		return `radio-group-${option.id}`;
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

	<RadioGroupPrimitive.Root
		bind:value
		data-slot="radio-group"
		class={cn(
			isCard ? "space-y-3" : radioGroupVariants({ orientation, size })
		)}
		{disabled}
	>
		{#each options as option (option.id)}
			{#if isCard}
				<!-- Card Style UI -->
				<label
					for={getOptionId(option)}
					class={cn(
						"relative flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-all",
						"hover:border-primary/50",
						value === option.value ? "border-primary bg-primary/5" : "border-border bg-background",
						(disabled || option.disabled) && "opacity-50 cursor-not-allowed pointer-events-none",
						error && "border-destructive"
					)}
				>
					<div class="flex-1 space-y-1">
						<p class={cn(
							"text-sm font-medium leading-none",
							(disabled || option.disabled) && "text-muted-foreground"
						)}>
							{option.label}
						</p>
						{#if option.description}
							<p class={cn(
								"text-sm text-muted-foreground",
								(disabled || option.disabled) && "opacity-70"
							)}>
								{option.description}
							</p>
						{/if}
					</div>
					<Radio
						id={getOptionId(option)}
						value={option.value}
						size={radioSize}
						{variant}
						{error}
						disabled={disabled || option.disabled}
						class="mt-0.5"
					/>
				</label>
			{:else}
				<!-- Regular Style UI -->
				<Radio
					id={getOptionId(option)}
					value={option.value}
					size={radioSize}
					{variant}
					{error}
					disabled={disabled || option.disabled}
					label={option.label}
					description={option.description}
				/>
			{/if}
		{/each}
	</RadioGroupPrimitive.Root>
</fieldset>
