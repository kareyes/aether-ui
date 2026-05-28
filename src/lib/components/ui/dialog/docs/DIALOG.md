# Dialog

A modal dialog component for displaying content that requires user interaction or attention. Built on top of [bits-ui](https://bits-ui.com) Dialog primitives.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Props Reference](#props-reference)
- [Sizes](#sizes)
- [Variants](#variants)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Dialog component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { DialogPrimitives, Button } from "aether-ui";
</script>

<DialogPrimitives.Root>
  <DialogPrimitives.Trigger>
    <Button variant="outline">Open Dialog</Button>
  </DialogPrimitives.Trigger>
  <DialogPrimitives.Content>
    <DialogPrimitives.Header>
      <DialogPrimitives.Title>Edit Profile</DialogPrimitives.Title>
      <DialogPrimitives.Description>
        Make changes to your profile here. Click save when you're done.
      </DialogPrimitives.Description>
    </DialogPrimitives.Header>
    <div class="py-4">
      <!-- Your content here -->
    </div>
    <DialogPrimitives.Footer>
      <DialogPrimitives.Close>
        <Button variant="outline">Cancel</Button>
      </DialogPrimitives.Close>
      <Button>Save changes</Button>
    </DialogPrimitives.Footer>
  </DialogPrimitives.Content>
</DialogPrimitives.Root>
```

### With Namespace Import

```svelte
<script lang="ts">
  import * as Dialog from "aether-ui";
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button>Open</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <!-- ... -->
  </Dialog.Content>
</Dialog.Root>
```

## Components

| Component | Description |
|-----------|-------------|
| `Root` | Root component that manages dialog state |
| `Trigger` | Button or element that opens the dialog |
| `Content` | Main content container with size and variant options |
| `Overlay` | Semi-transparent backdrop |
| `Header` | Container for title and description |
| `Footer` | Container for action buttons |
| `Title` | Accessible title for the dialog |
| `Description` | Description text for the dialog |
| `Close` | Button to close the dialog |
| `Portal` | Portal component for DOM positioning |

## Props Reference

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls the open state (bindable) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `openFocus` | `FocusProp` | - | Element to focus when opening |
| `closeFocus` | `FocusProp` | - | Element to focus when closing |
| `portal` | `HTMLElement \| string` | `body` | Portal target |

### Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "lg" \| "xl" \| "full"` | `"default"` | Size of the dialog |
| `variant` | `"default" \| "centered"` | `"default"` | Layout variant |
| `showCloseButton` | `boolean` | `true` | Show/hide the close button |
| `class` | `string` | - | Additional CSS classes |

### Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

### Title

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

### Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

## Sizes

### Small Dialog

```svelte
<DialogPrimitives.Content size="sm">
  <DialogPrimitives.Header>
    <DialogPrimitives.Title>Small Dialog</DialogPrimitives.Title>
  </DialogPrimitives.Header>
</DialogPrimitives.Content>
```

### Default Size

```svelte
<DialogPrimitives.Content size="default">
  <!-- Default size -->
</DialogPrimitives.Content>
```

### Large Dialog

```svelte
<DialogPrimitives.Content size="lg">
  <!-- More space for detailed content -->
</DialogPrimitives.Content>
```

### Extra Large Dialog

```svelte
<DialogPrimitives.Content size="xl">
  <!-- Maximum space for complex content -->
</DialogPrimitives.Content>
```

### Full Width Dialog

```svelte
<DialogPrimitives.Content size="full">
  <!-- 90vw width on desktop -->
</DialogPrimitives.Content>
```

## Variants

### Default Variant

Left-aligned on desktop, centered on mobile:

```svelte
<DialogPrimitives.Content variant="default">
  <!-- ... -->
</DialogPrimitives.Content>
```

### Centered Variant

Centered layout for all screen sizes:

```svelte
<DialogPrimitives.Content variant="centered">
  <!-- ... -->
</DialogPrimitives.Content>
```

## Examples

### Controlled State

```svelte
<script lang="ts">
  import { DialogPrimitives, Button } from "aether-ui";

  let open = $state(false);

  function handleSubmit() {
    // Do something
    open = false;
  }
</script>

<DialogPrimitives.Root bind:open>
  <DialogPrimitives.Trigger>
    <Button>Open</Button>
  </DialogPrimitives.Trigger>
  <DialogPrimitives.Content>
    <form onsubmit={handleSubmit}>
      <!-- Form content -->
    </form>
  </DialogPrimitives.Content>
</DialogPrimitives.Root>

<Button onclick={() => open = true}>
  Open from anywhere
</Button>
```

### Form in Dialog

```svelte
<script lang="ts">
  import { DialogPrimitives, Button, Input, Label } from "aether-ui";

  let name = $state("");
  let email = $state("");

  function handleSave() {
    console.log({ name, email });
  }
</script>

<DialogPrimitives.Root>
  <DialogPrimitives.Trigger>
    <Button>Edit Profile</Button>
  </DialogPrimitives.Trigger>
  <DialogPrimitives.Content>
    <DialogPrimitives.Header>
      <DialogPrimitives.Title>Edit Profile</DialogPrimitives.Title>
      <DialogPrimitives.Description>
        Make changes to your profile here. Click save when you're done.
      </DialogPrimitives.Description>
    </DialogPrimitives.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-end">Name</Label>
        <Input id="name" bind:value={name} class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="email" class="text-end">Email</Label>
        <Input id="email" type="email" bind:value={email} class="col-span-3" />
      </div>
    </div>
    <DialogPrimitives.Footer>
      <DialogPrimitives.Close>
        <Button variant="outline">Cancel</Button>
      </DialogPrimitives.Close>
      <Button onclick={handleSave}>Save changes</Button>
    </DialogPrimitives.Footer>
  </DialogPrimitives.Content>
</DialogPrimitives.Root>
```

### Confirmation Dialog

```svelte
<script lang="ts">
  import { DialogPrimitives, Button } from "aether-ui";
  import Trash2Icon from "@lucide/svelte/icons/trash-2";

  function handleDelete() {
    console.log("Item deleted");
  }
</script>

<DialogPrimitives.Root>
  <DialogPrimitives.Trigger>
    <Button variant="destructive">
      <Trash2Icon class="size-4 mr-2" />
      Delete
    </Button>
  </DialogPrimitives.Trigger>
  <DialogPrimitives.Content size="sm" variant="centered">
    <DialogPrimitives.Header>
      <DialogPrimitives.Title>Are you sure?</DialogPrimitives.Title>
      <DialogPrimitives.Description>
        This action cannot be undone. This will permanently delete the item.
      </DialogPrimitives.Description>
    </DialogPrimitives.Header>
    <DialogPrimitives.Footer>
      <DialogPrimitives.Close>
        <Button variant="outline">Cancel</Button>
      </DialogPrimitives.Close>
      <Button variant="destructive" onclick={handleDelete}>
        Delete
      </Button>
    </DialogPrimitives.Footer>
  </DialogPrimitives.Content>
</DialogPrimitives.Root>
```

### Without Close Button

```svelte
<DialogPrimitives.Content showCloseButton={false}>
  <DialogPrimitives.Header>
    <DialogPrimitives.Title>Important Action</DialogPrimitives.Title>
    <DialogPrimitives.Description>
      This requires your attention. You must choose an action.
    </DialogPrimitives.Description>
  </DialogPrimitives.Header>
  <DialogPrimitives.Footer>
    <DialogPrimitives.Close>
      <Button>Confirm</Button>
    </DialogPrimitives.Close>
  </DialogPrimitives.Footer>
</DialogPrimitives.Content>
```

### Scrollable Content

```svelte
<DialogPrimitives.Content size="lg">
  <DialogPrimitives.Header>
    <DialogPrimitives.Title>Long Content</DialogPrimitives.Title>
  </DialogPrimitives.Header>
  <div class="max-h-[400px] overflow-y-auto py-4">
    {#each Array(20) as _, i}
      <p class="mb-4">Content item {i + 1}</p>
    {/each}
  </div>
  <DialogPrimitives.Footer>
    <Button>Close</Button>
  </DialogPrimitives.Footer>
</DialogPrimitives.Content>
```

## Accessibility

The Dialog component follows the WAI-ARIA dialog pattern:

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Escape` | Close the dialog |
| `Tab` | Move focus forward within dialog |
| `Shift + Tab` | Move focus backward within dialog |

### Focus Management

- Focus is trapped within the dialog when open
- First focusable element receives focus when opened
- Focus returns to trigger element when closed

### ARIA Attributes

- `role="dialog"` on dialog content
- `aria-labelledby` connects to Title
- `aria-describedby` connects to Description
- `aria-modal="true"` indicates modal behavior

### Best Practices

1. **Always include a title**: Use Title for accessibility
2. **Provide descriptions**: Use Description to explain the dialog's purpose
3. **Keep content focused**: Dialogs should have a single, clear purpose
4. **Choose appropriate size**: Use smaller sizes for confirmations, larger for forms
5. **Avoid nesting**: Don't open dialogs within dialogs
6. **Close actions**: Provide clear ways to close the dialog
