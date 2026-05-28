# Field Component

A comprehensive form field wrapper component that combines labels, descriptions, error messages, and form controls into a unified, accessible interface.

## Features

- 🎯 **Unified API**: Consistent interface for all form components
- 🔄 **Auto-Layout**: Vertical, horizontal, and responsive orientations
- ✅ **Validation**: Built-in error state handling with visual feedback
- ♿ **Accessible**: Automatic ARIA attributes and semantic HTML
- 🎨 **Flexible**: Works with Input, Textarea, Checkbox, Switch, Select, RadioGroup, Slider, and more
- 🎭 **Type-Safe**: Full TypeScript support
- 🔀 **Label Positioning**: Control label placement (before/after) for optimal UX

## Installation

The Field component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Basic Usage

### Simple Field (Recommended)

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { Input } from "aether-ui";

  let email = $state('');
</script>

<Field label="Email" description="Enter your email address">
  <Input type="email" bind:value={email} placeholder="you@example.com" />
</Field>
```

### Composable Field (Advanced)

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { Input } from "aether-ui";

  let email = $state('');
</script>

<FieldPrimitives.Root>
  <FieldPrimitives.Label>Email</FieldPrimitives.Label>
  <FieldPrimitives.Description>Enter your email address</FieldPrimitives.Description>
  <Input type="email" bind:value={email} placeholder="you@example.com" />
</FieldPrimitives.Root>
```


## API Reference

### Field Props

Simplified component that wraps all field functionality:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Field label text |
| `description` | `string?` | - | Helper text displayed below the field |
| `error` | `string?` | - | Error message (replaces description when present) |
| `required` | `boolean` | `false` | Shows required asterisk (*) next to label |
| `disabled` | `boolean` | `false` | Disables the field and applies disabled styling |
| `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` | Layout orientation |
| `labelPosition` | `"before" \| "after"` | `"before"` | Position of label relative to control (useful for Checkbox, Switch) |
| `class` | `string?` | - | Additional CSS classes for the root element |
| `children` | `Snippet` | required | The form control to render |
| `beforeLabel` | `Snippet?` | - | Optional content before the label (for horizontal layouts) |

### Component Exports

The Field component provides both a simplified API and composable parts:

```typescript
import { FieldPrimitives } from "aether-ui";

// Simplified wrapper component
Field

// Composable parts
FieldPrimitives.Root        // Container with orientation support
FieldPrimitives.Set         // Fieldset wrapper for grouped fields
FieldPrimitives.Legend      // Legend for fieldset
FieldPrimitives.Group       // Groups multiple fields together
FieldPrimitives.Content     // Content wrapper for horizontal layouts
FieldPrimitives.Label       // Label element
FieldPrimitives.Title       // Title element (alternative to Label)
FieldPrimitives.Description // Description/helper text
FieldPrimitives.Separator   // Visual separator
FieldPrimitives.Error       // Error message display
```

## Complete Implementation Guide

### Input Components

#### Text Input

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { Input } from "aether-ui";

  let username = $state('');
  let errors = $state<Record<string, string>>({});
</script>

<!-- Basic Input -->
<Field 
  label="Username" 
  description="Choose a unique username for your account."
  required
  error={errors.username}
>
  <Input 
    bind:value={username} 
    placeholder="johndoe" 
    error={!!errors.username}
  />
</Field>

<!-- Input with Error State -->
<Field
  label="Email"
  error="Please enter a valid email address"
  required
>
  <Input type="email" error={true} placeholder="you@example.com" />
</Field>

<!-- Disabled Input -->
<Field 
  label="Email" 
  description="Email cannot be changed" 
  disabled
>
  <Input type="email" value="locked@example.com" disabled />
</Field>
```

#### Textarea

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { Textarea } from "aether-ui";

  let bio = $state('');
</script>

<!-- Basic Textarea -->
<Field 
  label="Bio" 
  description="Tell us a little about yourself."
>
  <Textarea 
    bind:value={bio} 
    placeholder="I am a..." 
    rows={4} 
  />
</Field>

<!-- Textarea with Character Counter -->
<Field 
  label="Description" 
  description="Maximum 200 characters"
>
  <Textarea 
    bind:value={bio} 
    placeholder="Enter your text..." 
    maxLength={200} 
    showCount 
  />
</Field>

<!-- Auto-Resize Textarea -->
<Field 
  label="Notes" 
  description="Automatically grows with content"
>
  <Textarea 
    placeholder="Start typing..." 
    autoResize 
    minRows={2} 
    maxRows={6} 
  />
</Field>
```

