<script lang="ts">
	/**
	 * Declarative Stepper — public entry point.
	 *
	 * Accepts a `steps` array for the simplified API, or `children` (StepperStep /
	 * StepperSeparator) for the primitive API. All rendering logic lives inside
	 * StepperRoot so that step components always share the correct Svelte context.
	 */
	import type { ComponentProps } from "svelte";
	import StepperRoot from "./stepper-root.svelte";

	type Props = ComponentProps<typeof StepperRoot>;

	let {
		ref = $bindable(null),
		activeStep = $bindable(0),
		...restProps
	}: Props = $props();
</script>

<StepperRoot bind:ref bind:activeStep {...restProps} />
