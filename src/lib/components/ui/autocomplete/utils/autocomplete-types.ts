/**
 * Default item shape rendered by Autocomplete's built-in row (just a label).
 * A custom `T` that doesn't match this shape can still be used — supply
 * `itemLabel` / `itemValue` plus the `item` snippet to fully own row
 * rendering (e.g. avatars, subtitles, badges).
 */
export type AutocompleteItem = {
	value: string;
	label: string;
	disabled?: boolean;
};
