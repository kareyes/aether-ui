# Chatbox

A conversational UI component with support for user and assistant messages, typing indicators, avatars, auto-scroll, and auto-resizing input. Ships both a declarative `Chatbox` shorthand and fully composable primitives.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Chatbox component is included in the `aether-ui` package.

```bash
bun add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { Chatbox, type ChatMessage } from "aether-ui";

  let messages: ChatMessage[] = [
    { id: "1", role: "assistant", content: "Hi! How can I help you today?" },
  ];

  async function handleSend(text: string) {
    messages = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: text },
    ];
    // call your API, push assistant reply…
  }
</script>

<Chatbox {messages} onSend={handleSend} />
```

### With Loading / Typing Indicator

```svelte
<script lang="ts">
  import { Chatbox, type ChatMessage } from "aether-ui";

  let messages: ChatMessage[] = [];
  let loading = $state(false);

  async function handleSend(text: string) {
    messages = [...messages, { id: crypto.randomUUID(), role: "user", content: text }];
    loading = true;
    const reply = await fetchAIReply(text);
    loading = false;
    messages = [...messages, { id: crypto.randomUUID(), role: "assistant", content: reply }];
  }
</script>

<Chatbox {messages} {loading} onSend={handleSend} />
```

### With Primitives

```svelte
<script lang="ts">
  import { ChatboxPrimitives } from "aether-ui";
</script>

<ChatboxPrimitives.Root class="h-96 rounded-lg border">
  <ChatboxPrimitives.Messages>
    <ChatboxPrimitives.Message role="assistant">
      Hello! How can I help?
    </ChatboxPrimitives.Message>
    <ChatboxPrimitives.Message role="user">
      What is the weather like?
    </ChatboxPrimitives.Message>
    <ChatboxPrimitives.Typing />
  </ChatboxPrimitives.Messages>

  <ChatboxPrimitives.InputArea>
    <!-- your custom input here -->
  </ChatboxPrimitives.InputArea>
</ChatboxPrimitives.Root>
```

## Components

| Component | Export | Description |
|-----------|--------|-------------|
| `Chatbox` | shorthand | Fully declarative chatbox — manages input state, scroll, and layout |
| `Root` | primitive | Outer flex container (`data-slot="chatbox"`) |
| `Messages` | primitive | Scrollable messages area (`data-slot="chatbox-messages"`) |
| `Message` | primitive | Single message bubble with role, name, timestamp, and avatar slot |
| `Typing` | primitive | Animated three-dot typing indicator |
| `InputArea` | primitive | Bottom container for the input row (`data-slot="chatbox-input"`) |

## Props Reference

### `Chatbox` (Shorthand)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `messages` | `ChatMessage[]` | `[]` | Array of messages to display |
| `loading` | `boolean` | `false` | Show typing indicator (assistant is thinking) |
| `placeholder` | `string` | `"Type a message…"` | Textarea placeholder text |
| `disabled` | `boolean` | `false` | Disable the input and send button |
| `variant` | `ChatboxVariant` | `"default"` | Visual style variant |
| `size` | `ChatboxSize` | `"default"` | Spacing/padding size |
| `maxHeight` | `string` | `"32rem"` | CSS max-height of the messages area |
| `class` | `string` | — | Additional CSS classes on the root element |
| `userAvatar` | `string` | — | Image URL for the user's avatar |
| `userName` | `string` | — | Display name shown above user messages |
| `assistantAvatar` | `string` | — | Image URL for the assistant's avatar |
| `assistantName` | `string` | — | Display name shown above assistant messages |
| `onSend` | `(msg: string) => void \| Promise<void>` | — | Called when the user sends a message |
| `empty` | `Snippet` | — | Custom content rendered when `messages` is empty |

### `ChatMessage` Type

```ts
type ChatMessage = {
  id: string;               // unique identifier
  role: "user" | "assistant";
  content: string;
  timestamp?: Date | string; // shown as HH:MM below the bubble
  avatar?: string;           // per-message avatar URL override
  name?: string;             // per-message name override
};
```

### `Message` (Primitive)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `role` | `"user" \| "assistant"` | `"assistant"` | Controls alignment and bubble color |
| `name` | `string` | — | Name label above the bubble |
| `timestamp` | `Date \| string` | — | Timestamp shown below the bubble |
| `class` | `string` | — | Extra classes on the wrapper |
| `bubbleClass` | `string` | — | Extra classes on the bubble element |
| `avatar` | `Snippet` | — | Avatar rendered beside the bubble |
| `children` | `Snippet` | required | Bubble content |

