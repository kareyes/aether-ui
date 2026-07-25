# Autocomplete

A search input with a permanently attached results panel that updates as
the user types. Built on top of the [Command](../../command/docs/COMMAND.md)
and [Popover](../../popover/docs/POPOVER.md) components — the same recipe
[Combobox](../../combobox/docs/COMBOBOX.md) uses, but with the search field
always visible (no trigger button) and support for remote, debounced,
cancellable search.

## Features

- 🔍 **Search while typing** — local filtering or a remote `fetcher`
- ⏱️ **Debounced** — configurable debounce for both local filtering and remote search
- 🌐 **Async fetch** — `fetcher(query, signal)` receives an `AbortSignal`; stale responses are ignored even if the fetcher doesn't use it
- ⏳ **Loading / empty / error states** — sensible illustrated defaults, fully overridable via snippets
- ⌨️ **Keyboard navigation** — Arrow keys, Enter, Escape (via `Command`'s WAI-ARIA combobox implementation)
- 👆 **Dismissible** — closes on outside click/tap, on focus leaving the component, and on `Escape`
- 🧩 **Composable** — the default row is just a label; anything richer (avatar, subtitle, badge, status) — as well as `leading` / `trailing` / `loadingIndicator` / `empty` / `error` / `header` / `footer` / full-panel `content` — goes through snippets
- 🔗 **Bindable** — two-way binding via `bind:value`
- 📦 **Generic** — `Autocomplete<T>` works with any item shape once you supply `itemLabel` / `itemValue`

## Installation

The Autocomplete component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Local filtering

```svelte
<script lang="ts">
	import { Autocomplete, type AutocompleteItem } from "aether-ui";

	const frameworks: AutocompleteItem[] = [
		{ value: "sveltekit", label: "SvelteKit" },
		{ value: "next.js", label: "Next.js" },
		{ value: "nuxt.js", label: "Nuxt.js" },
		{ value: "remix", label: "Remix" },
		{ value: "astro", label: "Astro" },
	];

	let selected = $state<AutocompleteItem | null>(null);
</script>

<Autocomplete
	items={frameworks}
	bind:value={selected}
	placeholder="Search frameworks..."
/>
```

### Remote search with `fetcher`

```svelte
<script lang="ts">
	import { Autocomplete, type AutocompleteItem } from "aether-ui";

	type User = AutocompleteItem;

	async function searchUsers(query: string, signal: AbortSignal): Promise<User[]> {
		const res = await fetch(`/api/users?q=${encodeURIComponent(query)}`, { signal });
		return res.json();
	}

	let selected = $state<User | null>(null);
</script>

<Autocomplete
	fetcher={searchUsers}
	bind:value={selected}
	debounce={300}
	minLength={2}
	placeholder="Search users..."
	onSelect={(user) => console.log("Selected:", user)}
/>
```

### Custom rows via the `item` snippet

The built-in row renders only `itemLabel(item)` — anything richer (avatar,
subtitle, badge, status dot) is drawn by you via the `item` snippet, using
whatever `T` and other `aether-ui` components you like:

```svelte
<script lang="ts">
	import { Autocomplete, Avatar, Badge, type AutocompleteItem } from "aether-ui";

	type Person = AutocompleteItem & {
		subtitle?: string;
		status?: "online" | "offline" | "away" | "busy";
		badge?: string;
	};

	const people: Person[] = [
		{ value: "u1", label: "Ada Lovelace", subtitle: "ada@example.com", status: "online", badge: "Admin" },
		{ value: "u2", label: "Alan Turing", subtitle: "alan@example.com", status: "away" },
	];

	let selected = $state<Person | null>(null);
</script>

<Autocomplete items={people} bind:value={selected} placeholder="Search people...">
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
		{#if selected}<span class="text-primary text-xs">✓</span>{/if}
	{/snippet}
</Autocomplete>
```

This same snippet works for any shape — a product catalog, for instance:

```svelte
<Autocomplete items={products} bind:value={selected} itemValue={(p) => p.sku}>
	{#snippet item({ item, selected, active })}
		<img src={item.thumbnail} alt="" class="size-6 rounded" />
		<span class="flex-1 truncate">{item.name}</span>
		<span class="text-muted-foreground text-xs">${item.price}</span>
	{/snippet}
</Autocomplete>
```

### Custom empty / loading / error content

```svelte
<Autocomplete fetcher={searchUsers} bind:value={selected}>
	{#snippet empty()}
		<div class="p-6 text-center text-sm">No matching users.</div>
	{/snippet}
	{#snippet loadingIndicator()}
		<div class="p-6 text-center text-sm">Fetching users…</div>
	{/snippet}
	{#snippet error({ error })}
		<div class="text-destructive p-6 text-center text-sm">{error.message}</div>
	{/snippet}
</Autocomplete>
```

### Fully custom panel via `content`

For layouts the built-in header/list/footer structure can't express (grouped
sections, tabs, a "recent searches" block above the results, etc.), replace
the entire panel body. The panel container (position, width, chrome) is
still managed by the component — only what's rendered inside is up to you:

