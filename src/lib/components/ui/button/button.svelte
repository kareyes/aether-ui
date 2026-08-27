<script lang="ts" module>
	// Variants live in a standalone module so they can be imported by tests and
	// consumers without going through the Svelte compiler.
	export {
		buttonVariants,
		type ButtonVariant,
		type ButtonSize,
		type ButtonColor,
		type ButtonProps,
	} from "./button-variants.js";
</script>

<script lang="ts">
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import { cn } from "$lib/utils.js";
	import { buttonVariants, type ButtonProps } from "./button-variants.js";
	// import * as LucideIcons from "@lucide/svelte/icons";

	// LucideIcons.Plus;

	let {
		class: className,
		variant = "default",
		size = "default",
		color = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		text,
		icon,
		iconPosition = "left",
		loading = false,
		loadingText = "Loading...",
		children,
		...restProps
	}: ButtonProps = $props();

	const isDisabled = $derived(disabled || loading);
	const displayText = $derived(loading ? loadingText : text);
	const displayIcon = $derived(loading ? LoaderIcon : icon);
	const buttonClass = $derived(cn(buttonVariants({ variant, size, color }), className));


	// `data-variant` / `data-color` mirror the resolved variants onto the DOM,
	// the same hook select-trigger, radio-group-item and accordion-root already
	// expose. A stylesheet can then target one intent — a theme has to know
	// that `ghost` has no ground to bevel — without parsing the class string.
	const commonProps = $derived({
		"data-slot": "button",
		"data-variant": variant,
		"data-color": color,
		class: buttonClass,
		...restProps
	});


	const anchorProps = $derived({
		href: isDisabled ? undefined : href,
		"aria-disabled": isDisabled,
		role: isDisabled ? "link" : undefined,
		tabindex: isDisabled ? -1 : undefined
	});
</script>


{#snippet iconSnippet(position: string)}
	{#if displayIcon && iconPosition === position}
		{@const IconComponent = displayIcon}
		<IconComponent class={cn("size-4", loading && "animate-spin")} />
	{/if}
{/snippet}


{#snippet contentSnippet()}
	{@render iconSnippet("left")}
	{#if displayText}
		<span>{displayText}</span>
	{/if}
	{#if children}
		{@render children?.()}
	{/if}
	{@render iconSnippet("right")}
{/snippet}


<svelte:element
	this={href ? "a" : "button"}
	bind:this={ref}
	{...commonProps}
	{...(href ? anchorProps : { type, disabled: isDisabled })}
>
	{@render contentSnippet()}
</svelte:element>
