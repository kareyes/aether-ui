import { tv, type VariantProps } from "tailwind-variants";

export const dialogVariants = tv({
	slots: {
		overlay: [
			"fixed inset-0 z-50 bg-black/50",
			"data-[state=open]:animate-in data-[state=closed]:animate-out",
			"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
		],
		content: [
			"bg-background fixed left-[50%] top-[50%] z-50",
			"grid w-full translate-x-[-50%] translate-y-[-50%]",
			"gap-4 rounded-lg border p-6 shadow-lg duration-200",
			"data-[state=open]:animate-in data-[state=closed]:animate-out",
			"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
			"data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
			"data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
		],
		header: ["flex flex-col gap-2 text-center sm:text-left"],
		footer: ["flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"],
		title: ["text-lg font-semibold leading-none tracking-tight"],
		description: ["text-muted-foreground text-sm"],
		closeButton: [
			"ring-offset-background focus:ring-ring rounded-xs",
			"absolute end-4 top-4 opacity-70 transition-opacity",
			"hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-offset-2",
			"disabled:pointer-events-none",
			"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		],
	},
	variants: {
		size: {
			sm: {
				content: "max-w-[calc(100%-2rem)] sm:max-w-sm",
			},
			default: {
				content: "max-w-[calc(100%-2rem)] sm:max-w-lg",
			},
			lg: {
				content: "max-w-[calc(100%-2rem)] sm:max-w-2xl",
			},
			xl: {
				content: "max-w-[calc(100%-2rem)] sm:max-w-4xl",
			},
			full: {
				content: "max-w-[calc(100%-2rem)] sm:max-w-[90vw]",
			},
		},
		variant: {
			default: {},
			centered: {
				header: "text-center",
				footer: "justify-center sm:justify-center",
			},
		},
	},
	defaultVariants: {
		size: "default",
		variant: "default",
	},
});

export type DialogVariants = VariantProps<typeof dialogVariants>;
export type DialogSize = NonNullable<DialogVariants["size"]>;
export type DialogVariant = NonNullable<DialogVariants["variant"]>;
