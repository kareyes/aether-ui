import {
	toast as sonnerToast,
	type ExternalToast as SonnerExternalToast,
} from "svelte-sonner";
import type { Component, Snippet } from "svelte";

/**
 * Toast type variants
 */
export type ToastType =
	| "default"
	| "success"
	| "error"
	| "warning"
	| "info"
	| "loading"
	| "promise";

/**
 * Toast action button configuration
 */
export interface ToastAction {
	label: string;
	onClick: (event: MouseEvent) => void;
}

/**
 * Extended toast options with our custom configurations
 */
export interface ToastOptions
	extends Omit<SonnerExternalToast, "action" | "cancel"> {
	/** Toast description/message */
	description?: string;
	/** Duration in ms (0 = no auto-dismiss) */
	duration?: number;
	/** Whether the toast can be dismissed by clicking */
	dismissible?: boolean;
	/** Custom icon component */
	icon?: Component;
	/** Action button configuration */
	action?: ToastAction;
	/** Cancel button configuration */
	cancel?: ToastAction;
	/** Callback when toast is dismissed */
	onDismiss?: (toast: unknown) => void;
	/** Callback when toast auto-closes */
	onAutoClose?: (toast: unknown) => void;
	/** Custom class for the toast */
	class?: string;
	/** Custom class for the description */
	descriptionClass?: string;
	/** Custom inline styles */
	style?: string;
	/** Position override for this specific toast */
	position?:
		| "top-left"
		| "top-center"
		| "top-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right";
	/** Important toast that stays on top */
	important?: boolean;
	/** Custom ID for the toast */
	id?: string | number;
}

/**
 * Promise toast state callbacks
 */
export interface PromiseOptions<T> {
	loading: string;
	success: string | ((data: T) => string);
	error: string | ((error: unknown) => string);
	description?: string | ((data: T | unknown) => string);
	finally?: () => void;
}

/**
 * Converts our ToastAction to sonner's expected format
 */
function convertAction(action?: ToastAction): SonnerExternalToast["action"] {
	if (!action) return undefined;
	return {
		label: action.label,
		onClick: action.onClick,
	};
}

/**
 * Converts our ToastAction to sonner's cancel format
 */
function convertCancel(cancel?: ToastAction): SonnerExternalToast["cancel"] {
	if (!cancel) return undefined;
	return {
		label: cancel.label,
		onClick: cancel.onClick,
	};
}

/**
 * Creates the sonner options from our extended options
 */
function createSonnerOptions(options?: ToastOptions): SonnerExternalToast {
	if (!options) return {};

	const { action, cancel, ...rest } = options;
	return {
		...rest,
		action: convertAction(action),
		cancel: convertCancel(cancel),
	};
}

/**
 * Enhanced toast function with type-safe variants
 */
function createToast(message: string, options?: ToastOptions) {
	return sonnerToast(message, createSonnerOptions(options));
}

/**
 * Success toast - for successful operations
 */
function success(message: string, options?: ToastOptions) {
	return sonnerToast.success(message, createSonnerOptions(options));
}

/**
 * Error toast - for error states
 */
function error(message: string, options?: ToastOptions) {
	return sonnerToast.error(message, createSonnerOptions(options));
}

/**
 * Warning toast - for warnings
 */
function warning(message: string, options?: ToastOptions) {
	return sonnerToast.warning(message, createSonnerOptions(options));
}

/**
 * Info toast - for informational messages
 */
function info(message: string, options?: ToastOptions) {
	return sonnerToast.info(message, createSonnerOptions(options));
}

/**
 * Loading toast - for loading states
 */
function loading(message: string, options?: ToastOptions) {
	return sonnerToast.loading(message, createSonnerOptions(options));
}

/**
 * Promise toast - shows loading, then success/error based on promise result
 */
function promise<T>(
	promiseOrFn: Promise<T> | (() => Promise<T>),
	promiseOptions: PromiseOptions<T>,
) {
	return sonnerToast.promise(promiseOrFn, promiseOptions);
}

/**
 * Custom toast with a Svelte component
 */
function custom(component: Component, options?: ToastOptions) {
	return sonnerToast.custom(component, createSonnerOptions(options));
}

/**
 * Dismiss a specific toast by id or all toasts
 */
function dismiss(id?: string | number) {
	return sonnerToast.dismiss(id);
}

/**
 * Message toast (alias for default)
 */
function message(msg: string, options?: ToastOptions) {
	return sonnerToast.message(msg, createSonnerOptions(options));
}

/**
 * Toast utility object with all variants
 */
export const toast = Object.assign(createToast, {
	success,
	error,
	warning,
	info,
	loading,
	promise,
	custom,
	dismiss,
	message,
});

export type { SonnerExternalToast };
