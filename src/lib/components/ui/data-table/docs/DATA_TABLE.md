# Data Table Component

A powerful, flexible data table component built with TanStack Table and Svelte 5 featuring advanced customization, row selection, pagination, filtering, sorting, and expandable rows.

## Features

- ✅ **Sorting** - Click column headers to sort data
- ✅ **Filtering** - Search and filter across columns
- ✅ **Pagination** - Navigate through large datasets with customizable page sizes
- ✅ **Row Selection** - Multi-select, single-select, or no selection modes
- ✅ **Column Visibility** - Show/hide columns dynamically
- ✅ **Expandable Rows** - Collapsible row details with custom content
- ✅ **Table Variants** - Multiple visual styles (default, striped, bordered, compact)
- ✅ **Responsive Design** - Card-based layout on mobile, table on desktop
- ✅ **Customizable** - Full control over rendering with Svelte 5 snippets
- ✅ **TypeScript** - Fully typed with generics support

## Installation

The DataTable component is included in the `aether-ui` package.

```bash
pnpm add aether-ui @tanstack/table-core
```

## Quick Start

```svelte
<script lang="ts">
  import { DataTable, type ColumnDef } from "aether-ui";
  
  type User = {
    id: string;
    name: string;
    email: string;
  };
  
  const data: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
  ];
  
  const columns: ColumnDef<User>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
  ];
</script>

<DataTable {data} {columns} />
```

## Props Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | **required** | Array of data objects to display |
| `columns` | `ColumnDef<TData, TValue>[]` | **required** | Column definitions |
| `filterColumn` | `string` | `"email"` | Column key to filter |
| `filterPlaceholder` | `string` | `"Filter..."` | Filter input placeholder text |
| `pageSize` | `number` | `10` | Initial number of rows per page |
| `pageSizeOptions` | `number[]` | `[10, 20, 30, 40, 50]` | Available page size options |
| `showPageSizeSelector` | `boolean` | `true` | Show page size dropdown selector |
| `showFilter` | `boolean` | `true` | Show filter input |
| `showColumnToggle` | `boolean` | `true` | Show column visibility dropdown |
| `showPagination` | `boolean` | `true` | Show pagination controls |
| `showRowSelection` | `boolean` | `true` | Show row selection count |
| `variant` | `'default' \| 'striped' \| 'bordered' \| 'compact'` | `'default'` | Table visual style |
| `expandable` | `boolean` | `false` | Enable row expansion |
| `selectionMode` | `'multi' \| 'single' \| 'none'` | `'multi'` | Row selection behavior |
| `getRowCanExpand` | `(row: Row<TData>) => boolean` | `() => true` | Determine which rows can expand |
| `renderSubComponent` | `Snippet<[{ row: Row<TData> }]>` | `undefined` | Snippet for expanded row content |
| `onPageChange` | `(page: number, action?: 'next' \| 'previous') => void` | `undefined` | Callback when page changes |
| `onPageSizeChange` | `(pageSize: number) => void` | `undefined` | Callback when page size changes |
| `onRowSelectionChange` | `(selectedRows: TData[]) => void` | `undefined` | Callback when selection changes |
| `responsiveMode` | `'auto' \| 'card' \| 'scroll'` | `'auto'` | Mobile display mode |
| `showFilterColumnSelector` | `boolean` | `true` | Show dropdown to select which column to filter |

## Table Variants

### Default
Standard table appearance with hover effects.

```svelte
<DataTable {data} {columns} variant="default" />
```

### Striped
Alternating row background colors for better readability.

```svelte
<DataTable {data} {columns} variant="striped" />
```

### Bordered
Enhanced borders between columns and around the table.

```svelte
<DataTable {data} {columns} variant="bordered" />
```

### Compact
Reduced padding and smaller text for dense data display.

```svelte
<DataTable {data} {columns} variant="compact" />
```

## Responsive Design

