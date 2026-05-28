import { tv, type VariantProps } from "tailwind-variants";

export const numberSpinnerVariants = tv({
	slots: {
		root: "relative inline-flex items-center",
		input: [
			"selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background shadow-xs w-full min-w-0 rounded-md border text-center outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50",
			"focus-visible:ring-[3px]",
			"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
			// Hide default spinner arrows
			"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
		],
		buttonGroup: "flex flex-col",
		button: [
			"inline-flex items-center justify-center outline-none transition-all disabled:pointer-events-none disabled:opacity-50",
			"focus-visible:ring-[2px] focus-visible:ring-ring/50 focus-visible:ring-offset-1",
			"hover:bg-accent active:bg-accent/80",
		],
		buttonHorizontal: [
			"inline-flex items-center justify-center outline-none transition-all disabled:pointer-events-none disabled:opacity-50",
			"focus-visible:ring-[2px] focus-visible:ring-ring/50 focus-visible:ring-offset-1",
			"hover:bg-accent active:bg-accent/80",
		],
	},
	variants: {
		variant: {
			default: {
				input:
					"border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50",
				button: "text-muted-foreground hover:text-foreground",
				buttonHorizontal:
					"border border-input text-muted-foreground hover:text-foreground",
			},
			outline: {
				input:
					"border-2 border-input bg-background hover:border-muted-foreground/50 focus-visible:border-ring focus-visible:ring-ring/50",
				button: "text-muted-foreground hover:text-foreground",
				buttonHorizontal:
					"border-2 border-input text-muted-foreground hover:text-foreground",
			},
			filled: {
				input:
					"border-transparent bg-muted focus-visible:border-ring focus-visible:ring-ring/50",
				button: "text-muted-foreground hover:text-foreground",
				buttonHorizontal:
					"border border-input bg-muted text-muted-foreground hover:text-foreground",
			},
			ghost: {
				input:
					"border-transparent bg-transparent hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50",
				button: "text-muted-foreground hover:text-foreground",
				buttonHorizontal:
					"border border-transparent text-muted-foreground hover:text-foreground",
			},
		},
		size: {
			sm: {
				input: "h-8 px-8 text-xs",
				button: "size-4",
				buttonHorizontal: "h-8 w-8 rounded-md",
			},
			default: {
				input: "h-9 px-9 text-sm",
				button: "size-4",
				buttonHorizontal: "h-9 w-9 rounded-md",
			},
			lg: {
				input: "h-10 px-10 text-base",
				button: "size-5",
				buttonHorizontal: "h-10 w-10 rounded-md",
			},
		},
		orientation: {
			vertical: {
				root: "flex-col",
			},
			horizontal: {
				root: "flex-row gap-1",
			},
		},
	},
	compoundVariants: [
		{
			orientation: "vertical",
			size: "sm",
			class: {
				buttonGroup: "absolute right-0 top-0 h-8",
				button:
					"h-4 w-8 first:rounded-tr-md last:rounded-br-md border-l border-input",
			},
		},
		{
			orientation: "vertical",
			size: "default",
			class: {
				buttonGroup: "absolute right-0 top-0 h-9",
				button:
					"h-[18px] w-9 first:rounded-tr-md last:rounded-br-md border-l border-input",
			},
		},
		{
			orientation: "vertical",
			size: "lg",
			class: {
				buttonGroup: "absolute right-0 top-0 h-10",
				button:
					"h-5 w-10 first:rounded-tr-md last:rounded-br-md border-l border-input",
			},
		},
	],
	defaultVariants: {
		variant: "default",
		size: "default",
		orientation: "vertical",
	},
});

export type NumberSpinnerVariant = VariantProps<
	typeof numberSpinnerVariants
>["variant"];
export type NumberSpinnerSize = VariantProps<
	typeof numberSpinnerVariants
>["size"];
export type NumberSpinnerOrientation = VariantProps<
	typeof numberSpinnerVariants
>["orientation"];
