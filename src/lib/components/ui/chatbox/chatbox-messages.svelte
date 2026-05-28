<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="chatbox-messages"
	class={cn("flex flex-col gap-4 overflow-y-auto p-4", className)}
	{...restProps}
>
	{@render children?.()}
</div>
