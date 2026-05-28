<script lang="ts" module>
	import type { Component } from "svelte";

	export type DropdownItem = {
		type?: "item" | "separator" | "label" | "checkbox" | "radio" | "submenu";
		label?: string;
		value?: string;
		checked?: boolean;
		disabled?: boolean;
		onSelect?: () => void;
		shortcut?: string;
		variant?: "default" | "destructive";
		icon?: Component;
		items?: DropdownItem[];
	};

	export type DropdownGroup = {
		label?: string;
		items: DropdownItem[];
		type?: "radio";
		value?: string;
		onValueChange?: (value: string) => void;
	};
</script>

<script lang="ts">
	import { Button, type ButtonProps } from "$lib/components/ui/button";
	import { ChevronDown } from "@lucide/svelte";
	import type { Snippet } from "svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	interface Props {
		triggerText?: string;
		triggerVariant?: ButtonProps["variant"];
		triggerSize?: ButtonProps["size"];
		triggerIcon?: any;
		triggerClass?: string;
		showChevron?: boolean;
		align?: "start" | "center" | "end";
		side?: "top" | "right" | "bottom" | "left";
		sideOffset?: number;
		contentClass?: string;
		items?: (DropdownItem | DropdownGroup)[];
		trigger?: Snippet;
		open?: boolean;
	}

	let {
		triggerText = "Open",
		triggerVariant = "outline",
		triggerSize = "default",
		triggerIcon,
		triggerClass,
		showChevron = true,
		align = "start",
		side = "bottom",
		sideOffset = 4,
		contentClass,
		items = [],
		trigger,
		open = $bindable(false),
	}: Props = $props();

	const isGroup = (item: DropdownItem | DropdownGroup): item is DropdownGroup => 
		"items" in item && Array.isArray(item.items);
</script>

{#snippet renderIcon(icon: any)}
	{@const IconComponent = icon}
	<IconComponent class="size-4" />
{/snippet}

{#snippet renderShortcut(shortcut?: string)}
	{#if shortcut}
		<DropdownMenu.Shortcut>{shortcut}</DropdownMenu.Shortcut>
	{/if}
{/snippet}

{#snippet renderMenuItem(item: DropdownItem)}
	{#if item.type === "separator"}
		<DropdownMenu.Separator />
	{:else if item.type === "label"}
		<DropdownMenu.Label>{item.label}</DropdownMenu.Label>
	{:else if item.type === "checkbox"}
		<DropdownMenu.CheckboxItem
			checked={item.checked}
			disabled={item.disabled}
			onSelect={item.onSelect}
		>
			{item.label}
			{@render renderShortcut(item.shortcut)}
		</DropdownMenu.CheckboxItem>
	{:else if item.type === "submenu" && item.items}
		{@render renderSubmenu(item)}
	{:else}
		<DropdownMenu.Item
			variant={item.variant}
			disabled={item.disabled}
			onSelect={item.onSelect}
		>
			{#if item.icon}
				{@render renderIcon(item.icon)}
			{/if}
			{item.label}
			{@render renderShortcut(item.shortcut)}
		</DropdownMenu.Item>
	{/if}
{/snippet}

{#snippet renderSubmenu(item: DropdownItem)}
	<DropdownMenu.Sub>
		<DropdownMenu.SubTrigger disabled={item.disabled}>
			{#if item.icon}
				{@render renderIcon(item.icon)}
			{/if}
			{item.label}
		</DropdownMenu.SubTrigger>
		<DropdownMenu.SubContent>
			{#each item.items || [] as subItem}
				{@render renderMenuItem(subItem)}
			{/each}
		</DropdownMenu.SubContent>
	</DropdownMenu.Sub>
{/snippet}

<DropdownMenu.Root bind:open>
	{#if trigger}
		{@render trigger()}
	{:else}
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant={triggerVariant}
					size={triggerSize}
					class={triggerClass}
					icon={triggerIcon}
				>
					{triggerText}
					{#if showChevron}
						<ChevronDown class="ml-1 size-4" />
					{/if}
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
	{/if}

	<DropdownMenu.Content {align} {side} {sideOffset} class={`min-w-56 ${contentClass}`}>
		{#each items as item}
			{#if isGroup(item)}
				<DropdownMenu.Group>
				{#if item.label}
					<DropdownMenu.Label>{item.label}</DropdownMenu.Label>
				{/if}
				{#if item.type === "radio"}
					<DropdownMenu.RadioGroup value={item.value} onValueChange={item.onValueChange}>
						{#each item.items as radioItem}
							<DropdownMenu.RadioItem value={radioItem.value || ""} disabled={radioItem.disabled}>
								{radioItem.label}
								{@render renderShortcut(radioItem.shortcut)}
							</DropdownMenu.RadioItem>
						{/each}
					</DropdownMenu.RadioGroup>
				{:else}
					{#if item.type === "submenu"}
						{@render renderMenuItem(item)}
					{:else}
						{#each item.items as groupItem}
							{@render renderMenuItem(groupItem)}
						{/each}
					{/if}

				{/if}
				</DropdownMenu.Group>
			{:else}
				{@render renderMenuItem(item)}
			{/if}
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
