<script lang="ts" generics="TData">
	import type { Row } from "@tanstack/table-core";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import FlexRender from "./flex-render.svelte";
	import DataTableCheckbox from "./data-table-checkbox.svelte";
	import {
		getColumnMobileLabel,
		getMobileVisibleColumns,
		isSpecialColumn,
	} from "./utils.js";
	import type { DataTableColumnMeta, TableVariant } from "./types.js";

	type Props = {
		row: Row<TData>;
		expandable?: boolean;
		showRowSelection?: boolean;
		selectionMode?: "multi" | "single" | "none";
		renderSubComponent?: import("svelte").Snippet<[{ row: Row<TData> }]>;
		variant?: TableVariant;
		index?: number;
	};

	let {
		row,
		expandable = false,
		showRowSelection = true,
		selectionMode = "multi",
		renderSubComponent,
		variant = "default",
		index = 0,
	}: Props = $props();

	// Get all columns from row cells
	const allColumns = $derived(row.getAllCells().map((c) => c.column));

	// Get visible columns sorted by priority, excluding special columns
	const visibleColumns = $derived(
		getMobileVisibleColumns(allColumns).filter(
			(col) => !isSpecialColumn(col),
		),
	);

	// Find action column cell if it exists
	const actionCell = $derived(
		row.getAllCells().find((c) => c.column.id === "actions"),
	);

	// Check if we need to show the card header (has selection, expand, or actions)
	const showCardHeader = $derived(
		(showRowSelection && selectionMode !== "none") ||
			(expandable && row.getCanExpand()) ||
			actionCell,
	);
</script>

<div
	class={cn(
		"bg-card text-card-foreground rounded-lg border border-border shadow-sm",
		"p-4 space-y-3",
		row.getIsSelected() && "ring-1 ring-primary border-primary",
		variant === "striped" && index % 2 === 1 && "bg-muted/30",
		variant === "compact" && "p-3 space-y-2 text-sm",
	)}
	data-state={row.getIsSelected() ? "selected" : undefined}
>
	<!-- Card Header: Selection + Expand + Actions -->
	{#if showCardHeader}
		<div
			class="flex items-center justify-between pb-2 border-b border-border/50"
		>
			<div class="flex items-center gap-2">
				{#if showRowSelection && selectionMode !== "none"}
					<DataTableCheckbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label="Select row"
					/>
				{/if}
				{#if expandable && row.getCanExpand()}
					<Button
						variant="ghost"
						size="sm"
						class="h-8 w-8 p-0"
						onclick={() => row.toggleExpanded()}
					>
						<ChevronDownIcon
							class={cn(
								"h-4 w-4 transition-transform",
								row.getIsExpanded() && "rotate-180",
							)}
						/>
					</Button>
				{/if}
			</div>
			{#if actionCell}
				<FlexRender
					content={actionCell.column.columnDef.cell}
					context={actionCell.getContext()}
				/>
			{/if}
		</div>
	{/if}

	<!-- Card Body: Data Fields -->
	<div class="space-y-2">
		{#each visibleColumns as column (column.id)}
			{@const cell = row
				.getAllCells()
				.find((c) => c.column.id === column.id)}
			{#if cell}
				{@const meta = column.columnDef.meta as
					| DataTableColumnMeta
					| undefined}
				<div
					class={cn(
						"flex flex-col gap-0.5",
						meta?.alwaysVisible && "font-medium",
					)}
				>
					<span
						class="text-xs text-muted-foreground uppercase tracking-wide"
					>
						{getColumnMobileLabel(column)}
					</span>
					<div class="text-sm">
						<FlexRender
							content={cell.column.columnDef.cell}
							context={cell.getContext()}
						/>
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<!-- Expanded Content -->
	{#if expandable && row.getIsExpanded() && renderSubComponent}
		<div
			class="pt-3 mt-3 border-t border-border/50 bg-muted/30 -mx-4 -mb-4 p-4 rounded-b-lg"
		>
			{@render renderSubComponent({ row })}
		</div>
	{/if}
</div>
