<script lang="ts" module>
	export interface TabItem {
		value: string;
		label: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";
	import { Select } from "$lib/components/ui/select/index.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		value = $bindable(""),
		class: className,
		items = [],
		dropdownOnMobile = false,
		children,
		...restProps
	}: TabsPrimitive.RootProps & {
		items?: TabItem[];
		dropdownOnMobile?: boolean;
		children?: Snippet;
	} = $props();

	// Detect mobile for vertical → horizontal conversion and dropdown mode
	const isMobile = new IsMobile(640);
	const isVertical = $derived(restProps.orientation === "vertical");
	const effectiveOrientation = $derived(
		isVertical && isMobile.current ? "horizontal" : restProps.orientation,
	);
	const showDropdown = $derived(
		dropdownOnMobile && isMobile.current && items.length > 0,
	);

	// Map TabItem[] to SelectOption[] for the dropdown
	const selectOptions = $derived(
		items.map((item) => ({
			value: item.value,
			label: item.label,
			disabled: item.disabled,
		})),
	);
</script>

{#if showDropdown}
	<div
		data-slot="tabs"
		class={cn("flex flex-col gap-2", className)}
	>
		<Select
			options={selectOptions}
			bind:value
			placeholder="Select tab..."
		/>
		<TabsPrimitive.Root
			bind:ref
			bind:value
			class="flex flex-col [&>[data-slot=tabs-list]]:hidden"
			{...restProps}
			orientation="horizontal"
		>
			{@render children?.()}
		</TabsPrimitive.Root>
	</div>
{:else}
	<TabsPrimitive.Root
		bind:ref
		bind:value
		data-slot="tabs"
		class={cn(
			"flex gap-2",
			effectiveOrientation === "vertical" ? "flex-row" : "flex-col",
			className,
		)}
		{...restProps}
		orientation={effectiveOrientation}
	>
		{@render children?.()}
	</TabsPrimitive.Root>
{/if}
