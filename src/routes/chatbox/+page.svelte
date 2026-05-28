<script lang="ts">
	import { Chatbox, ChatboxPrimitives, Card, Badge, Avatar } from "$lib";
	import type { ChatMessage } from "$lib/components/ui/chatbox";
	import BotIcon from "@lucide/svelte/icons/bot";
	import UserIcon from "@lucide/svelte/icons/user";
	import SendHorizontalIcon from "@lucide/svelte/icons/send-horizontal";
	import MicIcon from "@lucide/svelte/icons/mic";

	// ── Shared helpers ──────────────────────────────────────────────────────
	function uid() {
		return crypto.randomUUID();
	}

	function botReply(userText: string): string {
		const replies = [
			`Got it! You said: "${userText}". Let me look into that.`,
			`Interesting question about "${userText}". Here's what I found…`,
			`Thanks for asking about "${userText}". The short answer is: it depends!`,
			`Sure, I can help with "${userText}". Give me a moment.`,
			`Great point about "${userText}". Here's my take on it.`,
		];
		return replies[Math.floor(Math.random() * replies.length)];
	}

	// ── 1. Basic ────────────────────────────────────────────────────────────
	let basicMessages = $state<ChatMessage[]>([
		{ id: uid(), role: "assistant", content: "Hi! How can I help you today?" },
	]);

	async function handleBasicSend(text: string) {
		basicMessages = [
			...basicMessages,
			{ id: uid(), role: "user", content: text, timestamp: new Date() },
		];
		await new Promise((r) => setTimeout(r, 900));
		basicMessages = [
			...basicMessages,
			{
				id: uid(),
				role: "assistant",
				content: botReply(text),
				timestamp: new Date(),
			},
		];
	}

	// ── 2. With loading indicator ────────────────────────────────────────────
	let loadingMessages = $state<ChatMessage[]>([
		{
			id: uid(),
			role: "assistant",
			content: "Hello! I'm Aria. Ask me anything and watch the typing indicator.",
			timestamp: new Date(Date.now() - 3 * 60_000),
		},
	]);
	let loadingState = $state(false);

	async function handleLoadingSend(text: string) {
		loadingMessages = [
			...loadingMessages,
			{ id: uid(), role: "user", content: text, timestamp: new Date() },
		];
		loadingState = true;
		await new Promise((r) => setTimeout(r, 1400));
		loadingMessages = [
			...loadingMessages,
			{
				id: uid(),
				role: "assistant",
				content: botReply(text),
				timestamp: new Date(),
			},
		];
		loadingState = false;
	}

	// ── 3. Variants ──────────────────────────────────────────────────────────
	const variantSeed: ChatMessage[] = [
		{
			id: "v1",
			role: "assistant",
			content: "This is the ghost variant — no border or shadow.",
		},
		{ id: "v2", role: "user", content: "Looks clean!" },
	];

	const elevatedSeed: ChatMessage[] = [
		{
			id: "e1",
			role: "assistant",
			content: "Elevated variant with deeper shadow.",
		},
		{ id: "e2", role: "user", content: "Nice depth!" },
	];

	// ── 4. Sizes ────────────────────────────────────────────────────────────
	const sizeSeed: ChatMessage[] = [
		{ id: "s1", role: "assistant", content: "Compact size for tight spaces." },
		{ id: "s2", role: "user", content: "Works great!" },
	];

	const sizeLgSeed: ChatMessage[] = [
		{ id: "l1", role: "assistant", content: "Spacious large size." },
		{ id: "l2", role: "user", content: "Very comfortable to read." },
	];

	// ── 5. Custom empty state ────────────────────────────────────────────────
	let emptyMessages = $state<ChatMessage[]>([]);

	async function handleEmptySend(text: string) {
		emptyMessages = [
			...emptyMessages,
			{ id: uid(), role: "user", content: text, timestamp: new Date() },
		];
		await new Promise((r) => setTimeout(r, 800));
		emptyMessages = [
			...emptyMessages,
			{
				id: uid(),
				role: "assistant",
				content: `Welcome! You said: "${text}".`,
				timestamp: new Date(),
			},
		];
	}

	// ── 6. Primitives ────────────────────────────────────────────────────────
	let primValue = $state("");
	let primMessages = $state<ChatMessage[]>([
		{
			id: "p1",
			role: "assistant",
			content: "Built with primitives — fully custom layout.",
		},
		{ id: "p2", role: "user", content: "I can control every part." },
		{
			id: "p3",
			role: "assistant",
			content: "Exactly. Mix and match any way you like.",
		},
	]);
	let primLoading = $state(false);

	async function handlePrimSend() {
		const text = primValue.trim();
		if (!text) return;
		primValue = "";
		primMessages = [
			...primMessages,
			{ id: uid(), role: "user", content: text, timestamp: new Date() },
		];
		primLoading = true;
		await new Promise((r) => setTimeout(r, 900));
		primMessages = [
			...primMessages,
			{
				id: uid(),
				role: "assistant",
				content: `Custom input received: "${text}"`,
				timestamp: new Date(),
			},
		];
		primLoading = false;
	}

	function handlePrimKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handlePrimSend();
		}
	}
