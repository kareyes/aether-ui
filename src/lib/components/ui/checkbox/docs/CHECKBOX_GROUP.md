# Checkbox Group Component

A powerful component for managing multiple related checkboxes with shared state and consistent styling.

## Features

- ✅ **Multiple Selection Management**: Handles arrays of selected values
- ✅ **Flexible Layout**: Vertical or horizontal orientation
- ✅ **Rich Options**: Support for labels, descriptions, and disabled states
- ✅ **Error Handling**: Built-in error state with visual feedback and aria-invalid
- ✅ **Field Integration**: Works seamlessly with Field component for form structure
- ✅ **Consistent Styling**: Inherits all checkbox variants and sizes
- ✅ **Accessibility**: Proper fieldset/legend structure and ARIA support
- ✅ **TypeScript Support**: Comprehensive type definitions
- ✅ **Form Integration**: Works seamlessly with form libraries

## Basic Usage

### Simple Checkbox Group
```svelte
<script>
  import { CheckboxGroup } from "aether-ui";
  
  let selectedValues = $state([]);
  
  const options = [
    { id: "1", label: "Option 1", value: "option1" },
    { id: "2", label: "Option 2", value: "option2" },
    { id: "3", label: "Option 3", value: "option3" },
  ];
</script>

<CheckboxGroup 
  {options}
  bind:values={selectedValues}
  label="Choose your options"
/>
```

### With Descriptions
```svelte
<script>
  const skillsOptions = [
    { 
      id: "js", 
      label: "JavaScript", 
      value: "javascript", 
      description: "ES6+ and modern JS frameworks" 
    },
    { 
      id: "ts", 
      label: "TypeScript", 
      value: "typescript", 
      description: "Strongly typed JavaScript" 
    },
  ];
  
  let skills = $state(["javascript"]);
</script>

<CheckboxGroup 
  options={skillsOptions}
  bind:values={skills}
  label="Technical Skills"
  description="Select the technologies you're proficient in"
/>
```

## Layout Options

### Horizontal Layout
```svelte
<CheckboxGroup 
  {options}
  bind:values={selectedValues}
  orientation="horizontal"
  label="Notification Preferences"
/>
```

### Different Sizes
```svelte
<!-- Small checkboxes -->
<CheckboxGroup 
  {options}
  checkboxSize="sm"
  label="Compact options"
/>

<!-- Large checkboxes -->
<CheckboxGroup 
  {options}
  checkboxSize="xl"
  label="Large options"
/>
```

## Error States

### Basic Error State
```svelte
<script>
  let selectedOptions = $state([]);
  let hasError = $derived(selectedOptions.length === 0);
</script>

<CheckboxGroup 
  options={termsOptions}
  bind:values={selectedOptions}
  error={hasError}
  required
  label="Terms and Conditions"
  description="Please accept the terms to continue"
/>
```

### With Field Component
```svelte
<script>
  import { CheckboxGroup } from "aether-ui";
  import type { CheckboxGroupOption } from "aether-ui";
  import { Field } from "aether-ui";
  
  let interests = $state([]);
  
  const interestOptions: CheckboxGroupOption[] = [
    { id: "tech", label: "Technology", value: "tech" },
    { id: "design", label: "Design", value: "design" },
    { id: "business", label: "Business", value: "business" },
  ];
</script>

<Field
  label="Select Your Interests"
  description="Choose at least one interest"
  error={interests.length === 0 ? "Please select at least one interest" : undefined}
  required
>
  <CheckboxGroup 
    options={interestOptions}
    bind:values={interests}
    error={interests.length === 0}
  />
</Field>
```

### Multiple CheckboxGroups with Field.Set
```svelte
<script>
  import { CheckboxGroup } from "aether-ui";
  import { FieldPrimitives } from "aether-ui";
  
  let communication = $state(["email"]);
  let interests = $state([]);
</script>

<FieldPrimitives.Set>
  <FieldPrimitives.Legend>Account Preferences</FieldPrimitives.Legend>
  <FieldPrimitives.Description>Configure your account settings</FieldPrimitives.Description>
  
  <FieldPrimitives.Separator />
  
  <FieldPrimitives.Group class="gap-6">
    <Field
      label="Communication Preferences"
      description="How should we contact you?"
      required
    >
      <CheckboxGroup
        options={[
          { id: "email", label: "Email", value: "email", description: "Receive updates via email" },
          { id: "sms", label: "SMS", value: "sms", description: "Receive text messages" },
          { id: "push", label: "Push Notifications", value: "push", description: "Browser notifications" },
        ]}
        bind:values={communication}
      />
    </Field>

    <Field
      label="Interests"
      description="What topics interest you?"
    >
      <CheckboxGroup
        options={[
          { id: "tech", label: "Technology", value: "tech" },
          { id: "design", label: "Design", value: "design" },
          { id: "business", label: "Business", value: "business" },
        ]}
        bind:values={interests}
        orientation="horizontal"
      />
    </Field>
  </FieldPrimitives.Group>
</FieldPrimitives.Set>
```

### With Validation
```svelte
<script>
  import { CheckboxGroup } from "aether-ui";
  import { FieldPrimitives } from "aether-ui";
  
  let permissions = $state([]);
  let error = $derived(permissions.length === 0);
</script>

<Field
  label="User Permissions"
  description="Select at least one permission to continue"
  required
  error={error ? "Please select at least one permission" : undefined}
>
  <CheckboxGroup 
    options={[
      { id: "read", label: "Read", value: "read" },
      { id: "write", label: "Write", value: "write" },
      { id: "delete", label: "Delete", value: "delete" },
    ]}
    bind:values={permissions}
    error={error}
  />
</Field>
```

