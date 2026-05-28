# Slider Component

A fully-featured slider component with support for variants, sizes, step indicators, marks, and tooltips. Built on top of bits-ui primitives with comprehensive customization options.

## Features

- ✅ **Multiple Variants**: 6 visual styles (default, primary, secondary, success, warning, destructive)
- ✅ **Three Sizes**: sm, default, lg
- ✅ **Step Indicators**: Visual markers for each step value
- ✅ **Custom Marks**: Add labels at specific values
- ✅ **Tooltips**: Show current value on hover
- ✅ **Orientations**: Horizontal and vertical layouts
- ✅ **Range Support**: Single or multiple thumbs
- ✅ **Keyboard Support**: Full arrow key navigation
- ✅ **Accessibility**: ARIA attributes and screen reader support
- ✅ **TypeScript**: Complete type safety

## Installation

The Slider component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Basic Usage

### Simple Slider

```svelte
<script lang="ts">
  import { Slider } from "aether-ui";

  let value = $state([50]);
</script>

<Slider bind:value min={0} max={100} step={1} />
```

### With Primitives Import

```svelte
<script lang="ts">
  import { SliderPrimitives } from "aether-ui";
</script>

<SliderPrimitives.Root value={[50]} min={0} max={100} step={1}>
  {#snippet children({ thumbs, ticks })}
    <SliderPrimitives.Range />
    {#each thumbs as thumb}
      <SliderPrimitives.Thumb {thumb} />
    {/each}
  {/snippet}
</SliderPrimitives.Root>
```

### With Custom Range

```svelte
<script>
  let temperature = $state([20]);
</script>

<Slider 
  bind:value={temperature}
  min={-10}
  max={40}
  step={0.5}
/>
```

## Variants

### Default

```svelte
<Slider variant="default" value={[50]} />
```

### Primary

```svelte
<Slider variant="primary" value={[50]} />
```

### Secondary

```svelte
<Slider variant="secondary" value={[50]} />
```

### Success

```svelte
<Slider variant="success" value={[50]} />
```

### Warning

```svelte
<Slider variant="warning" value={[50]} />
```

### Destructive

```svelte
<Slider variant="destructive" value={[50]} />
```

## Sizes

```svelte
<!-- Small -->
<Slider size="sm" value={[50]} />

<!-- Default -->
<Slider size="default" value={[50]} />

<!-- Large -->
<Slider size="lg" value={[50]} />
```

## Advanced Features

### Step Indicators

Show visual markers at each step value:

```svelte
<Slider 
  value={[50]}
  min={0}
  max={100}
  step={10}
  showSteps={true}
/>
```

### Marks with Labels

Add labeled markers at specific values:

```svelte
<script>
  const marks = [
    { value: 0, label: "Min" },
    { value: 25, label: "Low" },
    { value: 50, label: "Medium" },
    { value: 75, label: "High" },
    { value: 100, label: "Max" },
  ];
</script>

<Slider 
  value={[50]}
  min={0}
  max={100}
  marks={marks}
/>
```

### Tooltip

Show current value on hover:

```svelte
<Slider 
  value={[50]}
  showTooltip={true}
/>
```

### Custom Tooltip Formatter

```svelte
<Slider 
  value={[20]}
  min={0}
  max={100}
  showTooltip={true}
  formatTooltip={(val) => `${val}°C`}
/>
```

### Combined Features

```svelte
<script>
  let value = $state([50]);
  
  const marks = [
    { value: 0, label: "0%" },
    { value: 50, label: "50%" },
    { value: 100, label: "100%" },
  ];
</script>

<Slider 
  bind:value
  min={0}
  max={100}
  step={5}
  showSteps={true}
  marks={marks}
  showTooltip={true}
  formatTooltip={(val) => `${val}%`}
  variant="primary"
  size="lg"
/>
```

## Range Slider

Use multiple thumbs for range selection:

```svelte
<script>
  let range = $state([25, 75]);
</script>

<Slider 
  bind:value={range}
  min={0}
  max={100}
  step={5}
/>
```

## Vertical Orientation

```svelte
<Slider 
  value={[50]}
  orientation="vertical"
  class="h-64"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number[]` | `[0]` | Current value(s) (bindable) |
