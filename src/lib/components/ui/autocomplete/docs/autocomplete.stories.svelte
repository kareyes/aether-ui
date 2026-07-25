<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Autocomplete from "../autocomplete.svelte";

	const { Story } = defineMeta({
		title: "Components/Autocomplete",
		component: Autocomplete,
		tags: ["autodocs"],
		argTypes: {
			placeholder: { control: "text" },
			disabled: { control: "boolean" },
			clearable: { control: "boolean" },
			debounce: { control: "number" },
			minLength: { control: "number" },
			variant: {
				control: "select",
				options: ["default", "outline", "filled", "ghost", "underline"],
			},
			size: {
				control: "select",
				options: ["sm", "default", "lg"],
			},
			align: {
				control: "select",
				options: ["start", "center", "end"],
			},
			side: {
				control: "select",
				options: ["top", "right", "bottom", "left"],
			},
		},
	});
</script>

<script lang="ts">
	import { Avatar } from "$lib/components/ui/avatar/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import type { AutocompleteItem } from "../utils/autocomplete-types.js";

	const frameworks: AutocompleteItem[] = [
		{ value: "sveltekit", label: "SvelteKit" },
		{ value: "next.js", label: "Next.js" },
		{ value: "nuxt.js", label: "Nuxt.js" },
		{ value: "remix", label: "Remix" },
		{ value: "astro", label: "Astro" },
		{ value: "gatsby", label: "Gatsby" },
		{ value: "angular", label: "Angular" },
		{ value: "vue", label: "Vue" },
		{ value: "react", label: "React" },
	];

	const users: AutocompleteItem[] = [
		{ value: "u1", label: "Ada Lovelace" },
		{ value: "u2", label: "Alan Turing" },
		{ value: "u3", label: "Grace Hopper" },
		{ value: "u4", label: "Katherine Johnson", disabled: true },
		{ value: "u5", label: "Margaret Hamilton" },
	];

	// A custom `T` extending AutocompleteItem — the built-in row only renders
	// `label`, so anything richer (avatar, subtitle, badge, status) is drawn
	// by the consumer via the `item` snippet, not by the component itself.
	type Person = AutocompleteItem & {
		subtitle?: string;
		status?: "online" | "offline" | "away" | "busy";
		badge?: string;
	};

	const people: Person[] = [
		{
			value: "u1",
			label: "Ada Lovelace",
			subtitle: "ada@example.com",
			status: "online",
			badge: "Admin",
		},
		{ value: "u2", label: "Alan Turing", subtitle: "alan@example.com", status: "away" },
		{
			value: "u3",
			label: "Grace Hopper",
			subtitle: "grace@example.com",
			status: "offline",
			badge: "New",
		},
		{
			value: "u4",
			label: "Katherine Johnson",
			subtitle: "katherine@example.com",
			status: "busy",
			disabled: true,
		},
		{
			value: "u5",
			label: "Margaret Hamilton",
			subtitle: "margaret@example.com",
			status: "online",
		},
	];

	async function searchUsersRemote(
		query: string,
		signal: AbortSignal,
	): Promise<AutocompleteItem[]> {
		await new Promise((resolve) => setTimeout(resolve, 600));
		if (signal.aborted) return [];
		return users.filter((user) =>
			user.label.toLowerCase().includes(query.toLowerCase()),
		);
	}

	async function searchAlwaysEmpty(
		_query: string,
		signal: AbortSignal,
	): Promise<AutocompleteItem[]> {
		await new Promise((resolve) => setTimeout(resolve, 400));
		if (signal.aborted) return [];
		return [];
	}

	async function searchAlwaysErrors(): Promise<AutocompleteItem[]> {
		await new Promise((resolve) => setTimeout(resolve, 400));
		throw new Error("The search service is unavailable.");
	}

	let selectedFramework = $state<AutocompleteItem | null>(null);
	let selectedUser = $state<AutocompleteItem | null>(null);
	let selectedPerson = $state<Person | null>(null);
</script>

<!-- Default: local filtering -->
<Story
	name="Default"
	args={{
		items: frameworks,
		placeholder: "Search frameworks...",
	}}
/>

<!-- Remote search with a fetcher + AbortController -->
<Story
	name="Remote Search"
	args={{
		fetcher: searchUsersRemote,
		placeholder: "Search users (remote)...",
		minLength: 2,
		debounce: 300,
	}}
