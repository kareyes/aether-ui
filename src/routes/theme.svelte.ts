/**
 * Which theme the preview app is wearing.
 *
 * The class lives on `<html>`, not on a wrapper: dialogs, selects, tooltips and
 * toasts portal to `<body>`, so a scope inside the app shell would leave every
 * overlay un-themed. `app.html` ships a class on by default and swaps it before
 * first paint from the stored preference, so no setting flashes the wrong theme
 * on load.
 *
 * Every theme is applied app-wide rather than on a curated showcase page, so
 * each demo route doubles as a test of the theme against a component that knows
 * nothing about it.
 */

export type ThemeOption = {
	/** The scope class, or "" for the library's base tokens. */
	readonly id: string;
	readonly label: string;
};

export const THEMES: readonly ThemeOption[] = [
	{ id: "", label: "Base" },
	{ id: "theme-pelican", label: "Pelican" },
	{ id: "theme-ledger", label: "Ledger" },
	{ id: "theme-blueprint", label: "Blueprint" },
	{ id: "theme-bundy", label: "Bundy" },
	{ id: "theme-sampaguita", label: "Sampaguita" },
	{ id: "theme-capiz", label: "Capiz" },
	{ id: "theme-alloy", label: "Alloy" },
	{ id: "theme-reticle", label: "Reticle" },
];

const STORAGE_KEY = "aether-ui:theme";

/** The server has no DOM and no preference; read whatever `app.html` shipped. */
const initial = (): string => {
	if (typeof document === "undefined") return "theme-pelican";
	const found = THEMES.find(
		(theme) =>
			theme.id !== "" && document.documentElement.classList.contains(theme.id),
	);
	return found?.id ?? "";
};

let active = $state(initial());

export const theme = {
	get active(): string {
		return active;
	},
	set active(value: string) {
		active = value;
	},
};

/**
 * Pelican's own page predates the picker and asks the question as a toggle, so
 * it gets a boolean view of the same state.
 */
export const pelicanSwitch = {
	get enabled(): boolean {
		return active === "theme-pelican";
	},
	set enabled(value: boolean) {
		active = value ? "theme-pelican" : "";
	},
};

/** Applies the choice and remembers it. Run from the layout's `$effect`. */
export const syncTheme = (): void => {
	for (const option of THEMES)
		if (option.id !== "")
			document.documentElement.classList.toggle(
				option.id,
				option.id === active,
			);
	try {
		localStorage.setItem(STORAGE_KEY, active);
	} catch {
		// Storage disabled (private mode, blocked cookies) — the picker still
		// works, it just does not survive a reload.
	}
};
