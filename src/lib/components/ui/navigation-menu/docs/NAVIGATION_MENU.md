# Navigation Menu

A collection of links for navigating websites, with support for dropdowns, icons, and responsive layouts. Built on top of [bits-ui](https://bits-ui.com) NavigationMenu primitives.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Props Reference](#props-reference)
- [Styling](#styling)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Navigation Menu component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import * as NavigationMenu from "aether-ui";
</script>

<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Getting Started</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul class="grid w-[400px] gap-3 p-4">
          <li>
            <NavigationMenu.Link href="/docs">Introduction</NavigationMenu.Link>
          </li>
          <li>
            <NavigationMenu.Link href="/docs/installation">Installation</NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

### With Primitives Import

```svelte
<script lang="ts">
  import { NavigationMenuPrimitives } from "aether-ui";
</script>

<NavigationMenuPrimitives.Root>
  <NavigationMenuPrimitives.List>
    <!-- ... -->
  </NavigationMenuPrimitives.List>
</NavigationMenuPrimitives.Root>
```

## Components

| Component | Description |
|-----------|-------------|
| `Root` | The root container that manages state and context for the navigation menu |
| `List` | Container for navigation items, rendered as a `<ul>` element |
| `Item` | Individual navigation item wrapper, rendered as a `<li>` element |
| `Trigger` | Button that opens/closes the dropdown content with chevron indicator |
| `Content` | Container for dropdown content with animation support |
| `Link` | Navigation link element with hover and focus states |
| `Viewport` | Shared container for dropdown content (provides consistent sizing) |
| `Indicator` | Visual indicator showing the active navigation item |

## Props Reference

### Root

The root component that wraps the entire navigation menu.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `viewport` | `boolean` | `true` | Whether to render the shared viewport container |
| `value` | `string` | `""` | The value of the currently active menu item |
| `onValueChange` | `(value: string) => void` | - | Callback when the active value changes |
| `delayDuration` | `number` | `200` | Delay before opening a submenu (ms) |
| `skipDelayDuration` | `number` | `300` | Time to skip delay when moving between items (ms) |
| `dir` | `"ltr" \| "rtl"` | `"ltr"` | Reading direction |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Orientation of the navigation menu |
| `class` | `string` | - | Additional CSS classes |

### List

Container for navigation items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

### Item

Individual navigation item wrapper.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Unique value for this item |
| `class` | `string` | - | Additional CSS classes |

### Trigger

Button that toggles the dropdown content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Whether the trigger is disabled |
| `class` | `string` | - | Additional CSS classes |

### Content

Container for dropdown content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `forceMount` | `boolean` | `false` | Force mount the content |
| `class` | `string` | - | Additional CSS classes |

### Link

Navigation link element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | The URL the link points to |
| `active` | `boolean` | `false` | Whether the link is currently active |
| `onSelect` | `() => void` | - | Callback when link is selected |
| `class` | `string` | - | Additional CSS classes |

### Viewport

Shared container for dropdown content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `forceMount` | `boolean` | `false` | Force mount the viewport |
| `class` | `string` | - | Additional CSS classes |

### Indicator

Visual indicator for the active item.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `forceMount` | `boolean` | `false` | Force mount the indicator |
| `class` | `string` | - | Additional CSS classes |

## Styling

### Using navigationMenuTriggerStyle

For consistent styling when using plain links (without dropdowns), import and use `navigationMenuTriggerStyle`:

```svelte
<script lang="ts">
  import * as NavigationMenu from "aether-ui";
  import { navigationMenuTriggerStyle } from "aether-ui/components/ui/navigation-menu";
</script>

<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link>
        {#snippet child()}
          <a href="/docs" class={navigationMenuTriggerStyle()}>Documentation</a>
        {/snippet}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

### CSS Variables

The component uses the following CSS variables for sizing:

- `--bits-navigation-menu-viewport-width`: Width of the viewport
- `--bits-navigation-menu-viewport-height`: Height of the viewport

### Custom Styling

You can customize the appearance using Tailwind classes:

```svelte
<NavigationMenu.Root class="bg-card rounded-lg shadow-lg">
  <NavigationMenu.List class="gap-2 px-4">
    <!-- Items -->
  </NavigationMenu.List>
</NavigationMenu.Root>
```

## Examples

### Simple Navigation

A basic navigation with links only (no dropdowns):

```svelte
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link>
        {#snippet child()}
          <a href="/" class={navigationMenuTriggerStyle()}>Home</a>
        {/snippet}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link>
        {#snippet child()}
          <a href="/about" class={navigationMenuTriggerStyle()}>About</a>
        {/snippet}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link>
        {#snippet child()}
          <a href="/contact" class={navigationMenuTriggerStyle()}>Contact</a>
        {/snippet}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

### With Dropdown Menus

Navigation with dropdown content:

```svelte
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul class="grid w-[300px] gap-2 p-4">
          <li>
            <NavigationMenu.Link href="/products/software">
              <div class="font-medium">Software</div>
              <div class="text-muted-foreground text-sm">
                Our software solutions
              </div>
            </NavigationMenu.Link>
          </li>
          <li>
            <NavigationMenu.Link href="/products/hardware">
              <div class="font-medium">Hardware</div>
              <div class="text-muted-foreground text-sm">
                Physical products and devices
              </div>
            </NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

### With Icons

Navigation items with icons:

```svelte
<script lang="ts">
  import HomeIcon from "@lucide/svelte/icons/home";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import UserIcon from "@lucide/svelte/icons/user";
</script>

<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>
        <HomeIcon class="size-4 mr-2" />
        Menu
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul class="grid w-[200px] gap-1 p-2">
          <li>
            <NavigationMenu.Link href="/settings" class="flex-row items-center gap-2">
              <SettingsIcon class="size-4" />
              Settings
            </NavigationMenu.Link>
          </li>
          <li>
            <NavigationMenu.Link href="/profile" class="flex-row items-center gap-2">
              <UserIcon class="size-4" />
              Profile
            </NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

### Multi-Column Layout

For complex navigation with multiple columns:

```svelte
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul class="grid w-[600px] gap-3 p-4 md:grid-cols-2">
          {#each components as component}
            <li>
              <NavigationMenu.Link href={component.href}>
                <div class="font-medium">{component.title}</div>
                <div class="text-muted-foreground text-sm">
                  {component.description}
                </div>
              </NavigationMenu.Link>
            </li>
          {/each}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

### Featured Item Layout

Navigation with a featured/hero item:

```svelte
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Getting Started</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul class="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <!-- Featured item spanning multiple rows -->
          <li class="row-span-3">
            <NavigationMenu.Link
              class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-none select-none focus:shadow-md"
            >
              {#snippet child({ props })}
                <a {...props} href="/">
                  <div class="mt-4 mb-2 text-lg font-medium">Aether UI</div>
                  <p class="text-muted-foreground text-sm leading-tight">
                    Beautifully designed components built with Tailwind CSS.
                  </p>
                </a>
              {/snippet}
            </NavigationMenu.Link>
          </li>
          <!-- Regular items -->
          <li>
            <NavigationMenu.Link href="/docs">
              <div class="font-medium">Introduction</div>
              <div class="text-muted-foreground text-sm">
                Learn about Aether UI components.
              </div>
            </NavigationMenu.Link>
          </li>
          <li>
            <NavigationMenu.Link href="/docs/installation">
              <div class="font-medium">Installation</div>
              <div class="text-muted-foreground text-sm">
                Get started in minutes.
              </div>
            </NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

### Without Viewport

Disable the shared viewport for independent dropdown positioning:

```svelte
<NavigationMenu.Root viewport={false}>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Menu 1</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <!-- Content appears directly below trigger -->
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Menu 2</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <!-- Content appears directly below this trigger -->
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

## Accessibility

The Navigation Menu component follows the [WAI-ARIA Navigation Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) and includes:

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next focusable element |
| `Shift + Tab` | Move focus to the previous focusable element |
| `Enter` / `Space` | Open/close submenu or activate link |
| `Arrow Down` | Open submenu (horizontal) or move to next item (vertical) |
| `Arrow Up` | Move to previous item (vertical) |
| `Arrow Right` | Move to next item (horizontal) |
| `Arrow Left` | Move to previous item (horizontal) |
| `Escape` | Close the open submenu |
| `Home` | Move focus to first item |
| `End` | Move focus to last item |

### ARIA Attributes

- `role="navigation"` on the root element
- `role="menubar"` on the list element
- `role="menuitem"` on items with submenus
- `aria-expanded` indicates submenu state
- `aria-haspopup="menu"` on triggers
- Proper focus management for screen readers

### Best Practices

1. **Provide clear labels**: Use descriptive text for navigation items
2. **Keep menus focused**: Limit dropdown content to related items
3. **Consider mobile**: Use responsive layouts for smaller screens
4. **Test with screen readers**: Ensure announcements are clear and helpful
