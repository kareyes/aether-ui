# Number Spinner Component

A fully-featured number input component with increment/decrement controls, supporting various layouts, variants, and advanced features like precision control and value constraints.

## Features

- ✅ **Multiple Layouts**: Vertical (default) and horizontal orientations
- ✅ **Variants**: Multiple visual styles (default, outline, filled, ghost)
- ✅ **Sizes**: Three size options (sm, default, lg)
- ✅ **Value Constraints**: Min/max value limits with automatic clamping
- ✅ **Step Control**: Configurable increment/decrement step size
- ✅ **Precision**: Control decimal places for floating-point values
- ✅ **Keyboard Support**: Arrow keys for increment/decrement
- ✅ **Error Handling**: Built-in error state with visual feedback
- ✅ **Field Integration**: Works seamlessly with Field component
- ✅ **Accessibility**: Full keyboard navigation and ARIA support
- ✅ **TypeScript**: Complete type safety

## Installation

The NumberSpinner component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Basic Usage

### Simple Number Spinner

```svelte
<script>
  import { NumberSpinner } from "aether-ui";
  
  let quantity = $state(1);
</script>

<NumberSpinner 
  bind:value={quantity}
  min={0}
  max={100}
/>
```

### With Constraints

```svelte
<script>
  let price = $state(9.99);
</script>

<NumberSpinner 
  bind:value={price}
  min={0}
  max={999.99}
  step={0.01}
  precision={2}
  placeholder="0.00"
/>
```

### Horizontal Layout

```svelte
<NumberSpinner 
  bind:value={quantity}
  orientation="horizontal"
  min={0}
  max={10}
/>
```

## Variants

### Default

```svelte
<NumberSpinner 
  variant="default"
  bind:value={count}
/>
```

### Outline

```svelte
<NumberSpinner 
  variant="outline"
  bind:value={count}
/>
```

### Filled

```svelte
<NumberSpinner 
  variant="filled"
  bind:value={count}
/>
```

### Ghost

```svelte
<NumberSpinner 
  variant="ghost"
  bind:value={count}
/>
```

## Sizes

```svelte
<!-- Small -->
<NumberSpinner 
  size="sm"
  bind:value={count}
/>

<!-- Default -->
<NumberSpinner 
  size="default"
  bind:value={count}
/>

<!-- Large -->
<NumberSpinner 
  size="lg"
  bind:value={count}
/>
```

## Orientations

### Vertical (Default)

```svelte
<NumberSpinner 
  orientation="vertical"
  bind:value={quantity}
/>
```

### Horizontal

```svelte
<NumberSpinner 
  orientation="horizontal"
  bind:value={quantity}
/>
```

## Advanced Features

### Precision Control

Control the number of decimal places:

```svelte
<script>
  let temperature = $state(20.5);
</script>

<NumberSpinner 
  bind:value={temperature}
  step={0.1}
  precision={1}
  min={-50}
  max={50}
/>
```

### Large Step Sizes

```svelte
<NumberSpinner 
  bind:value={count}
  step={10}
  min={0}
  max={1000}
/>
```

### Error States

```svelte
<script>
  let quantity = $state(null);
  let hasError = $derived(!quantity || quantity < 1);
</script>

<NumberSpinner 
  bind:value={quantity}
  error={hasError}
  required
  min={1}
/>
```

### With Field Component

```svelte
<script>
  import { Field } from "aether-ui";
  
  let quantity = $state(1);
</script>

<Field
  label="Quantity"
  description="Enter the number of items"
  error={quantity < 1 ? "Quantity must be at least 1" : undefined}
  required
>
  <NumberSpinner
    bind:value={quantity}
    error={quantity < 1}
    min={1}
    max={999}
  />
</Field>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | `null` | Current value (bindable) |
| `variant` | `"default" \| "outline" \| "filled" \| "ghost"` | `"default"` | Visual variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size variant |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Button layout orientation |
| `min` | `number` | `undefined` | Minimum allowed value |
| `max` | `number` | `undefined` | Maximum allowed value |
| `step` | `number` | `1` | Increment/decrement step size |
| `precision` | `number` | `undefined` | Number of decimal places |
| `disabled` | `boolean` | `false` | Disable the input |
| `required` | `boolean` | `false` | Mark as required field |
| `error` | `boolean` | `false` | Error state with visual feedback |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `class` | `string` | `undefined` | Additional CSS classes for root |
| `inputClass` | `string` | `undefined` | Additional CSS classes for input |
| `ref` | `HTMLInputElement \| null` | `null` | Reference to input element (bindable) |
| `onValueChange` | `(value: number \| null) => void` | `undefined` | Callback when value changes |
| `onError` | `(error: boolean) => void` | `undefined` | Callback when error state changes |

## Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow Up` | Increment value by step |
| `Arrow Down` | Decrement value by step |
| `Tab` | Move focus to/from the input |

