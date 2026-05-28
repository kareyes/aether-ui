<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import  Checkbox  from "../checkbox.svelte";
  import * as Field from '$lib/components/ui/field';
  import { Button } from '$lib/components/ui/button';
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/Checkbox/Single',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
      // Main props we want to control
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg', 'xl'],
        description: 'Size of the checkbox',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      variant: {
        control: { type: 'select' },
        options: ['default', 'destructive', 'success', 'warning'],
        description: 'Visual variant of the checkbox',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      checked: {
        control: { type: 'boolean' },
        description: 'Whether the checkbox is checked',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      indeterminate: {
        control: { type: 'boolean' },
        description: 'Whether the checkbox is in indeterminate state',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
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
        description: 'Whether the checkbox is disabled',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      label: {
        control: { type: 'text' },
        description: 'Label text for the checkbox',
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
      error: {
        control: { type: 'boolean' },
        description: 'Error state - when true, applies error styling via aria-invalid',
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
      
      // Hide unwanted props from controls
      class: {
        control: false,
        table: { disable: true },
      },
      ref: {
        control: false,
        table: { disable: true },
      },
      id: {
        control: false,
        table: { disable: true },
      },
      name: {
        control: false,
        table: { disable: true },
      },
      value: {
        control: false,
        table: { disable: true },
      },
      required: {
        control: false,
        table: { disable: true },
      },
      onCheckedChange: {
        control: false,
        table: { disable: true },
      },
      // Hide any other internal props
      children: {
        control: false,
        table: { disable: true },
      },
    },
    args: {
      checked: false,
      indeterminate: false,
      lineThrough: false,
      disabled: false,
      size: 'default',
      variant: 'default',
      label: undefined,
      description: undefined,
    },
    
    parameters: {
      docs: {
        extractArgTypes: false, // Disable automatic prop extraction
      },
    },
  });
</script>

<!-- Basic States -->
<Story name="Default" args={{ }} />
<Story name="Checked" args={{ checked: true }} />
<Story name="Indeterminate" args={{ indeterminate: true }} />
<Story name="Error State" args={{ error: true, label: "Accept terms", description: "This field is required" }} />
<Story name="Error Checked" args={{ error: true, checked: true, label: "Invalid selection" }} />

<!-- With Labels -->
<Story name="With Label" args={{ label: "Accept terms and conditions" }} />
<Story name="With Description" args={{ 
  label: "Enable notifications", 
  description: "Get notified about updates and new features" 
}} />

<!-- Sizes -->
<Story name="Small" args={{ size: 'sm', label: 'Small checkbox' }} />
<Story name="Large" args={{ size: 'lg', label: 'Large checkbox' }} />
<Story name="Extra Large" args={{ size: 'xl', label: 'Extra large checkbox' }} />

<!-- Variants -->
<Story name="Destructive" args={{ 
  variant: 'destructive', 
  label: 'Delete all data',
  description: 'This action cannot be undone'
}} />
<Story name="Success" args={{ 
  variant: 'success', 
  label: 'Mark as completed',
  description: 'This will mark the task as done'
}} />
<Story name="Warning" args={{ 
  variant: 'warning', 
  label: 'Proceed with caution',
  description: 'This action requires attention'
}} />


<Story name="Line Through Checked" args={{ 
  checked: true,
  lineThrough: true,
  label: 'Completed task',
  description: 'This text is crossed out'
}} />


<Story name="Disabled Checked" args={{ 
  checked: true,
  disabled: true,
  label: 'Disabled checked',
  description: 'This checkbox is disabled and checked'
}} />

<!-- Complex Example -->
<Story name="Todo Item" args={{ 
  size: 'default',
  lineThrough: true,
  label: 'Complete project documentation',
  description: 'Write comprehensive docs for all components'
}} />

<!-- With Field Component -->
<Story name="Field with Single Checkbox">
  {#snippet template()}
    <Field.Field
      label="Agreements"
      description="Please review and accept our policies"
      required
    >
      <Checkbox 
        label="I accept the terms and conditions"
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Checkbox Group">
  {#snippet template()}
    <Field.Set>
      <Field.Legend>Email Preferences</Field.Legend>
      <Field.Description>Choose which emails you'd like to receive</Field.Description>
      
      <Field.Separator />
      
      <Field.Group class="gap-4">
        <Checkbox 
          label="Notifications"
          description="Receive notifications about account activity"
        />
        
        <Checkbox 
          label="Marketing Emails"
          description="Get updates about new products and features"
        />
        
        <Checkbox 
          label="Product Updates"
          description="Stay informed about product improvements"
        />
      </Field.Group>
    </Field.Set>
  {/snippet}
</Story>

<Story name="Field with Error">
  {#snippet template()}
    <Field.Field
      label="Terms & Conditions"
      required
      error="You must accept the terms to continue"
    >
      <Checkbox 
        label="I accept the terms and conditions"
        variant="destructive"
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Task Checklist">
  {#snippet template()}
    <Field.Set>
      <Field.Legend>Project Checklist</Field.Legend>
      <Field.Description>Track your project progress</Field.Description>
      
      <Field.Separator />
      
      <Field.Group class="gap-4">
        <Checkbox 
          label="Complete Design"
          description="UI/UX design and mockups"
          lineThrough={true}
          variant="default"
        />
        
        <Checkbox 
          label="Development Phase"
          description="Code implementation"
          lineThrough={true}
          variant="default"
        />
        
        <Checkbox 
          checked={true}
          label="Deployment"
          description="Deploy to production"
          lineThrough={true}
          variant="success"
        />
      </Field.Group>
    </Field.Set>
  {/snippet}
</Story>

<Story name="Complete Form with Field">
  {#snippet template()}
    <div class="w-full max-w-md space-y-6">
      <Field.Set>
        <Field.Legend>Account Setup</Field.Legend>
        <Field.Description>Complete your account registration</Field.Description>
        
        <Field.Separator />
        
        <Field.Group class="gap-4">
          <Field.Field
            label="Required Agreements"
            required
            error="You must accept the terms"
          >
            <Checkbox 
              label="I accept the terms and conditions"
              variant="destructive"
              size="lg"
            />
          </Field.Field>
          
          <Field.Field
            label="Age Verification"
            required
          >
            <Checkbox 
              checked={true}
              label="I confirm I am 18 years or older"
              variant="success"
              size="lg"
            />
          </Field.Field>
          
          <Field.Field
            label="Optional Subscriptions"
            description="Choose which communications you'd like to receive"
          >
            <div class="space-y-2">
              <Checkbox 
                label="Subscribe to newsletter"
                description="Weekly updates and tips"
              />
              
              <Checkbox 
                checked={true}
                label="Product updates"
                description="New features and improvements"
              />
            </div>
          </Field.Field>
        </Field.Group>
        
        <div class="flex gap-4 pt-4">
          <Button type="submit">Create Account</Button>
          <Button variant="outline" type="button">Cancel</Button>
        </div>
      </Field.Set>
    </div>
  {/snippet}
</Story>