import Root from "./badge.svelte";
import {
	type BadgeVariant,
	type BadgeColor,
	type BadgeSize,
	type BadgeProps,
	badgeVariants,
} from "./badge-variants.js";

const Variants: BadgeVariant[] = Object.keys(
	badgeVariants.variants.variant,
) as BadgeVariant[];
const Colors: BadgeColor[] = Object.keys(
	badgeVariants.variants.color,
) as BadgeColor[];
const Sizes: BadgeSize[] = Object.keys(
	badgeVariants.variants.size,
) as BadgeSize[];

export {
	Root,
	type BadgeProps as Props,
	//
	Root as Badge,
	badgeVariants,
	Variants,
	Colors,
	Sizes,
};
