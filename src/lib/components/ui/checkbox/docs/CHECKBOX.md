# Enhanced Checkbox Component

A powerful checkbox component with multiple sizes, variants, labels, descriptions, and line-through functionality.

## Features

- ✅ **Multiple Sizes**: sm, default, lg, xl
- ✅ **Color Variants**: default, destructive, success, warning
- ✅ **Labels & Descriptions**: Built-in label and description support
- ✅ **Line Through**: Strike-through text when checked (great for todo lists)
- ✅ **Indeterminate State**: Partial selection support
- ✅ **Full Accessibility**: Proper ARIA attributes and keyboard navigation
- ✅ **TypeScript Support**: Complete type definitions

## Basic Usage

### Simple Checkbox
```svelte
<script>
  let checked = $state(false);
</script>

<Checkbox bind:checked />
```

### With Label
```svelte
<Checkbox 
  bind:checked 
  label="Accept terms and conditions" 
/>
```

### With Label and Description
```svelte
<Checkbox 
  bind:checked 
  label="Enable notifications"
  description="Get notified about updates and new features"
/>
```

## Sizes

Available sizes: `sm`, `default`, `lg`, `xl`

```svelte
<Checkbox size="sm" label="Small" />
<Checkbox size="default" label="Default" />
<Checkbox size="lg" label="Large" />
<Checkbox size="xl" label="Extra Large" />
```

## Variants

Available variants: `default`, `destructive`, `success`, `warning`

```svelte
<Checkbox 
  variant="destructive" 
  label="Delete all data"
  description="This action cannot be undone"
/>

<Checkbox 
  variant="success" 
  label="Mark as completed"
/>

<Checkbox 
  variant="warning" 
  label="Proceed with caution"
/>
```

## Line Through Feature

Perfect for todo lists and task management:

```svelte
<Checkbox 
  bind:checked 
  lineThrough={true}
  label="Complete project setup"
  description="Set up development environment"
/>
```

When `lineThrough` is `true` and the checkbox is checked:
- Label text gets `line-through` decoration
- Text color changes to muted
- Description also gets line-through effect

## Indeterminate State

For partial selections (like "select all" checkboxes):

```svelte
<script>
  let indeterminate = $state(true);
</script>

<Checkbox 
  bind:indeterminate 
  label="Select all items"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checkbox checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate state (partial selection) |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Checkbox size |
| `variant` | `'default' \| 'destructive' \| 'success' \| 'warning'` | `'default'` | Color variant |
| `label` | `string` | `undefined` | Label text |
| `description` | `string` | `undefined` | Description text |
| `lineThrough` | `boolean` | `false` | Strike through text when checked |
| `disabled` | `boolean` | `false` | Disable the checkbox |
| `class` | `string` | `undefined` | Additional CSS classes |

## Examples

### Todo List
```svelte
<script>
  let todos = $state([
    { id: 1, text: "Setup project", completed: true },
    { id: 2, text: "Design components", completed: false },
    { id: 3, text: "Write tests", completed: false },
  ]);
</script>

