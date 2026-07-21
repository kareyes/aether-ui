<script lang="ts">
	import { getContext, untrack } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLLiAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { Badge } from "../badge/index.js";
	import {
		TIMELINE_CTX,
		TIMELINE_STATUS_BADGE_COLOR,
		type TimelineBadge,
		type TimelineContext,
		type TimelineStatus,
	} from "./timeline-variants.js";

	let {
		ref = $bindable(null),
		class: className,
		index,
		title,
		description,
		timestamp,
		datetime,
		status: explicitStatus,
		badge,
		icon,
		children,
		...restProps
	}: WithElementRef<HTMLLiAttributes, HTMLLIElement> & {
		/** Position of this item in the timeline (0-based). */
		index: number;
		title?: string;
		description?: string;
		/** Human-readable time label. */
		timestamp?: string;
		/** Machine-readable value for the `<time>` element. */
		datetime?: string;
		/** Explicit status — overrides the state derived from `activeIndex`. */
		status?: TimelineStatus;
		/** Status badge — plain text or full config. */
		badge?: string | TimelineBadge;
		/** Custom marker content (icon / avatar). */
		icon?: Snippet;
		/** Replaces the default title/timestamp/description block. */
		children?: Snippet;
	} = $props();

	const ctx = getContext<TimelineContext>(TIMELINE_CTX);

	const status = $derived(ctx.statusFor(index, explicitStatus));
	const connectorState = $derived(ctx.connectorStateFor(index));
	const badgeConfig = $derived(
		typeof badge === "string" ? { text: badge } : badge,
	);
	// Dot markers never render an icon; ring and plain markers may.
	const showIcon = $derived(ctx.markerVariant !== "dot" && !!icon);
	// The left gutter is a vertical-only layout; horizontal falls back to top.
	const timePlacement = $derived(
		ctx.orientation === "horizontal" && ctx.timePlacement === "left"
			? "top"
			: ctx.timePlacement,
	);

	let markerRef = $state<HTMLButtonElement | null>(null);

	// Register this item's index + focus callback for keyboard roving. `index`
	// stays a tracked dependency (re-register if it changes), but the registry
	// mutation is untracked: registerItem/unregisterItem both read and write the
	// shared `registeredIndices` state, and doing that in a tracked effect makes
	// the effect depend on the state it writes — a self-perpetuating loop
	// (`effect_update_depth_exceeded`). untrack breaks that cycle.
	$effect(() => {
		const i = index;
		untrack(() => ctx.registerItem(i, () => markerRef?.focus()));
		return () => untrack(() => ctx.unregisterItem(i));
	});
</script>

{#snippet markerBody()}
	{#if showIcon}
		{@render icon?.()}
	{/if}
{/snippet}

{#snippet defaultBody()}
	{#if timePlacement === "top" && timestamp}
		<time class={ctx.variants.timestamp()} {datetime}>{timestamp}</time>
	{/if}
	<div class={ctx.variants.header()} data-slot="timeline-header">
		{#if title}
			<h3 class={ctx.variants.title()} data-state={status}>
				{title}
			</h3>
		{/if}
		{#if badgeConfig}
			<Badge
				size="sm"
				variant={badgeConfig.variant ?? "flat"}
				color={badgeConfig.color ?? TIMELINE_STATUS_BADGE_COLOR[status]}
				text={badgeConfig.text}
			/>
		{/if}
		{#if timePlacement === "inline" && timestamp}
			<time
				class={cn(ctx.variants.timestamp(), "ms-auto")}
				{datetime}
			>
				{timestamp}
			</time>
		{/if}
	</div>
	{#if description}
		<p class={ctx.variants.description()} data-slot="timeline-description">
			{description}
		</p>
	{/if}
{/snippet}

<li
	bind:this={ref}
	data-slot="timeline-item"
	data-state={status}
	aria-current={status === "active" ? "step" : undefined}
	class={cn(ctx.variants.item(), className)}
	{...restProps}
>
	{#if timePlacement === "left"}
		<div class={ctx.variants.timeGutter()} data-slot="timeline-time">
			{#if timestamp}
				<time {datetime}>{timestamp}</time>
			{/if}
		</div>
	{/if}

	<div
		class={ctx.variants.markerWrapper()}
		data-slot="timeline-marker-wrapper"
	>
		{#if ctx.clickable}
			<button
				bind:this={markerRef}
				type="button"
				class={ctx.variants.marker()}
				data-slot="timeline-marker"
				data-state={status}
				tabindex={ctx.tabIndexFor(index)}
				aria-label={title ?? `Timeline item ${index + 1}`}
				onclick={() => ctx.handleItemClick(index)}
				onkeydown={(event) => ctx.handleMarkerKeydown(event, index)}
				onfocus={() => ctx.setRovingIndex(index)}
			>
				{@render markerBody()}
			</button>
		{:else}
			<div
				class={ctx.variants.marker()}
				data-slot="timeline-marker"
				data-state={status}
				aria-hidden="true"
			>
				{@render markerBody()}
			</div>
		{/if}
		<div
			class={ctx.variants.connector()}
			data-slot="timeline-connector"
			data-state={connectorState}
			aria-hidden="true"
		></div>
	</div>

	<div class={ctx.variants.content()} data-slot="timeline-content">
		{#if children}
			{@render children()}
		{:else}
			{@render defaultBody()}
		{/if}
	</div>
</li>