### Selection Components

#### Select

**Important**: Use the new simplified Select component API:

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { Select } from "aether-ui";

  let country = $state('');
  
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
  ];
</script>

<!-- Basic Select -->
<Field
  label="Country"
  description="Select your country of residence."
  required
>
  <Select 
    bind:value={country} 
    placeholder="Select a country..." 
    options={countries} 
  />
</Field>

<!-- Select with Error -->
<Field
  label="Country"
  error="Please select a country"
  required
>
  <Select 
    bind:value={country} 
    placeholder="Select a country..." 
    options={countries}
    error={true}
  />
</Field>
```

#### CheckboxGroup

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { CheckboxGroup } from "aether-ui";
  import type { CheckboxGroupOption } from "aether-ui";

  let selectedFeatures = $state<string[]>([]);
  
  const featureOptions: CheckboxGroupOption[] = [
    { 
      id: 'feature-api', 
      label: 'API Access', 
      value: 'api', 
      description: 'Access to REST API' 
    },
    { 
      id: 'feature-analytics', 
      label: 'Analytics Dashboard', 
      value: 'analytics', 
      description: 'View detailed analytics' 
    },
    { 
      id: 'feature-export', 
      label: 'Data Export', 
      value: 'export', 
      description: 'Export data to CSV/JSON' 
    },
  ];
</script>

<!-- Basic CheckboxGroup -->
<Field
  label="Select Features"
  description="Choose the features you want to enable for your account."
>
  <CheckboxGroup 
    options={featureOptions} 
    bind:values={selectedFeatures} 
  />
</Field>

<!-- CheckboxGroup with Horizontal Layout -->
<Field
  label="Interests"
  description="Select your areas of interest"
>
  <CheckboxGroup 
    options={featureOptions} 
    bind:values={selectedFeatures}
    orientation="horizontal"
  />
</Field>

<!-- CheckboxGroup with Error -->
<Field
  label="User Permissions"
  description="Select at least one permission to continue."
  required
  error={selectedFeatures.length === 0 ? "Please select at least one permission" : undefined}
>
  <CheckboxGroup 
    options={featureOptions} 
    bind:values={selectedFeatures}
    error={selectedFeatures.length === 0}
    required
  />
</Field>
```

#### RadioGroup

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { RadioGroup } from "aether-ui";
  import type { RadioGroupOption } from "aether-ui";

  let selectedPlan = $state('basic');
  
  const planOptions: RadioGroupOption[] = [
    { 
      id: 'plan-free', 
      label: 'Free Plan', 
      value: 'free', 
      description: 'Basic features for personal use - $0/month' 
    },
    { 
      id: 'plan-basic', 
      label: 'Basic Plan', 
      value: 'basic', 
      description: 'Essential features for small teams - $9/month' 
    },
    { 
      id: 'plan-pro', 
      label: 'Pro Plan', 
      value: 'pro', 
      description: 'Advanced features for professionals - $29/month' 
    },
  ];
</script>

<!-- Basic RadioGroup -->
<Field
  label="Choose Your Plan"
  description="Select the subscription plan that best fits your needs."
>
  <RadioGroup 
    options={planOptions} 
    bind:value={selectedPlan} 
  />
</Field>

<!-- RadioGroup with Horizontal Layout -->
<Field
  label="Notification Method"
  description="How would you like to be notified?"
>
  <RadioGroup 
    options={planOptions} 
    bind:value={selectedPlan}
    orientation="horizontal"
  />
</Field>

<!-- RadioGroup with Card Style -->
<Field
  label="Select Cluster Type"
  description="Choose how you want to run your GPU workloads."
>
  <RadioGroup 
    options={planOptions} 
    bind:value={selectedPlan}
    isCard={true}
  />
</Field>

<!-- RadioGroup with Error -->
<Field
  label="Payment Method"
  description="Select your preferred payment method."
  required
  error={!selectedPlan ? "Please select a payment method" : undefined}
>
  <RadioGroup 
    options={planOptions} 
    bind:value={selectedPlan}
    error={!selectedPlan}
    required
  />
