<script lang="ts">
	import { getContext } from "svelte";
	import { cn } from "$lib/utils.js";
	import { Check, ChevronRight } from "@lucide/svelte";
	import {
		Sheet,
		SheetContent,
		SheetHeader,
		SheetTitle,
	} from "$lib/components/ui/sheet/index.js";

	const context = getContext<any>("stepper");

	// ─── Reactive reads from stepper context ─────────────────────────────────
	const activeStep = $derived(context.activeStep);
	const totalSteps = $derived(context.totalSteps);
	const stepData = $derived(context.stepData);
	const currentLabel = $derived(context.currentStepLabel);
	const clickable = $derived(context.clickable);
	const circularSize = $derived(context.circularSize as number);
	const expandable = $derived(context.circularExpandable as boolean);

	// Hint: next step's label shown below the current label
	const nextStepLabel = $derived(stepData[activeStep + 1]?.label ?? "");

	// ─── Drawer state ────────────────────────────────────────────────────────
	let isDrawerOpen = $state(false);

	// ─── SVG geometry ────────────────────────────────────────────────────────
	// Stroke thickness: 10% of radius, clamped 3–6px for compact sizes
	const strokeWidth = $derived(Math.round(Math.max(3, Math.min(6, circularSize * 0.06))));
	const center = $derived(circularSize / 2);
	const radius = $derived(center - strokeWidth / 2 - 1);
	const circumference = $derived(2 * Math.PI * radius);

	// Step 0 of N = 1/N so the ring is never completely empty
	const progress = $derived(totalSteps > 0 ? (activeStep + 1) / totalSteps : 0);
	const dashOffset = $derived(circumference * (1 - progress));
	const isComplete = $derived(totalSteps > 0 && activeStep >= totalSteps - 1);

	// Counter font: scales with ring size but clamped to readable bounds
	const counterFontSize = $derived(Math.round(Math.max(9, Math.min(18, circularSize * 0.18))));
	const checkSize = $derived(Math.round(circularSize * 0.38));

	// ─── Sorted steps for the drawer ─────────────────────────────────────────
	const sortedSteps = $derived(
		Object.entries(stepData)
			.map(([k, v]) => [Number(k), v] as [number, { label?: string; description?: string }])
			.sort(([a], [b]) => a - b),
	);

	// ─── Helpers ─────────────────────────────────────────────────────────────
	function openDrawer() {
		if (expandable && totalSteps > 0) isDrawerOpen = true;
	}

	function navigateStep(step: number) {
		context.handleStepClick(step);
		isDrawerOpen = false;
	}

	function prev() {
		if (activeStep > 0) context.handleStepClick(activeStep - 1);
	}

	function next() {
		if (activeStep < totalSteps - 1) context.handleStepClick(activeStep + 1);
	}
</script>

<!--
	Compact horizontal layout (matches mobile mockup):

	  ┌─────────────────────────────────────────────┐
	  │  [ring]   Current Step Label         [›]    │
	  │  2 of 5   Next: Next Step Name              │
	  └─────────────────────────────────────────────┘

	Ring on the left, step info text takes the remaining width.
	Chevron on the far right signals the drawer is available.
	Prev / Next buttons appear below only when the stepper is clickable.
