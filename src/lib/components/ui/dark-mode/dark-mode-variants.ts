import { tv, type VariantProps } from "tailwind-variants";

export const darkModeToggleVariants = tv({
	slots: {
		root: [
			"inline-flex items-center justify-center",
			"rounded-md transition-all duration-200",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			"disabled:pointer-events-none disabled:opacity-50",
		],
		icon: ["transition-all duration-300"],
	},
	variants: {
		variant: {
			default: {
				root: [
					"bg-secondary text-secondary-foreground",
					"hover:bg-secondary/80",
					"active:scale-95",
				],
			},
			outline: {
				root: [
					"border border-input bg-background",
					"hover:bg-accent hover:text-accent-foreground",
					"active:scale-95",
				],
			},
			ghost: {
				root: [
					"hover:bg-accent hover:text-accent-foreground",
					"active:scale-95",
				],
			},
			flat: {
				root: [
					"bg-primary/10 text-primary",
					"hover:bg-primary/20",
					"dark:bg-primary/20 dark:hover:bg-primary/30",
					"active:scale-95",
				],
			},
			minimal: {
				root: [
					"text-muted-foreground",
					"hover:text-foreground",
					"active:scale-95",
				],
			},
		},
		size: {
			sm: {
				root: "size-8",
				icon: "size-4",
			},
			default: {
				root: "size-9",
				icon: "size-5",
			},
			lg: {
				root: "size-10",
				icon: "size-6",
			},
			xl: {
				root: "size-12",
				icon: "size-7",
			},
		},
		shape: {
			square: {
				root: "rounded-md",
			},
			rounded: {
				root: "rounded-lg",
			},
			circle: {
				root: "rounded-full",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
		shape: "square",
	},
});

export const darkModeSwitchVariants = tv({
	slots: {
		root: [
			"relative inline-flex items-center",
			"rounded-full transition-colors duration-300",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			"disabled:pointer-events-none disabled:opacity-50",
		],
		thumb: [
			"absolute rounded-full bg-background shadow-sm",
			"transition-all duration-300 ease-in-out",
			"flex items-center justify-center",
		],
		icon: ["transition-all duration-200"],
		iconContainer: ["absolute flex items-center justify-between px-1.5"],
	},
	variants: {
		variant: {
			default: {
				root: ["bg-muted", "dark:bg-primary"],
				thumb: ["bg-background"],
			},
			primary: {
				root: ["bg-primary/30", "dark:bg-primary"],
				thumb: ["bg-background"],
			},
			accent: {
				root: ["bg-accent", "dark:bg-accent-foreground"],
				thumb: ["bg-background"],
			},
			contrast: {
				root: ["bg-foreground/20", "dark:bg-foreground/80"],
				thumb: ["bg-background"],
			},
		},
		size: {
			sm: {
				root: "h-6 w-11",
				thumb: "size-5",
				icon: "size-3",
				iconContainer: "w-11",
			},
			default: {
				root: "h-7 w-14",
				thumb: "size-6",
				icon: "size-3.5",
				iconContainer: "w-14",
			},
			lg: {
				root: "h-8 w-16",
				thumb: "size-7",
				icon: "size-4",
				iconContainer: "w-16",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export const darkModeDropdownVariants = tv({
	slots: {
		trigger: [
			"inline-flex items-center justify-center gap-2",
			"rounded-md transition-all duration-200",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			"disabled:pointer-events-none disabled:opacity-50",
		],
		icon: ["transition-all duration-300"],
		content: [
			"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
			"data-[state=open]:animate-in data-[state=closed]:animate-out",
			"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
		],
		item: [
			"relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
			"transition-colors",
			"focus:bg-accent focus:text-accent-foreground",
			"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		],
		itemIcon: ["size-4"],
	},
	variants: {
		variant: {
			default: {
				trigger: [
					"bg-secondary text-secondary-foreground",
					"hover:bg-secondary/80",
					"active:scale-95",
				],
			},
			outline: {
				trigger: [
					"border border-input bg-background",
					"hover:bg-accent hover:text-accent-foreground",
					"active:scale-95",
				],
			},
			ghost: {
				trigger: [
					"hover:bg-accent hover:text-accent-foreground",
					"active:scale-95",
				],
			},
		},
		size: {
			sm: {
				trigger: "h-8 px-3 text-sm",
				icon: "size-4",
			},
			default: {
				trigger: "h-9 px-4",
				icon: "size-5",
			},
			lg: {
				trigger: "h-10 px-5",
				icon: "size-6",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export type DarkModeToggleVariants = VariantProps<
	typeof darkModeToggleVariants
>;
export type DarkModeSwitchVariants = VariantProps<
	typeof darkModeSwitchVariants
>;
export type DarkModeDropdownVariants = VariantProps<
	typeof darkModeDropdownVariants
>;
