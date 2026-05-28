import type { HTMLButtonAttributes } from "svelte/elements";
import type {
	DarkModeToggleVariants,
	DarkModeSwitchVariants,
	DarkModeDropdownVariants,
} from "./dark-mode-variants.js";

export type ThemeMode = "light" | "dark" | "system";

export interface DarkModeToggleProps extends HTMLButtonAttributes {
	/**
	 * The visual style variant of the toggle button
	 * @default "default"
	 */
	variant?: DarkModeToggleVariants["variant"];

	/**
	 * The size of the toggle button
	 * @default "default"
	 */
	size?: DarkModeToggleVariants["size"];

	/**
	 * The shape of the toggle button
	 * @default "square"
	 */
	shape?: DarkModeToggleVariants["shape"];

	/**
	 * Whether to show a tooltip on hover
	 * @default false
	 */
	showTooltip?: boolean;

	/**
	 * Custom light mode icon tooltip text
	 * @default "Switch to dark mode"
	 */
	lightModeTooltip?: string;

	/**
	 * Custom dark mode icon tooltip text
	 * @default "Switch to light mode"
	 */
	darkModeTooltip?: string;

	/**
	 * Animation style for the icon transition
	 * @default "rotate"
	 */
	animation?: "rotate" | "scale" | "fade" | "none";

	/**
	 * Additional CSS classes
	 */
	class?: string;
}

export interface DarkModeSwitchProps {
	/**
	 * The visual style variant
	 * @default "default"
	 */
	variant?: DarkModeSwitchVariants["variant"];

	/**
	 * The size of the switch
	 * @default "default"
	 */
	size?: DarkModeSwitchVariants["size"];

	/**
	 * Whether to show icons inside the switch
	 * @default true
	 */
	showIcons?: boolean;

	/**
	 * Whether the switch is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Additional CSS classes
	 */
	class?: string;
}

export interface DarkModeDropdownProps {
	/**
	 * The visual style variant of the dropdown trigger
	 * @default "default"
	 */
	variant?: DarkModeDropdownVariants["variant"];

	/**
	 * The size of the dropdown trigger
	 * @default "default"
	 */
	size?: DarkModeDropdownVariants["size"];

	/**
	 * Whether to show the current mode label in the trigger
	 * @default false
	 */
	showLabel?: boolean;

	/**
	 * Custom labels for each mode
	 */
	labels?: {
		light?: string;
		dark?: string;
		system?: string;
	};

	/**
	 * Alignment of the dropdown content
	 * @default "end"
	 */
	align?: "start" | "center" | "end";

	/**
	 * Side of the trigger to show the dropdown
	 * @default "bottom"
	 */
	side?: "top" | "right" | "bottom" | "left";

	/**
	 * Additional CSS classes
	 */
	class?: string;
}

// Re-export variant types for convenience
export type {
	DarkModeToggleVariants,
	DarkModeSwitchVariants,
	DarkModeDropdownVariants,
};

// Variant value types
export type DarkModeToggleVariant = NonNullable<
	DarkModeToggleVariants["variant"]
>;
export type DarkModeToggleSize = NonNullable<DarkModeToggleVariants["size"]>;
export type DarkModeToggleShape = NonNullable<DarkModeToggleVariants["shape"]>;

export type DarkModeSwitchVariant = NonNullable<
	DarkModeSwitchVariants["variant"]
>;
export type DarkModeSwitchSize = NonNullable<DarkModeSwitchVariants["size"]>;

export type DarkModeDropdownVariant = NonNullable<
	DarkModeDropdownVariants["variant"]
>;
export type DarkModeDropdownSize = NonNullable<
	DarkModeDropdownVariants["size"]
>;