The DataTable automatically adapts to different screen sizes. On mobile devices (< 768px), it switches from a traditional table layout to a card-based layout for better readability and touch interaction.

### Responsive Modes

| Mode | Description |
|------|-------------|
| `'auto'` | Automatically switches to cards on mobile, table on desktop (default) |
| `'card'` | Always display as cards regardless of screen size |
| `'scroll'` | Keep table layout with horizontal scrolling on all screen sizes |

### Auto Mode (Default)

The table automatically detects the screen size and switches layouts:

```svelte
<DataTable {data} {columns} responsiveMode="auto" />
```

- **Desktop (≥768px)**: Traditional table layout
- **Mobile (<768px)**: Card-based stacked layout

### Force Card Mode

Always display data as cards, useful for dashboards or when you prefer the card layout:

```svelte
<DataTable {data} {columns} responsiveMode="card" />
```

### Scroll Mode

Keep the traditional table with horizontal scrolling on smaller screens:

```svelte
<DataTable {data} {columns} responsiveMode="scroll" />
```

## Column Mobile Metadata

Customize how columns appear in the mobile card view using the `meta` field on column definitions.

### DataTableColumnMeta Type

```ts
interface DataTableColumnMeta {
  /** Hide this column in mobile card view */
  hiddenOnMobile?: boolean;
  /** Custom label for mobile view (defaults to header text) */
  mobileLabel?: string;
  /** Display priority in card view - lower numbers appear first (default: 100) */
  priority?: number;
  /** Always show this column in card view regardless of visibility settings */
  alwaysVisible?: boolean;
}
```

### Example: Columns with Mobile Metadata

```ts
import type { ColumnDef, DataTableColumnMeta } from "aether-ui";

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      mobileLabel: "Payment Status",  // Custom label in card view
      priority: 1,                     // Appears first in card
      alwaysVisible: true              // Highlighted in card view
    } as DataTableColumnMeta,
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: {
      mobileLabel: "Email Address",
      priority: 2
    } as DataTableColumnMeta,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    meta: {
      mobileLabel: "Amount (USD)",
      priority: 3
    } as DataTableColumnMeta,
  },
  {
    accessorKey: "internalId",
    header: "Internal ID",
    meta: {
      hiddenOnMobile: true  // Hidden in card view
    } as DataTableColumnMeta,
  },
];
```

### Mobile Card Layout

In card mode, each row renders as a card with the following structure:

```
┌─────────────────────────────────────┐
│ [checkbox] [expand]      [actions]  │  ← Card header (selection/actions)
├─────────────────────────────────────┤
│ LABEL                               │
│ Cell value                          │  ← Data fields (sorted by priority)
│                                     │
│ LABEL                               │
│ Cell value                          │
├─────────────────────────────────────┤
│ Expanded content (if expanded)      │  ← Optional expanded content
└─────────────────────────────────────┘
```

### Responsive Header & Footer

The filter controls and pagination automatically adapt to mobile:

**Mobile Layout:**
- Filter input expands to full width
- Column toggle button expands to full width
- Pagination shows "Page X of Y" indicator
- Previous/Next buttons expand side-by-side
- Page size selector hidden (saves space)

**Desktop Layout:**
- Standard horizontal layout with all controls visible

## Selection Modes

### Multi-Select (Default)
Allow selecting multiple rows with checkboxes.

```svelte
<DataTable 
  {data} 
  {columns} 
  selectionMode="multi"
  onRowSelectionChange={(selected) => console.log(selected)}
/>
```

### Single-Select
Radio button behavior - only one row at a time.

```svelte
<DataTable 
  {data} 
  {columns} 
  selectionMode="single"
  onRowSelectionChange={(selected) => console.log(selected[0])}
/>
```

### No Selection
Disable row selection entirely.

```svelte
<DataTable {data} {columns} selectionMode="none" />
```

## Column Definitions

### Basic Column

```ts
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
```

### Sortable Column

