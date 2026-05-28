<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import { createRawSnippet } from "svelte";
	import DataTable from "../data-table-root.svelte";
	import DataTableCheckbox from "../data-table-checkbox.svelte";
	import DataTableColumnHeader from "../data-table-column-header.svelte";
	import DataTableActions from "../data-table-actions.svelte";
	import type { ColumnDef, HeaderContext, CellContext, DataTableColumnMeta } from "../index.js";
	import { renderComponent, renderSnippet } from "../index.js";

	type Payment = {
		id: string;
		amount: number;
		status: "Pending" | "Processing" | "Success" | "Failed";
		email: string;
	};

	const sampleData: Payment[] = [
		{
			id: "m5gr84i9",
			amount: 316,
			status: "Success",
			email: "ken99@yahoo.com"
		},
		{
			id: "3u1reuv4",
			amount: 242,
			status: "Success",
			email: "Abe45@gmail.com"
		},
		{
			id: "derv1ws0",
			amount: 837,
			status: "Processing",
			email: "Monserrat44@gmail.com"
		},
		{
			id: "5kma53ae",
			amount: 874,
			status: "Success",
			email: "Silas22@gmail.com"
		},
		{
			id: "bhqecj4p",
			amount: 721,
			status: "Failed",
			email: "carmella@hotmail.com"
		},
		{
			id: "a1b2c3d4",
			amount: 450,
			status: "Pending",
			email: "john.doe@example.com"
		},
		{
			id: "e5f6g7h8",
			amount: 920,
			status: "Success",
			email: "jane.smith@gmail.com"
		},
		{
			id: "i9j0k1l2",
			amount: 350,
			status: "Processing",
			email: "bob.wilson@yahoo.com"
		},
		{
			id: "m3n4o5p6",
			amount: 680,
			status: "Failed",
			email: "alice.brown@hotmail.com"
		},
		{
			id: "q7r8s9t0",
			amount: 530,
			status: "Success",
			email: "charlie.davis@gmail.com"
		}
	];

	const createColumns = (): ColumnDef<Payment>[] => [
		{
			id: "select",
			header: ({ table }: HeaderContext<Payment, unknown>) =>
				renderComponent(DataTableCheckbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate:
						table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					"aria-label": "Select all"
				}),
			cell: ({ row }: CellContext<Payment, unknown>) =>
				renderComponent(DataTableCheckbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					"aria-label": "Select row"
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }: CellContext<Payment, unknown>) => {
				const statusSnippet = createRawSnippet<[{ status: string }]>((getStatus) => {
					const { status } = getStatus();
					return {
						render: () => `<div class="capitalize">${status}</div>`
					};
				});
				return renderSnippet(statusSnippet, {
					status: row.original.status
				});
			}
		},
		{
			accessorKey: "email",
			header: ({ column }: HeaderContext<Payment, unknown>) =>
				renderComponent(DataTableColumnHeader, {
					title: "Email",
					onclick: column.getToggleSortingHandler()
				}),
			cell: ({ row }: CellContext<Payment, unknown>) => {
				const emailSnippet = createRawSnippet<[{ email: string }]>((getEmail) => {
					const { email } = getEmail();
					return {
						render: () => `<div class="lowercase">${email}</div>`
					};
				});
				return renderSnippet(emailSnippet, {
					email: row.original.email
				});
			}
		},
		{
			accessorKey: "amount",
			header: () => {
				const amountHeaderSnippet = createRawSnippet(() => {
					return {
						render: () => `<div class="text-end">Amount</div>`
					};
				});
				return renderSnippet(amountHeaderSnippet);
			},
			cell: ({ row }: CellContext<Payment, unknown>) => {
				const formatter = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				});
				const amountCellSnippet = createRawSnippet<[{ amount: number }]>((getAmount) => {
					const { amount } = getAmount();
					const formatted = formatter.format(amount);
					return {
						render: () => `<div class="text-end font-medium">${formatted}</div>`
					};
				});
				return renderSnippet(amountCellSnippet, {
					amount: row.original.amount
				});
			}
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }: CellContext<Payment, unknown>) =>
				renderComponent(DataTableActions, {
					id: row.original.id,
					copyLabel: "Copy payment ID",
					actions: [
						{
							label: "View details",
							onclick: () => console.log("View details for", row.original.id)
						},
						{
							label: "Edit payment",
							onclick: () => console.log("Edit payment", row.original.id)
						},
						{
							label: "Delete",
							onclick: () => console.log("Delete payment", row.original.id)
						}
					]
				})
		}
	];

	// Columns with mobile-specific metadata for responsive demos
	const createColumnsWithMobileMeta = (): ColumnDef<Payment>[] => [
		{
			id: "select",
			header: ({ table }: HeaderContext<Payment, unknown>) =>
				renderComponent(DataTableCheckbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate:
						table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					"aria-label": "Select all"
				}),
			cell: ({ row }: CellContext<Payment, unknown>) =>
				renderComponent(DataTableCheckbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					"aria-label": "Select row"
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: "status",
			header: "Status",
			meta: {
				mobileLabel: "Payment Status",
				priority: 1,
				alwaysVisible: true
			} as DataTableColumnMeta,
			cell: ({ row }: CellContext<Payment, unknown>) => {
				const statusSnippet = createRawSnippet<[{ status: string }]>((getStatus) => {
					const { status } = getStatus();
					return {
						render: () => `<div class="capitalize">${status}</div>`
					};
				});
				return renderSnippet(statusSnippet, {
					status: row.original.status
				});
			}
		},
		{
			accessorKey: "email",
			header: ({ column }: HeaderContext<Payment, unknown>) =>
				renderComponent(DataTableColumnHeader, {
					title: "Email",
					onclick: column.getToggleSortingHandler()
				}),
			meta: {
				mobileLabel: "Email Address",
				priority: 2
			} as DataTableColumnMeta,
			cell: ({ row }: CellContext<Payment, unknown>) => {
				const emailSnippet = createRawSnippet<[{ email: string }]>((getEmail) => {
					const { email } = getEmail();
					return {
						render: () => `<div class="lowercase">${email}</div>`
					};
				});
				return renderSnippet(emailSnippet, {
					email: row.original.email
				});
			}
		},
		{
			accessorKey: "amount",
			header: () => {
				const amountHeaderSnippet = createRawSnippet(() => {
					return {
						render: () => `<div class="text-end">Amount</div>`
					};
				});
				return renderSnippet(amountHeaderSnippet);
			},
			meta: {
				mobileLabel: "Amount (USD)",
				priority: 3
			} as DataTableColumnMeta,
			cell: ({ row }: CellContext<Payment, unknown>) => {
				const formatter = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				});
				const amountCellSnippet = createRawSnippet<[{ amount: number }]>((getAmount) => {
					const { amount } = getAmount();
					const formatted = formatter.format(amount);
					return {
						render: () => `<div class="text-end font-medium">${formatted}</div>`
					};
				});
				return renderSnippet(amountCellSnippet, {
					amount: row.original.amount
				});
			}
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }: CellContext<Payment, unknown>) =>
				renderComponent(DataTableActions, {
					id: row.original.id,
					copyLabel: "Copy payment ID",
					actions: [
						{
							label: "View details",
							onclick: () => console.log("View details for", row.original.id)
						},
						{
							label: "Edit payment",
							onclick: () => console.log("Edit payment", row.original.id)
						},
						{
							label: "Delete",
							onclick: () => console.log("Delete payment", row.original.id)
						}
					]
				})
		}
	];

	const { Story } = defineMeta({
		title: 'Components/DataTable',
		component: DataTable,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'striped', 'bordered', 'compact'],
				description: 'Visual style variant',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'default' },
				},
			},
			selectionMode: {
				control: { type: 'select' },
				options: ['multi', 'single', 'none'],
				description: 'Row selection mode',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'multi' },
				},
			},
			pageSize: {
				control: { type: 'number' },
				description: 'Number of rows per page',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: '10' },
				},
			},
			showFilter: {
				control: { type: 'boolean' },
				description: 'Show filter input',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			showColumnToggle: {
				control: { type: 'boolean' },
				description: 'Show column visibility toggle',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			showPagination: {
				control: { type: 'boolean' },
				description: 'Show pagination controls',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			showPageSizeSelector: {
				control: { type: 'boolean' },
				description: 'Show page size selector',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			showRowSelection: {
				control: { type: 'boolean' },
				description: 'Show row selection count',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			expandable: {
				control: { type: 'boolean' },
				description: 'Enable row expansion',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			responsiveMode: {
				control: { type: 'select' },
				options: ['auto', 'card', 'scroll'],
				description: 'Mobile display mode: auto (card on mobile), card (always cards), scroll (horizontal scroll)',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'auto' },
				},
			},
			filterColumn: {
				control: { type: 'text' },
				description: 'The column to filter by',
				table: {
					type: { summary: 'string' },
				},
			},
			filterPlaceholder: {
				control: { type: 'text' },
				description: 'Placeholder text for the filter input',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'Filter...' },
				},
			},
			// Hide unwanted props from controls
			data: {
				control: false,
				table: { disable: true },
			},
			columns: {
				control: false,
				table: { disable: true },
			},
		},
		parameters: {
			docs: {
				extractArgTypes: false,
			},
		},
	});
