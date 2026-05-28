# RadioGroup Component

A flexible radio group component that allows users to select one option from a set of choices. Built on top of bits-ui primitives with support for different variants, sizes, and layouts.

## Features

- **Options Pattern**: Data-driven approach with options array
- **Card Style UI**: Optional card-style layout with clickable cards (`isCard` prop)
- **Variants**: Multiple visual styles (default, destructive, success, warning)
- **Sizes**: Three size options (sm, default, lg) 
- **Flexible Layout**: Supports vertical and horizontal arrangements
- **Error Handling**: Built-in error state with visual feedback
- **Field Integration**: Works seamlessly with Field component
- **Accessibility**: Full keyboard navigation and screen reader support
- **TypeScript**: Complete type safety with exported types
- **Responsive**: Adapts to different screen sizes and contexts

## Installation

The RadioGroup component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Radio Group

```svelte
<script>
  import { RadioGroup } from "aether-ui";
  import type { RadioGroupOption } from "aether-ui";
  
  let selectedValue = $state("option1");
  
  const options: RadioGroupOption[] = [
    { id: "1", label: "Option 1", value: "option1" },
    { id: "2", label: "Option 2", value: "option2" },
    { id: "3", label: "Option 3", value: "option3" },
  ];
</script>

<RadioGroup 
  {options}
  bind:value={selectedValue}
  label="Choose an option"
/>
```

### Card Style for Prominent Selections

```svelte
<script>
  import { RadioGroup } from "aether-ui";
  
  let selectedPlan = $state("pro");
  
  const planOptions = [
    { 
      id: "free", 
      label: "Free Plan", 
      value: "free", 
      description: "Basic features for personal use - $0/month" 
    },
    { 
      id: "pro", 
      label: "Pro Plan", 
      value: "pro", 
      description: "Advanced features for professionals - $29/month" 
    },
  ];
</script>

<RadioGroup 
  options={planOptions}
  bind:value={selectedPlan}
  isCard={true}
  label="Choose Your Plan"
  description="Select the plan that best fits your needs"
/>
```

### Horizontal Layout for Compact Choices

```svelte
<script>
  import { RadioGroup } from "aether-ui";
  
  let theme = $state("auto");
  
  const themeOptions = [
    { id: "light", label: "Light", value: "light" },
    { id: "dark", label: "Dark", value: "dark" },
    { id: "auto", label: "Auto", value: "auto" },
  ];
</script>

<RadioGroup 
  options={themeOptions}
  bind:value={theme}
  orientation="horizontal"
  label="Theme Selection"
/>
```

### Different Sizes

```svelte
<script>
  const options = [
    { id: "1", label: "Option 1", value: "option1" },
    { id: "2", label: "Option 2", value: "option2" },
  ];
</script>

<!-- Small -->
<RadioGroup 
  {options}
  radioSize="sm"
  label="Small Radio Group"
/>

<!-- Large -->
<RadioGroup 
  {options}
  radioSize="lg"
  label="Large Radio Group"
/>
```

## Components

### RadioGroup

The main component that manages radio group state using an options array pattern.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `RadioGroupOption[]` | `[]` | Array of radio options |
| `value` | `string` | `""` | Currently selected value (bindable) |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Layout direction |
| `radioSize` | `"sm" \| "default" \| "lg"` | `"default"` | Size of individual radio buttons |
| `variant` | `"default" \| "destructive" \| "success" \| "warning"` | `"default"` | Visual variant |
| `isCard` | `boolean` | `false` | Enable card-style layout with clickable cards |
| `disabled` | `boolean` | `false` | Disable the entire radio group |
| `error` | `boolean` | `false` | Error state with visual feedback |
| `label` | `string` | `undefined` | Group label |
| `description` | `string` | `undefined` | Group description |
| `required` | `boolean` | `false` | Whether field is required |
| `class` | `string` | `undefined` | Additional CSS classes |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback when value changes |
| `onError` | `(error: boolean) => void` | `undefined` | Callback when error state changes |

#### Option Structure

```typescript
interface RadioGroupOption {
  id: string;           // Unique identifier
  label: string;        // Display text
  value: string;        // Value to be selected
  description?: string; // Optional description text
  disabled?: boolean;   // Whether this specific option is disabled
}
```

## Layout Modes

### Regular Mode (`isCard={false}`, default)
- Standard radio button layout
- Radio button with label/description
- Compact and familiar interface
- Best for most form applications

### Card Mode (`isCard={true}`)
- Card-style layout with clickable cards
- Radio button positioned on the right
- Enhanced visual hierarchy
- Perfect for options with descriptions
- Hover and selected states with border highlights
- Ideal for prominent selections (plans, cluster types, etc.)