```ts
import { DataTableColumnHeader, renderComponent } from "aether-ui";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) =>
      renderComponent(DataTableColumnHeader, {
        title: "Email",
        onclick: column.getToggleSortingHandler()
      }),
  },
];
```

### Checkbox Selection Column

```ts
import {
  DataTableCheckbox,
  renderComponent,
  type HeaderContext,
  type CellContext
} from "aether-ui";

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }: HeaderContext<User, unknown>) =>
      renderComponent(DataTableCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate: 
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all"
      }),
    cell: ({ row }: CellContext<User, unknown>) =>
      renderComponent(DataTableCheckbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        "aria-label": "Select row"
      }),
    enableSorting: false,
    enableHiding: false
  },
];
```

### Custom Cell Rendering with Snippets

```ts
import { createRawSnippet } from "svelte";
import { renderSnippet } from "aether-ui";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const snippet = createRawSnippet<[{ status: string }]>((getStatus) => {
        const { status } = getStatus();
        return {
          render: () => `<span class="capitalize">${status}</span>`
        };
      });
      return renderSnippet(snippet, { status: row.original.status });
    }
  },
];
```

### Actions Column

```ts
import { DataTableActions, renderComponent } from "aether-ui";

const columns: ColumnDef<User>[] = [
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) =>
      renderComponent(DataTableActions, {
        id: row.original.id,
        copyLabel: "Copy user ID",
        actions: [
          {
            label: "View details",
            onclick: () => console.log("View", row.original)
          },
          {
            label: "Edit",
            onclick: () => console.log("Edit", row.original)
          },
          {
            label: "Delete",
            onclick: () => console.log("Delete", row.original)
          }
        ]
      })
  },
];
```

## Expandable Rows

Enable row expansion to show additional details.

```svelte
<script lang="ts">
  import { DataTable, type ColumnDef } from "aether-ui";
  
  type Payment = {
    id: string;
    amount: number;
    email: string;
    details?: string;
  };
  
  const data: Payment[] = [
    { id: "1", amount: 100, email: "user@example.com", details: "Additional info" },
  ];
  
  const columns: ColumnDef<Payment>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "email", header: "Email" },
  ];
</script>

<DataTable {data} {columns} expandable={true}>
  {#snippet renderSubComponent({ row })}
    {@const payment = row.original}
    <div class="p-4 space-y-2">
      <h4 class="font-semibold">Payment Details</h4>
      <p>ID: {payment.id}</p>
      <p>Amount: ${payment.amount}</p>
      <p>Email: {payment.email}</p>
      {#if payment.details}
        <p class="text-muted-foreground">{payment.details}</p>
      {/if}
    </div>
  {/snippet}
</DataTable>
```

### Conditional Row Expansion

```svelte
<DataTable 
  {data} 
  {columns} 
  expandable={true}
  getRowCanExpand={(row) => row.original.hasDetails === true}
>
  {#snippet renderSubComponent({ row })}
    <!-- Expanded content -->
  {/snippet}
</DataTable>
```

## Pagination

### Custom Page Size

```svelte
<DataTable {data} {columns} pageSize={20} />
```

### Custom Page Size Options

```svelte
<DataTable 
  {data} 
  {columns} 
  pageSize={5}
  pageSizeOptions={[5, 10, 25, 50, 100]}
/>
```

### Page Change Callback

```svelte
<DataTable 
  {data} 
  {columns} 
  onPageChange={(page, action) => {
    console.log(`Navigated to page ${page} via ${action}`);
  }}
  onPageSizeChange={(size) => {
    console.log(`Page size changed to ${size}`);
  }}
/>
```

### Disable Pagination

```svelte
<DataTable 
  {data} 
  {columns} 
  showPagination={false}
  pageSize={1000}
/>
```

## Filtering

### Filter Column Selector

By default, a dropdown appears next to the filter input allowing users to choose which column to filter. This is useful when your table has multiple filterable columns.