</Field>
```

### Toggle Components

#### Checkbox

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { Checkbox } from "aether-ui";

  let acceptTerms = $state(false);
</script>

<!-- Horizontal Checkbox (Recommended) -->
<Field
  label="Accept terms and conditions"
  description="You must accept to continue"
  orientation="horizontal"
>
  <Checkbox bind:checked={acceptTerms} />
</Field>

<!-- Checkbox with Label After -->
<Field
  label="Subscribe to newsletter"
  description="Receive weekly updates and news"
  labelPosition="after"
  orientation="horizontal"
>
  <Checkbox bind:checked={acceptTerms} />
</Field>

<!-- Vertical Checkbox -->
<Field
  label="Marketing emails"
  description="Receive promotional emails and updates"
  orientation="vertical"
>
  <Checkbox bind:checked={acceptTerms} />
</Field>
```

#### Switch

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { Switch } from "aether-ui";

  let notifications = $state(true);
</script>

<!-- Horizontal Switch (Recommended) -->
<Field
  label="Enable notifications"
  description="Get notified about important updates."
  orientation="horizontal"
>
  <Switch bind:checked={notifications} />
</Field>

<!-- Switch with Label After -->
<Field
  label="Dark mode"
  description="Toggle dark mode theme"
  labelPosition="after"
  orientation="horizontal"
>
  <Switch bind:checked={notifications} />
</Field>

<!-- Disabled Switch -->
<Field
  label="Beta features"
  description="Not available in your plan"
  disabled
  orientation="horizontal"
>
  <Switch checked={false} disabled />
</Field>
```

### Specialized Input Components

#### InputOTP

**Important**: Use the new simplified InputOTP component API:

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { InputOTP } from "aether-ui";

  let otpCode = $state('');
</script>

<!-- Basic InputOTP -->
<Field
  label="Verification Code"
  description="Enter the 6-digit code sent to your email"
>
  <InputOTP maxlength={6} groups={2} bind:value={otpCode} />
</Field>

<!-- InputOTP for PIN -->
<Field
  label="PIN Code"
  description="Enter your 4-digit PIN"
  required
>
  <InputOTP maxlength={4} groups={2} />
</Field>
```

#### NumberSpinner

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { NumberSpinner } from "aether-ui";

  let quantity = $state(1);
</script>

<!-- Basic NumberSpinner -->
<Field
  label="Quantity"
  description="Select the number of items"
>
  <NumberSpinner bind:value={quantity} min={1} max={100} />
</Field>

<!-- NumberSpinner with Step -->
<Field
  label="Amount"
  description="Increments of $10"
>
  <NumberSpinner bind:value={quantity} min={0} max={1000} step={10} />
</Field>

<!-- Required NumberSpinner -->
<Field
  label="Age"
  description="Your age in years"
  required
>
  <NumberSpinner value={25} min={18} max={120} />
</Field>
```

#### Slider

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { Slider } from "aether-ui";

  let volume = $state(50);
  let priceRange = $state([100, 500]);
</script>

<!-- Single Value Slider -->
<Field
  label="Volume"
  description={`Current volume: ${volume}%`}
>
  <Slider type="single" bind:value={volume} min={0} max={100} step={1} />
</Field>

<!-- Range Slider -->
<Field
  label="Price Range"
  description={`$${priceRange[0]} - $${priceRange[1]}`}
>
  <Slider type="multiple" bind:value={priceRange} min={0} max={1000} step={10} />
</Field>
```

#### FileInput

**Important**: Use the new simplified FileInput component API:

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { FileInput } from "aether-ui";

  let uploadedFiles = $state<File[]>([]);
</script>

<!-- Regular File Input -->
<Field
  label="Upload Document"
  description="PDF or Word document (max 5MB)"
>
  <FileInput 
    mode="regular" 
    validation={{ 
      maxFiles: 3,
      acceptedTypes: ['.doc', '.docx', '.txt'] 
    }}
  />
</Field>

<!-- Drag & Drop File Input -->
<Field
  label="Upload Images"
  description="Drag and drop or click to browse"
>
  <FileInput 
    mode="drag-drop" 
    validation={{ 
      maxSize: 10 * 1024 * 1024, 
      acceptedTypes: ['image/*', '.pdf'],
    }} 
    dragDropProps={{
      label: "Drop images or PDFs here",
      description: "Max 10MB per file",
      showFileList: true
    }}
  />
</Field>

<!-- File Input with Error -->
<Field 
  label="Upload document" 
  error="File size exceeds 5MB limit"
