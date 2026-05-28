<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const skeletonVariants = tv({
		base: "bg-muted",
		variants: {
			variant: {
				default: "bg-muted",
				primary: "bg-primary/20",
				secondary: "bg-secondary/30",
				accent: "bg-accent",
			},
			animation: {
				pulse: "animate-pulse",
				shimmer: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
				wave: "relative overflow-hidden before:absolute before:inset-0 before:animate-[wave_1.5s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
				none: "",
			},
			shape: {
				default: "rounded-md",
				circle: "rounded-full",
				square: "rounded-none",
				pill: "rounded-full",
			},
			size: {
				xs: "h-2",
				sm: "h-4",
				md: "h-6",
				lg: "h-8",
				xl: "h-12",
				full: "h-full",
			},
		},
		defaultVariants: {
			variant: "default",
			animation: "pulse",
			shape: "default",
			size: "md",
		},
	});

	export type SkeletonVariant = VariantProps<typeof skeletonVariants>["variant"];
	export type SkeletonAnimation = VariantProps<typeof skeletonVariants>["animation"];
	export type SkeletonShape = VariantProps<typeof skeletonVariants>["shape"];
	export type SkeletonSize = VariantProps<typeof skeletonVariants>["size"];

		

	export interface SkeletonProps {
		ref?: HTMLDivElement | null;
		class?: string;
		/** Visual style variant */
		variant?: SkeletonVariant;
		/** Animation type */
		animation?: SkeletonAnimation;
		/** Shape of the skeleton */
		shape?: SkeletonShape;
		/** Preset height size */
		size?: SkeletonSize;
		/** Custom width (e.g., "100px", "50%", "full") */
		width?: string;
		/** Custom height (overrides size) */
		height?: string;
		/** Number of skeleton items to render (for lists) */
		count?: number;
		/** Gap between multiple skeletons */
		gap?: string;
		/** Delay animation start (stagger effect) in ms */
		delay?: number;
		/** Whether to show the skeleton */
		visible?: boolean;
	}
</script>

<script lang="ts">
	import { cn, keysOf } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		animation = "pulse",
		shape = "default",
		size = "md",
		width,
		height,
		count = 1,
		gap = "0.5rem",
		delay = 0,
		visible = true,
		...restProps
	}: SkeletonProps & Record<string, unknown> = $props();

	// Convert width/height shortcuts
	const getWidth = (w?: string) => {
		if (!w) return undefined;
		if (w === "full") return "100%";
		if (w === "half") return "50%";
		if (w === "third") return "33.333%";
		if (w === "quarter") return "25%";
		return w;
	};

	const computedWidth = $derived(getWidth(width));
	const computedHeight = $derived(height || undefined);
	const animationDelay = $derived(delay > 0 ? `${delay}ms` : undefined);
</script>

{#if visible}
	{#if count > 1}
		<div 
			class="flex flex-col" 
			style:gap={gap}
			data-slot="skeleton-group"
		>
			{#each Array(count) as _, i}
				<div
					bind:this={ref}
					data-slot="skeleton"
					class={cn(
						skeletonVariants({ variant, animation, shape, size }),
						className
					)}
					style:width={computedWidth}
					style:height={computedHeight}
					style:animation-delay={delay > 0 ? `${delay * i}ms` : undefined}
					{...restProps}
				></div>
			{/each}
		</div>
	{:else}
		<div
			bind:this={ref}
			data-slot="skeleton"
			class={cn(
				skeletonVariants({ variant, animation, shape, size }),
				className
			)}
			style:width={computedWidth}
			style:height={computedHeight}
			style:animation-delay={animationDelay}
			{...restProps}
		></div>
	{/if}
{/if}
