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
				success: "!bg-success/10 !text-success !border-success dark:!border-success/80",
				error: "!bg-destructive/10 !text-destructive !border-destructive/30 dark:!border-destructive/80",
				warning: "!bg-warning/10 !text-warning !border-warning dark:!border-warning/80",
				info: "!bg-info/10 !text-info !border-info dark:!border-info/80",
				loading: "!bg-muted !text-muted-foreground !border-border",
			},
			bordered: {
				toast: "bg-background text-foreground border-l-4 border-border shadow-md rounded-lg",
				success: "!bg-background !text-success !border-l-4 !border-success",
				error: "!bg-background !text-destructive !border-l-4 !border-destructive",
				warning: "!bg-background !text-warning !border-l-4 !border-warning",
				info: "!bg-background !text-info !border-l-4 !border-info",
				loading: "!bg-background !text-muted-foreground !border-l-4 !border-muted-foreground",
			},
			filled: {
				toast: "bg-foreground text-background border-transparent shadow-xl rounded-lg",
				success: "!bg-success !text-success-foreground !border-transparent",
				error: "!bg-destructive !text-destructive-foreground !border-transparent",
				warning: "!bg-warning !text-warning-foreground !border-transparent",
				info: "!bg-info !text-info-foreground !border-transparent",
				loading: "!bg-muted-foreground !text-background !border-transparent",
			},
			minimal: {
				toast: "bg-transparent text-foreground border-none shadow-none rounded-none border-b border-border",
				success: "!bg-transparent !text-success !border-none !border-b !border-success/30 dark:!border-success/40",
				error: "!bg-transparent !text-destructive !border-none !border-b !border-destructive/30 dark:!border-destructive/40",
				warning: "!bg-transparent !text-warning !border-none !border-b !border-warning/30 dark:!border-warning/40",
				info: "!bg-transparent !text-info !border-none !border-b !border-info/30 dark:!border-info/40",
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