-->
<div class="w-full py-1">
	<!-- ── Main row: ring + text + expand chevron ─────────────────────────── -->
	{#if expandable}
		<button
			type="button"
			class={cn(
				"flex items-center gap-3 w-full text-left",
				"rounded-xl transition-colors duration-150",
				"hover:bg-muted/60 active:bg-muted",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
				"p-2 -mx-2",
			)}
			onclick={openDrawer}
			aria-label={`View all steps — step ${activeStep + 1} of ${totalSteps}`}
		>
			{@render rowContent()}
		</button>
	{:else}
		<div
			class="flex items-center gap-3 w-full p-2 -mx-2"
			aria-label={`Step ${activeStep + 1} of ${totalSteps}`}
			role="img"
		>
			{@render rowContent()}
		</div>
	{/if}

	<!-- ── Prev / Next navigation (below row, only when clickable) ─────────── -->
	{#if clickable && totalSteps > 1}
		<div class="flex items-center gap-2 mt-3 ml-1">
			<button
				type="button"
				onclick={prev}
				disabled={activeStep === 0}
				class={cn(
					"text-sm font-medium px-3 py-1 rounded-md border border-border",
					"transition-colors hover:bg-muted",
					"disabled:opacity-35 disabled:cursor-not-allowed",
				)}
				aria-label="Previous step"
			>Prev</button>

			<button
				type="button"
				onclick={next}
				disabled={activeStep >= totalSteps - 1}
				class={cn(
					"text-sm font-medium px-3 py-1 rounded-md",
					"bg-primary text-primary-foreground",
					"transition-opacity hover:opacity-90",
					"disabled:opacity-35 disabled:cursor-not-allowed",
				)}
				aria-label="Next step"
			>{isComplete ? "Done" : activeStep === totalSteps - 2 ? "Finish" : "Next"}</button>
		</div>
	{/if}
</div>

<!-- ── Step list drawer ───────────────────────────────────────────────────── -->
<Sheet bind:open={isDrawerOpen}>
	<SheetContent side="bottom" class="max-h-[80vh] overflow-y-auto rounded-t-2xl">
		<SheetHeader class="mb-4">
			<SheetTitle>Steps — {activeStep + 1} of {totalSteps}</SheetTitle>
		</SheetHeader>

		<div class="flex flex-col gap-1 pb-6">
			{#each sortedSteps as [stepNum, info]}
				{@const stepState =
					stepNum < activeStep
						? "completed"
						: stepNum === activeStep
							? "active"
							: "inactive"}
				<button
					type="button"
					onclick={() => clickable && navigateStep(stepNum)}
					disabled={!clickable}
					class={cn(
						"flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors",
						clickable
							? "cursor-pointer hover:bg-muted/70 active:bg-muted"
							: "cursor-default",
						stepNum === activeStep && "bg-muted/50",
					)}
					aria-current={stepNum === activeStep ? "step" : undefined}
				>
					<!-- Mini step indicator -->
					<div
						class={cn(
							"size-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 border-2 transition-colors duration-300",
							stepState === "completed" &&
								"bg-primary text-primary-foreground border-primary",
							stepState === "active" &&
								"bg-primary text-primary-foreground border-primary ring-2 ring-primary/30 ring-offset-2",
							stepState === "inactive" &&
								"bg-background text-muted-foreground border-border",
						)}
					>
						{#if stepState === "completed"}
							<Check class="size-3.5" />
						{:else}
							{stepNum + 1}
						{/if}
					</div>

					<!-- Step text -->
					<div class="flex-1 min-w-0">
						{#if info.label}
							<div
								class={cn(
									"font-medium text-sm truncate",
									stepState === "inactive" ? "text-muted-foreground" : "text-foreground",
								)}
							>{info.label}</div>
						{/if}
						{#if info.description}
							<div class="text-xs text-muted-foreground truncate mt-0.5">{info.description}</div>
						{/if}
					</div>

					<!-- Active dot -->
					{#if stepState === "active"}
						<div class="size-2 rounded-full bg-primary flex-shrink-0"></div>
					{/if}
				</button>
			{/each}
		</div>
	</SheetContent>
</Sheet>

<!-- ─────────────────────────────────────────────────────────────────────────
     Row content snippet (ring + text + chevron)
     ───────────────────────────────────────────────────────────────────────── -->
{#snippet rowContent()}
	<!-- Ring -->
	<div
		class="relative flex-shrink-0"
		style="width:{circularSize}px;height:{circularSize}px;"
		aria-hidden="true"
	>
		<svg
			width={circularSize}
			height={circularSize}
			viewBox="0 0 {circularSize} {circularSize}"
			class="absolute inset-0"
		>
			<!-- Background track -->
			<circle
				cx={center}
				cy={center}
				r={radius}
				fill="none"
				stroke="var(--color-border)"
				stroke-width={strokeWidth}
			/>
			<!-- Animated progress arc — starts at 12 o'clock -->
			<circle
				cx={center}
				cy={center}
				r={radius}
				fill="none"
				stroke="var(--color-primary)"
				stroke-width={strokeWidth}
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={dashOffset}
				style="
					transition: stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
					transform: rotate(-90deg);
					transform-origin: {center}px {center}px;
				"
			/>
		</svg>

		<!-- Center content -->
		<div class="absolute inset-0 flex items-center justify-center select-none">
			{#if isComplete}
				{#key isComplete}
					<div class="stepper-circ-check">
						<Check
							style="width:{checkSize}px;height:{checkSize}px;"
							class="text-primary"
						/>
					</div>
				{/key}
			{:else}
				{#key activeStep}
					<span
						class="stepper-circ-counter font-semibold tabular-nums leading-none text-foreground"
						style="font-size:{counterFontSize}px;"
					>{activeStep + 1} of {totalSteps}</span>
				{/key}
			{/if}
		</div>
	</div>

	<!-- Text area: current label + next hint -->
	<div class="flex-1 min-w-0">
		{#key activeStep}
			{#if isComplete}
				<p class="stepper-circ-label font-semibold text-foreground text-base leading-tight">
					All done!
				</p>
				{#if currentLabel}
					<p class="stepper-circ-label text-sm text-primary font-medium mt-0.5">{currentLabel}</p>
				{/if}
			{:else}
				{#if currentLabel}
					<p class="stepper-circ-label font-semibold text-foreground text-base leading-tight truncate">
						{currentLabel}
					</p>
				{/if}
				{#if nextStepLabel}
					<p class="stepper-circ-label text-sm text-muted-foreground mt-0.5 truncate">
						Next: {nextStepLabel}
					</p>
				{/if}
			{/if}
		{/key}
	</div>

	<!-- Expand chevron -->
	{#if expandable && totalSteps > 0}
		<ChevronRight class="size-4 text-muted-foreground flex-shrink-0 opacity-60" />
	{/if}
{/snippet}

<style>
	@keyframes stepper-circ-in {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes stepper-circ-check-in {
		from {
			opacity: 0;
			transform: scale(0) rotate(-30deg);
		}
		to {
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
	}

	.stepper-circ-counter {
		display: block;
		animation: stepper-circ-in 250ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}

	.stepper-circ-label {
		display: block;
		animation: stepper-circ-in 280ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}

	.stepper-circ-check {
		animation: stepper-circ-check-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}
</style>
