<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const progressTrackVariants = tv({
		base: "bg-muted relative flex w-full items-center overflow-hidden",
		variants: {
			size: {
				xs: "h-0.5",
				sm: "h-1",
				default: "h-2",
				lg: "h-3",
				xl: "h-4"
			},
			radius: {
				none: "rounded-none",
				sm: "rounded-sm",
				default: "rounded-full",
				lg: "rounded-lg"
			}
		},
		defaultVariants: {
			size: "default",
			radius: "default"
		}
	});

	export const progressIndicatorVariants = tv({
		base: "size-full flex-1 transition-all duration-300 ease-in-out",
		variants: {
			variant: {
				default: "bg-primary",
				success: "bg-green-500",
				warning: "bg-amber-500",
				destructive: "bg-destructive",
				secondary: "bg-secondary-foreground",
				accent: "bg-violet-500"
			},
			animation: {
				none: "",
				pulse: "progress-anim-pulse",
				stripe: "progress-anim-stripe",
				shimmer: "progress-anim-shimmer"
			}
		},
		defaultVariants: {
			variant: "default",
			animation: "none"
		}
	});

	export type ProgressVariant = VariantProps<typeof progressIndicatorVariants>["variant"];
	export type ProgressSize = VariantProps<typeof progressTrackVariants>["size"];
	export type ProgressRadius = VariantProps<typeof progressTrackVariants>["radius"];
	export type ProgressAnimation = VariantProps<typeof progressIndicatorVariants>["animation"];
</script>

<script lang="ts">
	import { Progress as ProgressPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		max = 100,
		value,
		variant = "default",
		size = "default",
		radius = "default",
		animation = "none",
		...restProps
	}: WithoutChildrenOrChild<ProgressPrimitive.RootProps> & {
		variant?: ProgressVariant;
		size?: ProgressSize;
		radius?: ProgressRadius;
		animation?: ProgressAnimation;
	} = $props();

	const isIndeterminate = $derived(value == null);
	const offset = $derived(isIndeterminate ? 0 : 100 - (100 * (value ?? 0)) / (max ?? 1));
</script>

<ProgressPrimitive.Root
	bind:ref
	data-slot="progress"
	class={cn(progressTrackVariants({ size, radius }), className)}
	{value}
	{max}
	{...restProps}
>
	<div
		data-slot="progress-indicator"
		class={cn(
			progressIndicatorVariants({ variant, animation }),
			isIndeterminate && "progress-indeterminate"
		)}
		style={isIndeterminate ? undefined : `transform: translateX(-${offset}%)`}
	></div>
</ProgressPrimitive.Root>

<style>
	/* ── Indeterminate sliding bar ───────────────────────────── */
	@keyframes progress-indeterminate {
		0%   { transform: translateX(-100%); }
		60%  { transform: translateX(300%); }
		100% { transform: translateX(300%); }
	}

	:global([data-slot="progress-indicator"].progress-indeterminate) {
		width: 33%;
		flex: none;
		animation: progress-indeterminate 1.6s ease-in-out infinite;
	}

	/* ── Pulse ───────────────────────────────────────────────── */
	@keyframes progress-pulse {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0.55; }
	}

	:global([data-slot="progress-indicator"].progress-anim-pulse) {
		animation: progress-pulse 1.5s ease-in-out infinite;
	}

	/* ── Stripe ──────────────────────────────────────────────── */
	@keyframes progress-stripe {
		0%   { background-position: 1rem 0; }
		100% { background-position: 0 0; }
	}

	:global([data-slot="progress-indicator"].progress-anim-stripe) {
		background-image: repeating-linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.18) 0px,
			rgba(255, 255, 255, 0.18) 10px,
			transparent 10px,
			transparent 20px
		);
		background-size: 1rem 1rem;
		animation: progress-stripe 0.8s linear infinite;
	}

	/* ── Shimmer ─────────────────────────────────────────────── */
	@keyframes progress-shimmer {
		0%   { transform: translateX(-150%); }
		100% { transform: translateX(250%); }
	}

	:global([data-slot="progress-indicator"].progress-anim-shimmer) {
		position: relative;
		overflow: hidden;
	}

	:global([data-slot="progress-indicator"].progress-anim-shimmer::after) {
		content: "";
		position: absolute;
		inset: 0;
		width: 40%;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.45) 50%,
			transparent 100%
		);
		animation: progress-shimmer 2s ease-in-out infinite;
	}
</style>