```svelte
<DataTable
  {data}
  {columns}
  showFilterColumnSelector={true}
  filterPlaceholder="Search..."
/>
```

The dropdown automatically lists all columns that have an `accessorKey` defined.

### Set Initial Filter Column

```svelte
<DataTable
  {data}
  {columns}
  filterColumn="name"
  filterPlaceholder="Search by name..."
/>
```

### Disable Filter Column Selector

If you want a fixed filter column without the dropdown:

```svelte
<DataTable
  {data}
  {columns}
  filterColumn="email"
  showFilterColumnSelector={false}
  filterPlaceholder="Filter by email..."
/>
```

### Disable Filter

```svelte
<DataTable {data} {columns} showFilter={false} />
```

## Column Visibility

The column visibility dropdown is shown by default. Users can toggle which columns are visible.

### Disable Column Toggle

```svelte
<DataTable {data} {columns} showColumnToggle={false} />
```

### Non-Hideable Columns

```ts
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false  // Cannot be hidden
  },
  {
    accessorKey: "name",
    header: "Name",
    // Can be hidden by default
  },
];
```

## Advanced Examples

### Complete Feature-Rich Table

```svelte
<script lang="ts">
  import { DataTable, type ColumnDef } from "aether-ui";
  import { 
    DataTableCheckbox, 
    DataTableColumnHeader,
    DataTableActions,
    renderComponent 
  } from "aether-ui";
  
  type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive";
  };
  
  const users: User[] = [
    { id: "1", name: "John", email: "john@example.com", role: "Admin", status: "active" },
    // ... more users
  ];
  
  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) =>
        renderComponent(DataTableCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          indeterminate: 
            table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
          onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        }),
      cell: ({ row }) =>
        renderComponent(DataTableCheckbox, {
          checked: row.getIsSelected(),
          onCheckedChange: (value) => row.toggleSelected(!!value),
        }),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: "name",
      header: ({ column }) =>
        renderComponent(DataTableColumnHeader, {
          title: "Name",
          onclick: column.getToggleSortingHandler()
        }),
    },
    {
      accessorKey: "email",
      header: ({ column }) =>
        renderComponent(DataTableColumnHeader, {
          title: "Email",
          onclick: column.getToggleSortingHandler()
        }),
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(DataTableActions, {
          id: row.original.id,
          copyLabel: "Copy user ID",
          actions: [
            { label: "View", onclick: () => viewUser(row.original) },
            { label: "Edit", onclick: () => editUser(row.original) },
            { label: "Delete", onclick: () => deleteUser(row.original) },
          ]
        })
    },
  ];
  
  function viewUser(user: User) {
    console.log("Viewing", user);
  }
  
  function editUser(user: User) {
    console.log("Editing", user);
  }
  
  function deleteUser(user: User) {
    console.log("Deleting", user);
  }
</script>

<DataTable 
  data={users}
  {columns}
  variant="striped"
  filterColumn="name"
  filterPlaceholder="Search users..."
  pageSize={10}
  pageSizeOptions={[10, 20, 50, 100]}
  selectionMode="multi"
  onPageChange={(page, action) => console.log("Page:", page, action)}
  onPageSizeChange={(size) => console.log("Page size:", size)}
  onRowSelectionChange={(selected) => console.log("Selected:", selected)}
/>
```

### Minimal Table

```svelte
<DataTable 
  {data} 
  {columns} 
  showFilter={false}
  showColumnToggle={false}
  showPagination={false}
  showRowSelection={false}
  selectionMode="none"
/>
```

## Components

### DataTable

Main table component with all features.

### DataTableCheckbox

Checkbox component for row selection.

**Props:**
- `checked?: boolean` - Checkbox state
- `indeterminate?: boolean` - Indeterminate state
- `onCheckedChange?: (checked: boolean) => void` - Change handler
- `aria-label?: string` - Accessibility label