### Error Callback
```svelte
<script>
  let values = $state([]);
  
  function handleError(hasError: boolean) {
    console.log('Error state:', hasError);
    // Perform side effects when error state changes
  }
</script>

<CheckboxGroup 
  {options}
  bind:values
  error={values.length === 0}
  onError={handleError}
  label="Required Checkboxes"
/>
```

## Variants and Styling

### Success Variant (Great for Todo Lists)
```svelte
<CheckboxGroup 
  options={todoOptions}
  bind:values={completedTasks}
  variant="success"
  lineThrough={true}
  label="Project Tasks"
  description="Track your progress"
/>
```

### Warning and Destructive Variants
```svelte
<!-- Warning variant -->
<CheckboxGroup 
  options={warningOptions}
  variant="warning"
  label="Proceed with Caution"
/>

<!-- Destructive variant -->
<CheckboxGroup 
  options={deleteOptions}
  variant="destructive"
  label="Destructive Actions"
/>
```

## Option Structure

Each option in the `options` array should follow this structure:

```typescript
interface CheckboxGroupOption {
  id: string;           // Unique identifier
  label: string;        // Display text
  value: string;        // Value to be stored in the selected array
  description?: string; // Optional description text
  disabled?: boolean;   // Whether this specific option is disabled
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `CheckboxGroupOption[]` | `[]` | Array of checkbox options |
| `values` | `string[]` | `[]` | Array of selected values (bindable) |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Group text size |
| `checkboxSize` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Individual checkbox size |
| `variant` | `'default' \| 'destructive' \| 'success' \| 'warning'` | `'default'` | Visual variant |
| `lineThrough` | `boolean` | `false` | Strike through text when checked |
| `disabled` | `boolean` | `false` | Disable entire group |
| `error` | `boolean` | `false` | Error state with visual feedback |
| `label` | `string` | `undefined` | Group label |
| `description` | `string` | `undefined` | Group description |
| `required` | `boolean` | `false` | Whether field is required |
| `class` | `string` | `undefined` | Additional CSS classes |
| `onValuesChange` | `(values: string[]) => void` | `undefined` | Callback when values change |
| `onError` | `(error: boolean) => void` | `undefined` | Callback when error state changes |

## Examples

### Todo List
```svelte
<script>
  let todos = $state([
    { id: "1", label: "Set up project", value: "setup" },
    { id: "2", label: "Create components", value: "components" },
    { id: "3", label: "Write tests", value: "tests" },
  ]);
  
  let completed = $state(["setup"]);
</script>

<CheckboxGroup 
  options={todos}
  bind:values={completed}
  variant="success"
  lineThrough={true}
  label="Project Tasks"
  description="Track your progress"
/>

<p>Progress: {completed.length} / {todos.length} completed</p>
```

### Settings Panel
```svelte
<script>
  let settings = $state(["notifications"]);
  
  const settingsOptions = [
    { 
      id: "notif", 
      label: "Enable notifications", 
      value: "notifications",
      description: "Receive app notifications"
    },
    { 
      id: "dark", 
      label: "Dark mode", 
      value: "darkmode",
      description: "Use dark theme"
    },
    { 
      id: "analytics", 
      label: "Usage analytics", 
      value: "analytics",
      description: "Help improve our product"
    },
  ];
</script>

<CheckboxGroup 
  options={settingsOptions}
  bind:values={settings}
  label="App Settings"
  description="Customize your experience"
  checkboxSize="lg"
/>
```

### Form Integration
```svelte
<script>
  import { enhance } from '$app/forms';
  
  let interests = $state([]);
  
  const interestOptions = [
    { id: "tech", label: "Technology", value: "technology" },
    { id: "design", label: "Design", value: "design" },
    { id: "business", label: "Business", value: "business" },
  ];
</script>

<form method="POST" use:enhance>
  <CheckboxGroup 
    options={interestOptions}
    bind:values={interests}
    label="Interests"
    description="What topics interest you?"
    required={true}
  />
  
  <!-- Hidden inputs for form submission -->
  {#each interests as interest}
    <input type="hidden" name="interests" value={interest} />
  {/each}
  
  <button type="submit">Submit</button>
</form>
```

### Dynamic Options
```svelte
<script>
  let availableSkills = $state([
    { id: "js", label: "JavaScript", value: "javascript" },
    { id: "python", label: "Python", value: "python" },
    { id: "rust", label: "Rust", value: "rust" },
  ]);
  
  let selectedSkills = $state([]);
  
  function addSkill() {
    const newId = Date.now().toString();
    availableSkills = [...availableSkills, {
      id: newId,
      label: `New Skill ${newId}`,
      value: `skill_${newId}`
    }];
  }
  
  function handleSkillsChange(newSkills) {
    console.log('Skills changed:', newSkills);
    // Perform side effects here
  }
</script>

<CheckboxGroup 
  options={availableSkills}
  bind:values={selectedSkills}
  label="Your Skills"
  onValuesChange={handleSkillsChange}
/>

<button onclick={addSkill}>Add Skill</button>
```

## Accessibility

- ✅ Uses `<fieldset>` and `<legend>` for proper grouping
- ✅ Each checkbox has unique IDs for screen readers
- ✅ Proper ARIA attributes and relationships
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Required field indicators

## Best Practices

1. **Use descriptive labels** for better UX
2. **Group related options** logically
3. **Provide context** with group descriptions
4. **Use appropriate variants** for different actions
5. **Consider orientation** based on available space
6. **Handle empty states** gracefully
7. **Validate selections** when required

## Browser Support

Works in all modern browsers with full accessibility support.