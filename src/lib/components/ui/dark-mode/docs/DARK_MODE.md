# Dark Mode Component

A comprehensive dark mode switcher component suite with multiple variants, sizes, and styles. Built with ModeWatcher for seamless theme management.

## Features

- **3 Component Variants**: Toggle button, Switch, and Dropdown selector
- **Multiple Visual Styles**: default, outline, ghost, flat, minimal
- **Size Options**: sm, default, lg, xl
- **Shape Options**: square, rounded, circle (for Toggle)
- **Animation Options**: rotate, scale, fade, none
- **System Theme Support**: Light, Dark, and System preference modes
- **Accessible**: Full keyboard navigation and ARIA support
- **Type-Safe**: Complete TypeScript definitions

## Installation

The Dark Mode component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

**Note**: The package includes `mode-watcher` as a dependency, which handles the actual theme switching logic.

### Setup ModeWatcher

Wrap your app with the `ModeWatcher` component in your root layout:

```svelte
<script>
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<slot />
```

## Components

### DarkModeToggle

A simple button that toggles between light and dark modes.

```svelte
<script>
  import { DarkModeToggle } from "aether-ui";
</script>

<DarkModeToggle />
```

### DarkModeSwitch

A switch-style toggle with sun/moon icons.

```svelte
<script>
  import { DarkModeSwitch } from "aether-ui";
</script>

<DarkModeSwitch />
```

### DarkModeDropdown

A dropdown menu with light, dark, and system options.

```svelte
<script>
  import { DarkModeDropdown } from "aether-ui";
</script>

<DarkModeDropdown />
```

## DarkModeToggle

### Variants

```svelte
<script>
  import { DarkModeToggle } from "aether-ui";
</script>

<!-- Default -->
<DarkModeToggle variant="default" />

<!-- Outline -->
<DarkModeToggle variant="outline" />

<!-- Ghost -->
<DarkModeToggle variant="ghost" />

<!-- Flat -->
<DarkModeToggle variant="flat" />

<!-- Minimal -->
<DarkModeToggle variant="minimal" />
```

### Sizes

```svelte
<DarkModeToggle size="sm" />
<DarkModeToggle size="default" />
<DarkModeToggle size="lg" />
<DarkModeToggle size="xl" />
```

### Shapes

```svelte
<DarkModeToggle shape="square" />
<DarkModeToggle shape="rounded" />
<DarkModeToggle shape="circle" />
```

### Animations

```svelte
<!-- Rotate animation (default) -->
<DarkModeToggle animation="rotate" />

<!-- Scale animation -->
<DarkModeToggle animation="scale" />

<!-- Fade animation -->
<DarkModeToggle animation="fade" />

<!-- No animation -->
<DarkModeToggle animation="none" />
```

### With Tooltip

```svelte
<DarkModeToggle
  showTooltip
  lightModeTooltip="Enable dark mode"
  darkModeTooltip="Enable light mode"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline" \| "ghost" \| "flat" \| "minimal"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg" \| "xl"` | `"default"` | Size of the toggle |
| `shape` | `"square" \| "rounded" \| "circle"` | `"square"` | Shape of the toggle |
| `animation` | `"rotate" \| "scale" \| "fade" \| "none"` | `"rotate"` | Icon animation style |
| `showTooltip` | `boolean` | `false` | Show tooltip on hover |
| `lightModeTooltip` | `string` | `"Switch to dark mode"` | Tooltip text in light mode |
| `darkModeTooltip` | `string` | `"Switch to light mode"` | Tooltip text in dark mode |
| `disabled` | `boolean` | `false` | Disable the toggle |
| `class` | `string` | - | Additional CSS classes |

## DarkModeSwitch

### Variants

```svelte
<script>
  import { DarkModeSwitch } from "aether-ui";
</script>

<!-- Default -->
<DarkModeSwitch variant="default" />

<!-- Primary -->
<DarkModeSwitch variant="primary" />

<!-- Accent -->
<DarkModeSwitch variant="accent" />

<!-- Contrast -->
<DarkModeSwitch variant="contrast" />
```

### Sizes

```svelte
<DarkModeSwitch size="sm" />
<DarkModeSwitch size="default" />
<DarkModeSwitch size="lg" />
```

### Without Icons

```svelte
<DarkModeSwitch showIcons={false} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "primary" \| "accent" \| "contrast"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the switch |
| `showIcons` | `boolean` | `true` | Show sun/moon icons inside the switch |
| `disabled` | `boolean` | `false` | Disable the switch |
| `class` | `string` | - | Additional CSS classes |

## DarkModeDropdown

### Variants

```svelte
<script>
  import { DarkModeDropdown } from "aether-ui";
</script>

<!-- Default -->
<DarkModeDropdown variant="default" />

<!-- Outline -->
<DarkModeDropdown variant="outline" />

<!-- Ghost -->
<DarkModeDropdown variant="ghost" />
```

### Sizes

```svelte
<DarkModeDropdown size="sm" />
<DarkModeDropdown size="default" />
<DarkModeDropdown size="lg" />
```

### With Label

```svelte
<DarkModeDropdown showLabel />
```

### Custom Labels

```svelte
<DarkModeDropdown
  showLabel
  labels={{
    light: "Light Mode",
    dark: "Dark Mode",
    system: "Auto"
  }}