## Variants

### Default (`default`)
- Standard styling with primary color
- Clean, minimal appearance
- Best for most use cases

### Destructive (`destructive`)
- Red color scheme for dangerous actions
- Use for delete confirmations or warnings

### Success (`success`)
- Green color scheme for positive actions
- Good for confirmations or approvals

### Warning (`warning`)
- Yellow/orange color scheme for caution
- Use for actions requiring attention

## Sizes

### Small (`sm`)
- Compact radio buttons (12px / size-3)
- Reduced spacing (8px / gap-2)
- Smaller indicator icon (6px / size-1.5)
- Best for dense layouts or secondary options

### Default (`default`)
- Standard radio buttons (16px / size-4)
- Normal spacing (12px / gap-3)
- Standard indicator icon (8px / size-2)
- Recommended for most use cases

### Large (`lg`)
- Larger radio buttons (20px / size-5)
- Increased spacing (16px / gap-4)
- Bigger indicator icon (10px / size-2.5)
- Better for accessibility and touch interfaces

## Advanced Features

### Card Style Examples

#### Cluster Selection
```svelte
<script>
  let clusterType = $state("kubernetes");
  
  const clusterOptions = [
    { 
      id: "k8s", 
      label: "Kubernetes", 
      value: "kubernetes", 
      description: "Run GPU workloads on a K8s configured cluster." 
    },
    { 
      id: "vm", 
      label: "Virtual Machine", 
      value: "vm", 
      description: "Access a VM configured cluster to run GPU workloads." 
    },
  ];
</script>

<RadioGroup 
  options={clusterOptions}
  bind:value={clusterType}
  isCard={true}
  radioSize="lg"
  label="Select Cluster Type"
  description="Choose how you want to run your workloads"
/>
```

#### Card Style with Variants
```svelte
<RadioGroup 
  options={planOptions}
  bind:value={selectedPlan}
  isCard={true}
  variant="success"
  label="Choose Your Plan"
/>
```

### Error States

```svelte
<script>
  let selection = $state("");
  let hasError = $derived(!selection);
</script>

<RadioGroup 
  {options}
  bind:value={selection}
  error={hasError}
  required
  label="Required Selection"
  description="Please select an option"
/>
```

### With Field Component

```svelte
<script>
  import { Field } from "aether-ui";
  
  let cluster = $state("");
</script>

<Field
  label="Cluster Configuration"
  description="Select your cluster type"
  error={!cluster ? "Please select a cluster type" : undefined}
  required
>
  <RadioGroup 
    options={clusterOptions}
    bind:value={cluster}
    error={!cluster}
    isCard={true}
  />
</Field>
```

## Examples

### Settings Panel

```svelte
<script>
  let notifications = $state("email");
</script>

<div class="space-y-4">
  <h3 class="text-lg font-medium">Notification Preferences</h3>
  <RadioGroup bind:value={notifications}>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="email" id="notify-email" />
      <label for="notify-email" class="text-sm font-medium cursor-pointer">
        📧 Email notifications
      </label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="push" id="notify-push" />
      <label for="notify-push" class="text-sm font-medium cursor-pointer">
        📱 Push notifications
      </label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="none" id="notify-none" />
      <label for="notify-none" class="text-sm font-medium cursor-pointer">
        🔕 No notifications
      </label>
    </div>
  </RadioGroup>
</div>
```

### Pricing Plans

```svelte
<script>
  let selectedPlan = $state("pro");
</script>

<div class="space-y-4">
  <h3 class="text-lg font-medium">Choose Your Plan</h3>
  <RadioGroup variant="card" bind:value={selectedPlan}>
    <div class="flex items-center space-x-3 p-4">
      <RadioGroupItem variant="card" value="free" id="plan-free" />
      <div class="flex-1">
        <label for="plan-free" class="text-sm font-medium cursor-pointer">
          Free Plan
        </label>
        <p class="text-xs text-muted-foreground">$0/month</p>
        <p class="text-xs text-muted-foreground">Basic features</p>
      </div>
    </div>
    <div class="flex items-center space-x-3 p-4">
      <RadioGroupItem variant="card" value="pro" id="plan-pro" />
      <div class="flex-1">
        <label for="plan-pro" class="text-sm font-medium cursor-pointer">
          Pro Plan
        </label>
        <p class="text-xs text-muted-foreground">$10/month</p>
        <p class="text-xs text-muted-foreground">Advanced features</p>
      </div>
    </div>
  </RadioGroup>
</div>
```

### Quick Toggle Options

