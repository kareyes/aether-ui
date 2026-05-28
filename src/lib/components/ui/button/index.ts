import Root, {
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
	type ButtonColor,
	buttonVariants,
} from "./button.svelte";

const Variants: ButtonVariant[] = Object.keys(
	buttonVariants.variants.variant,
) as ButtonVariant[];
const Sizes: ButtonSize[] = Object.keys(
	buttonVariants.variants.size,
) as ButtonSize[];
const Colors: ButtonColor[] = Object.keys(
	buttonVariants.variants.color,
) as ButtonColor[];

export {
	Root,
	type ButtonProps as Props,
	//
	Root as Button,
	buttonVariants,
	Variants,
	Sizes,
	Colors,
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
	type ButtonColor,
};