>
  <FileInput 
    mode="regular" 
    validation={{ 
      maxSize: 5 * 1024 * 1024, 
      acceptedTypes: ['application/pdf'] 
    }}  
  />
</Field>
```

#### DatePicker

```svelte
<script lang="ts">
  import { Field } from "aether-ui";
  import { DatePicker } from "aether-ui";
  import type { DateValue } from '@internationalized/date';

  let deliveryDate = $state<DateValue | undefined>(undefined);
</script>

<!-- Basic DatePicker -->
<Field
  label="Date of Birth"
  description="Select your birth date"
>
  <DatePicker />
</Field>

<!-- DatePicker with Binding -->
<Field
  label="Delivery Date"
  description="Choose your preferred delivery date"
  required
>
  <DatePicker bind:value={deliveryDate} />
</Field>
```


## Field Orientations

The `orientation` prop controls the layout of the field components.

### Vertical Layout (Default)

Best for most form fields. Stacks label, control, and description vertically.

```svelte
<Field 
  label="Full Name" 
  description="Enter your full legal name" 
  orientation="vertical"
>
  <Input placeholder="John Doe" />
</Field>
```

### Horizontal Layout

Places label and control side by side. Ideal for Checkbox, Switch, and compact forms.

```svelte
<Field 
  label="Enable notifications" 
  description="Receive email updates" 
  orientation="horizontal"
>
  <Switch bind:checked={notifications} />
</Field>
```

### Responsive Layout

Automatically switches between vertical (mobile) and horizontal (desktop) based on container width. Requires a container query container.

```svelte
<div class="@container">
  <Field 
    label="Name" 
    description="Enter your full name" 
    orientation="responsive"
  >
    <Input placeholder="John Doe" />
  </Field>
</div>
```

## Label Position

The `labelPosition` prop controls whether the label appears before or after the form control. This is particularly useful for Checkbox and Switch components where the control typically appears before the label.

### Label Before (Default)

Default behavior where the label appears above or to the left of the control.

```svelte
<Field 
  label="Email" 
  description="Enter your email address" 
  labelPosition="before"
>
  <Input type="email" placeholder="you@example.com" />
</Field>
```

### Label After

Position the label after the form control. Best practice for Checkbox, Switch, and Radio components.

```svelte
<script lang="ts">
  import { Field } from "aether-ui";
  import { Checkbox } from "aether-ui";
  import { Switch } from "aether-ui";

  let acceptTerms = $state(false);
  let enableNotifications = $state(false);
</script>

<!-- Checkbox with label after -->
<Field
  label="Accept terms and conditions"
  description="You must accept to continue"
  labelPosition="after"
  orientation="horizontal"
>
  <Checkbox bind:checked={acceptTerms} />
</Field>

<!-- Switch with label after -->
<Field
  label="Enable notifications"
  description="Receive email updates"
  labelPosition="after"
  orientation="horizontal"
>
  <Switch bind:checked={enableNotifications} />
</Field>
```

### When to Use Label After

**Use `labelPosition="after"` for:**
- ✅ Checkbox controls
- ✅ Switch/Toggle controls  
- ✅ Radio buttons (in some designs)
- ✅ Any control where the interactive element should appear first

**Use `labelPosition="before"` (default) for:**
- ✅ Text inputs
- ✅ Textareas
- ✅ Select dropdowns
- ✅ Date pickers
- ✅ Number inputs
- ✅ File uploads
- ✅ Most standard form controls

### Label Position Examples

```svelte
<script lang="ts">
  import { Field } from "aether-ui";
  import { Checkbox } from "aether-ui";
  import { Switch } from "aether-ui";

  let newsletter = $state(false);
  let marketing = $state(false);
  let darkMode = $state(false);
</script>

<div class="space-y-4">
  <!-- Multiple checkboxes with label after -->
  <Field
    label="Subscribe to newsletter"
    description="Receive weekly updates and news"
    labelPosition="after"
    orientation="horizontal"
  >
    <Checkbox bind:checked={newsletter} />
  </Field>

  <Field
    label="Receive marketing emails"
    description="Promotional offers and discounts"
    labelPosition="after"
    orientation="horizontal"
  >
    <Checkbox bind:checked={marketing} />
  </Field>

  <!-- Switch with label after -->
  <Field
    label="Dark mode"
    description="Toggle dark mode theme"
    labelPosition="after"
    orientation="horizontal"
  >
    <Switch bind:checked={darkMode} />
  </Field>
