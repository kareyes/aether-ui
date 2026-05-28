<script lang="ts" generics="TData, TValue">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import XIcon from "@lucide/svelte/icons/x";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenuPrim from "$lib/components/ui/dropdown-menu/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import type { Table, Column, ColumnDef } from "@tanstack/table-core";
	import { cn } from "$lib/utils.js";
	import { ButtonGroupPrimitives, InputGroupPrimitives } from "$lib";

	type Props = {
		table: Table<TData>;
		columns: ColumnDef<TData, TValue>[];
		showFilter?: boolean;
		showColumnToggle?: boolean;
		showFilterColumnSelector?: boolean;
		filterPlaceholder?: string;
		filterColumn?: string;
		isMobileLayout?: boolean;
		onClearFilter?: () => void;
	};

	let {
		table,
		columns,
		showFilter = true,
		showColumnToggle = true,
		showFilterColumnSelector = true,
		filterPlaceholder = "Filter...",
		filterColumn = "",
		isMobileLayout = false,
		onClearFilter,
	}: Props = $props();

	// null = no user override; set when the user picks a column from the selector
	let userSelectedColumn = $state<string | null>(null);

	const filterableColumns = $derived.by(() =>
		columns
			.filter(
				(
					col,
				): col is ColumnDef<TData, unknown> & { accessorKey: string } =>
					"accessorKey" in col && typeof col.accessorKey === "string",
			)
			.map((col) => ({
				value: col.accessorKey,
				label:
					typeof col.header === "string"
						? col.header
						: col.accessorKey,
			})),
	);

	// Resolves synchronously — no $effect, no empty-string intermediate state
	const activeFilterColumn = $derived(
		userSelectedColumn || filterColumn || (filterableColumns[0]?.value ?? ""),
	);

	const currentFilterValue = $derived.by(() => {
		if (!activeFilterColumn) return "";
		return (table.getColumn(activeFilterColumn)?.getFilterValue() as string) ?? "";
	});
</script>

<div
	class={cn(
		"flex py-4 gap-2",
		isMobileLayout
			? "flex-col sm:flex-row sm:items-center"
			: "items-center",
	)}
>
	{#if showFilter}
		<ButtonGroupPrimitives.Root
			orientation={isMobileLayout ? "vertical" : "horizontal"}
			class={cn(isMobileLayout && "w-full sm:flex-row sm:w-auto")}
		>
			{#if showFilterColumnSelector && filterableColumns.length > 1}
				<Select.Select
					value={activeFilterColumn}
					options={filterableColumns}
					onSelectionChange={(v: string | undefined) => {
						if (v && v !== activeFilterColumn) {
							table
								.getColumn(activeFilterColumn)
								?.setFilterValue("");
							userSelectedColumn = v;
						}
					}}
					triggerClass={cn(
						"h-9 capitalize",
						isMobileLayout ? "w-full" : "",
					)}
				/>
			{/if}

			<Input
				placeholder={filterPlaceholder}
				value={currentFilterValue}
				oninput={(e) =>
					table
						.getColumn(activeFilterColumn)
						?.setFilterValue(e.currentTarget.value)}
				onchange={(e) => {
					table
						.getColumn(activeFilterColumn)
						?.setFilterValue(e.currentTarget.value);
				}}
				class={cn("h-9", isMobileLayout ? "w-full" : "min-w-[200px]")}
			>
				{#snippet endButton()}<InputGroupPrimitives.InputGroupButton
						size="icon-xs"
						variant="ghost"
						class={cn(!currentFilterValue && "hidden")}
						onclick={() => {
							table
								.getColumn(activeFilterColumn)
								?.setFilterValue("");
							onClearFilter?.();
						}}
					>
						<XIcon class="size-4" />
					</InputGroupPrimitives.InputGroupButton>{/snippet}
			</Input>
		</ButtonGroupPrimitives.Root>
	{/if}
	{#if showColumnToggle}
		<DropdownMenuPrim.Root>
			<DropdownMenuPrim.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="outline"
						class={cn(
							isMobileLayout
								? "w-full sm:w-auto sm:ms-auto"
								: "ms-auto",
						)}
					>
						Columns <ChevronDownIcon class="ms-2 size-4" />
					</Button>
				{/snippet}
			</DropdownMenuPrim.Trigger>
			<DropdownMenuPrim.Content align="end">
				{#each table
					.getAllColumns()
					.filter( (col: Column<TData>) => col.getCanHide(), ) as column (column.id)}
					<DropdownMenuPrim.CheckboxItem
						class="capitalize"
						bind:checked={
							() => column.getIsVisible(),
							(v) => column.toggleVisibility(!!v)
						}
					>
						{column.id}
					</DropdownMenuPrim.CheckboxItem>
				{/each}
			</DropdownMenuPrim.Content>
		</DropdownMenuPrim.Root>
	{/if}
</div>