/>
```

### Positioning

```svelte
<!-- Align to start -->
<DarkModeDropdown align="start" />

<!-- Align to center -->
<DarkModeDropdown align="center" />

<!-- Align to end (default) -->
<DarkModeDropdown align="end" />

<!-- Show on top -->
<DarkModeDropdown side="top" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline" \| "ghost"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the trigger |
| `showLabel` | `boolean` | `false` | Show current mode label |
| `labels` | `{ light?: string; dark?: string; system?: string }` | `{ light: "Light", dark: "Dark", system: "System" }` | Custom labels |
| `align` | `"start" \| "center" \| "end"` | `"end"` | Dropdown alignment |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Dropdown position |
| `class` | `string` | - | Additional CSS classes |

## Programmatic Control

You can control the theme programmatically using the exported utilities:

```svelte
<script>
  import { mode, setMode, toggleMode, resetMode } from "aether-ui";

  function handleSetLight() {
    setMode("light");
  }

  function handleSetDark() {
    setMode("dark");
  }

  function handleSetSystem() {
    setMode("system");
  }

  function handleToggle() {
    toggleMode();
  }

  function handleReset() {
    resetMode(); // Resets to system preference
  }
</script>

<p>Current mode: {$mode}</p>

<button onclick={handleSetLight}>Light</button>
<button onclick={handleSetDark}>Dark</button>
<button onclick={handleSetSystem}>System</button>
<button onclick={handleToggle}>Toggle</button>
<button onclick={handleReset}>Reset</button>
```

## Using Primitives

For more control, use the primitives namespace:

```svelte
<script>
  import { DarkModePrimitives } from "aether-ui";
</script>

<DarkModePrimitives.Toggle variant="ghost" size="lg" />
<DarkModePrimitives.Switch variant="primary" />
<DarkModePrimitives.Dropdown showLabel />
```

## Examples

### Header with Theme Toggle

```svelte
<script>
  import { DarkModeToggle } from "aether-ui";
</script>

<header class="flex items-center justify-between p-4 border-b">
  <h1 class="text-xl font-bold">My App</h1>
  <DarkModeToggle variant="ghost" shape="circle" />
</header>
```

### Settings Page

```svelte
<script>
  import { DarkModeDropdown, FieldPrimitives } from "aether-ui";
</script>

<FieldPrimitives.Field
  label="Theme"
  description="Choose your preferred color scheme"
  orientation="horizontal"
>
  <DarkModeDropdown showLabel />
</FieldPrimitives.Field>
```

### Sidebar Theme Switch

```svelte
<script>
  import { DarkModeSwitch } from "aether-ui";
</script>

<div class="flex items-center justify-between p-4">
  <span class="text-sm">Dark Mode</span>
  <DarkModeSwitch size="sm" />
</div>
```

### Combined Variants Showcase

```svelte
<script>
  import { DarkModeToggle, DarkModeSwitch, DarkModeDropdown } from "aether-ui";
</script>

<div class="flex items-center gap-4">
  <!-- Simple toggle -->
  <DarkModeToggle variant="outline" shape="circle" />

  <!-- Visual switch -->
  <DarkModeSwitch variant="primary" size="sm" />

  <!-- Full control dropdown -->
  <DarkModeDropdown variant="ghost" showLabel />
</div>
```

## Accessibility

All dark mode components include:

- **ARIA Labels**: Proper `aria-label` attributes for screen readers
- **Role Attributes**: Correct roles (`button`, `switch`) for assistive technologies
- **Keyboard Support**: Full keyboard navigation and activation
- **Focus States**: Visible focus indicators for keyboard users
- **State Announcements**: Screen readers announce the current theme state

## Styling

### CSS Variables

The components use your theme's CSS variables:

- `--primary` - Primary color for active states
- `--secondary` - Secondary backgrounds
- `--accent` - Accent color for hover states
- `--muted` - Muted backgrounds
- `--ring` - Focus ring color

### Custom Styling

Override styles with the `class` prop:

```svelte
<DarkModeToggle
  class="bg-blue-500 hover:bg-blue-600 text-white"
/>
```

## TypeScript

All types are exported for TypeScript users:

```typescript
import type {
  ThemeMode,
  DarkModeToggleProps,
  DarkModeSwitchProps,
  DarkModeDropdownProps,
  DarkModeToggleVariant,
  DarkModeToggleSize,
  DarkModeToggleShape,
  DarkModeSwitchVariant,
  DarkModeSwitchSize,
  DarkModeDropdownVariant,
  DarkModeDropdownSize,
} from "aether-ui";
```

## Related

- [ModeWatcher Documentation](https://mode-watcher.svecosystem.com/)
- [Switch Component](../switch/docs/SWITCH.md) - For general toggle switches
- [Button Component](../button/docs/BUTTON.md) - For button styling patterns
- [Dropdown Menu Component](../dropdown-menu/docs/DROPDOWN_MENU_SIMPLE.md) - For dropdown patterns