</div>
```

## Form Structure Components

### FieldPrimitives.Set and FieldPrimitives.Group

Use `FieldPrimitives.Set` and `FieldPrimitives.Group` to create well-organized, semantically correct forms.

```svelte
<script lang="ts">
  import { FieldPrimitives ,Field} from "aether-ui";
  import { Input } from "aether-ui";
  import { Checkbox } from "aether-ui";
  import { Select } from "aether-ui";

  let formData = $state({
    username: '',
    email: '',
    country: '',
    newsletter: false,
  });

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ];
</script>

<form>
  <!-- Fieldset for grouping related fields -->
  <FieldPrimitives.Set>
    <FieldPrimitives.Legend>Account Information</FieldPrimitives.Legend>
    <FieldPrimitives.Description>
      Create your account by filling out the information below.
    </FieldPrimitives.Description>

    <!-- Visual separator -->
    <FieldPrimitives.Separator />

    <!-- Group of fields with consistent spacing -->
    <FieldPrimitives.Group class="gap-6">
      <Field
        label="Username"
        description="Choose a unique username for your account."
        required
      >
        <Input bind:value={formData.username} placeholder="johndoe" />
      </Field>

      <Field
        label="Email"
        description="We'll never share your email with anyone."
        required
      >
        <Input type="email" bind:value={formData.email} placeholder="you@example.com" />
      </Field>

      <Field
        label="Country"
        description="Select your country of residence."
        required
      >
        <Select bind:value={formData.country} placeholder="Select a country..." options={countries} />
      </Field>
    </FieldPrimitives.Group>
  </FieldPrimitives.Set>

  <FieldPrimitives.Set>
    <FieldPrimitives.Legend>Preferences</FieldPrimitives.Legend>

    <FieldPrimitives.Group class="gap-4">
      <Field
        label="Newsletter subscription"
        description="Receive weekly updates about new features."
        orientation="horizontal"
      >
        <Checkbox bind:checked={formData.newsletter} />
      </Field>
    </FieldPrimitives.Group>
  </FieldPrimitives.Set>
</form>
```

## Complete Form Examples

### Account Creation Form

```svelte
<script lang="ts">
  import { FieldPrimitives,Field } from "aether-ui";
  import { Input } from "aether-ui";
  import { Textarea } from "aether-ui";
  import { Select } from "aether-ui";
  import { Checkbox } from "aether-ui";
  import { Switch } from "aether-ui";
  import { Button } from "aether-ui";

  let formData = $state({
    username: '',
    email: '',
    password: '',
    bio: '',
    country: '',
    newsletter: false,
    notifications: true,
  });

  let errors = $state<Record<string, string>>({});

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ];

  function handleSubmit(event: Event) {
    event.preventDefault();
    errors = {};

    // Validation
    if (!formData.username) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!formData.country) {
      errors.country = "Please select a country";
    }

    // Submit if no errors
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
    }
  }
</script>

<form onsubmit={handleSubmit} class="rounded-lg border bg-card p-6">
  <FieldPrimitives.Set>
    <FieldPrimitives.Legend>Account Information</FieldPrimitives.Legend>
    <FieldPrimitives.Description>
      Create your account by filling out the information below.
    </FieldPrimitives.Description>

    <FieldPrimitives.Separator />

    <FieldPrimitives.Group class="gap-6">
      <Field
        label="Username"
        description="Choose a unique username for your account."
        required
        error={errors.username}
      >
        <Input 
          bind:value={formData.username} 
          placeholder="johndoe" 
          error={!!errors.username}
          required 
        />
      </Field>

      <Field
        label="Email"
        description="We'll never share your email with anyone."
        required
        error={errors.email}
      >
        <Input 
          type="email" 
          bind:value={formData.email} 
          placeholder="you@example.com" 
          error={!!errors.email}
          required 
        />
      </Field>

      <Field
        label="Password"
        description="Must be at least 8 characters long."
        required
        error={errors.password}
      >
        <Input 
          type="password" 
          bind:value={formData.password} 
          placeholder="••••••••" 
          error={!!errors.password}
          required 
        />
      </Field>

      <Field 
        label="Bio" 
        description="Tell us a little about yourself."
      >
        <Textarea
          bind:value={formData.bio}
          placeholder="I am a..."
          rows={4}
        />
      </Field>

      <Field
        label="Country"
        description="Select your country of residence."
        required
        error={errors.country}
      >
        <Select 
          bind:value={formData.country} 
          placeholder="Select a country..." 
          options={countries} 
          error={!!errors.country} 
        />
      </Field>
    </FieldPrimitives.Group>
  </FieldPrimitives.Set>

  <FieldPrimitives.Set>
    <FieldPrimitives.Legend>Preferences</FieldPrimitives.Legend>

    <FieldPrimitives.Group class="gap-4">
      <Field
        label="Newsletter subscription"
        description="Receive weekly updates about new features."
        orientation="horizontal"
      >
        <Checkbox bind:checked={formData.newsletter} />
      </Field>

      <Field
        label="Enable notifications"
        description="Get notified about important updates."
        orientation="horizontal"
      >
        <Switch bind:checked={formData.notifications} />
      </Field>
    </FieldPrimitives.Group>
  </FieldPrimitives.Set>

  <div class="flex gap-4 pt-4">
    <Button type="submit">Submit</Button>
    <Button type="button" variant="outline">Reset</Button>
  </div>
