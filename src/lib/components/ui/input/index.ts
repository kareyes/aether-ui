import Root from "./input.svelte";

// Export types and utilities
export type {
	InputVariant,
	InputSize,
	MaskType,
	MaskPattern,
	MaskConfig,
	InputProps,
	InputWithAddonsProps,
	InputGroupAddonAlign,
} from "./utils/input-types";

// Export mask configurations
export {
	createMask,
	validateMask,
	applyMaskTransform,
	getMaskPlaceholder,
	createLicensePlateMask,
	createProductCodeMask,
	createHexColorMask,
	createIpAddressMask,
} from "./utils/input-masks";

// Export variants
export { inputVariants } from "./utils/input-variants";

// Export hooks
export { useMaskedInput } from "./utils/input-hooks";

export {
	Root,
	//
	Root as Input,
};
