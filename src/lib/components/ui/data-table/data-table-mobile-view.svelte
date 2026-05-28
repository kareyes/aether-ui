<script lang="ts" generics="TData">
	import type { Table, Row } from "@tanstack/table-core";
	import DataTableMobileCard from "./data-table-mobile-card.svelte";
	import type { TableVariant } from "./types.js";

	type Props = {
		table: Table<TData>;
		expandable?: boolean;
		showRowSelection?: boolean;
		selectionMode?: "multi" | "single" | "none";
		renderSubComponent?: import("svelte").Snippet<[{ row: Row<TData> }]>;
		variant?: TableVariant;
	};

	let {
		table,
		expandable = false,
		showRowSelection = true,
		selectionMode = "multi",
		renderSubComponent,
		variant = "default",
	}: Props = $props();

	const rows = $derived(table.getRowModel().rows);
</script>

<div class="space-y-3">
	{#if rows.length > 0}
		{#each rows as row, index (row.id)}
			<DataTableMobileCard
				{row}
				{expandable}
				{showRowSelection}
				{selectionMode}
				{renderSubComponent}
				{variant}
				{index}
			/>
		{/each}
	{:else}
		<div
			class="bg-card text-card-foreground rounded-lg border border-border p-8 text-center"
		>
			<p class="text-muted-foreground">No results.</p>
		</div>
	{/if}
</div>
