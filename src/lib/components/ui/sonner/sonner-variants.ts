/**
 * Toast class maps, in a standalone module so they can be imported by tests and
 * consumers without going through the Svelte compiler — `bun test` has no
 * Svelte loader, so anything left inside `sonner.svelte` is unreachable from a
 * test. Same reason `button-variants.ts` and `card-variants.ts` exist.
 *
 * Styled the way `alert` is styled, and for the same reason.
 *
 * `alert` is a plain element carrying `data-slot="alert"` and a `tv()` map of
 * ordinary Tailwind classes. A theme's `.theme-x [data-slot="alert"]` rule
 * reshapes the frame while the variant still supplies the colour, and no
 * `!important` is needed anywhere, because nothing else is competing.
 *
 * svelte-sonner ships its own stylesheet, and its `[data-sonner-toast]
 * [data-styled='true']` rules used to win against every theme's toast rule, so
 * each one was dead. `Toaster` passes `unstyled`, which flips `data-styled` to
 * false and drops that whole block, leaving the motion, stacking, swipe and
 * positioning rules (which are not gated on it) untouched. What the block used
 * to provide — padding, surface, border, radius, the icon/content layout, the
 * buttons — is supplied here as classes instead, so the toast is now an
 * ordinary Tailwind-classed element and a theme reaches it exactly the way it
 * reaches an alert.
 *
 * Three things to know before editing these strings:
 *
 * - **Geometry and colour are split.** sonner puts `classes.toast` *and*
 *   `classes[type]` on the same element and joins them with a bare
 *   `filter(Boolean).join(' ')` — no tailwind-merge — so any property both
 *   strings set would be settled by Tailwind's emission order rather than by
 *   this file. `toastFrameClasses` therefore holds only radius/shadow/width and
 *   `toastSurfaceClasses` only background/text/border-colour: disjoint groups,
 *   nothing to resolve. Keep them disjoint. `default` is a real key here,
 *   because an untyped `toast()` is dispatched as `type: "default"`.
 * - **Theme rules beat every class here.** They are unlayered; these are
 *   utilities in `@layer utilities`, and unlayered wins whatever the
 *   specificity. Variants that must keep their own geometry or ground opt out
 *   on the theme side, matching `data-toast-variant` on the toaster
 *   (`sonner.svelte` sets it) rather than any class string here.
 * - **Some sonner rules survive `unstyled`.** The dark-mode
 *   `[data-close-button]` colours and the dark-mode `[data-description]` colour
 *   are not gated on `data-styled`. Those are handled by the custom-property
 *   bridge on the toaster and by one rule in `styles/theme.css` — not here,
 *   because no class can outrank them.
 */

import { cn } from "$lib/utils.js";
import { type VariantProps, tv } from "tailwind-variants";

export const toasterVariants = tv({
	base: "",
	variants: {
		position: {
			"top-left": "",
			"top-center": "",
			"top-right": "",
			"bottom-left": "",
			"bottom-center": "",
			"bottom-right": "",
		},
		variant: {
			default: "",
			bordered: "",
			filled: "",
			minimal: "",
		},
		size: {
			sm: "",
			default: "",
			lg: "",
		},
		expand: {
			true: "",
			false: "",
		},
		richColors: {
			true: "",
			false: "",
		},
		closeButton: {
			true: "",
			false: "",
		},
	},
	defaultVariants: {
		position: "bottom-right",
		variant: "default",
		size: "default",
		expand: false,
		richColors: true,
		closeButton: false,
	},
});

export type ToasterVariant = VariantProps<typeof toasterVariants>;
export type ToasterPosition = NonNullable<ToasterVariant["position"]>;
export type ToasterStyle = NonNullable<ToasterVariant["variant"]>;
export type ToasterSize = NonNullable<ToasterVariant["size"]>;

/**
 * The toast types that carry a surface. `default` is one of them — svelte-sonner
 * dispatches a bare `toast()` as `type: "default"`, so it reaches the class map
 * by the same lookup as the rest.
 */
export type ToastSurfaceType =
	| "default"
	| "success"
	| "error"
	| "warning"
	| "info"
	| "loading";

export const TOAST_SURFACE_TYPES: readonly ToastSurfaceType[] = [
	"default",
	"success",
	"error",
	"warning",
	"info",
	"loading",
];

interface SizeClasses {
	readonly toast: string;
	readonly title: string;
	readonly description: string;
	readonly button: string;
	readonly icon: string;
}

/**
 * Padding, type scale and icon box. `alert` is a single size; a toast is not,
 * so the scale lives here and the default row matches alert's
 * `px-4 py-3 text-sm`.
 */
export const toastSizeClasses: Readonly<Record<ToasterSize, SizeClasses>> = {
	sm: {
		toast: "gap-2 px-3 py-2 text-xs",
		title: "text-xs",
		description: "text-[11px]",
		button: "px-2 py-1 text-xs",
		icon: "size-3.5",
	},
	default: {
		toast: "gap-3 px-4 py-3 text-sm",
		title: "text-sm",
		description: "text-sm",
		button: "px-3 py-1.5 text-sm",
		icon: "size-4",
	},
	lg: {
		toast: "gap-3 px-5 py-4 text-base",
		title: "text-base",
		description: "text-sm",
		button: "px-4 py-2 text-base",
		icon: "size-5",
	},
};

/**
 * Radius, shadow and border *width*, per visual style. No colour — see the
 * split described at the top of this file.
 */
