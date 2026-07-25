<script lang="ts">
	import { Autocomplete, type AutocompleteItem } from "$lib";
	import { Avatar } from "$lib/components/ui/avatar/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";

	// ── Shared datasets ──────────────────────────────────────────────────────
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
	// `label`, so anything richer is drawn by the consumer via the `item`
	// snippet (see section 5 below), not by the component itself.
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

	// ── 1. Basic (local filtering) ───────────────────────────────────────────
	let basicValue = $state<AutocompleteItem | null>(null);

	// ── 2. Remote search ─────────────────────────────────────────────────────
	let remoteValue = $state<AutocompleteItem | null>(null);
	let remoteSearchCount = $state(0);

	async function searchUsersRemote(
		query: string,
		signal: AbortSignal,
	): Promise<AutocompleteItem[]> {
		remoteSearchCount += 1;
		await new Promise((resolve) => setTimeout(resolve, 600));
		if (signal.aborted) return [];
		return users.filter((user) =>
			user.label.toLowerCase().includes(query.toLowerCase()),
		);
	}

	// ── 3. Empty state ────────────────────────────────────────────────────────
	async function searchAlwaysEmpty(
		_query: string,
		signal: AbortSignal,
	): Promise<AutocompleteItem[]> {
		await new Promise((resolve) => setTimeout(resolve, 400));
		if (signal.aborted) return [];
		return [];
	}

	// ── 4. Error state ───────────────────────────────────────────────────────
	async function searchAlwaysErrors(): Promise<AutocompleteItem[]> {
		await new Promise((resolve) => setTimeout(resolve, 400));
		throw new Error("The search service is unavailable.");
	}

	// ── 5. Custom item snippet ───────────────────────────────────────────────
	let customItemValue = $state<Person | null>(null);

	// ── 6. Custom content snippet ────────────────────────────────────────────
	let customContentValue = $state<AutocompleteItem | null>(null);
</script>