/>

<!-- Below minLength: hint instead of empty state -->
<Story
	name="Minimum Length Hint"
	args={{
		fetcher: searchUsersRemote,
		placeholder: "Type at least 2 characters...",
		minLength: 2,
	}}
/>

<!-- Empty state -->
<Story
	name="Empty State"
	args={{
		fetcher: searchAlwaysEmpty,
		placeholder: "Try typing anything...",
		minLength: 0,
	}}
/>

<!-- Error state -->
<Story
	name="Error State"
	args={{
		fetcher: searchAlwaysErrors,
		placeholder: "Try typing anything...",
		minLength: 0,
	}}
/>

<!-- Disabled -->
<Story
	name="Disabled"
	args={{
		items: frameworks,
		disabled: true,
		placeholder: "Search frameworks...",
	}}
/>

<!-- Not clearable -->
<Story
	name="Not Clearable"
	args={{
		items: frameworks,
		clearable: false,
		placeholder: "Search frameworks...",
	}}
/>

<!-- Sizes -->
<Story
	name="Small Size"
	args={{
		items: frameworks,
		size: "sm",
		placeholder: "Small autocomplete",
	}}
/>

<Story
	name="Large Size"
	args={{
		items: frameworks,
		size: "lg",
		placeholder: "Large autocomplete",
	}}
/>

<!-- Variants -->
<Story
	name="Outline Variant"
	args={{
		items: frameworks,
		variant: "outline",
		placeholder: "Outline variant",
	}}
/>

<Story
	name="Filled Variant"
	args={{
		items: frameworks,
		variant: "filled",
		placeholder: "Filled variant",
	}}
/>

<!-- Reactive value -->
<Story name="Reactive Value">
	<div class="w-80 space-y-4">
		<Autocomplete
			items={frameworks}
			bind:value={selectedFramework}
			placeholder="Search frameworks..."
		/>
		<div class="text-muted-foreground text-sm">
			Selected: <span class="text-foreground font-medium">
				{selectedFramework?.label ?? "None"}
			</span>
		</div>
	</div>
</Story>

<!-- Custom item snippet — the way to get rich rows (avatar/subtitle/badge/status) -->
<Story name="Custom Item Snippet">
	<div class="w-80">
		<Autocomplete items={people} bind:value={selectedPerson} placeholder="Search people...">
			{#snippet item({ item, selected })}
				<Avatar fallback={item.label} status={item.status} size="sm" />
				<span class="flex min-w-0 flex-1 flex-col">
					<span class="truncate">{item.label}</span>
					{#if item.subtitle}
						<span class="text-muted-foreground truncate text-xs">{item.subtitle}</span>
					{/if}
				</span>
				{#if item.badge}
					<Badge text={item.badge} variant="flat" size="sm" />
				{/if}
				{#if selected}
					<span class="text-primary text-xs">✓</span>
				{/if}
			{/snippet}
		</Autocomplete>
	</div>
</Story>

<!-- Fully custom panel via the `content` snippet -->
<Story name="Custom Content Snippet">
	<div class="w-80">
		<Autocomplete items={users} bind:value={selectedUser} placeholder="Search people...">
			{#snippet content({ items, belowMinLength, select })}
				{#if belowMinLength}
					<div class="text-muted-foreground p-6 text-center text-sm">Keep typing…</div>
				{:else}
					<ul class="p-1">
						{#each items as item (item.value)}
							<li>
								<button
									type="button"
									class="hover:bg-accent w-full rounded-sm px-2 py-1.5 text-left text-sm"
									onclick={() => select(item)}
								>
									{item.label}
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			{/snippet}
		</Autocomplete>
	</div>
</Story>

<!-- Width matches the parent, not the widest item's content -->
<Story name="Matches Container Width">
	<div class="flex gap-4">
		<div class="w-64">
			<Autocomplete
				items={[
					{ value: "x", label: "A very very very long framework name that would otherwise stretch the panel" },
					...frameworks,
				]}
				placeholder="Narrow flex child..."
			/>
		</div>
		<div class="bg-muted flex w-24 items-center justify-center rounded-md text-xs">
			sibling
		</div>
	</div>
</Story>
