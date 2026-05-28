/**
 * Extended column metadata for responsive DataTable behavior.
 * Add these properties to column definitions via the `meta` field.
 *
 * @example
 * ```typescript
 * const columns: ColumnDef<Payment>[] = [
 *   {
 *     accessorKey: "email",
 *     header: "Email",
 *     meta: {
 *       mobileLabel: "Email Address",
 *       priority: 1,
 *       alwaysVisible: true,
 *     }
 *   }
 * ];
 * ```
 */
export interface DataTableColumnMeta {
	/** Hide this column in mobile card view */
	hiddenOnMobile?: boolean;
	/** Custom label for mobile view (defaults to header text or column id) */
	mobileLabel?: string;
	/** Display priority in card view - lower numbers appear first (default: 100) */
	priority?: number;
	/** Always show this column in card view regardless of other visibility settings */
	alwaysVisible?: boolean;
}

/**
 * Responsive display mode for the DataTable.
 * - `'auto'`: Use card layout on mobile, table on desktop (default)
 * - `'card'`: Always use card layout regardless of screen size
 * - `'scroll'`: Use horizontal scrolling table on all screen sizes
 */
export type ResponsiveMode = "card" | "scroll" | "auto";

export type TableVariant = "default" | "striped" | "bordered" | "compact";