{#each todos as todo (todo.id)}
  <Checkbox 
    bind:checked={todo.completed}
    label={todo.text}
    lineThrough={true}
  />
{/each}
```

### Form with Validation
```svelte
<script>
  let acceptTerms = $state(false);
  let newsletter = $state(false);
</script>

<div class="space-y-4">
  <Checkbox 
    bind:checked={acceptTerms}
    variant={acceptTerms ? "success" : "destructive"}
    label="I accept the terms and conditions"
    description="Required to create an account"
  />
  
  <Checkbox 
    bind:checked={newsletter}
    label="Subscribe to newsletter"
    description="Get weekly updates about new features"
  />
</div>
```

### Settings Panel
```svelte
<script>
  let settings = $state({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });
</script>

<div class="space-y-6">
  <Checkbox 
    bind:checked={settings.notifications}
    size="lg"
    label="Push Notifications"
    description="Receive notifications on your device"
  />
  
  <Checkbox 
    bind:checked={settings.darkMode}
    size="lg"
    label="Dark Mode"
    description="Use dark theme across the application"
  />
  
  <Checkbox 
    bind:checked={settings.autoSave}
    size="lg"
    variant="success"
    label="Auto Save"
    description="Automatically save your work every 30 seconds"
  />
</div>
```

## Styling

The component uses Tailwind variants for consistent styling:

### Size Classes
- `sm`: 12px (size-3)
- `default`: 16px (size-4) 
- `lg`: 20px (size-5)
- `xl`: 24px (size-6)

### Variant Colors
- `default`: Primary color scheme
- `destructive`: Red color scheme for dangerous actions
- `success`: Green color scheme for positive actions  
- `warning`: Yellow color scheme for cautionary actions

## Accessibility

- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader compatible
- ✅ High contrast support
- ✅ Disabled state handling

## Browser Support

Works in all modern browsers with full feature support.

## Using Checkbox with Field Component

The Field component provides a consistent way to add labels, descriptions, and error handling to your Checkbox components. Note that Checkbox already has built-in label and description props, so Field is most useful for grouping multiple checkboxes or when you need the advanced Field features.

### Basic Field Usage

```svelte
<script>
  import { Checkbox } from "aether-ui";
  import { Field } from "aether-ui";
  
  let acceptTerms = $state(false);
</script>

<Field
  label="Agreements"
  description="Please review and accept our policies"
  required
>
  <Checkbox 
    bind:checked={acceptTerms}
    label="I accept the terms and conditions"
  />
</Field>
```

### Checkbox Group with Field

```svelte
<script>
  import { Checkbox } from "aether-ui";
  import { FieldPrimitives } from "aether-ui";
  
  let notifications = $state(false);
  let marketing = $state(false);
  let updates = $state(false);
</script>

<FieldPrimitives.Set>
  <FieldPrimitives.Legend>Email Preferences</FieldPrimitives.Legend>
  <FieldPrimitives.Description>Choose which emails you'd like to receive</FieldPrimitives.Description>
  
  <FieldPrimitives.Separator />
  
  <FieldPrimitives.Group class="gap-4">
    <Checkbox 
      bind:checked={notifications}
      label="Notifications"
      description="Receive notifications about account activity"
    />
    
    <Checkbox 
      bind:checked={marketing}
      label="Marketing Emails"
      description="Get updates about new products and features"
    />
    
    <Checkbox 
      bind:checked={updates}
      label="Product Updates"
      description="Stay informed about product improvements"
    />
  </FieldPrimitives.Group>
</FieldPrimitives.Set>
```

### With Error State

```svelte
<script>
  import { Checkbox } from "aether-ui";
  import { FieldPrimitives } from "aether-ui";
  
  let acceptTerms = $state(false);
  let error = $derived(!acceptTerms);
</script>

<Field
  label="Terms & Conditions"
  required
  error={error ? "You must accept the terms to continue" : undefined}
>
  <Checkbox 
    bind:checked={acceptTerms}
    label="I accept the terms and conditions"
    variant={error ? "destructive" : "default"}
  />
</Field>
```

### Multiple Checkboxes with Variants

```svelte
<script>
  import { Checkbox } from "aether-ui";
  import { FieldPrimitives } from "aether-ui";
  
  let tasks = $state({
    design: false,
    development: false,
    testing: false,
    deployment: true,
  });
</script>

<FieldPrimitives.Set>
  <FieldPrimitives.Legend>Project Checklist</FieldPrimitives.Legend>
  <FieldPrimitives.Description>Track your project progress</FieldPrimitives.Description>
  
  <FieldPrimitives.Separator />
  
  <FieldPrimitives.Group class="gap-4">
    <Checkbox 
      bind:checked={tasks.design}
      label="Complete Design"
      description="UI/UX design and mockups"
      lineThrough={true}
      variant="default"
    />
    
    <Checkbox 
      bind:checked={tasks.development}
      label="Development Phase"
      description="Code implementation"
      lineThrough={true}
      variant="default"
    />
    
    <Checkbox 
      bind:checked={tasks.testing}
      label="Testing & QA"
      description="Quality assurance testing"
      lineThrough={true}
      variant="warning"
    />
    
    <Checkbox 
      bind:checked={tasks.deployment}
      label="Deployment"
      description="Deploy to production"
      lineThrough={true}
      variant="success"
    />
  </FieldPrimitives.Group>
</FieldPrimitives.Set>
```

### Complete Form with Field

```svelte
<script>
  import { Checkbox } from "aether-ui";
  import { FieldPrimitives } from "aether-ui";
  import { Button } from "aether-ui";
  
  let formData = $state({
    acceptTerms: false,
    ageConfirmation: false,
    newsletter: false,
    updates: false,
  });
  
  let hasError = $derived(!formData.acceptTerms || !formData.ageConfirmation);
  
  function handleSubmit() {
    if (!hasError) {
      console.log("Form submitted:", formData);
    }
  }
</script>

<div class="w-full max-w-md space-y-6">
  <FieldPrimitives.Set>
    <FieldPrimitives.Legend>Account Setup</FieldPrimitives.Legend>
    <FieldPrimitives.Description>Complete your account registration</FieldPrimitives.Description>
    
    <FieldPrimitives.Separator />
    
    <FieldPrimitives.Group class="gap-4">
      <Field
        label="Required Agreements"
        required
        error={!formData.acceptTerms ? "You must accept the terms" : undefined}
      >
        <Checkbox 
          bind:checked={formData.acceptTerms}
          label="I accept the terms and conditions"
          variant={!formData.acceptTerms ? "destructive" : "success"}
          size="lg"
        />
      </Field>
      
      <Field
        label="Age Verification"
        required
        error={!formData.ageConfirmation ? "Age confirmation required" : undefined}
      >
        <Checkbox 
          bind:checked={formData.ageConfirmation}
          label="I confirm I am 18 years or older"
          variant={!formData.ageConfirmation ? "destructive" : "success"}
          size="lg"
        />
      </Field>
      
      <Field
        label="Optional Subscriptions"
        description="Choose which communications you'd like to receive"
      >
        <div class="space-y-2">
          <Checkbox 
            bind:checked={formData.newsletter}
            label="Subscribe to newsletter"
            description="Weekly updates and tips"
          />
          
          <Checkbox 
            bind:checked={formData.updates}
            label="Product updates"
            description="New features and improvements"
          />
        </div>
      </Field>
    </FieldPrimitives.Group>
    
    <div class="flex gap-4 pt-4">
      <Button onclick={handleSubmit} disabled={hasError}>
        Create Account
      </Button>
      <Button variant="outline" type="button">
        Cancel
      </Button>
    </div>
  </FieldPrimitives.Set>
</div>
```