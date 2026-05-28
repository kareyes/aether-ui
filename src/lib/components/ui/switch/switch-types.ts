/**
 * Switch component type definitions
 */

import type { WithoutChildrenOrChild } from "$lib/utils.js";
import type { Switch as SwitchPrimitive } from "bits-ui";
import type { SwitchVariant, SwitchSize } from "./switch-variants.js";

export interface SwitchProps
	extends WithoutChildrenOrChild<SwitchPrimitive.RootProps> {
	/**
	 * Reference to the switch element
	 */
	ref?: HTMLButtonElement | null;

	/**
	 * Additional CSS classes
	 */
	class?: string;

	/**
	 * Whether the switch is checked
	 */
	checked?: boolean;

	/**
	 * Visual variant of the switch
	 * @default 'default'
	 */
	variant?: SwitchVariant;

	/**
	 * Size of the switch
	 * @default 'default'
	 */
	size?: SwitchSize;

	/**
	 * Whether the switch is disabled
	 */
	disabled?: boolean;

	/**
	 * Name attribute for form submission
	 */
	name?: string;

	/**
	 * Value attribute for form submission
	 */
	value?: string;

	/**
	 * Required for form validation
	 */
	required?: boolean;

	/**
	 * Callback when checked state changes
	 */
	onCheckedChange?: (checked: boolean) => void;

	/**
	 * Error state - when true, applies error styling via aria-invalid
	 */
	error?: boolean;

	/**
	 * Callback function called when an error state is detected
	 */
	onError?: (error: boolean) => void;
}
