<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		AlertDialogProvider,
		getAlertDialogContext,
		type AlertDialogContext,
	} from '../index';
	
	const { Story } = defineMeta({
		title: 'Components/AlertDialog',
		tags: ['autodocs'],
		argTypes: {},
	});
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		AlertCircle,
		CheckCircle2,
		Info,
		AlertTriangle,
		Trash2,
		Save,
	} from '@lucide/svelte';

	let result = $state<string>("");

	// Variant Examples
	function showDefaultAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "default",
			title: "Default Alert",
			description: "This is a default alert dialog with standard styling.",
			onAction: () => {
				result = "Default: Action clicked";
			},
		});
	}

	function showDestructiveAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "destructive",
			title: "Delete Account",
			description:
				"This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
			icon: Trash2,
			actionText: "Delete",
			onAction: () => {
				result = "Destructive: Account deleted";
			},
		});
	}

	function showSuccessAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "success",
			title: "Success!",
			description: "Your changes have been saved successfully.",
			icon: CheckCircle2,
			actionText: "Great!",
			showCancel: false,
			onAction: () => {
				result = "Success: Confirmed";
			},
		});
	}

	function showWarningAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "warning",
			title: "Warning",
			description: "You have unsaved changes. Are you sure you want to continue?",
			icon: AlertTriangle,
			actionText: "Continue",
			onAction: () => {
				result = "Warning: Continued";
			},
		});
	}

	function showInfoAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "info",
			title: "Information",
			description: "Here's some important information you should know about.",
			icon: Info,
			actionText: "Got it",
			showCancel: false,
		});
	}

	// Size Examples
	function showSmallDialog(dialog: AlertDialogContext) {
		dialog.open({
			size: "sm",
			title: "Small Dialog",
			description: "This is a small alert dialog.",
			icon: Info,
		});
	}

	function showDefaultSizeDialog(dialog: AlertDialogContext) {
		dialog.open({
			size: "default",
			title: "Default Size Dialog",
			description: "This is a default size alert dialog.",
			icon: Info,
		});
	}

	function showLargeDialog(dialog: AlertDialogContext) {
		dialog.open({
			size: "lg",
			title: "Large Dialog",
			description:
				"This is a large alert dialog with more space for content. You can use this when you need to display more detailed information to the user.",
			icon: Info,
		});
	}

	// Configuration Examples
	function showNoCancelDialog(dialog: AlertDialogContext) {
		dialog.open({
			title: "No Cancel Button",
			description: "This dialog only has an action button.",
			showCancel: false,
		});
	}

	function showNoActionDialog(dialog: AlertDialogContext) {
		dialog.open({
			title: "No Action Button",
			description: "This dialog only has a cancel button.",
			showAction: false,
		});
	}

	function showCustomTextDialog(dialog: AlertDialogContext) {
		dialog.open({
			title: "Custom Button Text",
			description: "This dialog has custom button labels.",
			cancelText: "No, go back",
			actionText: "Yes, proceed",
			icon: AlertCircle,
		});
	}

	function showCallbacksDialog(dialog: AlertDialogContext) {
		dialog.open({
			title: "With Callbacks",
			description: "This dialog has callback functions for both buttons.",
			onCancel: () => {
				result = "Cancelled";
			},
			onAction: () => {
				result = "Confirmed";
			},
		});
	}

	// Practical Examples
	function showDeleteFileDialog(dialog: AlertDialogContext) {
		dialog.open({
			variant: "destructive",
			title: "Delete File",
			description: "Are you sure you want to delete this file? This action cannot be undone.",
			icon: Trash2,
			actionText: "Delete File",
			cancelText: "Keep File",
			onAction: () => {
				result = "File deleted";
			},
			onCancel: () => {
				result = "File kept";
			},
		});
	}

	function showSavePromptDialog(dialog: AlertDialogContext) {
		dialog.open({
			variant: "warning",
			title: "Unsaved Changes",
			description:
				"You have unsaved changes that will be lost. Do you want to save before leaving?",
			icon: Save,
			actionText: "Save Changes",
			cancelText: "Discard",
			onAction: () => {
				result = "Changes saved";
			},
			onCancel: () => {
				result = "Changes discarded";
			},
		});
	}

	function showPaymentSuccessDialog(dialog: AlertDialogContext) {
		dialog.open({
			variant: "success",
			size: "sm",
			title: "Payment Successful",
			description: "Your payment has been processed successfully.",
			icon: CheckCircle2,
			actionText: "Continue",
			showCancel: false,
			onAction: () => {
				result = "Payment confirmed";
			},
		});
	}
</script>

