# Badge

A versatile badge component with multiple variants, colors, sizes, and interactive features including dismissable and clickable options, icon support, and loading states.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Badge component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { Badge } from "aether-ui";
</script>

<Badge text="Default Badge" />
```

### With Primitives Import

```svelte
<script lang="ts">
  import { BadgePrimitives } from "aether-ui";
</script>

<BadgePrimitives.Root variant="success">Success</BadgePrimitives.Root>
```

### With Variants

```svelte
<Badge text="Success" variant="success" />
<Badge text="Warning" variant="warning" />
<Badge text="Error" variant="destructive" />
<Badge text="Info" variant="info" />
```

### With Colors

```svelte
<Badge text="Primary" color="primary" />
<Badge text="Red" color="red" />
<Badge text="Blue" color="blue" />
<Badge text="Green" color="green" />
<Badge text="Purple" color="purple" />
```

`primary` resolves to the theme's `--primary` token, so it re-colors with the
active theme; the named hues (`red`, `blue`, …) are fixed palette values. It
works across every variant: solid on `default`, tinted on `secondary` / `flat`,
and text + border on `outline` / `dashed`.

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `undefined` | Text content of the badge |
| `variant` | `BadgeVariant` | `"default"` | Visual style variant |
| `color` | `BadgeColor` | `"default"` | Color theme |
| `size` | `BadgeSize` | `"default"` | Size of the badge |
| `icon` | `Snippet` | `undefined` | Custom icon snippet |
| `loading` | `boolean` | `false` | Show loading spinner |
| `dismissable` | `boolean` | `false` | Show dismiss button |
| `clickable` | `boolean` | `false` | Make badge clickable |
| `href` | `string` | `undefined` | URL for link badges |
| `onclick` | `() => void` | `undefined` | Click handler |
| `onDismiss` | `() => void` | `undefined` | Dismiss handler |
| `class` | `string` | - | Additional CSS classes |

### Badge Variants

| Variant | Description |
|---------|-------------|
| `default` | Primary badge with solid background |
| `secondary` | Secondary badge with muted background |
| `destructive` | Red badge for errors and dangerous actions |
| `outline` | Badge with border, transparent background |
| `ghost` | Minimal badge with no background |
| `success` | Green badge for positive states |
| `warning` | Yellow badge for caution states |
| `info` | Blue badge for informational content |

### Badge Colors

| Color | Use Case |
|-------|----------|
| `primary` | Brand emphasis — follows the active theme, unlike the fixed hues below |
| `red` | Errors, urgent |
| `orange` | Warnings, attention |
| `yellow` | Caution, pending |
| `green` | Success, positive |
| `blue` | Information, links |
| `purple` | Features, premium |
| `pink` | Creative, design |
| `gray` | Neutral, disabled |

### Badge Sizes

| Size | Description |
|------|-------------|
| `sm` | Compact, for lists and tables |
| `default` | Standard size |
| `lg` | Prominent display |

## Variants

### All Variants

```svelte
<Badge text="Default" variant="default" />
<Badge text="Secondary" variant="secondary" />
<Badge text="Destructive" variant="destructive" />
<Badge text="Outline" variant="outline" />
<Badge text="Ghost" variant="ghost" />
<Badge text="Success" variant="success" />
<Badge text="Warning" variant="warning" />
<Badge text="Info" variant="info" />
```

## Examples

### With Icons

```svelte
<script lang="ts">
  import { Badge } from "aether-ui";
  import CheckIcon from "@lucide/svelte/icons/check";
  import StarIcon from "@lucide/svelte/icons/star";
</script>

