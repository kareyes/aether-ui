import Root from "./chatbox-root.svelte";
import Messages from "./chatbox-messages.svelte";
import Message from "./chatbox-message.svelte";
import Typing from "./chatbox-typing.svelte";
import InputArea from "./chatbox-input.svelte";
import Chatbox from "./chatbox.svelte";

export {
	Root,
	Messages,
	Message,
	Typing,
	InputArea,
	Chatbox,
	// Named aliases
	Root as ChatboxRoot,
	Messages as ChatboxMessages,
	Message as ChatboxMessage,
	Typing as ChatboxTyping,
	InputArea as ChatboxInputArea,
};

export type {
	ChatMessage,
	ChatboxVariant,
	ChatboxSize,
	ChatboxMessageRole,
} from "./chatbox-variants.js";
