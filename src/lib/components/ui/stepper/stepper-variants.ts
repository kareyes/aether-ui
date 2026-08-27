import { tv, type VariantProps } from "tailwind-variants";
import type { Component } from "svelte";

/**
 * Icon size class for each step size level.
 * Consumed by stepper.svelte to derive context.iconSizeClass.
 */
export const ICON_SIZE_MAP = {
	xs: "size-3",
	sm: "size-3.5",
	default: "size-4",
	lg: "size-5",
} as const;

/**
 * Connector (line) Tailwind width class per size level.
 * Used for the vertical extending-line inside StepperStep.
 */
export const CONNECTOR_SIZE_MAP = {
	xs: "w-px",
	sm: "w-0.5",
	default: "w-0.5",
	lg: "w-0.5",
} as const;

/**
 * Size order for one-step responsive scale-down logic.
 * e.g. "lg" → "default" on tablet, "default" → "sm", etc.
 */
export const STEPPER_SIZE_ORDER = ["xs", "sm", "default", "lg"] as const;

export const stepperVariants = tv({
	slots: {
		root: ["flex gap-0"],
		step: ["flex items-center gap-2 relative", "transition-all duration-200"],
		stepButton: [
			"flex items-center justify-center rounded-full",
			"font-medium transition-all duration-300",
			"border-2 shrink-0",
			"disabled:cursor-not-allowed disabled:opacity-50",
			"transform-gpu",
			// Minimum 44 × 44 px touch target on small screens
			"max-sm:min-h-[44px] max-sm:min-w-[44px]",
			// Error state — always destructive regardless of variant
			"data-[state=error]:bg-destructive data-[state=error]:text-destructive-foreground data-[state=error]:border-destructive data-[state=error]:scale-100",
			// Disabled state — always muted regardless of variant
			"data-[state=disabled]:bg-muted data-[state=disabled]:text-muted-foreground data-[state=disabled]:border-muted data-[state=disabled]:opacity-50 data-[state=disabled]:cursor-not-allowed data-[state=disabled]:scale-95",
		],
		stepIcon: [
			"flex items-center justify-center",
			"transition-all duration-200",
		],
		stepContent: ["flex flex-col gap-1"],
		stepLabel: ["font-medium transition-colors duration-200"],
		stepDescription: ["text-muted-foreground transition-colors duration-200"],
		/**
		 * separator — outer container.
		 * Horizontal: acts as the bg-border track (absolute fill inside).
		 * Vertical: fixed-height row holding separatorColumn + line.
		 */
		separator: [
			"relative overflow-hidden rounded-full",
			"transition-all duration-200",
		],
		/**
		 * separatorColumn — vertical only.
		 * Width mirrors the step's left-column (button) width exactly,
		 * so justify-center always places the line over the button centre
		 * at every size and breakpoint — no hard-coded ml-[N]px.
		 */
		separatorColumn: ["flex flex-shrink-0 justify-center"],
		/**
		 * separatorLine — the animated fill element.
		 * Horizontal: absolute overlay animating width left→right.
		 * Vertical:   bg-border track, ::after animates height top→bottom.
		 */
		separatorLine: ["rounded-full", "transition-all duration-500 ease-in-out"],
	},

	variants: {
		orientation: {
			horizontal: {
				root: "flex-row items-start",
				step: "flex-col items-center",
				stepContent: "text-center",
				// Track: height + mt alignment set per-size in compound variants
				separator: "flex-1 bg-border",
				// Fill: animates width
				separatorLine:
					"absolute inset-0 bg-primary w-0 data-[state=completed]:w-full",
				separatorColumn: "hidden",
			},
			vertical: {
				root: "flex-col",
				// gap + items-start: set here; gap fine-tuned per-size in compound variants
				step: "flex-row items-start",
				stepContent: "text-left flex-1",
				// Container: holds separatorColumn; h, overflow etc.
				separator:
					"flex flex-row items-stretch overflow-visible !rounded-none !bg-transparent",
				// Track (bg-border) + animated ::after fill (bg-primary, height).
				// Width set per-size in compound variants.
				separatorLine: [
					"h-full bg-border relative overflow-hidden",
					"after:content-[''] after:absolute after:inset-x-0 after:top-0",
					"after:bg-primary after:rounded-full",
					"after:transition-[height] after:duration-500 after:ease-in-out",
					"data-[state=inactive]:after:h-0 data-[state=completed]:after:h-full",
				],
			},
		},

		size: {
			// Width, height, font: no max-md overrides — JS computes effectiveSize.
			xs: {
				stepButton: "size-6 text-xs",
				stepLabel: "text-xs",
				stepDescription: "text-[10px]",
			},
			sm: {
				stepButton: "size-8 text-sm",
				stepLabel: "text-sm",
				stepDescription: "text-xs",
			},
			default: {
				stepButton: "size-10 text-base",
				stepLabel: "text-base",
				stepDescription: "text-sm",
			},
			lg: {
				stepButton: "size-12 text-lg",
				stepLabel: "text-lg",
				stepDescription: "text-base",
			},
		},

		variant: {
			default: {
				stepButton: [
					"data-[state=completed]:bg-primary data-[state=completed]:text-primary-foreground data-[state=completed]:border-primary data-[state=completed]:scale-100",
					"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary data-[state=active]:scale-110 data-[state=active]:shadow-lg",
					"data-[state=inactive]:bg-background data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-border data-[state=inactive]:scale-95",
					"data-[state=loading]:bg-primary data-[state=loading]:text-primary-foreground data-[state=loading]:border-primary data-[state=loading]:scale-110 data-[state=loading]:shadow-lg",
				],
			},
			outline: {
				stepButton: [
					"data-[state=completed]:bg-background data-[state=completed]:text-primary data-[state=completed]:border-primary data-[state=completed]:scale-100",
					"data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:scale-110 data-[state=active]:shadow-lg",
					"data-[state=inactive]:bg-background data-[state=inactive]:text-muted-foreground data-[state=inactive]:border-border data-[state=inactive]:scale-95",
					"data-[state=loading]:bg-background data-[state=loading]:text-primary data-[state=loading]:border-primary data-[state=loading]:scale-110 data-[state=loading]:shadow-lg",
					"data-[state=error]:bg-background data-[state=error]:text-destructive data-[state=error]:border-destructive data-[state=error]:scale-110 data-[state=error]:shadow-lg",
				],
			},
			ghost: {
				stepButton: [
					"border-0",
					"data-[state=completed]:bg-primary/10 data-[state=completed]:text-primary data-[state=completed]:scale-100",
					"data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:scale-110 data-[state=active]:shadow-lg",
					"data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground data-[state=inactive]:scale-95",
					"data-[state=loading]:bg-primary/10 data-[state=loading]:text-primary data-[state=loading]:scale-110 data-[state=loading]:shadow-lg",
					"data-[state=error]:bg-destructive/20 data-[state=error]:text-destructive data-[state=error]:scale-110 data-[state=error]:shadow-lg",
				],
			},
			flat: {
				root: "gap-0",
				step: "relative flex-1",
				stepButton: [
					"rounded-none border-0 size-auto w-full h-1 bg-border relative z-10",
					"text-transparent select-none pointer-events-none",
					"data-[state=completed]:bg-primary",
					"data-[state=active]:bg-primary",
					"data-[state=inactive]:bg-border",
					"data-[state=loading]:bg-primary",
					"data-[state=error]:bg-destructive",
					"data-[state=disabled]:bg-muted data-[state=disabled]:opacity-50",
				],
				separator: "hidden",
				separatorColumn: "hidden",
				separatorLine: "hidden",
				stepContent:
					"absolute -top-10 left-0 right-0 flex flex-col items-start gap-0.5 mb-2",
				stepLabel: [
					"text-sm font-medium whitespace-nowrap",
					"data-[state=completed]:text-primary",
					"data-[state=active]:text-primary",
					"data-[state=inactive]:text-muted-foreground",
					"data-[state=loading]:text-primary",
					"data-[state=error]:text-destructive",
					"data-[state=disabled]:text-muted-foreground data-[state=disabled]:opacity-50",
				],
				stepDescription: [
					"text-xs",
					"data-[state=completed]:text-primary/70",
					"data-[state=active]:text-primary/70",
					"data-[state=inactive]:text-muted-foreground",
					"data-[state=loading]:text-primary/70",
					"data-[state=error]:text-destructive/70",
					"data-[state=disabled]:text-muted-foreground data-[state=disabled]:opacity-50",
				],
			},
		},

		clickable: {
			true: {
				stepButton: "cursor-pointer hover:scale-105 active:scale-95",
			},
			false: {
				stepButton: "cursor-default",
			},
		},

		mobileLayout: {
			vertical: {},
			scroll: {
				root: "max-sm:overflow-x-auto max-sm:[scrollbar-width:none]",
			},
			// circular: all behavior is JS-driven in stepper.svelte; no CSS classes needed
			circular: {},
		},
	},

	compoundVariants: [
		// ─── Horizontal ──────────────────────────────────────────────────────────
		// Connector thickness (h-N) + margin-top so the track centre aligns with
		// the button centre:  mt = (button_size / 2) - (connector_height / 2)
		//
		//   xs      size-6 = 24 px  → h-px  (1 px) → mt = 12 - 0.5 = 11.5 → 12 px
		//   sm      size-8 = 32 px  → h-0.5 (2 px) → mt = 16 - 1   = 15   px
		//   default size-10= 40 px  → h-0.5 (2 px) → mt = 20 - 1   = 19   px
		//   lg      size-12= 48 px  → h-0.5 (2 px) → mt = 24 - 1   = 23   px
		{
			orientation: "horizontal",
			size: "xs",
			class: { separator: "h-px mt-[12px]" },
		},
		{
			orientation: "horizontal",
			size: "sm",
			class: { separator: "h-0.5 mt-[15px]" },
		},
		{
			orientation: "horizontal",
			size: "default",
			class: { separator: "h-0.5 mt-[19px]" },
		},
		{
			orientation: "horizontal",
			size: "lg",
			class: { separator: "h-0.5 mt-[23px]" },
		},

		// ─── Vertical ────────────────────────────────────────────────────────────
		// separator height (spacing between steps)
		// separatorColumn width (must equal button size for perfect centre alignment)
		// separatorLine width (connector thickness)
		// step gap (space between indicator column and content column)
		//
		//   xs      button=24 px  col=w-6  line=w-px   gap-1.5  sep=h-12
		//   sm      button=32 px  col=w-8  line=w-0.5  gap-2    sep=h-16
		//   default button=40 px  col=w-10 line=w-0.5  gap-3    sep=h-20
		//   lg      button=48 px  col=w-12 line=w-0.5  gap-4    sep=h-24
		{
			orientation: "vertical",
			size: "xs",
			class: {
				separator: "h-12",
				separatorColumn: "w-6",
				separatorLine: "w-px",
				step: "gap-1.5",
			},
		},
		{
			orientation: "vertical",
			size: "sm",
			class: {
				separator: "h-16",
				separatorColumn: "w-8",
				separatorLine: "w-0.5",
				step: "gap-2",
			},
		},
		{
			orientation: "vertical",
			size: "default",
			class: {
				separator: "h-20",
				separatorColumn: "w-10",
				separatorLine: "w-0.5",
				step: "gap-3",
			},
		},
		{
			orientation: "vertical",
			size: "lg",
			class: {
				separator: "h-24",
				separatorColumn: "w-12",
				separatorLine: "w-0.5",
				step: "gap-4",
			},
		},
	],

	defaultVariants: {
		orientation: "horizontal",
		size: "default",
		variant: "default",
		clickable: false,
		mobileLayout: "vertical",
	},
});

export type StepperVariants = VariantProps<typeof stepperVariants>;
export type StepperOrientation = NonNullable<StepperVariants["orientation"]>;
export type StepperSize = NonNullable<StepperVariants["size"]>;
export type StepperVariant = NonNullable<StepperVariants["variant"]>;
export type StepperMobileLayout = NonNullable<StepperVariants["mobileLayout"]>;
export type StepState =
	| "inactive"
	| "active"
	| "completed"
	| "error"
	| "disabled"
	| "loading";

/** A single step definition for the declarative {@link Stepper} component. */
export type StepItem = {
	/** Step label displayed next to or below the indicator. */
	label?: string;
	/** Optional short description shown below the label. */
	description?: string;
	/** Svelte component rendered as the step indicator icon (e.g. a Lucide icon). */
	icon?: Component;
	/** Show error state — renders an X icon and destructive colors. */
	error?: boolean;
	/** Disable the step — grayed out, not clickable even when the stepper is clickable. */
	disabled?: boolean;
	/** Show loading state — renders a spinner and active colors. */
	loading?: boolean;
};
