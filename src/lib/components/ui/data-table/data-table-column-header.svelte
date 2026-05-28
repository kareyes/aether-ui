<script lang="ts">
	import type { ComponentProps } from "svelte";
	import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
	import { Button } from "$lib/components/ui/button/index.js";

	type Props = {
		title: string;
	} & ComponentProps<typeof Button>;

	let { title, variant = "ghost", ...restProps }: Props = $props();
</script>

<Button {variant} {...restProps}>
	{title}
	<ArrowUpDownIcon class="ms-2 size-4" />
</Button>
