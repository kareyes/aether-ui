<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import XIcon from "@lucide/svelte/icons/x";
	import type { Snippet } from "svelte";
	import * as Dialog from "./index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { dialogVariants, type DialogVariants } from "./dialog-variants.js";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		showCloseButton = true,
		size = "default",
		variant = "default",
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> &
		DialogVariants & {
			portalProps?: DialogPrimitive.PortalProps;
			children: Snippet;
			showCloseButton?: boolean;
		} = $props();

	const variants = $derived(dialogVariants({ size, variant }));
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		bind:ref
		data-slot="dialog-content"
		class={cn(variants.content(), className)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close class={variants.closeButton()}>
				<XIcon />
				<span class="sr-only">Close</span>
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</Dialog.Portal>