### DataTableColumnHeader

Sortable column header with visual indicators.

**Props:**
- `title: string` - Header text
- `onclick?: () => void` - Click handler for sorting

### DataTableActions

Dropdown menu for row actions.

**Props:**
- `id: string` - Row identifier (used for copy action)
- `copyLabel?: string` - Label for copy action (default: "Copy ID")
- `actions?: Array<{ label: string; onclick: () => void }>` - Custom actions

### DataTableMobileCard

Card component for rendering a single row in mobile view.

**Props:**
- `row: Row<TData>` - The row data to render
- `expandable?: boolean` - Enable row expansion
- `showRowSelection?: boolean` - Show selection checkbox
- `selectionMode?: 'multi' | 'single' | 'none'` - Selection mode
- `renderSubComponent?: Snippet` - Content for expanded state
- `variant?: TableVariant` - Visual variant
- `index?: number` - Row index for striped variant

### DataTableMobileView

Container component that renders all rows as cards in mobile view.

**Props:**
- `table: Table<TData>` - The TanStack Table instance
- `expandable?: boolean` - Enable row expansion
- `showRowSelection?: boolean` - Show selection checkboxes
- `selectionMode?: 'multi' | 'single' | 'none'` - Selection mode
- `renderSubComponent?: Snippet` - Content for expanded rows
- `variant?: TableVariant` - Visual variant

## Utility Functions

### renderComponent

Renders a Svelte component within a table cell.

```ts
import { renderComponent } from "aether-ui";

renderComponent(MyComponent, { prop1: "value" })
```

### renderSnippet

Renders a Svelte snippet within a table cell.

```ts
import { createRawSnippet } from "svelte";
import { renderSnippet } from "aether-ui";

const snippet = createRawSnippet(() => ({
  render: () => `<div>Content</div>`
}));

renderSnippet(snippet, { data: "value" })
```

### getColumnMobileLabel

Extracts the display label for a column in mobile card view.

```ts
import { getColumnMobileLabel } from "aether-ui";

// Returns: meta.mobileLabel > string header > formatted column id
const label = getColumnMobileLabel(column);
```

### getMobileVisibleColumns

Filters and sorts columns for mobile card view based on meta configuration.

```ts
import { getMobileVisibleColumns } from "aether-ui";

// Returns columns sorted by priority, excluding those with hiddenOnMobile: true
const mobileColumns = getMobileVisibleColumns(allColumns);
```

### isSpecialColumn

Checks if a column is a special column (select or actions) that should be rendered separately in the card header.

```ts
import { isSpecialColumn } from "aether-ui";

if (isSpecialColumn(column)) {
  // Render in card header instead of body
}
```

## TypeScript Support

The DataTable component is fully typed with TypeScript generics:

```ts
import type { ColumnDef } from "aether-ui";

type MyData = {
  id: string;
  name: string;
};

const columns: ColumnDef<MyData>[] = [
  { accessorKey: "name", header: "Name" }
];
```

## Best Practices

1. **Define Types**: Always define TypeScript types for your data
2. **Column IDs**: Use unique IDs for columns without accessorKey
3. **Memoization**: Consider memoizing large datasets
4. **Accessibility**: Provide aria-labels for selection checkboxes
5. **Performance**: Use `enableSorting: false` for non-sortable columns
6. **Callbacks**: Handle selection and pagination changes appropriately

## Troubleshooting

### Table not updating when data changes

Ensure you're reassigning the data array, not mutating it:

```ts
// ✅ Good
data = [...data, newItem];

// ❌ Bad  
data.push(newItem);
```

### Selection not working

Make sure you include the selection column in your columns definition and use the correct selection mode.

### Expandable rows not showing

Verify that:
1. `expandable={true}` is set
2. You've provided a `renderSubComponent` snippet
3. `getRowCanExpand` returns true for the rows you want to expand

## License

Part of the Aether UI component library.
