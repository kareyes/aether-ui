import type { Column } from "@tanstack/table-core";
import type { DataTableColumnMeta } from "./types.js";

/**
 * Extracts the display label for a column in mobile card view.
 * Priority order: meta.mobileLabel > string header > formatted column id
 */
export function getColumnMobileLabel<TData, TValue>(
	column: Column<TData, TValue>,
): string {
	const meta = column.columnDef.meta as DataTableColumnMeta | undefined;

	// 1. Check for explicit mobile label in meta
	if (meta?.mobileLabel) {
		return meta.mobileLabel;
	}

	// 2. Check if header is a plain string
	const header = column.columnDef.header;
	if (typeof header === "string") {
		return header;
	}

	// 3. Fall back to column id (capitalize and add spaces before capitals)
	return formatColumnId(column.id);
}

/**
 * Formats a column ID into a readable label.
 * Example: "firstName" -> "First Name", "email" -> "Email"
 */
function formatColumnId(id: string): string {
	return id
		.charAt(0)
		.toUpperCase()
		.concat(id.slice(1).replace(/([A-Z])/g, " $1"));
}

/**
 * Filters and sorts columns for mobile card view based on meta configuration.
 * - Removes columns with `hiddenOnMobile: true`
 * - Sorts by `priority` (lower values first, default: 100)
 */
export function getMobileVisibleColumns<TData>(
	columns: Column<TData, unknown>[],
): Column<TData, unknown>[] {
	return columns
		.filter((column) => {
			const meta = column.columnDef.meta as DataTableColumnMeta | undefined;
			// Include if not explicitly hidden on mobile
			return !meta?.hiddenOnMobile;
		})
		.sort((a, b) => {
			const metaA = a.columnDef.meta as DataTableColumnMeta | undefined;
			const metaB = b.columnDef.meta as DataTableColumnMeta | undefined;
			const priorityA = metaA?.priority ?? 100;
			const priorityB = metaB?.priority ?? 100;
			return priorityA - priorityB;
		});
}

/**
 * Checks if a column is a special column (select or actions) that should
 * be rendered separately in the card header rather than as a data field.
 */
export function isSpecialColumn<TData>(
	column: Column<TData, unknown>,
): boolean {
	return column.id === "actions" || column.id === "select";
}
