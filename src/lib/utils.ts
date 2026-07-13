import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
	? Omit<T, "children">
	: T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
	ref?: U | null;
};

export function keysOf<T extends object>(obj: T) {
	return Object.keys(obj) as Array<keyof T>;
}

/**
 * The two hidden-input names a `name`d range picker mirrors its endpoints into
 * (ISO `YYYY-MM-DD`). The picker's popover triggers are buttons, not form
 * controls, so these hidden inputs are the only thing that gets submitted.
 *
 * Exported — and not inlined on either side — so a form action can read the
 * exact keys the picker writes instead of both ends hard-coding the separator
 * and silently drifting apart.
 */
export function rangeFieldNames(name: string): {
	readonly start: string;
	readonly end: string;
} {
	return { start: `${name}.start`, end: `${name}.end` };
}
