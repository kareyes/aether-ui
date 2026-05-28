<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { textareaVariants } from "./utils/textarea-variants.js";
	import { useAutoResize, getCharacterCount } from "./utils/textarea-hooks.js";
	import type { TextareaProps } from "./utils/textarea-types.js";
	import { Spinner } from '$lib/components/ui/spinner';

	let {
		ref = $bindable(null),
		value = $bindable(),
		variant = "default",
		size = "default",
		resize = "vertical",
		maxLength,
		showCount = false,
		autoResize = false,
		minRows,
		maxRows,
		error = false,
		loading = false,
		onError,
		class: className,
		"data-slot": dataSlot = "textarea",
		...restProps
	}: TextareaProps = $props();

	const classes = $derived(textareaVariants({ variant, size, resize: autoResize ? "none" : resize }));
	const characterCount = $derived(getCharacterCount(typeof value === 'string' ? value : undefined, maxLength));

	// Track error state and notify parent
	$effect(() => {
		if (onError) {
			onError(error);
		}
	});

	// Auto-resize effect
	let cleanup: (() => void) | undefined;
	$effect(() => {
		cleanup?.();
		cleanup = useAutoResize(ref as HTMLTextAreaElement | null, autoResize, minRows, maxRows);
		return () => cleanup?.();
	});
</script>

<div class="relative w-full">
	<textarea
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(classes, showCount && maxLength && "pb-6", className)}
		bind:value
		maxlength={maxLength}
		aria-invalid={error}
		disabled={loading || restProps.disabled}
		{...restProps}
	></textarea>
	
	{#if loading}
		<div class="pointer-events-none absolute top-2 right-3">
			<Spinner class="text-muted-foreground" />
		</div>
	{/if}
	
	{#if showCount}
		<div class="pointer-events-none absolute bottom-2 right-3 text-xs text-muted-foreground">
			{characterCount}
		</div>
	{/if}
</div>
