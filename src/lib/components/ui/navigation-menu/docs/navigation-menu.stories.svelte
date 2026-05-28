<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import * as NavigationMenu from "../index.js";
	import { navigationMenuTriggerStyle } from "../navigation-menu-trigger.svelte";
	import { cn } from "$lib/utils.js";
	import CircleHelpIcon from "@lucide/svelte/icons/circle-help";
	import CircleIcon from "@lucide/svelte/icons/circle";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import HomeIcon from "@lucide/svelte/icons/home";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import UserIcon from "@lucide/svelte/icons/user";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import CodeIcon from "@lucide/svelte/icons/code";
	import LayoutGridIcon from "@lucide/svelte/icons/layout-grid";
	import { type Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/NavigationMenu",
		tags: ["autodocs"],
		argTypes: {
			viewport: {
				control: { type: "boolean" },
				description:
					"Whether to render the viewport container for dropdown content",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "true" },
				},
			},
			children: {
				control: false,
				table: { disable: true },
			},
		},
		args: {
			viewport: true,
		},
	});

	const components = [
		{
			title: "Alert Dialog",
			href: "/docs/components/alert-dialog",
			description:
				"A modal dialog that interrupts the user with important content.",
		},
		{
			title: "Hover Card",
			href: "/docs/components/hover-card",
			description: "Preview content available behind a link.",
		},
		{
			title: "Progress",
			href: "/docs/components/progress",
			description: "Displays completion progress of a task.",
		},
		{
			title: "Scroll Area",
			href: "/docs/components/scroll-area",
			description: "Custom scrollable area with overflow handling.",
		},
		{
			title: "Tabs",
			href: "/docs/components/tabs",
			description: "Layered sections of content displayed one at a time.",
		},
		{
			title: "Tooltip",
			href: "/docs/components/tooltip",
			description: "Popup that displays information on hover or focus.",
		},
	];
</script>

