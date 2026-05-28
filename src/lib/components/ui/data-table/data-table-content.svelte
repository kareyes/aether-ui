<script lang="ts" generics="TData, TValue">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import * as Table from "$lib/components/ui/table/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import type { ColumnDef, Table as TableType, Row } from "@tanstack/table-core";
	import { FlexRender } from "./index.js";
	import { cn } from "$lib/utils.js";
	import type { TableVariant, ResponsiveMode } from "./types.js";

	type Props = {
		table: TableType<TData>;
		columns: ColumnDef<TData, TValue>[];
		expandable?: boolean;
		variant?: TableVariant;
		responsiveMode?: ResponsiveMode;
		renderSubComponent?: import("svelte").Snippet<[{ row: Row<TData> }]>;
	};

	let {
		table,
		columns,
		expandable = false,
		variant = "default",
		responsiveMode = "scroll",
		renderSubComponent,
	}: Props = $props();
</script>

<div
	class={cn(
		"rounded-md border",
		responsiveMode === "scroll" && "overflow-x-auto",
		variant === "bordered" && "border-2",
		variant === "compact" && "text-xs",
	)}
>
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#if expandable}
						<Table.Head
							class={cn(
								"w-12",
								variant === "bordered" && "border-r",
								variant === "compact" && "py-1.5 px-2",
							)}
						/>
					{/if}
					{#each headerGroup.headers as header (header.id)}
						<Table.Head
							class={cn(
								"[&:has([role=checkbox])]:ps-3",
								variant === "bordered" &&
									"border-r last:border-r-0",
								variant === "compact" && "py-1.5 px-2",
							)}
						>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row, index (row.id)}
				<Table.Row
					data-state={row.getIsSelected() && "selected"}
					class={cn(
						variant === "striped" &&
							index % 2 === 1 &&
							"bg-muted/30",
						variant === "compact" &&
							"[&>td]:py-1.5 [&>td]:px-2",
					)}
				>
					{#if expandable && row.getCanExpand()}
						<Table.Cell
							class={cn(
								"w-12",
								variant === "bordered" && "border-r",
							)}
						>
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
						</Table.Cell>
					{/if}
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell
							class={cn(
								"[&:has([role=checkbox])]:ps-3",
								variant === "bordered" &&
									"border-r last:border-r-0",
							)}
						>
							<FlexRender
								content={cell.column.columnDef.cell}
								context={cell.getContext()}
							/>
						</Table.Cell>
					{/each}
				</Table.Row>
				{#if expandable && row.getIsExpanded()}
					<Table.Row class="hover:bg-transparent">
						<Table.Cell
							colspan={row.getVisibleCells().length +
								(row.getCanExpand() ? 1 : 0)}
							class="p-0"
						>
							<div class="p-4 bg-muted/30">
								{#if renderSubComponent}
									{@render renderSubComponent({ row })}
								{/if}
							</div>
						</Table.Cell>
					</Table.Row>
				{/if}
			{:else}
				<Table.Row>
					<Table.Cell
						colspan={columns.length}
						class="h-24 text-center"
					>
						No results.
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
