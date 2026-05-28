import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import type { Component } from "svelte";
import CheckboxItem from "./dropdown-menu-checkbox-item.svelte";
import Content from "./dropdown-menu-content.svelte";
import Group from "./dropdown-menu-group.svelte";
import Item from "./dropdown-menu-item.svelte";
import Label from "./dropdown-menu-label.svelte";
import RadioGroup from "./dropdown-menu-radio-group.svelte";
import RadioItem from "./dropdown-menu-radio-item.svelte";
import Separator from "./dropdown-menu-separator.svelte";
import Shortcut from "./dropdown-menu-shortcut.svelte";
import Trigger from "./dropdown-menu-trigger.svelte";
import SubContent from "./dropdown-menu-sub-content.svelte";
import SubTrigger from "./dropdown-menu-sub-trigger.svelte";
import GroupHeading from "./dropdown-menu-group-heading.svelte";
import Simple, {
	type DropdownItem,
	type DropdownGroup,
} from "./dropdown-menu.svelte";
const Sub: Component = DropdownMenuPrimitive.Sub;
const Root: Component = DropdownMenuPrimitive.Root;

export type { DropdownItem, DropdownGroup };

export {
	CheckboxItem,
	Content,
	Root as DropdownMenuRoot,
	CheckboxItem as DropdownMenuCheckboxItem,
	Content as DropdownMenuContent,
	Group as DropdownMenuGroup,
	Item as DropdownMenuItem,
	Label as DropdownMenuLabel,
	RadioGroup as DropdownMenuRadioGroup,
	RadioItem as DropdownMenuRadioItem,
	Separator as DropdownMenuSeparator,
	Shortcut as DropdownMenuShortcut,
	Sub as DropdownMenuSub,
	SubContent as DropdownMenuSubContent,
	SubTrigger as DropdownMenuSubTrigger,
	Trigger as DropdownMenuTrigger,
	GroupHeading as DropdownMenuGroupHeading,
	Simple as DropdownMenu,
	Group,
	GroupHeading,
	Item,
	Label,
	RadioGroup,
	RadioItem,
	Root,
	Separator,
	Shortcut,
	Sub,
	SubContent,
	SubTrigger,
	Trigger,
	Simple,
};
