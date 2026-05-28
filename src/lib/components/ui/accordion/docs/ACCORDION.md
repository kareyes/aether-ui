# Accordion

A vertically stacked set of interactive headings that reveal or hide sections of content. Built on top of [bits-ui](https://bits-ui.com) Accordion primitives.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Accordion component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import * as Accordion from "aether-ui";
</script>

<Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>
      Content for section 1.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>
      Content for section 2.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### With Primitives Import

```svelte
<script lang="ts">
  import { AccordionPrimitives } from "aether-ui";
</script>

<AccordionPrimitives.Root type="single">
  <AccordionPrimitives.Item value="item-1">
    <AccordionPrimitives.Trigger>Section 1</AccordionPrimitives.Trigger>
    <AccordionPrimitives.Content>
      Content for section 1.
    </AccordionPrimitives.Content>
  </AccordionPrimitives.Item>
</AccordionPrimitives.Root>
```

## Components

| Component | Description |
|-----------|-------------|
| `Root` | The root container that manages state and context for the accordion |
| `Item` | Individual accordion item wrapper containing trigger and content |
| `Trigger` | The clickable header that toggles the content visibility |
| `Content` | The collapsible content section |

## Props Reference

### Root

The root component that wraps the entire accordion.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | **required** | Whether single or multiple items can be expanded |
| `variant` | `"default" \| "bordered" \| "splitted" \| "shadow"` | `"default"` | Visual style variant |
| `value` | `string \| string[]` | `undefined` | The value(s) of the expanded item(s) |
| `onValueChange` | `(value: string \| string[]) => void` | - | Callback when expanded items change |
| `disabled` | `boolean` | `false` | Whether the accordion is disabled |
| `loop` | `boolean` | `true` | Whether to loop through items with arrow keys |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | The orientation of the accordion |
| `class` | `string` | - | Additional CSS classes |

### Item

Individual accordion item wrapper.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique identifier for the item |
| `disabled` | `boolean` | `false` | Whether the item is disabled |
| `class` | `string` | - | Additional CSS classes |

### Trigger

The clickable header element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `3` | The heading level for accessibility |
| `class` | `string` | - | Additional CSS classes |

### Content

The collapsible content section.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `forceMount` | `boolean` | `true` | Whether to mount content regardless of open state |
| `class` | `string` | - | Additional CSS classes |

## Variants

### Default

The classic accordion with bottom borders and underline hover effect on triggers.

```svelte
<Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Default Style</Accordion.Trigger>
    <Accordion.Content>Content here</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Bordered

A contained accordion with a border around the entire component and dividers between items.

```svelte
<Accordion.Root type="single" variant="bordered">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Bordered Style</Accordion.Trigger>
    <Accordion.Content>Content here</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Splitted

Each item is a separate bordered card with spacing between them.

```svelte
<Accordion.Root type="single" variant="splitted">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Splitted Style</Accordion.Trigger>
    <Accordion.Content>Content here</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Shadow

Similar to bordered but with a subtle shadow for an elevated appearance.

```svelte
<Accordion.Root type="single" variant="shadow">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Shadow Style</Accordion.Trigger>
    <Accordion.Content>Content here</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

## Examples

### Multiple Selection

Allow multiple items to be expanded simultaneously:

```svelte
<Accordion.Root type="multiple" variant="splitted">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content for section 1.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>Content for section 2.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Default Expanded

Set an item to be expanded by default:

```svelte
<Accordion.Root type="single" value="item-2">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Collapsed by default</Accordion.Trigger>
    <Accordion.Content>Content</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Expanded by default</Accordion.Trigger>
    <Accordion.Content>This section is open initially.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### FAQ Section

```svelte
<Accordion.Root type="single" variant="splitted" class="w-full max-w-2xl">
  <Accordion.Item value="shipping">
    <Accordion.Trigger>What are your shipping options?</Accordion.Trigger>
    <Accordion.Content>
      <p class="mb-2">We offer several shipping options:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Standard Shipping: 5-7 business days</li>
        <li>Express Shipping: 2-3 business days</li>
        <li>Overnight Shipping: Next business day</li>
      </ul>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="returns">
    <Accordion.Trigger>What is your return policy?</Accordion.Trigger>
    <Accordion.Content>
      We offer a 30-day money-back guarantee for all purchases.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Settings Panel

```svelte
<Accordion.Root type="multiple" variant="bordered">
  <Accordion.Item value="notifications">
    <Accordion.Trigger>Notification Settings</Accordion.Trigger>
    <Accordion.Content>
      <!-- Notification toggles -->
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="privacy">
    <Accordion.Trigger>Privacy Settings</Accordion.Trigger>
    <Accordion.Content>
      <!-- Privacy options -->
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="account">
    <Accordion.Trigger>Account Settings</Accordion.Trigger>
    <Accordion.Content>
      <!-- Account options -->
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### With Disabled Items

```svelte
<Accordion.Root type="single" variant="splitted">
  <Accordion.Item value="basic">
    <Accordion.Trigger>Basic Features</Accordion.Trigger>
    <Accordion.Content>Available to all users.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="premium" disabled>
    <Accordion.Trigger>Premium Features (Upgrade Required)</Accordion.Trigger>
    <Accordion.Content>Upgrade your plan to access.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

## Accessibility

The Accordion component follows the [WAI-ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/):

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Toggle the focused item |
| `Arrow Down` | Move focus to the next item |
| `Arrow Up` | Move focus to the previous item |
| `Home` | Move focus to the first item |
| `End` | Move focus to the last item |

### ARIA Attributes

- `aria-expanded` indicates whether the content is visible
- `aria-controls` links the trigger to its content
- `aria-labelledby` associates content with its trigger
- Proper heading structure with configurable `level` prop

### Best Practices

1. **Use descriptive trigger text**: Make it clear what content will be revealed
2. **Keep content focused**: Each section should contain related information
3. **Consider default expansion**: Important content may benefit from being expanded by default
4. **Test with screen readers**: Ensure announcements are clear and helpful
