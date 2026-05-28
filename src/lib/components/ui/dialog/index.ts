import { Dialog as DialogPrimitive } from "bits-ui";
import type { Component } from "svelte";

import Title from "./dialog-title.svelte";
import Footer from "./dialog-footer.svelte";
import Header from "./dialog-header.svelte";
import Overlay from "./dialog-overlay.svelte";
import Content from "./dialog-content.svelte";
import Description from "./dialog-description.svelte";
import Trigger from "./dialog-trigger.svelte";
import Close from "./dialog-close.svelte";

const Root: Component = DialogPrimitive.Root;
const Portal: Component = DialogPrimitive.Portal;

export {
	Root,
	Title,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	Close,
	//
	Root as Dialog,
	Title as DialogTitle,
	Portal as DialogPortal,
	Footer as DialogFooter,
	Header as DialogHeader,
	Trigger as DialogTrigger,
	Overlay as DialogOverlay,
	Content as DialogContent,
	Description as DialogDescription,
	Close as DialogClose,
};

export type {
	DialogSize,
	DialogVariant,
	DialogVariants,
} from "./dialog-variants.js";