## Variants

### `variant`

| Value | Description |
|-------|-------------|
| `default` | Card-like container with border and shadow |
| `ghost` | No border or shadow — transparent background |
| `elevated` | Deeper shadow for a floating appearance |

### `size`

| Value | Messages padding | Input padding |
|-------|-----------------|---------------|
| `sm` | `p-3` / `gap-3` | `p-2` |
| `default` | `p-4` / `gap-4` | `p-3` |
| `lg` | `p-5` / `gap-5` | `p-4` |

## Examples

### AI Assistant

```svelte
<script lang="ts">
  import { Chatbox, type ChatMessage } from "aether-ui";

  let messages: ChatMessage[] = [
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI assistant. Ask me anything.",
    },
  ];
  let loading = $state(false);

  async function handleSend(text: string) {
    messages = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: text },
    ];
    loading = true;
    await new Promise((r) => setTimeout(r, 1200));
    messages = [
      ...messages,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `You said: "${text}". Here is my reply.`,
      },
    ];
    loading = false;
  }
</script>

<div class="h-[500px]">
  <Chatbox
    {messages}
    {loading}
    onSend={handleSend}
    assistantName="Aria"
    userName="You"
    placeholder="Ask Aria anything…"
    class="h-full"
  />
</div>
```

### Custom Empty State

```svelte
<Chatbox {messages} onSend={handleSend}>
  {#snippet empty()}
    <div class="flex flex-col items-center gap-3 py-12 text-muted-foreground">
      <span class="text-4xl">💬</span>
      <p class="font-medium">Start a conversation</p>
      <p class="text-xs">Your messages will appear here.</p>
    </div>
  {/snippet}
</Chatbox>
```

### Ghost Variant (embedded in a page)

```svelte
<Chatbox
  {messages}
  onSend={handleSend}
  variant="ghost"
  class="h-full"
/>
```

### Elevated with Avatars

```svelte
<Chatbox
  {messages}
  {loading}
  onSend={handleSend}
  variant="elevated"
  userAvatar="/avatars/alice.png"
  userName="Alice"
  assistantAvatar="/avatars/bot.png"
  assistantName="Bot"
  maxHeight="40rem"
/>
```

### Timestamps

Pass a `timestamp` on each message for HH:MM labels under each bubble:

```svelte
const messages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "Good morning!",
    timestamp: new Date(),
  },
];
```

### Compositional — Custom Input Row

```svelte
<script lang="ts">
  import { ChatboxPrimitives, Button } from "aether-ui";
  import MicIcon from "@lucide/svelte/icons/mic";

  let value = $state("");
</script>

<ChatboxPrimitives.Root class="h-96 rounded-lg border">
  <ChatboxPrimitives.Messages class="p-4">
    <!-- messages rendered here -->
  </ChatboxPrimitives.Messages>

  <ChatboxPrimitives.InputArea>
    <textarea
      bind:value
      rows={1}
      placeholder="Type or speak…"
      class="flex-1 resize-none rounded-lg border px-3 py-2 text-sm"
    ></textarea>
    <Button size="icon-sm" variant="ghost">
      <MicIcon class="size-4" />
    </Button>
    <Button size="icon-sm">Send</Button>
  </ChatboxPrimitives.InputArea>
</ChatboxPrimitives.Root>
```

### Per-Message Avatar Override

Each `ChatMessage` can carry its own `avatar` and `name`, overriding component-level defaults:

```ts
const messages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "Switching personas mid-conversation.",
    avatar: "/avatars/gpt4.png",
    name: "GPT-4",
  },
  {
    id: "2",
    role: "assistant",
    content: "Now it's me.",
    avatar: "/avatars/claude.png",
    name: "Claude",
  },
];
```

## Accessibility

- The send button has an `aria-label="Send message"` for screen readers.
- Press **Enter** to send; **Shift+Enter** inserts a newline — standard chat convention.
- The textarea is `disabled` while a message is being sent, preventing double-submission.
- Message bubbles carry a `data-role` attribute (`user` / `assistant`) for targeted styling or testing.
- The messages container is a scrollable `div` — ensure a fixed height or `maxHeight` is set so it doesn't grow unbounded and push the input off-screen.
- Use `userName` / `assistantName` to give context to screen readers about who sent each message.
