export { default as FlexRender } from "./flex-render.svelte";
export { default as DataTable } from "./data-table-root.svelte";
export { default as DataTableCheckbox } from "./data-table-checkbox.svelte";
export { default as DataTableColumnHeader } from "./data-table-column-header.svelte";
export { default as DataTableActions } from "./data-table-actions.svelte";
export { default as DataTableMobileCard } from "./data-table-mobile-card.svelte";
export { default as DataTableMobileView } from "./data-table-mobile-view.svelte";
export { default as DataTableToolbar } from "./data-table-toolbar.svelte";
export { default as DataTableContent } from "./data-table-content.svelte";
export { default as DataTablePagination } from "./data-table-pagination.svelte";
export { renderComponent, renderSnippet } from "./render-helpers.js";
export { createSvelteTable } from "./data-table.svelte.js";
export {
	getColumnMobileLabel,
	getMobileVisibleColumns,
	isSpecialColumn,
} from "./utils.js";

// Re-export commonly used types from @tanstack/table-core
export type {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	RowSelectionState,
	SortingState,
	VisibilityState,
	ExpandedState,
	Table,
	Column,
	Row,
	Cell,
	HeaderContext,
	CellContext,
} from "@tanstack/table-core";

// Re-export commonly used functions from @tanstack/table-core
export {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getExpandedRowModel,
} from "@tanstack/table-core";

// Export responsive DataTable types
export type {
	DataTableColumnMeta,
	ResponsiveMode,
	TableVariant,
} from "./types.js";
