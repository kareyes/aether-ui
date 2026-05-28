# Select

A unified Select component that combines all select functionality into a single, easy-to-use component with support for single/multiple selection, grouped options, and various styles.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Installation

The Select component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { Select } from "aether-ui";

  let value = $state("");

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" }
  ];
</script>

<Select
  bind:value
  {options}
  placeholder="Select a fruit..."
  class="w-[200px]"
/>
```

### With Primitives Import

```svelte
<script lang="ts">
  import { SelectPrimitives } from "aether-ui";
</script>

<SelectPrimitives.Root bind:value>
  <SelectPrimitives.Trigger class="w-[200px]">
    <SelectPrimitives.Value placeholder="Select..." />
  </SelectPrimitives.Trigger>
  <SelectPrimitives.Content>
    <SelectPrimitives.Item value="apple">Apple</SelectPrimitives.Item>
    <SelectPrimitives.Item value="banana">Banana</SelectPrimitives.Item>
  </SelectPrimitives.Content>
</SelectPrimitives.Root>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| string[] \| undefined` | `undefined` | The selected value(s). Use `bind:value` for two-way binding |
| `options` | `SelectOption[]` | `[]` | Array of options for the select |
| `groups` | `SelectGroup[]` | `[]` | Array of grouped options |
| `multiple` | `boolean` | `false` | Whether multiple selections are allowed |
| `disabled` | `boolean` | `false` | Whether the entire select is disabled |
| `required` | `boolean` | `false` | Whether the select is required |
| `placeholder` | `string` | `"Select an option..."` | Placeholder text |
| `variant` | `SelectVariant` | `"default"` | Visual variant |
| `size` | `SelectSize` | `"default"` | Size variant |
| `name` | `string` | `undefined` | Name attribute for form submission |
| `class` | `string` | - | Additional CSS classes |
| `triggerClass` | `string` | - | Classes for the trigger element |
| `contentClass` | `string` | - | Classes for the dropdown content |
| `itemClass` | `string` | - | Classes for individual items |
| `sideOffset` | `number` | `4` | Offset distance from the trigger |
| `error` | `boolean` | `false` | Error state with visual feedback |
| `onSelectionChange` | `(value) => void` | - | Callback when selection changes |

### Types

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectGroup {
  label?: string;
  options: SelectOption[];
}

type SelectVariant = "default" | "outline" | "filled" | "ghost" | "underline";
type SelectSize = "sm" | "default" | "lg";
```

## Variants

### All Variants

```svelte
<Select {options} variant="default" />
<Select {options} variant="outline" />
<Select {options} variant="filled" />
<Select {options} variant="ghost" />
<Select {options} variant="underline" />
```

### Sizes

```svelte
<Select {options} size="sm" />
<Select {options} size="default" />
<Select {options} size="lg" />
```

## Examples

### Multiple Selection

```svelte
<script lang="ts">
  import { Select } from "aether-ui";

  let selectedFrameworks = $state<string[]>([]);

  const frameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "svelte", label: "Svelte" }
  ];
</script>

<Select
  bind:value={selectedFrameworks}
  options={frameworks}
  multiple={true}
  placeholder="Select frameworks..."
  class="w-[250px]"
/>
```

### Grouped Options

```svelte
<script lang="ts">
  import { Select } from "aether-ui";

  let selectedFramework = $state("");

  const groups = [
    {
      label: "Frontend Frameworks",
      options: [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "svelte", label: "Svelte" }
      ]
    },
    {
      label: "Backend Frameworks",
      options: [
        { value: "express", label: "Express.js" },
        { value: "fastify", label: "Fastify" },
        { value: "nestjs", label: "NestJS" }
      ]
    }
  ];
</script>

<Select
  bind:value={selectedFramework}
  {groups}
  placeholder="Select a framework..."
  class="w-[250px]"
/>
```

### Disabled States

```svelte
<!-- Disabled component -->
<Select {options} disabled={true} />

<!-- Some options disabled -->
<Select
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana", disabled: true },
    { value: "orange", label: "Orange" }
  ]}
/>
```

### Selection Change Callback

```svelte
<script lang="ts">
  import { Select } from "aether-ui";

  function handleSelectionChange(value: string) {
    console.log('Selection changed:', value);
  }
</script>

<Select
  {options}
  onSelectionChange={handleSelectionChange}
/>
```

### With Field Component

```svelte
<script lang="ts">
  import { Field, Select } from "aether-ui";

  let country = $state('');

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ];
</script>

<Field
  label="Country"
  description="Select your country of residence"
  required
>
  <Select
    bind:value={country}
    options={countries}
    placeholder="Select a country..."
  />
</Field>
```

### With Validation

```svelte
<script lang="ts">
  import { Field, Select } from "aether-ui";

  let framework = $state('');
  let errors = $state<Record<string, string>>({});

  const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
  ];

  function validate() {
    if (!framework) {
      errors.framework = 'Please select a framework';
    } else {
      delete errors.framework;
    }
  }
</script>

<Field
  label="Framework"
  description="Choose your preferred framework"
  required
  error={errors.framework}
>
  <Select
    bind:value={framework}
    options={frameworks}
    placeholder="Select framework..."
    error={!!errors.framework}
    onSelectionChange={validate}
  />
</Field>
```

### Complete Form Example

```svelte
<script lang="ts">
  import { Field, Select, Button } from "aether-ui";

  let formData = $state({
    country: '',
    framework: '',
    languages: [] as string[],
  });

  let errors = $state<Record<string, string>>({});

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ];

  const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
  ];

  const languages = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
  ];

  function handleSubmit(e: Event) {
    e.preventDefault();
    errors = {};

    if (!formData.country) errors.country = 'Country is required';
    if (!formData.framework) errors.framework = 'Framework is required';
    if (formData.languages.length === 0) {
      errors.languages = 'Select at least one language';
    }

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
    }
  }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  <Field
    label="Country"
    required
    error={errors.country}
  >
    <Select
      bind:value={formData.country}
      options={countries}
      placeholder="Select country..."
      error={!!errors.country}
    />
  </Field>

  <Field
    label="Framework"
    required
    error={errors.framework}
  >
    <Select
      bind:value={formData.framework}
      options={frameworks}
      placeholder="Select framework..."
      error={!!errors.framework}
    />
  </Field>

  <Field
    label="Languages"
    required
    error={errors.languages}
  >
    <Select
      bind:value={formData.languages}
      options={languages}
      multiple={true}
      placeholder="Select languages..."
      error={!!errors.languages}
    />
  </Field>

  <Button type="submit">Save Profile</Button>
</form>
```

## Accessibility

The Select component follows accessibility best practices:

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open dropdown or select item |
| `Arrow Down` | Move to next item |
| `Arrow Up` | Move to previous item |
| `Escape` | Close dropdown |
| `Home` | Move to first item |
| `End` | Move to last item |

### Best Practices

1. **Provide labels**: Always use with Field component for proper labeling
2. **Placeholder text**: Use descriptive placeholder text
3. **Error states**: Use `error` prop for validation feedback
4. **Disabled states**: Clearly indicate disabled options