<!-- Variants -->
<Story name="Default">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button onclick={() => showDefaultAlert(dialog)}>Open Default Alert</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="Destructive">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button variant="destructive" onclick={() => showDestructiveAlert(dialog)}>
					Delete Account
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="Success">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button color="success" onclick={() => showSuccessAlert(dialog)}>
					Show Success
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="Warning">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button color="warning" onclick={() => showWarningAlert(dialog)}>
					Show Warning
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="Info">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button color="info" onclick={() => showInfoAlert(dialog)}>
					Show Info
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<!-- Sizes -->
<Story name="Small Size">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button variant="outline" onclick={() => showSmallDialog(dialog)}>
					Small Dialog
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="Default Size">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button variant="outline" onclick={() => showDefaultSizeDialog(dialog)}>
					Default Size Dialog
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="Large Size">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button variant="outline" onclick={() => showLargeDialog(dialog)}>
					Large Dialog
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<!-- Configuration Options -->
<Story name="No Cancel Button">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button variant="outline" onclick={() => showNoCancelDialog(dialog)}>
					No Cancel
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="No Action Button">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button variant="outline" onclick={() => showNoActionDialog(dialog)}>
					No Action
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="Custom Button Text">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button variant="outline" onclick={() => showCustomTextDialog(dialog)}>
					Custom Text
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="With Callbacks">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<div class="space-y-4">
					<Button variant="outline" onclick={() => showCallbacksDialog(dialog)}>
						Open Dialog with Callbacks
					</Button>
					{#if result}
						<div class="rounded-lg border bg-muted p-4">
							<p class="text-sm font-medium">Last Action:</p>
							<p class="text-sm text-muted-foreground">{result}</p>
						</div>
					{/if}
				</div>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<!-- Practical Examples -->
<Story name="Delete File">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button onclick={() => showDeleteFileDialog(dialog)}>
					Delete File
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="Save Prompt">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button variant="outline" onclick={() => showSavePromptDialog(dialog)}>
					Save Prompt
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<Story name="Payment Success">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<Button color="success" onclick={() => showPaymentSuccessDialog(dialog)}>
					Payment Success
				</Button>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>

<!-- All Examples Together -->
<Story name="All Variants">
	{#snippet template()}
		<AlertDialogProvider>
			{#snippet children(dialog)}
				<div class="space-y-6 max-w-4xl">
					<div>
						<h3 class="text-lg font-semibold mb-3">Variants</h3>
						<div class="flex flex-wrap gap-2">
							<Button onclick={() => showDefaultAlert(dialog)}>Default</Button>
							<Button variant="destructive" onclick={() => showDestructiveAlert(dialog)}>
								Destructive
							</Button>
							<Button color="success" onclick={() => showSuccessAlert(dialog)}>
								Success
							</Button>
							<Button color="warning" onclick={() => showWarningAlert(dialog)}>
								Warning
							</Button>
							<Button color="info" onclick={() => showInfoAlert(dialog)}>Info</Button>
						</div>
					</div>

					<div>
						<h3 class="text-lg font-semibold mb-3">Sizes</h3>
						<div class="flex flex-wrap gap-2">
							<Button variant="outline" onclick={() => showSmallDialog(dialog)}>Small</Button>
							<Button variant="outline" onclick={() => showDefaultSizeDialog(dialog)}>Default</Button>
							<Button variant="outline" onclick={() => showLargeDialog(dialog)}>Large</Button>
						</div>
					</div>

					<div>
						<h3 class="text-lg font-semibold mb-3">Configuration Options</h3>
						<div class="flex flex-wrap gap-2">
							<Button variant="outline" onclick={() => showNoCancelDialog(dialog)}>No Cancel</Button>
							<Button variant="outline" onclick={() => showNoActionDialog(dialog)}>No Action</Button>
							<Button variant="outline" onclick={() => showCustomTextDialog(dialog)}>Custom Text</Button>
							<Button variant="outline" onclick={() => showCallbacksDialog(dialog)}>With Callbacks</Button>
						</div>
					</div>

					<div>
						<h3 class="text-lg font-semibold mb-3">Practical Examples</h3>
						<div class="flex flex-wrap gap-2">
							<Button onclick={() => showDeleteFileDialog(dialog)}>Delete File</Button>
							<Button variant="outline" onclick={() => showSavePromptDialog(dialog)}>Save Prompt</Button>
							<Button color="success" onclick={() => showPaymentSuccessDialog(dialog)}>Payment Success</Button>
						</div>
					</div>

					{#if result}
						<div class="rounded-lg border bg-muted p-4">
							<p class="text-sm font-medium">Last Action:</p>
							<p class="text-sm text-muted-foreground">{result}</p>
						</div>
					{/if}
				</div>
			{/snippet}
		</AlertDialogProvider>
	{/snippet}
</Story>
