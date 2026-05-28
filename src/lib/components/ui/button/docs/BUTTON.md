# Button

An enhanced button component with support for icons, loading states, variants, and dynamic content.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Button component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { Button } from "aether-ui";
</script>

<Button>Click me</Button>
```

### With Primitives Import

```svelte
<script lang="ts">
  import { ButtonPrimitives } from "aether-ui";
</script>

<ButtonPrimitives.Root>Click me</ButtonPrimitives.Root>
```

### Button with Text Prop

```svelte
<Button text="Click me" />
```

### Button with Icon

```svelte
<script lang="ts">
  import { Button } from "aether-ui";
  import PlusIcon from "@lucide/svelte/icons/plus";
</script>

<Button text="Add Item" icon={PlusIcon} />
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `undefined` | Text content to display |
| `icon` | `ComponentType` | `undefined` | Lucide Svelte icon component |
| `iconPosition` | `"left" \| "right"` | `"left"` | Position of the icon relative to text |
| `loading` | `boolean` | `false` | Show loading spinner and disable button |
| `loadingText` | `string` | `"Loading..."` | Text to show during loading state |
| `variant` | `ButtonVariant` | `"default"` | Button style variant |
| `size` | `ButtonSize` | `"default"` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |
| `href` | `string` | `undefined` | Makes button render as link |
| `class` | `string` | - | Additional CSS classes |

### Button Variants

| Variant | Description |
|---------|-------------|
| `default` | Primary button with solid background |
| `secondary` | Secondary button with muted background |
| `outline` | Button with border, transparent background |
| `ghost` | Minimal button with no background |
| `destructive` | Red button for destructive actions |
| `bordered` | Button with emphasized border |
| `flat` | Button with flat appearance |
| `link` | Button styled as a link |

### Button Sizes

| Size | Description |
|------|-------------|
| `sm` | Small button |
| `default` | Standard button size |
| `lg` | Large button |
| `icon` | Square button for icon-only |

## Variants

### All Variants

```svelte
<Button text="Default" />
<Button text="Secondary" variant="secondary" />
<Button text="Outline" variant="outline" />
<Button text="Ghost" variant="ghost" />
<Button text="Destructive" variant="destructive" />
<Button text="Bordered" variant="bordered" />
<Button text="Flat" variant="flat" />
<Button text="Link" variant="link" />
```

### Different Sizes

```svelte
<Button text="Small" size="sm" />
<Button text="Default" size="default" />
<Button text="Large" size="lg" />
```

## Examples

### Icon Position

```svelte
<script lang="ts">
  import { Button } from "aether-ui";
  import DownloadIcon from "@lucide/svelte/icons/download";
</script>

<!-- Icon on the left (default) -->
<Button text="Download" icon={DownloadIcon} />

<!-- Icon on the right -->
<Button text="Download" icon={DownloadIcon} iconPosition="right" />
```

### Icon Only Button

```svelte
<script lang="ts">
  import { Button } from "aether-ui";
  import SaveIcon from "@lucide/svelte/icons/save";
</script>

<Button icon={SaveIcon} size="icon" />
```

### Loading States

```svelte
<script lang="ts">
  import { Button } from "aether-ui";
  import SaveIcon from "@lucide/svelte/icons/save";

  let saving = $state(false);

  const handleSave = async () => {
    saving = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Saved!');
    } finally {
      saving = false;
    }
  };
</script>

<Button
  text="Save Changes"
  icon={SaveIcon}
  loading={saving}
  loadingText="Saving..."
  onclick={handleSave}
/>
```

### Button as Link

```svelte
<Button text="Go to Docs" href="/docs" />
```

### Button with Custom Content

The component maintains backwards compatibility with children content:

```svelte
<script lang="ts">
  import { Button } from "aether-ui";
  import PlusIcon from "@lucide/svelte/icons/plus";
</script>

<Button variant="destructive">
  <PlusIcon class="size-4 mr-2" />
  Custom Content
</Button>
```

### Button Group Example

```svelte
<script lang="ts">
  import { Button, ButtonGroup } from "aether-ui";
</script>

<ButtonGroup>
  <Button text="Left" />
  <Button text="Center" />
  <Button text="Right" />
</ButtonGroup>
```

## Loading Behavior

When `loading={true}`:
- Button becomes disabled
- Icon is replaced with a spinning loader
- Text changes to `loadingText` if provided
- Original icon and text are restored when loading ends

## Accessibility

The Button component follows accessibility best practices:

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Activate the button |
| `Tab` | Move focus to the button |

### ARIA Attributes

- `aria-disabled` is set when button is disabled or loading
- `aria-busy` is set when button is in loading state
- Proper focus indicators for keyboard users

### Best Practices

1. **Use descriptive text**: Button text should clearly indicate the action
2. **Provide loading feedback**: Use `loadingText` to inform users of ongoing actions
3. **Icon accessibility**: Icon-only buttons should have `aria-label` for screen readers
4. **Color contrast**: All variants meet WCAG color contrast requirements