<Badge text="Success">
  {#snippet icon()}
    <CheckIcon class="size-3" />
  {/snippet}
</Badge>

<Badge text="Featured" color="yellow">
  {#snippet icon()}
    <StarIcon class="size-3" />
  {/snippet}
</Badge>
```

### Loading State

```svelte
<script lang="ts">
  import { Badge } from "aether-ui";

  let isProcessing = $state(true);
</script>

<Badge text="Loading" loading={true} />
<Badge text="Processing" variant="secondary" loading={true} />

<!-- Conditional loading -->
<Badge
  text={isProcessing ? "Processing..." : "Done"}
  loading={isProcessing}
  color={isProcessing ? "blue" : "green"}
/>
```

### Clickable Badges

```svelte
<script lang="ts">
  import { Badge } from "aether-ui";

  function handleClick() {
    alert('Badge clicked!');
  }
</script>

<Badge
  text="Click me"
  clickable={true}
  onclick={handleClick}
/>
```

### Dismissable Badges

```svelte
<script lang="ts">
  import { Badge } from "aether-ui";

  let tags = $state(['Design', 'Development', 'Marketing']);

  function removeTag(index: number) {
    tags = tags.filter((_, i) => i !== index);
  }
</script>

{#each tags as tag, index (tag)}
  <Badge
    text={tag}
    color="blue"
    dismissable={true}
    onDismiss={() => removeTag(index)}
  />
{/each}
```

### Link Badges

```svelte
<Badge
  text="Visit Site"
  href="https://example.com"
  color="blue"
  target="_blank"
/>
```

### Status Indicators

```svelte
<script lang="ts">
  import { Badge } from "aether-ui";
  import CheckIcon from "@lucide/svelte/icons/check";
  import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
</script>

<div class="flex gap-4">
  <div class="flex items-center gap-2">
    <span>Server:</span>
    <Badge text="Online" variant="success" size="sm">
      {#snippet icon()}
        <CheckIcon class="size-3" />
      {/snippet}
    </Badge>
  </div>

  <div class="flex items-center gap-2">
    <span>Database:</span>
    <Badge text="Maintenance" variant="warning" size="sm">
      {#snippet icon()}
        <AlertCircleIcon class="size-3" />
      {/snippet}
    </Badge>
  </div>
</div>
```

### Tag System

```svelte
<script lang="ts">
  import { Badge } from "aether-ui";

  let availableTags = ['React', 'Vue', 'Svelte', 'Angular'];
  let selectedTags = $state(['React', 'Svelte']);

  function addTag(tag: string) {
    if (!selectedTags.includes(tag)) {
      selectedTags = [...selectedTags, tag];
    }
  }

  function removeTag(tag: string) {
    selectedTags = selectedTags.filter(t => t !== tag);
  }
</script>

<!-- Selected tags -->
<div class="flex flex-wrap gap-2 mb-4">
  {#each selectedTags as tag}
    <Badge
      text={tag}
      color="blue"
      dismissable={true}
      onDismiss={() => removeTag(tag)}
    />
  {/each}
</div>

<!-- Available tags -->
<div class="flex flex-wrap gap-2">
  {#each availableTags as tag}
    {#if !selectedTags.includes(tag)}
      <Badge
        text={tag}
        variant="outline"
        clickable={true}
        onclick={() => addTag(tag)}
      />
    {/if}
  {/each}
</div>
```

### Product Features

```svelte
<script lang="ts">
  import { Badge } from "aether-ui";
</script>

<div class="border rounded-lg p-4">
  <div class="flex justify-between items-start mb-2">
    <h3 class="font-semibold">Premium Plan</h3>
    <Badge text="Popular" variant="success" />
  </div>
  <p class="text-sm text-muted-foreground mb-4">
    Advanced features for teams
  </p>
  <div class="flex gap-2">
    <Badge text="Analytics" color="blue" size="sm" />
    <Badge text="API Access" color="green" size="sm" />
    <Badge text="Priority Support" color="purple" size="sm" />
  </div>
</div>
```

### User Profile

```svelte
<script lang="ts">
  import { Badge } from "aether-ui";
</script>

<div class="flex items-start gap-4">
  <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
  <div class="flex-1">
    <div class="flex items-center gap-2 mb-1">
      <h3 class="font-semibold">John Doe</h3>
      <Badge text="Pro" variant="success" size="sm" />
    </div>
    <p class="text-sm text-muted-foreground mb-2">Senior Developer</p>
    <div class="flex flex-wrap gap-1">
      <Badge text="React" color="blue" size="sm" />
      <Badge text="TypeScript" color="blue" size="sm" />
      <Badge text="Node.js" color="green" size="sm" />
    </div>
  </div>
</div>
```

## Accessibility

The Badge component follows accessibility best practices:

### Semantic HTML

- Proper semantic HTML (`<span>`, `<a>`, or `<button>`)
- ARIA labels for dismiss buttons
- Keyboard navigation support

### Best Practices

1. **Use meaningful text**: Badge text should clearly indicate the status or category
2. **Color contrast**: All colors include proper contrast for readability
3. **Interactive feedback**: Clickable and dismissable badges have visual feedback
4. **Screen reader friendly**: All variants support screen readers
5. **Dark mode**: All colors and variants include dark mode support
