// Components
import DarkModeToggle from "./dark-mode-toggle.svelte";
import DarkModeSwitch from "./dark-mode-switch.svelte";
import DarkModeDropdown from "./dark-mode-dropdown.svelte";

// Variants
export {
	darkModeToggleVariants,
	darkModeSwitchVariants,
	darkModeDropdownVariants,
} from "./dark-mode-variants.js";

// Types
export type {
	ThemeMode,
	DarkModeToggleProps,
	DarkModeSwitchProps,
	DarkModeDropdownProps,
	DarkModeToggleVariants,
	DarkModeSwitchVariants,
	DarkModeDropdownVariants,
	DarkModeToggleVariant,
	DarkModeToggleSize,
	DarkModeToggleShape,
	DarkModeSwitchVariant,
	DarkModeSwitchSize,
	DarkModeDropdownVariant,
	DarkModeDropdownSize,
} from "./dark-mode-types.js";

// Re-export mode-watcher utilities for convenience
export {
	mode,
	setMode,
	toggleMode,
	resetMode,
	ModeWatcher,
} from "mode-watcher";

// Named exports
export { DarkModeToggle, DarkModeSwitch, DarkModeDropdown };

// Default export as namespace
export const DarkMode = {
	Toggle: DarkModeToggle,
	Switch: DarkModeSwitch,
	Dropdown: DarkModeDropdown,
};

// Primitives namespace for consistency with other components
export const DarkModePrimitives = {
	Toggle: DarkModeToggle,
	Switch: DarkModeSwitch,
	Dropdown: DarkModeDropdown,
};
