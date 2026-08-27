import type { WithElementRef } from "$lib/utils.js";
import type {
	HTMLAnchorAttributes,
	HTMLButtonAttributes,
} from "svelte/elements";
import { type VariantProps, tv } from "tailwind-variants";
import type { Component } from "svelte";
import type { IconProps } from "@lucide/svelte";

export const buttonVariants = tv({
	base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	variants: {
		variant: {
			default:
				"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
			destructive:
				"bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
			outline:
				"bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
			secondary:
				"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
			ghost:
				"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			link: "text-primary underline-offset-4 hover:underline",
			bordered:
				"bg-transparent border-2 text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 transition-colors",
			flat: "bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 dark:bg-primary/20 dark:hover:bg-primary/30",
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			icon: "size-9",
			"icon-sm": "size-8",
			"icon-lg": "size-10",
		},
		color: {
			default: "",
			primary: "",
			secondary: "",
			// Hue names — the vocabulary shared with Badge, Avatar and
			// Timeline. Each resolves to a role token, so `color="red"`
			// and `variant="destructive"` agree about what red is.
			red: "",
			green: "",
			yellow: "",
			blue: "",
			// DEPRECATED — semantic aliases kept for one release. They
			// render identically to their hue counterpart above.
			// Remove after 0.0.21.
			success: "",
			warning: "",
			danger: "",
			info: "",
		},
	},
	compoundVariants: [
		// Solid — the role token itself, with its paired foreground.
		{
			variant: "default",
			color: ["red", "danger"],
			class:
				"bg-destructive text-destructive-foreground hover:bg-destructive/90",
		},
		{
			variant: "default",
			color: ["green", "success"],
			class: "bg-success text-success-foreground hover:bg-success/90",
		},
		{
			variant: "default",
			color: ["yellow", "warning"],
			class: "bg-warning text-warning-foreground hover:bg-warning/90",
		},
		{
			variant: "default",
			color: ["blue", "info"],
			class: "bg-info text-info-foreground hover:bg-info/90",
		},
		// Outline — tinted hover replaces the old light/dark palette pair.
		{
			variant: "outline",
			color: ["red", "danger"],
			class: "border-destructive text-destructive hover:bg-destructive/10",
		},
		{
			variant: "outline",
			color: ["green", "success"],
			class: "border-success text-success hover:bg-success/10",
		},
		{
			variant: "outline",
			color: ["yellow", "warning"],
			class: "border-warning text-warning hover:bg-warning/10",
		},
		{
			variant: "outline",
			color: ["blue", "info"],
			class: "border-info text-info hover:bg-info/10",
		},
		// Bordered — fills with the role token on hover.
		{
			variant: "bordered",
			color: ["red", "danger"],
			class:
				"border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground",
		},
		{
			variant: "bordered",
			color: ["green", "success"],
			class:
				"border-success text-success hover:bg-success hover:text-success-foreground",
		},
		{
			variant: "bordered",
			color: ["yellow", "warning"],
			class:
				"border-warning text-warning hover:bg-warning hover:text-warning-foreground",
		},
		{
			variant: "bordered",
			color: ["blue", "info"],
			class: "border-info text-info hover:bg-info hover:text-info-foreground",
		},
		// Flat — a tint of the role token.
		{
			variant: "flat",
			color: ["red", "danger"],
			class:
				"bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
		},
		{
			variant: "flat",
			color: ["green", "success"],
			class:
				"bg-success/10 text-success hover:bg-success/20 dark:bg-success/20 dark:hover:bg-success/30",
		},
		{
			variant: "flat",
			color: ["yellow", "warning"],
			class:
				"bg-warning/10 text-warning hover:bg-warning/20 dark:bg-warning/20 dark:hover:bg-warning/30",
		},
		{
			variant: "flat",
			color: ["blue", "info"],
			class:
				"bg-info/10 text-info hover:bg-info/20 dark:bg-info/20 dark:hover:bg-info/30",
		},
		// Ghost — no ground until hover.
		{
			variant: "ghost",
			color: ["red", "danger"],
			class: "text-destructive hover:bg-destructive/10",
		},
		{
			variant: "ghost",
			color: ["green", "success"],
			class: "text-success hover:bg-success/10",
		},
		{
			variant: "ghost",
			color: ["yellow", "warning"],
			class: "text-warning hover:bg-warning/10",
		},
		{
			variant: "ghost",
			color: ["blue", "info"],
			class: "text-info hover:bg-info/10",
		},
	],
	defaultVariants: {
		variant: "default",
		size: "default",
		color: "default",
	},
});

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];
export type ButtonColor = VariantProps<typeof buttonVariants>["color"];

export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
	WithElementRef<HTMLAnchorAttributes> & {
		variant?: ButtonVariant;
		size?: ButtonSize;
		color?: ButtonColor;
		text?: string;
		icon?: Component<IconProps, {}, "">;
		iconPosition?: "left" | "right";
		loading?: boolean;
		loadingText?: string;
	};
