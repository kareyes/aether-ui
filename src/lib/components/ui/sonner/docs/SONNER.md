# Sonner Toast Component

A beautiful, customizable toast notification system built on top of svelte-sonner with enhanced styling, variants, and developer experience.

## Features

- **6 Toast Types**: default, success, error, warning, info, loading
- **4 Visual Variants**: default, bordered, filled, minimal
- **3 Size Options**: sm, default, lg
- **Promise Toasts**: Automatic loading → success/error states
- **Rich Colors**: Type-coded toasts drawn from the role tokens, so they follow the theme
- **Custom Icons**: Replace default icons with custom Svelte components
- **Action Buttons**: Add action and cancel buttons to toasts
- **Customizable Position**: 6 different positions on screen
- **Dark Mode**: Full dark mode support
- **Accessible**: Keyboard navigation and screen reader friendly

## Installation

The Sonner component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Import

```svelte
<script lang="ts">
  import { Toaster, toast } from "aether-ui";
</script>
```

## Setup

Add the `Toaster` component to your root layout (e.g., `+layout.svelte`):

```svelte
<script lang="ts">
  import { Toaster } from "aether-ui";
</script>

<Toaster />
<slot />
```

## Basic Usage

### Simple Toasts

```svelte
<script lang="ts">
  import { toast } from "aether-ui";
</script>

<button onclick={() => toast("Hello, world!")}>
  Show Toast
</button>
```

### Toast Variants

```svelte
<script lang="ts">
  import { toast } from "aether-ui";
</script>

<!-- Success -->
<button onclick={() => toast.success("Changes saved successfully!")}>
  Success
</button>

<!-- Error -->
<button onclick={() => toast.error("Something went wrong!")}>
  Error
</button>

<!-- Warning -->
<button onclick={() => toast.warning("Please review your input")}>
  Warning
</button>

<!-- Info -->
<button onclick={() => toast.info("New features available!")}>
  Info
</button>

<!-- Loading -->
<button onclick={() => toast.loading("Processing...")}>
  Loading
</button>
```

### With Description

```svelte
<script lang="ts">
  import { toast } from "aether-ui";
</script>

<button onclick={() => toast.success("File uploaded", {
  description: "Your file has been uploaded successfully."
})}>
  Upload File
</button>
```

### With Actions

```svelte
<button onclick={() => toast.warning("Delete item?", {
  description: "This action cannot be undone.",
  action: {
    label: "Delete",
    onClick: () => console.log("Deleted!")
  },
  cancel: {
    label: "Cancel",
    onClick: () => console.log("Cancelled")
  }
})}>
  Delete with Confirmation
</button>
```

### Promise Toast

```svelte
<script lang="ts">
  import { toast } from "aether-ui";

  async function saveData() {
    const promise = fetch("/api/save", { method: "POST" });
    
    toast.promise(promise, {
      loading: "Saving...",
      success: "Data saved successfully!",
      error: "Failed to save data"
    });
  }
</script>
```

### Persistent Toast

```svelte
<button onclick={() => toast.info("Important message", {
  duration: Infinity,
  dismissible: true
})}>
  Persistent Toast
</button>
```

### Dismiss Toast

```svelte
<script lang="ts">
  import { toast } from "aether-ui";

  let toastId: string | number;

  function showToast() {
    toastId = toast.loading("Processing...");
  }

  function dismissToast() {
    toast.dismiss(toastId);
  }

  function dismissAll() {
    toast.dismiss(); // No ID = dismiss all
  }
</script>
```

## Toaster Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "bordered" \| "filled" \| "minimal"` | `"default"` | Visual style variant for toasts |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Toast size (affects padding, text, icons) |
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-right"` | Position of toasts on screen |
| `expand` | `boolean` | `false` | Expand toasts on hover |
| `richColors` | `boolean` | `true` | Colour toasts by type from the role tokens; `false` gives every type one neutral surface |
| `closeButton` | `boolean` | `false` | Show close button on toasts |
| `duration` | `number` | `4000` | Auto-dismiss duration in ms |
| `gap` | `number` | `14` | Gap between toasts in pixels |
| `visibleToasts` | `number` | `3` | Maximum visible toasts |
| `loadingIcon` | `Snippet` | `undefined` | Custom loading icon |
| `successIcon` | `Snippet` | `undefined` | Custom success icon |
| `errorIcon` | `Snippet` | `undefined` | Custom error icon |
| `infoIcon` | `Snippet` | `undefined` | Custom info icon |
| `warningIcon` | `Snippet` | `undefined` | Custom warning icon |
| `class` | `string` | `undefined` | Additional CSS classes |

