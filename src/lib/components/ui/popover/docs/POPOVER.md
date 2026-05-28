# Popover Component

A customizable popover component with multiple visual variants, sizes, and animation options built with Svelte 5 and bits-ui.

## Features

- **5 Visual Variants**: Default, Bordered, Elevated, Minimal, Ghost
- **4 Size Options**: Small, Default, Large, Auto
- **5 Animation Styles**: Default (combined), Fade, Scale, Slide, None
- **5 Trigger Variants**: Default, Button, Outline, Ghost, Link
- **Fully Accessible**: Built on bits-ui primitives with keyboard navigation
- **Smart Positioning**: Automatic collision detection and placement

## Installation

```bash
pnpm add aether-ui
```

---

## Quick Start

```svelte
<script lang="ts">
  import { Popover } from "aether-ui";
</script>

<Popover triggerText="Open">
  <div class="space-y-2">
    <h4 class="font-medium leading-none">Dimensions</h4>
    <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
  </div>
</Popover>
```

---

## Declarative API

The `<Popover>` component is the primary way to use popovers. All content variants, trigger styles, positioning, and controlled state are available as props.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `triggerText` | `string` | `'Open'` | Label for the trigger button — used when no `trigger` snippet is provided |
| `triggerVariant` | `'default' \| 'button' \| 'outline' \| 'ghost' \| 'link'` | `'button'` | Trigger visual style |
| `triggerSize` | `'default' \| 'sm' \| 'lg'` | `'default'` | Trigger size |
| `triggerClass` | `string` | — | Extra CSS classes on the trigger element |
| `contentVariant` | `'default' \| 'bordered' \| 'elevated' \| 'minimal' \| 'ghost'` | `'default'` | Panel visual style |
| `contentSize` | `'sm' \| 'default' \| 'lg' \| 'auto'` | `'default'` | Panel width / padding |
| `animation` | `'default' \| 'fade' \| 'scale' \| 'slide' \| 'none'` | `'default'` | Entry/exit animation |
| `contentClass` | `string` | — | Extra CSS classes on the content panel |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Preferred placement side |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment relative to trigger |
| `sideOffset` | `number` | `4` | Gap between trigger and panel in px |
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Callback when open state changes |
| `portalProps` | `PopoverPrimitive.PortalProps` | — | Props forwarded to the portal |

### Snippets

| Snippet | Description |
|---------|-------------|
| `trigger` | Custom trigger content — overrides `triggerText` |
| `children` | Popover panel content |

---

## Usage

### Basic

```svelte
<Popover triggerText="Open Popover">
  <div class="space-y-2">
    <h4 class="font-medium leading-none">Dimensions</h4>
    <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
  </div>
</Popover>
```

### Custom Trigger

Use the `trigger` snippet to replace the default button with any element.

```svelte
<script lang="ts">
  import { Popover } from "aether-ui";
  import Settings from "@lucide/svelte/icons/settings";
</script>

<Popover triggerVariant="outline" contentVariant="elevated" align="end">
  {#snippet trigger()}
    <Settings class="size-4 mr-2" />
    Settings
  {/snippet}
  <p class="text-sm">Adjust your preferences.</p>
</Popover>
```

### Icon-only Trigger

```svelte
<script lang="ts">
  import { Popover } from "aether-ui";
  import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
</script>

<Popover triggerVariant="ghost" triggerSize="sm">
  {#snippet trigger()}
    <EllipsisVertical class="size-4" />
  {/snippet}
  <div class="flex flex-col">
    <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left">Edit</button>
    <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left">Duplicate</button>
    <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left text-destructive">Delete</button>
  </div>
</Popover>
```

### Positioning

```svelte
<Popover triggerText="Open" side="top" align="start" sideOffset={8}>
  <p>This popover appears above the trigger, aligned to the start.</p>
</Popover>
```

### Controlled State

Pass `open` and `onOpenChange` together to take control of the open state externally.

```svelte
<script lang="ts">
  import { Popover } from "aether-ui";

  let open = $state(false);
</script>

<button onclick={() => (open = true)}>Open externally</button>

<Popover
  {open}
  onOpenChange={(v) => (open = v)}
  triggerText="Toggle"
  triggerVariant="outline"
>
  <p class="text-sm">Popover is {open ? "open" : "closed"}.</p>
</Popover>
```

