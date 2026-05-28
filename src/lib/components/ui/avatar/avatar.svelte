<script lang="ts">
	import * as Avatar from "./index";
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import { tv, type VariantProps } from "tailwind-variants";

	const avatarVariants = tv({
		slots: {
			root: "relative flex shrink-0 overflow-hidden",
			image: "aspect-square size-full object-cover",
			fallback: "flex size-full items-center justify-center font-medium uppercase",
		},
		variants: {
			size: {
				xs: {
					root: "size-6 text-[10px]",
				},
				sm: {
					root: "size-8 text-xs",
				},
				default: {
					root: "size-10 text-sm",
				},
				lg: {
					root: "size-12 text-base",
				},
				xl: {
					root: "size-14 text-lg",
				},
				"2xl": {
					root: "size-16 text-xl",
				},
			},
			shape: {
				circle: {
					root: "rounded-full",
				},
				square: {
					root: "rounded-md",
				},
				rounded: {
					root: "rounded-lg",
				},
			},
		variant: {
			default: {
				root: "",
			},
			bordered: {
				root: "ring-2 ring-offset-background ring-offset-2",
			},
			solid: {
				root: "",
			},
		},
		color: {
			default: {
				fallback: "bg-muted text-muted-foreground",
			},
			primary: {
				fallback: "bg-primary text-primary-foreground",
			},
			secondary: {
				fallback: "bg-secondary text-secondary-foreground",
			},
			green: {
				fallback: "bg-success text-white",
			},
			yellow: {
				fallback: "bg-warning text-white",
			},
			red: {
				fallback: "bg-danger text-white",
			},
			blue: {
				fallback: "bg-blue-500 text-white",
			},
			purple: {
				fallback: "bg-purple-500 text-white",
			},
			pink: {
				fallback: "bg-pink-500 text-white",
			},
			gradient: {
				fallback: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
			},
		},
	},
	compoundVariants: [
		// Bordered + Default color
		{
			variant: "bordered",
			color: "default",
			class: {
				root: "ring-foreground",
			},
		},
		// Bordered + Primary color
		{
			variant: "bordered",
			color: "primary",
			class: {
				root: "ring-primary",
			},
		},
		// Bordered + Secondary color
		{
			variant: "bordered",
			color: "secondary",
			class: {
				root: "ring-secondary/20",
			},
		},
		// Bordered + Success color
		{
			variant: "bordered",
			color: "green",
			class: {
				root: "ring-success/50",
			},
		},
		// Bordered + Warning color
		{
			variant: "bordered",
			color: "yellow",
			class: {
				root: "ring-warning/50",
			},
		},
		// Bordered + Danger color
		{
			variant: "bordered",
			color: "red",
			class: {
				root: "ring-danger/50",
			},
		},
		// Bordered + Info color
		{
			variant: "bordered",
			color: "blue",
			class: {
				root: "ring-blue-500/50",
			},
		},
		// Bordered + Purple color
		{
			variant: "bordered",
			color: "purple",
			class: {
				root: "ring-purple-500/50",
			},
		},
		// Bordered + Pink color
		{
			variant: "bordered",
			color: "pink",
			class: {
				root: "ring-pink-500/50",
			},
		},
		// Bordered + Gradient color
		{
			variant: "bordered",
			color: "gradient",
			class: {
				root: "ring-purple-500/10",
			},
		},
		// Bordered + Square shape
		{
			variant: "bordered",
			shape: "square",
			class: {
				root: "rounded-md",
				image: "rounded-md",
				fallback: "rounded-md",
			},
		},
		// Bordered + Rounded shape
		{
			variant: "bordered",
			shape: "rounded",
			class: {
				root: "rounded-lg",
				image: "rounded-lg",
				fallback: "rounded-lg",
			},
		},
	],
	defaultVariants: {
		size: "default",
		shape: "circle",
		variant: "default",
		color: "default",
	},
});	type AvatarVariants = VariantProps<typeof avatarVariants>;

	interface Props {
		src?: string;
		alt?: string;
		fallback?: string;
		size?: AvatarVariants["size"];
		shape?: AvatarVariants["shape"];
		variant?: AvatarVariants["variant"];
		color?: AvatarVariants["color"];
		class?: string;
		imageClass?: string;
		fallbackClass?: string;
		customFallback?: Snippet;
		delayMs?: number;
		status?: "online" | "offline" | "away" | "busy";
		showNotification?: boolean;
		notificationCount?: number;
	}

	let {
		src,
		alt = "",
		fallback,
		size = "default",
		shape = "circle",
		variant = "default",
		color = "default",
		class: className,
		imageClass,
		fallbackClass,
		customFallback,
		delayMs = 0,
		status,
		showNotification = false,
		notificationCount,
	}: Props = $props();

	const styles = $derived(avatarVariants({ size, shape, variant, color }));

	// Generate initials from fallback text
	const initials = $derived(
		fallback
			? fallback
					.split(" ")
					.map((word) => word[0])
					.join("")
					.toUpperCase()
					.slice(0, 2)
			: ""
	);

	// Status indicator colors
	const statusColors = {
		online: "bg-green-500",
		offline: "bg-gray-400",
		away: "bg-yellow-500",
		busy: "bg-red-500",
	};

	// Size-based indicator dimensions
	const indicatorSizes = {
		xs: "size-1.5",
		sm: "size-2",
		default: "size-2.5",
		lg: "size-3",
		xl: "size-3.5",
		"2xl": "size-4",
	};

	// Size-based notification badge dimensions
	const notificationSizes = {
		xs: "text-[8px] min-w-3 h-3",
		sm: "text-[9px] min-w-3.5 h-3.5",
		default: "text-[10px] min-w-4 h-4",
		lg: "text-xs min-w-5 h-5",
		xl: "text-xs min-w-5 h-5",
		"2xl": "text-sm min-w-6 h-6",
	};
</script>

<div class="relative inline-block">
	<Avatar.Root class={cn(styles.root(), className)}>
		{#if src}
			<Avatar.Image {src} {alt} class={cn(styles.image(), imageClass)} />
		{/if}
		<Avatar.Fallback class={cn(styles.fallback(), fallbackClass)}>
			{#if customFallback}
				{@render customFallback()}
			{:else if initials}
				{initials}
			{:else}
				<svg
					class="size-1/2 text-muted-foreground/40"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
					/>
				</svg>
			{/if}
		</Avatar.Fallback>
	</Avatar.Root>

	<!-- Status Indicator -->
	{#if status}
		<span
			class={cn(
				"absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
				indicatorSizes[size],
				statusColors[status]
			)}
		></span>
	{/if}

	<!-- Notification Badge -->
	{#if showNotification}
		<span
			class={cn(
				"absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-500 text-white font-semibold ring-2 ring-background",
				notificationSizes[size],
				notificationCount && notificationCount > 99 ? "px-1" : "px-0.5"
			)}
		>
			{#if notificationCount}
				{notificationCount > 99 ? "99+" : notificationCount}
			{/if}
		</span>
	{/if}
</div>
