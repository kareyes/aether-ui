<script lang="ts" module>
	import { getContext, setContext } from "svelte";
	import type { AlertDialogVariant, AlertDialogSize } from "./alert-dialog-variants.js";
	import type { Component } from "svelte";
	import type { IconProps } from "@lucide/svelte";

	const ALERT_DIALOG_CONTEXT_KEY = Symbol("alert-dialog-context");

	export type AlertDialogConfig = {
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
	};

	export type AlertDialogContext = {
		open: (config?: AlertDialogConfig) => void;
		close: () => void;
	};

	export function setAlertDialogContext(context: AlertDialogContext) {
		setContext(ALERT_DIALOG_CONTEXT_KEY, context);
	}

	export function getAlertDialogContext(): AlertDialogContext | undefined {
		return getContext(ALERT_DIALOG_CONTEXT_KEY);
	}
</script>

<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import AlertDialogImpl from "./alert-dialog-impl.svelte";
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet<[AlertDialogContext]>;
	};

	let { children }: Props = $props();

	let isOpen = $state(false);
	let config = $state<AlertDialogConfig>({
		variant: "default",
		size: "default",
		title: "",
		description: "",
		cancelText: "Cancel",
		actionText: "Continue",
		showCancel: true,
		showAction: true,
	});

	function open(newConfig?: AlertDialogConfig) {
		if (newConfig) {
			config = { ...config, ...newConfig };
		}
		isOpen = true;
	}

	function close() {
		isOpen = false;
	}

	function handleCancel() {
		config.onCancel?.();
		close();
	}

	function handleAction() {
		config.onAction?.();
		close();
	}

	const context: AlertDialogContext = {
		open,
		close,
	};

	setAlertDialogContext(context);
</script>

<AlertDialogPrimitive.Root bind:open={isOpen}>
	{@render children(context)}

	<AlertDialogImpl
		variant={config.variant}
		size={config.size}
		title={config.title}
		description={config.description}
		icon={config.icon}
		cancelText={config.cancelText}
		actionText={config.actionText}
		showCancel={config.showCancel}
		showAction={config.showAction}
		onCancel={handleCancel}
		onAction={handleAction}
	/>
</AlertDialogPrimitive.Root>

