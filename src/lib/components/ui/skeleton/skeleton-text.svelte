<script lang="ts" module>
	export interface SkeletonTextProps {
		/** Number of lines */
		lines?: number;
		/** Gap between lines */
		gap?: string;
		/** Animation type */
		animation?: "pulse" | "shimmer" | "wave" | "none";
		/** Whether to vary line widths for natural text appearance */
		varied?: boolean;
		/** Base class for customization */
		class?: string;
	}
</script>

<script lang="ts">
	import Skeleton from "./skeleton.svelte";
	import { cn } from "$lib/utils.js";

	let {
		lines = 3,
		gap = "0.5rem",
		animation = "pulse",
		varied = true,
		class: className,
		...restProps
	}: SkeletonTextProps & Record<string, unknown> = $props();

	// Generate varied widths for natural text appearance
	const lineWidths = $derived(
		varied 
			? Array(lines).fill(0).map((_, i) => {
				if (i === lines - 1) return "60%"; // Last line shorter
				if (i === 0) return "90%"; // First line slightly shorter
				return `${75 + Math.random() * 20}%`; // Middle lines varied
			})
			: Array(lines).fill("100%")
	);
</script>

<div 
	class={cn("flex flex-col", className)} 
	style:gap={gap}
	data-slot="skeleton-text"
	{...restProps}
>
	{#each lineWidths as width, i}
		<Skeleton 
			{animation} 
			size="sm" 
			{width} 
			delay={i * 75}
		/>
	{/each}
</div>