| `variant` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "destructive"` | `"default"` | Visual variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size variant |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Slider orientation |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `showSteps` | `boolean` | `false` | Show step indicators |
| `marks` | `SliderMark[]` | `[]` | Array of mark objects |
| `showTooltip` | `boolean` | `false` | Show tooltip on hover |
| `formatTooltip` | `(value: number) => string` | `(val) => String(val)` | Custom tooltip formatter |
| `disabled` | `boolean` | `false` | Disable the slider |
| `class` | `string` | `undefined` | Additional CSS classes |
| `ref` | `HTMLElement \| null` | `null` | Reference to root element (bindable) |

### SliderMark Type

```typescript
interface SliderMark {
  value: number;      // Position on the slider
  label?: string;     // Optional label text
}
```

## Examples

### Volume Control

```svelte
<script>
  let volume = $state([70]);
  
  const volumeMarks = [
    { value: 0, label: "🔇" },
    { value: 50, label: "🔉" },
    { value: 100, label: "🔊" },
  ];
</script>

<Slider 
  bind:value={volume}
  min={0}
  max={100}
  step={5}
  marks={volumeMarks}
  showTooltip={true}
  formatTooltip={(val) => `${val}%`}
  variant="primary"
/>
```

### Temperature Control

```svelte
<script>
  let temp = $state([22]);
</script>

<Slider 
  bind:value={temp}
  min={16}
  max={30}
  step={0.5}
  showTooltip={true}
  formatTooltip={(val) => `${val}°C`}
  variant="warning"
  size="lg"
/>
```

### Price Range

```svelte
<script>
  let priceRange = $state([100, 500]);
</script>

<Slider 
  bind:value={priceRange}
  min={0}
  max={1000}
  step={10}
  showTooltip={true}
  formatTooltip={(val) => `$${val}`}
  variant="success"
/>

<p>Price: ${priceRange[0]} - ${priceRange[1]}</p>
```

### Rating Scale

```svelte
<script>
  let rating = $state([3]);
  
  const ratingMarks = [
    { value: 1, label: "Poor" },
    { value: 2, label: "Fair" },
    { value: 3, label: "Good" },
    { value: 4, label: "Great" },
    { value: 5, label: "Excellent" },
  ];
</script>

<Slider 
  bind:value={rating}
  min={1}
  max={5}
  step={1}
  marks={ratingMarks}
  showSteps={true}
  variant="primary"
  size="lg"
/>
```

### Progress Indicator

```svelte
<script>
  let progress = $state([0]);
  
  $effect(() => {
    const interval = setInterval(() => {
      progress = [Math.min(progress[0] + 1, 100)];
      if (progress[0] >= 100) clearInterval(interval);
    }, 100);
    
    return () => clearInterval(interval);
  });
</script>

<Slider 
  value={progress}
  min={0}
  max={100}
  disabled={true}
  variant="success"
  formatTooltip={(val) => `${val}%`}
/>
```

### Vertical Volume

```svelte
<Slider 
  value={[75]}
  orientation="vertical"
  min={0}
  max={100}
  step={5}
  showSteps={true}
  showTooltip={true}
  variant="primary"
  class="h-64"
/>
```

## Accessibility

- ✅ **Keyboard Navigation**: Arrow keys adjust value, Home/End for min/max
- ✅ **ARIA Attributes**: Proper roles, labels, and value announcements
- ✅ **Screen Readers**: Value changes are announced
- ✅ **Focus Management**: Clear visual focus indicators
- ✅ **Touch Support**: Works on touch devices

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow Right/Up` | Increase value by step |
| `Arrow Left/Down` | Decrease value by step |
| `Home` | Set to minimum value |
| `End` | Set to maximum value |
| `Page Up` | Increase by larger amount |
| `Page Down` | Decrease by larger amount |

## Best Practices

1. **Choose Appropriate Steps**: Use step values that make sense for your use case
2. **Use Marks Sparingly**: Too many marks can clutter the interface
3. **Provide Tooltips**: Help users understand the current value
4. **Consider Orientation**: Vertical sliders work well for volume/height controls
5. **Format Values**: Use formatTooltip to display values in user-friendly formats
6. **Set Reasonable Ranges**: Define min/max that match your requirements

## Common Use Cases

### Volume Control
Use with tooltip showing percentage, marks for mute/low/high.

### Temperature Setting
Use with decimal steps and custom formatting (°C/°F).

### Price Range Filter
Use range slider with currency formatting.

### Rating/Review
Use with step indicators and labeled marks.

### Progress Indicator
Use disabled slider to show read-only progress.

### Zoom Level
Use with percentage formatting and step indicators.

## Browser Support

Works in all modern browsers with full accessibility support.
