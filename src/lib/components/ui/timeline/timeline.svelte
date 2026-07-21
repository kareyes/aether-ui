<script lang="ts">
	/**
	 * Declarative Timeline — public entry point.
	 *
	 * Accepts an `items` array for the simplified API, or `children`
	 * (TimelineItem) for the primitive API. All rendering logic lives inside
	 * TimelineRoot so item components always share the correct Svelte context.
	 */
	import type { ComponentProps } from "svelte";
	import TimelineRoot from "./timeline-root.svelte";

	type Props = ComponentProps<typeof TimelineRoot>;

	let {
		ref = $bindable(null),
		activeIndex = $bindable(-1),
		...restProps
	}: Props = $props();
</script>

<TimelineRoot bind:ref bind:activeIndex {...restProps} />
