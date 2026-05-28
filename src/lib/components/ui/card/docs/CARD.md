# Card

A versatile card component with multiple variants, padding options, and interactive states for displaying grouped content with headers, descriptions, and actions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Card component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { Card } from "aether-ui";
</script>

<Card title="Card Title" description="Card description">
  <p>Your card content goes here.</p>
</Card>
```

### With Primitives Import

```svelte
<script lang="ts">
  import { CardPrimitives } from "aether-ui";
</script>

<CardPrimitives.Root>
  <CardPrimitives.Header>
    <CardPrimitives.Title>Card Title</CardPrimitives.Title>
    <CardPrimitives.Description>Card description</CardPrimitives.Description>
  </CardPrimitives.Header>
  <CardPrimitives.Content>
    <p>Your card content goes here.</p>
  </CardPrimitives.Content>
</CardPrimitives.Root>
```

## Components

| Component | Description |
|-----------|-------------|
| `Root` | The root container for the card |
| `Header` | Container for card header content |
| `Title` | The card title element |
| `Description` | The card description/subtitle |
| `Content` | Main content area of the card |
| `Footer` | Footer area for actions |
| `Action` | Header action slot |

## Props Reference

### Card (Shorthand)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Card title text |
| `description` | `string` | `undefined` | Card description/subtitle |
| `variant` | `CardVariant` | `"default"` | Visual style variant |
| `padding` | `CardPadding` | `"default"` | Internal padding size |
| `hover` | `boolean` | `false` | Enable hover effects |
| `interactive` | `boolean` | `false` | Enable interactive/clickable state |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | Required | Main card content |
| `headerAction` | `Snippet` | `undefined` | Header action content |
| `footer` | `Snippet` | `undefined` | Footer content |

### Card Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard card with border and shadow |
| `outline` | Card with emphasized border |
| `ghost` | Minimal card without border or shadow |
| `elevated` | Card with enhanced shadow for depth |
| `filled` | Card with filled background |

### Card Padding

| Padding | Size | Description |
|---------|------|-------------|
| `none` | 0 | Full-bleed content, custom padding |
| `sm` | p-4 | Compact cards |
| `default` | p-6 | Standard spacing |
| `lg` | p-8 | Spacious layouts |

## Variants

### Default

Standard card with border and shadow:

```svelte
<Card variant="default" title="Default Card">
  <p>Standard card with border and shadow.</p>
</Card>
```

### Outline

Card with emphasized border:

```svelte
<Card variant="outline" title="Outline Card">
  <p>Card with emphasized border.</p>
</Card>
```

### Ghost

Minimal card without border or shadow:

```svelte
<Card variant="ghost" title="Ghost Card">
  <p>Minimal card without border or shadow.</p>
</Card>
```

### Elevated

Card with enhanced shadow for depth:

```svelte
<Card variant="elevated" title="Elevated Card">
  <p>Card with enhanced shadow for depth.</p>
</Card>
```

### Filled

Card with filled background:

```svelte
<Card variant="filled" title="Filled Card">
  <p>Card with filled background.</p>
</Card>
```

## Examples

### Hover Effects

```svelte
<Card
  title="Hover Card"
  description="Hover to see effect"
  hover={true}
>
  <p>This card responds to hover with enhanced shadow and border color.</p>
</Card>
```

### Interactive/Clickable Cards

```svelte
<script lang="ts">
  import { Card } from "aether-ui";

  function handleCardClick() {
    alert('Card clicked!');
  }
</script>

<Card
  title="Interactive Card"
  description="This card is clickable"
  interactive={true}
  onclick={handleCardClick}
>
  <p>Click anywhere on this card to trigger an action.</p>
</Card>
```

### Card with Header Actions

```svelte
<script lang="ts">
  import { Card, Button } from "aether-ui";
</script>