---

## Content Variants

Control the panel appearance with `contentVariant`.

| Variant | Description |
|---------|-------------|
| `default` | Standard shadow with border |
| `bordered` | Emphasized border with lighter shadow |
| `elevated` | No border, larger shadow — floating appearance |
| `minimal` | Subtle, light border and small shadow |
| `ghost` | Transparent background, no shadow — for custom styling |

```svelte
<Popover triggerText="Default" contentVariant="default">...</Popover>
<Popover triggerText="Bordered" contentVariant="bordered">...</Popover>
<Popover triggerText="Elevated" contentVariant="elevated">...</Popover>
<Popover triggerText="Minimal" contentVariant="minimal">...</Popover>
<Popover triggerText="Ghost" contentVariant="ghost" contentClass="bg-gradient-to-r from-purple-500 to-pink-500 text-white">...</Popover>
```

---

## Size Variants

Control the panel width and padding with `contentSize`.

| Size | Description |
|------|-------------|
| `sm` | Compact — tight padding, narrow width |
| `default` | Standard — most use cases |
| `lg` | Spacious — detailed content |
| `auto` | Width follows content |

```svelte
<Popover triggerText="Small" contentSize="sm">
  <p class="text-sm">Compact content</p>
</Popover>

<Popover triggerText="Large" contentSize="lg">
  <h3 class="text-lg font-semibold mb-2">Detailed Information</h3>
  <p>More content with extra space</p>
</Popover>

<Popover triggerText="Auto" contentSize="auto">
  <p>Content determines width</p>
</Popover>
```

---

## Animation Variants

Control entry/exit animation with the `animation` prop.

| Value | Effect |
|-------|--------|
| `default` | Combined fade + zoom + slide |
| `fade` | Simple fade in/out |
| `scale` | Zoom in/out |
| `slide` | Slides from the placement side |
| `none` | Instant show/hide |

```svelte
<Popover triggerText="Fade" animation="fade">...</Popover>
<Popover triggerText="Scale" animation="scale">...</Popover>
<Popover triggerText="Slide" animation="slide">...</Popover>
<Popover triggerText="No animation" animation="none">...</Popover>
```

---

## Trigger Variants

Control the trigger button style with `triggerVariant`.

| Variant | Use case |
|---------|----------|
| `button` | Primary action — default |
| `outline` | Secondary action |
| `ghost` | Subtle — icon buttons |
| `link` | Inline text triggers |
| `default` | Unstyled — fully custom |

```svelte
<Popover triggerText="Primary" triggerVariant="button">...</Popover>
<Popover triggerText="Secondary" triggerVariant="outline">...</Popover>
<Popover triggerText="Subtle" triggerVariant="ghost">...</Popover>
<Popover triggerText="Learn more" triggerVariant="link">...</Popover>
```

---

## Realistic Examples

### Form in Popover

```svelte
<script lang="ts">
  import { Popover } from "aether-ui";
  import { Input, Label, Button } from "aether-ui";

  let width = $state("100%");
  let maxWidth = $state("300px");
  let height = $state("25px");
  let maxHeight = $state("none");
</script>

<Popover triggerText="Open Dimensions" contentClass="w-80">
  <div class="grid gap-4">
    <div class="space-y-2">
      <h4 class="font-medium leading-none">Dimensions</h4>
      <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
    </div>
    <div class="grid gap-2">
      <div class="grid grid-cols-3 items-center gap-4">
        <Label for="width">Width</Label>
        <Input id="width" bind:value={width} class="col-span-2 h-8" />
      </div>
      <div class="grid grid-cols-3 items-center gap-4">
        <Label for="maxWidth">Max. width</Label>
        <Input id="maxWidth" bind:value={maxWidth} class="col-span-2 h-8" />
      </div>
      <div class="grid grid-cols-3 items-center gap-4">
        <Label for="height">Height</Label>
        <Input id="height" bind:value={height} class="col-span-2 h-8" />
      </div>
      <div class="grid grid-cols-3 items-center gap-4">
        <Label for="maxHeight">Max. height</Label>
        <Input id="maxHeight" bind:value={maxHeight} class="col-span-2 h-8" />
      </div>
    </div>
  </div>
</Popover>
```

### User Profile Popover

