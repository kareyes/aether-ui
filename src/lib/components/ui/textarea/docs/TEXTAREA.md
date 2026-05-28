# Textarea Component

A versatile textarea component with multiple variants, sizes, and advanced features like auto-resize and character counting.

## Features

- **Multiple Variants**: default, outline, filled, ghost, underline
- **Size Options**: sm, default, lg
- **Resize Control**: none, vertical, horizontal, both
- **Auto-Resize**: Automatically grows/shrinks based on content
- **Character Counter**: Optional character count display
- **Max Length**: Limit input length with validation
- **Full Type Safety**: TypeScript support with proper types
- **Accessibility**: ARIA attributes and keyboard navigation
- **Dark Mode**: Built-in dark mode support

## Installation

The Textarea component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { Textarea } from "aether-ui";

  let value = $state("");
</script>

<Textarea bind:value placeholder="Type here..." />
```

### Variants

```svelte
<!-- Default -->
<Textarea variant="default" />

<!-- Outline (thicker border) -->
<Textarea variant="outline" />

<!-- Filled (muted background) -->
<Textarea variant="filled" />

<!-- Ghost (no border) -->
<Textarea variant="ghost" />

<!-- Underline -->
<Textarea variant="underline" />
```

### Sizes

```svelte
<!-- Small -->
<Textarea size="sm" />

<!-- Default -->
<Textarea size="default" />

<!-- Large -->
<Textarea size="lg" />
```

### Character Counter

```svelte
<!-- Simple counter -->
<Textarea showCount />

<!-- With max length -->
<Textarea maxLength={200} showCount />
```

### Auto-Resize

```svelte
<!-- Auto-resize with min/max rows -->
<Textarea 
  autoResize 
  minRows={3} 
  maxRows={10} 
/>
```

### Resize Options

```svelte
<!-- No resize -->
<Textarea resize="none" />

<!-- Vertical only (default) -->
<Textarea resize="vertical" />

<!-- Horizontal only -->
<Textarea resize="horizontal" />

<!-- Both directions -->
<Textarea resize="both" />
```

### Full Example

```svelte
<script>
  import { Textarea } from "aether-ui";
  
  let message = $state("");
</script>

<div class="space-y-2">
  <label for="message">Message</label>
  <Textarea 
    id="message"
    bind:value={message}
    variant="outline"
    size="lg"
    maxLength={500}
    showCount
    autoResize
    minRows={3}
    maxRows={8}
    placeholder="Type your message..."
  />
  <p class="text-sm text-muted-foreground">
    Your message will be reviewed by our team.
  </p>
</div>
```

### Error State

```svelte
<Textarea 
  aria-invalid={true}
  placeholder="This field has an error"
/>
<p class="text-sm text-destructive">This field is required</p>
```

### Disabled State

```svelte
<Textarea disabled value="Cannot edit this" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Bindable textarea value |
| `variant` | `"default" \| "outline" \| "filled" \| "ghost" \| "underline"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the textarea |
| `resize` | `"none" \| "vertical" \| "horizontal" \| "both"` | `"vertical"` | Resize behavior |
| `maxLength` | `number` | `undefined` | Maximum character length |
| `showCount` | `boolean` | `false` | Show character counter |
| `autoResize` | `boolean` | `false` | Auto-resize based on content |
| `minRows` | `number` | `undefined` | Minimum rows for auto-resize |
| `maxRows` | `number` | `undefined` | Maximum rows for auto-resize |
| `disabled` | `boolean` | `false` | Disable the textarea |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `class` | `string` | `undefined` | Additional CSS classes |
| `ref` | `HTMLTextAreaElement \| null` | `null` | Bindable element reference |

All standard HTML textarea attributes are supported.

## Types

```typescript
import type { 
  TextareaProps, 
  TextareaVariant, 
  TextareaSize, 
  TextareaResize 
} from "aether-ui";
```

## Styling

The component uses Tailwind CSS and supports:
- Custom classes via the `class` prop
- Dark mode (automatically handled)
- Focus states with ring effect
- Error states via `aria-invalid`
- Disabled states

## Accessibility

- Supports all standard textarea attributes
- Works with labels via `id`
- ARIA attributes for error states
- Keyboard navigation support
- Screen reader friendly

## Notes

- When `autoResize` is enabled, the `resize` prop is automatically set to `"none"`
- Character counter appears in the bottom-right corner when `showCount` is true
- The component wraps the textarea in a `div` when `showCount` is enabled
- Auto-resize uses `minRows` and `maxRows` to constrain height

## Using Textarea with Field Component

The Field component provides labels, descriptions, and error handling. This is the recommended way to use Textarea in forms.

### Basic Field Usage

```svelte
<script lang="ts">
  import { Field } from "aether-ui";
  import { Textarea } from "aether-ui";

  let bio = $state('');
