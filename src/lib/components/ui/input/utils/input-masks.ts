/**
 * Input masking utilities
 * Provides types, predefined patterns, and helper functions for input masking
 */

// Mask pattern type definition
export type MaskPattern = {
	/** Regular expression to validate input characters */
	pattern: RegExp;
	/** Placeholder text to show the expected format */
	placeholder: string;
	/** Optional function to transform/format the input value */
	transform?: (value: string) => string;
	/** Optional maximum length for the input */
	maxLength?: number;
};

// Configuration type for the createMask helper
export interface MaskConfig {
	/** Characters allowed in input (e.g., 'd' for digits, 'a' for letters, 'x' for alphanumeric) */
	format: string;
	/** Placeholder showing the expected format */
	placeholder: string;
	/** Optional separators to insert at specific positions */
	separators?: { position: number; char: string }[];
	/** Case transformation: 'upper', 'lower', or 'none' */
	case?: "upper" | "lower" | "none";
}

/**
 * Helper function to create common mask patterns
 *
 * @param config - Mask configuration object
 * @returns MaskPattern object
 *
 * @example
 * ```typescript
 * const licensePlateMask = createMask({
 *   format: 'dx',
 *   placeholder: 'ABC-1234',
 *   separators: [{ position: 3, char: '-' }],
 *   case: 'upper'
 * });
 * ```
 */
export function createMask(config: MaskConfig): MaskPattern {
	// Build regex pattern based on format string
	let regexPattern = "^[";
	if (config.format.includes("d")) regexPattern += "\\d";
	if (config.format.includes("a")) regexPattern += "a-zA-Z";
	if (config.format.includes("x")) regexPattern += "\\da-zA-Z";
	if (config.format.includes("s")) regexPattern += "\\s";

	// Add separator characters if defined
	if (config.separators) {
		config.separators.forEach((sep) => {
			regexPattern += `\\${sep.char}`;
		});
	}
	regexPattern += "]*$";

	return {
		pattern: new RegExp(regexPattern),
		placeholder: config.placeholder,
		maxLength: config.placeholder.length,
		transform: (value: string) => {
			let result = value;

			// Apply case transformation
			if (config.case === "upper") result = result.toUpperCase();
			if (config.case === "lower") result = result.toLowerCase();

			// Apply separators
			if (config.separators) {
				config.separators.forEach((sep) => {
					if (result.length > sep.position) {
						const before = result.slice(0, sep.position);
						const after = result.slice(sep.position);
						if (!before.endsWith(sep.char)) {
							result = before + sep.char + after;
						}
					}
				});
			}

			return result;
		},
	};
}

/**
 * Predefined mask patterns for common input types
 */
export const maskPatterns: Record<string, MaskPattern> = {
	phone: {
		pattern: /^[\d\s\-\(\)\+]*$/,
		placeholder: "(555) 123-4567",
		maxLength: 14,
		transform: (value: string) => {
			// Remove all non-digits
			const digits = value.replace(/\D/g, "");
			if (digits.length <= 3) return digits;
			if (digits.length <= 6)
				return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
			return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
		},
	},
	ssn: {
		pattern: /^[\d\-]*$/,
		placeholder: "123-45-6789",
		maxLength: 11,
		transform: (value: string) => {
			const digits = value.replace(/\D/g, "");
			if (digits.length <= 3) return digits;
			if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
			return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
		},
	},
	creditCard: {
		pattern: /^[\d\s]*$/,
		placeholder: "1234 5678 9012 3456",
		maxLength: 19,
		transform: (value: string) => {
			const digits = value.replace(/\D/g, "");
			return digits.replace(/(.{4})/g, "$1 ").trim();
		},
	},
	date: {
		pattern: /^[\d\/]*$/,
		placeholder: "MM/DD/YYYY",
		maxLength: 10,
		transform: (value: string) => {
			const digits = value.replace(/\D/g, "");
			if (digits.length <= 2) return digits;
			if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
			return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
		},
	},
	time: {
		pattern: /^[\d:]*$/,
		placeholder: "HH:MM",
		maxLength: 5,
		transform: (value: string) => {
			const digits = value.replace(/\D/g, "");
			if (digits.length <= 2) return digits;
			return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
		},
	},
};

