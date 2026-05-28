<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils.js";
	import { chatboxMessageVariants, type ChatboxMessageRole } from "./chatbox-variants.js";

	type Props = {
		role?: ChatboxMessageRole;
		name?: string;
		timestamp?: Date | string;
		class?: string;
		bubbleClass?: string;
		avatar?: Snippet;
		children: Snippet;
	};

	let {
		role = "assistant",
		name,
		timestamp,
		class: className,
		bubbleClass,
		avatar,
		children,
	}: Props = $props();

	const styles = $derived(chatboxMessageVariants({ role }));

	const formattedTime = $derived(
		timestamp
			? new Date(timestamp).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})
			: undefined,
	);
</script>

<div data-slot="chatbox-message" data-role={role} class={cn(styles.wrapper(), className)}>
	{#if avatar}
		<div class="shrink-0">
			{@render avatar()}
		</div>
	{/if}

	<div
		class={cn(
			"flex max-w-[75%] flex-col",
			role === "user" ? "items-end" : "items-start",
		)}
	>
		{#if name}
			<span class={styles.nameLabel()}>{name}</span>
		{/if}
		<div class={cn(styles.bubble(), bubbleClass)}>
			{@render children()}
		</div>
		{#if formattedTime}
			<span class={styles.meta()}>{formattedTime}</span>
		{/if}
	</div>
</div>