## Examples

### Shopping Cart Quantity

```svelte
<script>
  let cartItems = $state([
    { id: 1, name: "Product A", quantity: 1 },
    { id: 2, name: "Product B", quantity: 2 },
  ]);
</script>

{#each cartItems as item}
  <div class="flex items-center gap-4">
    <span>{item.name}</span>
    <NumberSpinner 
      bind:value={item.quantity}
      min={1}
      max={99}
      size="sm"
    />
  </div>
{/each}
```

### Price Input

```svelte
<script>
  let price = $state(0);
</script>

<NumberSpinner 
  bind:value={price}
  min={0}
  max={9999.99}
  step={0.01}
  precision={2}
  placeholder="0.00"
  variant="outline"
  onValueChange={(val) => console.log('Price:', val)}
/>
```

### Temperature Control

```svelte
<script>
  let temperature = $state(20);
</script>

<NumberSpinner 
  bind:value={temperature}
  min={-50}
  max={50}
  step={0.5}
  precision={1}
  orientation="horizontal"
  size="lg"
/>
```

### Form Integration

```svelte
<script>
  import { Field } from "aether-ui";
  
  let age = $state(null);
  let quantity = $state(1);
  let price = $state(0);
  
  function handleSubmit() {
    console.log({ age, quantity, price });
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="space-y-4">
    <Field
      label="Age"
      description="Enter your age"
      required
    >
      <NumberSpinner
        bind:value={age}
        min={1}
        max={150}
      />
    </Field>

    <Field
      label="Quantity"
      description="Number of items"
      required
    >
      <NumberSpinner
        bind:value={quantity}
        min={1}
        max={100}
        orientation="horizontal"
      />
    </Field>

    <Field
      label="Price"
      description="Item price in USD"
      required
    >
      <NumberSpinner
        bind:value={price}
        min={0}
        max={9999.99}
        step={0.01}
        precision={2}
        variant="filled"
      />
    </Field>

    <button type="submit">Submit</button>
  </div>
</form>
```

## Accessibility

- ✅ **Keyboard Navigation**: Full support for arrow keys and tab navigation
- ✅ **ARIA Labels**: Increment/decrement buttons have descriptive labels
- ✅ **Screen Readers**: Proper announcements for value changes
- ✅ **Focus Management**: Clear visual focus indicators
- ✅ **Error States**: Proper aria-invalid attributes

### ARIA Attributes

- `aria-label` - Applied to increment/decrement buttons
- `aria-invalid` - Indicates error state
- `tabindex="-1"` - Buttons are not in tab order (input handles keyboard)

## Best Practices

1. **Set Constraints**: Always define `min` and `max` when appropriate
2. **Use Precision**: Specify `precision` for decimal values to avoid floating-point errors
3. **Appropriate Steps**: Choose step sizes that make sense for your use case
4. **Validation**: Combine with Field component for proper error messaging
5. **Accessibility**: Ensure proper labels and error messages
6. **Null Handling**: Handle `null` values appropriately in your logic

## Common Patterns

### Quantity Selector
Use vertical orientation with small size for compact quantity controls.

### Price Input
Use precision and appropriate step for currency values.

### Temperature/Measurement
Use horizontal orientation with decimal precision for scientific values.

### Age/Year Input
Use integer values with reasonable min/max constraints.

## Browser Support

Works in all modern browsers with full accessibility support.

## Using NumberSpinner with Field Component

The Field component provides a consistent way to add labels, descriptions, and error handling to your NumberSpinner components.

### Basic Field Usage

```svelte
<script>
  import { NumberSpinner } from "aether-ui";
  import { Field } from "aether-ui";
  
  let quantity = $state(1);
</script>

<Field
  label="Quantity"
  description="Select the number of items"
>
  <NumberSpinner
    bind:value={quantity}
    min={1}
    max={100}
  />
</Field>
```

