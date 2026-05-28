import { type VariantProps, tv } from "tailwind-variants";

export const alertDialogVariants = tv({
	slots: {
		content:
			"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed start-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 border shadow-lg duration-200 sm:max-w-lg",
		header: "flex flex-col gap-2",
		title: "text-lg font-semibold leading-none tracking-tight",
		description: "text-sm text-muted-foreground",
		footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
		action: "",
		cancel: "",
	},
	variants: {
		variant: {
			default: {
				content: "rounded-lg p-6",
				title: "text-foreground",
			},
			destructive: {
				content: "rounded-lg p-6 border-destructive/50",
				title: "text-destructive",
			},
			success: {
				content: "rounded-lg p-6 border-green-500/50",
				title: "text-green-600 dark:text-green-400",
			},
			warning: {
				content: "rounded-lg p-6 border-yellow-500/50",
				title: "text-yellow-600 dark:text-yellow-400",
			},
			info: {
				content: "rounded-lg p-6 border-blue-500/50",
				title: "text-blue-600 dark:text-blue-400",
			},
		},
		size: {
			sm: {
				content: "sm:max-w-sm p-4 gap-3",
				title: "text-base",
				description: "text-xs",
			},
			default: {
				content: "sm:max-w-lg p-6 gap-4",
				title: "text-lg",
				description: "text-sm",
			},
			lg: {
				content: "sm:max-w-2xl p-8 gap-6",
				title: "text-xl",
				description: "text-base",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export type AlertDialogVariant = VariantProps<
	typeof alertDialogVariants
>["variant"];
export type AlertDialogSize = VariantProps<typeof alertDialogVariants>["size"];