```svelte
<script>
  let viewMode = $state("list");
</script>

<div class="space-y-2">
  <label class="text-sm font-medium">View Mode</label>
  <RadioGroup variant="inline" bind:value={viewMode}>
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="inline" value="list" id="view-list" />
      <label for="view-list" class="text-sm cursor-pointer">📋 List</label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="inline" value="grid" id="view-grid" />
      <label for="view-grid" class="text-sm cursor-pointer">⚏ Grid</label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem variant="inline" value="table" id="view-table" />
      <label for="view-table" class="text-sm cursor-pointer">📊 Table</label>
    </div>
  </RadioGroup>
</div>
```

## Styling

The component uses Tailwind CSS and tailwind-variants for styling. Customization options:

### CSS Variables

```css
:root {
  --color-primary: /* indicator fill color */
  --color-border-input: /* border color */
  --color-ring: /* focus ring color */
  --color-card: /* card variant background */
  --color-border: /* card variant border */
}
```

### Custom Variants

```typescript
// Extend the radioGroupVariants
export const customRadioGroupVariants = tv({
  extend: radioGroupVariants,
  variants: {
    variant: {
      ...radioGroupVariants.variants.variant,
      custom: "bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl",
    },
  },
});
```

## Accessibility

- **Keyboard Navigation**: Arrow keys navigate between options, Space selects
- **Screen Readers**: Proper ARIA roles and state announcements
- **Focus Management**: Clear visual focus indicators
- **Labels**: Proper label association with `for` attributes
- **Group Context**: Radio group role provides context to assistive technology

### ARIA Attributes

- `role="radiogroup"` - Applied to the RadioGroup container
- `role="radio"` - Applied to each RadioGroupItem
- `aria-checked` - Indicates the checked state
- `aria-disabled` - Indicates disabled state

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus to/from the radio group |
| `Arrow Keys` | Navigate between radio options |
| `Space` | Select the focused radio option |

## TypeScript

```typescript
import type {
  RadioGroupVariant,
  RadioGroupSize,
  RadioGroupItemVariant,
  RadioGroupItemSize
} from "aether-ui";

// Group variant and size types
type GroupVariant = RadioGroupVariant; // "default" | "card" | "inline"
type GroupSize = RadioGroupSize; // "sm" | "default" | "lg"

// Item variant and size types
type ItemVariant = RadioGroupItemVariant; // "default" | "card" | "inline"  
type ItemSize = RadioGroupItemSize; // "sm" | "default" | "lg"
```

## Best Practices

1. **Consistent Variants**: Use the same variant for both RadioGroup and RadioGroupItem
2. **Proper Labels**: Always provide clear, descriptive labels
3. **Logical Grouping**: Group related options together
4. **Default Selection**: Consider providing a sensible default value
5. **Validation**: Implement proper form validation for required fields
6. **Accessibility**: Test with keyboard navigation and screen readers

## Form Integration

```svelte
<script>
  import { RadioGroup, RadioGroupItem } from "aether-ui";
  
  let formData = $state({
    plan: "free",
    billing: "monthly",
    notifications: "email"
  });
  
  function handleSubmit() {
    console.log("Form data:", formData);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="space-y-6">
    <div>
      <label class="text-sm font-medium">Plan</label>
      <RadioGroup variant="card" bind:value={formData.plan}>
        <!-- options -->
      </RadioGroup>
    </div>
    
    <div>
      <label class="text-sm font-medium">Billing</label>
      <RadioGroup variant="inline" bind:value={formData.billing}>
        <!-- options -->
      </RadioGroup>
    </div>
    
    <button type="submit">Submit</button>
  </div>
</form>
```

## Common Patterns

### Multi-step Forms
Use card variant for plan selection and preference screens.

### Settings Panels  
Use default variant for configuration options.

### Quick Filters
Use inline variant for view modes and sorting options.

### Surveys
Use appropriate variant based on question complexity.

## Using RadioGroup with Field Component

The Field component provides a consistent way to add labels, descriptions, and error handling to your RadioGroup components. RadioGroup already has built-in label and description props, but Field adds additional structure and validation capabilities.

### Basic Field Usage

```svelte
<script>
  import { RadioGroup } from "aether-ui";
  import type { RadioGroupOption } from "aether-ui";
  import { Field } from "aether-ui";
  
  let selectedPlan = $state("pro");
  
  const planOptions: RadioGroupOption[] = [
    { id: "free", label: "Free Plan", value: "free", description: "$0/month" },
    { id: "pro", label: "Pro Plan", value: "pro", description: "$29/month" },
    { id: "enterprise", label: "Enterprise", value: "enterprise", description: "$99/month" },
  ];
</script>

<Field
  label="Subscription Plan"
  description="Choose the plan that fits your needs"
  required
>
  <RadioGroup 
    options={planOptions}
    bind:value={selectedPlan}
  />
</Field>
```

