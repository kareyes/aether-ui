<script lang="ts">
	import Root from "./empty.svelte";
	import Header from "./empty-header.svelte";
	import Media from "./empty-media.svelte";
	import Title from "./empty-title.svelte";
	import Description from "./empty-description.svelte";
	import Content from "./empty-content.svelte";
	import type { EmptyVariant, EmptySize } from "./empty.svelte";
	import type { EmptyMediaVariant } from "./empty-media.svelte";
	import type { Snippet } from "svelte";

	type Props = {
		/** Main heading text */
		title?: string;
		/** Supporting text below the title */
		description?: string;
		/** Visual style of the container */
		variant?: EmptyVariant;
		/** Padding / spacing size */
		size?: EmptySize;
		/** Style of the icon wrapper — "icon" adds a rounded box, "default" is transparent */
		iconVariant?: EmptyMediaVariant;
		/** Icon or image to display — renders inside the media wrapper */
		icon?: Snippet;
		/** Action area rendered below the description — typically buttons */
		action?: Snippet;
		/** Arbitrary content placed inside Empty.Content (alongside action) */
		children?: Snippet;
		class?: string;
	};

	let {
		title,
		description,
		variant,
		size,
		iconVariant = "icon",
		icon,
		action,
		children,
		class: className,
	}: Props = $props();

	const hasHeader = $derived(!!(icon || title || description));
	const hasContent = $derived(!!(children || action));
</script>

<Root {variant} {size} class={className}>
	{#if hasHeader}
		<Header>
			{#if icon}
				<Media variant={iconVariant}>
					{@render icon()}
				</Media>
			{/if}
			{#if title}
				<Title>{title}</Title>
			{/if}
			{#if description}
				<Description>{description}</Description>
			{/if}
		</Header>
	{/if}

	{#if hasContent}
		<Content>
			{@render children?.()}
			{@render action?.()}
		</Content>
	{/if}
</Root>
