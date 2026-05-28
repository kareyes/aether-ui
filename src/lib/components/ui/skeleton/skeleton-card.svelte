<script lang="ts" module>
	export interface SkeletonCardProps {
		/** Whether to show image placeholder */
		withImage?: boolean;
		/** Image aspect ratio */
		imageRatio?: "video" | "square" | "portrait";
		/** Whether to show avatar in header */
		withAvatar?: boolean;
		/** Number of text lines in body */
		bodyLines?: number;
		/** Whether to show footer */
		withFooter?: boolean;
		/** Animation type */
		animation?: "pulse" | "shimmer" | "wave" | "none";
		/** Base class for customization */
		class?: string;
	}
</script>

<script lang="ts">
	import Skeleton from "./skeleton.svelte";
	import SkeletonText from "./skeleton-text.svelte";
	import SkeletonAvatar from "./skeleton-avatar.svelte";
	import { cn } from "$lib/utils.js";

	let {
		withImage = true,
		imageRatio = "video",
		withAvatar = true,
		bodyLines = 3,
		withFooter = true,
		animation = "pulse",
		class: className,
		...restProps
	}: SkeletonCardProps & Record<string, unknown> = $props();

	const ratioMap = {
		video: "aspect-video",
		square: "aspect-square",
		portrait: "aspect-[3/4]",
	};
</script>

<div 
	class={cn(
		"rounded-lg border bg-card p-4 shadow-sm",
		className
	)}
	data-slot="skeleton-card"
	{...restProps}
>
	<!-- Image -->
	{#if withImage}
		<Skeleton 
			{animation}
			class={cn("w-full mb-4 -mx-4 -mt-4 rounded-t-lg rounded-b-none", ratioMap[imageRatio])}
			size="full"
		/>
	{/if}

	<!-- Header with Avatar -->
	{#if withAvatar}
		<div class="mb-4">
			<SkeletonAvatar {animation} withText textLines={2} />
		</div>
	{/if}

	<!-- Body Text -->
	<div class="mb-4">
		<SkeletonText lines={bodyLines} {animation} />
	</div>

	<!-- Footer -->
	{#if withFooter}
		<div class="flex gap-2 pt-2 border-t">
			<Skeleton {animation} size="lg" width="80px" shape="default" />
			<Skeleton {animation} size="lg" width="80px" shape="default" />
		</div>
	{/if}
</div>
