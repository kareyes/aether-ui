<script lang="ts" context="module">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Select } from '../index';
  import * as Field from '$lib/components/ui/field';
  import { Button } from '$lib/components/ui/button';

  const { Story } = defineMeta({
    title: 'Components/Select',
    component: Select,
     tags: ['autodocs'],
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['default', 'ghost', 'outline', 'filled', 'underline'],
        description: 'The visual variant of the select',
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg'],
        description: 'The size of the select',
      },
      multiple: {
        control: { type: 'boolean' },
        description: 'Whether multiple selections are allowed',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the select is disabled',
      },
      required: {
        control: { type: 'boolean' },
        description: 'Whether the select is required',
      },
      placeholder: {
        control: { type: 'text' },
        description: 'Placeholder text when no option is selected',
      },
      error: {
        control: { type: 'boolean' },
        description: 'Error state - when true, applies error styling via aria-invalid',
      },
      loading: {
        control: { type: 'boolean' },
        description: 'Loading state - when true, shows a spinner and disables the select',
      },
      onError: {
        control: false,
        description: 'Callback function called when error state changes',
      },
    },
    args: {
      variant: 'default',
      size: 'default',
      multiple: false,
      disabled: false,
      required: false,
      placeholder: 'Select an option...',
      error: false,
      loading: false
    }
  });

  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "strawberry", label: "Strawberry" }
  ];

  const frameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "svelte", label: "Svelte" },
    { value: "angular", label: "Angular" },
    { value: "solid", label: "SolidJS" }
  ];

  const groupedOptions = [
    {
      label: "Frontend Frameworks",
      options: [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "svelte", label: "Svelte" },
        { value: "angular", label: "Angular" }
      ]
    },
    {
      label: "Backend Frameworks",
      options: [
        { value: "express", label: "Express.js" },
        { value: "fastify", label: "Fastify" },
        { value: "koa", label: "Koa.js" },
        { value: "nestjs", label: "NestJS" }
      ]
    }
  ];
</script>

<Story name="Default"  args={{ 
    options: fruits,
    class: "w-[200px]",
    placeholder: "Select a fruit..."
 }} />

<Story name="Multiple Selection" args={{ 
    options: frameworks,
    multiple: true,
    class: "w-[250px]",
    placeholder: "Select frameworks..."
  }} />

<Story name="Grouped Options" args={{ 
    groups: groupedOptions,
    class: "w-[250px]",
    placeholder: "Select a framework..."
  }} />

<Story name="Default Variant" args={{ 
    options: fruits,
    variant: "default",
    class: "w-[200px]",
    placeholder: "Default Select"
  }} />

<Story name="Outline Variant" args={{ 
    options: fruits,
    variant: "outline",
    class: "w-[200px]",
    placeholder: "Outline Select"
  }} />

<Story name="Filled Variant" args={{ 
    options: fruits,
    variant: "filled",
    class: "w-[200px]",
    placeholder: "Filled Select"
  }} />

<Story name="Ghost Variant" args={{ 
    options: fruits,
    variant: "ghost",
    class: "w-[200px]",
    placeholder: "Ghost Select"
  }} />

<Story name="Underline Variant" args={{ 
    options: fruits,
    variant: "underline",
    class: "w-[200px]",
    placeholder: "Underline Select"
  }} />

<Story name="Small Size" args={{ 
    options: fruits,
    size: "sm",
    class: "w-[200px]",
    placeholder: "Small Select"
  }} />

<Story name="Default Size" args={{ 
    options: fruits,
    size: "default",
    class: "w-[200px]",
    placeholder: "Default Select"
  }} />

<Story name="Large Size" args={{ 
    options: fruits,
    size: "lg",
    class: "w-[200px]",
    placeholder: "Large Select"
  }} />

<Story name="Normal State" args={{ 
    options: fruits,
    class: "w-[200px]",
    placeholder: "Normal Select"
  }} />

<Story name="Disabled State" args={{ 
    options: fruits,
    disabled: true,
    class: "w-[200px]",
    placeholder: "Disabled Select"
  }} />

<Story name="Loading State" args={{ 
    options: fruits,
    loading: true,
    class: "w-[200px]",
    placeholder: "Loading..."
  }} />

<Story name="With Disabled Options" args={{ 
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana", disabled: true },
      { value: "orange", label: "Orange" },
      { value: "grape", label: "Grape", disabled: true },
      { value: "strawberry", label: "Strawberry" }
    ],
    class: "w-[200px]",
    placeholder: "Some options disabled"
  }} />

<Story name="Error State" args={{ 
    options: fruits,
    error: true,
    class: "w-[200px]",
    placeholder: "This field has an error"
  }} />

<Story name="Error with Outline" args={{ 
    options: fruits,
    variant: "outline",
    error: true,
    class: "w-[200px]",
    placeholder: "Outline with error"
  }} />

<Story name="Error Large" args={{ 
    options: fruits,
    size: "lg",
    error: true,
    class: "w-[200px]",
    placeholder: "Large select with error"
  }} />

<!-- With Field Component -->
<Story name="Field with Label">
  {#snippet template()}
    <Field.Field
      label="Country"
      description="Select your country of residence"
    >
      <Select 
        options={fruits}
        placeholder="Select a country..."
        class="w-[250px]"
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Error">
  {#snippet template()}
    <Field.Field
      label="Framework"
      description="Choose your preferred framework"
      required
      error="Please select a framework"
    >
      <Select 
        options={frameworks}
        placeholder="Select framework..."
        error={true}
        class="w-[250px]"
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Grouped Options">
  {#snippet template()}
    <Field.Field
      label="Technology Stack"
      description="Select your primary framework"
      required
    >
      <Select 
        groups={groupedOptions}
        placeholder="Select a framework..."
        class="w-[250px]"
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Multiple Selection">
  {#snippet template()}
    <Field.Field
      label="Skills"
      description="Select all that apply"
    >
      <Select 
        options={frameworks}
        multiple={true}
        placeholder="Select skills..."
        class="w-[250px]"
      />
    </Field.Field>
  {/snippet}
</Story>



<Story name="Complete Form with Field">
  {#snippet template()}
    <div class="w-full max-w-md space-y-6">
      <Field.Set>
        <Field.Legend>Profile Information</Field.Legend>
        <Field.Description>Complete your profile</Field.Description>
        
        <Field.Separator />
        
        <Field.Group class="gap-4">
          <Field.Field
            label="Country"
            description="Your country of residence"
            required
          >
            <Select 
              options={fruits}
              placeholder="Select country..."
              class="w-full"
            />
          </Field.Field>
          
          <Field.Field
            label="Primary Framework"
            description="Your preferred frontend framework"
            required
          >
            <Select 
              options={frameworks}
              placeholder="Select framework..."
              variant="outline"
              size="lg"
              class="w-full"
            />
          </Field.Field>
          
          <Field.Field
            label="Skills"
            description="Select all languages you know"
            required
          >
            <Select 
              options={frameworks}
              multiple={true}
              placeholder="Select languages..."
              class="w-full"
            />
          </Field.Field>
        </Field.Group>
        
        <div class="flex gap-4 pt-4">
          <Button type="submit">Save Profile</Button>
          <Button type="button" variant="outline">Cancel</Button>
        </div>
      </Field.Set>
    </div>
  {/snippet}
</Story>
