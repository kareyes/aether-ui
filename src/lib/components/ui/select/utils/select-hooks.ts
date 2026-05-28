import type { SelectOption, SelectOptionGroup } from "./select-types.js";

/**
 * Hook for finding an option by value from options or groups
 *
 * @param getOptions - Getter function for direct options array
 * @param getGroups - Getter function for grouped options array
 * @returns Function to find option by value
 */
export function useFindOption(
	getOptions: () => SelectOption[],
	getGroups: () => SelectOptionGroup[],
) {
	return function findOptionByValue(
		searchValue: string,
	): SelectOption | undefined {
		const options = getOptions();
		const groups = getGroups();

		// Search in direct options
		const directOption = options.find((opt) => opt.value === searchValue);
		if (directOption) return directOption;

		// Search in groups
		for (const group of groups) {
			const groupOption = group.options.find(
				(opt) => opt.value === searchValue,
			);
			if (groupOption) return groupOption;
		}

		return undefined;
	};
}

/**
 * Hook for getting display value based on selection
 *
 * @param getValue - Getter function for current value (string or string[])
 * @param getMultiple - Getter function for multiple selection flag
 * @param getPlaceholder - Getter function for placeholder text
 * @param findOption - Function to find option by value
 * @returns Display value string
 */
export function useDisplayValue(
	getValue: () => string | string[] | undefined,
	getMultiple: () => boolean,
	getPlaceholder: () => string,
	findOption: (value: string) => SelectOption | undefined,
) {
	return function getDisplayValue(): string {
		const value = getValue();
		const multiple = getMultiple();
		const placeholder = getPlaceholder();

		if (!value) return placeholder;

		if (multiple && Array.isArray(value)) {
			if (value.length === 0) return placeholder;
			if (value.length === 1) {
				const option = findOption(value[0]);
				return option?.label || value[0];
			}
			return `${value.length} selected`;
		}

		const singleValue = value as string;
		const option = findOption(singleValue);
		return option?.label || singleValue;
	};
}
