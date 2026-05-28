import type { MaskPattern, MaskType } from "./input-masks.js";
import {
	maskPatterns,
	validateMask,
	applyMaskTransform,
	getMaskPlaceholder,
} from "./input-masks.js";

/**
 * Hook for handling masked input logic
 *
 * @param mask - The mask configuration
 * @param value - Current input value (bindable)
 * @returns Object with input handlers and computed properties
 */
export function useMaskedInput(mask: MaskType | MaskPattern | undefined) {
	/**
	 * Handles input events for masked inputs
	 *
	 * @param event - The input event
	 * @param setValue - Function to update the bindable value
	 */
	function handleInput(event: Event, setValue: (value: string) => void) {
		if (!mask) return;

		const target = event.target as HTMLInputElement;
		const currentValue = target.value;

		const maskConfig = typeof mask === "string" ? maskPatterns[mask] : mask;

		// Validate against mask
		if (!validateMask(currentValue, maskConfig)) {
			// Revert to previous valid value
			target.value = target.dataset.lastValidValue || "";
			return;
		}

		// Apply transformation if provided
		const transformedValue = applyMaskTransform(currentValue, maskConfig);
		target.value = transformedValue;
		target.dataset.lastValidValue = transformedValue;
		setValue(transformedValue);
	}

	/**
	 * Gets the placeholder text for the current mask
	 *
	 * @param fallbackPlaceholder - Fallback placeholder text
	 * @returns The appropriate placeholder
	 */
	function getPlaceholder(fallbackPlaceholder?: string): string | undefined {
		return getMaskPlaceholder(mask, fallbackPlaceholder);
	}

	return {
		handleInput,
		getPlaceholder,
		hasMask: !!mask,
	};
}
