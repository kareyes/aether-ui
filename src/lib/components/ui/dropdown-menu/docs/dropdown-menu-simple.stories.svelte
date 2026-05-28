<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { DropdownMenu, Trigger } from "../index.js";
	import {ChevronDown, User, Settings, LogOut, Plus, Mail, UserPlus, MessageSquare, PlusCircle, FileText, Image, Video, Music, Share2, Copy, Download } from "@lucide/svelte";
	import { fn } from "storybook/test";

	const { Story } = defineMeta({
		title: "Components/Dropdown Menu",
		component: DropdownMenu,
		tags: ["autodocs"],
		argTypes:{
			triggerVariant: {
				control: "select",
				options: ["default", "primary", "secondary"],
				description: "Variant of the trigger button",
				table: {
					type: { summary: "default | primary | secondary" },
					defaultValue: { summary: "default" },
				},
			},
			triggerSize: {
				control: "select",
				options: ["sm", "md", "lg"],
				description: "Size of the trigger button",
				table: {
					type: { summary: "sm | md | lg" },
					defaultValue: { summary: "md" },
				},
			},
			triggerText: {
				control: "text",
				description: "Text of the trigger button",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "Open Menu" },
				},
			},
			showChevron: {
				control: "boolean",
				description: "Whether to show the chevron icon",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "true" },
				},
			},
			side: {
				control: "select",
				options: ["top", "right", "bottom", "left"],
				description: "Side on which the dropdown menu appears",
				table: {
					type: { summary: "top | right | bottom | left" },
					defaultValue: { summary: "bottom" },
				},
			},
			open: {
				control: "boolean",
				description: "Whether the dropdown menu is open",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			align:{
				control: "select",
				options: ["start", "center", "end"],
				description: "Alignment of the dropdown menu",
				table: {
					type: { summary: "start | center | end" },
					defaultValue: { summary: "start" },
				},
			}


		},
		parameters: {
			layout: "centered",
			docs: {
				extractArgTypes: false,
			},
		},
	});

	const basicItems = [
		{ label: "Profile", icon: User, onSelect: fn() },
		{ label: "Settings", icon: Settings, onSelect: fn() },
		{ type: "separator" },
		{ label: "Logout", icon: LogOut, variant: "destructive", onSelect: fn() },
	];

	const itemsWithShortcuts = [
		{ label: "New File", icon: Plus, shortcut: "⌘N", onSelect: fn() },
		{ label: "New Email", icon: Mail, shortcut: "⌘E", onSelect: fn() },
		{ type: "separator" },
		{ label: "Settings", icon: Settings, shortcut: "⌘,", onSelect: fn() },
	];

	const checkboxItems = [
		{ type: "label", label: "View Options" },
		{ type: "checkbox", label: "Show Toolbar", checked: true, onSelect: fn() },
		{ type: "checkbox", label: "Show Sidebar", checked: false, onSelect: fn() },
		{ type: "checkbox", label: "Show Status Bar", checked: true, onSelect: fn() },
	];

	const radioGroups = [
		{
			type: "radio",
			label: "Theme",
			value: "light",
			items: [
				{ label: "Light", value: "light" },
				{ label: "Dark", value: "dark" },
				{ label: "System", value: "system" },
			],
			onValueChange: fn(),
		},
	];

	const groupedItems = [
		{
			label: "User Actions",
			items: [
				{ label: "Profile", icon: User, onSelect: fn() },
				{ label: "Settings", icon: Settings, onSelect: fn() },
			],
		},
		{ type: "separator" },
		{
			label: "Communication",
			items: [
				{ label: "Send Message", icon: MessageSquare, onSelect: fn() },
				{ label: "Invite User", icon: UserPlus, onSelect: fn() },
			],
		},
		{ type: "separator" },
		{
			items: [
				{ label: "Logout", icon: LogOut, variant: "destructive", onSelect: fn() },
			],
		},
	];

	const submenuItems = [
		{ label: "Profile", icon: User, onSelect: fn() },
		{ 
			type: "submenu",
			label: "Share",
			icon: Share2,
			items: [
				{ label: "Copy Link", icon: Copy, onSelect: fn() },
				{ label: "Download", icon: Download, onSelect: fn() },
				{ type: "separator" },
				{ label: "Email", icon: Mail, onSelect: fn() },
				{ label: "Message", icon: MessageSquare, onSelect: fn() },
			]
		},
		{ 
			type: "submenu",
			label: "New File",
			icon: Plus,
			items: [
				{ label: "Text Document", icon: FileText, onSelect: fn() },
				{ label: "Image", icon: Image, onSelect: fn() },
				{ label: "Video", icon: Video, onSelect: fn() },
				{ label: "Audio", icon: Music, onSelect: fn() },
			]
		},
		{ type: "separator" },
		{ label: "Settings", icon: Settings, onSelect: fn() },
	];

	const nestedSubmenuItems = [
		{ label: "Home", onSelect: fn() },
		{ 
			type: "submenu",
			label: "File",
			icon: FileText,
			items: [
				{ label: "New", icon: Plus, shortcut: "⌘N", onSelect: fn() },
				{ 
					type: "submenu",
					label: "Open Recent",
					items: [
						{ label: "Document 1.txt", onSelect: fn() },
						{ label: "Document 2.txt", onSelect: fn() },
						{ label: "Document 3.txt", onSelect: fn() },
					]
				},
				{ type: "separator" },
				{ label: "Save", shortcut: "⌘S", onSelect: fn() },
			]
		},
		{ type: "separator" },
		{ label: "Exit", variant: "destructive", onSelect: fn() },
	];
