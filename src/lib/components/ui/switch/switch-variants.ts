/**
 * Switch component variants and styles
 * Uses tailwind-variants for consistent styling and variant management
 */

import { tv, type VariantProps } from "tailwind-variants";

/**
 * The three tone variants differ only in which role token fills the checked
 * track — the thumb is identical, so it lives here once rather than being
 * repeated per tone. Track classes stay spelled out literally: Tailwind scans
 * source text, so a template-built `bg-${token}` would never be generated.
 */
const toneThumb = [
	"bg-background border border-border/50",
	"data-[state=checked]:bg-white data-[state=unchecked]:bg-white",
	"dark:data-[state=unchecked]:bg-white dark:data-[state=checked]:bg-white",
	"data-[state=checked]:border-transparent",
];

export const switchVariants = tv({
	slots: {
		root: [
			// Base styles
			"peer inline-flex shrink-0 items-center rounded-full outline-none",
			"transition-all duration-200 ease-in-out",
			"cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
			// Focus styles
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			// Shadow
			"shadow-sm",
		],
		thumb: [
			// Base thumb styles
			"pointer-events-none block rounded-full ring-0 shadow-sm",
			"transition-all duration-200 ease-in-out",
			// Transform states
			"data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
		],
	},
	variants: {
		variant: {
			default: {
				root: [
					"data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
					"dark:data-[state=checked]:bg-primary dark:data-[state=unchecked]:bg-input/50",
				],
				thumb: [
					"bg-background border border-border/50",
					"data-[state=checked]:bg-primary-foreground data-[state=unchecked]:bg-white",
					"dark:data-[state=unchecked]:bg-white dark:data-[state=checked]:bg-primary-foreground",
					"data-[state=checked]:border-transparent",
				],
			},
			success: {
				root: [
					"data-[state=checked]:bg-success data-[state=unchecked]:bg-input",
					"dark:data-[state=checked]:bg-success dark:data-[state=unchecked]:bg-input/50",
				],
				thumb: toneThumb,
			},
			warning: {
				root: [
					"data-[state=checked]:bg-warning data-[state=unchecked]:bg-input",
					"dark:data-[state=checked]:bg-warning dark:data-[state=unchecked]:bg-input/50",
				],
				thumb: toneThumb,
			},
			destructive: {
				root: [
					"data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input",
					"dark:data-[state=checked]:bg-destructive dark:data-[state=unchecked]:bg-input/50",
				],
				thumb: toneThumb,
			},
			/** @deprecated Use `destructive`. Removed after 0.0.21. */
			danger: {
				root: [
					"data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input",
					"dark:data-[state=checked]:bg-destructive dark:data-[state=unchecked]:bg-input/50",
				],
				thumb: toneThumb,
			},
			ghost: {
				root: [
					"data-[state=checked]:bg-accent data-[state=unchecked]:bg-transparent",
					"border border-border data-[state=checked]:border-accent",
					"dark:data-[state=unchecked]:border-border/50",
				],
				thumb: [
					"bg-background border border-border/50",
					"data-[state=checked]:bg-accent-foreground data-[state=unchecked]:bg-muted-foreground",
					"dark:data-[state=unchecked]:bg-muted-foreground dark:data-[state=checked]:bg-accent-foreground",
					"data-[state=checked]:border-transparent",
				],
			},
		},
		size: {
			sm: {
				root: "h-4 w-7",
				thumb: "size-3",
			},
			default: {
				root: "h-[1.15rem] w-8",
				thumb: "size-4",
			},
			lg: {
				root: "h-6 w-10",
				thumb: "size-5",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export type SwitchVariant = VariantProps<typeof switchVariants>["variant"];
export type SwitchSize = VariantProps<typeof switchVariants>["size"];