<Card title="Edit Profile" description="Update your information">
  {#snippet headerAction()}
    <Button variant="ghost" size="sm">Edit</Button>
  {/snippet}

  <p>Profile content goes here.</p>
</Card>
```

### Card with Footer

```svelte
<script lang="ts">
  import { Card, Button } from "aether-ui";
</script>

<Card title="Confirm Action" description="This requires confirmation">
  <p>Are you sure you want to proceed?</p>

  {#snippet footer()}
    <Button variant="outline" size="sm">Cancel</Button>
    <Button variant="destructive" size="sm">Confirm</Button>
  {/snippet}
</Card>
```

### Complex Card with Header and Footer

```svelte
<script lang="ts">
  import { Card, Button, Badge, Field, Input } from "aether-ui";
</script>

<Card
  title="Subscription Plan"
  description="Manage your subscription"
  variant="elevated"
  hover={true}
>
  {#snippet headerAction()}
    <Badge>Active</Badge>
  {/snippet}

  <Field.Impl label="Plan">
    <Input value="Pro Plan" />
  </Field.Impl>

  {#snippet footer()}
    <div class="flex-1 text-xs text-muted-foreground">
      Next billing: Dec 1, 2025
    </div>
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Upgrade</Button>
  {/snippet}
</Card>
```

### Using Native Card Components

For more control, use the native card components:

```svelte
<script lang="ts">
  import { CardPrimitives } from "aether-ui";
</script>

<CardPrimitives.Root class="border rounded-xl shadow-sm">
  <CardPrimitives.Header>
    <CardPrimitives.Title>Custom Card</CardPrimitives.Title>
    <CardPrimitives.Description>Using native components</CardPrimitives.Description>
    <CardPrimitives.Action>
      <button>Action</button>
    </CardPrimitives.Action>
  </CardPrimitives.Header>

  <CardPrimitives.Content>
    <p>Your content here</p>
  </CardPrimitives.Content>

  <CardPrimitives.Footer>
    <button>Footer Action</button>
  </CardPrimitives.Footer>
</CardPrimitives.Root>
```

### Settings Card

```svelte
<script lang="ts">
  import { Card, Field, Switch } from "aether-ui";
</script>

<Card
  title="Notification Settings"
  description="Manage your notification preferences"
>
  <Field.Impl label="Email notifications" orientation="horizontal">
    <Switch id="email" />
  </Field.Impl>
  <Field.Impl label="Push notifications" orientation="horizontal">
    <Switch id="push" />
  </Field.Impl>
</Card>
```

### Stats Card

```svelte
<Card variant="elevated" padding="lg">
  <div class="text-center">
    <p class="text-sm text-muted-foreground">Total Users</p>
    <p class="text-4xl font-bold mt-2">12,345</p>
    <p class="text-xs text-green-600 mt-1">↑ 12% from last month</p>
  </div>
</Card>
```

### Product Card

```svelte
<script lang="ts">
  import { Card, Button } from "aether-ui";
</script>

<Card
  title="Premium Plan"
  description="Best for teams"
  variant="outline"
  interactive={true}
>
  <div class="space-y-2">
    <p class="text-3xl font-bold">$29/month</p>
    <ul class="space-y-1 text-sm">
      <li>✓ Unlimited projects</li>
      <li>✓ Advanced analytics</li>
      <li>✓ Priority support</li>
    </ul>
  </div>

  {#snippet footer()}
    <Button class="w-full">Get Started</Button>
  {/snippet}
</Card>
```

## Accessibility

The Card component follows accessibility best practices:

### Semantic Structure

- Cards use semantic HTML structure
- Proper heading hierarchy with Title component
- Interactive cards have proper cursor styles

### Best Practices

1. **Use descriptive titles**: Card titles should clearly indicate the content
2. **Maintain focus order**: Header actions and footer buttons maintain proper focus order
3. **Interactive feedback**: Use `hover` and `interactive` props to indicate interactivity
4. **Color contrast**: All variants support proper color contrast in light and dark modes

### Styling Notes

- Cards use `bg-card` and `text-card-foreground` color tokens for theming
- The `rounded-xl` class provides consistent border radius
- Shadow utilities create depth hierarchy
- All variants support dark mode through color tokens