</script>

<!-- Default Variant -->
<Story 
	name="Default"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		filterColumn: "email",
		filterPlaceholder: "Filter emails...",
		pageSize: 5,
		variant: "default",
		selectionMode: "multi"
	}}
/>

<!-- Striped Variant -->
<Story 
	name="Striped"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		variant: "striped",
		pageSize: 5
	}}
/>

<!-- Bordered Variant -->
<Story 
	name="Bordered"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		variant: "bordered",
		pageSize: 5
	}}
/>

<!-- Compact Variant -->
<Story 
	name="Compact"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		variant: "compact",
		pageSize: 8
	}}
/>

<!-- Single Selection -->
<Story 
	name="Single Select"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		selectionMode: "single",
		pageSize: 5
	}}
/>

<!-- No Selection -->
<Story 
	name="No Selection"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		selectionMode: "none",
		pageSize: 5
	}}
/>

<!-- Custom Page Size -->
<Story 
	name="Custom Page Size"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		pageSize: 3,
		pageSizeOptions: [3, 5, 10, 20],
		filterColumn: "email",
		filterPlaceholder: "Filter emails..."
	}}
/>

<!-- Minimal Configuration -->
<Story 
	name="Minimal"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		showFilter: false,
		showColumnToggle: false,
		showRowSelection: false,
		pageSize: 5
	}}
