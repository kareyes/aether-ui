import { tv, type VariantProps } from "tailwind-variants";

export const inputVariants = tv({
	base: [
		"selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
		"focus-visible:ring-[3px]",
		"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
			sm: "h-8 px-2 text-xs",
			default: "h-9 px-3 text-sm",
			lg: "h-10 px-4 text-base",
		},
	},
	compoundVariants: [
		{
			variant: "underline",
			size: "sm",
			class: "h-6",
		},
		{
			variant: "underline",
			size: "lg",
			class: "h-12",
		},
	],
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export type InputVariant = VariantProps<typeof inputVariants>["variant"];
export type InputSize = VariantProps<typeof inputVariants>["size"];