```svelte
<script lang="ts">
  import { Popover } from "aether-ui";
  import { Avatar, Button } from "aether-ui";
</script>

<Popover triggerVariant="default" contentVariant="elevated" contentSize="sm" align="end">
  {#snippet trigger()}
    <Avatar src="/avatar.jpg" alt="User" />
  {/snippet}
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-3">
      <Avatar src="/avatar.jpg" alt="User" class="h-12 w-12" />
      <div>
        <p class="font-medium">John Doe</p>
        <p class="text-sm text-muted-foreground">john@example.com</p>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <Button variant="ghost" size="sm" class="justify-start">Profile</Button>
      <Button variant="ghost" size="sm" class="justify-start">Settings</Button>
      <Button variant="ghost" size="sm" class="justify-start">Sign out</Button>
    </div>
  </div>
</Popover>
```

---

## Styling

### Custom Width

```svelte
<Popover triggerText="Wide" contentSize="auto" contentClass="w-96">
  Custom width content
</Popover>
```

### Custom Colors

```svelte
<Popover triggerText="Colored" contentVariant="ghost" contentClass="bg-blue-500 text-white border border-blue-600">
  Custom colored popover
</Popover>
```

### No Padding

```svelte
<Popover triggerText="Image" contentClass="p-0">
  <img src="/image.jpg" alt="Full bleed" class="rounded-md" />
</Popover>
```

---

## Compositional API

Use the primitives directly when you need structural control unavailable in the declarative API — for example, placing an `Arrow`, embedding a `Close` button inside content, or building a custom trigger outside the popover tree.

```svelte
<script lang="ts">
  import { PopoverPrimitives } from "aether-ui";
  const { Root, Trigger, Content, Close, Arrow } = PopoverPrimitives;
  import { Button } from "aether-ui";
</script>

<!-- With arrow indicator -->
<Root>
  <Trigger variant="button">Open</Trigger>
  <Content>
    <Arrow class="fill-popover" />
    <p class="text-sm">Popover with arrow</p>
  </Content>
</Root>

<!-- With explicit Close button inside content -->
<Root>
  <Trigger variant="outline">Open</Trigger>
  <Content>
    <p class="text-sm mb-4">Take an action before closing.</p>
    <Close>
      <Button variant="outline" size="sm">Dismiss</Button>
    </Close>
  </Content>
</Root>
```

### Primitives Reference

| Export | Description |
|--------|-------------|
| `PopoverPrimitives.Root` | Popover root (controlled via `open` / `onOpenChange`) |
| `PopoverPrimitives.Trigger` | Trigger button (`variant`, `size`, `class`) |
| `PopoverPrimitives.Content` | Panel (`variant`, `size`, `animation`, `side`, `align`, `sideOffset`) |
| `PopoverPrimitives.Close` | Wrapper that closes the popover on click |
| `PopoverPrimitives.Arrow` | Arrow indicator (style with `class="fill-popover"`) |

### PopoverTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'button' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | Visual style |
| `size` | `'default' \| 'sm' \| 'lg'` | `'default'` | Size |
| `class` | `string` | — | Additional CSS classes |

### PopoverContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'bordered' \| 'elevated' \| 'minimal' \| 'ghost'` | `'default'` | Visual style |
| `size` | `'sm' \| 'default' \| 'lg' \| 'auto'` | `'default'` | Panel size |
| `animation` | `'default' \| 'fade' \| 'scale' \| 'slide' \| 'none'` | `'default'` | Entry/exit animation |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Placement side |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment |
| `sideOffset` | `number` | `4` | Distance from trigger in px |
| `class` | `string` | — | Additional CSS classes |
| `portalProps` | `PopoverPrimitive.PortalProps` | — | Portal props |

---

## Accessibility

- **Tab** — move focus to/from the trigger
- **Space / Enter** — open/close when trigger is focused
- **Escape** — close the popover
- Proper ARIA attributes: `aria-haspopup`, `aria-expanded`, `aria-controls`
- Focus returns to trigger on close

---

## Related Components

- **Dropdown Menu** — for standard menu interactions
- **Dialog** — for modal dialogs requiring full user attention
- **Tooltip** — for simple hover hints
- **Sheet** — for larger side panels
- **Context Menu** — for right-click contextual actions