</form>
```

### Order Form with Advanced Components

```svelte
<script lang="ts">
  import { FieldPrimitives, Field } from "aether-ui";
  import { NumberSpinner } from "aether-ui";
  import { DatePicker } from "aether-ui";
  import { Slider } from "aether-ui";
  import { InputOTP } from "aether-ui";
  import { FileInput } from "aether-ui";
  import { Switch } from "aether-ui";
  import { Button } from "aether-ui";
  import type { DateValue } from '@internationalized/date';

  let orderData = $state({
    quantity: 1,
    deliveryDate: undefined as DateValue | undefined,
    volume: 50,
    otpCode: '',
    rushDelivery: false,
  });
</script>

<form class="rounded-lg border bg-card p-6">
  <FieldPrimitives.Set>
    <FieldPrimitives.Legend>Place Your Order</FieldPrimitives.Legend>
    <FieldPrimitives.Description>
      Fill out the order form with all the necessary details
    </FieldPrimitives.Description>

    <FieldPrimitives.Separator />

    <FieldPrimitives.Group class="gap-6">
      <div class="grid gap-6 md:grid-cols-2">
        <Field
          label="Quantity"
          description="Number of items to order"
          required
        >
          <NumberSpinner bind:value={orderData.quantity} min={1} max={100} />
        </Field>

        <Field
          label="Delivery Date"
          description="When should we deliver?"
          required
        >
          <DatePicker bind:value={orderData.deliveryDate} />
        </Field>
      </div>

      <Field
        label="Volume Level"
        description={`Set notification volume: ${orderData.volume}%`}
      >
        <Slider type="single" bind:value={orderData.volume} min={0} max={100} step={1} />
      </Field>

      <Field
        label="Verification Code"
        description="Enter the code from your email"
        required
      >
        <InputOTP maxlength={6} groups={2} bind:value={orderData.otpCode} />
      </Field>

      <Field
        label="Upload Receipt"
        description="Upload proof of payment (PDF, max 5MB)"
      >
        <FileInput
          mode="regular"
          validation={{ 
            maxSize: 5 * 1024 * 1024, 
            acceptedTypes: ['application/pdf'] 
          }} 
        />
      </Field>

      <Field
        label="Product Images"
        description="Drag and drop product images"
      >
        <FileInput
          mode="drag-drop"
          validation={{ 
            maxSize: 10 * 1024 * 1024, 
            acceptedTypes: ['image/*'] 
          }} 
          dragDropProps={{
            label: "Drop images here",
            description: "Max 10MB per image",
            showFileList: true
          }}
        />
      </Field>

      <Field
        label="Enable Rush Delivery"
        description="Get your order within 24 hours"
        orientation="horizontal"
      >
        <Switch bind:checked={orderData.rushDelivery} />
      </Field>
    </FieldPrimitives.Group>

    <div class="flex gap-4 pt-4">
      <Button type="submit">Place Order</Button>
      <Button type="button" variant="outline">Cancel</Button>
    </div>
  </FieldPrimitives.Set>
</form>
```

## Validation Patterns

### Real-time Validation

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { Input } from "aether-ui";

  let email = $state('');
  
  let emailError = $derived(() => {
    if (!email) return '';
    if (!email.includes('@')) return 'Invalid email address';
    if (email.length < 5) return 'Email is too short';
    return '';
  });
</script>

<Field 
  label="Email" 
  description="Enter your email address"
  error={emailError()} 
  required
>
  <Input 
    type="email" 
    bind:value={email} 
    error={!!emailError()} 
  />
</Field>
```

