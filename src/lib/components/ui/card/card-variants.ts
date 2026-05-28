import { tv, type VariantProps } from "tailwind-variants";

export const cardVariants = tv({
	base: "bg-card text-card-foreground rounded-lg sm:rounded-xl shadow-sm",
	variants: {
		variant: {
			default: "border border-border",
			outline: "border-2 border-border",
			ghost: "border-transparent shadow-none",
			elevated: "border border-border shadow-lg",
			filled: "bg-muted border border-muted",
		},
		padding: {
			none: "",
			sm: "",
			default: "",
			lg: "",
		},
		hover: {
			true: "transition-all duration-200 hover:shadow-md hover:border-primary/50",
			false: "",
		},
		interactive: {
			true: "cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
			false: "",
		},
	},
	defaultVariants: {
		variant: "default",
		padding: "default",
		hover: false,
		interactive: false,
	},
});

export type CardVariant = VariantProps<typeof cardVariants>["variant"];
export type CardPadding = VariantProps<typeof cardVariants>["padding"];
