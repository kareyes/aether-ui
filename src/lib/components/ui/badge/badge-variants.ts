import { type VariantProps, tv } from "tailwind-variants";
import type {
	HTMLAnchorAttributes,
	HTMLButtonAttributes,
} from "svelte/elements";
import { type WithElementRef } from "$lib/utils.js";
import type { Snippet } from "svelte";

export const badgeVariants = tv({
	base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-all focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
	variants: {
		variant: {
			default: "border-transparent",
			secondary: "border-transparent",
			flat: "border-transparent",
			outline: "bg-background",
			dashed: "bg-background border-dashed",
		},
		shape: {
			rounded: "rounded-md",
			circle: "rounded-full",
			square: "rounded-none",
		},
		color: {
			default: "",
			// The theme's primary token, as opposed to a fixed palette hue — it
			// follows the active theme where `blue` etc. do not.
			primary: "",
			red: "",
			orange: "",
			yellow: "",
			green: "",
			blue: "",
			purple: "",
			pink: "",
			gray: "",
		},
		size: {
			sm: "px-1.5 py-0.5 text-xs",
			default: "px-2 py-0.5 text-xs",
			lg: "px-2.5 py-1 text-sm",
		},
		clickable: {
			true: "cursor-pointer hover:scale-105",
			false: "",
		},
	},
	compoundVariants: [
		// Default variant with colors
		{
			variant: "default",
			color: "default",
			class: "bg-primary text-primary-foreground",
		},
		{
			variant: "default",
			color: "primary",
			class: "bg-primary text-primary-foreground",
		},
		{
			variant: "default",
			color: "red",
			class: "bg-red-500 text-white dark:bg-red-600",
		},
		{
			variant: "default",
			color: "orange",
			class: "bg-orange-500 text-white dark:bg-orange-600",
		},
		{
			variant: "default",
			color: "yellow",
			class: "bg-yellow-500 text-white dark:bg-yellow-600",
		},
		{
			variant: "default",
			color: "green",
			class: "bg-green-500 text-white dark:bg-green-600",
		},
		{
			variant: "default",
			color: "blue",
			class: "bg-blue-500 text-white dark:bg-blue-600",
		},
		{
			variant: "default",
			color: "purple",
			class: "bg-purple-500 text-white dark:bg-purple-600",
		},
		{
			variant: "default",
			color: "pink",
			class: "bg-pink-500 text-white dark:bg-pink-600",
		},
		{
			variant: "default",
			color: "gray",
			class: "bg-gray-500 text-white dark:bg-gray-600",
		},

		// Secondary variant with colors
		{
			variant: "secondary",
			color: "default",
			class: "bg-secondary text-secondary-foreground",
		},
		{
			variant: "secondary",
			color: "primary",
			class:
				"bg-primary/20 text-primary dark:text-primary-light dark:bg-primary/25",
		},
		{
			variant: "secondary",
			color: "red",
			class: "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
		},
		{
			variant: "secondary",
			color: "orange",
			class:
				"bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200",
		},
		{
			variant: "secondary",
			color: "yellow",
			class:
				"bg-yellow-100 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-200",
		},
		{
			variant: "secondary",
			color: "green",
			class:
				"bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200",
		},
		{
			variant: "secondary",
			color: "blue",
			class: "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200",
		},
		{
			variant: "secondary",
			color: "purple",
			class:
				"bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200",
		},
		{
			variant: "secondary",
			color: "pink",
			class: "bg-pink-100 text-pink-900 dark:bg-pink-950 dark:text-pink-200",
		},
		{
			variant: "secondary",
			color: "gray",
			class: "bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-200",
		},

		// Flat variant with colors
		{
			variant: "flat",
			color: "default",
			class: "bg-muted text-muted-foreground",
		},
		{
			variant: "flat",
			color: "primary",
			class:
				"bg-primary/10 text-primary dark:text-primary-light dark:bg-primary/20",
		},
		{
			variant: "flat",
			color: "red",
			class: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
		},
		{
			variant: "flat",
			color: "orange",
			class:
				"bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
		},
		{
			variant: "flat",
			color: "yellow",
			class:
				"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
		},
		{
			variant: "flat",
			color: "green",
			class:
				"bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
		},
		{
			variant: "flat",
			color: "blue",
			class: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
		},
		{
			variant: "flat",
			color: "purple",
			class:
				"bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
		},
		{
			variant: "flat",
			color: "pink",
			class: "bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400",
		},
		{
			variant: "flat",
			color: "gray",
			class: "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400",
		},

		// Outline variant with colors
		{
			variant: "outline",
			color: "default",
			class: "text-foreground border-border",
		},
		{
			variant: "outline",
			color: "primary",
			class: "text-primary border-primary/40 dark:border-primary/60",
		},
		{
			variant: "outline",
			color: "red",
			class:
				"text-red-600 border-red-300 dark:text-red-400 dark:border-red-700",
		},
		{
			variant: "outline",
			color: "orange",
			class:
				"text-orange-600 border-orange-300 dark:text-orange-400 dark:border-orange-700",
		},
		{
			variant: "outline",
			color: "yellow",
			class:
				"text-yellow-600 border-yellow-300 dark:text-yellow-400 dark:border-yellow-700",
		},
		{
			variant: "outline",
			color: "green",
			class:
				"text-green-600 border-green-300 dark:text-green-400 dark:border-green-700",
		},
		{
			variant: "outline",
			color: "blue",
			class:
				"text-blue-600 border-blue-300 dark:text-blue-400 dark:border-blue-700",
		},
		{
			variant: "outline",
			color: "purple",
			class:
				"text-purple-600 border-purple-300 dark:text-purple-400 dark:border-purple-700",
		},
		{
			variant: "outline",
			color: "pink",
			class:
				"text-pink-600 border-pink-300 dark:text-pink-400 dark:border-pink-700",
		},
		{
			variant: "outline",
			color: "gray",
			class:
				"text-gray-600 border-gray-300 dark:text-gray-400 dark:border-gray-700",
		},

		// Dashed variant with colors
		{
			variant: "dashed",
			color: "default",
			class: "text-foreground border-gray-300 dark:border-gray-600",
		},
		{
			variant: "dashed",
			color: "primary",
			class: "text-primary border-primary/40 dark:border-primary/60",
		},
		{
			variant: "dashed",
			color: "red",
			class:
				"text-red-600 border-red-300 dark:text-red-400 dark:border-red-700",
		},
		{
			variant: "dashed",
			color: "orange",
			class:
				"text-orange-600 border-orange-300 dark:text-orange-400 dark:border-orange-700",
		},
		{
			variant: "dashed",
			color: "yellow",
			class:
				"text-yellow-600 border-yellow-300 dark:text-yellow-400 dark:border-yellow-700",
		},
		{
			variant: "dashed",
			color: "green",
			class:
				"text-green-600 border-green-300 dark:text-green-400 dark:border-green-700",
		},
		{
			variant: "dashed",
			color: "blue",
			class:
				"text-blue-600 border-blue-300 dark:text-blue-400 dark:border-blue-700",
		},
		{
			variant: "dashed",
			color: "purple",
			class:
				"text-purple-600 border-purple-300 dark:text-purple-400 dark:border-purple-700",
		},
		{
			variant: "dashed",
			color: "pink",
			class:
				"text-pink-600 border-pink-300 dark:text-pink-400 dark:border-pink-700",
		},
		{
			variant: "dashed",
			color: "gray",
			class:
				"text-gray-600 border-gray-300 dark:text-gray-400 dark:border-gray-700",
		},

		// Clickable states for default variant
		{
			variant: "default",
			clickable: true,
			color: "default",
			class: "hover:bg-primary/90",
		},
		{
			variant: "default",
			clickable: true,
			color: "primary",
			class: "hover:bg-primary/90",
		},
		{
			variant: "default",
			clickable: true,
			color: "red",
			class: "hover:bg-red-600 dark:hover:bg-red-700",
		},
		{
			variant: "default",
			clickable: true,
			color: "orange",
			class: "hover:bg-orange-600 dark:hover:bg-orange-700",
		},
		{
			variant: "default",
			clickable: true,
			color: "yellow",
			class: "hover:bg-yellow-600 dark:hover:bg-yellow-700",
		},
		{
			variant: "default",
			clickable: true,
			color: "green",
			class: "hover:bg-green-600 dark:hover:bg-green-700",
		},
		{
			variant: "default",
			clickable: true,
			color: "blue",
			class: "hover:bg-blue-600 dark:hover:bg-blue-700",
		},
		{
			variant: "default",
			clickable: true,
			color: "purple",
			class: "hover:bg-purple-600 dark:hover:bg-purple-700",
		},
		{
			variant: "default",
			clickable: true,
			color: "pink",
			class: "hover:bg-pink-600 dark:hover:bg-pink-700",
		},
		{
			variant: "default",
			clickable: true,
			color: "gray",
			class: "hover:bg-gray-600 dark:hover:bg-gray-700",
		},

		// Clickable states for secondary variant
		{
			variant: "secondary",
			clickable: true,
			class: "hover:bg-opacity-80",
		},

		// Clickable states for flat variant
		{
			variant: "flat",
			clickable: true,
			class: "hover:bg-opacity-80",
		},

		// Clickable states for outline variant
		{
			variant: "outline",
			clickable: true,
			class: "hover:bg-accent hover:text-accent-foreground",
		},

		// Clickable states for dashed variant
		{
			variant: "dashed",
			clickable: true,
			class: "hover:bg-accent hover:text-accent-foreground",
		},
	],
	defaultVariants: {
		variant: "default",
		color: "default",
		size: "default",
		shape: "rounded",
		clickable: false,
	},
});

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
export type BadgeColor = VariantProps<typeof badgeVariants>["color"];
export type BadgeSize = VariantProps<typeof badgeVariants>["size"];
export type BadgeShape = VariantProps<typeof badgeVariants>["shape"];

export type BadgeProps = WithElementRef<HTMLAnchorAttributes> &
	WithElementRef<HTMLButtonAttributes> & {
		variant?: BadgeVariant;
		color?: BadgeColor;
		size?: BadgeSize;
		shape?: BadgeShape;
		text?: string;
		icon?: Snippet;
		loading?: boolean;
		dismissable?: boolean;
		clickable?: boolean;
		href?: string;
		onclick?: () => void;
		onDismiss?: () => void;
	};
