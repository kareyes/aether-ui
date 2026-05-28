<script lang="ts" module>
	export interface SkeletonAvatarProps {
		/** Size of the avatar */
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		/** Animation type */
		animation?: "pulse" | "shimmer" | "wave" | "none";
		/** Whether to show accompanying text lines */
		withText?: boolean;
		/** Number of text lines (when withText is true) */
		textLines?: number;
		/** Base class for customization */
		class?: string;
	}
</script>

<script lang="ts">
	import Skeleton from "./skeleton.svelte";
	import SkeletonText from "./skeleton-text.svelte";
	import { cn } from "$lib/utils.js";

	let {
		size = "md",
		animation = "pulse",
		withText = false,
		textLines = 2,
		class: className,
		...restProps
	}: SkeletonAvatarProps & Record<string, unknown> = $props();

	const sizeMap = {
		xs: "h-6 w-6",
		sm: "h-8 w-8",
		md: "h-10 w-10",
		lg: "h-12 w-12",
		xl: "h-16 w-16",
	};
</script>

<div 
	class={cn("flex items-center gap-3", className)}
	data-slot="skeleton-avatar"
	{...restProps}
>
	<Skeleton 
		{animation} 
		shape="circle" 
		class={sizeMap[size]}
		size="full"
	/>
	{#if withText}
		<div class="flex-1 space-y-2">
			<SkeletonText lines={textLines} {animation} />
		</div>
	{/if}
</div>