</script>

<div class="container mx-auto max-w-5xl space-y-16 p-8">
	<div>
		<h1 class="mb-2 text-4xl font-bold">Chatbox Component</h1>
		<p class="text-muted-foreground">
			Conversational UI with typing indicators, avatars, auto-scroll, and
			composable primitives.
		</p>
	</div>

	<!-- ── 1. Basic ──────────────────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Basic</h2>
			<p class="text-sm text-muted-foreground">
				Default variant. Type a message and the bot echoes a reply.
			</p>
		</div>
		<div class="w-full max-w-lg">
			<Chatbox
				messages={basicMessages}
				onSend={handleBasicSend}
				placeholder="Say something…"
				class="h-80"
			/>
		</div>
	</section>

	<!-- ── 2. Typing Indicator ───────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Typing Indicator</h2>
			<p class="text-sm text-muted-foreground">
				The <code class="text-xs bg-muted px-1 py-0.5 rounded">loading</code>
				prop shows the animated three-dot typing indicator while the assistant is thinking.
			</p>
		</div>
		<div class="w-full max-w-lg">
			<Chatbox
				messages={loadingMessages}
				loading={loadingState}
				onSend={handleLoadingSend}
				assistantName="Aria"
				userName="You"
				placeholder="Ask Aria anything…"
				class="h-96"
			/>
		</div>
	</section>

	<!-- ── 3. Variants ───────────────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Variants</h2>
			<p class="text-sm text-muted-foreground">
				Three visual styles: <code class="text-xs bg-muted px-1 py-0.5 rounded">default</code>,
				<code class="text-xs bg-muted px-1 py-0.5 rounded">ghost</code>, and
				<code class="text-xs bg-muted px-1 py-0.5 rounded">elevated</code>.
			</p>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			<div class="space-y-2">
				<Badge>default</Badge>
				<Chatbox messages={variantSeed} variant="default" maxHeight="16rem" />
			</div>
			<div class="space-y-2 rounded-lg bg-muted/30 p-3">
				<Badge variant="secondary">ghost</Badge>
				<Chatbox messages={variantSeed} variant="ghost" maxHeight="16rem" />
			</div>
			<div class="space-y-2">
				<Badge variant="outline">elevated</Badge>
				<Chatbox messages={elevatedSeed} variant="elevated" maxHeight="16rem" />
			</div>
		</div>
	</section>

	<!-- ── 4. Sizes ──────────────────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Sizes</h2>
			<p class="text-sm text-muted-foreground">
				Controls padding and gap between messages.
			</p>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			<div class="space-y-2">
				<Badge>sm</Badge>
				<Chatbox messages={sizeSeed} size="sm" maxHeight="14rem" />
			</div>
			<div class="space-y-2">
				<Badge>default</Badge>
				<Chatbox messages={sizeSeed} size="default" maxHeight="14rem" />
			</div>
			<div class="space-y-2">
				<Badge>lg</Badge>
				<Chatbox messages={sizeLgSeed} size="lg" maxHeight="14rem" />
			</div>
		</div>
	</section>

	<!-- ── 5. Custom Empty State ─────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Custom Empty State</h2>
			<p class="text-sm text-muted-foreground">
				Provide an <code class="text-xs bg-muted px-1 py-0.5 rounded">empty</code>
				snippet to replace the default placeholder.
			</p>
		</div>
		<div class="w-full max-w-lg">
			<Chatbox
				messages={emptyMessages}
				onSend={handleEmptySend}
				class="h-80"
			>
				{#snippet empty()}
					<div
						class="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-muted-foreground"
					>
						<span class="text-5xl">💬</span>
						<p class="font-semibold text-foreground">Start a conversation</p>
						<p class="text-xs">Your messages will appear here.</p>
					</div>
				{/snippet}
			</Chatbox>
		</div>
	</section>

	<!-- ── 6. Disabled ───────────────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Disabled</h2>
			<p class="text-sm text-muted-foreground">
				Set <code class="text-xs bg-muted px-1 py-0.5 rounded">disabled</code>
				to lock the input — useful while navigating away or during auth.
			</p>
		</div>
		<div class="w-full max-w-lg">
			<Chatbox
				messages={[
					{
						id: "d1",
						role: "assistant",
						content: "This chatbox is currently disabled.",
					},
				]}
				disabled
				placeholder="Input disabled…"
				class="h-52"
			/>
		</div>
	</section>

	<!-- ── 7. Primitives ─────────────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Primitives</h2>
			<p class="text-sm text-muted-foreground">
				Use <code class="text-xs bg-muted px-1 py-0.5 rounded">ChatboxPrimitives</code>
				for full control — custom input row, injected avatars, bespoke layout.
			</p>
		</div>
		<div class="w-full max-w-lg">
			<ChatboxPrimitives.Root
				class="h-96 rounded-lg border border-border bg-card shadow-sm"
			>
				<ChatboxPrimitives.Messages class="flex-1 gap-4 overflow-y-auto p-4">
					{#each primMessages as msg (msg.id)}
						<ChatboxPrimitives.Message
							role={msg.role}
							timestamp={msg.timestamp}
						>
							{#snippet avatar()}
								<Avatar
									fallback={msg.role === "user" ? "U" : "AI"}
									size="sm"
									shape="circle"
									color={msg.role === "user" ? "primary" : "default"}
								/>
							{/snippet}
							{msg.content}
						</ChatboxPrimitives.Message>
					{/each}
					{#if primLoading}
						<ChatboxPrimitives.Typing />
					{/if}
				</ChatboxPrimitives.Messages>

				<ChatboxPrimitives.InputArea class="gap-2 border-t border-border p-3">
					<textarea
						bind:value={primValue}
						rows={1}
						placeholder="Custom input…"
						onkeydown={handlePrimKeydown}
						class="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					></textarea>
					<button
						type="button"
						onclick={handlePrimSend}
						disabled={!primValue.trim() || primLoading}
						class="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-40"
					>
						<SendHorizontalIcon class="size-4" />
					</button>
				</ChatboxPrimitives.InputArea>
			</ChatboxPrimitives.Root>
		</div>
	</section>

	<!-- ── 8. Real-world: Support Widget ────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Real-world: Support Widget</h2>
			<p class="text-sm text-muted-foreground">
				Embedded inside a <code class="text-xs bg-muted px-1 py-0.5 rounded">Card</code>
				with a custom header action.
			</p>
		</div>
		<div class="w-full max-w-lg">
			<Card>
				{#snippet headerAction()}
					<div class="flex items-center gap-2">
						<span class="size-2 rounded-full bg-green-500"></span>
						<span class="text-xs text-muted-foreground">Online</span>
					</div>
				{/snippet}

				<Chatbox
					messages={[
						{
							id: "sup1",
							role: "assistant",
							content: "Hi there! Welcome to support. What can I help you with?",
							timestamp: new Date(Date.now() - 2 * 60_000),
						},
					]}
					variant="ghost"
					assistantName="Support"
					assistantAvatar=""
					placeholder="Describe your issue…"
					maxHeight="20rem"
					class="rounded-none border-none shadow-none"
				/>
			</Card>
		</div>
	</section>
</div>
