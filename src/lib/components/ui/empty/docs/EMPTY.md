# Empty Component

Display meaningful empty states with icons, titles, descriptions, and actions. Supports a concise declarative API and a flexible compositional API.

## Table of Contents

- [Features](#features)
- [APIs at a Glance](#apis-at-a-glance)
- [Declarative API](#declarative-api)
  - [Props](#props)
  - [Snippets](#snippets)
  - [Examples](#examples)
- [Variants](#variants)
- [Sizes](#sizes)
- [Icon Variants](#icon-variants)
- [Compositional API](#compositional-api)
- [Custom Styling](#custom-styling)
- [Accessibility](#accessibility)

---

## Features

- **Two APIs**: declarative single-component or fully compositional
- **4 variants**: `default`, `outline`, `filled`, `ghost`
- **3 sizes**: `sm`, `default`, `lg`
- **Icon wrapper control**: boxed or bare icon rendering
- **Snippet-based**: icon, action, and arbitrary children via Svelte 5 snippets
- **Fully extensible**: override any class with the `class` prop

---

## APIs at a Glance

```svelte
<!-- Declarative — most common, minimal boilerplate -->
<Empty title="No Messages" description="Your inbox is empty." variant="outline">
  {#snippet icon()}<InboxIcon />{/snippet}
  {#snippet action()}<Button>Compose</Button>{/snippet}
</Empty>

<!-- Compositional — full structural control -->
<EmptyPrimitives.Root variant="outline">
  <EmptyPrimitives.Header>
    <EmptyPrimitives.Media variant="icon"><InboxIcon /></EmptyPrimitives.Media>
    <EmptyPrimitives.Title>No Messages</EmptyPrimitives.Title>
    <EmptyPrimitives.Description>Your inbox is empty.</EmptyPrimitives.Description>
  </EmptyPrimitives.Header>
  <EmptyPrimitives.Content>
    <Button>Compose</Button>
  </EmptyPrimitives.Content>
</EmptyPrimitives.Root>
```

---

## Declarative API

Import the single `Empty` component:

```svelte
<script lang="ts">
  import { Empty, Button } from "aether-ui";
  import InboxIcon from "@tabler/icons-svelte/icons/inbox";
</script>

<Empty
  title="No Messages"
  description="Your inbox is empty. Messages you receive will appear here."
  variant="outline"
>
  {#snippet icon()}<InboxIcon />{/snippet}
  {#snippet action()}
    <Button>Compose Message</Button>
  {/snippet}
</Empty>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Main heading text |
| `description` | `string` | — | Supporting text below the title |
| `variant` | `'default' \| 'outline' \| 'filled' \| 'ghost'` | `'default'` | Visual style of the container |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Padding and gap size |
| `iconVariant` | `'icon' \| 'default' \| 'illustration'` | `'icon'` | Media wrapper style — `'icon'` adds a rounded muted box, `'default'` is transparent, `'illustration'` renders a rich SVG at its natural size |
| `class` | `string` | — | Additional CSS classes applied to the root element |

### Snippets

| Snippet | Description |
|---------|-------------|
| `icon` | Icon or image rendered inside the media wrapper (above the title) |
| `action` | Buttons or links rendered in the content area (below the description) |
| `children` | Arbitrary content placed alongside `action` in the content area |

All snippets are optional. Sections are omitted entirely when no snippet is provided.

---

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Dashed border style (no visible border by default) |
| `outline` | Visible dashed border |
| `filled` | Dashed border + muted background fill |
| `ghost` | No border, no background — purely typographic |

```svelte
<Empty variant="default"  title="Default"  description="Dashed style, no fill." />
<Empty variant="outline"  title="Outline"  description="Visible dashed border." />
<Empty variant="filled"   title="Filled"   description="Muted background." />
<Empty variant="ghost"    title="Ghost"    description="No border or background." />
```

> **Tip:** Use `class="border"` on a `variant="default"` component to show a solid (non-dashed) border. Use `class="border-primary/40"` to tint the border color on any variant.

---

## Sizes

| Size | Padding | Gap | Use case |
|------|---------|-----|----------|
| `sm` | `p-4` | `gap-4` | Sidebar panels, inline list states |
| `default` | `p-6 md:p-12` | `gap-6` | Most card or section empty states |
| `lg` | `p-12 md:p-16` | `gap-8` | Full-page / dashboard empty states |

```svelte
<Empty size="sm"      variant="outline" title="Compact" />
<Empty size="default" variant="outline" title="Standard" />
<Empty size="lg"      variant="outline" title="Spacious" />
```

---

## Icon Variants

The `iconVariant` prop controls how the icon is wrapped inside `Empty.Media`:

```svelte
<!-- "icon" (default): icon sits in a small rounded muted box, forced to size-6 -->
<Empty iconVariant="icon" ...>
  {#snippet icon()}<SearchIcon />{/snippet}
</Empty>

<!-- "default": bare transparent wrapper — you control the size -->
<Empty iconVariant="default" ...>
  {#snippet icon()}
    <SearchIcon class="size-12 text-muted-foreground" />
  {/snippet}
</Empty>

<!-- "illustration": transparent wrapper for a rich SVG at its natural size -->
<Empty iconVariant="illustration" ...>
  {#snippet icon()}<Illustrations.NoTimeEntries size={140} />{/snippet}
</Empty>
```

> **Important:** the default `iconVariant="icon"` forces any un-sized SVG to
> `size-6` (24px) inside a `size-10` (40px) box — this crushes rich
> illustrations to an unrecognizable size. When passing an
> `aether-ui` illustration, an Avatar, or any large/custom-sized SVG, use
> `iconVariant="illustration"` (respects the illustration's own `size` prop
> and scales down responsively) or `iconVariant="default"` (bare wrapper where
> you size the SVG yourself). Never leave a full illustration on the default
> `icon` variant.

---

## Compositional API

For full structural control, import from `EmptyPrimitives`:

```svelte
<script lang="ts">
  import { EmptyPrimitives, Button } from "aether-ui";
  import UsersIcon from "@tabler/icons-svelte/icons/users";
</script>

<EmptyPrimitives.Root variant="outline">
  <EmptyPrimitives.Header>
    <EmptyPrimitives.Media variant="icon">
      <UsersIcon />
    </EmptyPrimitives.Media>
    <EmptyPrimitives.Title>No Team Members</EmptyPrimitives.Title>
    <EmptyPrimitives.Description>
      Invite colleagues to collaborate on this project.
    </EmptyPrimitives.Description>
  </EmptyPrimitives.Header>
  <EmptyPrimitives.Content>
    <Button>Invite Members</Button>
    <Button variant="link" class="text-muted-foreground text-sm">
      Learn about permissions
    </Button>
  </EmptyPrimitives.Content>
</EmptyPrimitives.Root>
```

### Primitive components

| Component | Slot | Description |
|-----------|------|-------------|
| `EmptyPrimitives.Root` | Container | Outer wrapper — accepts `variant`, `size`, and `class` |
| `EmptyPrimitives.Header` | `empty-header` | Groups media + title + description, centered |
| `EmptyPrimitives.Media` | `empty-icon` | Icon/image wrapper — accepts `variant: 'icon' \| 'default'` |
| `EmptyPrimitives.Title` | `empty-title` | Heading text — `text-lg font-medium` |
| `EmptyPrimitives.Description` | `empty-description` | Body text — muted, links auto-styled |
| `EmptyPrimitives.Content` | `empty-content` | Action area — centered flex column |

You can also import them individually:

```svelte
import {
  EmptyRoot,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "aether-ui";
```

---

## Custom Styling

Extend any variant with the `class` prop:

```svelte
<!-- Gradient background -->
<Empty
  variant="outline"
  class="from-muted/50 to-background bg-gradient-to-b from-30%"
  title="Gradient"
/>

<!-- Colored border -->
<Empty
  variant="outline"
  class="border-primary/40"
  title="Primary Border"
/>

<!-- Destructive / error state -->
<Empty
  variant="outline"
  class="border-destructive/40"
  title="Connection Failed"
  description="Check your network and try again."
>
  {#snippet icon()}<WifiOffIcon />{/snippet}
  {#snippet action()}<Button variant="outline" size="sm">Retry</Button>{/snippet}
</Empty>
```

---

## Accessibility

- `Empty.Root` renders a `<div role="group" data-slot="empty">` — no semantic heading structure imposed
- Place `Empty.Title` content inside a real heading tag (e.g. `<h2>`) via the compositional API when the empty state is a primary page section
- All action buttons within `Empty.Content` should have descriptive labels
- `Empty.Description` links are automatically underlined and have `:hover` color treatment via CSS selectors

---

## When to use each API

| Situation | Recommendation |
|-----------|----------------|
| Standard icon + title + description + CTA | `Empty` declarative |
| Rich SVG illustration | `Empty iconVariant="illustration"` (or `EmptyPrimitives.Media variant="illustration"`) |
| Custom media (avatar, avatar group) | `EmptyPrimitives.Root` + `EmptyPrimitives.Media variant="default"` |
| Multiple separate action rows | `EmptyPrimitives.Content` with manual layout |
| Inline / sidebar state, minimal text | `Empty size="sm" variant="ghost"` |
| Full-page dashboard empty state | `Empty size="lg" variant="outline"` |
