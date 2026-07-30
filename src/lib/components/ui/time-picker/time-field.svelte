<script lang="ts">
	import { TimeField as TimeFieldPrimitive } from "bits-ui";
	import type { Time } from "@internationalized/date";

	let {
		value = $bindable(),
		placeholder = $bindable(),
		...restProps
	}: TimeFieldPrimitive.RootProps<Time> = $props();
</script>

<TimeFieldPrimitive.Root bind:value bind:placeholder {...restProps} />
