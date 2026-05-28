# Breadcrumb Component

A navigation trail showing the user's current location in a page hierarchy, built with Svelte 5 and semantic HTML.

## Features

- **4 List Variants**: Default, Solid, Subtle, Bold (text color)
- **3 Sizes**: Small, Default, Large
- **3 Spacing Options**: Compact, Default, Relaxed
- **4 Link Variants**: Default, Underline, Bold, Subtle
- **4 Separator Styles**: Chevron (default), Slash, Dot, Arrow
- **4 Page Variants**: Default, Bold, Muted, Accent
- **Fully Accessible**: `aria-label`, `aria-current="page"`, `role` attributes built-in

## Installation

```bash
pnpm add aether-ui
```

---

## Quick Start

```svelte
<script lang="ts">
  import { Breadcrumb } from "aether-ui";
</script>

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Documents", href: "/documents" },
    { label: "Report" },
  ]}
/>
```

The last item in the `items` array is always rendered as the current page (non-linked, `aria-current="page"`). All other items with an `href` are rendered as links.

---

## Declarative API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItemDef[]` | required | Ordered breadcrumb trail — last item is the current page |
| `listVariant` | `'default' \| 'solid' \| 'subtle' \| 'bold'` | `'default'` | Text color style of the list |
| `listSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Text size and gap |
| `listSpacing` | `'compact' \| 'default' \| 'relaxed'` | `'default'` | Gap between items |
| `linkVariant` | `'default' \| 'underline' \| 'bold' \| 'subtle'` | `'default'` | Link hover style |
| `separatorVariant` | `'default' \| 'slash' \| 'dot' \| 'arrow'` | `'default'` | Separator icon |
| `separatorSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Separator icon size |
| `pageVariant` | `'default' \| 'bold' \| 'muted' \| 'accent'` | `'default'` | Current page text style |
| `class` | `string` | — | Extra CSS classes on the root `<nav>` element |

### BreadcrumbItemDef

```ts
type BreadcrumbItemDef = {
  label: string;   // Display text
  href?: string;   // Navigation target — omit for the current page
};
```

---

## Usage

### Basic

```svelte
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Documents", href: "/documents" },
    { label: "Report" },
  ]}
/>
```

### Separator Variants

```svelte
<Breadcrumb items={items} separatorVariant="default" />  <!-- chevron -->
<Breadcrumb items={items} separatorVariant="slash" />
<Breadcrumb items={items} separatorVariant="dot" />
<Breadcrumb items={items} separatorVariant="arrow" />
```

### List Variants

```svelte
<Breadcrumb items={items} listVariant="default" />  <!-- muted text -->
<Breadcrumb items={items} listVariant="solid" />    <!-- foreground text -->
<Breadcrumb items={items} listVariant="subtle" />   <!-- dimmed text -->
<Breadcrumb items={items} listVariant="bold" />     <!-- foreground + medium weight -->
```

### Sizes

```svelte
<Breadcrumb items={items} listSize="sm" />
<Breadcrumb items={items} listSize="default" />
<Breadcrumb items={items} listSize="lg" />
```

### Link Variants

```svelte
<Breadcrumb items={items} linkVariant="default" />    <!-- hover to foreground -->
<Breadcrumb items={items} linkVariant="underline" />  <!-- underline on hover -->
<Breadcrumb items={items} linkVariant="bold" />       <!-- medium weight -->
<Breadcrumb items={items} linkVariant="subtle" />     <!-- subtle hover -->
```

### Current Page Variants

```svelte
<Breadcrumb items={items} pageVariant="default" />  <!-- normal foreground -->
<Breadcrumb items={items} pageVariant="bold" />     <!-- semibold -->
<Breadcrumb items={items} pageVariant="muted" />    <!-- muted -->
<Breadcrumb items={items} pageVariant="accent" />   <!-- primary color -->
```

---

## Realistic Examples

### File System Path

```svelte
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Aether UI", href: "/projects/aether-ui" },
    { label: "breadcrumb.svelte" },
  ]}
  listVariant="solid"
  separatorVariant="slash"
  linkVariant="underline"
  pageVariant="bold"
/>
```

### Dashboard Navigation

```svelte
<Breadcrumb
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Payroll", href: "/dashboard/payroll" },
    { label: "March 2026" },
  ]}
  listSize="sm"
  separatorVariant="arrow"
  pageVariant="accent"
/>
```

