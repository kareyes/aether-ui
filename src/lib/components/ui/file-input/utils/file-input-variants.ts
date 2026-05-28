import { tv, type VariantProps } from "tailwind-variants";

/**
 * File input variants using Tailwind Variants
 * Supports different UI modes with consistent styling
 */
export const fileInputVariants = tv({
	slots: {
		// Common slots across all modes
		fileList: "space-y-2",
		fileItem: "flex items-center justify-between p-2 bg-muted rounded text-sm",
		fileName: "flex-1 truncate",
		fileSize: "text-xs text-muted-foreground ml-2",
		removeButton:
			"ml-2 text-destructive hover:text-destructive/80 transition-colors",
		errorText: "text-xs text-destructive",
		infoText: "text-xs text-muted-foreground",

		// Drag and drop specific slots
		dragContainer: [
			"relative border-2 border-dashed rounded-lg transition-all cursor-pointer",
			"focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
		],
		dragInput: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
		dragContent: "flex flex-col items-center justify-center text-center",
		dragIcon: "text-muted-foreground",
		dragText: "text-muted-foreground",
		dragSubtext: "text-muted-foreground",

		// Regular input specific slots
		regularContainer: "space-y-2",
		regularInput: [
			"flex w-full rounded-md border border-input bg-background px-3 py-1 text-sm",
			"transition-colors placeholder:text-muted-foreground",
			"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
			"disabled:cursor-not-allowed disabled:opacity-50",
			"file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
		],

		// Button mode specific slots
		buttonContainer: "space-y-2",
		button: [
			"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
			"transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
			"disabled:pointer-events-none disabled:opacity-50",
		],
		buttonInput: "sr-only",
		buttonIcon: "mr-2",
		buttonText: "",
	},
	variants: {
		variant: {
			default: {
				dragContainer:
					"border-input bg-background hover:border-muted-foreground/50",
				regularInput:
					"border-input bg-background hover:border-muted-foreground/50",
				button:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			},
			filled: {
				dragContainer: "border-muted bg-muted/50 hover:bg-muted/80",
				regularInput: "border-transparent bg-muted hover:bg-muted/80",
				button: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			},
			ghost: {
				dragContainer: "border-transparent bg-transparent hover:bg-muted/50",
				regularInput: "border-transparent bg-transparent hover:bg-muted/50",
				button: "hover:bg-accent hover:text-accent-foreground",
			},
		},
		size: {
			sm: {
				dragContainer: "min-h-[80px]",
				dragContent: "p-4",
				dragText: "text-xs",
				dragSubtext: "text-xs",
				regularInput: "h-8 px-2 text-xs",
				button: "h-8 px-3 text-xs",
				buttonIcon: "size-3",
			},
			default: {
				dragContainer: "min-h-[120px]",
				dragContent: "p-6",
				dragText: "text-sm",
				dragSubtext: "text-xs",
				regularInput: "h-9 px-3 text-sm",
				button: "h-9 px-4 py-2",
				buttonIcon: "size-4",
			},
			lg: {
				dragContainer: "min-h-[160px]",
				dragContent: "p-8",
				dragText: "text-base",
				dragSubtext: "text-sm",
				regularInput: "h-10 px-4 text-base",
				button: "h-10 px-8",
				buttonIcon: "size-5",
			},
		},
		state: {
			default: {},
			dragover: {
				dragContainer: "border-primary bg-primary/5 border-solid",
			},
			error: {
				dragContainer: "border-destructive bg-destructive/5",
				regularInput: "border-destructive",
				button: "border-destructive text-destructive hover:bg-destructive/5",
			},
			disabled: {
				dragContainer: "opacity-50 cursor-not-allowed",
				dragInput: "cursor-not-allowed",
				regularInput: "cursor-not-allowed",
				button: "opacity-50 cursor-not-allowed",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
		state: "default",
	},
});

export type FileInputVariant = VariantProps<
	typeof fileInputVariants
>["variant"];
export type FileInputSize = VariantProps<typeof fileInputVariants>["size"];
export type FileInputState = VariantProps<typeof fileInputVariants>["state"];
