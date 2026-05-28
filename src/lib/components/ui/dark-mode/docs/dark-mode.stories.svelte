<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		DarkModeToggle,
		DarkModeSwitch,
		DarkModeDropdown,
	} from "../index.js";
	import type { Args } from "storybook/internal/types";
	import { ModeWatcher } from "mode-watcher";

	const { Story } = defineMeta({
		title: "Components/DarkMode",
		// component: DarkModeToggle,
		tags: ["autodocs"],
		argTypes: {
			variant: {
				control: "select",
				options: ["default", "outline", "ghost", "flat", "minimal"],
				description: "Visual style variant",
			},
			size: {
				control: "select",
				options: ["sm", "default", "lg", "xl"],
				description: "Size of the component",
			},
			shape: {
				control: "select",
				options: ["square", "rounded", "circle"],
				description: "Shape of the toggle button",
			},
			animation: {
				control: "select",
				options: ["rotate", "scale", "fade", "none"],
				description: "Icon animation style",
			},
			showTooltip: {
				control: "boolean",
				description: "Show tooltip on hover",
			},
			disabled: {
				control: "boolean",
				description: "Disable the component",
			},
		},
	});
</script>

<!-- Toggle Stories -->

<Story name="Toggle - Default">
	{#snippet template(args: Args)}
		<ModeWatcher />
		<div class="flex items-center gap-4">
			<DarkModeToggle {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Toggle - Variants">
	{#snippet template()}
		<ModeWatcher />
		<div class="flex items-center gap-4">
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle variant="default" />
				<span class="text-xs text-muted-foreground">Default</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle variant="outline" />
				<span class="text-xs text-muted-foreground">Outline</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle variant="ghost" />
				<span class="text-xs text-muted-foreground">Ghost</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle variant="flat" />
				<span class="text-xs text-muted-foreground">Flat</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle variant="minimal" />
				<span class="text-xs text-muted-foreground">Minimal</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Toggle - Sizes">
	{#snippet template()}
		<div class="flex items-end gap-4">
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle size="sm" />
				<span class="text-xs text-muted-foreground">Small</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle size="default" />
				<span class="text-xs text-muted-foreground">Default</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle size="lg" />
				<span class="text-xs text-muted-foreground">Large</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle size="xl" />
				<span class="text-xs text-muted-foreground">XL</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Toggle - Shapes">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle shape="square" />
				<span class="text-xs text-muted-foreground">Square</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle shape="rounded" />
				<span class="text-xs text-muted-foreground">Rounded</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle shape="circle" />
				<span class="text-xs text-muted-foreground">Circle</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Toggle - Animations">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle animation="rotate" />
				<span class="text-xs text-muted-foreground">Rotate</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle animation="scale" />
				<span class="text-xs text-muted-foreground">Scale</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle animation="fade" />
				<span class="text-xs text-muted-foreground">Fade</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeToggle animation="none" />
				<span class="text-xs text-muted-foreground">None</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Toggle - With Tooltip">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<DarkModeToggle
				showTooltip
				lightModeTooltip="Enable dark mode"
				darkModeTooltip="Enable light mode"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Toggle - Disabled">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<DarkModeToggle disabled />
			<DarkModeToggle variant="outline" disabled />
			<DarkModeToggle variant="ghost" disabled />
		</div>
	{/snippet}
</Story>

<Story name="Toggle - Combined Styles">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-4">
			<DarkModeToggle variant="outline" shape="circle" size="lg" />
			<DarkModeToggle variant="ghost" shape="rounded" size="sm" />
			<DarkModeToggle variant="flat" shape="circle" size="xl" />
			<DarkModeToggle variant="minimal" animation="scale" />
		</div>
	{/snippet}
</Story>

<!-- Switch Stories -->

<Story name="Switch - Default">
	{#snippet template(args: Args)}
		<div class="flex items-center gap-4">
			<DarkModeSwitch {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Switch - Variants">
	{#snippet template()}
		<div class="flex items-center gap-6">
			<div class="flex flex-col items-center gap-2">
				<DarkModeSwitch variant="default" />
				<span class="text-xs text-muted-foreground">Default</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeSwitch variant="primary" />
				<span class="text-xs text-muted-foreground">Primary</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeSwitch variant="accent" />
				<span class="text-xs text-muted-foreground">Accent</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeSwitch variant="contrast" />
				<span class="text-xs text-muted-foreground">Contrast</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Switch - Sizes">
	{#snippet template()}
		<div class="flex items-end gap-6">
			<div class="flex flex-col items-center gap-2">
				<DarkModeSwitch size="sm" />
				<span class="text-xs text-muted-foreground">Small</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeSwitch size="default" />
				<span class="text-xs text-muted-foreground">Default</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeSwitch size="lg" />
				<span class="text-xs text-muted-foreground">Large</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Switch - Without Icons">
	{#snippet template()}
		<div class="flex items-center gap-6">
			<div class="flex flex-col items-center gap-2">
				<DarkModeSwitch showIcons={true} />
				<span class="text-xs text-muted-foreground">With Icons</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeSwitch showIcons={false} />
				<span class="text-xs text-muted-foreground">Without Icons</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Switch - Disabled">
	{#snippet template()}
		<div class="flex items-center gap-6">
			<DarkModeSwitch disabled />
			<DarkModeSwitch variant="primary" disabled />
		</div>
	{/snippet}
</Story>

<!-- Dropdown Stories -->

<Story name="Dropdown - Default">
	{#snippet template(args: Args)}
		<div class="flex items-center gap-4">
			<DarkModeDropdown {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Dropdown - Variants">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<div class="flex flex-col items-center gap-2">
				<DarkModeDropdown variant="default" />
				<span class="text-xs text-muted-foreground">Default</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeDropdown variant="outline" />
				<span class="text-xs text-muted-foreground">Outline</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeDropdown variant="ghost" />
				<span class="text-xs text-muted-foreground">Ghost</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Dropdown - Sizes">
	{#snippet template()}
		<div class="flex items-end gap-4">
			<div class="flex flex-col items-center gap-2">
				<DarkModeDropdown size="sm" />
				<span class="text-xs text-muted-foreground">Small</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeDropdown size="default" />
				<span class="text-xs text-muted-foreground">Default</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeDropdown size="lg" />
				<span class="text-xs text-muted-foreground">Large</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Dropdown - With Label">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<DarkModeDropdown showLabel />
		</div>
	{/snippet}
</Story>

<Story name="Dropdown - Custom Labels">
	{#snippet template()}
		<div class="flex items-center gap-4">
			<DarkModeDropdown
				showLabel
				labels={{
					light: "Light Mode",
					dark: "Dark Mode",
					system: "Auto",
				}}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Dropdown - Positioning">
	{#snippet template()}
		<div class="flex items-center justify-around p-8">
			<div class="flex flex-col items-center gap-2">
				<DarkModeDropdown align="start" />
				<span class="text-xs text-muted-foreground">Align Start</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeDropdown align="center" />
				<span class="text-xs text-muted-foreground">Align Center</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<DarkModeDropdown align="end" />
				<span class="text-xs text-muted-foreground">Align End</span>
			</div>
		</div>
	{/snippet}
</Story>

<!-- All Components Comparison -->

<Story name="All Components">
	{#snippet template()}
		<div class="flex flex-col gap-8 p-4">
			<div>
				<h3 class="mb-4 text-lg font-semibold">Toggle Button</h3>
				<div class="flex items-center gap-4">
					<DarkModeToggle variant="default" />
					<DarkModeToggle variant="outline" />
					<DarkModeToggle variant="ghost" shape="circle" />
					<DarkModeToggle variant="flat" shape="rounded" />
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-semibold">Switch</h3>
				<div class="flex items-center gap-4">
					<DarkModeSwitch variant="default" />
					<DarkModeSwitch variant="primary" />
					<DarkModeSwitch variant="accent" size="lg" />
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-semibold">Dropdown</h3>
				<div class="flex items-center gap-4">
					<DarkModeDropdown variant="default" />
					<DarkModeDropdown variant="outline" showLabel />
					<DarkModeDropdown variant="ghost" />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Use Case Examples -->

<Story name="Example - Header">
	{#snippet template()}
		<header
			class="flex w-full max-w-2xl items-center justify-between rounded-lg border bg-background p-4"
		>
			<div class="flex items-center gap-2">
				<div class="size-8 rounded-full bg-primary"></div>
				<span class="font-semibold">My App</span>
			</div>
			<nav class="flex items-center gap-4">
				<a
					href="/"
					class="text-sm text-muted-foreground hover:text-foreground"
					>Home</a
				>
				<a
					href="/"
					class="text-sm text-muted-foreground hover:text-foreground"
					>About</a
				>
				<a
					href="/"
					class="text-sm text-muted-foreground hover:text-foreground"
					>Contact</a
				>
				<DarkModeToggle variant="ghost" shape="circle" />
			</nav>
		</header>
	{/snippet}
</Story>

<Story name="Example - Settings">
	{#snippet template()}
		<div
			class="w-full max-w-md space-y-4 rounded-lg border bg-background p-6"
		>
			<h3 class="text-lg font-semibold">Appearance</h3>
			<div
				class="flex items-center justify-between rounded-lg border p-4"
			>
				<div>
					<p class="font-medium">Theme</p>
					<p class="text-sm text-muted-foreground">
						Select your preferred color scheme
					</p>
				</div>
				<DarkModeDropdown showLabel />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Example - Sidebar">
	{#snippet template()}
		<div
			class="flex h-64 w-64 flex-col justify-between rounded-lg border bg-background p-4"
		>
			<div class="space-y-2">
				<div
					class="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
				>
					<div class="size-4 rounded bg-muted"></div>
					<span class="text-sm">Dashboard</span>
				</div>
				<div
					class="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
				>
					<div class="size-4 rounded bg-muted"></div>
					<span class="text-sm">Settings</span>
				</div>
				<div
					class="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent"
				>
					<div class="size-4 rounded bg-muted"></div>
					<span class="text-sm">Profile</span>
				</div>
			</div>
			<div class="flex items-center justify-between border-t pt-4">
				<span class="text-sm">Dark Mode</span>
				<DarkModeSwitch size="sm" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Example - Floating Action">
	{#snippet template()}
		<div class="relative h-64 w-full rounded-lg border bg-background">
			<div class="p-4">
				<p class="text-muted-foreground">Page content goes here...</p>
			</div>
			<div class="absolute bottom-4 right-4">
				<DarkModeToggle
					variant="default"
					shape="circle"
					size="lg"
					class="shadow-lg"
				/>
			</div>
		</div>
	{/snippet}
</Story>
