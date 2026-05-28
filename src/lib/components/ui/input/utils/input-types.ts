import type {
	HTMLInputAttributes,
	HTMLInputTypeAttribute,
} from "svelte/elements";
import type { WithElementRef } from "$lib/utils.js";
import type { InputVariant, InputSize } from "./input-variants.js";
import type { MaskType, MaskPattern } from "./input-masks.js";
import type { Snippet } from "svelte";

export type InputType = Exclude<HTMLInputTypeAttribute, "file">;
export type InputGroupAddonAlign =
	| "inline-start"
	| "inline-end"
	| "block-start"
	| "block-end";

export interface InputProps
	extends WithElementRef<Omit<HTMLInputAttributes, "type" | "size">> {
	variant?: InputVariant;
	size?: InputSize;
	/**
	 * Input mask - can be a predefined mask name or a custom MaskPattern object.
	 * Predefined masks: 'phone', 'ssn', 'creditCard', 'date', 'time'
	 * Custom mask: { pattern: RegExp, placeholder: string, transform?: function }
	 */
	mask?: MaskType | MaskPattern;
	type?: InputType;
	class?: string;
	"data-slot"?: string;
	/**
	 * Error state - when true, applies error styling via aria-invalid
	 */
	error?: boolean;
	/**
	 * Loading state - when true, shows a spinner and disables the input
	 */
	loading?: boolean;
	/**
	 * Callback function called when an error state is detected
	 */
	onError?: (error: boolean) => void;
}

/**
 * Enhanced Input props with InputGroup addon support
 */
export interface InputWithAddonsProps extends InputProps {
	/**
	 * Icon snippet to display at the start of the input
	 */
	startIcon?: Snippet;
	/**
	 * Icon snippet to display at the end of the input
	 */
	endIcon?: Snippet;
	/**
	 * Text or snippet to display at the start of the input
	 */
	startText?: string | Snippet;
	/**
	 * Text or snippet to display at the end of the input
	 */
	endText?: string | Snippet;
	/**
	 * Button snippet to display at the start of the input
	 */
	startButton?: Snippet;
	/**
	 * Button snippet to display at the end of the input
	 */
	endButton?: Snippet;
	/**
	 * Custom addon snippet for the start (overrides startIcon, startText, startButton)
	 */
	startAddon?: Snippet;
	/**
	 * Custom addon snippet for the end (overrides endIcon, endText, endButton)
	 */
	endAddon?: Snippet;
	/**
	 * Alignment for start addon
	 */
	startAddonAlign?: InputGroupAddonAlign;
	/**
	 * Alignment for end addon
	 */
	endAddonAlign?: InputGroupAddonAlign;
	/**
	 * Additional class names for the InputGroup wrapper
	 */
	groupClassName?: string;
}

// Re-export types from other modules for convenience
export type { InputVariant, InputSize } from "./input-variants.js";
export type { MaskType, MaskPattern, MaskConfig } from "./input-masks.js";
