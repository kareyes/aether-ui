# Alert

A versatile alert component for displaying important messages with various styles, icons, and actions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Alert component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { Alert } from "aether-ui";
</script>

<Alert
  variant="info"
  title="Information"
  description="This is an informational message."
/>
```

### With Primitives Import

```svelte
<script lang="ts">
  import { AlertPrimitives } from "aether-ui";
</script>

<AlertPrimitives.Root variant="success">
  <AlertPrimitives.Title>Success!</AlertPrimitives.Title>
  <AlertPrimitives.Description>
    Your changes have been saved.
  </AlertPrimitives.Description>
</AlertPrimitives.Root>
```

## Components

| Component | Description |
|-----------|-------------|
| `Alert` | Simple wrapper component with convenient props |
| `Root` | Root container with variant styling |
| `Title` | Alert title element |
| `Description` | Alert description element |

## Props Reference

### Alert (Wrapper Component)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant |
| `title` | `string` | `undefined` | Alert title text |
| `description` | `string` | `undefined` | Alert description text |
| `icon` | `Snippet` | `undefined` | Custom icon snippet (overrides default) |
| `showIcon` | `boolean` | `true` | Whether to show the icon |
| `dismissible` | `boolean` | `false` | Whether alert can be dismissed |
| `onDismiss` | `() => void` | `undefined` | Callback when alert is dismissed |
| `actions` | `Snippet` | `undefined` | Action buttons snippet |
| `children` | `Snippet` | `undefined` | Custom content |
| `class` | `string` | - | Additional CSS classes |

### Root (Primitive)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `AlertVariant` | `"default"` | Visual style variant |
| `icon` | `Snippet` | `undefined` | Icon snippet |
| `dismissible` | `boolean` | `false` | Whether alert can be dismissed |
| `onDismiss` | `() => void` | `undefined` | Dismiss callback |
| `actions` | `Snippet` | `undefined` | Actions snippet |
| `class` | `string` | - | Additional CSS classes |

### Title

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

### Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

## Variants

### Default

Neutral gray styling for general information:

```svelte
<Alert variant="default" title="Default Alert" description="General information message." />
```

### Info

Blue styling for informational messages:

```svelte
<Alert variant="info" title="Information" description="Here's some helpful information." />
```

### Success

Green styling for success messages:

```svelte
<Alert variant="success" title="Success!" description="Operation completed successfully." />
```

### Warning

Yellow/orange styling for warnings:

```svelte
<Alert variant="warning" title="Warning" description="Please review before proceeding." />
```

### Error

Red styling for failures and critical states. Alert reports a state rather than
performing one, so its red variant is `error` — not `destructive`, which is the
spelling used on components you act on. Both resolve to `--destructive`.

```svelte
<Alert variant="error" title="Upload failed" description="The file could not be saved." />
```

## Icon System

### Default Icons

Each variant has an automatic icon:

| Variant | Icon |
|---------|------|
| `default` | CircleAlert |
| `info` | Info |
| `success` | CircleCheck |
| `warning` | TriangleAlert |
| `error` | CircleX |

### Custom Icon

```svelte
<script lang="ts">
  import { Alert } from "aether-ui";
  import MyCustomIcon from "@lucide/svelte/icons/star";
</script>

<Alert variant="info" title="Custom Icon">
  {#snippet icon()}
    <MyCustomIcon class="size-5" />
  {/snippet}
</Alert>
```

### Hide Icon

```svelte
<Alert variant="warning" title="No Icon" showIcon={false} />
```

## Examples

### With Actions

```svelte
<script lang="ts">
  import { Alert, Button } from "aether-ui";
</script>

<Alert
  variant="warning"
  title="Warning"
  description="This action cannot be undone."
>
  {#snippet actions()}
    <Button variant="outline" size="sm">Cancel</Button>
    <Button variant="destructive" size="sm">Confirm</Button>
  {/snippet}
</Alert>
```

### Dismissible Alert

```svelte
<script lang="ts">
  import { Alert } from "aether-ui";

  let showAlert = $state(true);
</script>

{#if showAlert}
  <Alert
    variant="success"
    title="Success!"
    description="Your changes have been saved."
    dismissible={true}
    onDismiss={() => showAlert = false}
  />
{/if}
```

### Form Validation Error

```svelte
<Alert
  variant="error"
  title="Validation Failed"
  description="Please correct the following errors:"
>
  <ul class="mt-2 list-disc list-inside text-sm">
    <li>Email is required</li>
    <li>Password must be at least 8 characters</li>
  </ul>
</Alert>
```

### Using Primitives

For complete control, use the primitive components:

```svelte
<script lang="ts">
  import { AlertPrimitives } from "aether-ui";
  import CheckIcon from "@lucide/svelte/icons/check";
</script>

<AlertPrimitives.Root variant="success" dismissible={true} onDismiss={handleDismiss}>
  {#snippet icon()}
    <div class="flex-none w-9 h-9 rounded-full grid place-items-center bg-green-50 dark:bg-green-500/20">
      <CheckIcon class="size-4 text-green-600 dark:text-green-400" />
    </div>
  {/snippet}

  <AlertPrimitives.Title>Payment Successful</AlertPrimitives.Title>
  <AlertPrimitives.Description>
    Your payment of $99.00 has been processed successfully.
  </AlertPrimitives.Description>

  {#snippet actions()}
    <button class="text-sm font-medium underline">View Receipt</button>
  {/snippet}
</AlertPrimitives.Root>
```

### Success with Action

```svelte
<script lang="ts">
  import { Alert } from "aether-ui";
</script>

<Alert
  variant="success"
  title="Profile Updated"
  description="Your profile changes have been saved successfully."
>
  {#snippet actions()}
    <a href="/profile" class="text-sm font-medium text-green-600 dark:text-green-400 hover:underline">
      View Profile
    </a>
  {/snippet}
</Alert>
```

### Confirmation Alert

```svelte
<script lang="ts">
  import { Alert, Button } from "aether-ui";

  function handleDelete() {
    // Handle delete
  }

  function handleCancel() {
    // Handle cancel
  }
</script>

<Alert
  variant="warning"
  title="Confirm Deletion"
  description="Are you sure you want to delete this item? This action cannot be undone."
>
  {#snippet actions()}
    <div class="flex gap-2 mt-3">
      <Button variant="destructive" onclick={handleDelete}>Delete</Button>
      <Button variant="outline" onclick={handleCancel}>Cancel</Button>
    </div>
  {/snippet}
</Alert>
```

## Accessibility

The Alert component follows accessibility best practices:

### ARIA Attributes

- Proper semantic HTML structure
- `role="alert"` for screen readers
- Dismissible alerts include `aria-label`

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Activate dismiss button |
| `Tab` | Move focus to interactive elements |

### Best Practices

1. **Use appropriate variants**: Match the variant to the message severity
2. **Provide clear actions**: Make it easy for users to respond to alerts
3. **Test with screen readers**: Ensure announcements are clear and helpful
4. **Don't overuse**: Too many alerts can desensitize users
