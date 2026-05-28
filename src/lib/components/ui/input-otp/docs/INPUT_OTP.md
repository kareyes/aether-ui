# Input OTP Component

An accessible one-time password (OTP) input component with copy/paste functionality, built on top of Bits UI's PinInput.

## Features

- **3 Visual Variants**: default, outline, underline
- **3 Sizes**: sm, default, lg
- **Flexible Grouping**: Split digits into groups with automatic separators
- **Pattern Validation**: Restrict input to specific character patterns
- **Copy/Paste Support**: Full clipboard functionality
- **Complete Callback**: Get notified when all slots are filled
- **Error State**: Visual feedback for validation errors
- **Full TypeScript Support**: Complete type safety and IntelliSense
- **Accessibility**: Built on accessible Bits UI primitives

## Installation

The InputOTP component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { InputOTP } from "aether-ui";

  let value = $state("");
</script>

<InputOTP maxlength={6} groups={2} bind:value />
```

### Variants

```svelte
<InputOTP maxlength={6} variant="default" groups={2} />
<InputOTP maxlength={6} variant="outline" groups={2} />
<InputOTP maxlength={6} variant="underline" groups={2} />
```

### Sizes

```svelte
<InputOTP maxlength={6} size="sm" groups={1} />
<InputOTP maxlength={6} size="default" groups={1} />
<InputOTP maxlength={6} size="lg" groups={1} />
```

### Groups Configuration

Control how the OTP digits are grouped:

```svelte
<!-- Single group (no separator) -->
<InputOTP maxlength={6} groups={1} />

<!-- Two groups: 3-3 -->
<InputOTP maxlength={6} groups={2} />

<!-- Three groups: 2-2-2 -->
<InputOTP maxlength={6} groups={3} />

<!-- Hide separator even with multiple groups -->
<InputOTP maxlength={6} groups={2} showSeparator={false} />
```

### Pattern Validation

Restrict input to specific character patterns using regex strings:

```svelte
<script lang="ts">
  import { InputOTP } from "aether-ui";
  import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
</script>

<!-- Digits only (0-9) -->
<InputOTP maxlength={6} pattern={REGEXP_ONLY_DIGITS} />

<!-- Alphanumeric (letters and numbers) -->
<InputOTP maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} />

<!-- Custom pattern -->
<InputOTP maxlength={6} pattern="^[A-Z0-9]+$" />
```

### Complete Callback

Get notified when all OTP slots are filled:

```svelte
<script lang="ts">
  import { InputOTP } from "aether-ui";

  let otpValue = $state("");
  
  function handleComplete(value: string) {
    console.log("OTP Complete:", value);
    // Trigger verification...
  }
</script>

<InputOTP 
  maxlength={6} 
  groups={2} 
  bind:value={otpValue}
  onComplete={handleComplete}
/>
```

### Error State

Display validation errors with visual feedback:

```svelte
<script lang="ts">
  import { InputOTP } from "aether-ui";

  let otpValue = $state("");
  let hasError = $state(false);
  
  function handleErrorChange(error: boolean) {
    console.log("Error state:", error);
  }
</script>

<InputOTP 
  maxlength={6} 
  groups={2} 
  bind:value={otpValue}
  error={hasError}
  onError={handleErrorChange}