export const toastFrameClasses: Readonly<Record<ToasterStyle, string>> = {
	default: "rounded-lg shadow-lg",
	bordered: "rounded-lg border-l-4 shadow-md",
	filled: "rounded-lg shadow-xl",
	minimal: "rounded-none shadow-none",
};

/**
 * The surface, per visual style and type. Colour only. `default`'s row is
 * `alertVariants` verbatim — same tint, same border, same dark-mode border step
 * — so a toast and an alert reporting the same state read as the same object.
 */
export const toastSurfaceClasses: Readonly<
	Record<ToasterStyle, Readonly<Record<ToastSurfaceType, string>>>
> = {
	default: {
		default: "bg-card text-card-foreground border-border",
		success: "bg-success/10 text-success border-success dark:border-success/80",
		error:
			"bg-destructive/10 text-destructive border-destructive/30 dark:border-destructive/80",
		warning: "bg-warning/10 text-warning border-warning dark:border-warning/80",
		info: "bg-info/10 text-info border-info/30 dark:border-info/80",
		loading: "bg-muted text-muted-foreground border-border",
	},
	bordered: {
		default: "bg-card text-card-foreground border-border",
		success: "bg-card text-success border-border border-l-success",
		error: "bg-card text-destructive border-border border-l-destructive",
		warning: "bg-card text-warning border-border border-l-warning",
		info: "bg-card text-info border-border border-l-info",
		loading:
			"bg-card text-muted-foreground border-border border-l-muted-foreground",
	},
	filled: {
		default: "bg-foreground text-background border-transparent",
		success: "bg-success text-success-foreground border-transparent",
		error: "bg-destructive text-destructive-foreground border-transparent",
		warning: "bg-warning text-warning-foreground border-transparent",
		info: "bg-info text-info-foreground border-transparent",
		loading: "bg-muted-foreground text-background border-transparent",
	},
	minimal: {
		default:
			"bg-transparent text-foreground border-transparent border-b-border",
		success:
			"bg-transparent text-success border-transparent border-b-success/30 dark:border-b-success/40",
		error:
			"bg-transparent text-destructive border-transparent border-b-destructive/30 dark:border-b-destructive/40",
		warning:
			"bg-transparent text-warning border-transparent border-b-warning/30 dark:border-b-warning/40",
		info: "bg-transparent text-info border-transparent border-b-info/30 dark:border-b-info/40",
		loading:
			"bg-transparent text-muted-foreground border-transparent border-b-border",
	},
};

/**
 * The surface for one toast type. With `richColors` off, every type shares the
 * visual style's neutral surface.
 */
export const toastTypeClass = (
	variant: ToasterStyle,
	type: ToastSurfaceType,
	richColors: boolean,
): string =>
	richColors
		? toastSurfaceClasses[variant][type]
		: toastSurfaceClasses[variant].default;

export interface ToastClassOptions {
	readonly variant: ToasterStyle;
	readonly size: ToasterSize;
	readonly richColors: boolean;
}

export type ToastClasses = Readonly<Record<ToastSurfaceType, string>> & {
	readonly toast: string;
	readonly title: string;
	readonly description: string;
	readonly icon: string;
	readonly content: string;
	readonly loader: string;
	readonly actionButton: string;
	readonly cancelButton: string;
	readonly closeButton: string;
};

/** The `toastOptions.classes` map handed to svelte-sonner. */
export const buildToastClasses = ({
	variant,
	size,
	richColors,
}: ToastClassOptions): ToastClasses => {
	const sizes = toastSizeClasses[size];
	const typeClass = (type: ToastSurfaceType): string =>
		toastTypeClass(variant, type, richColors);

	return {
		// `alert`'s base, plus the flex row sonner's own sheet used to provide:
		// the toast element *is* the row holding `[data-icon]` and
		// `[data-content]`, where an alert wraps its children in one. Geometry
		// only — the colour arrives on the same element via the type key below.
		toast: cn(
			"group toast flex w-full items-center border",
			toastFrameClasses[variant],
			sizes.toast,
		),
		title: cn("font-semibold leading-none tracking-tight", sizes.title),
		// Dimmed rather than re-coloured, so it tracks the role colour on the
		// root the way `alert-description` does. Sonner's dark-mode
		// `[data-description]` colour is not gated on `data-styled` and would
		// win here; `styles/theme.css` puts the inheritance back.
		description: cn("opacity-90 [&_p]:leading-relaxed", sizes.description),
		// `relative` is load-bearing: sonner's loading spinner is absolutely
		// positioned with `inset: 0`, and without a positioned icon box it
		// escapes to the toast and lands over the text.
		icon: cn("relative flex shrink-0 items-center justify-start", sizes.icon),
		content: "flex flex-1 flex-col gap-1",
		loader: "shrink-0",
		actionButton: cn(
			"shrink-0 rounded-md bg-primary font-medium text-primary-foreground transition-colors hover:bg-primary/90",
			sizes.button,
		),
		cancelButton: cn(
			"shrink-0 rounded-md bg-muted font-medium text-muted-foreground transition-colors hover:bg-muted/80",
			sizes.button,
		),
		// Absolute placement came from the styled block too. The offsets are
		// direction-aware custom properties set on the toaster, so they survive.
		closeButton:
			"absolute top-0 left-(--toast-close-button-start) right-(--toast-close-button-end) flex size-5 items-center justify-center rounded-full border border-border bg-card p-0 text-card-foreground transition-colors [transform:var(--toast-close-button-transform)] hover:bg-muted",
		default: typeClass("default"),
		success: typeClass("success"),
		error: typeClass("error"),
		warning: typeClass("warning"),
		info: typeClass("info"),
		loading: typeClass("loading"),
	};
};