<div class="container mx-auto max-w-5xl space-y-16 p-8">
	<div>
		<h1 class="mb-2 text-4xl font-bold">Autocomplete Component</h1>
		<p class="text-muted-foreground">
			A search input with a permanently attached results panel — local
			filtering or debounced/cancellable remote search, with full
			customization via snippets. Try clicking outside an open panel, or
			tabbing away — it closes.
		</p>
	</div>

	<!-- ── 1. Basic ──────────────────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Basic (Local Filtering)</h2>
			<p class="text-muted-foreground text-sm">
				Filters the static <code class="bg-muted rounded px-1 py-0.5 text-xs"
					>items</code
				> array as you type. The default row renders just the label — richer
				rows are built via the <code class="bg-muted rounded px-1 py-0.5 text-xs"
					>item</code
				> snippet (section 5).
			</p>
		</div>
		<div class="w-80 space-y-2">
			<Autocomplete
				items={frameworks}
				bind:value={basicValue}
				placeholder="Search frameworks..."
			/>
			<p class="text-muted-foreground text-sm">
				Selected: <span class="text-foreground font-medium"
					>{basicValue?.label ?? "None"}</span
				>
			</p>
		</div>
	</section>

	<!-- ── 2. Remote search ──────────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Remote Search</h2>
			<p class="text-muted-foreground text-sm">
				<code class="bg-muted rounded px-1 py-0.5 text-xs">fetcher</code> runs
				debounced (300ms) once the query reaches
				<code class="bg-muted rounded px-1 py-0.5 text-xs">minLength</code> (2).
				Stale in-flight requests are aborted via the supplied
				<code class="bg-muted rounded px-1 py-0.5 text-xs">AbortSignal</code>.
			</p>
		</div>
		<div class="w-80 space-y-2">
			<Autocomplete
				fetcher={searchUsersRemote}
				bind:value={remoteValue}
				debounce={300}
				minLength={2}
				placeholder="Search users (remote)..."
			/>
			<p class="text-muted-foreground text-sm">
				Selected: <span class="text-foreground font-medium"
					>{remoteValue?.label ?? "None"}</span
				>
				· Fetcher calls: <span class="text-foreground font-medium"
					>{remoteSearchCount}</span
				>
			</p>
		</div>
	</section>

	<!-- ── 3. Empty & Error states ───────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Empty & Error States</h2>
			<p class="text-muted-foreground text-sm">
				Illustrated defaults for a fetcher that finds nothing, or one that
				rejects.
			</p>
		</div>
		<div class="grid gap-6 md:grid-cols-2">
			<div class="w-full space-y-2">
				<p class="text-muted-foreground text-xs font-medium">Empty</p>
				<Autocomplete
					fetcher={searchAlwaysEmpty}
					minLength={0}
					placeholder="Type anything..."
				/>
			</div>
			<div class="w-full space-y-2">
				<p class="text-muted-foreground text-xs font-medium">Error</p>
				<Autocomplete
					fetcher={searchAlwaysErrors}
					minLength={0}
					placeholder="Type anything..."
				/>
			</div>
		</div>
	</section>

	<!-- ── 4. Custom content snippet ─────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Custom Content Snippet</h2>
			<p class="text-muted-foreground text-sm">
				The <code class="bg-muted rounded px-1 py-0.5 text-xs">content</code>
				snippet replaces the entire panel body (header/list/states/footer).
				Call <code class="bg-muted rounded px-1 py-0.5 text-xs">select(item)</code>
				to commit the same way the default row does.
			</p>
		</div>
		<div class="w-80">
			<Autocomplete
				items={users}
				bind:value={customContentValue}
				placeholder="Search people..."
			>
				{#snippet content({ items, belowMinLength, select })}
					{#if belowMinLength}
						<div class="text-muted-foreground p-6 text-center text-sm">
							Keep typing…
						</div>
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
	</section>

	<!-- ── 5. Custom item snippet ────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Custom Item Snippet</h2>
			<p class="text-muted-foreground text-sm">
				The <code class="bg-muted rounded px-1 py-0.5 text-xs">item</code>
				snippet fully overrides row rendering — this is how to get avatar /
				subtitle / badge / status rows; the component's default row is just
				the label.
			</p>
		</div>
		<div class="w-80 space-y-2">
			<Autocomplete
				items={people}
				bind:value={customItemValue}
				placeholder="Search people..."
			>
				{#snippet item({ item, selected })}
					<Avatar fallback={item.label} status={item.status} size="sm" />
					<span class="flex min-w-0 flex-1 flex-col">
						<span class="truncate">{item.label}</span>
						{#if item.subtitle}
							<span class="text-muted-foreground truncate text-xs">
								{item.subtitle}
							</span>
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
			<p class="text-muted-foreground text-sm">
				Selected: <span class="text-foreground font-medium"
					>{customItemValue?.label ?? "None"}</span
				>
			</p>
		</div>
	</section>

	<!-- ── 6. Sizes & Variants ───────────────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Sizes & Variants</h2>
			<p class="text-muted-foreground text-sm">
				Shares <code class="bg-muted rounded px-1 py-0.5 text-xs">variant</code>
				/ <code class="bg-muted rounded px-1 py-0.5 text-xs">size</code> with
				<code class="bg-muted rounded px-1 py-0.5 text-xs">Input</code>.
			</p>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium">sm</p>
				<Autocomplete items={frameworks} size="sm" placeholder="Small" />
			</div>
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium">default</p>
				<Autocomplete items={frameworks} placeholder="Default" />
			</div>
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium">lg</p>
				<Autocomplete items={frameworks} size="lg" placeholder="Large" />
			</div>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium">outline</p>
				<Autocomplete items={frameworks} variant="outline" placeholder="Outline" />
			</div>
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium">filled</p>
				<Autocomplete items={frameworks} variant="filled" placeholder="Filled" />
			</div>
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium">ghost</p>
				<Autocomplete items={frameworks} variant="ghost" placeholder="Ghost" />
			</div>
		</div>
	</section>

	<!-- ── 7. Disabled & Not Clearable ───────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Disabled & Not Clearable</h2>
		</div>
		<div class="grid gap-6 md:grid-cols-2">
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium">disabled</p>
				<Autocomplete items={frameworks} disabled placeholder="Disabled" />
			</div>
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-medium">clearable={false}</p>
				<Autocomplete
					items={frameworks}
					clearable={false}
					placeholder="No clear button"
				/>
			</div>
		</div>
	</section>

	<!-- ── 8. Width matches the parent ───────────────────────────────────── -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-semibold">Width Matches the Parent</h2>
			<p class="text-muted-foreground text-sm">
				The trigger and results panel always fill their parent's width —
				even inside a flex row, and even with an item label long enough that
				it would otherwise stretch the panel.
			</p>
		</div>
		<div class="flex gap-4">
			<div class="w-64">
				<Autocomplete
					items={[
						{
							value: "x",
							label:
								"A very very very long framework name that would otherwise stretch the panel",
						},
						...frameworks,
					]}
					placeholder="Narrow flex child..."
				/>
			</div>
			<div
				class="bg-muted flex w-24 items-center justify-center rounded-md text-xs"
			>
				sibling
			</div>
			<div class="flex-1 rounded-md border border-dashed p-2 text-center text-xs">
				<Autocomplete items={frameworks} placeholder="flex-1 child..." />
			</div>
		</div>
	</section>
</div>
