<script lang="ts">
	import * as InputOTPPrimitive from "./index";
	import type { InputOTPVariant, InputOTPSize } from "./input-otp-root.svelte";

	interface Props {
		/**
		 * Maximum length of the OTP input
		 */
		maxlength: number;
		/**
		 * The current value of the input
		 */
		value?: string;
		/**
		 * Visual style variant
		 */
		variant?: InputOTPVariant;
		/**
		 * Size of the input slots
		 */
		size?: InputOTPSize;
		/**
		 * Number of groups to split the input into
		 * @default 1
		 */
		groups?: number;
		/**
		 * Whether the input is disabled
		 */
		disabled?: boolean;
		/**
		 * Pattern to validate input (regex pattern string)
		 */
		pattern?: string;
		/**
		 * Show separator between groups
		 * @default true when groups > 1
		 */
		showSeparator?: boolean;
		/**
		 * Whether the input has an error state
		 */
		error?: boolean;
		/**
		 * Whether the input is invalid (alias for error)
		 * @deprecated Use `error` instead
		 */
		invalid?: boolean;
		/**
		 * Callback when value changes
		 */
		onValueChange?: (value: string) => void;
		/**
		 * Callback when all slots are filled
		 */
		onComplete?: (value: string) => void;
		/**
		 * Callback when error state changes
		 */
		onError?: (hasError: boolean) => void;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	let {
		maxlength,
		value = $bindable(""),
		variant = "default",
		size = "default",
		groups = 1,
		disabled = false,
		pattern,
		showSeparator,
		error = false,
		invalid = false,
		onValueChange,
		onComplete,
		onError,
		class: className,
	}: Props = $props();

	// Combine error and invalid states (error takes precedence)
	const hasError = $derived(error || invalid);

	// Track error state and notify parent
	$effect(() => {
		if (onError) {
			onError(hasError);
		}
	});

	// Calculate slots per group
	const slotsPerGroup = $derived(Math.ceil(maxlength / groups));
	
	// Default showSeparator to true when there are multiple groups
	const shouldShowSeparator = $derived(showSeparator ?? groups > 1);

	// Generate group ranges
	const groupRanges = $derived.by(() => {
		const ranges: Array<{ start: number; end: number }> = [];
		for (let i = 0; i < groups; i++) {
			const start = i * slotsPerGroup;
			const end = Math.min(start + slotsPerGroup, maxlength);
			ranges.push({ start, end });
		}
		return ranges;
	});

	function handleValueChange(newValue: string) {
		onValueChange?.(newValue);
		if (newValue.length === maxlength) {
			onComplete?.(newValue);
		}
	}

	// Watch for value changes
	$effect(() => {
		if (value) {
			handleValueChange(value);
		}
	});
</script>

<InputOTPPrimitive.Root
	{maxlength}
	bind:value
	{variant}
	{size}
	{disabled}
	{pattern}
	class={className}
>
	{#snippet children({ cells })}
		{#each groupRanges as range, groupIndex (groupIndex)}
			{#if groupIndex > 0 && shouldShowSeparator}
				<InputOTPPrimitive.Separator />
			{/if}
			<InputOTPPrimitive.Group>
				{#each cells.slice(range.start, range.end) as cell (cell)}
					<InputOTPPrimitive.Slot {cell} aria-invalid={hasError || undefined} />
				{/each}
			</InputOTPPrimitive.Group>
		{/each}
	{/snippet}
</InputOTPPrimitive.Root>