{#snippet ListItem({
	title,
	href,
	description,
	class: className = undefined,
	...restProps
}: {
	title: string;
	href: string;
	description: string;
	class?: string;
	[key: string]: any;
})}
	<li>
		<NavigationMenu.Link>
			{#snippet child()}
				<a
					{href}
					class={cn(
						"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
						className,
					)}
					{...restProps}
				>
					<div class="text-sm leading-none font-medium">{title}</div>
					<p
						class="text-muted-foreground line-clamp-2 text-sm leading-snug"
					>
						{description}
					</p>
				</a>
			{/snippet}
		</NavigationMenu.Link>
	</li>
{/snippet}

<Story name="Default">
	{#snippet template(args: Args)}
		<NavigationMenu.Root {...args}>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger
						>Getting Started</NavigationMenu.Trigger
					>
					<NavigationMenu.Content>
						<ul
							class="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
						>
							<li class="row-span-3">
								<NavigationMenu.Link
									class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-none select-none focus:shadow-md"
								>
									{#snippet child({ props })}
										<a {...props} href="/">
											<div
												class="mt-4 mb-2 text-lg font-medium"
											>
												Aether UI
											</div>
											<p
												class="text-muted-foreground text-sm leading-tight"
											>
												Beautifully designed components
												built with Tailwind CSS.
											</p>
										</a>
									{/snippet}
								</NavigationMenu.Link>
							</li>
							{@render ListItem({
								href: "/docs",
								title: "Introduction",
								description:
									"Re-usable components built using Bits UI and Tailwind CSS.",
							})}
							{@render ListItem({
								href: "/docs/installation",
								title: "Installation",
								description:
									"How to install dependencies and structure your app.",
							})}
							{@render ListItem({
								href: "/docs/components/typography",
								title: "Typography",
								description:
									"Styles for headings, paragraphs, lists and more.",
							})}
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul
							class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
						>
							{#each components as component}
								{@render ListItem({
									href: component.href,
									title: component.title,
									description: component.description,
								})}
							{/each}
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link>
						{#snippet child()}
							<a href="/docs" class={navigationMenuTriggerStyle()}
								>Documentation</a
							>
						{/snippet}
					</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	{/snippet}
</Story>

<Story name="Simple List">
	{#snippet template(args: Args)}
		<NavigationMenu.Root {...args}>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Menu</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[200px] gap-1 p-2">
							<li>
								<NavigationMenu.Link href="#"
									>Components</NavigationMenu.Link
								>
								<NavigationMenu.Link href="#"
									>Documentation</NavigationMenu.Link
								>
								<NavigationMenu.Link href="#"
									>Blog</NavigationMenu.Link
								>
							</li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	{/snippet}
</Story>

<Story name="With Descriptions">
	{#snippet template(args: Args)}
		<NavigationMenu.Root {...args}>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[300px] gap-2 p-2">
							<li>
								<NavigationMenu.Link href="#">
									<div class="font-medium">Components</div>
									<div class="text-muted-foreground text-sm">
										Browse all components in the library.
									</div>
								</NavigationMenu.Link>
								<NavigationMenu.Link href="#">
									<div class="font-medium">Documentation</div>
									<div class="text-muted-foreground text-sm">
										Learn how to use the library.
									</div>
								</NavigationMenu.Link>
								<NavigationMenu.Link href="#">
									<div class="font-medium">Blog</div>
									<div class="text-muted-foreground text-sm">
										Read our latest blog posts.
									</div>
								</NavigationMenu.Link>
							</li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	{/snippet}
</Story>

<Story name="With Icons">
	{#snippet template(args: Args)}
		<NavigationMenu.Root {...args}>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Status</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[200px] gap-1 p-2">
							<li>
								<NavigationMenu.Link
									href="#"
									class="flex-row items-center gap-2"
								>
									<CircleHelpIcon class="size-4" />
									Backlog
								</NavigationMenu.Link>
								<NavigationMenu.Link
									href="#"
									class="flex-row items-center gap-2"
								>
									<CircleIcon class="size-4" />
									To Do
								</NavigationMenu.Link>
								<NavigationMenu.Link
									href="#"
									class="flex-row items-center gap-2"
								>
									<CircleCheckIcon class="size-4" />
									Done
								</NavigationMenu.Link>
							</li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	{/snippet}
</Story>

<Story name="Multiple Menus">
	{#snippet template(args: Args)}
		<NavigationMenu.Root {...args}>
			<NavigationMenu.List class="flex-wrap">
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Home</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul
							class="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
						>
							<li class="row-span-3">
								<NavigationMenu.Link
									class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-none select-none focus:shadow-md md:p-6"
								>
									{#snippet child({ props })}
										<a {...props} href="/">
											<HomeIcon class="size-6 mb-2" />
											<div
												class="mt-4 mb-2 text-lg font-medium"
											>
												Welcome
											</div>
											<p
												class="text-muted-foreground text-sm leading-tight"
											>
												Get started with our component
												library.
											</p>
										</a>
									{/snippet}
								</NavigationMenu.Link>
							</li>
							{@render ListItem({
								href: "/docs",
								title: "Introduction",
								description:
									"Re-usable components built using Bits UI.",
							})}
							{@render ListItem({
								href: "/docs/installation",
								title: "Installation",
								description: "How to install and configure.",
							})}
							{@render ListItem({
								href: "/docs/theming",
								title: "Theming",
								description: "Customize the look and feel.",
							})}
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul
							class="grid w-[300px] gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
						>
							{#each components as component}
								{@render ListItem({
									href: component.href,
									title: component.title,
									description: component.description,
								})}
							{/each}
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link>
						{#snippet child()}
							<a href="/docs" class={navigationMenuTriggerStyle()}
								>Docs</a
							>
						{/snippet}
					</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item class="hidden md:block">
					<NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[300px] gap-2 p-2">
							<li>
								<NavigationMenu.Link href="#">
									<div class="font-medium">Documentation</div>
									<div class="text-muted-foreground text-sm">
										Learn how to use the library.
									</div>
								</NavigationMenu.Link>
								<NavigationMenu.Link href="#">
									<div class="font-medium">Blog</div>
									<div class="text-muted-foreground text-sm">
										Read our latest blog posts.
									</div>
								</NavigationMenu.Link>
							</li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	{/snippet}
</Story>

<Story name="Without Viewport">
	{#snippet template(args: Args)}
		<NavigationMenu.Root viewport={false} {...args}>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Menu</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[200px] gap-1 p-2">
							<li>
								<NavigationMenu.Link href="#"
									>Home</NavigationMenu.Link
								>
								<NavigationMenu.Link href="#"
									>About</NavigationMenu.Link
								>
								<NavigationMenu.Link href="#"
									>Contact</NavigationMenu.Link
								>
							</li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[200px] gap-1 p-2">
							<li>
								<NavigationMenu.Link href="#"
									>Product A</NavigationMenu.Link
								>
								<NavigationMenu.Link href="#"
									>Product B</NavigationMenu.Link
								>
								<NavigationMenu.Link href="#"
									>Product C</NavigationMenu.Link
								>
							</li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	{/snippet}
</Story>

<Story name="Link Only">
	{#snippet template(args: Args)}
		<NavigationMenu.Root {...args}>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Link>
						{#snippet child()}
							<a href="/" class={navigationMenuTriggerStyle()}
								>Home</a
							>
						{/snippet}
					</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link>
						{#snippet child()}
							<a
								href="/about"
								class={navigationMenuTriggerStyle()}>About</a
							>
						{/snippet}
					</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link>
						{#snippet child()}
							<a
								href="/contact"
								class={navigationMenuTriggerStyle()}>Contact</a
							>
						{/snippet}
					</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	{/snippet}
</Story>

<Story name="Icon Navigation">
	{#snippet template(args: Args)}
		<NavigationMenu.Root {...args}>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>
						<LayoutGridIcon class="size-4 mr-1" />
						Features
					</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul class="grid w-[350px] gap-2 p-3 md:grid-cols-2">
							<li>
								<NavigationMenu.Link
									href="#"
									class="flex-row items-start gap-3 p-3"
								>
									<CodeIcon
										class="size-5 mt-0.5 text-primary"
									/>
									<div>
										<div class="font-medium">
											Code Editor
										</div>
										<div
											class="text-muted-foreground text-xs"
										>
											Write and edit code with syntax
											highlighting.
										</div>
									</div>
								</NavigationMenu.Link>
							</li>
							<li>
								<NavigationMenu.Link
									href="#"
									class="flex-row items-start gap-3 p-3"
								>
									<BookOpenIcon
										class="size-5 mt-0.5 text-primary"
									/>
									<div>
										<div class="font-medium">
											Documentation
										</div>
										<div
											class="text-muted-foreground text-xs"
										>
											Comprehensive guides and API
											reference.
										</div>
									</div>
								</NavigationMenu.Link>
							</li>
							<li>
								<NavigationMenu.Link
									href="#"
									class="flex-row items-start gap-3 p-3"
								>
									<SettingsIcon
										class="size-5 mt-0.5 text-primary"
									/>
									<div>
										<div class="font-medium">Settings</div>
										<div
											class="text-muted-foreground text-xs"
										>
											Configure your workspace
											preferences.
										</div>
									</div>
								</NavigationMenu.Link>
							</li>
							<li>
								<NavigationMenu.Link
									href="#"
									class="flex-row items-start gap-3 p-3"
								>
									<UserIcon
										class="size-5 mt-0.5 text-primary"
									/>
									<div>
										<div class="font-medium">Profile</div>
										<div
											class="text-muted-foreground text-xs"
										>
											Manage your account settings.
										</div>
									</div>
								</NavigationMenu.Link>
							</li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	{/snippet}
</Story>
