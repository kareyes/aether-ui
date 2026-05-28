<script lang="ts">
	import Root from "./field-root.svelte";
	import Content from "./field-content.svelte";
	import Label from "./field-label.svelte";
	import Description from "./field-description.svelte";
	import Error from "./field-error.svelte";
	import type { FieldOrientation } from "./field-root.svelte";
	import type { Snippet } from "svelte";

	type FieldImplProps = {
		label: string;
		description?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		orientation?: FieldOrientation;
		/**
		 * Position of the label relative to the form control
		 * - 'before': Label appears before the control (default)
		 * - 'after': Label appears after the control (useful for Checkbox, Switch, etc.)
		 */
		labelPosition?: 'before' | 'after';
		/**
		 * Where the description renders relative to the input
		 * - 'before': Description appears between label and input (default)
		 * - 'after': Description appears below the input — use in multi-column grids
		 *            to keep inputs visually aligned across rows
		 */
		descriptionPosition?: 'before' | 'after';
		class?: string;
		/**
		 * The form control to render (Input, Textarea, Checkbox, Switch, Select, etc.)
		 */
		children: Snippet;
		/**
		 * Optional snippet for rendering before the label in horizontal layouts
		 */
		beforeLabel?: Snippet;
	};

	let {
		label,
		description,
		error,
		required = false,
		disabled = false,
		orientation = "vertical",
		labelPosition = "before",
		descriptionPosition = "before",
		class: className,
		children,
		beforeLabel
	}: FieldImplProps = $props();

	const hasError = $derived(!!error);
	const isInvalid = $derived(hasError);

	// Determine if field should use horizontal layout with content wrapper
	const useContent = $derived(
		orientation === "horizontal" || (orientation === "responsive" && description)
	);


</script>


{#snippet labelPart()}
	{#if useContent}
		<Content>
			<Label>
				{label}
				{#if required}<span class="text-destructive">*</span>{/if}
			</Label>
			{#if description && !hasError && descriptionPosition === 'before'}
				<Description>{description}</Description>
			{/if}
		</Content>
	{:else}
		<Label>
			{label}
			{#if required}<span class="text-destructive">*</span>{/if}
		</Label>
		{#if description && !hasError && descriptionPosition === 'before'}
			<Description>{description}</Description>
		{/if}
	{/if}
{/snippet}

<Root {orientation} data-invalid={isInvalid} data-disabled={disabled} class={className}>
	{#if beforeLabel}
		{@render beforeLabel()}
	{/if}

	{#if labelPosition === 'before'}
		{@render labelPart()}
		{@render children()}
	{:else}
		{@render children()}
		{@render labelPart()}
	{/if}

	{#if description && !hasError && descriptionPosition === 'after'}
		<Description>{description}</Description>
	{/if}

	{#if hasError}
		<Error>{error}</Error>
	{/if}
</Root>
