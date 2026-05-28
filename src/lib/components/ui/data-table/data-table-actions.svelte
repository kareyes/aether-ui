<script lang="ts">
	import type { Snippet } from "svelte";
	import { EllipsisIcon } from "@lucide/svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	type ActionItem = {
		label: string;
		onclick?: () => void;
		disabled?: boolean;
	};

	type Props = {
		/** The row data or ID */
		row?: any;
		/** ID to copy (if using default copy action) */
		id?: string;
		/** Custom actions to display */
		actions?: ActionItem[];
		/** Label for the copy action (default: "Copy ID") */
		copyLabel?: string;
		/** Whether to show the default copy action */
		showCopy?: boolean;
		/** Custom content snippet for the menu */
		children?: Snippet;
	};

	let {
		row,
		id,
		actions = [],
		copyLabel = "Copy ID",
		showCopy = true,
		children
	}: Props = $props();

	function copyToClipboard() {
		const valueToCopy = id || row?.id;
		if (valueToCopy) {
			navigator.clipboard.writeText(valueToCopy);
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<EllipsisIcon class="size-4" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		{#if children}
			{@render children()}
		{:else}
			<DropdownMenu.Group>
				<DropdownMenu.Label>Actions</DropdownMenu.Label>
				{#if showCopy && (id || row?.id)}
					<DropdownMenu.Item onclick={copyToClipboard}>
						{copyLabel}
					</DropdownMenu.Item>
				{/if}
				{#each actions as action (action.label)}
					<DropdownMenu.Item onclick={action.onclick} disabled={action.disabled}>
						{action.label}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Group>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
