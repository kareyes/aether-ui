<script lang="ts">
	import { getContext } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import type { StepState } from "./stepper-variants.js";
	import { Check, X, Loader2 } from "@lucide/svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		step,
		label,
		description,
		icon,
		completed = false,
		error = false,
		disabled = false,
		loading = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		step: number;
		label?: string;
		description?: string;
		icon?: Snippet;
		completed?: boolean;
		error?: boolean;
		disabled?: boolean;
		loading?: boolean;
	} = $props();

	const context = getContext<any>("stepper");
	const variants = $derived(context.variants);
	const orientation = $derived(context.orientation);

	const isActive = $derived(context.activeStep === step);
	const isCompleted = $derived(completed || context.activeStep > step);
	const state: StepState = $derived(
		disabled ? "disabled" :
		error    ? "error"    :
		loading  ? "loading"  :
		isCompleted ? "completed" :
		isActive    ? "active"    : "inactive"
	);

	// Custom indicator override (null when not set)
	const ctx = $derived(context.indicatorCtx);
	const iconSizeClass = $derived(context.iconSizeClass);

	// Inline style overrides applied only when indicatorSize is set
	const buttonStyle = $derived(
		ctx
			? `width:${ctx.buttonSize}px;height:${ctx.buttonSize}px;font-size:${ctx.fontSize}px;`
			: undefined,
	);

	// Vertical connector line below button (thickness)
	const vLineStyle = $derived(
		ctx ? `width:${ctx.connectorThickness}px;` : undefined,
	);

	// Step gap override
	const stepGapStyle = $derived(
		ctx ? `gap:${Math.round(ctx.buttonSize * 0.2)}px;` : undefined,
	);

	// Register this step in context so the circular component can enumerate all steps
	$effect(() => {
		context.registerStep?.(step, label, description);
		return () => context.unregisterStep?.(step);
	});

	function handleClick() {
		if (context.clickable) {
			context.handleStepClick(step);
		}
	}
</script>

{#if orientation === "vertical"}
	<!--
		Vertical layout:
		  [left col: button + line below button]  [right col: content]

		The left column draws a line that extends from the button's bottom edge
		downward through the step's content height.  The StepperSeparator then
		continues with its own line segment, creating a seamless connector from
		button centre to button centre.

		"group" + "group-last:hidden" hides the line on the last step so the
		connector terminates cleanly at the final button.
	-->
	<div
		bind:this={ref}
		data-slot="stepper-step"
		data-state={state}
		class={cn(
			"group",
			variants.step(),
			context.mobileLayout === "scroll" && "max-sm:shrink-0",
			className,
		)}
		style={stepGapStyle}
		{...restProps}
	>
		<!-- Left column: self-stretch so it matches the right content column's height,
		     allowing flex-1 on the connector line to actually fill that space. -->
		<div class="flex flex-col items-center flex-shrink-0 self-stretch">
			<button
				type="button"
				data-state={state}
				class={cn(variants.stepButton(), "relative z-10")}
				style={buttonStyle}
				disabled={!context.clickable}
				onclick={handleClick}
			>
				{#if isCompleted}
					<Check class={iconSizeClass} />
				{:else if icon}
					{@render icon()}
				{:else}
					{step + 1}
				{/if}
			</button>

			<!--
				Connecting line below the button.
				- flex-1: fills remaining left-column height after the button
				- min-h-2: always shows at least 8px even with no content
				- group-last:hidden: hidden on the last step (no next step to connect to)
				- colour follows completion state instantly (separator animates separately)
			-->
			<div
				class={cn(
					"group-last:hidden flex-1 min-h-2 rounded-full transition-colors duration-500",
					isCompleted ? "bg-primary" : "bg-border",
					!ctx && "w-0.5",
				)}
				style={vLineStyle}
			></div>
		</div>

		<!-- Right column: label / description / custom children -->
		{#if label || description || children}
			<div
				class={cn(
					variants.stepContent(),
					// bottom padding creates breathing room above the separator's line;
					// removed on the last step where there is no separator below
					"pb-3 group-last:pb-0",
				)}
			>
				{#if label}
					<div class={variants.stepLabel()} data-state={state}>
						{label}
					</div>
				{/if}
				{#if description}
					<div
						class={cn(
							variants.stepDescription(),
							context.hideDescriptionOnMobile && "max-sm:hidden",
						)}
						data-state={state}
					>
						{description}
					</div>
				{/if}
				{#if children}
					{@render children?.()}
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<!-- Horizontal layout -->
	<div
		bind:this={ref}
		data-slot="stepper-step"
		data-state={state}
		class={cn(
			variants.step(),
			context.mobileLayout === "scroll" && "max-sm:shrink-0",
			className,
		)}
		{...restProps}
	>
		<button
			type="button"
			data-state={state}
			class={variants.stepButton()}
			style={buttonStyle}
			disabled={!context.clickable || disabled}
			onclick={handleClick}
		>
			{#if state === "error"}
				<X class={iconSizeClass} />
			{:else if state === "loading"}
				<Loader2 class={cn(iconSizeClass, "animate-spin")} />
			{:else if isCompleted}
				<Check class={iconSizeClass} />
			{:else if icon}
				{@render icon()}
			{:else}
				{step + 1}
			{/if}
		</button>

		{#if label || description || children}
			<div class={variants.stepContent()}>
				{#if label}
					<div class={variants.stepLabel()} data-state={state}>
						{label}
					</div>
				{/if}
				{#if description}
					<div
						class={cn(
							variants.stepDescription(),
							context.hideDescriptionOnMobile && "max-sm:hidden",
						)}
						data-state={state}
					>
						{description}
					</div>
				{/if}
				{#if children}
					{@render children?.()}
				{/if}
			</div>
		{/if}
	</div>
{/if}
