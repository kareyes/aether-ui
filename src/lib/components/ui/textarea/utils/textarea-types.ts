import type { WithElementRef, WithoutChildren } from "$lib/utils.js";
import type { HTMLTextareaAttributes } from "svelte/elements";
import type {
	TextareaVariant,
	TextareaSize,
	TextareaResize,
} from "./textarea-variants.js";

export type TextareaProps = WithoutChildren<
	WithElementRef<HTMLTextareaAttributes>
> & {
	variant?: TextareaVariant;
	size?: TextareaSize;
	resize?: TextareaResize;
	maxLength?: number;
	showCount?: boolean;
	autoResize?: boolean;
	minRows?: number;
	maxRows?: number;
	/**
	 * Error state - when true, applies error styling via aria-invalid
	 */
	error?: boolean;
	/**
	 * Loading state - when true, shows a spinner and disables the textarea
	 */
	loading?: boolean;
	/**
	 * Callback function called when an error state is detected
	 */
	onError?: (error: boolean) => void;
};