/>
{#if hasError}
  <p class="text-destructive text-sm mt-1">Invalid verification code</p>
{/if}
```

### Disabled State

```svelte
<InputOTP maxlength={6} groups={2} disabled />
```

### Value Change Callback

Track every value change:

```svelte
<script lang="ts">
  import { InputOTP } from "aether-ui";

  let otpValue = $state("");
  
  function handleValueChange(value: string) {
    console.log("Current value:", value);
  }
</script>

<InputOTP 
  maxlength={6} 
  groups={2} 
  bind:value={otpValue}
  onValueChange={handleValueChange}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxlength` | `number` | **required** | Maximum length of the OTP input |
| `value` | `string` | `""` | Current OTP value (bindable) |
| `variant` | `"default" \| "outline" \| "underline"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of input slots |
| `groups` | `number` | `1` | Number of groups to split the input into |
| `showSeparator` | `boolean` | `true` (when groups > 1) | Show separator between groups |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `pattern` | `string` | `undefined` | Regex pattern string to validate input |
| `error` | `boolean` | `false` | Whether the input has an error state |
| `onComplete` | `(value: string) => void` | `undefined` | Callback when all slots are filled |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback when value changes |
| `onError` | `(hasError: boolean) => void` | `undefined` | Callback when error state changes |
| `class` | `string` | `undefined` | Additional CSS classes |

## Primitive Components

For more control, you can use the primitive components directly:

```svelte
<script lang="ts">
  import { InputOTPPrimitives } from "aether-ui";
</script>

<InputOTPPrimitives.Root maxlength={6} variant="default" size="default">
  {#snippet children({ cells })}
    <InputOTPPrimitives.Group>
      {#each cells.slice(0, 3) as cell (cell)}
        <InputOTPPrimitives.Slot {cell} />
      {/each}
    </InputOTPPrimitives.Group>
    <InputOTPPrimitives.Separator />
    <InputOTPPrimitives.Group>
      {#each cells.slice(3, 6) as cell (cell)}
        <InputOTPPrimitives.Slot {cell} />
      {/each}
    </InputOTPPrimitives.Group>
  {/snippet}
</InputOTPPrimitives.Root>
```

### Primitive Components

| Component | Description |
|-----------|-------------|
| `InputOTPPrimitives.Root` | The root container that provides context |
| `InputOTPPrimitives.Group` | Groups slots together visually |
| `InputOTPPrimitives.Slot` | Individual input slot for a single character |
| `InputOTPPrimitives.Separator` | Visual separator between groups |

## Accessibility

- Built on [Bits UI PinInput](https://bits-ui.com/docs/components/pin-input) accessible primitives
- Proper focus management and keyboard navigation
- Supports `aria-invalid` for error states
- Screen reader friendly

## Pattern Constants

Bits UI provides helpful pattern constants:

```svelte
<script>
  import { 
    REGEXP_ONLY_DIGITS,           // "^\\d+$"
    REGEXP_ONLY_CHARS,            // "^[a-zA-Z]+$"
    REGEXP_ONLY_DIGITS_AND_CHARS  // "^[a-zA-Z0-9]+$"
  } from "bits-ui";
</script>
```

## Using InputOTP with Field Component

The Field component provides a consistent way to add labels, descriptions, and error handling to your InputOTP components.

### Basic Field Usage

```svelte
<script lang="ts">
  import { InputOTP, Field } from "aether-ui";

  let code = $state("");
</script>

<Field
  label="Verification Code"
  description="Enter the 6-digit code sent to your phone"
>
  <InputOTP maxlength={6} groups={2} bind:value={code} />
</Field>
```

### With Validation

```svelte
<script lang="ts">
  import { InputOTP, Field } from "aether-ui";
  import { REGEXP_ONLY_DIGITS } from "bits-ui";

  let code = $state("");
  let error = $derived(code.length > 0 && code.length < 6);
</script>

<Field
  label="OTP Code"
  description="Please enter the complete 6-digit code"
  required
  error={error ? "Code must be 6 digits" : undefined}
>
  <InputOTP
    maxlength={6}
    groups={2}
    pattern={REGEXP_ONLY_DIGITS}
    bind:value={code}
    error={error}
  />
</Field>
```

### Different Variants with Field

```svelte
<script lang="ts">
  import { InputOTP, Field } from "aether-ui";
</script>

<Field
  label="Security Code"
  description="Outline variant for better visibility"
>
  <InputOTP
    maxlength={6}
    variant="outline"
    groups={3}
    size="lg"
  />
</Field>

<Field
  label="Access Code"
  description="Underline variant for minimal design"
>
  <InputOTP
    maxlength={4}
    variant="underline"
    groups={1}
  />
</Field>
```

### Complete Form Example

```svelte
<script lang="ts">
  import { InputOTP, FieldPrimitives, Field, Button } from "aether-ui";
  import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";

  let verificationCode = $state("");
  let backupCode = $state("");

  let codeError = $derived(
    verificationCode.length > 0 && verificationCode.length < 6
      ? "Verification code must be 6 digits"
      : undefined
  );

  function handleSubmit() {
    console.log("Codes:", { verificationCode, backupCode });
  }
</script>

<FieldPrimitives.Set>
  <FieldPrimitives.Legend>Two-Factor Authentication</FieldPrimitives.Legend>
  <FieldPrimitives.Description>
    Enter the verification codes to access your account
  </FieldPrimitives.Description>

  <FieldPrimitives.Separator />

  <FieldPrimitives.Group class="gap-4">
    <Field
      label="Verification Code"
      description="Enter the 6-digit code from your authenticator app"
      required
      error={codeError}
    >
      <InputOTP
        maxlength={6}
        groups={2}
        pattern={REGEXP_ONLY_DIGITS}
        bind:value={verificationCode}
        error={!!codeError}
        variant="outline"
        size="lg"
      />
    </Field>

    <Field
      label="Backup Code (Optional)"
      description="Use a backup code if you don't have access to your authenticator"
    >
      <InputOTP
        maxlength={8}
        groups={2}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        bind:value={backupCode}
        variant="underline"
      />
    </Field>
  </FieldPrimitives.Group>

  <div class="flex gap-4 pt-4">
    <Button onclick={handleSubmit} disabled={!!codeError}>
      Verify & Login
    </Button>
    <Button variant="outline" type="button">
      Resend Code
    </Button>
  </div>
</FieldPrimitives.Set>
```
