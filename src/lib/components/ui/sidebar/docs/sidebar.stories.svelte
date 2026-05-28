<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		SidebarProvider,
		Sidebar,
		SidebarContent,
		SidebarFooter,
		SidebarGroup,
		SidebarGroupAction,
		SidebarGroupContent,
		SidebarGroupLabel,
		SidebarHeader,
		SidebarInput,
		SidebarInset,
		SidebarMenu,
		SidebarMenuAction,
		SidebarMenuBadge,
		SidebarMenuButton,
		SidebarMenuItem,
		SidebarMenuSkeleton,
		SidebarMenuSub,
		SidebarMenuSubButton,
		SidebarMenuSubItem,
		SidebarRail,
		SidebarSeparator,
		SidebarTrigger
	} from "$lib/components/ui/sidebar";
	import {
		Home,
		Inbox,
		Calendar,
		Search,
		Settings,
		User,
		ChevronRight,
		Plus,
		MoreHorizontal,
		Folder,
		FileText,
		Star,
		Mail,
		Bell,
		MessageSquare
	} from "@lucide/svelte";

	const { Story } = defineMeta({
		title: 'Components/Sidebar',
		component: Sidebar,
		tags: ['autodocs'],
		argTypes: {
			side: {
				control: { type: 'select' },
				options: ['left', 'right'],
				description: 'Position of the sidebar',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'left' },
				},
			},
			variant: {
				control: { type: 'select' },
				options: ['sidebar', 'floating', 'inset'],
				description: 'Visual variant',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'sidebar' },
				},
			},
			collapsible: {
				control: { type: 'select' },
				options: ['offcanvas', 'icon', 'none'],
				description: 'Collapse behavior',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'offcanvas' },
				},
			},
		},
		parameters: {
			docs: {
				extractArgTypes: false,
			},
			layout: 'fullscreen',
		},
	});
</script>


<Story name="Default">
	<SidebarProvider>
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Home class="size-4" />
									<span>Home</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Inbox class="size-4" />
									<span>Inbox</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Calendar class="size-4" />
									<span>Calendar</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Search class="size-4" />
									<span>Search</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Settings class="size-4" />
									<span>Settings</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<div class="flex-1">
					<h1 class="text-lg font-semibold">Dashboard</h1>
				</div>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Main content area</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="Icon Collapsible">
	<SidebarProvider>
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Platform</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton tooltipContent="Home">
									<Home class="size-4" />
									<span>Home</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton tooltipContent="Inbox">
									<Inbox class="size-4" />
									<span>Inbox</span>
								</SidebarMenuButton>
								<SidebarMenuBadge>24</SidebarMenuBadge>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton tooltipContent="Calendar">
									<Calendar class="size-4" />
									<span>Calendar</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Icon Mode - Click trigger to collapse</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Sidebar collapses to icons</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="With Submenus">
	<SidebarProvider>
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Projects</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Folder class="size-4" />
									<span>Design System</span>
									<ChevronRight class="ml-auto size-4" />
								</SidebarMenuButton>
								<SidebarMenuSub>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton>
											<span>Components</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton>
											<span>Typography</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton>
											<span>Colors</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								</SidebarMenuSub>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Folder class="size-4" />
									<span>Documentation</span>
									<ChevronRight class="ml-auto size-4" />
								</SidebarMenuButton>
								<SidebarMenuSub>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton>
											<span>Getting Started</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton>
											<span>API Reference</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								</SidebarMenuSub>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">With Submenus</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Nested navigation structure</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>

