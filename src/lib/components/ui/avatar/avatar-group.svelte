<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	interface Props {
		max?: number;
		size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl";
		spacing?: "tight" | "default" | "loose";
		class?: string;
		children: Snippet;
	}

	let {
		max = 5,
		size = "default",
		spacing = "default",
		class: className,
		children,
	}: Props = $props();

	const spacingMap = {
		tight: "-space-x-2",
		default: "-space-x-3",
		loose: "-space-x-1",
	};

	const sizeMap = {
		xs: "size-6",
		sm: "size-8",
		default: "size-10",
		lg: "size-12",
		xl: "size-14",
		"2xl": "size-16",
	};
</script>

<div class={cn("flex items-center", spacingMap[spacing], className)} data-avatar-group>
	{@render children()}
</div>
