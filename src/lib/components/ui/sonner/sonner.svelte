<script lang="ts" module>
	// Variants live in a standalone module so they can be imported by tests and
	// consumers without going through the Svelte compiler.
	export {
		toasterVariants,
		type ToasterVariant,
		type ToasterPosition,
		type ToasterStyle,
		type ToasterSize,
		type ToastSurfaceType,
	} from "./sonner-variants.js";
</script>

<script lang="ts">
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import InfoIcon from "@lucide/svelte/icons/info";
	import Loader2Icon from "@lucide/svelte/icons/loader-2";
	import OctagonXIcon from "@lucide/svelte/icons/octagon-x";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";

	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";
	import type { Snippet } from "svelte";
	import {
		buildToastClasses,
		toastSizeClasses,
		type ToasterPosition,
		type ToasterSize,
		type ToasterStyle,
	} from "./sonner-variants.js";

	interface Props extends Omit<SonnerProps, "theme"> {
		/** Position of the toaster on the screen */
		position?: ToasterPosition;
		/** Visual style variant for toasts */
		variant?: ToasterStyle;
		/** Toast size */
		size?: ToasterSize;
		/** Whether toasts expand on hover */
		expand?: boolean;
		/** Colour toasts by type, using the role tokens, rather than one neutral surface */
		richColors?: boolean;
		/** Show close button on toasts */
		closeButton?: boolean;
		/** Duration in milliseconds before auto-dismiss (0 = no auto-dismiss) */
		duration?: number;
		/** Gap between toasts in pixels */
		gap?: number;
		/** Maximum number of visible toasts */
		visibleToasts?: number;
		/** Custom loading icon */
		loadingIcon?: Snippet;
		/** Custom success icon */
		successIcon?: Snippet;
		/** Custom error icon */
		errorIcon?: Snippet;
		/** Custom info icon */
		infoIcon?: Snippet;
		/** Custom warning icon */
		warningIcon?: Snippet;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		position = "bottom-right",
		variant = "default",
		size = "default",
		expand = false,
		richColors = true,
		closeButton = false,
		duration = 4000,
		gap = 14,
		visibleToasts = 3,
		loadingIcon,
		successIcon,
		errorIcon,
		infoIcon,
		warningIcon,
		class: className,
		toastOptions,
		...restProps
	}: Props = $props();

	const sizeClasses = $derived(toastSizeClasses[size]);
	const toastClasses = $derived(buildToastClasses({ variant, size, richColors }));

	/*
	 * A few svelte-sonner rules are not gated on `data-styled`, so they outlive
	 * `unstyled` and out-specify every class above — in dark mode the close
	 * button's `background` / `border-color` / `color` all read these custom
	 * properties. Pointing them at the token layer is the only way to reach
	 * them; without this the close button is a hard-coded `#000` on all eight
	 * themes. The values track `closeButton`'s own `bg-card` / `border-border`
	 * / `text-card-foreground`.
	 */
	const closeButtonTokens =
		"--normal-bg: var(--color-card);" +
		" --normal-text: var(--color-card-foreground);" +
		" --normal-border: var(--color-border);" +
		" --normal-bg-hover: var(--color-muted);" +
		" --normal-border-hover: var(--color-border);";
</script>

<Sonner
	{...restProps}
	theme={mode.current}
	class="toaster group {className ?? ''}"
	{position}
	{expand}
	{closeButton}
	{duration}
	{gap}
	{visibleToasts}
	style={`${closeButtonTokens} ${restProps.style ?? ""}`}
	richColors={false}
	data-toast-variant={variant}
	toastOptions={{
		...toastOptions,
		unstyled: true,
		classes: { ...toastClasses, ...toastOptions?.classes },
	}}
>
	{#snippet loadingIcon()}
		{#if loadingIcon}
			{@render loadingIcon()}
		{:else}
			<Loader2Icon class="{sizeClasses.icon} animate-spin" />
		{/if}
	{/snippet}
	{#snippet successIcon()}
		{#if successIcon}
			{@render successIcon()}
		{:else}
			<CircleCheckIcon class={sizeClasses.icon} />
		{/if}
	{/snippet}
	{#snippet errorIcon()}
		{#if errorIcon}
			{@render errorIcon()}
		{:else}
			<OctagonXIcon class={sizeClasses.icon} />
		{/if}
	{/snippet}
	{#snippet infoIcon()}
		{#if infoIcon}
			{@render infoIcon()}
		{:else}
			<InfoIcon class={sizeClasses.icon} />
		{/if}
	{/snippet}
	{#snippet warningIcon()}
		{#if warningIcon}
			{@render warningIcon()}
		{:else}
			<TriangleAlertIcon class={sizeClasses.icon} />
		{/if}
	{/snippet}
</Sonner>
