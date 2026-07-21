<script lang="ts">
	import { setContext } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLOlAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import TimelineItemComp from "./timeline-item.svelte";
	import {
		TIMELINE_CTX,
		TIMELINE_ICON_SIZE,
		resolveTimelineStatus,
		timelineVariants,
		type TimelineContext,
		type TimelineEntry,
		type TimelineLineStyle,
		type TimelineMarkerVariant,
		type TimelineOrientation,
		type TimelineSnippetParams,
		type TimelineTimePlacement,
	} from "./timeline-variants.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		orientation = "vertical",
		compact = false,
		clickable = false,
		markerVariant = "ring",
		lineStyle = "solid",
		timePlacement = "top",
		activeIndex = $bindable(-1),
		items,
		onItemClick,
		icon,
		content,
		...restProps
	}: WithElementRef<HTMLOlAttributes, HTMLOListElement> & {
		/** Layout direction. @default "vertical" */
		orientation?: TimelineOrientation;
		/** Tighter spacing, smaller markers and text. @default false */
		compact?: boolean;
		/** Make markers focusable buttons with arrow-key navigation. */
		clickable?: boolean;
		/**
		 * Marker shape:
		 * - "ring": hollow outline circle, filled when active (default)
		 * - "dot": small solid dot — accent when live, muted otherwise
		 * - "plain": unstyled — the icon/avatar snippet is the whole marker
		 * @default "ring"
		 */
		markerVariant?: TimelineMarkerVariant;
		/** Connector line style. @default "solid" */
		lineStyle?: TimelineLineStyle;
		/**
		 * Timestamp position:
		 * - "top": small eyebrow above the title (default)
		 * - "left": in a fixed left gutter (vertical only)
		 * - "inline": on the title row, right-aligned
		 * @default "top"
		 */
		timePlacement?: TimelineTimePlacement;
		/**
		 * Index of the highlighted item. Items before it derive "completed",
		 * items after it "pending". Negative (default) renders every item as
		 * a neutral history feed with muted connectors.
		 */
		activeIndex?: number;
		/**
		 * Declarative item definitions. Takes precedence over children.
		 */
		items?: TimelineEntry[];
		onItemClick?: (index: number) => void;
		/** Custom marker icon for every item without its own `icon`. */
		icon?: Snippet<[TimelineSnippetParams]>;
		/** Replaces the default title/timestamp/description block per item. */
		content?: Snippet<[TimelineSnippetParams]>;
	} = $props();

	const variants = $derived(
		timelineVariants({
			orientation,
			compact,
			clickable,
			markerVariant,
			lineStyle,
		}),
	);
	const iconSizeClass = $derived(
		compact ? TIMELINE_ICON_SIZE.compact : TIMELINE_ICON_SIZE.default,
	);

	// ─── Roving tabindex (keyboard navigation between clickable markers) ─────
	// Items register a focus callback; arrow keys move focus along the
	// registered (sorted) indices, Home/End jump to the extremes.
	let registeredIndices = $state<number[]>([]);
	let rovingIndex = $state<number | null>(null);
	const focusFns = new Map<number, () => void>();

	const defaultRovingIndex = $derived(
		registeredIndices.includes(activeIndex)
			? activeIndex
			: (registeredIndices[0] ?? -1),
	);

	function registerItem(index: number, focus: () => void) {
		focusFns.set(index, focus);
		if (!registeredIndices.includes(index)) {
			registeredIndices = [...registeredIndices, index].sort(
				(a, b) => a - b,
			);
		}
	}

	function unregisterItem(index: number) {
		focusFns.delete(index);
		registeredIndices = registeredIndices.filter((i) => i !== index);
		if (rovingIndex === index) rovingIndex = null;
	}

	function handleMarkerKeydown(event: KeyboardEvent, index: number) {
		const forward =
			orientation === "vertical" ? "ArrowDown" : "ArrowRight";
		const backward = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
		const position = registeredIndices.indexOf(index);
		if (position === -1) return;

		let target: number | undefined;
		if (event.key === forward) target = registeredIndices[position + 1];
		else if (event.key === backward)
			target = registeredIndices[position - 1];
		else if (event.key === "Home") target = registeredIndices[0];
		else if (event.key === "End")
			target = registeredIndices[registeredIndices.length - 1];
		else return;

		event.preventDefault();
		if (target !== undefined) {
			rovingIndex = target;
			focusFns.get(target)?.();
		}
	}

	setContext<TimelineContext>(TIMELINE_CTX, {
		get orientation() {
			return orientation;
		},
		get compact() {
			return compact;
		},
		get clickable() {
			return clickable;
		},
		get markerVariant() {
			return markerVariant;
		},
		get lineStyle() {
			return lineStyle;
		},
		get timePlacement() {
			return timePlacement;
		},
		get activeIndex() {
			return activeIndex;
		},
		get variants() {
			return variants;
		},
		get iconSizeClass() {
			return iconSizeClass;
		},
		statusFor: (index, explicit) =>
			resolveTimelineStatus(index, activeIndex, explicit),
		connectorStateFor: (index) =>
			activeIndex >= 0 && index < activeIndex ? "completed" : "pending",
		tabIndexFor: (index) =>
			index === (rovingIndex ?? defaultRovingIndex) ? 0 : -1,
		setRovingIndex: (index) => {
			rovingIndex = index;
		},
		registerItem,
		unregisterItem,
		handleItemClick: (index) => {
			if (!clickable) return;
			activeIndex = index;
			onItemClick?.(index);
		},
		handleMarkerKeydown,
	});
</script>

<!--
	entryList: renders the declarative `items` array when provided, otherwise
	falls back to the `children` snippet (primitive API). Always defined inside
	TimelineRoot so TimelineItem's getContext resolves for either path.
-->
{#snippet entryList()}
	{#if items && items.length > 0}
		{#each items as entry, i (i)}
			{@const status = resolveTimelineStatus(i, activeIndex, entry.status)}
			{#snippet entryIcon()}
				{@const Icon = entry.icon}
				{#if Icon}
					<Icon class={iconSizeClass} />
				{:else if icon}
					{@render icon({ item: entry, index: i, status })}
				{/if}
			{/snippet}
			{#snippet entryContent()}
				{@render content?.({ item: entry, index: i, status })}
			{/snippet}
			<TimelineItemComp
				index={i}
				title={entry.title}
				description={entry.description}
				timestamp={entry.timestamp}
				datetime={entry.datetime}
				status={entry.status}
				badge={entry.badge}
				icon={entry.icon || icon ? entryIcon : undefined}
				children={content ? entryContent : undefined}
			/>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
{/snippet}

<ol
	bind:this={ref}
	data-slot="timeline"
	data-orientation={orientation}
	class={cn(variants.root(), className)}
	{...restProps}
>
	{@render entryList()}
</ol>
