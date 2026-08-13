<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type RowSelectionState,
		type SortingState,
		type VisibilityState,
		type ExpandedState,
		type Row,
		createSvelteTable,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		getExpandedRowModel,
	} from "./index.js";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";
	import DataTableToolbar from "./data-table-toolbar.svelte";
	import DataTableContent from "./data-table-content.svelte";
	import DataTableMobileView from "./data-table-mobile-view.svelte";
	import DataTablePagination from "./data-table-pagination.svelte";
	import type { ResponsiveMode, TableVariant } from "./types.js";

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		filterColumn?: string;
		filterPlaceholder?: string;
		pageSize?: number;
		pageSizeOptions?: number[];
		showPageSizeSelector?: boolean;
		showFilter?: boolean;
		showColumnToggle?: boolean;
		showPagination?: boolean;
		showRowSelection?: boolean;
		showFilterColumnSelector?: boolean;
		variant?: TableVariant;
		expandable?: boolean;
		selectionMode?: "multi" | "single" | "none";
		getRowCanExpand?: (row: Row<TData>) => boolean;
		renderSubComponent?: import("svelte").Snippet<[{ row: Row<TData> }]>;
		/**
		 * Replaces the default label/value stack in the mobile card body. The
		 * card shell (selection / expand / actions header, expanded content)
		 * still renders around it. Use when the card needs a bespoke layout the
		 * generic field list can't express.
		 */
		mobileCard?: import("svelte").Snippet<[{ row: Row<TData> }]>;
		onPageChange?: (page: number, action?: "next" | "previous") => void;
		onPageSizeChange?: (pageSize: number) => void;
		onRowSelectionChange?: (selectedRows: TData[]) => void;
		onClearFilter?: () => void;
		responsiveMode?: ResponsiveMode;
		/**
		 * Width (px) below which `responsiveMode="auto"` switches to cards.
		 * Defaults to `DEFAULT_MOBILE_BREAKPOINT`, the same threshold `IsMobile`
		 * uses, so omitting it changes nothing.
		 *
		 * Raise it for a table whose column count needs more room than a phone
		 * boundary implies. A table living beside a sidebar gets far less width
		 * than the viewport suggests, and a nine-column table at 740px of
		 * content is a horizontal scroll through columns the caller already has
		 * a `mobileCard` for.
		 */
		cardBreakpoint?: number;
	};

	let {
		data,
		columns,
		filterColumn = "",
		filterPlaceholder = "Filter...",
		pageSize = 10,
		pageSizeOptions = [10, 20, 30, 40, 50],
		showPageSizeSelector = true,
		showFilter = true,
		showColumnToggle = true,
		showPagination = true,
		showRowSelection = true,
		showFilterColumnSelector = true,
		variant = "default",
		expandable = false,
		selectionMode = "multi",
		getRowCanExpand = () => true,
		renderSubComponent,
		mobileCard,
		onPageChange,
		onPageSizeChange,
		onRowSelectionChange,
		onClearFilter,
		responsiveMode = "scroll",
		cardBreakpoint,
	}: DataTableProps<TData, TValue> = $props();

	// Mobile detection. `isMobile` drives the *chrome* (toolbar, pagination),
	// which is a question about the device and stays on the 768 default.
	// `isNarrow` drives the card/table switch, which is a question about how
	// much room this particular table needs — hence the separate, overridable
	// breakpoint. They are the same query unless a caller says otherwise.
	const isMobile = new IsMobile();
	// Read once, on purpose: this is configuration, not state. Each `IsMobile`
	// registers a `matchMedia` listener, so re-deriving it whenever the prop
	// changed identity would churn subscriptions to answer a question no caller
	// asks — nobody moves a table's card threshold at runtime. Reusing
	// `isMobile` when unset keeps the common case to a single listener.
	// svelte-ignore state_referenced_locally
	const isNarrow =
		cardBreakpoint !== undefined ? new IsMobile(cardBreakpoint) : isMobile;
	const shouldShowCards = $derived.by(() =>
		responsiveMode === "card" ||
			(responsiveMode === "auto" && isNarrow.current),
	);
	const isMobileLayout = $derived.by(() => isMobile.current);

	// Table state
	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });

$effect(() => {
	pagination.pageSize = pageSize;
});
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let rowSelection = $state<RowSelectionState>({});
	let columnVisibility = $state<VisibilityState>({});
	let expanded = $state<ExpandedState>({});

	const table = createSvelteTable({
		get data() {
			return data;
		},
		get columns() {
			return columns;
		},
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get columnFilters() {
				return columnFilters;
			},
			get expanded() {
				return expanded;
			},
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		get getRowCanExpand() {
			return getRowCanExpand;
		},
		get enableRowSelection() {
			return selectionMode !== "none";
		},
		get enableMultiRowSelection() {
			return selectionMode === "multi";
		},
		onPaginationChange: (updater) => {
			pagination =
				typeof updater === "function" ? updater(pagination) : updater;
			onPageSizeChange?.(pagination.pageSize);
		},
		onSortingChange: (updater) => {
			sorting =
				typeof updater === "function" ? updater(sorting) : updater;
		},
		onColumnFiltersChange: (updater) => {
			columnFilters =
				typeof updater === "function"
					? updater(columnFilters)
					: updater;
		},
		onColumnVisibilityChange: (updater) => {
			columnVisibility =
				typeof updater === "function"
					? updater(columnVisibility)
					: updater;
		},
		onRowSelectionChange: (updater) => {
			rowSelection =
				typeof updater === "function" ? updater(rowSelection) : updater;
			if (onRowSelectionChange) {
				const selectedRowIds = Object.keys(rowSelection).filter(
					(key) => rowSelection[key],
				);
				const selectedData = data.filter((_, index) =>
					selectedRowIds.includes(String(index)),
				);
				onRowSelectionChange(selectedData);
			}
		},
		onExpandedChange: (updater) => {
			expanded =
				typeof updater === "function" ? updater(expanded) : updater;
		},
	});
</script>

{#if showFilter || showColumnToggle}
	<DataTableToolbar
		{table}
		{columns}
		{showFilter}
		{showColumnToggle}
		{showFilterColumnSelector}
		{filterPlaceholder}
		{filterColumn}
		{isMobileLayout}
		{onClearFilter}
	/>
{/if}

{#if shouldShowCards}
	<DataTableMobileView
		{table}
		{expandable}
		{showRowSelection}
		{selectionMode}
		{renderSubComponent}
		{mobileCard}
		{variant}
	/>
{:else}
	<DataTableContent
		{table}
		{columns}
		{expandable}
		{variant}
		{responsiveMode}
		{renderSubComponent}
	/>
{/if}

{#if showPagination}
	<DataTablePagination
		{table}
		{pagination}
		{showRowSelection}
		{showPageSizeSelector}
		{pageSizeOptions}
		{isMobileLayout}
		{onPageChange}
		{onPageSizeChange}
		onPaginationUpdate={(p) => (pagination = p)}
	/>
{/if}
