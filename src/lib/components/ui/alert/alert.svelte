<script lang="ts">
	import * as Alert from "./index";
	import type { Snippet } from "svelte";
	import type { AlertVariant } from "./alert-root.svelte";
	import { 
		CircleAlert, 
		Info, 
		CircleCheck, 
		TriangleAlert, 
		CircleX 
	} from "@lucide/svelte";

	interface Props {
		variant?: AlertVariant;
		title?: string;
		description?: string;
		icon?: Snippet;
		showIcon?: boolean;
		dismissible?: boolean;
		onDismiss?: () => void;
		actions?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		variant = "default",
		title,
		description,
		icon,
		showIcon = true,
		dismissible = false,
		onDismiss,
		actions,
		children,
		class: className,
	}: Props = $props();

	// Default icons for variants
	const variantIcons = {
		default: CircleAlert,
		destructive: CircleX,
		info: Info,
		success: CircleCheck,
		warning: TriangleAlert,
		error: CircleX,
	};

	// Icon container styles for each variant
	const iconVariantStyles = {
		default: "bg-muted/50 dark:bg-muted/90 border-border",
		destructive: "bg-destructive/10 dark:bg-destructive/20 border-destructive/20 dark:border-destructive/30",
		info: "bg-blue-50 dark:bg-blue-500/20 border-blue-100 dark:border-blue-500/30",
		success: "bg-green-50 dark:bg-green-500/20 border-green-100 dark:border-green-500/30",
		warning: "bg-yellow-50 dark:bg-yellow-500/20 border-yellow-100 dark:border-yellow-500/30",
		error: "bg-red-50 dark:bg-red-500/20 border-red-100 dark:border-red-500/30",
	};

	// Icon color styles for each variant
	const iconColorStyles = {
		default: "text-muted-foreground",
		destructive: "text-destructive",
		info: "text-blue-600 dark:text-blue-400",
		success: "text-green-600 dark:text-green-400",
		warning: "text-yellow-600 dark:text-yellow-500",
		error: "text-red-600 dark:text-red-400",
	};

	const DefaultIcon = $derived(variantIcons[variant]);
	const iconContainerClass = $derived(iconVariantStyles[variant]);
	const iconClass = $derived(iconColorStyles[variant]);
</script>

<Alert.Root {variant} {dismissible} {onDismiss} {actions} class={className}>
        {#snippet icon()}
            {#if showIcon}
            <div class="flex-none relative w-9 h-9 rounded-full grid place-items-center shadow-sm {iconContainerClass}">
		    <DefaultIcon class="size-4 {iconClass}" />
            </div>
            {/if}
        {/snippet}
	
	{#if title}
		<Alert.Title>{title}</Alert.Title>
	{/if}
	
	{#if description}
		<Alert.Description>{description}</Alert.Description>
	{/if}
	
	{#if children}
		{@render children()}
	{/if}
</Alert.Root>