### Dynamic Items from Router

```svelte
<script lang="ts">
  import { Breadcrumb, type BreadcrumbItemDef } from "aether-ui";
  import { page } from "$app/stores";

  const crumbs = $derived<BreadcrumbItemDef[]>(
    $page.url.pathname
      .split("/")
      .filter(Boolean)
      .map((segment, i, arr) => ({
        label: segment.replace(/-/g, " "),
        href: i < arr.length - 1 ? "/" + arr.slice(0, i + 1).join("/") : undefined,
      }))
  );
</script>

<Breadcrumb items={crumbs} />
```

---

## Compositional API

Use the primitives directly when you need icons, an ellipsis for collapsed items, or a custom link renderer (e.g. SvelteKit `<a>` with `data-sveltekit-preload-data`).

```svelte
<script lang="ts">
  import { BreadcrumbPrimitives } from "aether-ui";
  const { Root, List, Item, Link, Separator, Page, Ellipsis } = BreadcrumbPrimitives;
  import Home from "@lucide/svelte/icons/home";
  import Folder from "@lucide/svelte/icons/folder";
</script>

<!-- With icons -->
<Root>
  <List>
    <Item>
      <Link href="/">
        <Home class="size-4" />
        Home
      </Link>
    </Item>
    <Separator />
    <Item>
      <Link href="/documents">
        <Folder class="size-4" />
        Documents
      </Link>
    </Item>
    <Separator />
    <Item>
      <Page>Report.pdf</Page>
    </Item>
  </List>
</Root>

<!-- With collapsed ellipsis -->
<Root>
  <List>
    <Item><Link href="/">Home</Link></Item>
    <Separator />
    <Item><Ellipsis /></Item>
    <Separator />
    <Item><Link href="/components">Components</Link></Item>
    <Separator />
    <Item><Page>Breadcrumb</Page></Item>
  </List>
</Root>

<!-- Custom link renderer (SvelteKit) -->
<Root>
  <List>
    <Item>
      <Link href="/">
        {#snippet child({ props })}
          <a {...props} data-sveltekit-preload-data>Home</a>
        {/snippet}
      </Link>
    </Item>
    <Separator />
    <Item><Page>Current Page</Page></Item>
  </List>
</Root>
```

### Primitives Reference

| Export | Description |
|--------|-------------|
| `BreadcrumbPrimitives.Root` | Root `<nav aria-label="breadcrumb">` element |
| `BreadcrumbPrimitives.List` | `<ol>` with `listVariant`, `listSize`, `listSpacing` |
| `BreadcrumbPrimitives.Item` | `<li>` wrapper |
| `BreadcrumbPrimitives.Link` | `<a>` with `variant`, supports `child` snippet for custom renderers |
| `BreadcrumbPrimitives.Separator` | `<li>` separator icon — `variant` controls icon style |
| `BreadcrumbPrimitives.Page` | `<span aria-current="page">` for the current page |
| `BreadcrumbPrimitives.Ellipsis` | Collapsed items indicator (…) |

### BreadcrumbList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'solid' \| 'subtle' \| 'bold'` | `'default'` | Text color |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Text size and gap |
| `spacing` | `'compact' \| 'default' \| 'relaxed'` | `'default'` | Item gap |

### BreadcrumbLink Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | Navigation target |
| `variant` | `'default' \| 'underline' \| 'bold' \| 'subtle'` | `'default'` | Hover style |
| `child` | `Snippet<[{ props }]>` | — | Custom link renderer — receives all anchor props |

### BreadcrumbSeparator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'slash' \| 'dot' \| 'arrow'` | `'default'` | Icon style |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Icon size |

### BreadcrumbPage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'bold' \| 'muted' \| 'accent'` | `'default'` | Text style |

---

## Accessibility

- Root renders `<nav aria-label="breadcrumb">` — landmark for screen readers
- Current page renders `<span role="link" aria-disabled="true" aria-current="page">`
- Separators render `<li role="presentation" aria-hidden="true">` — hidden from screen readers
- Ellipsis renders `<span role="presentation" aria-hidden="true">` with `.sr-only` "More" text

---

## Related Components

- **Tabs** — for switching between sibling views at the same level
- **Pagination** — for navigating between pages of content
- **Sidebar** — for persistent hierarchical navigation
