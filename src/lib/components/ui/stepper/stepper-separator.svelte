<script lang="ts">
	import { getContext } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { StepState } from "./stepper-variants.js";

	let {
		ref = $bindable(null),
		class: className,
		completed = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		completed?: boolean;
	} = $props();

	const context = getContext<any>("stepper");
	const variants = $derived(context.variants);
	const orientation = $derived(context.orientation);
	const state: StepState = $derived(completed ? "completed" : "inactive");

	// Custom indicator override (null when indicatorSize is not set)
	const ctx = $derived(context.indicatorCtx);

	// Vertical separator: override height + column width
	const vSeparatorStyle = $derived(
		ctx ? `height:${ctx.separatorHeight}px;` : undefined,
	);
	const vColumnStyle = $derived(
		ctx ? `width:${ctx.columnWidth}px;flex-shrink:0;` : undefined,
	);
	const vLineStyle = $derived(
		ctx ? `width:${ctx.connectorThickness}px;` : undefined,
	);

	// Horizontal separator: override height + margin-top
	const hSeparatorStyle = $derived(
		ctx
			? `height:${ctx.hConnectorHeight}px;margin-top:${ctx.hConnectorMt}px;`
			: undefined,
	);
</script>

<div
	bind:this={ref}
	data-slot="stepper-separator"
	data-state={state}
	class={cn(variants.separator(), className)}
	style={orientation === "vertical" ? vSeparatorStyle : hSeparatorStyle}
	{...restProps}
>
	{#if orientation === "vertical"}
		<!--
			Vertical: wrap the line in a column whose width exactly matches the step's
			left column (button size).  justify-center centres the 2px line perfectly
			over the button at every size and breakpoint — no hardcoded ml-[N]px needed.
		-->
		<div class={variants.separatorColumn()} style={vColumnStyle}>
			<div class={cn(variants.separatorLine(), !ctx && "")} style={vLineStyle} data-state={state}></div>
		</div>
	{:else}
		<!-- Horizontal: line fills the separator track via absolute inset-0 -->
		<div class={variants.separatorLine()} data-state={state}></div>
	{/if}
</div>
