<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import SaveIcon from "@lucide/svelte/icons/save";
	import DownloadIcon from "@lucide/svelte/icons/download";
	import {
		AlertDialogProvider,
		getAlertDialogContext,
		type AlertDialogContext,
	} from "$lib/components/ui/alert-dialog";

	let loading = $state(false);

	const handleLoadingDemo = async () => {
		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 2000));
		loading = false;
	};
	let result = $state<string>("");
	function showDefaultAlert(dialog: AlertDialogContext) {
		dialog.open({
			variant: "default",
			title: "Default Alert",
			description:
				"This is a default alert dialog with standard styling.",
			onAction: () => {
				result = "Default: Action clicked";
			},
		});
	}
</script>

<div class="container mx-auto p-8 space-y-8">
	<h1 class="text-4xl font-bold text-center mb-8">
		Dynamics Button Component
	</h1>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Basic Examples</h2>
		<div class="flex gap-4 flex-wrap">
			<!-- Text only -->
			<Button text="Simple Button" />

			<!-- With icon -->
			<Button text="Add Item" icon={PlusIcon} />

			<!-- Icon on the right -->
			<Button
				text="Download"
				icon={DownloadIcon}
				iconPosition="right"
				variant="outline"
			/>

			<!-- Icon only -->
			<Button icon={SaveIcon} size="icon" variant="secondary" />
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Loading State</h2>
		<div class="flex gap-4 flex-wrap">
			<Button
				text="Save Changes"
				{loading}
				loadingText="Saving..."
				onclick={handleLoadingDemo}
				icon={SaveIcon}
			/>

			<Button
				text="Static Loading"
				loading={true}
				loadingText="Processing..."
				variant="secondary"
			/>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Variants</h2>
		<div class="flex gap-4 flex-wrap">
			<Button text="Default" icon={PlusIcon} />
			<Button text="Secondary" icon={PlusIcon} variant="secondary" />
			<Button text="Outline" icon={PlusIcon} variant="outline" />
			<Button text="Ghost" icon={PlusIcon} variant="ghost" />
			<Button text="Destructive" icon={PlusIcon} variant="destructive" />
			<Button text="Bordered" icon={PlusIcon} variant="bordered" />
			<Button text="Flat" icon={PlusIcon} variant="flat" />
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Fallback to Children</h2>
		<div class="flex gap-4 flex-wrap">
			<Button variant="outline">
				<PlusIcon class="size-4 mr-2" />
				Custom Content
			</Button>
		</div>
	</section>
</div>

<AlertDialogProvider>
	{@const dialog = getAlertDialogContext()}
	<Button onclick={() => dialog && showDefaultAlert(dialog)}>Default</Button>
</AlertDialogProvider>
