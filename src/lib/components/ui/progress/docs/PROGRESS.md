# Progress Component

Displays a horizontal bar indicating how far along a task or metric is. Supports determinate values, indeterminate loading state, labels, and a rich set of visual variants.

## Features

- **6 Variants**: Default, Success, Warning, Destructive, Secondary, Accent (indicator color)
- **5 Sizes**: xs, sm, default, lg, xl (track height)
- **4 Radius Options**: None, sm, default (rounded-full), lg
- **Indeterminate State**: Animated loading bar when `value` is null
- **Label & Value Display**: Optional label and formatted value above the bar
- **Custom Value Format**: Bring your own formatter function
- **Accessible**: Built on bits-ui — includes `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

## Installation

```bash
pnpm add aether-ui
```

---

## Quick Start

```svelte
<script lang="ts">
  import { Progress } from "aether-ui";
</script>

<Progress value={65} />
```

---

## Declarative API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | `0` | Progress value. Pass `null` for indeterminate/loading state. |
| `max` | `number` | `100` | Maximum value |
| `label` | `string` | — | Label text displayed above the bar |
| `showValue` | `boolean` | `false` | Show the formatted value to the right of the label |
| `valueFormat` | `(value, max) => string` | — | Custom value formatter — defaults to `"{percentage}%"` |
| `variant` | `ProgressVariant` | `'default'` | Indicator fill color |
| `size` | `ProgressSize` | `'default'` | Track height |
| `radius` | `ProgressRadius` | `'default'` | Track corner radius |
| `class` | `string` | — | Extra CSS classes on the wrapper div |
| `trackClass` | `string` | — | Extra CSS classes on the track element |

---

## Usage

### Basic

```svelte
<Progress value={75} />
```

### Label & Value

```svelte
<!-- Label only -->
<Progress value={72} label="Storage used" />

<!-- Label + percentage -->
<Progress value={72} label="Storage used" showValue />

<!-- Custom format -->
<Progress
  value={8}
  max={10}
  label="Steps completed"
  showValue
  valueFormat={(v, m) => `${v} of ${m}`}
/>
```

### Variants

```svelte
<Progress value={65} variant="default" />      <!-- primary blue -->
<Progress value={65} variant="success" />      <!-- green -->
<Progress value={65} variant="warning" />      <!-- amber -->
<Progress value={65} variant="destructive" />  <!-- red -->
<Progress value={65} variant="secondary" />    <!-- secondary foreground -->
<Progress value={65} variant="accent" />       <!-- violet -->
```

### Sizes

```svelte
<Progress value={65} size="xs" />      <!-- 2px -->
<Progress value={65} size="sm" />      <!-- 4px -->
<Progress value={65} size="default" /> <!-- 8px -->
<Progress value={65} size="lg" />      <!-- 12px -->
<Progress value={65} size="xl" />      <!-- 16px -->
```

### Radius

```svelte
<Progress value={65} size="lg" radius="none" />
<Progress value={65} size="lg" radius="sm" />
<Progress value={65} size="lg" radius="default" />  <!-- rounded-full -->
<Progress value={65} size="lg" radius="lg" />
```

### Indeterminate

Pass `value={null}` to show an animated loading bar with no specific position.

```svelte
<Progress value={null} label="Processing…" />
<Progress value={null} variant="accent" size="lg" />
```

---

## Realistic Examples

### File Upload Queue

```svelte
<Progress value={100} label="report.pdf"    showValue size="sm" variant="success" />
<Progress value={78}  label="data.xlsx"     showValue size="sm" />
<Progress value={null}  label="archive.zip"   size="sm" variant="warning" />
```

### System Metrics

```svelte
<Progress value={42} label="CPU"    showValue size="sm" />
<Progress value={81} label="Memory" showValue size="sm" variant="warning" />
<Progress value={95} label="Disk"   showValue size="sm" variant="destructive" />
```

### Dynamic / Reactive

```svelte
<script lang="ts">
  import { Progress } from "aether-ui";
  let uploaded = $state(0);

  async function upload(file: File) {
    // ... stream upload, update `uploaded` as bytes arrive
  }
</script>

<Progress
  value={uploaded}
  max={file.size}
  label={file.name}
  showValue
  valueFormat={(v, m) => `${(v / 1024).toFixed(1)} / ${(m / 1024).toFixed(1)} KB`}
/>
```

---

## Compositional API

Use `ProgressPrimitives.Root` directly for full style control — useful for gradient fills, striped patterns, or custom markup inside the track.

```svelte
<script lang="ts">
  import { ProgressPrimitives } from "aether-ui";
  const { Root } = ProgressPrimitives;
</script>

<!-- Gradient fill -->
<Root value={55} class="h-6 rounded-lg bg-muted">
  <div
    class="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg transition-all"
    style="width: 55%"
  ></div>
</Root>
```

### ProgressPrimitives.Root Props

Extends bits-ui `Progress.Root`. Key props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | — | Progress value. `null` = indeterminate. |
| `max` | `number` | `100` | Maximum value |
| `variant` | `ProgressVariant` | `'default'` | Indicator color |
| `size` | `ProgressSize` | `'default'` | Track height |
| `radius` | `ProgressRadius` | `'default'` | Corner radius |
| `class` | `string` | — | Extra CSS on the track element |

---

## Type Exports

```ts
import type { ProgressVariant, ProgressSize, ProgressRadius } from "aether-ui";

// ProgressVariant = 'default' | 'success' | 'warning' | 'destructive' | 'secondary' | 'accent'
// ProgressSize    = 'xs' | 'sm' | 'default' | 'lg' | 'xl'
// ProgressRadius  = 'none' | 'sm' | 'default' | 'lg'
```

---

## Accessibility

- Renders `<div role="progressbar">` via bits-ui
- `aria-valuenow` — current value (omitted when indeterminate)
- `aria-valuemin` — always `0`
- `aria-valuemax` — the `max` prop value
- `data-indeterminate` attribute set automatically when `value` is null

---

## Related Components

- **Skeleton** — for loading state placeholders of arbitrary shapes
- **Spinner** — for small inline loading indicators
- **Slider** — for interactive value input along a track