export type MaskType = keyof typeof maskPatterns;

/**
 * Validates input value against a mask pattern
 *
 * @param value - The input value to validate
 * @param maskConfig - The mask configuration
 * @returns true if valid, false otherwise
 */
export function validateMask(value: string, maskConfig: MaskPattern): boolean {
	// Check max length if specified
	if (maskConfig.maxLength && value.length > maskConfig.maxLength) {
		return false;
	}

	// Test against pattern
	return maskConfig.pattern.test(value);
}

/**
 * Applies mask transformation to a value
 *
 * @param value - The input value to transform
 * @param maskConfig - The mask configuration
 * @returns The transformed value
 */
export function applyMaskTransform(
	value: string,
	maskConfig: MaskPattern,
): string {
	if (!maskConfig.transform) return value;
	return maskConfig.transform(value);
}

/**
 * Gets the appropriate placeholder text for a mask
 *
 * @param mask - The mask type or pattern
 * @param fallbackPlaceholder - Fallback placeholder if no mask placeholder
 * @returns The placeholder text
 */
export function getMaskPlaceholder(
	mask: MaskType | MaskPattern | undefined,
	fallbackPlaceholder?: string,
): string | undefined {
	if (!mask) return fallbackPlaceholder;
	const maskConfig = typeof mask === "string" ? maskPatterns[mask] : mask;
	return maskConfig.placeholder || fallbackPlaceholder;
}

/**
 * Common mask patterns that can be used with createMask
 */
export const commonMaskFormats = {
	/** Letters only (a-z, A-Z) */
	LETTERS: "a",
	/** Digits only (0-9) */
	DIGITS: "d",
	/** Alphanumeric (letters and digits) */
	ALPHANUMERIC: "x",
	/** Letters, digits, and spaces */
	ALPHANUMERIC_SPACE: "xs",
	/** Letters and spaces */
	LETTERS_SPACE: "as",
	/** Digits and spaces */
	DIGITS_SPACE: "ds",
} as const;

/**
 * Predefined separator configurations for common patterns
 */
export const commonSeparators = {
	/** Dash separator for license plates, product codes, etc. */
	DASH: { char: "-" },
	/** Colon separator for time, MAC addresses, etc. */
	COLON: { char: ":" },
	/** Slash separator for dates */
	SLASH: { char: "/" },
	/** Dot separator for IP addresses, versions, etc. */
	DOT: { char: "." },
	/** Space separator for credit cards, phone numbers, etc. */
	SPACE: { char: " " },
} as const;

/**
 * Creates a license plate mask (ABC-1234)
 */
export function createLicensePlateMask(): MaskPattern {
	return createMask({
		format: "dx",
		placeholder: "ABC-1234",
		separators: [{ position: 3, char: "-" }],
		case: "upper",
	});
}

/**
 * Creates a product code mask (PROD-12345)
 */
export function createProductCodeMask(prefix: string = "PROD"): MaskPattern {
	const placeholder = `${prefix}-12345`;
	return {
		pattern: /^[A-Z0-9\-]*$/,
		placeholder,
		maxLength: placeholder.length,
		transform: (value: string) => {
			const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
			return clean.length > 0 ? `${prefix}-${clean}` : clean;
		},
	};
}

/**
 * Creates a hex color mask (#FF5733)
 */
export function createHexColorMask(): MaskPattern {
	return {
		pattern: /^#[A-Fa-f0-9]*$/,
		placeholder: "#FF5733",
		maxLength: 7,
		transform: (value: string) => {
			let clean = value.replace(/[^A-Fa-f0-9]/g, "");
			if (clean.length > 0 && !value.startsWith("#")) {
				clean = "#" + clean;
			}
			return clean.toUpperCase();
		},
	};
}

/**
 * Creates an IP address mask (192.168.1.1)
 */
export function createIpAddressMask(): MaskPattern {
	return {
		pattern: /^[\d\.]*$/,
		placeholder: "192.168.1.1",
		maxLength: 15,
		transform: (value: string) => {
			const parts = value.split(".");
			return parts
				.map((part) => {
					const num = parseInt(part);
					return isNaN(num) || num > 255 ? part.slice(0, -1) : part;
				})
				.join(".");
		},
	};
}
