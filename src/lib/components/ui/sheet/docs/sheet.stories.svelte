<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';
	import {
		Sheet,
		SheetTrigger,
		SheetContent,
		SheetHeader,
		SheetFooter,
		SheetTitle,
		SheetDescription,
		SheetClose
	} from "$lib/components/ui/sheet";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Menu, Settings, Bell, User, Mail, Lock, ShoppingCart } from "@lucide/svelte";

	const { Story } = defineMeta({
		title: 'Components/Sheet',
		component: Sheet,
		tags: ['autodocs'],
		argTypes: {
			open: {
				control: { type: 'boolean' },
				description: 'Controls the open state',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			// Hide unwanted props from controls
			onOpenChange: {
				control: false,
				table: { disable: true },
			},
		},
		parameters: {
			docs: {
				extractArgTypes: false,
			},
		},
	});
</script>


<Story name="Default">
		<SheetTrigger>
			<Button variant="outline">Open Sheet</Button>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Edit Profile</SheetTitle>
				<SheetDescription>
					Make changes to your profile here. Click save when you're done.
				</SheetDescription>
			</SheetHeader>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-end">Name</Label>
					<Input id="name" value="Pedro Duarte" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="username" class="text-end">Username</Label>
					<Input id="username" value="@peduarte" class="col-span-3" />
				</div>
			</div>
			<SheetFooter>
				<SheetClose>
					<Button type="submit">Save changes</Button>
				</SheetClose>
			</SheetFooter>
		</SheetContent>
</Story>


<Story name="Left Side">
	
		<SheetTrigger>
			<Button variant="outline">
				<Menu class="mr-2 size-4" />
				Menu
			</Button>
		</SheetTrigger>
		<SheetContent side="left">
			<SheetHeader>
				<SheetTitle>Navigation</SheetTitle>
				<SheetDescription>
					Navigate to different sections of the application.
				</SheetDescription>
			</SheetHeader>
			<nav class="flex flex-col gap-4 py-4">
				<a href="#home" class="text-lg font-medium hover:underline">Home</a>
				<a href="#about" class="text-lg font-medium hover:underline">About</a>
				<a href="#services" class="text-lg font-medium hover:underline">Services</a>
				<a href="#contact" class="text-lg font-medium hover:underline">Contact</a>
			</nav>
		</SheetContent>
	
</Story>


<Story name="Top Side">
	
		<SheetTrigger>
			<Button variant="outline">
				<Bell class="mr-2 size-4" />
				Announcements
			</Button>
		</SheetTrigger>
		<SheetContent side="top">
			<SheetHeader>
				<SheetTitle>Important Announcements</SheetTitle>
				<SheetDescription>
					Read the latest updates and announcements.
				</SheetDescription>
			</SheetHeader>
			<div class="space-y-4 py-4">
				<div class="rounded-lg border p-4">
					<h4 class="font-semibold">System Maintenance</h4>
					<p class="text-sm text-muted-foreground">
						Scheduled maintenance on Sunday, 2AM - 4AM EST.
					</p>
				</div>
				<div class="rounded-lg border p-4">
					<h4 class="font-semibold">New Features Released</h4>
					<p class="text-sm text-muted-foreground">
						Check out our latest features in the dashboard.
					</p>
				</div>
			</div>
		</SheetContent>
	
</Story>


<Story name="Bottom Side">
	
		<SheetTrigger>
			<Button variant="outline">
				<Bell class="mr-2 size-4" />
				Notifications
			</Button>
		</SheetTrigger>
		<SheetContent side="bottom">
			<SheetHeader>
				<SheetTitle>Recent Notifications</SheetTitle>
				<SheetDescription>
					You have 3 unread notifications.
				</SheetDescription>
			</SheetHeader>
			<div class="space-y-4 py-4">
				<div class="flex items-start gap-4 border-b pb-4">
					<div class="flex-1">
						<p class="font-medium">New message received</p>
						<p class="text-sm text-muted-foreground">2 minutes ago</p>
					</div>
				</div>
				<div class="flex items-start gap-4 border-b pb-4">
					<div class="flex-1">
						<p class="font-medium">Update available</p>
						<p class="text-sm text-muted-foreground">1 hour ago</p>
					</div>
				</div>
				<div class="flex items-start gap-4">
					<div class="flex-1">
						<p class="font-medium">Task completed</p>
						<p class="text-sm text-muted-foreground">3 hours ago</p>
					</div>
				</div>
			</div>
		</SheetContent>
	
</Story>


<Story name="With Form">
	
		<SheetTrigger>
			<Button>Create Account</Button>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Create Account</SheetTitle>
				<SheetDescription>
					Fill in the details below to create a new account.
				</SheetDescription>
			</SheetHeader>
			<div class="grid gap-4 py-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="you@example.com" />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" />
				</div>
				<div class="grid gap-2">
					<Label for="confirm">Confirm Password</Label>
					<Input id="confirm" type="password" />
				</div>
			</div>
			<SheetFooter>
				<SheetClose>
					<Button variant="outline">Cancel</Button>
				</SheetClose>
				<Button type="submit">Create Account</Button>
			</SheetFooter>
		</SheetContent>
	
</Story>


<Story name="Settings Panel">
	
		<SheetTrigger>
			<Button variant="outline">
				<Settings class="mr-2 size-4" />
				Settings
			</Button>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Settings</SheetTitle>
				<SheetDescription>
					Manage your account settings and preferences.
				</SheetDescription>
			</SheetHeader>
			<div class="space-y-6 py-4">
				<div class="space-y-2">
					<h4 class="font-medium">Profile Settings</h4>
					<div class="grid gap-2">
						<Label for="display-name">Display Name</Label>
						<Input id="display-name" placeholder="Your name" />
					</div>
				</div>
				<div class="space-y-2">
					<h4 class="font-medium">Email Notifications</h4>
					<div class="flex items-center justify-between">
						<Label for="newsletter" class="text-sm">Newsletter</Label>
						<input type="checkbox" id="newsletter" checked />
					</div>
					<div class="flex items-center justify-between">
						<Label for="updates" class="text-sm">Product Updates</Label>
						<input type="checkbox" id="updates" />
					</div>
				</div>
			</div>
			<SheetFooter>
				<SheetClose>
					<Button variant="outline">Cancel</Button>
				</SheetClose>
				<Button>Save Settings</Button>
			</SheetFooter>
		</SheetContent>
	
</Story>


<Story name="Contact Form">
	
		<SheetTrigger>
			<Button>
				<Mail class="mr-2 size-4" />
				Contact Us
			</Button>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Contact Us</SheetTitle>
				<SheetDescription>
					Send us a message and we'll get back to you as soon as possible.
				</SheetDescription>
			</SheetHeader>
			<div class="grid gap-4 py-4">
				<div class="grid gap-2">
					<Label for="contact-name">Name</Label>
					<Input id="contact-name" placeholder="Your name" />
				</div>
				<div class="grid gap-2">
					<Label for="contact-email">Email</Label>
					<Input id="contact-email" type="email" placeholder="you@example.com" />
				</div>
				<div class="grid gap-2">
					<Label for="message">Message</Label>
					<Textarea id="message" placeholder="Type your message here..." rows={5} />
				</div>
			</div>
			<SheetFooter>
				<SheetClose>
					<Button variant="outline">Cancel</Button>
				</SheetClose>
				<Button>Send Message</Button>
			</SheetFooter>
		</SheetContent>
	
</Story>


<Story name="User Profile">
	
		<SheetTrigger>
			<Button variant="ghost" size="icon">
				<User class="size-4" />
			</Button>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>User Profile</SheetTitle>
				<SheetDescription>
					View and manage your profile information.
				</SheetDescription>
			</SheetHeader>
			<div class="space-y-6 py-4">
				<div class="flex items-center gap-4">
					<div class="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<User class="size-8" />
					</div>
					<div>
						<p class="font-semibold">John Doe</p>
						<p class="text-sm text-muted-foreground">john.doe@example.com</p>
					</div>
				</div>
				<div class="space-y-2">
					<h4 class="text-sm font-medium">Account Details</h4>
					<div class="space-y-1 text-sm">
						<p><span class="text-muted-foreground">Member since:</span> January 2024</p>
						<p><span class="text-muted-foreground">Account type:</span> Premium</p>
					</div>
				</div>
				<div class="space-y-2">
					<Button variant="outline" class="w-full justify-start">
						<User class="mr-2 size-4" />
						Edit Profile
					</Button>
					<Button variant="outline" class="w-full justify-start">
						<Lock class="mr-2 size-4" />
						Change Password
					</Button>
				</div>
			</div>
		</SheetContent>
	
</Story>


<Story name="Shopping Cart">
	
		<SheetTrigger>
			<Button variant="outline" size="icon">
				<ShoppingCart class="size-4" />
			</Button>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Shopping Cart</SheetTitle>
				<SheetDescription>
					You have 3 items in your cart.
				</SheetDescription>
			</SheetHeader>
			<div class="space-y-4 py-4">
				<div class="flex items-center gap-4 border-b pb-4">
					<div class="size-16 rounded bg-muted"></div>
					<div class="flex-1">
						<p class="font-medium">Product Name</p>
						<p class="text-sm text-muted-foreground">$29.99</p>
					</div>
					<Button variant="ghost" size="sm">Remove</Button>
				</div>
				<div class="flex items-center gap-4 border-b pb-4">
					<div class="size-16 rounded bg-muted"></div>
					<div class="flex-1">
						<p class="font-medium">Another Product</p>
						<p class="text-sm text-muted-foreground">$49.99</p>
					</div>
					<Button variant="ghost" size="sm">Remove</Button>
				</div>
				<div class="flex items-center gap-4 border-b pb-4">
					<div class="size-16 rounded bg-muted"></div>
					<div class="flex-1">
						<p class="font-medium">Third Product</p>
						<p class="text-sm text-muted-foreground">$19.99</p>
					</div>
					<Button variant="ghost" size="sm">Remove</Button>
				</div>
				<div class="flex items-center justify-between pt-4">
					<span class="font-semibold">Total:</span>
					<span class="text-xl font-bold">$99.97</span>
				</div>
			</div>
			<SheetFooter class="flex-col gap-2 sm:flex-col">
				<Button class="w-full">Checkout</Button>
				<SheetClose>
					<Button variant="outline" class="w-full">Continue Shopping</Button>
				</SheetClose>
			</SheetFooter>
		</SheetContent>
	
</Story>


<Story name="Without Close Button">
	
		<SheetTrigger>
			<Button variant="outline">Important Action</Button>
		</SheetTrigger>
		<SheetContent >
			<SheetHeader>
				<SheetTitle>Confirm Action</SheetTitle>
				<SheetDescription>
					This action requires your confirmation. Please review before proceeding.
				</SheetDescription>
			</SheetHeader>
			<div class="py-4">
				<div class="rounded-lg border border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950">
					<p class="text-sm font-medium">Warning</p>
					<p class="text-sm text-muted-foreground">
						This action cannot be undone. Please make sure you want to proceed.
					</p>
				</div>
			</div>
			<SheetFooter>
				<SheetClose>
					<Button variant="outline">Cancel</Button>
				</SheetClose>
				<SheetClose>
					<Button variant="destructive">Confirm</Button>
				</SheetClose>
			</SheetFooter>
		</SheetContent>
	
</Story>


<Story name="Custom Width">
	
		<SheetTrigger>
			<Button variant="outline">Wide Sheet</Button>
		</SheetTrigger>
		<SheetContent class="w-[400px] sm:w-[540px]">
			<SheetHeader>
				<SheetTitle>Custom Width Sheet</SheetTitle>
				<SheetDescription>
					This sheet has a custom width for more content space.
				</SheetDescription>
			</SheetHeader>
			<div class="py-4">
				<p class="text-sm text-muted-foreground">
					Content with more horizontal space to accommodate detailed information or wider layouts.
				</p>
			</div>
		</SheetContent>
	
</Story>
