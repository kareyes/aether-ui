<script lang="ts">
	import { setContext } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";
	import StepperCircular from "./stepper-circular.svelte";
	import {
		stepperVariants,
		type StepperVariants,
		type StepperMobileLayout,
		type StepperSize,
		type StepItem,
		ICON_SIZE_MAP,
		CONNECTOR_SIZE_MAP,
		STEPPER_SIZE_ORDER,
	} from "./stepper-variants.js";
	import StepperStepComp from "./stepper-step.svelte";
	import StepperSeparatorComp from "./stepper-separator.svelte";

	// Pixel sizes for each named size level (button diameter)
	const SIZE_PX: Record<StepperSize, number> = {
		xs: 24,
		sm: 32,
		default: 40,
		lg: 48,
	};

	// Font sizes for each named size level
	const FONT_SIZE_PX: Record<StepperSize, number> = {
		xs: 12,
		sm: 14,
		default: 16,
		lg: 18,
	};

	// Icon sizes (px) per named size level
	const ICON_PX: Record<StepperSize, number> = {
		xs: 12,
		sm: 14,
		default: 16,
		lg: 20,
	};

	// Connector thickness (px) per named size level
	const CONNECTOR_PX: Record<StepperSize, number> = {
		xs: 1,
		sm: 2,
		default: 2,
		lg: 2,
	};

	// Vertical separator height (px) per size
	const SEPARATOR_H_PX: Record<StepperSize, number> = {
		xs: 48,
		sm: 64,
		default: 80,
		lg: 96,
	};

	// Horizontal connector thickness + margin-top (px) per size
	const H_CONNECTOR_H_PX: Record<StepperSize, number> = {
		xs: 1,
		sm: 2,
		default: 2,
		lg: 2,
	};
	let {
		ref = $bindable(null),
		class: className,
		children,
		orientation = "horizontal",
		size = "sm",
		variant = "default",
		activeStep = $bindable(0),
		clickable = false,
		mobileLayout = "circular",
		hideDescriptionOnMobile = false,
		indicatorSize,
		disableResponsiveScaling = false,
		circularSize = 72,
		circularExpandable = true,
		circularAlways = false,
		onStepClick,
		steps,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> &
		StepperVariants & {
			activeStep?: number;
			/** How the stepper behaves on mobile (<640px).
			 * - "vertical": auto-switches to vertical layout (default)
			 * - "scroll": stays horizontal with overflow scroll
			 * - "circular": shows a radial progress ring instead of the step list
			 */
			mobileLayout?: StepperMobileLayout;
			/** Hide step descriptions on mobile screens */
			hideDescriptionOnMobile?: boolean;
			/**
			 * Override the step indicator diameter in pixels.
			 * When set, takes precedence over the `size` prop for indicator dimensions.
			 * All related measurements (font, icon, connector) scale proportionally.
			 */
			indicatorSize?: number;
			/**
			 * Opt-out of automatic one-level size scale-down on tablet (≤768px).
			 * Defaults to false (scaling enabled).
			 */
			disableResponsiveScaling?: boolean;
			/**
			 * Diameter of the circular progress ring in pixels (120–200 recommended).
			 * Only applies when mobileLayout="circular".
			 * @default 160
			 */
			circularSize?: number;
			/**
			 * Whether clicking the circular ring opens the step-list drawer.
			 * @default true
			 */
			circularExpandable?: boolean;
			/**
			 * Force circular mode at all breakpoints (desktop + mobile).
			 * Useful for previewing or embedding in compact spaces.
			 * @default false
			 */
			circularAlways?: boolean;
			onStepClick?: (step: number) => void;
			/**
			 * Declarative step definitions. When provided, separators are auto-inserted
			 * and completed state is derived from activeStep. Takes precedence over children.
			 */
			steps?: StepItem[];
		} = $props();

	// ─── Breakpoint detection ─────────────────────────────────────────────────
	const isMobile = new IsMobile(640);
	const isTablet = new IsMobile(768);

	// ─── Orientation ─────────────────────────────────────────────────────────
	// When mobileLayout="vertical", flip orientation to vertical on mobile
	const effectiveOrientation = $derived(
		mobileLayout === "vertical" && isMobile.current
			? "vertical"
			: orientation,
	);

	// ─── Responsive size scaling (JS-driven, no max-md: CSS) ─────────────────
	const effectiveSize = $derived((): StepperSize => {
		if (disableResponsiveScaling || !isTablet.current)
			return size as StepperSize;
		const idx = STEPPER_SIZE_ORDER.indexOf(size as StepperSize);
		if (idx <= 0) return size as StepperSize;
		return STEPPER_SIZE_ORDER[idx - 1];
	});

	// ─── Custom indicatorSize override ───────────────────────────────────────
	const indicatorCtx = $derived(
		(): {
			buttonSize: number;
			fontSize: number;
			iconSize: number;
			connectorThickness: number;
			separatorHeight: number;
			columnWidth: number;
			hConnectorHeight: number;
			hConnectorMt: number;
		} | null => {
			if (!indicatorSize) return null;
			const base = SIZE_PX[effectiveSize()];
			const ratio = indicatorSize / base;
			return {
				buttonSize: indicatorSize,
				fontSize: Math.round(FONT_SIZE_PX[effectiveSize()] * ratio),
				iconSize: Math.round(ICON_PX[effectiveSize()] * ratio),
				connectorThickness: Math.max(
					1,
					Math.round(CONNECTOR_PX[effectiveSize()] * ratio),
				),
				separatorHeight: Math.round(
					SEPARATOR_H_PX[effectiveSize()] * ratio,
				),
				columnWidth: indicatorSize,
				hConnectorHeight: Math.max(
					1,
					Math.round(H_CONNECTOR_H_PX[effectiveSize()] * ratio),
				),
				hConnectorMt: Math.round(
					indicatorSize / 2 -
						Math.max(
							1,
							Math.round(
								H_CONNECTOR_H_PX[effectiveSize()] * ratio,
							),
						) /
							2,
				),
			};
		},
	);

	const iconSizeClass = $derived(ICON_SIZE_MAP[effectiveSize()]);
	const connectorSizeClass = $derived(CONNECTOR_SIZE_MAP[effectiveSize()]);

	// ─── Tailwind variants (pass effectiveSize for compound variants) ─────────
	const variants = $derived(
		stepperVariants({
			orientation: effectiveOrientation,
			size: effectiveSize(),
			variant,
			clickable,
			mobileLayout,
		}),
	);

	// ─── Step registration (for circular mode) ────────────────────────────────
	// Each StepperStep registers itself via $effect so the circular component
	// can enumerate all steps, labels, and descriptions without needing explicit props.
	let stepData = $state<
		Record<number, { label?: string; description?: string }>
	>({});

	function registerStep(step: number, label?: string, description?: string) {
		stepData[step] = { label, description };
	}

	function unregisterStep(step: number) {
		delete stepData[step];
	}

	const totalSteps = $derived(Object.keys(stepData).length);
	const currentStepLabel = $derived(stepData[activeStep]?.label ?? "");

	// ─── Whether circular mode is active ─────────────────────────────────────
	const isCircularMode = $derived(
		mobileLayout === "circular" || circularAlways,
	);

	// ─── Context ─────────────────────────────────────────────────────────────
	setContext("stepper", {
		get orientation() {
			return effectiveOrientation;
		},
		get size() {
			return effectiveSize();
		},
		get variant() {
			return variant;
		},
		get clickable() {
			return clickable;
		},
		get activeStep() {
			return activeStep;
		},
		get variants() {
			return variants;
		},
		get mobileLayout() {
			return mobileLayout;
		},
		get hideDescriptionOnMobile() {
			return hideDescriptionOnMobile;
		},
		get indicatorCtx() {
			return indicatorCtx();
		},
		get iconSizeClass() {
			return iconSizeClass;
		},
		get connectorSizeClass() {
			return connectorSizeClass;
		},
		// Circular-specific context
		get totalSteps() {
			return totalSteps;
		},
		get currentStepLabel() {
			return currentStepLabel;
		},
		get stepData() {
			return stepData;
		},
		get circularSize() {
			return circularSize;
		},
		get circularExpandable() {
			return circularExpandable;
		},
		registerStep,
		unregisterStep,
		handleStepClick: (step: number) => {
			if (clickable) {
				activeStep = step;
				onStepClick?.(step);
			}
		},
	});
</script>

<!--
	stepContent: renders the declarative `steps` array when provided,
	otherwise falls back to the `children` snippet (primitive API).
	This snippet is always defined inside StepperRoot so that StepperStep
	components created by either path can call getContext("stepper") correctly.
-->
{#snippet stepContent()}
	{#if steps && steps.length > 0}
		{#each steps as stepItem, i}
			{#snippet stepIcon()}
				{@const Icon = stepItem.icon}
				{#if Icon}<Icon class={iconSizeClass} />{/if}
			{/snippet}
			<StepperStepComp
				step={i}
				label={stepItem.label}
				description={stepItem.description}
				icon={stepItem.icon ? stepIcon : undefined}
				error={stepItem.error}
				disabled={stepItem.disabled}
				loading={stepItem.loading}
			/>
			{#if i < steps.length - 1}
				<StepperSeparatorComp completed={activeStep > i} />
			{/if}
		{/each}
	{:else}
		{@render children?.()}
	{/if}
{/snippet}

{#if isCircularMode}
	<!--
		Circular mode: two sibling sections — only CSS display toggles between them.
		This prevents layout shift and ensures steps are always registered in context
		(StepperStep $effects run even when the desktop list is visually hidden).
	-->
	<div
		bind:this={ref}
		data-slot="stepper"
		class={cn("w-full", className)}
		data-orientation={orientation}
		{...restProps}
	>
		<!-- Desktop: normal horizontal stepper (hidden below md, or always hidden if circularAlways) -->
		<div
			class={cn(
				variants.root(),
				circularAlways ? "hidden" : "max-md:hidden",
			)}
			data-orientation="horizontal"
		>
			{@render stepContent()}
		</div>

		<!-- Circular widget: shown below md (or always if circularAlways) -->
		<div
			class={cn(
				"flex justify-center items-center",
				circularAlways ? "" : "md:hidden",
			)}
		>
			<StepperCircular />
		</div>
	</div>
{:else}
	<!-- Non-circular mode: original behaviour unchanged -->
	<div
		bind:this={ref}
		data-slot="stepper"
		class={cn(variants.root(), className)}
		data-orientation={effectiveOrientation}
		{...restProps}
	>
		{@render stepContent()}
	</div>
{/if}
