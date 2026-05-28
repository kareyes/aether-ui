<script lang="ts" generics="TData">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import type { Table, PaginationState } from "@tanstack/table-core";
	import { cn } from "$lib/utils.js";

	type Props = {
		table: Table<TData>;
		pagination: PaginationState;
		showRowSelection?: boolean;
		showPageSizeSelector?: boolean;
		pageSizeOptions?: number[];
		isMobileLayout?: boolean;
		onPageChange?: (page: number, action?: "next" | "previous") => void;
		onPageSizeChange?: (pageSize: number) => void;
		onPaginationUpdate: (newPagination: PaginationState) => void;
	};

	let {
		table,
		pagination,
		showRowSelection = true,
		showPageSizeSelector = true,
		pageSizeOptions = [10, 20, 30, 40, 50],
		isMobileLayout = false,
		onPageChange,
		onPageSizeChange,
		onPaginationUpdate,
	}: Props = $props();
</script>

<div
	class={cn(
		"flex pt-4 gap-3",
		isMobileLayout
			? "flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
			: "items-center justify-end space-x-2",
	)}
>
	{#if showRowSelection}
		<div
			class={cn(
				"text-muted-foreground text-sm",
				isMobileLayout ? "text-center sm:text-left" : "flex-1",
			)}
		>
			{table.getFilteredSelectedRowModel().rows.length} of
			{table.getFilteredRowModel().rows.length} row(s) selected.
		</div>
	{/if}

	{#if isMobileLayout}
		<div class="text-muted-foreground text-sm text-center sm:hidden">
			Page {pagination.pageIndex + 1} of {table.getPageCount()}
		</div>
	{/if}

	<div
		class={cn(
			"flex items-center gap-2",
			isMobileLayout ? "flex-col sm:flex-row w-full sm:w-auto" : "",
		)}
	>
		{#if showPageSizeSelector}
			<div
				class={cn(
					"flex items-center space-x-2",
					isMobileLayout && "hidden sm:flex",
				)}
			>
				<p class="text-sm font-medium whitespace-nowrap">
					Rows per page
				</p>
				<Select.Select
					value={String(pagination.pageSize)}
					options={pageSizeOptions.map((size) => ({
						value: String(size),
						label: String(size),
					}))}
					onSelectionChange={(v: string | undefined) => {
						if (v) {
							const newSize = Number(v);
							if (newSize !== pagination.pageSize) {
								onPaginationUpdate({
									...pagination,
									pageSize: newSize,
									pageIndex: 0,
								});
								onPageSizeChange?.(newSize);
							}
						}
					}}
					size="sm"
					triggerClass="h-8 w-[70px]"
				/>
			</div>
		{/if}

		<div
			class={cn(
				"flex gap-2",
				isMobileLayout ? "w-full sm:w-auto" : "space-x-2",
			)}
		>
			<Button
				variant="outline"
				size="sm"
				onclick={() => {
					table.previousPage();
					onPageChange?.(pagination.pageIndex - 1, "previous");
				}}
				disabled={!table.getCanPreviousPage()}
				class={isMobileLayout ? "flex-1 sm:flex-none" : ""}
			>
				Previous
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => {
					table.nextPage();
					onPageChange?.(pagination.pageIndex + 1, "next");
				}}
				disabled={!table.getCanNextPage()}
				class={isMobileLayout ? "flex-1 sm:flex-none" : ""}
			>
				Next
			</Button>
		</div>
	</div>
</div>
