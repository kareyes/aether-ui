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
		info: Info,
		success: CircleCheck,
		warning: TriangleAlert,
		error: CircleX,
	};

	// Icon container styles for each variant
	const iconVariantStyles = {
		default: "bg-muted/50 dark:bg-muted/90 border-border",
		info: "bg-info/10 dark:bg-info/20 border-info/20 dark:border-info/30",
		success: "bg-success/10 dark:bg-success/20 border-success/20 dark:border-success/30",
		warning: "bg-warning/10 dark:bg-warning/20 border-warning/20 dark:border-warning/30",
		error: "bg-destructive/10 dark:bg-destructive/20 border-destructive/20 dark:border-destructive/30",
	};

	// Icon color styles for each variant
	const iconColorStyles = {
		default: "text-muted-foreground",
		info: "text-info",
		success: "text-success",
		warning: "text-warning",
		error: "text-destructive",
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
