<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Chatbox } from "$lib/components/ui/chatbox";
	import type { ChatMessage } from "$lib/components/ui/chatbox";

	const { Story } = defineMeta({
		title: "Components/Chatbox",
		component: Chatbox,
		tags: ["autodocs"],
		argTypes: {
			variant: {
				control: { type: "select" },
				options: ["default", "ghost", "elevated"],
				description: "Visual style of the chatbox container",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "default" },
				},
			},
			size: {
				control: { type: "select" },
				options: ["sm", "default", "lg"],
				description: "Spacing and padding size",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "default" },
				},
			},
			loading: {
				control: { type: "boolean" },
				description: "Show animated typing indicator",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			disabled: {
				control: { type: "boolean" },
				description: "Disable the input and send button",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			placeholder: {
				control: { type: "text" },
				description: "Textarea placeholder text",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "Type a message…" },
				},
			},
			maxHeight: {
				control: { type: "text" },
				description: "CSS max-height of the messages area",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "32rem" },
				},
			},
			class: { control: false, table: { disable: true } },
			messages: { control: false, table: { disable: true } },
			onSend: { control: false, table: { disable: true } },
			empty: { control: false, table: { disable: true } },
		},
		parameters: {
			docs: { extractArgTypes: false },
		},
	});

	const seedMessages: ChatMessage[] = [
		{
			id: "1",
			role: "assistant",
			content: "Hi! I'm your assistant. How can I help you today?",
			timestamp: new Date(Date.now() - 5 * 60_000),
		},
		{
			id: "2",
			role: "user",
			content: "Can you tell me about aether-ui?",
			timestamp: new Date(Date.now() - 4 * 60_000),
		},
		{
			id: "3",
			role: "assistant",
			content:
				"Aether UI is a Svelte 5 component library built with Tailwind CSS v4. It ships both declarative shorthand components and fully composable primitives.",
			timestamp: new Date(Date.now() - 3 * 60_000),
		},
		{
			id: "4",
			role: "user",
			content: "That sounds great! Does it support dark mode?",
			timestamp: new Date(Date.now() - 2 * 60_000),
		},
		{
			id: "5",
			role: "assistant",
			content:
				"Yes! All components use CSS design tokens and support light and dark mode out of the box via mode-watcher.",
			timestamp: new Date(Date.now() - 1 * 60_000),
		},
	];
</script>

<!-- Default -->
<Story
	name="Default"
	args={{ variant: "default", messages: seedMessages, loading: false }}
>
	{#snippet template(args)}
		<div class="w-[480px]">
			<Chatbox {...args} />
		</div>
	{/snippet}
</Story>

<!-- Typing Indicator -->
<Story
	name="Loading / Typing"
	args={{ messages: seedMessages, loading: true }}
>
	{#snippet template(args)}
		<div class="w-[480px]">
			<Chatbox {...args} />
		</div>
	{/snippet}
</Story>

<!-- Empty State -->
<Story name="Empty State" args={{ messages: [] }}>
	{#snippet template(args)}
		<div class="w-[480px]">
			<Chatbox {...args} />
		</div>
	{/snippet}
</Story>

<!-- Ghost Variant -->
<Story
	name="Ghost"
	args={{ variant: "ghost", messages: seedMessages }}
>
	{#snippet template(args)}
		<div class="w-[480px] rounded-lg bg-muted/30 p-4">
			<Chatbox {...args} />
		</div>
	{/snippet}
</Story>

<!-- Elevated Variant -->
<Story
	name="Elevated"
	args={{ variant: "elevated", messages: seedMessages }}
>
	{#snippet template(args)}
		<div class="w-[480px]">
			<Chatbox {...args} />
		</div>
	{/snippet}
</Story>

<!-- Small Size -->
<Story
	name="Size — Small"
	args={{ size: "sm", messages: seedMessages }}
>
	{#snippet template(args)}
		<div class="w-[400px]">
			<Chatbox {...args} />
		</div>
	{/snippet}
</Story>

<!-- Large Size -->
<Story
	name="Size — Large"
	args={{ size: "lg", messages: seedMessages }}
>
	{#snippet template(args)}
		<div class="w-[560px]">
			<Chatbox {...args} />
		</div>
	{/snippet}
</Story>

<!-- With Names -->
<Story
	name="With Names"
	args={{
		messages: seedMessages,
		userName: "You",
		assistantName: "Aria",
	}}
>
	{#snippet template(args)}
		<div class="w-[480px]">
			<Chatbox {...args} />
		</div>
	{/snippet}
</Story>

<!-- Disabled -->
<Story
	name="Disabled Input"
	args={{ messages: seedMessages, disabled: true }}
>
	{#snippet template(args)}
		<div class="w-[480px]">
			<Chatbox {...args} />
		</div>
	{/snippet}
</Story>

<!-- Custom Empty Snippet -->
<Story name="Custom Empty State" args={{ messages: [] }}>
	{#snippet template(args)}
		<div class="w-[480px]">
			<Chatbox {...args}>
				{#snippet empty()}
					<div
						class="flex flex-col items-center gap-3 py-12 text-muted-foreground"
					>
						<span class="text-5xl">💬</span>
						<p class="font-semibold">Nothing here yet</p>
						<p class="text-xs">Send a message to get started.</p>
					</div>
				{/snippet}
			</Chatbox>
		</div>
	{/snippet}
</Story>

<!-- Long conversation — scroll behaviour -->
<Story name="Long Conversation" args={{}}>
	{#snippet template(args)}
		<div class="w-[480px]">
			<Chatbox
				{...args}
				messages={[
					{ id: "lc1", role: "assistant", content: "Hello! How can I help you today?", timestamp: new Date(Date.now() - 10 * 60_000) },
					{ id: "lc2", role: "user", content: "I'd like to learn about Svelte 5.", timestamp: new Date(Date.now() - 9 * 60_000) },
					{ id: "lc3", role: "assistant", content: "Svelte 5 introduces runes — a new reactivity system based on signals. The key runes are $state, $derived, $effect, and $props.", timestamp: new Date(Date.now() - 8 * 60_000) },
					{ id: "lc4", role: "user", content: "What's the difference between $state and $derived?", timestamp: new Date(Date.now() - 7 * 60_000) },
					{ id: "lc5", role: "assistant", content: "$state holds mutable reactive values you write to directly. $derived computes a value from other reactive state and updates automatically — similar to a computed property.", timestamp: new Date(Date.now() - 6 * 60_000) },
					{ id: "lc6", role: "user", content: "That makes sense. What about $effect?", timestamp: new Date(Date.now() - 5 * 60_000) },
					{ id: "lc7", role: "assistant", content: "$effect runs a side-effect whenever its reactive dependencies change — like logging, DOM manipulation, or calling an external API. It runs after the DOM updates.", timestamp: new Date(Date.now() - 4 * 60_000) },
					{ id: "lc8", role: "user", content: "Great explanation, thanks!", timestamp: new Date(Date.now() - 3 * 60_000) },
					{ id: "lc9", role: "assistant", content: "Happy to help! Let me know if you have more questions about Svelte 5 or aether-ui.", timestamp: new Date(Date.now() - 2 * 60_000) },
				]}
				assistantName="Aria"
				userName="You"
				maxHeight="24rem"
			/>
		</div>
	{/snippet}
</Story>