### With Validation

```svelte
<script>
  import { RadioGroup } from "aether-ui";
  import { FieldPrimitives } from "aether-ui";
  
  let paymentMethod = $state("");
  let error = $derived(paymentMethod === "");
  
  const paymentOptions = [
    { id: "card", label: "Credit Card", value: "card" },
    { id: "paypal", label: "PayPal", value: "paypal" },
    { id: "bank", label: "Bank Transfer", value: "bank" },
  ];
</script>

<Field
  label="Payment Method"
  description="Select your preferred payment method"
  required
  error={error ? "Please select a payment method" : undefined}
>
  <RadioGroup 
    options={paymentOptions}
    bind:value={paymentMethod}
    error={error}
  />
</Field>
```

### Card Variant with Field

```svelte
<script>
  import { RadioGroup } from "aether-ui";
  import { FieldPrimitives } from "aether-ui";
  
  let selectedPlan = $state("pro");
  
  const planOptions = [
    { 
      id: "free", 
      label: "Free Plan", 
      value: "free", 
      description: "Basic features for personal use - $0/month" 
    },
    { 
      id: "pro", 
      label: "Pro Plan", 
      value: "pro", 
      description: "Advanced features for professionals - $29/month" 
    },
    { 
      id: "enterprise", 
      label: "Enterprise", 
      value: "enterprise", 
      description: "Custom solutions for large teams - $99/month" 
    },
  ];
</script>

<Field
  label="Choose Your Plan"
  description="Select the subscription tier that best fits your needs"
>
  <RadioGroup 
    options={planOptions}
    bind:value={selectedPlan}
    isCard={true}
    variant="success"
  />
</Field>
```

### Horizontal Layout with Field

```svelte
<Field
  label="Notification Frequency"
  description="How often would you like to receive updates?"
>
  <RadioGroup 
    options={[
      { id: "realtime", label: "Real-time", value: "realtime" },
      { id: "daily", label: "Daily", value: "daily" },
      { id: "weekly", label: "Weekly", value: "weekly" },
    ]}
    orientation="horizontal"
    radioSize="lg"
  />
</Field>
```

### Multiple RadioGroups in Form

```svelte
<script>
  import { RadioGroup } from "aether-ui";
  import { FieldPrimitives,Field } from "aether-ui";
  import { Button } from "aether-ui";
  
  let formData = $state({
    plan: "pro",
    billing: "monthly",
    support: "email",
  });
  
  const planOptions = [
    { id: "free", label: "Free", value: "free", description: "$0/month" },
    { id: "pro", label: "Pro", value: "pro", description: "$29/month" },
    { id: "enterprise", label: "Enterprise", value: "enterprise", description: "$99/month" },
  ];
  
  const billingOptions = [
    { id: "monthly", label: "Monthly", value: "monthly", description: "Pay monthly" },
    { id: "yearly", label: "Yearly", value: "yearly", description: "Save 20%" },
  ];
  
  const supportOptions = [
    { id: "email", label: "Email Support", value: "email" },
    { id: "chat", label: "Live Chat", value: "chat" },
    { id: "phone", label: "Phone Support", value: "phone" },
  ];
  
  function handleSubmit() {
    console.log("Form data:", formData);
  }
</script>

<FieldPrimitives.Set>
  <FieldPrimitives.Legend>Subscription Settings</FieldPrimitives.Legend>
  <FieldPrimitives.Description>Configure your subscription preferences</FieldPrimitives.Description>
  
  <FieldPrimitives.Separator />
  
  <FieldPrimitives.Group class="gap-6">
    <Field
      label="Plan Selection"
      description="Choose your subscription tier"
      required
    >
      <RadioGroup 
        options={planOptions}
        bind:value={formData.plan}
        isCard={true}
      />
    </Field>
    
    <Field
      label="Billing Cycle"
      description="Select how you'd like to be billed"
      required
    >
      <RadioGroup 
        options={billingOptions}
        bind:value={formData.billing}
        orientation="horizontal"
        radioSize="lg"
      />
    </Field>
    
    <Field
      label="Support Channel"
      description="Preferred method for customer support"
    >
      <RadioGroup 
        options={supportOptions}
        bind:value={formData.support}
        variant="success"
      />
    </Field>
  </FieldPrimitives.Group>
  
  <div class="flex gap-4 pt-4">
    <Button onclick={handleSubmit}>Save Preferences</Button>
    <Button variant="outline" type="button">Cancel</Button>
  </div>
</FieldPrimitives.Set>
```