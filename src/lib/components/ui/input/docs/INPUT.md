# Input

A flexible input component with built-in support for addons (icons, text, buttons), input masks, and various styles.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Input component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { Input } from "aether-ui";

  let value = $state("");
</script>

<Input bind:value placeholder="Enter text..." />
```

### With Primitives Import

```svelte
<script lang="ts">
  import { InputPrimitives } from "aether-ui";
</script>

<InputPrimitives.Root>
  <InputPrimitives.Input placeholder="Enter text..." />
</InputPrimitives.Root>
```

## Props Reference

### Base Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Bindable input value |
| `type` | `InputType` | `"text"` | Input type |
| `variant` | `InputVariant` | `"default"` | Visual variant |
| `size` | `InputSize` | `"default"` | Input size |
| `mask` | `MaskType \| MaskPattern` | - | Input mask configuration |
| `error` | `boolean` | `false` | Error state |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `placeholder` | `string` | - | Placeholder text |
| `class` | `string` | - | Additional CSS classes |

### Addon Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `startIcon` | `Snippet` | - | Icon snippet at the start |
| `endIcon` | `Snippet` | - | Icon snippet at the end |
| `startText` | `string \| Snippet` | - | Text at the start |
| `endText` | `string \| Snippet` | - | Text at the end |
| `startButton` | `Snippet` | - | Button snippet at the start |
| `endButton` | `Snippet` | - | Button snippet at the end |
| `startAddon` | `Snippet` | - | Custom start addon |
| `endAddon` | `Snippet` | - | Custom end addon |
| `groupClassName` | `string` | - | Classes for InputGroup wrapper |

## Variants

```svelte
<Input variant="default" placeholder="Default" />
<Input variant="outline" placeholder="Outline" />
<Input variant="filled" placeholder="Filled" />
<Input variant="ghost" placeholder="Ghost" />
<Input variant="underline" placeholder="Underline" />
```

## Examples

### Icon Addons

```svelte
<script lang="ts">
  import { Input } from "aether-ui";
  import SearchIcon from "@lucide/svelte/icons/search";
  import MailIcon from "@lucide/svelte/icons/mail";
</script>

