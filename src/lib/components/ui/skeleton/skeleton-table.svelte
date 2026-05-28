<script lang="ts" module>
	export interface SkeletonTableProps {
		/** Number of rows */
		rows?: number;
		/** Number of columns */
		columns?: number;
		/** Whether to show header row */
		withHeader?: boolean;
		/** Animation type */
		animation?: "pulse" | "shimmer" | "wave" | "none";
		/** Base class for customization */
		class?: string;
	}
</script>

<script lang="ts">
	import Skeleton from "./skeleton.svelte";
	import { cn } from "$lib/utils.js";

	let {
		rows = 5,
		columns = 4,
		withHeader = true,
		animation = "pulse",
		class: className,
		...restProps
	}: SkeletonTableProps & Record<string, unknown> = $props();

	const columnWidths = $derived(
		Array(columns).fill(0).map(() => `${60 + Math.random() * 30}%`)
	);
</script>

<div 
	class={cn("w-full overflow-hidden rounded-lg border", className)}
	data-slot="skeleton-table"
	{...restProps}
>
	<table class="w-full">
		{#if withHeader}
			<thead class="bg-muted/50">
				<tr>
					{#each Array(columns) as _, colIndex}
						<th class="px-4 py-3 text-left">
							<Skeleton 
								{animation} 
								size="sm" 
								width="70%" 
								delay={colIndex * 50}
							/>
						</th>
					{/each}
				</tr>
			</thead>
		{/if}
		<tbody class="divide-y">
			{#each Array(rows) as _, rowIndex}
				<tr>
					{#each Array(columns) as _, colIndex}
						<td class="px-4 py-3">
							<Skeleton 
								{animation} 
								size="sm" 
								width={columnWidths[colIndex]} 
								delay={(rowIndex * columns + colIndex) * 30}
							/>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
