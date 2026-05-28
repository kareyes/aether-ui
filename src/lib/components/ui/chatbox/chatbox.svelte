<script lang="ts" module>
	export type { ChatMessage, ChatboxVariant, ChatboxSize } from "./chatbox-variants.js";
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils.js";
	import {
		chatboxVariants,
		type ChatMessage,
		type ChatboxVariant,
		type ChatboxSize,
	} from "./chatbox-variants.js";
	import Root from "./chatbox-root.svelte";
	import Messages from "./chatbox-messages.svelte";
	import Message from "./chatbox-message.svelte";
	import Typing from "./chatbox-typing.svelte";
	import InputArea from "./chatbox-input.svelte";
	import { Avatar } from "$lib/components/ui/avatar/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import SendHorizontalIcon from "@lucide/svelte/icons/send-horizontal";

	type Props = {
		messages?: ChatMessage[];
		loading?: boolean;
		placeholder?: string;
		disabled?: boolean;
		variant?: ChatboxVariant;
		size?: ChatboxSize;
		maxHeight?: string;
		class?: string;
		userAvatar?: string;
		userName?: string;
		assistantAvatar?: string;
		assistantName?: string;
		onSend?: (message: string) => void | Promise<void>;
		empty?: Snippet;
	};

	let {
		messages = [],
		loading = false,
		placeholder = "Type a message…",
		disabled = false,
		variant = "default",
		size = "default",
		maxHeight = "32rem",
		class: className,
		userAvatar,
		userName,
		assistantAvatar,
		assistantName,
		onSend,
		empty,
	}: Props = $props();

	let inputValue = $state("");
	let messagesEl = $state<HTMLDivElement | null>(null);
	let textareaEl: HTMLTextAreaElement | null = null;
	let sending = $state(false);

	const styles = $derived(chatboxVariants({ variant, size }));
	const isDisabled = $derived(disabled || sending);
	const canSend = $derived(!isDisabled && inputValue.trim().length > 0);

	// Auto-scroll to bottom when messages or loading state changes
	$effect(() => {
		void messages.length;
		void loading;
		if (messagesEl) {
			messagesEl.scrollTop = messagesEl.scrollHeight;
		}
	});

	// Auto-resize textarea as content grows (max ~5 rows)
	$effect(() => {
		void inputValue;
		if (textareaEl) {
			textareaEl.style.height = "auto";
			textareaEl.style.height = `${Math.min(textareaEl.scrollHeight, 120)}px`;
		}
	});

	async function handleSend() {
		const text = inputValue.trim();
		if (!text || isDisabled) return;
		inputValue = "";
		sending = true;
		try {
			await onSend?.(text);
		} finally {
			sending = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}
</script>

<Root class={cn(styles.root(), className)}>
	<Messages
		bind:ref={messagesEl}
		class={cn(styles.messages())}
		style="max-height: {maxHeight};"
	>
		{#if messages.length === 0 && !loading}
			{#if empty}
				{@render empty()}
			{:else}
				<div
					class="flex flex-1 flex-col items-center justify-center gap-1 py-8 text-center text-sm text-muted-foreground"
				>
					<p>No messages yet.</p>
					<p class="text-xs">Start the conversation below.</p>
				</div>
			{/if}
		{:else}
			{#each messages as msg (msg.id)}
				{@const resolvedName =
					msg.name ?? (msg.role === "user" ? userName : assistantName)}
				{@const resolvedAvatar =
					msg.avatar ?? (msg.role === "user" ? userAvatar : assistantAvatar)}
				{@const fallbackInitials =
					resolvedName
						? resolvedName
						: msg.role === "user"
							? "U"
							: "AI"}

				<Message role={msg.role} name={resolvedName} timestamp={msg.timestamp}>
					{#snippet avatar()}
						<Avatar
							src={resolvedAvatar}
							fallback={fallbackInitials}
							size="sm"
							shape="circle"
						/>
					{/snippet}
					{msg.content}
				</Message>
			{/each}
		{/if}

		{#if loading}
			<Typing />
		{/if}
	</Messages>

	<InputArea class={cn(styles.inputArea())}>
		<textarea
			bind:this={textareaEl}
			bind:value={inputValue}
			{placeholder}
			disabled={isDisabled}
			rows={1}
			onkeydown={handleKeydown}
			class="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		></textarea>
		<Button
			size="icon-sm"
			variant="default"
			disabled={!canSend}
			onclick={handleSend}
			aria-label="Send message"
		>
			<SendHorizontalIcon class="size-4" />
		</Button>
	</InputArea>
</Root>
