import { tv, type VariantProps } from "tailwind-variants";

export const emptyMediaVariants = tv({
	base: "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
	variants: {
		variant: {
			default: "bg-transparent",
			icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
			/**
			 * For rich SVG illustrations. No wrapper box and — unlike `icon` —
			 * no forced `size-6`, so the illustration renders at its own
			 * intrinsic/`size`-prop dimensions. Caps at the container width and
			 * keeps aspect ratio so large illustrations shrink gracefully on
			 * narrow screens instead of overflowing.
			 */
			illustration:
				"mb-4 max-w-full bg-transparent [&_svg]:h-auto [&_svg]:max-w-full",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export type EmptyMediaVariant = VariantProps<
	typeof emptyMediaVariants
>["variant"];
