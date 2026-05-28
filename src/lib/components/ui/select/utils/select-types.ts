import type { SelectVariant, SelectSize } from "./select-variants.js";

export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface SelectOptionGroup {
	label?: string;
	options: SelectOption[];
}

interface BaseProps {
	ref?: HTMLElement | null;
	class?: string;
	placeholder?: string;
	options?: SelectOption[];
	groups?: SelectOptionGroup[];
	disabled?: boolean;
	required?: boolean;
	name?: string;
	size?: SelectSize;
	variant?: SelectVariant;
	contentClass?: string;
	triggerClass?: string;
	itemClass?: string;
	sideOffset?: number;
	/**
	 * Error state - when true, applies error styling via aria-invalid
	 */
	error?: boolean;
	/**
	 * Loading state - when true, shows a spinner and disables the select
	 */
	loading?: boolean;
	/**
	 * Callback function called when error state changes
	 */
	onError?: (error: boolean) => void;
}

export interface SingleSelectProps extends BaseProps {
	multiple?: false;
	value?: string;
	onSelectionChange?: (value: string | undefined) => void;
}

export interface MultiSelectProps extends BaseProps {
	multiple: true;
	value?: string[];
	onSelectionChange?: (value: string[]) => void;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;

// Re-export types for convenience
export type { SelectVariant, SelectSize } from "./select-variants.js";
