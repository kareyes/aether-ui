# Skeleton Component

A versatile skeleton loading component with multiple variants, animations, shapes, and preset patterns for displaying placeholder content while data is loading.

## Features

- ✅ **Multiple Variants**: default, primary, secondary, accent
- ✅ **Animation Options**: pulse, shimmer, wave, none
- ✅ **Shape Presets**: default (rounded), circle, square, pill
- ✅ **Size Presets**: xs, sm, md, lg, xl, full
- ✅ **Width Shortcuts**: full, half, third, quarter, or custom values
- ✅ **Multiple Count**: Render multiple skeletons with stagger animation
- ✅ **Preset Components**: SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable
- ✅ **TypeScript Support**: Complete type definitions
- ✅ **Visibility Control**: Toggle skeleton display

## Installation

The Skeleton component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

```svelte
<script>
  import {
    Skeleton,
    SkeletonText,
    SkeletonAvatar,
    SkeletonCard,
    SkeletonTable
  } from "aether-ui";
</script>
```

## Basic Usage

### Simple Skeleton

```svelte
<Skeleton width="200px" height="20px" />
```

### With Size Presets

```svelte
<Skeleton size="sm" width="full" />
<Skeleton size="md" width="half" />
<Skeleton size="lg" width="200px" />
```

### Circle Avatar Placeholder

```svelte
<Skeleton shape="circle" class="h-12 w-12" />
```

## Animation Options

### Pulse (Default)

```svelte
<Skeleton animation="pulse" size="md" width="full" />
```

### Shimmer Effect

```svelte
<Skeleton animation="shimmer" size="md" width="full" />
```

### Wave Effect

```svelte
<Skeleton animation="wave" size="md" width="full" />
```

### No Animation

```svelte
<Skeleton animation="none" size="md" width="full" />
```

## Variants

```svelte
<Skeleton variant="default" size="lg" width="full" />
<Skeleton variant="primary" size="lg" width="full" />
<Skeleton variant="secondary" size="lg" width="full" />
<Skeleton variant="accent" size="lg" width="full" />
```

## Multiple Skeletons

Render multiple skeletons with optional stagger animation:

```svelte
<Skeleton count={4} size="sm" width="full" delay={100} />
```

## Width Shortcuts

```svelte
<Skeleton width="full" />    <!-- 100% -->
<Skeleton width="half" />    <!-- 50% -->
<Skeleton width="third" />   <!-- 33.333% -->
<Skeleton width="quarter" /> <!-- 25% -->
<Skeleton width="200px" />   <!-- Custom -->
```

## Visibility Control

Toggle skeleton visibility based on loading state:

```svelte
<script>
  let isLoading = $state(true);
</script>

<Skeleton visible={isLoading} size="md" width="full" />
```

## Preset Components

### SkeletonText

Paragraph placeholder with natural varying line widths:

```svelte
<!-- Default: 3 lines with varied widths -->
<SkeletonText />

<!-- Custom line count -->
<SkeletonText lines={5} />

<!-- Uniform widths -->
<SkeletonText lines={4} varied={false} />

<!-- Custom animation -->
<SkeletonText animation="shimmer" lines={3} />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `number` | `3` | Number of text lines |
| `gap` | `string` | `"0.5rem"` | Gap between lines |
| `animation` | `"pulse" \| "shimmer" \| "wave" \| "none"` | `"pulse"` | Animation type |
| `varied` | `boolean` | `true` | Vary line widths for natural appearance |

### SkeletonAvatar

Avatar placeholder with optional accompanying text:

```svelte
<!-- Avatar only -->
<SkeletonAvatar size="lg" />

<!-- Avatar with text lines -->
<SkeletonAvatar withText size="md" />

<!-- Custom text lines -->
<SkeletonAvatar withText textLines={3} size="xl" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Avatar size |
| `animation` | `"pulse" \| "shimmer" \| "wave" \| "none"` | `"pulse"` | Animation type |
| `withText` | `boolean` | `false` | Show accompanying text lines |
| `textLines` | `number` | `2` | Number of text lines (when withText is true) |

### SkeletonCard

Card layout placeholder with configurable sections:

```svelte
<!-- Full card with all sections -->
<SkeletonCard />

<!-- Card without image -->
<SkeletonCard withImage={false} />

<!-- Minimal card -->
<SkeletonCard 
  withImage={false} 
  withAvatar={false} 
  withFooter={false} 
  bodyLines={4} 
/>

<!-- Square image ratio -->
<SkeletonCard imageRatio="square" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `withImage` | `boolean` | `true` | Show image placeholder |
| `imageRatio` | `"video" \| "square" \| "portrait"` | `"video"` | Image aspect ratio |
| `withAvatar` | `boolean` | `true` | Show avatar in header |
| `bodyLines` | `number` | `3` | Number of text lines in body |
| `withFooter` | `boolean` | `true` | Show footer section |
| `animation` | `"pulse" \| "shimmer" \| "wave" \| "none"` | `"pulse"` | Animation type |

### SkeletonTable

Table placeholder with configurable rows and columns:

```svelte
<!-- Default: 5 rows, 4 columns -->
<SkeletonTable />

<!-- Custom dimensions -->
<SkeletonTable rows={3} columns={6} />

<!-- Without header -->
<SkeletonTable withHeader={false} rows={4} columns={3} />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `number` | `5` | Number of table rows |
| `columns` | `number` | `4` | Number of table columns |
| `withHeader` | `boolean` | `true` | Show header row |
| `animation` | `"pulse" \| "shimmer" \| "wave" \| "none"` | `"pulse"` | Animation type |

## Base Skeleton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "primary" \| "secondary" \| "accent"` | `"default"` | Visual style |
| `animation` | `"pulse" \| "shimmer" \| "wave" \| "none"` | `"pulse"` | Animation type |
| `shape` | `"default" \| "circle" \| "square" \| "pill"` | `"default"` | Border radius style |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Preset height |
| `width` | `string` | `undefined` | Custom width ("full", "half", "200px", etc.) |
| `height` | `string` | `undefined` | Custom height (overrides size) |
| `count` | `number` | `1` | Number of skeletons to render |
| `gap` | `string` | `"0.5rem"` | Gap between multiple skeletons |
| `delay` | `number` | `0` | Animation delay in ms (stagger effect) |
| `visible` | `boolean` | `true` | Whether to show the skeleton |
| `class` | `string` | `undefined` | Additional CSS classes |

## Real-world Examples

### Loading State Pattern

```svelte
<script>
  let isLoading = $state(true);
  let data = $state(null);

  async function fetchData() {
    isLoading = true;
    data = await api.getData();
    isLoading = false;
  }
</script>

{#if isLoading}
  <SkeletonCard />
{:else}
  <Card title={data.title}>
    {data.content}
  </Card>
{/if}
```

### Social Post Skeleton

```svelte
<div class="space-y-4">
  <SkeletonAvatar withText size="md" />
  <SkeletonText lines={2} />
  <Skeleton class="aspect-video w-full" />
  <div class="flex gap-4">
    <Skeleton shape="pill" size="sm" width="60px" />
    <Skeleton shape="pill" size="sm" width="60px" />
    <Skeleton shape="pill" size="sm" width="60px" />
  </div>
</div>
```

### Product List Skeleton

```svelte
{#each Array(3) as _, i}
  <div class="flex gap-4">
    <Skeleton shape="default" class="h-16 w-16 shrink-0" />
    <div class="flex-1 space-y-2">
      <Skeleton size="sm" width="70%" delay={i * 50} />
      <Skeleton size="xs" width="50%" delay={i * 50 + 25} />
      <Skeleton size="sm" width="30%" delay={i * 50 + 50} />
    </div>
  </div>
{/each}
```

## Accessibility

- Skeletons use `aria-hidden="true"` implicitly as decorative elements
- Consider adding screen reader announcements for loading states
- Use the `visible` prop to properly manage loading transitions

## Customization

### Custom Styles

```svelte
<Skeleton 
  class="bg-gradient-to-r from-blue-200 to-purple-200" 
  size="lg" 
  width="full" 
/>
```

### Custom Animation via CSS

Add custom keyframes to your CSS:

```css
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@keyframes wave {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
```
