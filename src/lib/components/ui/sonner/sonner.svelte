<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const toasterVariants = tv({
		base: "",
		variants: {
			position: {
				"top-left": "",
				"top-center": "",
				"top-right": "",
				"bottom-left": "",
				"bottom-center": "",
				"bottom-right": "",
			},
			variant: {
				default: "",
				bordered: "",
				filled: "",
				minimal: "",
			},
			size: {
				sm: "",
				default: "",
				lg: "",
			},
			expand: {
				true: "",
				false: "",
			},
			richColors: {
				true: "",
				false: "",
			},
			closeButton: {
				true: "",
				false: "",
			},
		},
		defaultVariants: {
			position: "bottom-right",
			variant: "default",
			size: "default",
			expand: false,
			richColors: true,
			closeButton: false,
		},
	});

	export type ToasterVariant = VariantProps<typeof toasterVariants>;
	export type ToasterPosition = NonNullable<ToasterVariant["position"]>;
	export type ToasterStyle = NonNullable<ToasterVariant["variant"]>;
	export type ToasterSize = NonNullable<ToasterVariant["size"]>;
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

	interface Props extends Omit<SonnerProps, "theme"> {
		/** Position of the toaster on the screen */
		position?: ToasterPosition;
		/** Visual style variant */
		variant?: ToasterStyle;
		/** Toast size */
		size?: ToasterSize;
		/** Whether toasts expand on hover */
		expand?: boolean;
		/** Enable rich colors for different toast types */
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
		...restProps
	}: Props = $props();

	// Size-based classes
	const sizeClasses = $derived({
		sm: {
			toast: "!py-2 !px-3 !text-xs !min-h-0 !gap-1.5",
			title: "!text-xs",
			description: "!text-[11px]",
			actionButton: "!px-2 !py-1 !text-xs",
			cancelButton: "!px-2 !py-1 !text-xs",
			icon: "size-3.5",
		},
		default: {
			toast: "",
			title: "",
			description: "text-sm",
			actionButton: "px-3 py-1.5 text-sm",
			cancelButton: "px-3 py-1.5 text-sm",
			icon: "size-4",
		},
		lg: {
			toast: "!py-5 !px-5 !text-base !gap-3",
			title: "!text-base !font-bold",
			description: "!text-sm",
			actionButton: "!px-4 !py-2 !text-base",
			cancelButton: "!px-4 !py-2 !text-base",
			icon: "size-5",
		},
	}[size]);

	// Variant-based toast classes
	const variantClasses = $derived(
		{
			default: {
				toast: "bg-background text-foreground border-border shadow-lg rounded-lg",
				success: "!bg-success/10 !text-green-900 !border-success dark:!bg-success/10 dark:!text-green-200 dark:!border-success/80",
				error: "!bg-danger/10 !text-red-900 !border-danger/30 dark:!bg-danger/10 dark:!text-red-200 dark:!border-danger/80",
				warning: "!bg-warning/10 !text-yellow-900 !border-warning dark:!bg-warning/10 dark:!text-yellow-200 dark:!border-warning/80",
				info: "!bg-blue-50 !text-blue-900 !border-blue-200 dark:!bg-blue-950 dark:!text-blue-100 dark:!border-blue-800",
				loading: "!bg-muted !text-muted-foreground !border-border",
			},
			bordered: {
				toast: "bg-background text-foreground border-l-4 border-border shadow-md rounded-lg",
				success: "!bg-background !text-green-800 !border-l-4 !border-success dark:!bg-background dark:!text-green-300 dark:!border-success",
				error: "!bg-background !text-red-800 !border-l-4 !border-danger dark:!bg-background dark:!text-red-300 dark:!border-danger",
				warning: "!bg-background !text-yellow-800 !border-l-4 !border-warning dark:!bg-background dark:!text-yellow-300 dark:!border-warning",
				info: "!bg-background !text-blue-800 !border-l-4 !border-blue-500 dark:!bg-background dark:!text-blue-300 dark:!border-blue-400",
				loading: "!bg-background !text-muted-foreground !border-l-4 !border-muted-foreground",
			},
			filled: {
				toast: "bg-foreground text-background border-transparent shadow-xl rounded-lg",
				success: "!bg-success !text-white !border-transparent dark:!bg-success dark:!text-white",
				error: "!bg-danger !text-white !border-transparent dark:!bg-danger dark:!text-white",
				warning: "!bg-warning !text-yellow-950 !border-transparent dark:!bg-warning dark:!text-yellow-950",
				info: "!bg-blue-500 !text-white !border-transparent dark:!bg-blue-600 dark:!text-white",
				loading: "!bg-muted-foreground !text-background !border-transparent",
			},
			minimal: {
				toast: "bg-transparent text-foreground border-none shadow-none rounded-none border-b border-border",
				success: "!bg-transparent !text-green-700 !border-none !border-b !border-green-200 dark:!text-green-300 dark:!border-green-800",
				error: "!bg-transparent !text-red-700 !border-none !border-b !border-red-200 dark:!text-red-300 dark:!border-red-800",
				warning: "!bg-transparent !text-yellow-700 !border-none !border-b !border-yellow-200 dark:!text-yellow-300 dark:!border-yellow-800",
				info: "!bg-transparent !text-blue-700 !border-none !border-b !border-blue-200 dark:!text-blue-300 dark:!border-blue-800",
				loading: "!bg-transparent !text-muted-foreground !border-none !border-b !border-border",
			},
		}[variant],
	);

	const toastClasses = $derived({
		toast: `group toast ${variantClasses.toast} ${sizeClasses.toast}`,
		title: `font-semibold text-foreground ${sizeClasses.title}`,
		description: `text-muted-foreground ${sizeClasses.description}`,
		actionButton: `bg-primary text-primary-foreground rounded-md font-medium transition-colors hover:bg-primary/90 ${sizeClasses.actionButton}`,
		cancelButton: `bg-muted text-muted-foreground rounded-md font-medium transition-colors hover:bg-muted/80 ${sizeClasses.cancelButton}`,
		closeButton: "bg-background text-foreground border-border hover:bg-muted",
		success: variantClasses.success,
		error: variantClasses.error,
		warning: variantClasses.warning,
		info: variantClasses.info,
		loading: variantClasses.loading,
	});
</script>

<Sonner
	theme={mode.current}
	class="toaster group {className ?? ''}"
	{position}
	{expand}
	{richColors}
	{closeButton}
	{duration}
	{gap}
	{visibleToasts}
	toastOptions={{
		classes: toastClasses,
	}}
	style="--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border);"
	{...restProps}
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
