<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CheckboxGroup } from "$lib/components/ui/checkbox";
  import { fn } from 'storybook/test';
  import * as Field from '$lib/components/ui/field';

  const basicOptions = [
    { id: "1", label: "Option 1", value: "option1" },
    { id: "2", label: "Option 2", value: "option2" },
    { id: "3", label: "Option 3", value: "option3" },
  ];

  const skillsOptions = [
    { id: "js", label: "JavaScript", value: "javascript", description: "ES6+ and modern JS frameworks" },
    { id: "ts", label: "TypeScript", value: "typescript", description: "Strongly typed JavaScript" },
    { id: "svelte", label: "Svelte", value: "svelte", description: "Modern reactive framework" },
    { id: "react", label: "React", value: "react", description: "Popular UI library" },
  ];

  const todoOptions = [
    { id: "task1", label: "Set up development environment", value: "task1" },
    { id: "task2", label: "Create component library", value: "task2" },
    { id: "task3", label: "Write documentation", value: "task3" },
  ];

  const { Story } = defineMeta({
    title: 'Components/Checkbox/Group',
    component: CheckboxGroup,
    tags: ['autodocs'],
    argTypes: {
      // Main props we want to control
      orientation: {
        control: { type: 'select' },
        options: ['vertical', 'horizontal'],
        description: 'Layout orientation of the checkbox group',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'vertical' },
        },
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg'],
        description: 'Size of the group text',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      checkboxSize: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg', 'xl'],
        description: 'Size of individual checkboxes',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      variant: {
        control: { type: 'select' },
        options: ['default', 'destructive', 'success', 'warning'],
        description: 'Visual variant of the checkboxes',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      lineThrough: {
        control: { type: 'boolean' },
        description: 'Whether to apply line-through style when checked',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the entire group is disabled',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      required: {
        control: { type: 'boolean' },
        description: 'Whether the field is required',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      error: {
        control: { type: 'boolean' },
        description: 'Error state - applies error styling via aria-invalid',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      onError: {
        control: false,
        description: 'Callback function called when error state changes',
        table: {
          type: { summary: '(error: boolean) => void' },
        },
      },
      label: {
        control: { type: 'text' },
        description: 'Label for the checkbox group',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      description: {
        control: { type: 'text' },
        description: 'Description text below the label',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      
      // Hide unwanted props from controls
      options: {
        control: false,
        table: { disable: true },
        description: 'Array of checkbox options (not controllable in Storybook)',
      },
      values: {
        control: false,
        table: { disable: true },
        description: 'Selected values array (not controllable in Storybook)',
      },
      onValuesChange: {
        control: false,
        table: { disable: true },
      },
      class: {
        control: false,
        table: { disable: true },
      },
    },
    args: {

      options: basicOptions,
      values: [],
      onValuesChange: fn(),
      onError: fn(),
    },
    
    // Disable automatic prop extraction
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
  });
</script>

<!-- Basic Examples -->
<Story name="Default" args={{ 
  options: basicOptions,
  label: "Choose your options"
}} />

<Story name="With Description" args={{ 
  options: basicOptions,
  label: "Choose your options",
  description: "Select one or more options from the list"
}} />

<Story name="With Values Selected" args={{ 
  options: basicOptions,
  values: ["option1", "option3"],
  label: "Pre-selected options"
}} />

<!-- Orientations -->
<Story name="Horizontal" args={{ 
  options: basicOptions,
  orientation: "horizontal",
  label: "Horizontal layout"
}} />

<!-- With Descriptions -->
<Story name="Options with Descriptions" args={{ 
  options: skillsOptions,
  label: "Technical Skills",
  description: "Select the technologies you're proficient in",
  values: ["javascript", "svelte"]
}} />

<!-- Sizes -->
<Story name="Small Checkboxes" args={{ 
  options: basicOptions,
  checkboxSize: "sm",
  label: "Small checkboxes"
}} />

<Story name="Large Checkboxes" args={{ 
  options: basicOptions,
  checkboxSize: "xl",
  label: "Extra large checkboxes"
}} />

<!-- Variants -->
<Story name="Success Variant" args={{ 
  options: todoOptions,
  variant: "success",
  lineThrough: true,
  label: "Project Tasks",
  description: "Track your progress",
  values: ["task1"]
}} />

<Story name="Warning Variant" args={{ 
  options: [
    { id: "warn1", label: "Proceed with caution", value: "warn1" },
    { id: "warn2", label: "Delete temporary files", value: "warn2" },
  ],
  variant: "warning",
  label: "Warning actions"
}} />

<Story name="Destructive Variant" args={{ 
  options: [
    { id: "del1", label: "Delete account", value: "del1" },
    { id: "del2", label: "Remove all data", value: "del2" },
  ],
  variant: "destructive",
  label: "Destructive actions"
}} />

<!-- States -->
<Story name="Required Field" args={{ 
  options: [
    { id: "terms", label: "I accept the terms and conditions", value: "terms" },
    { id: "privacy", label: "I accept the privacy policy", value: "privacy" },
  ],
  label: "Legal Agreement",
  description: "You must accept both agreements to continue",
  required: true,
  variant: "destructive"
}} />

<Story name="Disabled Group" args={{ 
  options: basicOptions,
  values: ["option1"],
  label: "Disabled Group",
  description: "This entire group is disabled",
  disabled: true
}} />

<Story name="Line Through (Todo List)" args={{ 
  options: todoOptions,
  lineThrough: true,
  label: "Todo List",
  description: "Completed items will be crossed out",
  values: ["task1", "task3"]
}} />

<!-- Error States -->
<Story name="Error State" args={{ 
  options: basicOptions,
  label: "Required Selection",
  description: "Please select at least one option",
  error: true,
  required: true
}} />

<Story name="Error with Values" args={{ 
  options: [
    { id: "e1", label: "Invalid Option 1", value: "e1" },
    { id: "e2", label: "Invalid Option 2", value: "e2" },
  ],
  values: ["e1"],
  label: "Invalid Selection",
  description: "These selections contain errors",
  error: true
}} />

<Story name="Error with Success Variant" args={{ 
  options: todoOptions,
  values: [],
  label: "Required Tasks",
  description: "You must complete at least one task",
  error: true,
  required: true,
  variant: "success"
}} />

<!-- Complex Example -->
<Story name="Settings Panel" args={{ 
  options: [
    { id: "notifications", label: "Enable notifications", value: "notifications", description: "Receive app notifications" },
    { id: "darkmode", label: "Dark mode", value: "darkmode", description: "Use dark theme" },
    { id: "analytics", label: "Usage analytics", value: "analytics", description: "Help improve our product" },
  ],
  label: "App Settings",
  description: "Customize your app experience",
  values: ["notifications"]
}} />
<!-- ========================================= -->
<!-- FIELD INTEGRATION -->
<!-- ========================================= -->

<Story name="Field with Basic CheckboxGroup">
  {#snippet template()}
    <Field.Field
      label="Select Features"
      description="Choose the features you want to enable"
      required
    >
      <CheckboxGroup 
        options={[
          { id: "feat1", label: "Feature A", value: "feature-a", description: "Enable feature A" },
          { id: "feat2", label: "Feature B", value: "feature-b", description: "Enable feature B" },
          { id: "feat3", label: "Feature C", value: "feature-c", description: "Enable feature C" },
        ]}
        values={["feature-a"]}
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Validation">
  {#snippet template()}
    <Field.Field
      label="User Permissions"
      description="Select at least one permission to continue"
      required
      error="Please select at least one permission"
    >
      <CheckboxGroup 
        options={[
          { id: "read", label: "Read", value: "read" },
          { id: "write", label: "Write", value: "write" },
          { id: "delete", label: "Delete", value: "delete" },
        ]}
        values={[]}
        error={true}
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Horizontal Layout">
  {#snippet template()}
    <Field.Field
      label="Notification Preferences"
      description="Choose how you want to be notified"
    >
      <CheckboxGroup 
        options={[
          { id: "email", label: "Email", value: "email" },
          { id: "sms", label: "SMS", value: "sms" },
          { id: "push", label: "Push", value: "push" },
        ]}
        orientation="horizontal"
        values={["email", "push"]}
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Todo List">
  {#snippet template()}
    <Field.Field
      label="Project Tasks"
      description="Track your progress on these tasks"
    >
      <CheckboxGroup 
        options={todoOptions}
        lineThrough={true}
        variant="success"
        values={["task1"]}
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Complete Form with Field.Set">
  {#snippet template()}
    <Field.Set>
      <Field.Legend>Account Setup</Field.Legend>
      <Field.Description>Configure your account preferences</Field.Description>
      
      <Field.Separator />
      
      <Field.Group class="gap-6">
        <Field.Field
          label="Communication Preferences"
          description="How should we contact you?"
          required
        >
          <CheckboxGroup
            options={[
              { id: "comm-email", label: "Email", value: "email", description: "Receive updates via email" },
              { id: "comm-sms", label: "SMS", value: "sms", description: "Receive text messages" },
              { id: "comm-push", label: "Push Notifications", value: "push", description: "Browser notifications" },
            ]}
            values={["email"]}
          />
        </Field.Field>

        <Field.Field
          label="Interests"
          description="What topics interest you?"
        >
          <CheckboxGroup
            options={[
              { id: "int-tech", label: "Technology", value: "tech" },
              { id: "int-design", label: "Design", value: "design" },
              { id: "int-business", label: "Business", value: "business" },
            ]}
            orientation="horizontal"
            values={["tech", "design"]}
          />
        </Field.Field>
      </Field.Group>
    </Field.Set>
  {/snippet}
</Story>
