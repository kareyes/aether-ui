# Sheet Component

A sliding panel component (drawer/side sheet) that overlays content from the edges of the viewport, built with Svelte 5 and bits-ui.

## Features

- 🎯 **4 Side Positions**: Top, Bottom, Left, Right
- ✨ **Smooth Animations**: Slide-in/out transitions
- 🎨 **Customizable**: Full control over styling and layout
- ♿ **Fully Accessible**: Keyboard navigation, focus management, ARIA attributes
- 🔒 **Focus Trapping**: Keeps focus within the sheet when open
- 🎭 **Overlay Backdrop**: Semi-transparent overlay with click-to-close
- 🎯 **Type-Safe**: Full TypeScript support with Svelte 5 runes
- 🔄 **Reactive**: Built with Svelte 5's modern reactivity system

## Installation

The Sheet component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Implementation Details

The Sheet component is built on top of bits-ui's Dialog primitive, providing a flexible drawer/panel system.

### Component Architecture

#### Sheet (Root)
- Root component that manages open/close state
- Controls the overall sheet behavior
- Uses bits-ui Dialog primitive

#### SheetTrigger
- Button or element that opens the sheet
- Automatically manages ARIA attributes

#### SheetContent
- Main content container with side positioning
- 4 side variants: `top`, `bottom`, `left`, `right`
- Includes close button by default
- Smooth slide animations based on side

#### SheetOverlay
- Semi-transparent backdrop
- Click to close functionality
- Fade in/out animations

#### SheetHeader
- Optional header section for title and description
- Consistent spacing and typography

#### SheetFooter
- Optional footer section for actions
- Flexbox layout for button groups

#### SheetTitle
- Accessible title for the sheet
- Connected to ARIA label

#### SheetDescription
- Optional description text
- Connected to ARIA description

#### SheetClose
- Close button component
- Can be placed anywhere within the sheet

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    SheetClose
  } from "aether-ui";
  import { Button } from "aether-ui";
</script>

<Sheet>
  <SheetTrigger>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div class="py-4">
      <!-- Your content here -->
    </div>
    <SheetFooter>
      <SheetClose>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
      <Button>Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Controlled State

```svelte
<script lang="ts">
  import { Sheet, SheetContent, SheetTrigger } from "aether-ui";
  import { Button } from "aether-ui";
  
  let open = $state(false);
  
  function handleSubmit() {
    // Do something
    open = false;
  }
</script>

<Sheet bind:open>
  <SheetTrigger>
    <Button>Open</Button>
  </SheetTrigger>
  <SheetContent>
    <form onsubmit={handleSubmit}>
      <!-- Form content -->
    </form>
  </SheetContent>
</Sheet>

<Button onclick={() => open = true}>
  Open from anywhere
</Button>
```

## Side Positions

### Right Side (Default)

```svelte
<SheetContent side="right">
  <!-- Content -->
</SheetContent>
```

### Left Side

```svelte
<SheetContent side="left">
  <!-- Content -->
</SheetContent>
```

### Top Side

```svelte
<SheetContent side="top">
  <!-- Content -->
</SheetContent>
```

### Bottom Side

```svelte
<SheetContent side="bottom">
  <!-- Content -->
</SheetContent>
```

## Advanced Examples

### Form in Sheet

```svelte
<script lang="ts">
  import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose
  } from "aether-ui";
  import { Button } from "aether-ui";
  import { Input } from "aether-ui";
  import { Label } from "aether-ui";
  
  let name = $state("");
  let email = $state("");
  
  function handleSave() {
    console.log({ name, email });
  }
</script>

<Sheet>
  <SheetTrigger>
    <Button>Edit Profile</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
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
    <SheetFooter>
      <SheetClose>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
      <Button onclick={handleSave}>Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Navigation Sheet

```svelte
<script lang="ts">
  import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle
  } from "aether-ui";
  import { Button } from "aether-ui";
  import { Menu } from "@lucide/svelte";
  
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" }
  ];
</script>

<Sheet>
  <SheetTrigger>
    <Button variant="ghost" size="icon">
      <Menu />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    <nav class="flex flex-col gap-4 py-4">
      {#each navItems as item}
        <a href={item.href} class="text-lg font-medium hover:underline">
          {item.label}
        </a>
      {/each}
    </nav>
  </SheetContent>
</Sheet>
```

### Settings Sheet with Tabs

```svelte
<script lang="ts">
  import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
  } from "aether-ui";
  import { Button } from "aether-ui";
  import { TabsPrimitives } from "aether-ui";
  const { Tabs, TabsList, TabsTrigger, TabsContent } = TabsPrimitives;
  import { Settings } from "@lucide/svelte";
</script>

<Sheet>
  <SheetTrigger>
    <Button variant="outline">
      <Settings class="mr-2 size-4" />
      Settings
    </Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>
        Manage your account settings and preferences.
      </SheetDescription>
    </SheetHeader>
    <Tabs value="account" class="py-4">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div class="space-y-4 py-4">
          <p class="text-sm text-muted-foreground">
            Account settings content
          </p>
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div class="space-y-4 py-4">
          <p class="text-sm text-muted-foreground">
            Security settings content
          </p>
        </div>
      </TabsContent>
    </Tabs>
  </SheetContent>
</Sheet>
```

### Notification Sheet (Bottom)

```svelte
<script lang="ts">
  import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle
  } from "aether-ui";
  import { Button } from "aether-ui";
  import { Bell } from "@lucide/svelte";
  
  const notifications = [
    { id: 1, title: "New message", time: "2 min ago" },
    { id: 2, title: "Update available", time: "1 hour ago" },
    { id: 3, title: "Task completed", time: "3 hours ago" }
  ];
</script>

