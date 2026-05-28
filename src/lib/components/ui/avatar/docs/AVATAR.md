# Avatar

An enhanced avatar component for displaying user profile images with support for fallbacks, variants, colors, shapes, and grouping.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Avatar component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { Avatar } from "aether-ui";
</script>

<Avatar
  src="https://github.com/shadcn.png"
  alt="User"
  fallback="CN"
/>
```

### With Primitives Import

```svelte
<script lang="ts">
  import { AvatarPrimitives } from "aether-ui";
</script>

<AvatarPrimitives.Root>
  <AvatarPrimitives.Image src="https://github.com/shadcn.png" alt="User" />
  <AvatarPrimitives.Fallback>CN</AvatarPrimitives.Fallback>
</AvatarPrimitives.Root>
```

## Components

| Component | Description |
|-----------|-------------|
| `Avatar` | Enhanced wrapper with variants and colors |
| `AvatarGroup` | Container for overlapping avatar displays |
| `Root` | Base avatar container |
| `Image` | Avatar image element |
| `Fallback` | Fallback content when image fails |

## Props Reference

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | `""` | Image alt text |
| `fallback` | `string` | - | Text for fallback initials |
| `size` | `"xs" \| "sm" \| "default" \| "lg" \| "xl" \| "2xl"` | `"default"` | Avatar size |
| `shape` | `"circle" \| "square" \| "rounded"` | `"circle"` | Avatar shape |
| `variant` | `"default" \| "bordered" \| "solid"` | `"default"` | Visual variant |
| `color` | `"default" \| "primary" \| "secondary" \| "green" \| "yellow" \| "red" \| "blue" \| "purple" \| "pink" \| "gradient"` | `"default"` | Fallback color |
| `class` | `string` | - | Additional CSS classes for root |
| `imageClass` | `string` | - | Additional CSS classes for image |
| `fallbackClass` | `string` | - | Additional CSS classes for fallback |
| `customFallback` | `Snippet` | - | Custom fallback snippet |
| `delayMs` | `number` | `0` | Delay before showing fallback |

### AvatarGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `max` | `number` | `5` | Maximum avatars to display |
| `size` | Avatar size type | `"default"` | Size for all avatars |
| `spacing` | `"tight" \| "default" \| "loose"` | `"default"` | Overlap spacing |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | Required | Avatar components |

## Sizes

```svelte
<Avatar size="xs" fallback="XS" />   <!-- 24px -->
<Avatar size="sm" fallback="SM" />   <!-- 32px -->
<Avatar size="default" fallback="MD" />  <!-- 40px -->
<Avatar size="lg" fallback="LG" />   <!-- 48px -->
<Avatar size="xl" fallback="XL" />   <!-- 56px -->
<Avatar size="2xl" fallback="2X" />  <!-- 64px -->
```

## Shapes

```svelte
<Avatar shape="circle" fallback="CI" />
<Avatar shape="rounded" fallback="RO" />
<Avatar shape="square" fallback="SQ" />
```

## Variants

### Default

```svelte
<Avatar variant="default" fallback="DF" />
```

### Bordered

Adds a ring with offset around the avatar:

```svelte
<Avatar variant="bordered" fallback="BO" />
```

### Solid

```svelte
<Avatar variant="solid" fallback="SO" />
```

## Colors

Available for fallback backgrounds:

```svelte
<Avatar color="default" fallback="DF" />
<Avatar color="primary" fallback="PR" />
<Avatar color="secondary" fallback="SE" />
<Avatar color="green" fallback="GR" />
<Avatar color="yellow" fallback="YE" />
<Avatar color="red" fallback="RE" />
<Avatar color="blue" fallback="BL" />
<Avatar color="purple" fallback="PU" />
<Avatar color="pink" fallback="PI" />
<Avatar color="gradient" fallback="GD" />
```

## Examples

### With Fallback Text

```svelte
<Avatar fallback="John Doe" />
<!-- Displays: "JD" -->
```

### Without Image (Icon Fallback)

```svelte
<Avatar />
<!-- Displays default user icon -->
```

### Bordered with Colors

```svelte
<Avatar variant="bordered" color="primary" fallback="PR" size="lg" />
<Avatar variant="bordered" color="green" fallback="GR" size="lg" />
<Avatar variant="bordered" color="red" fallback="RE" size="lg" />
```

### Custom Fallback

```svelte
<Avatar>
  {#snippet customFallback()}
    <span class="text-2xl">🎨</span>
  {/snippet}
</Avatar>
```

### Avatar Groups

```svelte
<script lang="ts">
  import { Avatar, AvatarGroup } from "aether-ui";

  const users = [
    { image: "/avatar1.jpg", name: "User 1" },
    { image: "/avatar2.jpg", name: "User 2" },
    { image: "/avatar3.jpg", name: "User 3" },
  ];
</script>

<AvatarGroup spacing="default">
  {#each users as user}
    <Avatar src={user.image} alt={user.name} fallback={user.name} />
  {/each}
</AvatarGroup>
```

### Spacing Options

```svelte
<AvatarGroup spacing="tight">...</AvatarGroup>   <!-- Less overlap -->
<AvatarGroup spacing="default">...</AvatarGroup> <!-- Standard overlap -->
<AvatarGroup spacing="loose">...</AvatarGroup>   <!-- Minimal overlap -->
```

### User Profile Card

```svelte
<script lang="ts">
  import { Avatar } from "aether-ui";
</script>

<div class="flex items-center gap-4">
  <Avatar
    src={user.avatar}
    fallback={user.name}
    size="xl"
    variant="bordered"
    color="primary"
  />
  <div>
    <h3 class="font-semibold">{user.name}</h3>
    <p class="text-sm text-muted-foreground">{user.email}</p>
  </div>
</div>
```

### Online Status Indicator

```svelte
<div class="relative inline-block">
  <Avatar src={user.avatar} fallback={user.name} size="lg" />
  <span
    class="absolute bottom-0 right-0 block size-3 rounded-full bg-green-500 ring-2 ring-background"
  ></span>
</div>
```

### Team Members Grid

```svelte
<script lang="ts">
  import { Avatar } from "aether-ui";
</script>

<div class="grid grid-cols-4 gap-4">
  {#each team as member}
    <div class="text-center">
      <Avatar
        src={member.avatar}
        fallback={member.name}
        size="2xl"
        variant="bordered"
        color={member.color}
        class="mx-auto"
      />
      <p class="mt-2 text-sm font-medium">{member.name}</p>
      <p class="text-xs text-muted-foreground">{member.role}</p>
    </div>
  {/each}
</div>
```

## How Initials Are Generated

The component automatically extracts initials from the `fallback` text:
- Takes the first letter of each word
- Converts to uppercase
- Limits to 2 characters maximum

**Examples:**
- `"John Doe"` → `"JD"`
- `"Sarah"` → `"SA"`
- `"John Paul Smith"` → `"JP"`

## Image Loading Behavior

1. If `src` is provided, attempts to load the image
2. If image fails or is loading, shows fallback
3. Fallback priority:
   - Custom snippet (`customFallback`)
   - Generated initials (from `fallback` text)
   - Default user icon

## Accessibility

The Avatar component follows accessibility best practices:

### ARIA Attributes

- Images include `alt` text for screen readers
- Fallback text is semantic and readable
- Proper ARIA attributes from underlying bits-ui components

### Best Practices

1. **Always provide alt text**: Describe who the avatar represents
2. **Use meaningful fallbacks**: Provide name for initials generation
3. **Color contrast**: All colors meet WCAG guidelines
4. **Test with screen readers**: Ensure announcements are clear
