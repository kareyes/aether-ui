# Dropdown Menu Simple Component

A simplified dropdown menu component that wraps all the complexity of the standard dropdown menu into a single, easy-to-use component with a declarative API.

## Features

- **Simple API**: Define menus with a simple array of items
- **Multiple Item Types**: Regular items, separators, labels, checkboxes, radio groups
- **Groups**: Organize items into labeled groups
- **Icons & Shortcuts**: Add icons and keyboard shortcuts to items
- **Variants**: Support for different trigger button variants and sizes
- **Reactive**: Works with Svelte's reactive state
- **Flexible**: Fallback to custom trigger snippet when needed

## Installation

The DropdownMenu component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Basic Usage

```svelte
<script lang="ts">
  import { DropdownMenu } from "aether-ui";
  import User from "@lucide/svelte/icons/user";
  import Settings from "@lucide/svelte/icons/settings";
  import LogOut from "@lucide/svelte/icons/log-out";

  const items = [
    { label: "Profile", icon: User, onSelect: () => console.log("Profile") },
    { label: "Settings", icon: Settings, onSelect: () => console.log("Settings") },
    { type: "separator" },
    { label: "Logout", icon: LogOut, variant: "destructive", onSelect: () => console.log("Logout") },
  ];
</script>

<DropdownMenu
  triggerText="User Menu"
  {items}
/>
```

## Item Types

### Regular Item

```svelte
{
  label: "Profile",
  icon: User,
  shortcut: "⌘P",
  variant: "default", // or "destructive"
  disabled: false,
  onSelect: () => console.log("Selected")
}
```

### Separator

```svelte
{ type: "separator" }
```

### Label

```svelte
{ type: "label", label: "Section Title" }
```

### Checkbox Item

```svelte
{
  type: "checkbox",
  label: "Show Toolbar",
  checked: true,
  onSelect: () => { checked = !checked }
}
```

### Radio Group

```svelte
{
  type: "radio",
  label: "Theme",
  value: "light",
  items: [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" }
  ],
  onValueChange: (value) => { theme = value }
}
```

## Grouped Items

```svelte
const items = [
  {
    label: "Account",
    items: [
      { label: "Profile", icon: User },
      { label: "Settings", icon: Settings }
    ]
  },
  { type: "separator" },
  {
    items: [
      { label: "Logout", icon: LogOut, variant: "destructive" }
    ]
  }
];
```

## Examples

### With Shortcuts

```svelte
<DropdownMenu
  triggerText="File"
  items={[
    { label: "New", icon: Plus, shortcut: "⌘N", onSelect: () => {} },
    { label: "Open", icon: FolderOpen, shortcut: "⌘O", onSelect: () => {} },
    { type: "separator" },
    { label: "Save", icon: Save, shortcut: "⌘S", onSelect: () => {} }
  ]}
/>
```

### Interactive Checkboxes

```svelte
<script>
  let showToolbar = $state(true);
  let showSidebar = $state(false);

  $: items = [
    { type: "label", label: "View Options" },
    { 
      type: "checkbox", 
      label: "Show Toolbar", 
      checked: showToolbar,
      onSelect: () => showToolbar = !showToolbar
    },
    { 
      type: "checkbox", 
      label: "Show Sidebar", 
      checked: showSidebar,
      onSelect: () => showSidebar = !showSidebar
    }
  ];
</script>

<DropdownMenu triggerText="View" {items} />
```

### Radio Group for Theme

```svelte
<script>
  let theme = $state("light");

  $: items = [
    {
      type: "radio",
      label: "Select Theme",
      value: theme,
      items: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "System", value: "system" }
      ],
      onValueChange: (value) => { theme = value }
    }
  ];
</script>

<DropdownMenu triggerText={`Theme: ${theme}`} {items} />
```

### Complex Menu

```svelte
<script>
  let theme = $state("light");
  let showToolbar = $state(true);

  $: items = [
    {
      label: "Account",
      items: [
        { label: "Profile", icon: User, shortcut: "⌘P" },
        { label: "Settings", icon: Settings, shortcut: "⌘," }
      ]
    },
    { type: "separator" },
    {
      type: "radio",
      label: "Theme",
      value: theme,
      items: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" }
      ],
      onValueChange: (v) => theme = v
    },
    { type: "separator" },
    {
      label: "View",
      items: [
        { 
          type: "checkbox", 
          label: "Toolbar", 
          checked: showToolbar,
          onSelect: () => showToolbar = !showToolbar
        }
      ]
    },
    { type: "separator" },
    {
      items: [
        { label: "Logout", icon: LogOut, variant: "destructive" }
      ]
    }
  ];
</script>

<DropdownMenu triggerText="Account" {items} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `triggerText` | `string` | `"Open"` | Text for the trigger button |
| `triggerVariant` | `ButtonVariant` | `"outline"` | Variant of the trigger button |
| `triggerSize` | `ButtonSize` | `"default"` | Size of the trigger button |
| `triggerIcon` | `Component` | `undefined` | Icon component for trigger |
| `triggerClass` | `string` | `undefined` | Additional classes for trigger |
| `showChevron` | `boolean` | `true` | Show chevron icon in trigger |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Content alignment |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Content side |
| `sideOffset` | `number` | `4` | Offset from trigger |
| `contentClass` | `string` | `undefined` | Additional classes for content |
| `items` | `Array<DropdownItem \| DropdownGroup>` | `[]` | Menu items |
| `trigger` | `Snippet` | `undefined` | Custom trigger snippet |
| `open` | `boolean` | `false` | Bindable open state |

## Item Structure

### DropdownItem
```typescript
{
  type?: "item" | "separator" | "label" | "checkbox";
  label?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  shortcut?: string;
  variant?: "default" | "destructive";
  icon?: Component;
}
```

### DropdownGroup
```typescript
{
  label?: string;
  items: DropdownItem[];
  type?: "radio";
  value?: string;
  onValueChange?: (value: string) => void;
}
```

## Comparison with Standard Dropdown

### Before (Standard)

```svelte
<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="outline">Open</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>
      <User class="size-4" />
      Profile
    </DropdownMenu.Item>
    <DropdownMenu.Item>
      <Settings class="size-4" />
      Settings
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
      <LogOut class="size-4" />
      Logout
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### After (Simplified)

```svelte
<DropdownMenu
  triggerText="Open"
  items={[
    { label: "Profile", icon: User },
    { label: "Settings", icon: Settings },
    { type: "separator" },
    { label: "Logout", icon: LogOut }
  ]}
/>
```

## Notes

- The simplified component is great for common use cases
- For complex nested submenus, use the standard dropdown menu components
- All items are reactive - use `$:` or `$derived` to update items based on state
- The `onSelect` callback is called when an item is clicked
- Checkbox and radio items manage their own state - update external state in `onSelect` or `onValueChange`