<Sheet>
  <SheetTrigger>
    <Button variant="outline" size="icon">
      <Bell class="size-4" />
    </Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Notifications</SheetTitle>
    </SheetHeader>
    <div class="space-y-4 py-4">
      {#each notifications as notification}
        <div class="flex items-start gap-4 border-b pb-4 last:border-0">
          <div class="flex-1">
            <p class="font-medium">{notification.title}</p>
            <p class="text-sm text-muted-foreground">{notification.time}</p>
          </div>
        </div>
      {/each}
    </div>
  </SheetContent>
</Sheet>
```

### Without Close Button

```svelte
<SheetContent hideClose>
  <SheetHeader>
    <SheetTitle>Important Action</SheetTitle>
    <SheetDescription>
      This requires your attention.
    </SheetDescription>
  </SheetHeader>
  <div class="py-4">
    <!-- Content -->
  </div>
  <SheetFooter>
    <SheetClose>
      <Button>Confirm</Button>
    </SheetClose>
  </SheetFooter>
</SheetContent>
```

### Custom Width/Height

```svelte
<!-- Custom width for side sheets -->
<SheetContent side="right" class="w-[400px] sm:w-[540px]">
  <!-- Content -->
</SheetContent>

<!-- Custom height for top/bottom sheets -->
<SheetContent side="bottom" class="h-[400px]">
  <!-- Content -->
</SheetContent>
```

## API Reference

### Sheet (Root)

Root component that manages the sheet state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls the open state (bindable) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `openFocus` | `FocusProp` | - | Element to focus when opening |
| `closeFocus` | `FocusProp` | - | Element to focus when closing |
| `portal` | `HTMLElement \| string` | `body` | Portal target for the sheet |

### SheetTrigger

Button that opens the sheet.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `HTMLButtonElement` | - | Button element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Trigger content |

### SheetContent

Main content container for the sheet.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"right"` | Position of the sheet |
| `ref` | `HTMLDivElement` | - | Content element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `hideClose` | `boolean` | `false` | Hide the close button |
| `portalProps` | `object` | - | Props for the portal component |
| `children` | `Snippet` | - | Content to display |

### SheetOverlay

Semi-transparent backdrop behind the sheet.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `HTMLDivElement` | - | Overlay element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |

### SheetHeader

Container for the sheet header (title and description).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Header content |

### SheetFooter

Container for the sheet footer (action buttons).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Footer content |

### SheetTitle

Accessible title for the sheet.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `HTMLHeadingElement` | - | Title element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `level` | `number` | `2` | Heading level (1-6) |
| `children` | `Snippet` | - | Title text |

### SheetDescription

Description text for the sheet.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `HTMLParagraphElement` | - | Description element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Description text |

### SheetClose

Button to close the sheet.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `HTMLButtonElement` | - | Button element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Button content |

## Accessibility

The Sheet component follows WAI-ARIA dialog pattern:

- **Keyboard Navigation**:
  - `Escape` - Close the sheet
  - `Tab` - Move focus forward within sheet
  - `Shift + Tab` - Move focus backward within sheet
  
- **Focus Management**:
  - Focus is trapped within the sheet when open
  - First focusable element receives focus when opened
  - Focus returns to trigger element when closed
  
- **ARIA Attributes**:
  - `role="dialog"` on sheet content
  - `aria-labelledby` connects to SheetTitle
  - `aria-describedby` connects to SheetDescription
  - `aria-modal="true"` indicates modal behavior

- **Screen Readers**:
  - Sheet opening/closing is announced
  - All interactive elements are accessible
  - Proper semantic HTML structure

## Best Practices

1. **Always include a title** - Use SheetTitle for accessibility
2. **Provide descriptions** - Use SheetDescription to explain the sheet's purpose
3. **Keep content focused** - Sheets should have a single, clear purpose
4. **Use appropriate side** - Right/Left for forms, Bottom for mobile notifications
5. **Manage state carefully** - Use controlled state for complex interactions
6. **Avoid nesting** - Don't open sheets within sheets
7. **Mobile considerations** - Test all sides on mobile devices
8. **Close actions** - Provide clear ways to close (SheetClose, footer buttons)

## Common Use Cases

- **Navigation drawer** - Mobile menu (left side)
- **Form panels** - Edit/create forms (right side)
- **Details panel** - Show additional information (right side)
- **Notifications** - Quick view of alerts (bottom side)
- **Filters** - Advanced search/filter options (left/right side)
- **Settings** - Application configuration (right side)
- **Shopping cart** - E-commerce cart view (right side)

## Demo & Storybook

- **Demo Page**: `/sheet-demo` - Comprehensive examples and use cases
- **Storybook**: `Components/Sheet` - Interactive component playground

## Technical Implementation

### Variant System

The SheetContent component uses tailwind-variants for the side positioning system:

```typescript
export const sheetVariants = tv({
  base: "bg-background fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out",
  variants: {
    side: {
      top: "inset-x-0 top-0 h-auto border-b",
      bottom: "inset-x-0 bottom-0 h-auto border-t",
      left: "inset-y-0 start-0 h-full w-3/4 border-e sm:max-w-sm",
      right: "inset-y-0 end-0 h-full w-3/4 border-s sm:max-w-sm"
    }
  },
  defaultVariants: {
    side: "right"
  }
});
```

### Animation System

Animations are handled through Tailwind's data-attribute animation utilities:
- Slide animations based on side direction
- Smooth transitions with easing
- Configurable duration (300ms close, 500ms open)

## Changelog

### v1.0.0
- Initial implementation with bits-ui Dialog primitive
- 4 side positions (top, bottom, left, right)
- Smooth slide animations
- Full accessibility support
- Comprehensive documentation and examples