### Submit Validation

```svelte
<script lang="ts">
  import { Field } from "aether-ui";
  import { Input } from "aether-ui";
  import { Button } from "aether-ui";

  let formData = $state({ 
    email: '', 
    password: '' 
  });
  
  let errors = $state<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    return newErrors;
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    errors = validate();

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
    }
  }
</script>

<form onsubmit={handleSubmit} class="space-y-4">
  <Field 
    label="Email" 
    error={errors.email} 
    required
  >
    <Input 
      type="email" 
      bind:value={formData.email} 
      error={!!errors.email} 
    />
  </Field>

  <Field 
    label="Password" 
    error={errors.password} 
    required
  >
    <Input 
      type="password" 
      bind:value={formData.password} 
      error={!!errors.password} 
    />
  </Field>

  <Button type="submit">Submit</Button>
</form>
```

## Advanced Composable Usage

For cases requiring custom layouts, use the composable parts:

```svelte
<script lang="ts">
  import { FieldPrimitives } from "aether-ui";
  import { Input } from "aether-ui";
  import { Badge } from "aether-ui";
</script>

<!-- Custom field with badge -->
<FieldPrimitives.Root>
  <div class="flex items-center justify-between">
    <FieldPrimitives.Label>API Key</FieldPrimitives.Label>
    <Badge variant="secondary">Optional</Badge>
  </div>
  <FieldPrimitives.Description>
    Your secret API key for authentication
  </FieldPrimitives.Description>
  <Input type="password" value="sk_live_..." readonly />
</FieldPrimitives.Root>

<!-- Horizontal layout with custom spacing -->
<FieldPrimitives.Root orientation="horizontal">
  <FieldPrimitives.Content>
    <FieldPrimitives.Title>Enable Feature</FieldPrimitives.Title>
    <FieldPrimitives.Description>
      This will enable the new experimental feature
    </FieldPrimitives.Description>
  </FieldPrimitives.Content>
  <Switch />
</FieldPrimitives.Root>
```


## Accessibility

The Field component automatically handles:

- **Label Association**: Proper `for` and `id` attributes connecting labels to form controls
- **ARIA Attributes**: Automatically applies `aria-invalid`, `aria-describedby`, and `aria-required`
- **Error Announcements**: Screen reader announcements for validation errors
- **Required Indicators**: Visual asterisk (*) and semantic `required` attributes
- **Disabled State**: Proper propagation of disabled state to all child elements
- **Focus Management**: Full keyboard navigation support for all form controls
- **Semantic HTML**: Uses proper `<fieldset>`, `<legend>`, and grouping elements

## Best Practices

### Component-Specific Recommendations

1. **InputOTP**: Always use `Field` wrapper with clear description of expected format
   ```svelte
   <Field
     label="Verification Code"
     description="Enter the 6-digit code sent to your email"
   >
     <InputOTP maxlength={6} groups={2} bind:value={code} />
   </Field>
   ```

2. **Select**: Use the simplified API with `options` array and `error` prop
   ```svelte
   <Field label="Country" error={errors.country}>
     <Select 
       bind:value={country} 
       options={countries} 
       error={!!errors.country} 
     />
   </Field>
   ```

3. **FileInput**: Always specify validation rules and use appropriate mode
   ```svelte
   <Field label="Upload Document" error={errors.file}>
     <FileInput 
       mode="drag-drop"
       validation={{ maxSize: 5 * 1024 * 1024, acceptedTypes: ['.pdf'] }}
     />
   </Field>
   ```

4. **CheckboxGroup & RadioGroup**: Use with proper type definitions
   ```svelte
   <Field label="Features" error={errors.features}>
     <CheckboxGroup 
       options={featureOptions} 
       bind:values={selected}
       error={!!errors.features}
     />
   </Field>
   ```

### General Guidelines

1. **Always Use Labels**: Every form control should have a descriptive label
2. **Provide Helpful Descriptions**: Guide users on what input is expected
3. **Clear Error Messages**: Be specific about validation requirements
4. **Mark Required Fields**: Consistently use the `required` prop
5. **Appropriate Orientations**: 
   - Vertical for text inputs, selects, textareas
   - Horizontal for checkboxes, switches
6. **Label Position**:
   - `labelPosition="after"` for Checkbox, Switch
   - `labelPosition="before"` (default) for all other inputs
