<script lang="ts">
	import { Check, ChevronsUpDown } from "@lucide/svelte";
	import { tick } from "svelte";
	import { Button, type ButtonProps } from "$lib/components/ui/button";
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	type ComboboxItem = {
		value: string;
		label: string;
		disabled?: boolean;
	};

	interface Props {
		// Items
		items?: ComboboxItem[];
		
		// Value
		value?: string;
		onValueChange?: (value: string) => void;
		
		// Trigger props
		placeholder?: string;
		triggerVariant?: ButtonProps["variant"];
		triggerSize?: ButtonProps["size"];
		triggerClass?: string;
		
		// Search
		searchPlaceholder?: string;
		emptyMessage?: string;
		
		// Popover props
		contentClass?: string;
		align?: "start" | "center" | "end";
		side?: "top" | "right" | "bottom" | "left";
		
		// Custom trigger
		trigger?: Snippet<[{ selectedLabel: string | undefined; open: boolean }]>;
		
		// Controlled state
		open?: boolean;
	}

	let {
		items = [],
		value = $bindable(""),
		onValueChange,
		placeholder = "Select an item...",
		triggerVariant = "outline",
		triggerSize = "default",
		triggerClass,
		searchPlaceholder = "Search...",
		emptyMessage = "No item found.",
		contentClass,
		align = "start",
		side = "bottom",
		trigger,
		open = $bindable(false),
	}: Props = $props();

	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedLabel = $derived(
		items.find((item) => item.value === value)?.label
	);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef?.focus();
		});
	}

	function handleSelect(itemValue: string) {
		value = itemValue;
		if (onValueChange) {
			onValueChange(itemValue);
		}
		closeAndFocusTrigger();
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			{#if trigger}
				{@render trigger({ selectedLabel, open })}
			{:else}
				<Button
					{...props}
					variant={triggerVariant}
					size={triggerSize}
					class={cn("justify-between", triggerClass)}
					role="combobox"
					aria-expanded={open}
				>
					{selectedLabel || placeholder}
					<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
				</Button>
			{/if}
		{/snippet}
	</Popover.Trigger>
	
	<Popover.Content {align} {side} class={cn("p-0", contentClass)}>
		<Command.Root>
			<Command.Input placeholder={searchPlaceholder} />
			<Command.List>
				<Command.Empty>{emptyMessage}</Command.Empty>
				<Command.Group>
					{#each items as item (item.value)}
						<Command.Item
							value={item.value}
							disabled={item.disabled}
							onSelect={() => handleSelect(item.value)}
						>
							<Check
								class={cn(
									"mr-2 size-4",
									value !== item.value && "text-transparent"
								)}
							/>
							{item.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