```svelte
<Autocomplete fetcher={searchUsers} bind:value={selected}>
	{#snippet content({ items, loading, error, belowMinLength, select })}
		{#if loading}
			<div class="p-6 text-center text-sm">Loading…</div>
		{:else if error}
			<div class="text-destructive p-6 text-center text-sm">{error.message}</div>
		{:else if belowMinLength}
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
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `T \| null` | `null` | Selected item (bindable) |
| `items` | `T[]` | `[]` | Local dataset — ignored once `fetcher` is set |
| `placeholder` | `string` | `"Search..."` | Input placeholder |
| `name` | `string` | — | Form field name. Autocomplete has no native form element of its own — the visible input is a search box, not the submitted control — so when given, this mirrors the committed `value` (via `itemValue`) into a hidden input for native form / SvelteKit `enhance` submissions. |
| `disabled` | `boolean` | `false` | Disables the input and prevents opening |
| `loading` | `boolean` | `false` | Forces the loading state on top of any internal fetcher-driven state |
| `debounce` | `number` | `300` | Debounce (ms) before `fetcher` runs / local filtering re-evaluates |
| `minLength` | `number` | `1` | Minimum query length before a remote search fires (local mode ignores this) |
| `fetcher` | `(query: string, signal: AbortSignal) => Promise<T[]>` | — | Remote search function |
| `itemLabel` | `(item: T) => string` | `item.label` | Display text for an item |
| `itemValue` | `(item: T) => string` | `item.value` | Unique key for an item |
| `filter` | `(query: string, item: T) => boolean` | substring match on `itemLabel` | Local filter predicate — ignored once `fetcher` is set |
| `onSelect` | `(item: T) => void` | — | Fired when an item is committed |
| `onSearch` | `(query: string) => void` | — | Fired whenever the query changes (debounced query changes only) |
| `clearable` | `boolean` | `true` | Shows a clear (×) button once there's a query or selection |
| `maxHeight` | `string` | `"320px"` | CSS `max-height` of the results list |
| `variant` | `InputVariant` | `"default"` | Visual style of the search field, shared with `Input` |
| `size` | `InputSize` | `"default"` | Size of the search field, shared with `Input` |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Horizontal alignment of the results panel |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Side of the input the panel appears on |
| `class` | `string` | — | Extra classes on the search input |
| `contentClass` | `string` | — | Extra classes on the results panel |

`AutocompleteProps<T>` defaults `T` to `AutocompleteItem` — pass your own `T` (plus `itemLabel` / `itemValue`, and typically the `item` snippet) to use an arbitrary shape.

### Width

The component always fills its parent's width (the input, and therefore the
results panel pinned to `--bits-popover-anchor-width`, are `w-full`) rather
than shrinking to the input's own intrinsic size — this matters in flex/grid
parents, where a block element doesn't stretch by default. The panel's width
tracks the *trigger*, never the widest row: item content truncates
(`overflow-hidden` on the panel, `truncate` + `min-w-0` on the label/subtitle)
instead of forcing the panel wider. To constrain the whole component, wrap it
in a sized container (e.g. `<div class="w-80">`); `contentClass` can still
widen/narrow just the panel relative to the trigger if you need that.

### `AutocompleteItem`

The default row renders only `value` / `label` (via `itemLabel`). Extend it
with your own fields — e.g. for the `Person` example above — and read them
in the `item` snippet; the component itself never looks at anything beyond
`value` / `label` / `disabled`.

```ts
type AutocompleteItem = {
	value: string;
	label: string;
	disabled?: boolean;
};
```

## Slots

| Snippet | Args | Description |
| --- | --- | --- |
| `leading` | — | Replaces the default search icon in the input |
| `trailing` | — | Rendered at the end of the input when not loading and nothing to clear |
| `item` | `{ item, selected, active }` | Fully overrides row rendering |
| `loadingIndicator` | — | Overrides the built-in "Searching..." state |
| `empty` | — | Overrides the built-in "Oops... No Results Found" state |
| `error` | `{ error }` | Overrides the built-in error state (fetcher rejected) |
| `header` | — | Rendered above the results list, inside the panel |
| `footer` | — | Rendered below the results list, inside the panel |
| `content` | `{ items, loading, error, query, belowMinLength, activeValue, select }` | Fully replaces the panel body — `header` / `footer` / `item` / `empty` / `error` / `loadingIndicator` are ignored when this is set. Call `select(item)` to commit an item the same way the default row does (sets `value`, closes the panel, refocuses the input). |

## Accessibility

Autocomplete delegates to bits-ui's `Command` primitive for the search
input and results list, which implements the WAI-ARIA combobox pattern:
`role="combobox"` + `aria-autocomplete="list"` on the input,
`role="listbox"` on the results, `role="option"` + `aria-selected` on each
row, and `aria-activedescendant` tracking the highlighted item.

| Key | Action |
| --- | --- |
| Type to search | Filters locally or triggers the debounced `fetcher` |
| `ArrowDown` / `ArrowUp` | Move the highlighted item (loops) |
| `Enter` | Select the highlighted item |
| `Escape` | Close the results panel |
| `Tab` | Close and move to the next focusable element |

The panel also closes on any click/tap outside the input and panel, and on
focus moving anywhere else on the page — handled directly by the component
(document-level `pointerdown` + `focusin` listeners while open) rather than
left to Popover's own outside-interact dismissal, which doesn't reliably
fire in this Command + Popover composition.

## Related Components

- [Combobox](../combobox/docs/COMBOBOX.md) — button-triggered select-one-from-a-list
- [Command](../command/docs/COMMAND.md) — command palette primitives this component composes
- [Popover](../popover/docs/POPOVER.md) — positions the results panel
- [Input](../input/docs/INPUT.md) — shares `variant` / `size` styling
- [Empty](../empty/docs/EMPTY.md) — powers the built-in empty/error states
- [Avatar](../avatar/docs/AVATAR.md), [Badge](../badge/docs/BADGE.md) — handy inside a custom `item` snippet for richer rows
