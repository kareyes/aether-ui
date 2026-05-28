# ButtonGroup Component

A flexible button group component that allows you to group related buttons together with consistent styling and spacing. Supports different variants and orientations for various UI patterns.

## Features

- **Variants**: Multiple visual styles (bg, ghost)
- **Orientations**: Horizontal and vertical layouts
- **Text Labels**: Built-in support for group labels
- **Separators**: Visual separators between button groups
- **Accessibility**: Full keyboard navigation and screen reader support
- **TypeScript**: Complete type safety with exported types

## Installation

The ButtonGroup component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Button Group

```svelte
<script>
  import { ButtonGroup, Button } from "aether-ui";
</script>

<ButtonGroup variant="bg">
  <Button variant="outline">First</Button>
  <Button variant="outline">Second</Button>
  <Button variant="outline">Third</Button>
</ButtonGroup>
```

### With Text Labels

```svelte
<script>
  import { ButtonGroup, ButtonGroupText, Button } from "aether-ui";
</script>

<ButtonGroup variant="bg">
  <ButtonGroupText variant="bg">Actions</ButtonGroupText>
  <Button variant="outline">Save</Button>
  <Button variant="outline">Delete</Button>
  <Button variant="outline">Cancel</Button>
</ButtonGroup>
```

### With Separators

```svelte
<script>
  import { ButtonGroup, ButtonGroupSeparator, Button } from "aether-ui";
</script>

<ButtonGroup variant="bg">
  <Button variant="outline">File</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Edit</Button>
  <Button variant="outline">View</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Help</Button>
</ButtonGroup>
```

### Vertical Orientation

```svelte
<ButtonGroup orientation="vertical" variant="bg">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>
```

### Ghost Variant

```svelte
<ButtonGroup variant="ghost">
  <ButtonGroupText variant="ghost">Tools</ButtonGroupText>
  <Button variant="ghost">Settings</Button>
  <Button variant="ghost">Help</Button>
</ButtonGroup>
```

## Components

### ButtonGroup

The main container component that groups buttons together.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"bg" \| "ghost"` | `"bg"` | Visual variant of the button group |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout orientation |
| `class` | `string` | `undefined` | Additional CSS classes |

#### Data Attributes

- `data-slot="button-group"` - Identifies the button group container
- `data-orientation` - Current orientation value
- `data-variant` - Current variant value

### ButtonGroupText

A text label component that adapts its styling based on the group variant.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"bg" \| "ghost"` | `"bg"` | Visual variant matching the button group |
| `class` | `string` | `undefined` | Additional CSS classes |
| `child` | `Snippet` | `undefined` | Custom render function |

### ButtonGroupSeparator

A visual separator component for dividing button groups.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Separator orientation |
| `class` | `string` | `undefined` | Additional CSS classes |

## Variants

### Background (`bg`)
- Default variant with background styling for text elements
- Provides clear visual grouping with borders and shadows
- Best for prominent toolbars and action groups

### Ghost (`ghost`)
- Minimal variant with transparent background for text elements
- Subtle styling for secondary or inline actions
- Good for compact interfaces and sidebar navigation

## Examples

### Toolbar Example

```svelte
<ButtonGroup variant="bg">
  <ButtonGroupText variant="bg">Format</ButtonGroupText>
  <Button variant="outline" size="sm">Bold</Button>
  <Button variant="outline" size="sm">Italic</Button>
  <ButtonGroupSeparator />
  <Button variant="outline" size="sm">Left</Button>
  <Button variant="outline" size="sm">Center</Button>
  <Button variant="outline" size="sm">Right</Button>
</ButtonGroup>
```

### Navigation Menu

```svelte
<ButtonGroup orientation="vertical" variant="ghost">
  <ButtonGroupText variant="ghost">Navigation</ButtonGroupText>
  <Button variant="ghost">Dashboard</Button>
  <Button variant="ghost">Projects</Button>
  <Button variant="ghost">Settings</Button>
</ButtonGroup>
```

### Mixed Button Variants

```svelte
<ButtonGroup variant="bg">
  <Button variant="default">Primary</Button>
  <Button variant="outline">Secondary</Button>
  <Button variant="ghost">Tertiary</Button>
</ButtonGroup>
```

## Styling

The component uses Tailwind CSS and tailwind-variants for styling. You can customize the appearance by:

1. **CSS Variables**: Modify design tokens in your CSS
2. **Class Overrides**: Pass custom classes via the `class` prop
3. **Variant Customization**: Extend the `buttonGroupVariants` configuration

### CSS Variables

```css
:root {
  --border-input: /* border color for separators */
  --background-muted: /* background for bg variant text */
  --shadow-xs: /* shadow for bg variant text */
}
```

## Accessibility

- **Keyboard Navigation**: Full keyboard support for all grouped elements
- **Screen Readers**: Proper ARIA roles and labels
- **Focus Management**: Visual focus indicators and logical tab order
- **Semantic HTML**: Uses appropriate HTML elements and structure

### ARIA Attributes

- `role="group"` - Applied to the button group container
- Proper labeling for screen readers
- Focus management between grouped elements

## TypeScript

```typescript
import type {
  ButtonGroupVariant,
  ButtonGroupOrientation
} from "aether-ui";

// Variant type
type Variant = ButtonGroupVariant; // "bg" | "ghost"

// Orientation type  
type Orientation = ButtonGroupOrientation; // "horizontal" | "vertical"
```

## Best Practices

1. **Group Related Actions**: Only group buttons that are logically related
2. **Consistent Variants**: Use the same variant for all elements in a group
3. **Appropriate Orientation**: Use vertical for navigation, horizontal for actions
4. **Text Labels**: Provide context with ButtonGroupText when needed
5. **Separators**: Use separators to create logical sections within groups
6. **Accessibility**: Always provide proper labels and keyboard navigation

## Common Patterns

### File Menu
```svelte
<ButtonGroup variant="bg">
  <ButtonGroupText variant="bg">File</ButtonGroupText>
  <Button variant="outline">New</Button>
  <Button variant="outline">Open</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Save</Button>
</ButtonGroup>
```

### Status Bar
```svelte
<ButtonGroup variant="ghost">
  <ButtonGroupText variant="ghost">Status: Online</ButtonGroupText>
  <Button variant="ghost" size="sm">Settings</Button>
</ButtonGroup>
```

### Media Controls
```svelte
<ButtonGroup variant="bg">
  <Button variant="outline">⏮️</Button>
  <Button variant="outline">⏯️</Button>
  <Button variant="outline">⏭️</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">🔊</Button>
</ButtonGroup>
```