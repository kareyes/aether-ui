# Combobox

A simplified combobox component that combines a text input with a searchable dropdown list. Built on top of Command and Popover components.

## Features

- 🔍 **Searchable** - Built-in search/filter functionality
- 🎨 **Customizable** - Multiple variants, sizes, and styling options
- ♿ **Accessible** - Proper ARIA attributes and keyboard navigation
- 🎯 **Simple API** - Easy to use with declarative items array
- 🔗 **Bindable** - Two-way binding support with `bind:value`
- 🎭 **Custom Trigger** - Support for custom trigger elements via snippet
- 🚫 **Disabled Items** - Support for disabled options
- 📦 **TypeScript** - Full type safety

## Installation

The Combobox component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Combobox } from "aether-ui";

	const frameworks = [
		{ value: "sveltekit", label: "SvelteKit" },
		{ value: "next.js", label: "Next.js" },
		{ value: "nuxt.js", label: "Nuxt.js" },
		{ value: "remix", label: "Remix" },
		{ value: "astro", label: "Astro" },
	];

	let selectedFramework = $state("");
</script>

<Combobox
	items={frameworks}
	bind:value={selectedFramework}
	placeholder="Select framework..."
	searchPlaceholder="Search frameworks..."
/>
```

### With Initial Value

```svelte
<Combobox
	items={frameworks}
	value="sveltekit"
	placeholder="Select framework..."
/>
```

### Custom Placeholder and Messages

```svelte
<Combobox
	items={languages}
	placeholder="Pick a language..."
	searchPlaceholder="Type to search..."
	emptyMessage="No language found."
/>
```

### With Value Change Handler

```svelte
<script lang="ts">
	function handleValueChange(value: string) {
		console.log("Selected:", value);
	}
</script>

<Combobox
	items={frameworks}
	onValueChange={handleValueChange}
	placeholder="Select framework..."
/>
```

### Different Sizes

```svelte
<!-- Small -->
<Combobox
	items={frameworks}
	triggerSize="sm"
	placeholder="Small combobox"
/>

<!-- Default -->
<Combobox
	items={frameworks}
	triggerSize="default"
	placeholder="Default combobox"
/>

<!-- Large -->
<Combobox
	items={frameworks}
	triggerSize="lg"
	placeholder="Large combobox"
/>
```

### Different Variants

```svelte
<!-- Default -->
<Combobox
	items={frameworks}
	triggerVariant="default"
	placeholder="Default variant"
/>

<!-- Secondary -->
<Combobox
	items={frameworks}
	triggerVariant="secondary"
	placeholder="Secondary variant"
/>

<!-- Outline -->
<Combobox
	items={frameworks}
	triggerVariant="outline"
	placeholder="Outline variant"
/>

<!-- Ghost -->
<Combobox
	items={frameworks}
	triggerVariant="ghost"
	placeholder="Ghost variant"
/>
```

### Custom Width

```svelte
<!-- Fixed width -->
<Combobox
	items={countries}
	triggerClass="w-[300px]"
	contentClass="w-[300px]"
	placeholder="Select country..."
/>

<!-- Full width with auto-size content -->
<Combobox
	items={frameworks}
	triggerClass="w-full"
	contentClass="w-[var(--bits-popover-trigger-width)]"
	placeholder="Select framework..."
/>
```

### With Disabled Items

```svelte
<Combobox
	items={[
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2", disabled: true },
		{ value: "option3", label: "Option 3" },
		{ value: "option4", label: "Option 4", disabled: true },
		{ value: "option5", label: "Option 5" },
	]}
	placeholder="Select option..."
/>
```

### Content Alignment

```svelte
<!-- Align start -->
<Combobox
	items={frameworks}
	align="start"
	placeholder="Align start"
/>

<!-- Align center -->
<Combobox
	items={frameworks}
	align="center"
	placeholder="Align center"
/>

<!-- Align end -->
<Combobox
	items={frameworks}
	align="end"
	placeholder="Align end"
/>
```

### Custom Trigger

```svelte
<script lang="ts">
  import { Combobox, PopoverPrimitives, Button } from "aether-ui";
  import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";

	let selectedFramework = $state("");
</script>

