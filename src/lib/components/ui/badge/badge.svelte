<!-- <script lang="ts" module>
	import { badgeVariants, type BadgeProps } from "./badge-variants";
	import { cn } from "$lib/utils.js";
</script> -->

<script lang="ts">
	import XIcon from "@lucide/svelte/icons/x";
	import { Spinner } from '$lib/components/ui/spinner';
	import { badgeVariants, type BadgeProps } from "./badge-variants";
	import { cn } from "$lib/utils.js";
	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		color = "default",
		size = "default",
		shape = "rounded",
		text,
		icon,
		loading = false,
		dismissable = false,
		clickable = false,
		onclick,
		onDismiss,
		children,
		...restProps
	}: BadgeProps = $props();

	// Determine the element type
	const elementType = $derived(() => {
		if (href) return "a";
		if (clickable || dismissable) return "button";
		return "span";
	});

	// Handle dismiss action
	function handleDismiss(event: Event) {
		event.stopPropagation();
		onDismiss?.();
	}

	// Handle click action
	function handleClick(event: Event) {
		if (!href && onclick) {
			event.preventDefault();
			onclick();
		}
	}

	// Determine if badge should be clickable based on props
	const isClickable = $derived(clickable || !!onclick || !!href);
</script>

<svelte:element
	this={elementType()}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(
		badgeVariants({ 
			variant, 
			color, 
			size,
			shape,
			clickable: isClickable 
		}), 
		className
	)}
	onclick={handleClick}
	disabled={loading || restProps.disabled}
	{...restProps}
>
	{#if loading}
		<Spinner />
	{:else if icon}
		{@render icon()}
	{/if}
	
	{#if text}
		<span>{text}</span>
	{/if}
	
	{#if children}
		{@render children?.()}
	{/if}
	
	{#if dismissable && !loading}
		<button
			type="button"
			class="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm p-0.5 transition-colors"
			onclick={handleDismiss}
			aria-label="Dismiss"
		>
			<XIcon class="size-3" />
		</button>
	{/if}
</svelte:element>
