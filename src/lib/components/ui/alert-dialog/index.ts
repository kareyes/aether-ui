import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { Component } from "svelte";
import Trigger from "./alert-dialog-trigger.svelte";
import Title from "./alert-dialog-title.svelte";
import Action from "./alert-dialog-action.svelte";
import Cancel from "./alert-dialog-cancel.svelte";
import Footer from "./alert-dialog-footer.svelte";
import Header from "./alert-dialog-header.svelte";
import Overlay from "./alert-dialog-overlay.svelte";
import Content from "./alert-dialog-content.svelte";
import Description from "./alert-dialog-description.svelte";
import Impl from "./alert-dialog-impl.svelte";
import Provider from "./alert-dialog-provider.svelte";

const Root: Component = AlertDialogPrimitive.Root;
const Portal: Component = AlertDialogPrimitive.Portal;

export {
	Root,
	Title,
	Action,
	Cancel,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	Impl,
	Provider,
	//
	Root as AlertDialog,
	Title as AlertDialogTitle,
	Action as AlertDialogAction,
	Cancel as AlertDialogCancel,
	Portal as AlertDialogPortal,
	Footer as AlertDialogFooter,
	Header as AlertDialogHeader,
	Trigger as AlertDialogTrigger,
	Overlay as AlertDialogOverlay,
	Content as AlertDialogContent,
	Description as AlertDialogDescription,
	Impl as AlertDialogImpl,
	Provider as AlertDialogProvider,
};

export { getAlertDialogContext } from "./alert-dialog-provider.svelte";
export type {
	AlertDialogConfig,
	AlertDialogContext,
} from "./alert-dialog-provider.svelte";
export type {
	AlertDialogVariant,
	AlertDialogSize,
} from "./alert-dialog-variants.js";
