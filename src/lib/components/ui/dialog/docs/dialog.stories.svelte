<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogHeader,
		DialogFooter,
		DialogTitle,
		DialogDescription,
		DialogClose,
	} from "../index.js";
	import { Button } from "../../button/index.js";
	import { Input } from "../../input/index.js";
	import { Label } from "../../label/index.js";
	import { fn } from "storybook/test";
	import { Save, Trash2, Settings } from "@lucide/svelte";

	const { Story } = defineMeta({
		title: "Components/Dialog",
		component: Dialog,
		tags: ["autodocs"],
		argTypes: {
			open: {
				control: { type: "boolean" },
				description: "Controls the open state of the dialog",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			// Hide internal props
			onOpenChange: {
				control: false,
				table: { disable: true },
			},
			children: {
				control: false,
				table: { disable: true },
			},
		},
		args: {
			onOpenChange: fn(),
		},
	});
</script>

<Story name="Default">
		<DialogTrigger>
			<Button variant="outline">Open Dialog</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Edit Profile</DialogTitle>
				<DialogDescription>
					Make changes to your profile here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-end">Name</Label>
					<Input id="name" value="John Doe" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="email" class="text-end">Email</Label>
					<Input id="email" type="email" value="john@example.com" class="col-span-3" />
				</div>
			</div>
			<DialogFooter>
				<DialogClose>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<Button>Save changes</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Small Size">
	
		<DialogTrigger>
			<Button variant="outline">Small Dialog</Button>
		</DialogTrigger>
		<DialogContent size="sm">
			<DialogHeader>
				<DialogTitle>Small Dialog</DialogTitle>
				<DialogDescription>
					This is a small dialog, perfect for simple confirmations.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<Button>Confirm</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Default Size">
	
		<DialogTrigger>
			<Button variant="outline">Default Dialog</Button>
		</DialogTrigger>
		<DialogContent size="default">
			<DialogHeader>
				<DialogTitle>Default Size Dialog</DialogTitle>
				<DialogDescription>This is the default size dialog.</DialogDescription>
			</DialogHeader>
			<div class="py-4">
				<p class="text-sm text-muted-foreground">
					Default size is perfect for most use cases including forms and content display.
				</p>
			</div>
			<DialogFooter>
				<Button>Got it</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Large Size">
	
		<DialogTrigger>
			<Button variant="outline">Large Dialog</Button>
		</DialogTrigger>
		<DialogContent size="lg">
			<DialogHeader>
				<DialogTitle>Large Dialog</DialogTitle>
				<DialogDescription>
					This is a large dialog with more space for detailed content.
				</DialogDescription>
			</DialogHeader>
			<div class="py-4">
				<p class="text-sm text-muted-foreground mb-4">
					Large dialogs are great for forms with many fields or displaying detailed information.
				</p>
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="first-name">First Name</Label>
						<Input id="first-name" placeholder="John" />
					</div>
					<div class="space-y-2">
						<Label for="last-name">Last Name</Label>
						<Input id="last-name" placeholder="Doe" />
					</div>
				</div>
			</div>
			<DialogFooter>
				<Button>Save</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Extra Large Size">
	
		<DialogTrigger>
			<Button variant="outline">XL Dialog</Button>
		</DialogTrigger>
		<DialogContent size="xl">
			<DialogHeader>
				<DialogTitle>Extra Large Dialog</DialogTitle>
				<DialogDescription>
					This is an extra large dialog for content that needs maximum space.
				</DialogDescription>
			</DialogHeader>
			<div class="py-4">
				<p class="text-sm text-muted-foreground">
					Extra large dialogs can accommodate complex layouts, data tables, or detailed forms.
				</p>
			</div>
			<DialogFooter>
				<Button>Close</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Full Width">
	
		<DialogTrigger>
			<Button variant="outline">Full Width Dialog</Button>
		</DialogTrigger>
		<DialogContent size="full">
			<DialogHeader>
				<DialogTitle>Full Width Dialog</DialogTitle>
				<DialogDescription>
					This dialog takes up almost the full viewport width (90vw on desktop).
				</DialogDescription>
			</DialogHeader>
			<div class="py-4">
				<p class="text-sm text-muted-foreground">
					Full width dialogs are useful for dashboards, complex interfaces, or when you need
					maximum space.
				</p>
			</div>
			<DialogFooter>
				<Button>Close</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Centered Variant">
	
		<DialogTrigger>
			<Button variant="outline">Centered Dialog</Button>
		</DialogTrigger>
		<DialogContent variant="centered" size="sm">
			<DialogHeader>
				<DialogTitle>Centered Layout</DialogTitle>
				<DialogDescription>All content is centered on all screen sizes.</DialogDescription>
			</DialogHeader>
			<div class="py-4 text-center">
				<p class="text-sm text-muted-foreground">
					Centered variant is great for alerts and confirmations.
				</p>
			</div>
			<DialogFooter>
				<Button>Confirm</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="With Icon">
	
		<DialogTrigger>
			<Button variant="outline">
				<Settings class="size-4 mr-2" />
				Settings
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					<Settings class="size-5 inline mr-2" />
					Settings
				</DialogTitle>
				<DialogDescription>Configure your application settings.</DialogDescription>
			</DialogHeader>
			<div class="py-4">
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<Label for="notifications">Notifications</Label>
						<Input id="notifications" type="checkbox" class="w-auto" />
					</div>
					<div class="flex items-center justify-between">
						<Label for="dark-mode">Dark Mode</Label>
						<Input id="dark-mode" type="checkbox" class="w-auto" />
					</div>
				</div>
			</div>
			<DialogFooter>
				<Button>
					<Save class="size-4 mr-2" />
					Save Settings
				</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Destructive Action">
	
		<DialogTrigger>
			<Button variant="destructive">
				<Trash2 class="size-4 mr-2" />
				Delete
			</Button>
		</DialogTrigger>
		<DialogContent size="sm" variant="centered">
			<DialogHeader>
				<DialogTitle>Are you absolutely sure?</DialogTitle>
				<DialogDescription>
					This action cannot be undone. This will permanently delete your account and remove
					your data from our servers.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<Button variant="destructive">
					<Trash2 class="size-4 mr-2" />
					Delete Account
				</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Without Close Button">
	
		<DialogTrigger>
			<Button variant="outline">No Close Button</Button>
		</DialogTrigger>
		<DialogContent showCloseButton={false}>
			<DialogHeader>
				<DialogTitle>Important Action</DialogTitle>
				<DialogDescription>
					This dialog requires you to make a choice. You must select an action to continue.
				</DialogDescription>
			</DialogHeader>
			<div class="py-4">
				<p class="text-sm text-muted-foreground">
					Without a close button, users must use one of the provided actions.
				</p>
			</div>
			<DialogFooter>
				<DialogClose>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<DialogClose>
					<Button>Confirm</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Scrollable Content">
	
		<DialogTrigger>
			<Button variant="outline">Scrollable Content</Button>
		</DialogTrigger>
		<DialogContent size="lg">
			<DialogHeader>
				<DialogTitle>Terms and Conditions</DialogTitle>
				<DialogDescription>Please read through our terms and conditions.</DialogDescription>
			</DialogHeader>
			<div class="max-h-[400px] overflow-y-auto py-4">
				{#each Array(15) as _, i}
					<p class="mb-4 text-sm">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Section {i + 1}.
					</p>
				{/each}
			</div>
			<DialogFooter>
				<DialogClose>
					<Button variant="outline">Decline</Button>
				</DialogClose>
				<Button>Accept</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Simple Alert">
	
		<DialogTrigger>
			<Button variant="outline">Show Alert</Button>
		</DialogTrigger>
		<DialogContent size="sm" variant="centered">
			<DialogHeader>
				<DialogTitle>Success!</DialogTitle>
				<DialogDescription>Your changes have been saved successfully.</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose>
					<Button>OK</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	
</Story>

<Story name="Form Example">
	
		<DialogTrigger>
			<Button>Create Account</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Create Account</DialogTitle>
				<DialogDescription>Fill in your details to create a new account.</DialogDescription>
			</DialogHeader>
			<div class="grid gap-4 py-4">
				<div class="space-y-2">
					<Label for="username">Username</Label>
					<Input id="username" placeholder="johndoe" />
				</div>
				<div class="space-y-2">
					<Label for="email-form">Email</Label>
					<Input id="email-form" type="email" placeholder="john@example.com" />
				</div>
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" placeholder="••••••••" />
				</div>
			</div>
			<DialogFooter>
				<DialogClose>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<Button>Create Account</Button>
			</DialogFooter>
		</DialogContent>
	
</Story>