/>

<!-- No Pagination -->
<Story 
	name="No Pagination"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		showPagination: false,
		pageSize: 100
	}}
/>

<!-- Status Filter -->
<Story 
	name="Status Filter"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		filterColumn: "status",
		filterPlaceholder: "Filter by status...",
		pageSize: 5
	}}
/>



<Story name="Expandable Rows">
    {#snippet template()}
    <DataTable
        data={sampleData}
        columns={createColumns() as any}
        expandable={true}
        pageSize={5}
    >
{#snippet renderSubComponent({ row }: { row: any })}
		{@const payment = row.original}
		<div class="space-y-2 text-sm">
			<div class="grid grid-cols-2 gap-4">
				<div>
					<span class="font-semibold">Payment ID:</span> {payment.id}
				</div>
				<div>
					<span class="font-semibold">Status:</span> <span class="capitalize">{payment.status}</span>
				</div>
				<div>
					<span class="font-semibold">Amount:</span> ${payment.amount.toFixed(2)}
				</div>
				<div>
					<span class="font-semibold">Email:</span> {payment.email}
				</div>
			</div>
			<div class="mt-4 p-3 bg-background rounded border">
				<p class="text-xs text-muted-foreground">Additional payment details and transaction history would appear here.</p>
			</div>
		</div>
	{/snippet}

    </DataTable>

    {/snippet}

</Story>

<!-- Responsive: Card Mode (Force card layout) -->
<Story
	name="Responsive Card Mode"
	args={{
		data: sampleData,
		columns: createColumnsWithMobileMeta() as any,
		responsiveMode: "card",
		pageSize: 5,
		filterColumn: "email",
		filterPlaceholder: "Filter emails..."
	}}
/>

<!-- Responsive: Scroll Mode (Horizontal scroll on mobile) -->
<Story
	name="Responsive Scroll Mode"
	args={{
		data: sampleData,
		columns: createColumns() as any,
		responsiveMode: "scroll",
		pageSize: 5
	}}
/>

<!-- Responsive: Auto Mode (Default - cards on mobile, table on desktop) -->
<Story
	name="Responsive Auto Mode"
	args={{
		data: sampleData,
		columns: createColumnsWithMobileMeta() as any,
		responsiveMode: "auto",
		pageSize: 5,
		filterColumn: "email",
		filterPlaceholder: "Filter emails..."
	}}
/>

<!-- Responsive Card Mode with Expandable Rows -->
<Story name="Responsive Expandable Cards">
    {#snippet template()}
    <DataTable
        data={sampleData}
        columns={createColumnsWithMobileMeta() as any}
        expandable={true}
        responsiveMode="card"
        pageSize={5}
    >
{#snippet renderSubComponent({ row }: { row: any })}
		{@const payment = row.original}
		<div class="space-y-2 text-sm">
			<div class="grid grid-cols-2 gap-4">
				<div>
					<span class="font-semibold">Payment ID:</span> {payment.id}
				</div>
				<div>
					<span class="font-semibold">Status:</span> <span class="capitalize">{payment.status}</span>
				</div>
				<div>
					<span class="font-semibold">Amount:</span> ${payment.amount.toFixed(2)}
				</div>
				<div>
					<span class="font-semibold">Email:</span> {payment.email}
				</div>
			</div>
			<div class="mt-4 p-3 bg-background rounded border">
				<p class="text-xs text-muted-foreground">Additional payment details and transaction history would appear here.</p>
			</div>
		</div>
	{/snippet}

    </DataTable>

    {/snippet}

</Story>