<!-- Start Icon -->
<Input placeholder="Search...">
  {#snippet startIcon()}
    <SearchIcon class="size-4" />
  {/snippet}
</Input>

<!-- End Icon -->
<Input type="email" placeholder="Enter email">
  {#snippet endIcon()}
    <MailIcon class="size-4" />
  {/snippet}
</Input>

<!-- Both Icons -->
<Input placeholder="Secure input">
  {#snippet startIcon()}
    <LockIcon class="size-4" />
  {/snippet}
  {#snippet endIcon()}
    <span class="text-xs text-muted-foreground">Encrypted</span>
  {/snippet}
</Input>
```

### Text Addons

```svelte
<!-- String Text -->
<Input
  placeholder="example.com"
  startText="https://"
  endText=".com"
/>

<!-- Currency -->
<Input
  type="number"
  placeholder="0.00"
  startText="$"
  endText="USD"
/>

<!-- Email Domain -->
<Input
  placeholder="username"
  endText="@company.com"
/>
```

### Button Addons

```svelte
<script lang="ts">
  import { Input, InputGroupPrimitives } from "aether-ui";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import EyeIcon from "@lucide/svelte/icons/eye";
  import EyeOffIcon from "@lucide/svelte/icons/eye-off";

  let showPassword = $state(false);
</script>

<!-- Copy Button -->
<Input readonly value="https://example.com">
  {#snippet endButton()}
    <InputGroupPrimitives.Button size="icon-xs" onclick={() => navigator.clipboard.writeText('https://example.com')}>
      <CopyIcon class="size-4" />
    </InputGroupPrimitives.Button>
  {/snippet}
</Input>

<!-- Password Toggle -->
<Input
  type={showPassword ? "text" : "password"}
  placeholder="Enter password"
>
  {#snippet endButton()}
    <InputGroupPrimitives.Button
      size="icon-xs"
      variant="ghost"
      onclick={() => showPassword = !showPassword}
    >
      {#if showPassword}
        <EyeOffIcon class="size-4" />
      {:else}
        <EyeIcon class="size-4" />
      {/if}
    </InputGroupPrimitives.Button>
  {/snippet}
</Input>
```

### With Input Masks

```svelte
<script lang="ts">
  import { Input } from "aether-ui";
  import PhoneIcon from "@lucide/svelte/icons/phone";
  import CreditCardIcon from "@lucide/svelte/icons/credit-card";
</script>

<!-- Phone Number -->
<Input
  mask="phone"
  placeholder="(555) 555-5555"
>
  {#snippet startIcon()}
    <PhoneIcon class="size-4" />
  {/snippet}
</Input>

<!-- Credit Card -->
<Input
  mask="creditCard"
  placeholder="1234 5678 9012 3456"
>
  {#snippet startIcon()}
    <CreditCardIcon class="size-4" />
  {/snippet}
</Input>
```

### States

```svelte
<!-- Error State -->
<Input
  value="invalid@"
  error={true}
  placeholder="Enter email"
>
  {#snippet startIcon()}
    <MailIcon class="size-4" />
  {/snippet}
</Input>

<!-- Disabled -->
<Input
  value="Disabled"
  disabled
  startText="$"
/>

<!-- Readonly -->
<Input
  value="Read-only"
  readonly
>
  {#snippet endIcon()}
    <LockIcon class="size-4" />
  {/snippet}
</Input>
```

### With Field Component

```svelte
<script lang="ts">
  import { Field, Input } from "aether-ui";
  import MailIcon from "@lucide/svelte/icons/mail";
  import LockIcon from "@lucide/svelte/icons/lock";

  let email = $state('');
  let password = $state('');
</script>

<!-- Email with Icon -->
<Field
  label="Email"
  description="We'll never share your email"
  required
>
  <Input type="email" bind:value={email} placeholder="you@example.com">
    {#snippet startIcon()}
      <MailIcon class="size-4" />
    {/snippet}
  </Input>
</Field>

<!-- Password with Icon -->
<Field
  label="Password"
  description="Must be at least 8 characters"
  required
>
  <Input type="password" bind:value={password} placeholder="••••••••">
    {#snippet startIcon()}
      <LockIcon class="size-4" />
    {/snippet}
  </Input>
</Field>
```

### With Validation

```svelte
<script lang="ts">
  import { Field, Input } from "aether-ui";

  let email = $state('');
  let errors = $state<Record<string, string>>({});

  function validateEmail() {
    if (!email) {
      errors.email = 'Email is required';
    } else if (!email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    } else {
      delete errors.email;
    }
  }
</script>

<Field
  label="Email"
  required
  error={errors.email}
>
  <Input
    type="email"
    bind:value={email}
    placeholder="you@example.com"
    error={!!errors.email}
    onblur={validateEmail}
  />
</Field>
```

### Complete Form Example

```svelte
<script lang="ts">
  import { Field, Input, Button } from "aether-ui";
  import MailIcon from "@lucide/svelte/icons/mail";
  import LockIcon from "@lucide/svelte/icons/lock";
  import UserIcon from "@lucide/svelte/icons/user";
  import PhoneIcon from "@lucide/svelte/icons/phone";

  let formData = $state({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  let errors = $state<Record<string, string>>({});

  function handleSubmit(e: Event) {
    e.preventDefault();
    errors = {};

    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.phone) errors.phone = 'Phone is required';

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
    }
  }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  <Field
    label="Username"
    required
    error={errors.username}
  >
    <Input
      bind:value={formData.username}
      placeholder="johndoe"
      error={!!errors.username}
    >
      {#snippet startIcon()}
        <UserIcon class="size-4" />
      {/snippet}
    </Input>
  </Field>

  <Field
    label="Email"
    required
    error={errors.email}
  >
    <Input
      type="email"
      bind:value={formData.email}
      placeholder="you@example.com"
      error={!!errors.email}
    >
      {#snippet startIcon()}
        <MailIcon class="size-4" />
      {/snippet}
    </Input>
  </Field>

  <Field
    label="Password"
    required
    error={errors.password}
  >
    <Input
      type="password"
      bind:value={formData.password}
      placeholder="••••••••"
      error={!!errors.password}
    >
      {#snippet startIcon()}
        <LockIcon class="size-4" />
      {/snippet}
    </Input>
  </Field>

  <Field
    label="Phone Number"
    required
    error={errors.phone}
  >
    <Input
      bind:value={formData.phone}
      mask="phone"
      placeholder="(555) 555-5555"
      error={!!errors.phone}
    >
      {#snippet startIcon()}
        <PhoneIcon class="size-4" />
      {/snippet}
    </Input>
  </Field>

  <Button type="submit">Create Account</Button>
</form>
```

## Accessibility

The Input component follows accessibility best practices:

### ARIA Attributes

- `aria-invalid` set when error state is true
- `aria-disabled` set when disabled
- Proper label association through Field component

### Best Practices

1. **Use Field component**: Always wrap inputs with Field for labels and descriptions
2. **Consistent icon sizing**: Use `class="size-4"` for icons
3. **Button accessibility**: Include `aria-label` on icon buttons
4. **Error handling**: Use `error` prop combined with Field error messages
5. **Placeholder text**: Provide descriptive placeholder text
