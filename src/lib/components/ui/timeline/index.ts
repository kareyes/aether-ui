// Primary declarative API
import Timeline from "./timeline.svelte";

// Primitive API — for advanced composition (custom per-item children)
import Root from "./timeline-root.svelte";
import Item from "./timeline-item.svelte";

export {
	// Declarative wrapper (preferred)
	Timeline,
	// Primitive base
	Root as TimelineRoot,
	Item as TimelineItem,
};

export {
	timelineVariants,
	resolveTimelineStatus,
	TIMELINE_STATUS_BADGE_COLOR,
} from "./timeline-variants.js";

export type {
	TimelineOrientation,
	TimelineMarkerVariant,
	TimelineLineStyle,
	TimelineTimePlacement,
	TimelineStatus,
	TimelineConnectorState,
	TimelineVariants,
	TimelineEntry,
	TimelineBadge,
	TimelineSnippetParams,
} from "./timeline-variants.js";