</script>

<!-- Basic Menu -->
<Story name="Basic Menu" args={{ 
	triggerText: "Open Menu",
	items: basicItems
}} />

<!-- With Shortcuts -->
<Story name="With Shortcuts" args={{ 
	triggerText: "Actions",
	items: itemsWithShortcuts,
	triggerVariant: "default"
}} />

<!-- Checkbox Items -->
<Story name="Checkbox Items" args={{ 
	triggerText: "View",
	items: checkboxItems
}} />

<!-- Radio Group -->
<Story name="Radio Group" args={{ 
	triggerText: "Theme",
	items: radioGroups
}} />

<!-- Grouped Items -->
<Story name="Grouped Items" args={{ 
	triggerText: "Menu",
	items: groupedItems
}} />

<!-- Submenu -->
<Story name="With Submenu" args={{ 
	triggerText: "Actions",
	items: submenuItems
}} />

<!-- Nested Submenu -->
<Story name="Nested Submenu" args={{ 
	triggerText: "File Menu",
	items: nestedSubmenuItems
}} />

<!-- Different Trigger Variants -->
<Story name="Trigger - Default" args={{ 
	triggerText: "Default",
	triggerVariant: "default",
	items: basicItems
}} />

<Story name="Trigger - Ghost" args={{ 
	triggerText: "Ghost",
	triggerVariant: "ghost",
	items: basicItems
}} />

<Story name="Trigger - Secondary" args={{ 
	triggerText: "Secondary",
	triggerVariant: "secondary",
	items: basicItems
}} />

<!-- Different Sizes -->
<Story name="Size - Small" args={{ 
	triggerText: "Small",
	triggerSize: "sm",
	items: basicItems
}} />

<Story name="Size - Large" args={{ 
	triggerText: "Large",
	triggerSize: "lg",
	items: basicItems
}} />

<!-- Without Chevron -->
<Story name="No Chevron" args={{ 
	triggerText: "Menu",
	showChevron: false,
	items: basicItems
}} />

<!-- With Icon -->
<Story name="With Trigger Icon" args={{ 
	triggerText: "Add",
	triggerIcon: Plus,
	items: [
		{ label: "New File", icon: Plus, onSelect: fn() },
		{ label: "New Folder", icon: PlusCircle, onSelect: fn() },
	]
}} />

<!-- Alignment Options -->
<Story name="Align - Center" args={{ 
	triggerText: "Centered",
	align: "center",
	items: basicItems
}} />

<Story name="Align - End" args={{ 
	triggerText: "End Aligned",
	align: "end",
	items: basicItems
}} />

<!-- Complex Example -->
<Story name="Complex Menu" args={{ 
	triggerText: "Account",
	triggerVariant: "outline",
	items: [
		{
			label: "My Account",
			items: [
				{ label: "Profile", icon: User, shortcut: "⌘P", onSelect: fn() },
				{ label: "Settings", icon: Settings, shortcut: "⌘S", onSelect: fn() },
			],
		},
		{ type: "separator" },
		{
			type: "radio",
			label: "Theme",
			value: "light",
			items: [
				{ label: "Light", value: "light" },
				{ label: "Dark", value: "dark" },
				{ label: "System", value: "system" },
			],
			onValueChange: fn(),
		},
		{ type: "separator" },
		{
			label: "View Options",
			items: [
				{ type: "checkbox", label: "Show Toolbar", checked: true, onSelect: fn() },
				{ type: "checkbox", label: "Show Sidebar", checked: false, onSelect: fn() },
			],
		},
		{ type: "separator" },
		{
			items: [
				{ label: "Logout", icon: LogOut, variant: "destructive", shortcut: "⌘Q", onSelect: fn() },
			],
		},
	]
}} />

<Story name="Custom Trigger">
	{#snippet template()}
		<DropdownMenu items={[
		{ label: "Profile", icon: User, onSelect: fn() },
		{ label: "Settings", icon: Settings, onSelect: fn() },
		{ type: "separator" },
		{ label: "Logout", icon: LogOut, variant: "destructive", onSelect: fn() },
	]}>
			{#snippet trigger()}
				<Trigger>
					{#snippet child({ props })}
						<div {...props} class="cursor-pointer hover:opacity-80 transition-opacity">
							<div class="flex items-center gap-2">
								<div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
									JD
								</div>
								<span class="text-sm font-medium">John Doe</span>
								<ChevronDown class="size-3 text-muted-foreground" />
							</div>
						</div>
					{/snippet}
				</Trigger>
			{/snippet}
		</DropdownMenu>
	{/snippet}
</Story>