## Toast Options

| Option | Type | Description |
|--------|------|-------------|
| `description` | `string` | Toast description text |
| `duration` | `number` | Override default duration (0 = no auto-dismiss) |
| `dismissible` | `boolean` | Allow dismissing by click |
| `icon` | `Component` | Custom icon component |
| `action` | `{ label: string, onClick: () => void }` | Action button |
| `cancel` | `{ label: string, onClick: () => void }` | Cancel button |
| `onDismiss` | `(toast) => void` | Callback when dismissed |
| `onAutoClose` | `(toast) => void` | Callback when auto-closed |
| `class` | `string` | Custom class for toast |
| `descriptionClass` | `string` | Custom class for description |
| `style` | `string` | Inline styles |
| `position` | `string` | Position override |
| `important` | `boolean` | Important toast (stays on top) |
| `id` | `string \| number` | Custom toast ID |

## Visual Variants

Control the overall appearance of toasts with the `variant` prop on the Toaster.

### Default

Standard toast with tinted backgrounds and borders per type.

```svelte
<Toaster variant="default" />
```

### Bordered

Clean white/dark background with a colored left accent border per type.

```svelte
<Toaster variant="bordered" />
```

### Filled

Solid colored backgrounds for high-contrast, attention-grabbing toasts.

```svelte
<Toaster variant="filled" />
```

### Minimal

Transparent background with only a subtle bottom border. Ultra-clean look.

```svelte
<Toaster variant="minimal" />
```

## Sizes

Control toast sizing with the `size` prop on the Toaster.

### Small

Compact toasts for dense UIs. Smaller text, padding, icons, and buttons.

```svelte
<Toaster size="sm" />
```

### Default

Standard sizing for most use cases.

```svelte
<Toaster size="default" />
```

### Large

Bigger toasts with more padding, larger text and icons. Good for important notifications.

```svelte
<Toaster size="lg" />
```

## Toast Types

### Default

Basic toast with neutral styling.

```svelte
toast("Default message");
```

### Success

Green-themed toast for successful operations.

```svelte
toast.success("Operation completed!");
```

### Error

Red-themed toast for errors.

```svelte
toast.error("Something went wrong!");
```

### Warning

Yellow-themed toast for warnings.

```svelte
toast.warning("Please check your input");
```

### Info

Blue-themed toast for informational messages.

```svelte
toast.info("New update available!");
```

### Loading

Toast with a spinner, useful for async operations.

```svelte
const id = toast.loading("Processing...");
// Later...
toast.dismiss(id);
toast.success("Done!");
```

### Promise

Automatically handles loading, success, and error states.

```svelte
toast.promise(asyncFunction(), {
  loading: "Loading...",
  success: (data) => `Loaded ${data.count} items`,
  error: (err) => `Error: ${err.message}`
});
```

## Custom Icons

### Via Toaster Props

```svelte
<Toaster>
  {#snippet successIcon()}
    <MyCustomSuccessIcon class="size-4" />
  {/snippet}
  {#snippet errorIcon()}
    <MyCustomErrorIcon class="size-4" />
  {/snippet}
</Toaster>
```

### Via Toast Options

```svelte
import MyIcon from "./MyIcon.svelte";

toast.success("Custom icon!", {
  icon: MyIcon
});
```

## Positions

```svelte
<!-- Top positions -->
<Toaster position="top-left" />
<Toaster position="top-center" />
<Toaster position="top-right" />

<!-- Bottom positions -->
<Toaster position="bottom-left" />
<Toaster position="bottom-center" />
<Toaster position="bottom-right" />
```

## Advanced Examples

### Custom Styled Toast

```svelte
toast.success("Custom styles!", {
  class: "border-2 border-green-500",
  descriptionClass: "text-green-600",
  style: "background: linear-gradient(to right, #f0fff4, #dcfce7);"
});
```

### Important Toast

```svelte
toast.error("Critical error!", {
  important: true,
  duration: Infinity,
  action: {
    label: "Fix Now",
    onClick: () => fixError()
  }
});
```

### Sequential Updates