<Combobox items={frameworks} bind:value={selectedFramework}>
  {#snippet trigger({ selectedLabel, open })}
    <PopoverPrimitives.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="outline"
					class="w-[280px] justify-between border-2 border-primary/20"
					role="combobox"
					aria-expanded={open}
				>
					<span class="flex items-center gap-2">
						{#if selectedLabel}
							<span class="w-2 h-2 rounded-full bg-green-500"></span>
						{/if}
						{selectedLabel || "Choose your framework..."}
					</span>
					<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      {/snippet}
    </PopoverPrimitives.Trigger>
  {/snippet}
</Combobox>
```

### In Forms

```svelte
<script lang="ts">
	let framework = $state("");
	let language = $state("");
	let country = $state("");
</script>

<form class="space-y-4">
	<div class="space-y-2">
		<label class="text-sm font-medium">Framework</label>
		<Combobox
			items={frameworks}
			bind:value={framework}
			placeholder="Select a framework..."
			triggerClass="w-full"
			contentClass="w-[var(--bits-popover-trigger-width)]"
		/>
	</div>

	<div class="space-y-2">
		<label class="text-sm font-medium">Language</label>
		<Combobox
			items={languages}
			bind:value={language}
			placeholder="Select a language..."
			triggerClass="w-full"
			contentClass="w-[var(--bits-popover-trigger-width)]"
		/>
	</div>

	<div class="space-y-2">
		<label class="text-sm font-medium">Country</label>
		<Combobox
			items={countries}
			bind:value={country}
			placeholder="Select a country..."
			triggerClass="w-full"
			contentClass="w-[var(--bits-popover-trigger-width)]"
		/>
	</div>
</form>
```

## Props

### Items

| Prop    | Type                   | Default | Description                                    |
| ------- | ---------------------- | ------- | ---------------------------------------------- |
| `items` | `ComboboxItem[]`       | `[]`    | Array of items to display in the combobox      |

**ComboboxItem Type:**
```typescript
type ComboboxItem = {
	value: string;      // Unique value for the item
	label: string;      // Display text for the item
	disabled?: boolean; // Whether the item is disabled
};
```

### Value

| Prop            | Type                      | Default     | Description                                 |
| --------------- | ------------------------- | ----------- | ------------------------------------------- |
| `value`         | `string`                  | `""`        | Selected value (bindable)                   |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback when selection changes             |

### Trigger Props

| Prop              | Type                | Default      | Description                              |
| ----------------- | ------------------- | ------------ | ---------------------------------------- |
| `placeholder`     | `string`            | `"Select an item..."` | Placeholder text when nothing selected |
| `triggerVariant`  | `ButtonVariant`     | `"outline"`  | Button variant for trigger               |
| `triggerSize`     | `ButtonSize`        | `"default"`  | Button size for trigger                  |
| `triggerClass`    | `string`            | `undefined`  | Additional CSS classes for trigger       |

**ButtonVariant:** `"default"` | `"secondary"` | `"outline"` | `"ghost"` | `"destructive"`

**ButtonSize:** `"sm"` | `"default"` | `"lg"`

### Search Props

| Prop                 | Type     | Default               | Description                          |
| -------------------- | -------- | --------------------- | ------------------------------------ |
| `searchPlaceholder`  | `string` | `"Search..."`         | Placeholder for search input         |
| `emptyMessage`       | `string` | `"No item found."`    | Message when no results found        |

### Popover Props

| Prop           | Type                                    | Default    | Description                         |
| -------------- | --------------------------------------- | ---------- | ----------------------------------- |
| `contentClass` | `string`                                | `undefined`| Additional CSS classes for content  |
| `align`        | `"start"` \| `"center"` \| `"end"`      | `"start"`  | Horizontal alignment of content     |
| `side`         | `"top"` \| `"right"` \| `"bottom"` \| `"left"` | `"bottom"` | Side where content appears |

### Advanced Props

| Prop      | Type                                                      | Default     | Description                    |
| --------- | --------------------------------------------------------- | ----------- | ------------------------------ |
| `trigger` | `Snippet<[{ selectedLabel: string \| undefined; open: boolean }]>` | `undefined` | Custom trigger snippet |
| `open`    | `boolean`                                                 | `false`     | Controlled open state (bindable) |

## Examples

### Reactive Updates

```svelte
<script lang="ts">
	let selectedValue = $state("sveltekit");
	
	$effect(() => {
		console.log("Current selection:", selectedValue);
	});
</script>

<Combobox
	items={frameworks}
	bind:value={selectedValue}
	placeholder="Select framework..."
/>

<p>You selected: {selectedValue || "nothing"}</p>
```

### Controlled Open State

```svelte
<script lang="ts">
	let isOpen = $state(false);
	let selectedValue = $state("");
</script>

<button onclick={() => isOpen = !isOpen}>
	Toggle Combobox
</button>

<Combobox
	items={frameworks}
	bind:value={selectedValue}
	bind:open={isOpen}
	placeholder="Select framework..."
/>
```

### Dynamic Items

```svelte
<script lang="ts">
	let items = $state([
		{ value: "item1", label: "Item 1" },
		{ value: "item2", label: "Item 2" },
	]);

	function addItem() {
		const newId = items.length + 1;
		items = [...items, { value: `item${newId}`, label: `Item ${newId}` }];
	}
</script>

<button onclick={addItem}>Add Item</button>

<Combobox
	items={items}
	placeholder="Select item..."
/>
```

## Accessibility

The Combobox component follows WAI-ARIA combobox patterns:

- ✅ Proper `role="combobox"` attribute
- ✅ `aria-expanded` state
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Focus management
- ✅ Screen reader support
- ✅ Disabled state support

### Keyboard Shortcuts

| Key                  | Action                                  |
| -------------------- | --------------------------------------- |
| `Space` / `Enter`    | Open/close combobox                     |
| `ArrowDown`          | Navigate to next item                   |
| `ArrowUp`            | Navigate to previous item               |
| `Enter`              | Select highlighted item                 |
| `Escape`             | Close combobox                          |
| `Tab`                | Close and move to next focusable element|
| Type to search       | Filter items by typing                  |

## Styling

### Custom Trigger Width

```svelte
<Combobox
	items={items}
	triggerClass="w-[280px]"
	contentClass="w-[280px]"
/>
```

### Match Content Width to Trigger

```svelte
<Combobox
	items={items}
	triggerClass="w-full max-w-sm"
	contentClass="w-[var(--bits-popover-trigger-width)]"
/>
```

### Custom Styling

```svelte
<Combobox
	items={items}
	triggerClass="border-2 border-primary hover:border-primary/80"
	contentClass="bg-card"
/>
```

## Best Practices

1. **Provide Clear Labels** - Use descriptive labels for form fields
2. **Appropriate Placeholder** - Make placeholder text helpful and concise
3. **Limit Items** - For very large lists, consider pagination or server-side search
4. **Responsive Width** - Use appropriate width for the context
5. **Error States** - Combine with form validation for better UX
6. **Loading States** - Show loading indicator for async data
7. **Empty State** - Provide helpful message when no items match

## Related Components

- [Select](../select/SELECT.md) - Simple dropdown selection
- [Command](../command/COMMAND.md) - Command palette component
- [Popover](../popover/POPOVER.md) - Popover container
- [Button](../button/BUTTON.md) - Button component
