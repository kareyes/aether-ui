import { tv, type VariantProps } from "tailwind-variants";

export const sliderVariants = tv({
	slots: {
		root: [
			"relative flex w-full touch-none select-none items-center",
			"data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
			"data-[disabled]:opacity-50",
		],
		track: [
			"relative w-full grow overflow-hidden rounded-full transition-colors",
			"data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full",
			"data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
		],
		range: [
			"absolute transition-all duration-150 ease-out",
			"data-[orientation=horizontal]:h-full",
			"data-[orientation=vertical]:w-full",
		],
		thumb: [
			"block shrink-0 rounded-full border shadow-sm transition-all duration-150 ease-out",
			"hover:ring-4 hover:scale-110 focus-visible:ring-4 focus-visible:scale-110 focus-visible:outline-hidden",
			"active:scale-95",
			"disabled:pointer-events-none disabled:opacity-50",
		],
		marks: [
			"absolute left-0 right-0 top-full mt-2 h-4 pointer-events-none",
			"data-[orientation=vertical]:top-0 data-[orientation=vertical]:bottom-0 data-[orientation=vertical]:left-full data-[orientation=vertical]:right-auto data-[orientation=vertical]:ml-2 data-[orientation=vertical]:mt-0 data-[orientation=vertical]:w-auto data-[orientation=vertical]:h-auto",
		],
		mark: [
			"absolute flex flex-col items-center -translate-x-1/2",
			"data-[orientation=vertical]:flex-row data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:translate-y-1/2",
		],
		markIndicator: "size-1.5 rounded-full bg-border",
		markLabel: "text-xs text-muted-foreground whitespace-nowrap select-none",
		tooltip: [
			"absolute z-50 -translate-x-1/2 -translate-y-full pointer-events-none",
			"rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md",
			"animate-in fade-in-0 zoom-in-95",
			"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
		],
		step: [
			"absolute rounded-full bg-muted-foreground/20 transition-colors",
			"data-[in-range=true]:bg-primary/40",
		],
	},
	variants: {
		variant: {
			default: {
				track: "bg-muted",
				range: "bg-primary",
				thumb: "border-primary bg-background ring-ring/50",
			},
			primary: {
				track: "bg-primary/20",
				range: "bg-primary",
				thumb: "border-primary bg-primary ring-primary/50",
			},
			secondary: {
				track: "bg-secondary",
				range: "bg-secondary-foreground",
				thumb: "border-secondary-foreground bg-background ring-secondary/50",
			},
			success: {
				track: "bg-green-100 dark:bg-green-900/20",
				range: "bg-green-600 dark:bg-green-500",
				thumb:
					"border-green-600 bg-background ring-green-500/50 dark:border-green-500",
			},
			warning: {
				track: "bg-yellow-100 dark:bg-yellow-900/20",
				range: "bg-yellow-600 dark:bg-yellow-500",
				thumb:
					"border-yellow-600 bg-background ring-yellow-500/50 dark:border-yellow-500",
			},
			destructive: {
				track: "bg-destructive/20",
				range: "bg-destructive",
				thumb: "border-destructive bg-background ring-destructive/50",
			},
		},
		size: {
			sm: {
				track:
					"data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
				thumb: "size-3",
				markIndicator: "size-1",
				step: "data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-0.5 data-[orientation=vertical]:w-1 data-[orientation=vertical]:h-0.5",
			},
			default: {
				track:
					"data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
				thumb: "size-4",
				markIndicator: "size-1.5",
				step: "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-0.5 data-[orientation=vertical]:w-1.5 data-[orientation=vertical]:h-0.5",
			},
			lg: {
				track:
					"data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2",
				thumb: "size-5",
				markIndicator: "size-2",
				step: "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-1 data-[orientation=vertical]:w-2 data-[orientation=vertical]:h-1",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export type SliderVariant = VariantProps<typeof sliderVariants>["variant"];
export type SliderSize = VariantProps<typeof sliderVariants>["size"];
