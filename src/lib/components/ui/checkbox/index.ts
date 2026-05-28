import Root, {
	type CheckboxProps,
	type CheckboxSize,
	type CheckboxVariant,
	checkboxVariants,
	checkboxIconVariants,
} from "./checkbox.svelte";

import CheckboxGroup, {
	type CheckboxGroupProps,
	type CheckboxGroupOption,
	type CheckboxGroupOrientation,
	type CheckboxGroupSize,
	checkboxGroupVariants,
} from "./checkbox-group.svelte";

const Variants: CheckboxVariant[] = Object.keys(
	checkboxVariants.variants.variant,
) as CheckboxVariant[];
const Sizes: CheckboxSize[] = Object.keys(
	checkboxVariants.variants.size,
) as CheckboxSize[];
const GroupOrientations: CheckboxGroupOrientation[] = Object.keys(
	checkboxGroupVariants.variants.orientation,
) as CheckboxGroupOrientation[];
const GroupSizes: CheckboxGroupSize[] = Object.keys(
	checkboxGroupVariants.variants.size,
) as CheckboxGroupSize[];

export {
	Root,
	CheckboxGroup,
	type CheckboxProps as Props,
	type CheckboxGroupProps,
	type CheckboxGroupOption,
	//
	Root as Checkbox,
	checkboxVariants,
	checkboxIconVariants,
	checkboxGroupVariants,
	Variants,
	Sizes,
	GroupOrientations,
	GroupSizes,
};