7. **Group Related Fields**: Use `FieldPrimitives.Set` and `FieldPrimitives.Group` for logical organization
8. **Validation Strategy**: Choose between real-time and submit validation based on UX needs

## Component Compatibility Matrix

| Component | Recommended Orientation | Label Position | Error Support | Notes |
|-----------|------------------------|----------------|---------------|-------|
| Input | `vertical` | `before` | ✅ | Supports all variants and masks |
| Textarea | `vertical` | `before` | ✅ | Use `showCount` for character limits |
| Select | `vertical` | `before` | ✅ | Use simplified API with `options` |
| Checkbox | `horizontal` | `after` | ✅ | Set both orientation and labelPosition |
| Switch | `horizontal` | `after` | ✅ | Set both orientation and labelPosition |
| CheckboxGroup | `vertical` | `before` | ✅ | Has internal orientation option |
| RadioGroup | `vertical` | `before` | ✅ | Has internal orientation and `isCard` |
| Slider | `vertical` | `before` | ❌ | Use description for value display |
| InputOTP | `vertical` | `before` | ✅ | Always specify `maxlength` and `groups` |
| NumberSpinner | `vertical` | `before` | ✅ | Set `min`, `max`, and `step` |
| FileInput | `vertical` | `before` | ✅ | Specify `mode` and `validation` |
| DatePicker | `vertical` | `before` | ✅ | Use with `DateValue` type |

## Migration from Old API

If you're using the old Field component API, here's how to migrate:

### Old API (Deprecated)
```svelte
<Field label="Email" description="Enter email">
  <Input type="email" bind:value={email} />
</Field>
```

### New API (Recommended)
```svelte
<Field label="Email" description="Enter email">
  <Input type="email" bind:value={email} />
</Field>
```

### Composable API (Advanced)
```svelte
<FieldPrimitives.Root>
  <FieldPrimitives.Label>Email</FieldPrimitives.Label>
  <FieldPrimitives.Description>Enter email</FieldPrimitives.Description>
  <Input type="email" bind:value={email} />
</FieldPrimitives.Root>
```

## Related Components

- **Input**: Text input with variants, sizes, masks, and addons
- **Textarea**: Multi-line text input with auto-resize and character counter
- **Checkbox**: Single checkbox with variants and sizes
- **CheckboxGroup**: Multiple checkbox selection with options array
- **Switch**: Toggle switch with variants and sizes
- **Select**: Simplified dropdown with options array (new API)
- **RadioGroup**: Single selection radio group with options array
- **Slider**: Single and range sliders
- **FileInput**: File upload with regular and drag-drop modes
- **DatePicker**: Date selection with calendar
- **InputOTP**: One-time password / PIN input
- **NumberSpinner**: Numeric input with increment/decrement buttons

## Troubleshooting

### Error not showing
Make sure you're passing both the `error` prop to Field and setting `error={true}` on the input component:
```svelte
<Field error={errors.email}>
  <Input error={!!errors.email} />
</Field>
```

### Select not working
Use the new simplified Select API with `options` array:
```svelte
<Select bind:value={country} options={countries} />
```

### InputOTP not grouping
Specify both `maxlength` and `groups`:
```svelte
<InputOTP maxlength={6} groups={2} />
```

### FileInput validation not working
Make sure to pass validation as an object:
```svelte
<FileInput 
  mode="regular"
  validation={{ maxSize: 5 * 1024 * 1024, acceptedTypes: ['.pdf'] }}
/>
```

### Checkbox/Switch label on wrong side
Use both `orientation="horizontal"` and `labelPosition="after"`:
```svelte
<Field 
  orientation="horizontal" 
  labelPosition="after"
  label="Accept terms"
>
  <Checkbox />
</Field>
```

## Summary

The Field component provides a unified, accessible way to build forms in your application. Key takeaways:

- ✅ Use `Field` for simplified, consistent form fields
- ✅ Use composable parts (`FieldPrimitives.Root`, `FieldPrimitives.Label`, etc.) for custom layouts
- ✅ Always set appropriate `orientation` (vertical/horizontal)
- ✅ Use `labelPosition="after"` for Checkbox and Switch
- ✅ Provide clear labels, descriptions, and error messages
- ✅ Use `FieldPrimitives.Set` and `FieldPrimitives.Group` for organized forms
- ✅ Follow component-specific API patterns (Select, InputOTP, FileInput)
- ✅ Implement proper validation with helpful error messages