<Story name="With Actions and Badges">
	<SidebarProvider>
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Communications</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Mail class="size-4" />
									<span>Messages</span>
								</SidebarMenuButton>
								<SidebarMenuBadge>12</SidebarMenuBadge>
								<SidebarMenuAction>
									<Plus class="size-4" />
								</SidebarMenuAction>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Bell class="size-4" />
									<span>Notifications</span>
								</SidebarMenuButton>
								<SidebarMenuBadge>99+</SidebarMenuBadge>
								<SidebarMenuAction>
									<MoreHorizontal class="size-4" />
								</SidebarMenuAction>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<MessageSquare class="size-4" />
									<span>Comments</span>
								</SidebarMenuButton>
								<SidebarMenuBadge>3</SidebarMenuBadge>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Actions and Badges</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Menu items with actions and notification counts</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="With Header and Footer">
	<SidebarProvider>
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg">
							<div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								<span class="text-lg font-bold">A</span>
							</div>
							<div class="flex flex-col gap-0.5 text-start">
								<span class="font-semibold">Acme Inc</span>
								<span class="text-xs text-muted-foreground">Enterprise</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Home class="size-4" />
									<span>Dashboard</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<FileText class="size-4" />
									<span>Documents</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Settings class="size-4" />
									<span>Settings</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<User class="size-4" />
							<span>John Doe</span>
						</SidebarMenuButton>
						<SidebarMenuAction>
							<MoreHorizontal class="size-4" />
						</SidebarMenuAction>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Header and Footer</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Sidebar with header branding and footer user info</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="With Search">
	<SidebarProvider>
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarInput type="search" placeholder="Search..." />
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Home class="size-4" />
									<span>Home</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<FileText class="size-4" />
									<span>Documents</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Star class="size-4" />
									<span>Favorites</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">With Search</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Sidebar with search functionality</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="Multiple Groups">
	<SidebarProvider>
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Platform</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Home class="size-4" />
									<span>Dashboard</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Inbox class="size-4" />
									<span>Inbox</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup>
					<SidebarGroupLabel>Projects</SidebarGroupLabel>
					<SidebarGroupAction>
						<Plus class="size-4" />
					</SidebarGroupAction>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Folder class="size-4" />
									<span>Project Alpha</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Folder class="size-4" />
									<span>Project Beta</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup>
					<SidebarGroupLabel>Settings</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Settings class="size-4" />
									<span>Preferences</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<User class="size-4" />
									<span>Account</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Multiple Groups</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Organized into logical sections</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="Floating Variant">
	<SidebarProvider>
		<Sidebar variant="floating">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Home class="size-4" />
									<span>Home</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Inbox class="size-4" />
									<span>Inbox</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Settings class="size-4" />
									<span>Settings</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Floating Variant</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Sidebar floats over content with shadow</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="Inset Variant">
	<SidebarProvider>
		<Sidebar variant="inset">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Home class="size-4" />
									<span>Home</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<FileText class="size-4" />
									<span>Documents</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Settings class="size-4" />
									<span>Settings</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Inset Variant</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Inset styling integrated into layout</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="Loading State">
	<SidebarProvider>
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Loading...</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuSkeleton />
							<SidebarMenuSkeleton />
							<SidebarMenuSkeleton />
							<SidebarMenuSkeleton />
							<SidebarMenuSkeleton />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Loading State</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Skeleton loading states</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="Active States">
	<SidebarProvider>
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Pages</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton isActive={true}>
									<Home class="size-4" />
									<span>Home (Active)</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Inbox class="size-4" />
									<span>Inbox</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Calendar class="size-4" />
									<span>Calendar</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Active States</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Highlighted active menu items</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="Different Button Sizes">
	<SidebarProvider>
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Small Buttons</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton size="sm">
									<Home class="size-4" />
									<span>Small Size</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Default Buttons</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton size="default">
									<Inbox class="size-4" />
									<span>Default Size</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Large Buttons</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton size="lg">
									<Settings class="size-4" />
									<span>Large Size</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Button Sizes</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Small, default, and large button sizes</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="Outline Variant">
	<SidebarProvider>
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Outline Style</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton variant="outline">
									<Home class="size-4" />
									<span>Home</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton variant="outline">
									<Inbox class="size-4" />
									<span>Inbox</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton variant="outline">
									<Settings class="size-4" />
									<span>Settings</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Outline Variant</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Outlined button style</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>


<Story name="With Links">
	<SidebarProvider>
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									{#snippet child({ props })}
										<a href="#home" {...props}>
											<Home class="size-4" />
											<span>Home</span>
										</a>
									{/snippet}
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton isActive>
									{#snippet child({ props })}
										<a href="#dashboard" {...props}>
											<Inbox class="size-4" />
											<span>Dashboard</span>
										</a>
									{/snippet}
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									{#snippet child({ props })}
										<a href="#calendar" {...props}>
											<Calendar class="size-4" />
											<span>Calendar</span>
										</a>
									{/snippet}
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									{#snippet child({ props })}
										<a href="#settings" {...props}>
											<Settings class="size-4" />
											<span>Settings</span>
										</a>
									{/snippet}
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger />
				<h1 class="text-lg font-semibold">Link-Based Navigation</h1>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4">
				<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
					<p class="text-muted-foreground">Using child snippet pattern with anchor tags</p>
				</div>
			</div>
		</SidebarInset>
	</SidebarProvider>
</Story>
