<script lang="ts">
	import type { Snippet } from "svelte";
	import { cardVariants, type CardVariant, type CardPadding } from "./card-variants.js";
	import { cn } from "$lib/utils.js";
	import Root from "./card-root.svelte";
	import Header from "./card-header.svelte";
	import Title from "./card-title.svelte";
	import Description from "./card-description.svelte";
	import Content from "./card-content.svelte";
	import Footer from "./card-footer.svelte";
	import Action from "./card-action.svelte";

	type CardImplProps = {
		title?: string;
		description?: string;
		variant?: CardVariant;
		padding?: CardPadding;
		hover?: boolean;
		interactive?: boolean;
		class?: string;
		/**
		 * Card content
		 */
		children: Snippet;
		/**
		 * Optional header actions (buttons, icons, etc.)
		 */
		headerAction?: Snippet;
		/**
		 * Optional footer content
		 */
		footer?: Snippet;
	};

	let {
		title,
		description,
		variant = "default",
		padding = "default",
		hover = false,
		interactive = false,
		class: className,
		children,
		headerAction,
		footer,
	}: CardImplProps = $props();

	// Apply variant classes to root, override padding since we handle it via structure
	const rootClass = $derived(cn(
		cardVariants({ variant, padding: "none", hover, interactive }),
		className
	));
</script>

<Root class={rootClass}>
	{#if title || description || headerAction}
		<Header>
			{#if title}
				<Title>{title}</Title>
			{/if}
			{#if description}
				<Description>{description}</Description>
			{/if}
			{#if headerAction}
				<Action>
					{@render headerAction()}
				</Action>
			{/if}
		</Header>
	{/if}

	<Content>
		{@render children()}
	</Content>

	{#if footer}
		<Footer>
			{@render footer()}
		</Footer>
	{/if}
</Root>
