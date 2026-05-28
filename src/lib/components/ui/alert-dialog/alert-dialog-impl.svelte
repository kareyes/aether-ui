<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import AlertDialogOverlay from "./alert-dialog-overlay.svelte";
	import { cn, type WithoutChild, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { Component } from "svelte";
	import type { IconProps } from "@lucide/svelte";
	import {
		alertDialogVariants,
		type AlertDialogVariant,
		type AlertDialogSize,
	} from "./alert-dialog-variants.js";

	type Props = WithoutChild<AlertDialogPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<AlertDialogPrimitive.PortalProps>;
		variant?: AlertDialogVariant;
		size?: AlertDialogSize;
		title?: string;
		description?: string;
		icon?: Component<IconProps>;
		cancelText?: string;
		actionText?: string;
		showCancel?: boolean;
		showAction?: boolean;
		onCancel?: () => void;
		onAction?: () => void;
		children?: import("svelte").Snippet;
		header?: import("svelte").Snippet;
		footer?: import("svelte").Snippet;
	};

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		variant = "default",
		size = "default",
		title,
		description,
		icon: Icon,
		cancelText = "Cancel",
		actionText = "Continue",
		showCancel = true,
		showAction = true,
		onCancel,
		onAction,
		children,
		header,
		footer,
		...restProps
	}: Props = $props();

	const styles = $derived(alertDialogVariants({ variant, size }));

	function handleCancel() {
		onCancel?.();
	}

	function handleAction() {
		onAction?.();
	}

	// Determine action button variant based on alert variant
	const actionButtonVariant = $derived(() => {
		switch (variant) {
			case "destructive":
				return "destructive";
			case "success":
				return "default";
			case "warning":
				return "default";
			case "info":
				return "default";
			default:
				return "default";
		}
	});

	// Determine action button color based on alert variant
	const actionButtonColor = $derived(() => {
		switch (variant) {
			case "success":
				return "success";
			case "warning":
				return "warning";
			case "info":
				return "info";
			default:
				return "default";
		}
	});
</script>

<AlertDialogPrimitive.Portal {...portalProps}>
	<AlertDialogOverlay />
	<AlertDialogPrimitive.Content
		bind:ref
		data-slot="alert-dialog-content"
		class={cn(styles.content(), className)}
		{...restProps}
	>
		{#if header}
			{@render header()}
		{:else if title || description || Icon}
			<div class={styles.header()}>
				{#if Icon}
					<div class="flex items-center gap-3">
						<div
							class={cn(
								"flex size-10 items-center justify-center rounded-full",
								variant === "destructive" && "bg-destructive/10 text-destructive",
								variant === "success" && "bg-green-500/10 text-green-600 dark:text-green-400",
								variant === "warning" && "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
								variant === "info" && "bg-blue-500/10 text-blue-600 dark:text-blue-400",
								variant === "default" && "bg-primary/10 text-primary"
							)}
						>
							<Icon class="size-5" />
						</div>
						{#if title}
							<AlertDialogPrimitive.Title class={styles.title()}>
								{title}
							</AlertDialogPrimitive.Title>
						{/if}
					</div>
				{:else if title}
					<AlertDialogPrimitive.Title class={styles.title()}>
						{title}
					</AlertDialogPrimitive.Title>
				{/if}
				{#if description}
					<AlertDialogPrimitive.Description class={styles.description()}>
						{description}
					</AlertDialogPrimitive.Description>
				{/if}
			</div>
		{/if}

		{#if children}
			{@render children()}
		{/if}

		{#if footer}
			{@render footer()}
		{:else if showCancel || showAction}
			<div class={styles.footer()}>
				{#if showCancel}
					<AlertDialogPrimitive.Cancel
						class={cn(buttonVariants({ variant: "outline" }), styles.cancel())}
						onclick={handleCancel}
					>
						{cancelText}
					</AlertDialogPrimitive.Cancel>
				{/if}
				{#if showAction}
					<AlertDialogPrimitive.Action
						class={cn(
							buttonVariants({
								variant: actionButtonVariant(),
								color: actionButtonColor(),
							}),
							styles.action()
						)}
						onclick={handleAction}
					>
						{actionText}
					</AlertDialogPrimitive.Action>
				{/if}
			</div>
		{/if}
	</AlertDialogPrimitive.Content>
</AlertDialogPrimitive.Portal>
