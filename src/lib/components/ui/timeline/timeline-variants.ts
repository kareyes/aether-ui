import { tv, type VariantProps } from "tailwind-variants";
import type { Component } from "svelte";
import type { BadgeColor, BadgeVariant } from "../badge/badge-variants.js";

/**
 * Icon size class inside a ring marker for each density.
 * Consumed by timeline-root.svelte to derive context.iconSizeClass.
 */
export const TIMELINE_ICON_SIZE = {
	default: "size-3",
	compact: "size-2.5",
} as const;

/**
 * Minimalist timeline styling.
 *
 * The state distinction lives almost entirely in the marker and connector —
 * titles stay a consistent foreground weight (only errors recolor) so the eye
 * reads the content, not a rainbow of states. Markers are hollow rings or
 * small filled dots by default, never filled discs with halos.
 */
export const timelineVariants = tv({
	slots: {
		root: ["m-0 flex list-none p-0"],
		item: ["group/item relative flex outline-none"],
		/** Left-hand time column, used only when timePlacement="left". */
		timeGutter: [
			"shrink-0 pt-0.5 text-end text-xs tabular-nums text-muted-foreground",
		],
		/**
		 * markerWrapper — the marker plus the connector line to the next item.
		 * A fixed width (vertical) keeps content left-aligned across items even
		 * when marker sizes differ, and centers the connector under the marker.
		 */
		markerWrapper: ["flex shrink-0 items-center pt-1"],
		marker: [
			"flex shrink-0 items-center justify-center rounded-full",
			"transition-colors duration-200",
		],
		connector: ["transition-colors duration-300", "group-last/item:hidden"],
		content: ["flex min-w-0 flex-1 flex-col gap-1"],
		header: ["flex flex-wrap items-center gap-x-2 gap-y-1"],
		title: [
			"font-medium text-foreground",
			"data-[state=error]:text-destructive",
		],
		timestamp: ["tabular-nums text-muted-foreground"],
		description: ["text-muted-foreground"],
	},

	variants: {
		orientation: {
			vertical: {
				root: "flex-col",
				item: "flex-row",
				markerWrapper: "flex-col items-center self-stretch",
			},
			horizontal: {
				root: "w-full flex-row",
				item: "min-w-0 flex-1 flex-col",
				markerWrapper: "w-full flex-row items-center",
			},
		},

		compact: {
			false: {
				title: "text-sm",
				description: "text-sm",
				timestamp: "text-xs",
			},
			true: {
				content: "gap-0.5",
				title: "text-sm",
				description: "text-xs",
				timestamp: "text-[11px]",
				timeGutter: "w-14 text-[11px]",
			},
		},

		markerVariant: {
			// Hollow ring — the minimalist default. Empty when idle; the active
			// state fills it so it reads as a solid accent dot.
			ring: {
				marker: [
					"border-2 bg-background",
					"data-[state=pending]:border-muted-foreground/30 data-[state=pending]:text-muted-foreground",
					"data-[state=completed]:border-primary data-[state=completed]:text-primary",
					"data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
					"data-[state=error]:border-destructive data-[state=error]:text-destructive",
				],
			},
			// Small solid dot — accent for the live item, muted for the rest.
			dot: {
				marker: [
					"data-[state=pending]:bg-muted-foreground/40",
					"data-[state=completed]:bg-primary",
					"data-[state=active]:bg-primary",
					"data-[state=error]:bg-destructive",
				],
			},
			// Unstyled — the icon/avatar snippet is the whole marker.
			plain: {
				marker: ["overflow-hidden"],
			},
		},

		lineStyle: {
			solid: {},
			dashed: {},
		},

		clickable: {
			true: {
				marker: [
					"cursor-pointer",
					"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
				],
			},
			false: {},
		},
	},

	compoundVariants: [
		// ─── Marker size — ring ─────────────────────────────────────────────────
		// One size whether or not it holds an icon, so every marker in a timeline
		// shares a column width: the line stays straight and the gap to content
		// stays tight. Sized to match the adjacent text line.
		{ markerVariant: "ring", compact: false, class: { marker: "size-5" } },
		{ markerVariant: "ring", compact: true, class: { marker: "size-4" } },

		// ─── Marker size — dot (icon-agnostic) ──────────────────────────────────
		{ markerVariant: "dot", compact: false, class: { marker: "size-3" } },
		{ markerVariant: "dot", compact: true, class: { marker: "size-2.5" } },

		// ─── Connector — vertical ───────────────────────────────────────────────
		// The marker column hugs the marker (no fixed width), so the connector
		// sits directly under it and the gap to the content is tight and uniform.
		// flex-1 fills the space between one marker and the next, meeting each
		// marker's edge so the line reads as continuous (no floating gap).
		{
			orientation: "vertical",
			lineStyle: "solid",
			class: {
				connector:
					"w-0.5 flex-1 rounded-full bg-border data-[state=completed]:bg-primary",
			},
		},
		{
			orientation: "vertical",
			lineStyle: "dashed",
			class: {
				connector:
					"w-0 flex-1 border-l-2 border-dashed border-border data-[state=completed]:border-primary",
			},
		},

		// ─── Connector — horizontal ─────────────────────────────────────────────
		{
			orientation: "horizontal",
			lineStyle: "solid",
			class: {
				connector:
					"h-0.5 flex-1 rounded-full bg-border data-[state=completed]:bg-primary",
			},
		},
		{
			orientation: "horizontal",
			lineStyle: "dashed",
			class: {
				connector:
					"h-0 flex-1 border-t-2 border-dashed border-border data-[state=completed]:border-primary",
			},
		},

		// ─── Content spacing — vertical ─────────────────────────────────────────
		// pb spaces items apart while keeping the connector continuous (padding
		// lives inside the item, so the self-stretch markerWrapper spans it).
		{
			orientation: "vertical",
			compact: false,
			class: { item: "gap-3", content: "pt-0.5 pb-8 group-last/item:pb-0" },
		},
		{
			orientation: "vertical",
			compact: true,
			class: { item: "gap-2.5", content: "pt-0 pb-5 group-last/item:pb-0" },
		},

		// ─── Content spacing — horizontal ───────────────────────────────────────
		{
			orientation: "horizontal",
			compact: false,
			class: { item: "gap-2.5", content: "pe-6 group-last/item:pe-0" },
		},
		{
			orientation: "horizontal",
			compact: true,
			class: { item: "gap-1.5", content: "pe-4 group-last/item:pe-0" },
		},
	],

	defaultVariants: {
		orientation: "vertical",
		compact: false,
		clickable: false,
		markerVariant: "ring",
		lineStyle: "solid",
	},
});