### With Validation

```svelte
<script>
  import { NumberSpinner } from "aether-ui";
  import { Field } from "aether-ui";
  
  let age = $state(null);
  let error = $derived(age === null || age < 18);
</script>

<Field
  label="Age"
  description="You must be 18 or older"
  required
  error={error ? "You must be at least 18 years old" : undefined}
>
  <NumberSpinner
    bind:value={age}
    min={0}
    max={120}
    placeholder="Enter age"
    error={error}
  />
</Field>
```

### Price Input with Field

```svelte
<script>
  import { NumberSpinner } from "aether-ui";
  import { Field } from "aether-ui";
  
  let price = $state(9.99);
</script>

<Field
  label="Product Price"
  description="Set the price in USD"
  required
>
  <NumberSpinner
    bind:value={price}
    min={0}
    max={9999.99}
    step={0.01}
    precision={2}
    variant="outline"
    size="lg"
  />
</Field>
```

### Horizontal Layout with Field

```svelte
<Field
  label="Temperature"
  description="Set temperature in Celsius"
>
  <NumberSpinner
    bind:value={temperature}
    min={-50}
    max={50}
    step={0.5}
    precision={1}
    orientation="horizontal"
    variant="filled"
  />
</Field>
```

### Different Variants with Field

```svelte
<Field
  label="Stock Quantity"
  description="Available inventory"
>
  <NumberSpinner
    variant="filled"
    size="lg"
    bind:value={stock}
    min={0}
    max={10000}
  />
</Field>

<Field
  label="Discount Percentage"
  description="Enter discount value"
>
  <NumberSpinner
    variant="ghost"
    bind:value={discount}
    min={0}
    max={100}
    step={5}
  />
</Field>
```

### Complete Product Form

```svelte
<script>
  import { NumberSpinner, Button, FieldPrimitives , Field} from "aether-ui";
  
  let formData = $state({
    price: 29.99,
    quantity: 1,
    discount: 0,
    weight: 1.5,
  });
  
  let priceError = $derived(
    formData.price === null || formData.price <= 0
      ? "Price must be greater than 0"
      : undefined
  );
  
  let quantityError = $derived(
    formData.quantity === null || formData.quantity < 1
      ? "Quantity must be at least 1"
      : undefined
  );
  
  function handleSubmit() {
    if (!priceError && !quantityError) {
      console.log("Product data:", formData);
    }
  }
</script>

<div class="w-full max-w-md">
  <FieldPrimitives.Set>
    <FieldPrimitives.Legend>Product Details</FieldPrimitives.Legend>
    <FieldPrimitives.Description>Configure product pricing and inventory</FieldPrimitives.Description>

    <FieldPrimitives.Separator />

    <FieldPrimitives.Group class="gap-4">
      <Field
        label="Price (USD)"
        description="Set the product price"
        required
        error={priceError}
      >
        <NumberSpinner
          bind:value={formData.price}
          min={0}
          max={9999.99}
          step={0.01}
          precision={2}
          variant="outline"
          size="lg"
          error={!!priceError}
        />
      </Field>

      <Field
        label="Quantity"
        description="Available stock quantity"
        required
        error={quantityError}
      >
        <NumberSpinner
          bind:value={formData.quantity}
          min={1}
          max={10000}
          variant="filled"
          error={!!quantityError}
        />
      </Field>

      <Field
        label="Discount (%)"
        description="Optional discount percentage"
      >
        <NumberSpinner
          bind:value={formData.discount}
          min={0}
          max={100}
          step={5}
          orientation="horizontal"
        />
      </Field>

      <Field
        label="Weight (kg)"
        description="Product weight for shipping"
      >
        <NumberSpinner
          bind:value={formData.weight}
          min={0}
          max={1000}
          step={0.1}
          precision={1}
          variant="ghost"
        />
      </Field>
    </FieldPrimitives.Group>

    <div class="flex gap-4 pt-4">
      <Button
        onclick={handleSubmit}
        disabled={!!priceError || !!quantityError}
      >
        Save Product
      </Button>
      <Button variant="outline" type="button">
        Cancel
      </Button>
    </div>
  </FieldPrimitives.Set>
</div>
```
