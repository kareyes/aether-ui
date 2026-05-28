<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { inputVariants } from './utils/input-variants.js';
	import { useMaskedInput } from './utils/input-hooks.js';
	import type { InputWithAddonsProps } from './utils/input-types.js';
	import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton, InputGroupText } from '$lib/components/ui/input-group';
	import { Spinner } from '$lib/components/ui/spinner';

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		variant = "default",
		size = "default",
		mask,
		error = false,
		loading = false,
		onError,
		class: className,
		"data-slot": dataSlot = "input",
		// Input Group Addon Props
		startIcon,
		endIcon,
		startText,
		endText,
		startButton,
		endButton,
		startAddon,
		endAddon,
		startAddonAlign = "inline-start",
		endAddonAlign = "inline-end",
		groupClassName,
		oninput: externalOninput,
		...restProps
	}: InputWithAddonsProps = $props();

	const classes = $derived(inputVariants({ variant, size }));
	const { handleInput, getPlaceholder } = $derived.by(() => useMaskedInput(mask));

	// Track error state and notify parent
	$effect(() => {
		if (onError) {
			onError(error);
		}
	});

	// Handle masked input events (combines mask handling with external oninput)
	function onInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		// Apply mask transformation first
		handleInput(event, (newValue) => {
			value = newValue;
		});
		// Call external handler if provided
		if (externalOninput) {
			externalOninput(event);
		}
	}

	// Get placeholder - use mask placeholder if available
	const placeholderText = $derived(() => getPlaceholder(restProps.placeholder || undefined));

	// Determine if we need to wrap with InputGroup
	const needsWrapper = $derived(
		!!(startIcon || endIcon || startText || endText || startButton || endButton || startAddon || endAddon || loading)
	);
</script>

{#if needsWrapper}
	<InputGroup
		class={cn(
			"transition-all",
			error && "border-destructive ring-destructive/20",
			groupClassName
		)}
	>
		<!-- Start Addons -->
		{#if startAddon}
			<InputGroupAddon align={startAddonAlign}>
				{@render startAddon()}
			</InputGroupAddon>
		{:else if startIcon || startText || startButton}
			<InputGroupAddon align={startAddonAlign}>
				{#if startIcon}
					{@render startIcon()}
				{/if}
				{#if startText}
					{#if typeof startText === 'string'}
						<InputGroupText>{startText}</InputGroupText>
					{:else}
						{@render startText()}
					{/if}
				{/if}
				{#if startButton}
					{@render startButton()}
				{/if}
			</InputGroupAddon>
		{/if}

		<!-- Input -->
		<InputGroupInput
			bind:ref
			class={cn(className)}
			{type}
			bind:value
			placeholder={placeholderText()}
			oninput={onInput}
			aria-invalid={error}
			disabled={loading || restProps.disabled}
			{...restProps}
		/>

		<!-- End Addons -->
		{#if endAddon}
			<InputGroupAddon align={endAddonAlign}>
				{@render endAddon()}
			</InputGroupAddon>
		{:else if endIcon || endText || endButton || loading}
			<InputGroupAddon align={endAddonAlign}>
				{#if loading}
					<Spinner class="text-muted-foreground" />
				{/if}
				{#if endIcon}
					{@render endIcon()}
				{/if}
				{#if endText}
					{#if typeof endText === 'string'}
						<InputGroupText>{endText}</InputGroupText>
					{:else}
						{@render endText()}
					{/if}
				{/if}
				{#if endButton}
					{@render endButton()}
				{/if}
			</InputGroupAddon>
		{/if}
	</InputGroup>
{:else}
	<!-- Standard Input without wrapper -->
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(classes, className)}
		{type}
		bind:value
		placeholder={placeholderText()}
		oninput={onInput}
		aria-invalid={error}
		disabled={loading || restProps.disabled}
		{...restProps}
	/>
{/if}
