import { tv, type VariantProps } from "tailwind-variants";

export const textareaVariants = tv({
	base: [
		"selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex w-full rounded-md border px-3 py-2 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
		"focus-visible:ring-[3px]",
		"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
		"resize-none", // Can be overridden with resize prop
	],
	variants: {
		variant: {
			default:
				"border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50",
			outline:
				"border-2 border-input bg-background hover:border-muted-foreground/50 focus-visible:border-ring focus-visible:ring-ring/50",
			filled:
				"border-transparent bg-muted focus-visible:border-ring focus-visible:ring-ring/50",
			ghost:
				"border-transparent bg-transparent hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50",
			underline:
				"border-0 border-b-2 border-input rounded-none px-0 bg-transparent focus-visible:border-b-primary focus-visible:ring-0",
		},
		size: {
			sm: "min-h-16 px-2 py-1.5 text-xs",
			default: "min-h-20 px-3 py-2 text-sm",
			lg: "min-h-24 px-4 py-3 text-base",
		},
		resize: {
			none: "resize-none",
			both: "resize",
			vertical: "resize-y",
			horizontal: "resize-x",
		},
	},
	compoundVariants: [
		{
			variant: "underline",
			size: "sm",
			class: "min-h-14",
		},
		{
			variant: "underline",
			size: "lg",
			class: "min-h-28",
		},
	],
	defaultVariants: {
		variant: "default",
		size: "default",
		resize: "vertical",
	},
});

export type TextareaVariant = VariantProps<typeof textareaVariants>["variant"];
export type TextareaSize = VariantProps<typeof textareaVariants>["size"];
export type TextareaResize = VariantProps<typeof textareaVariants>["resize"];