export type TimelineVariants = VariantProps<typeof timelineVariants>;
export type TimelineOrientation = NonNullable<TimelineVariants["orientation"]>;
export type TimelineMarkerVariant = NonNullable<
	TimelineVariants["markerVariant"]
>;
export type TimelineLineStyle = NonNullable<TimelineVariants["lineStyle"]>;

/** Where the timestamp sits relative to the marker and title. */
export type TimelineTimePlacement = "top" | "left" | "inline";

export type TimelineStatus = "completed" | "active" | "pending" | "error";
export type TimelineConnectorState = "completed" | "pending";

/** Badge config for an item; a bare string means `{ text }` with defaults. */
export type TimelineBadge = {
	text: string;
	color?: BadgeColor;
	variant?: BadgeVariant;
};

/** A single item definition for the declarative {@link Timeline} component. */
export type TimelineEntry = {
	/** Item heading. */
	title: string;
	/** Optional body text shown below the header row. */
	description?: string;
	/** Human-readable time label (e.g. "Jan 14, 10:30 AM"). */
	timestamp?: string;
	/** Machine-readable value for the `<time>` element's datetime attribute. */
	datetime?: string;
	/** Explicit status — overrides the state derived from `activeIndex`. */
	status?: TimelineStatus;
	/** Status badge rendered next to the title. */
	badge?: string | TimelineBadge;
	/** Svelte component rendered inside the marker (e.g. a Lucide icon). */
	icon?: Component;
};

/** Parameters passed to the `icon` / `content` customization snippets. */
export type TimelineSnippetParams = {
	item: TimelineEntry;
	index: number;
	status: TimelineStatus;
};

/** Default badge color per status, used when a badge omits `color`. */
export const TIMELINE_STATUS_BADGE_COLOR: Record<TimelineStatus, BadgeColor> = {
	completed: "green",
	active: "primary",
	pending: "gray",
	error: "red",
};

/**
 * Derive an item's status from its position relative to `activeIndex`.
 * An explicit per-item status always wins. With no active index (< 0) the
 * timeline reads as a plain history feed — every item renders "completed".
 */
export function resolveTimelineStatus(
	index: number,
	activeIndex: number,
	explicit?: TimelineStatus,
): TimelineStatus {
	if (explicit) return explicit;
	if (activeIndex < 0) return "completed";
	if (index < activeIndex) return "completed";
	if (index === activeIndex) return "active";
	return "pending";
}

export const TIMELINE_CTX = "timeline";

/** Context shared from TimelineRoot to TimelineItem. */
export type TimelineContext = {
	readonly orientation: TimelineOrientation;
	readonly compact: boolean;
	readonly clickable: boolean;
	readonly markerVariant: TimelineMarkerVariant;
	readonly lineStyle: TimelineLineStyle;
	readonly timePlacement: TimelineTimePlacement;
	readonly activeIndex: number;
	readonly variants: ReturnType<typeof timelineVariants>;
	readonly iconSizeClass: string;
	statusFor: (index: number, explicit?: TimelineStatus) => TimelineStatus;
	connectorStateFor: (index: number) => TimelineConnectorState;
	tabIndexFor: (index: number) => number;
	setRovingIndex: (index: number) => void;
	registerItem: (index: number, focus: () => void) => void;
	unregisterItem: (index: number) => void;
	handleItemClick: (index: number) => void;
	handleMarkerKeydown: (event: KeyboardEvent, index: number) => void;
};
