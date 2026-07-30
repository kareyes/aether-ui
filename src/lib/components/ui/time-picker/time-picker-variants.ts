import { tv, type VariantProps } from "tailwind-variants";

export const timePickerVariants = tv({
	slots: {
		root: "grid gap-2",
		/**
		 * The segmented field itself. It is not a native input, so the focus ring
		 * is driven by `:focus-within` from whichever segment holds focus.
		 */
		field: [
			"shadow-xs flex w-fit items-center gap-1 rounded-md border bg-transparent",
			"outline-none transition-[color,box-shadow]",
			"focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
			"data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
			"data-[invalid]:border-destructive data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40",
		],
		/**
		 * Segments are focusable spans. `tabular-nums` keeps the field from
		 * reflowing as digits change — a 1 and a 7 must occupy the same width, or
		 * the trigger button shifts while arrowing through values.
		 */
		segment: [
			"rounded-sm px-0.5 tabular-nums outline-none transition-colors",
			"focus:bg-primary focus:text-primary-foreground",
			"data-[disabled]:pointer-events-none",
			"data-[segment=literal]:px-0 data-[segment=literal]:text-muted-foreground",
			"aria-[valuetext=Empty]:text-muted-foreground",
		],
		trigger: [
			"text-muted-foreground hover:text-foreground ml-auto inline-flex shrink-0 items-center justify-center",
			"rounded-sm outline-none transition-colors",
			"hover:bg-accent focus-visible:ring-ring/50 focus-visible:ring-[2px]",
			"disabled:pointer-events-none disabled:opacity-50",
		],
		/** One scrolling column of options (hour, minute, second, AM/PM). */
		column: "flex min-h-0 flex-col overflow-y-auto scroll-smooth p-1",
		columnHeader: [
			"bg-popover text-muted-foreground sticky top-0 z-10 pb-1 pt-0.5",
			"text-center text-[0.625rem] font-medium uppercase tracking-widest",
		],
		columnItem: [
			"mx-auto flex w-full shrink-0 items-center justify-center rounded-md tabular-nums",
			"outline-none transition-colors",
			"hover:bg-accent hover:text-accent-foreground",
			"focus-visible:ring-ring/50 focus-visible:ring-[2px]",
			"disabled:pointer-events-none disabled:opacity-40 disabled:line-through",
			"data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
			"data-[selected=true]:hover:bg-primary/90",
		],
		footer:
			"flex items-center justify-between gap-2 border-t border-border p-2",
	},
	variants: {
		variant: {
			default: {
				field: "border-input dark:bg-input/30",
			},
			outline: {
				field:
					"border-input border-2 bg-background hover:border-muted-foreground/50",
			},
			filled: {
				field: "bg-muted border-transparent",
			},
			ghost: {
				field: "border-transparent bg-transparent hover:bg-accent",
			},
			underline: {
				field:
					"rounded-none border-0 border-b-2 px-0 focus-within:border-b-primary focus-within:ring-0",
			},
		},
		size: {
			sm: {
				field: "h-8 px-2 text-xs",
				trigger: "size-5 [&_svg]:size-3.5",
				column: "w-12",
				columnItem: "h-7 text-xs",
			},
			default: {
				field: "h-9 px-3 text-sm",
				trigger: "size-6 [&_svg]:size-4",
				column: "w-14",
				columnItem: "h-8 text-sm",
			},
			lg: {
				field: "h-10 px-4 text-base",
				trigger: "size-7 [&_svg]:size-5",
				column: "w-16",
				columnItem: "h-9 text-base",
			},
		},
	},
	compoundVariants: [
		{ variant: "underline", size: "sm", class: { field: "h-7" } },
		{ variant: "underline", size: "lg", class: { field: "h-11" } },
	],
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export type TimePickerVariant = VariantProps<
	typeof timePickerVariants
>["variant"];
export type TimePickerSize = VariantProps<typeof timePickerVariants>["size"];