</script>

<Field
  label="Biography"
  description="Tell us about yourself"
>
  <Textarea bind:value={bio} placeholder="Write your bio here..." rows={4} />
</Field>
```

### Field with Character Counter

```svelte
<script lang="ts">
  import { Field } from "aether-ui";
  import { Textarea } from "aether-ui";

  let description = $state('');
</script>

<Field
  label="Description"
  description="Maximum 200 characters"
>
  <Textarea 
    bind:value={description}
    maxLength={200}
    showCount
    placeholder="Enter description..."
  />
</Field>
```

### Field with Auto-Resize

```svelte
<script lang="ts">
  import { Field } from "aether-ui";
  import { Textarea } from "aether-ui";

  let notes = $state('');
</script>

<Field
  label="Notes"
  description="Automatically grows with content"
>
  <Textarea 
    bind:value={notes}
    autoResize
    minRows={2}
    maxRows={8}
    placeholder="Start typing..."
  />
</Field>
```

### Field with Validation

```svelte
<script lang="ts">
  import { Field } from "aether-ui";
  import { Textarea } from "aether-ui";

  let message = $state('');
  let errors = $state<Record<string, string>>({});

  function validateMessage() {
    if (!message) {
      errors.message = 'Message is required';
    } else if (message.length < 50) {
      errors.message = 'Message must be at least 50 characters';
    } else {
      delete errors.message;
    }
  }
</script>

<Field
  label="Message"
  description="Minimum 50 characters"
  required
  error={errors.message}
>
  <Textarea 
    bind:value={message}
    placeholder="Type your message..."
    aria-invalid={!!errors.message}
    onblur={validateMessage}
    rows={4}
  />
</Field>
```

### Field with Different Variants

```svelte
<script lang="ts">
  import { Field } from "aether-ui";
  import { Textarea } from "aether-ui";

  let formData = $state({
    bio: '',
    comments: '',
    feedback: '',
  });
</script>

<div class="space-y-6">
  <!-- Outline Variant -->
  <Field
    label="Bio"
    description="Tell us about yourself"
  >
    <Textarea 
      variant="outline"
      bind:value={formData.bio}
      placeholder="Write your bio..."
      rows={4}
    />
  </Field>

  <!-- Filled Variant with Counter -->
  <Field
    label="Comments"
    description="Share your thoughts (max 500 characters)"
  >
    <Textarea 
      variant="filled"
      bind:value={formData.comments}
      maxLength={500}
      showCount
      rows={3}
    />
  </Field>

  <!-- Auto-resize with Underline -->
  <Field
    label="Feedback"
    description="Your feedback helps us improve"
  >
    <Textarea 
      variant="underline"
      bind:value={formData.feedback}
      autoResize
      minRows={2}
      maxRows={6}
      placeholder="Start typing..."
    />
  </Field>
</div>
```

### Complete Form Example

```svelte
<script lang="ts">
  import { FieldPrimitives,Field } from "aether-ui";
  import { Textarea } from "aether-ui";
  import { Button } from "aether-ui";

  let formData = $state({
    title: '',
    description: '',
    additionalNotes: '',
  });

  let errors = $state<Record<string, string>>({});

  function handleSubmit(e: Event) {
    e.preventDefault();
    errors = {};

    if (!formData.description) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      errors.description = 'Description must be at least 50 characters';
    }

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
    }
  }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  <FieldPrimitives.Set>
    <FieldPrimitives.Legend>Project Details</FieldPrimitives.Legend>
    <FieldPrimitives.Description>
      Provide information about your project
    </FieldPrimitives.Description>

    <FieldPrimitives.Separator />

    <FieldPrimitives.Group class="gap-6">
      <Field
        label="Description"
        description="Detailed description of your project (minimum 50 characters)"
        required
        error={errors.description}
      >
        <Textarea 
          bind:value={formData.description}
          variant="outline"
          size="lg"
          maxLength={1000}
          showCount
          autoResize
          minRows={4}
          maxRows={10}
          placeholder="Describe your project..."
          aria-invalid={!!errors.description}
        />
      </Field>

      <Field
        label="Additional Notes"
        description="Any other information you'd like to share"
      >
        <Textarea 
          bind:value={formData.additionalNotes}
          variant="filled"
          autoResize
          minRows={3}
          maxRows={6}
          placeholder="Optional notes..."
        />
      </Field>
    </FieldPrimitives.Group>

    <div class="flex gap-4 pt-4">
      <Button type="submit">Submit</Button>
      <Button type="button" variant="outline">Cancel</Button>
    </div>
  </FieldPrimitives.Set>
</form>
```