```svelte
const id = toast.loading("Step 1: Validating...");

await validate();
toast.loading("Step 2: Processing...", { id });

await process();
toast.loading("Step 3: Saving...", { id });

await save();
toast.success("All done!", { id });
```

## Accessibility

- Toast notifications are announced to screen readers
- Keyboard navigation support
- Focus management for action buttons
- Sufficient color contrast for all variants

## Styling

The toaster is styled the way `alert` is styled, and a theme reaches it the same way.

`Toaster` passes `unstyled` to svelte-sonner, which drops that library's own
`[data-sonner-toast][data-styled='true']` rule block. Everything visible then comes
from ordinary Tailwind classes on the toast element — no `!important` anywhere.
The maps live in `sonner-variants.ts` (importable without the Svelte compiler, so
`sonner-variants.test.ts` can assert them) and split in two, because sonner puts
`classes.toast` *and* `classes[type]` on the same element and joins them with a
bare `filter(Boolean).join(' ')` — no tailwind-merge. Anything both strings set
would be settled by Tailwind's emission order rather than by the source, so:

- `toastFrameClasses` carries radius, shadow and border **width**, per variant.
- `toastSurfaceClasses` carries background, text and border **colour**, per
  variant × type. `default`'s row is `alertVariants` verbatim:

| Type | Classes |
|------|---------|
| default | `bg-card text-card-foreground border-border` |
| success | `bg-success/10 text-success border-success dark:border-success/80` |
| error | `bg-destructive/10 text-destructive border-destructive/30 dark:border-destructive/80` |
| warning | `bg-warning/10 text-warning border-warning dark:border-warning/80` |
| info | `bg-info/10 text-info border-info/30 dark:border-info/80` |

Keep those two groups disjoint. `default` is a real key, not a fallback —
svelte-sonner dispatches a bare `toast()` as `type: "default"`.

### How a theme wins

Not by specificity. A theme's rules are **unlayered** and these classes are
utilities in `@layer utilities`, and an unlayered declaration beats a layered one
whatever the selectors look like. So a theme wins every property it names, and a
variant that owns a property has to opt out rather than out-specify it. The hook
is `data-toast-variant` on the toaster — `bordered` keeps its accent edge,
`minimal` its bare bottom rule and square corners, and `filled` its solid role
ground:

```css
.theme-ledger
	[data-sonner-toaster]:not([data-toast-variant="bordered"]):not([data-toast-variant="minimal"])
	[data-sonner-toast] {
	border-width: var(--ledger-rule-width);
}

.theme-ledger
	[data-sonner-toaster]:not([data-toast-variant="minimal"])
	[data-sonner-toast] {
	border-radius: var(--ledger-corner);
	box-shadow: 2px 2px 0 var(--foreground);
}

/* `filled` and `minimal` lay down their own ground. */
.theme-ledger
	[data-sonner-toaster]:not([data-toast-variant="filled"]):not([data-toast-variant="minimal"])
	[data-sonner-toast] {
	background-color: var(--card);
}
```

Note `border-width`, not the `border` shorthand — the shorthand resets border
*colour* on all four sides, which would take the variant's role colour with it.
This is the same split each theme's `[data-slot="alert"]` rule already uses.

### The rules a class cannot reach

Some svelte-sonner rules are **not** gated on `data-styled`, so they survive
`unstyled` and out-specify anything the wrapper can put in a class attribute.
Three are handled outside the class maps:

- **Toaster font** and **stacked-toast hiding** were gated, and are behaviour
  rather than style, so `styles/theme.css` restores them: the toaster inherits
  the page font instead of hard-coding a system sans stack, and toasts stacked
  behind the front one still hide their contents until the stack expands.
- **Dark-mode description colour** (`[data-sonner-theme='dark'] [data-description]`,
  three deep) would paint the description near-white on every theme. One rule in
  `styles/theme.css`, four attributes deep, puts `color: inherit` back so the
  description tracks the toast's role colour and is dimmed only by `opacity-90`.
- **Dark-mode close-button colours** read `--normal-bg` / `--normal-text` /
  `--normal-border` and cannot be out-specified at all. `Toaster` points those
  custom properties at the token layer via its `style` attribute; without it the
  close button is a hard-coded `#000` on all eight themes.

`richColors` no longer reaches svelte-sonner — its rich-colour rules are three
selectors deep and would beat the token classes with a hard-coded green. The prop
now chooses between the role-token palette above and one neutral surface for
every type.
