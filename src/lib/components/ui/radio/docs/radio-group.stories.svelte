<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import { RadioGroup } from "$lib/components/ui/radio";
  import type { RadioGroupOption } from "$lib/components/ui/radio";
  import * as Field from '$lib/components/ui/field';
  import { Button } from '$lib/components/ui/button';

  type Args = {
    options: RadioGroupOption[];
    isCard?: boolean;
    value: string;
    label?: string;
    description?: string;
    orientation: 'vertical' | 'horizontal';
    radioSize: 'sm' | 'default' | 'lg' | 'xl';
    variant: 'default' | 'destructive' | 'success' | 'warning';
    required: boolean;
    disabled: boolean;
    error: boolean;
    class?: string;
  };

  const { Story } = defineMeta({
    title: 'Components/RadioGroup',
    // component: RadioGroup,
    tags: ['autodocs'],
    argTypes: {
      options: {
        control: { type: 'object' },
        description: 'Array of radio options with id, label, value, description, and disabled properties',
        table: {
          type: { summary: 'RadioGroupOption[]' },
          defaultValue: { summary: '[]' },
        },
      },
      value: {
        control: { type: 'text' },
        description: 'Currently selected value',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      label: {
        control: { type: 'text' },
        description: 'Label for the radio group',
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
      orientation: {
        control: { type: 'select' },
        options: ['vertical', 'horizontal'],
        description: 'Layout orientation of the radio group',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'vertical' },
        },
      },
      radioSize: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg', 'xl'],
        description: 'Size of the radio buttons',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      variant: {
        control: { type: 'select' },
        options: ['default', 'destructive', 'success', 'warning'],
        description: 'Visual variant of the radio buttons',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      required: {
        control: { type: 'boolean' },
        description: 'Whether the radio group is required',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the radio group is disabled',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      error: {
        control: { type: 'boolean' },
        description: 'Whether the radio group has an error state',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      isCard: {
        control: { type: 'boolean' },
        description: 'Whether to display radio options in card style',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      class: {
        control: { type: 'text' },
        description: 'Additional CSS classes',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
    },
    parameters: {
      docs: {
        description: {
          component: 'A radio group component that allows users to select one option from a set of choices. Supports different variants, sizes, orientations, and error states. Uses an options array for simplified configuration.',
        },
        extractArgTypes: false,
      },
    },
    args: {
      options: [],
      isCard: false,
      value: '',
      orientation: 'vertical',
      radioSize: 'default',
      variant: 'default',
      required: false,
      disabled: false,
      error: false,
    },
  });
</script>

{#snippet template(args: Args)}
	<RadioGroup {...args} />
{/snippet}

<Story name="Default" {template} args={{
  options: [
    { id: 'option1', label: 'Option 1', value: 'option1' },
    { id: 'option2', label: 'Option 2', value: 'option2' },
    { id: 'option3', label: 'Option 3', value: 'option3' },
  ],
  value: 'option1',
  label: 'Choose an option'}} />


<Story name="Variants">
  {#snippet template(args: Args)}
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-sm font-medium">Default Variant</h3>
        <RadioGroup
          options={[
            { id: 'default1', label: 'Default Option 1', value: 'default1' },
            { id: 'default2', label: 'Default Option 2', value: 'default2' },
          ]}
          value="default1"
          variant="default"
        />
      </div>
      
      <div>
        <h3 class="mb-4 text-sm font-medium">Destructive Variant</h3>
        <RadioGroup
          options={[
            { id: 'destructive1', label: 'Destructive Option 1', value: 'destructive1' },
            { id: 'destructive2', label: 'Destructive Option 2', value: 'destructive2' },
          ]}
          value="destructive1"
          variant="destructive"
        />
      </div>
      
      <div>
        <h3 class="mb-4 text-sm font-medium">Success Variant</h3>
        <RadioGroup
          options={[
            { id: 'success1', label: 'Success Option 1', value: 'success1' },
            { id: 'success2', label: 'Success Option 2', value: 'success2' },
          ]}
          value="success1"
          variant="success"
        />
      </div>

      <div>
        <h3 class="mb-4 text-sm font-medium">Warning Variant</h3>
        <RadioGroup
          options={[
            { id: 'warning1', label: 'Warning Option 1', value: 'warning1' },
            { id: 'warning2', label: 'Warning Option 2', value: 'warning2' },
          ]}
          value="warning1"
          variant="warning"
        />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template(args: Args)}
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-sm font-medium">Small Size</h3>
        <RadioGroup
          options={[
            { id: 'small1', label: 'Small Option 1', value: 'small1' },
            { id: 'small2', label: 'Small Option 2', value: 'small2' },
          ]}
          value="small1"
          radioSize="sm"
        />
      </div>
      
      <div>
        <h3 class="mb-4 text-sm font-medium">Default Size</h3>
        <RadioGroup
          options={[
            { id: 'medium1', label: 'Default Option 1', value: 'medium1' },
            { id: 'medium2', label: 'Default Option 2', value: 'medium2' },
          ]}
          value="medium1"
          radioSize="default"
        />
      </div>
      
      <div>
        <h3 class="mb-4 text-sm font-medium">Large Size</h3>
        <RadioGroup
          options={[
            { id: 'large1', label: 'Large Option 1', value: 'large1' },
            { id: 'large2', label: 'Large Option 2', value: 'large2' },
          ]}
          value="large1"
          radioSize="lg"
        />
      </div>

      <div>
        <h3 class="mb-4 text-sm font-medium">Extra Large Size</h3>
        <RadioGroup
          options={[
            { id: 'xlarge1', label: 'Extra Large Option 1', value: 'xlarge1' },
            { id: 'xlarge2', label: 'Extra Large Option 2', value: 'xlarge2' },
          ]}
          value="xlarge1"
          radioSize="xl"
        />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="With Descriptions">
  {#snippet template(args: Args)}
    <RadioGroup
      options={[
        {
          id: 'plan-free',
          label: 'Free Plan',
          value: 'free',
          description: 'Basic features for personal use'
        },
        {
          id: 'plan-pro',
          label: 'Pro Plan',
          value: 'pro',
          description: 'Advanced features for professionals'
        },
        {
          id: 'plan-enterprise',
          label: 'Enterprise Plan',
          value: 'enterprise',
          description: 'Full features for large teams'
        },
      ]}
      value="pro"
      label="Choose your plan"
      description="Select the plan that best fits your needs"
      radioSize="lg"
    />
  {/snippet}
</Story>

<Story name="Orientations">
  {#snippet template()}
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-sm font-medium">Vertical (Default)</h3>
        <RadioGroup
          options={[
            { id: 'email', label: 'Email notifications', value: 'email' },
            { id: 'push', label: 'Push notifications', value: 'push' },
            { id: 'sms', label: 'SMS notifications', value: 'sms' },
            { id: 'none', label: 'No notifications', value: 'none' },
          ]}
          value="email"
          label="Notification Preferences"
          orientation="vertical"
        />
      </div>
      
      <div>
        <h3 class="mb-4 text-sm font-medium">Horizontal</h3>
        <RadioGroup
          options={[
            { id: 'light', label: 'Light', value: 'light' },
            { id: 'dark', label: 'Dark', value: 'dark' },
            { id: 'auto', label: 'Auto', value: 'auto' },
          ]}
          value="auto"
          label="Theme Selection"
          orientation="horizontal"
        />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Error State">
  {#snippet template(args: Args)}
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-sm font-medium">Error without Selection</h3>
        <RadioGroup
          options={[
            { id: 'error1', label: 'Option 1', value: 'option1' },
            { id: 'error2', label: 'Option 2', value: 'option2' },
            { id: 'error3', label: 'Option 3', value: 'option3' },
          ]}
          value=""
          label="Required Selection"
          description="Please select one option"
          error={true}
          required
        />
      </div>

      <div>
        <h3 class="mb-4 text-sm font-medium">Error with Destructive Variant</h3>
        <RadioGroup
          options={[
            { id: 'danger1', label: 'Dangerous Option 1', value: 'danger1' },
            { id: 'danger2', label: 'Dangerous Option 2', value: 'danger2' },
          ]}
          value=""
          label="Warning Selection"
          description="This action cannot be undone"
          variant="destructive"
          error={true}
        />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Disabled State">
  {#snippet template(args: Args)}
    <RadioGroup
      options={[
        { id: 'disabled1', label: 'Disabled Option 1', value: 'option1' },
        { id: 'disabled2', label: 'Disabled Option 2', value: 'option2' },
        { id: 'disabled3', label: 'Disabled Option 3', value: 'option3' },
      ]}
      value="option2"
      label="Disabled Radio Group"
      description="This group cannot be modified"
      disabled
    />
  {/snippet}
</Story>

<Story name="With Disabled Options">
  {#snippet template(args: Args)}
    <RadioGroup
      options={[
        { id: 'mixed1', label: 'Available Option 1', value: 'option1' },
        { id: 'mixed2', label: 'Disabled Option 2', value: 'option2', disabled: true },
        { id: 'mixed3', label: 'Available Option 3', value: 'option3' },
        { id: 'mixed4', label: 'Disabled Option 4', value: 'option4', disabled: true },
      ]}
      value="option1"
      label="Mixed Availability"
      description="Some options are disabled"
    />
  {/snippet}
</Story>

<Story name="Card Style">
  {#snippet template(args: Args)}
    <RadioGroup
      options={[
        { id: 'card-k8s', label: 'Kubernetes', value: 'kubernetes', description: 'Run GPU workloads on a K8s configured cluster.' },
        { id: 'card-vm', label: 'Virtual Machine', value: 'vm', description: 'Access a VM configured cluster to run GPU workloads.' },
      ]}
      value="kubernetes"
      label="Select Cluster Type"
      description="Choose how you want to run your workloads"
      isCard={true}
    />
  {/snippet}
</Story>

<Story name="Card Style with Variants">
  {#snippet template(args: Args)}
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-sm font-medium">Success Variant</h3>
        <RadioGroup
          options={[
            { id: 'card-free', label: 'Free Plan', value: 'free', description: 'Basic features for personal use - $0/month' },
            { id: 'card-pro', label: 'Pro Plan', value: 'pro', description: 'Advanced features for professionals - $29/month' },
          ]}
          value="free"
          isCard={true}
          variant="success"
        />
      </div>
      <div>
        <h3 class="mb-4 text-sm font-medium">Warning Variant</h3>
        <RadioGroup
          options={[
            { id: 'card-delete', label: 'Soft Delete', value: 'soft', description: 'Move items to trash (recoverable)' },
            { id: 'card-permanent', label: 'Permanent Delete', value: 'permanent', description: 'Delete permanently (cannot be undone)' },
          ]}
          value="soft"
          isCard={true}
          variant="warning"
        />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Card Style Disabled">
  {#snippet template(args: Args)}
    <RadioGroup
      options={[
        { id: 'card-dis-1', label: 'Option 1', value: 'option1', description: 'First option is selected and disabled' },
        { id: 'card-dis-2', label: 'Option 2', value: 'option2', description: 'Second option is disabled' },
        { id: 'card-dis-3', label: 'Option 3', value: 'option3', description: 'Third option is disabled' },
      ]}
      value="option1"
      label="Disabled Card Style"
      isCard={true}
      disabled
    />
  {/snippet}
</Story>


<Story name="Field with Basic RadioGroup">
  {#snippet template()}
    <Field.Field
      label="Subscription Plan"
      description="Choose the plan that fits your needs"
      required
    >
      <RadioGroup 
        options={[
          { id: "free", label: "Free Plan", value: "free", description: "$0/month" },
          { id: "pro", label: "Pro Plan", value: "pro", description: "$29/month" },
          { id: "enterprise", label: "Enterprise", value: "enterprise", description: "$99/month" },
        ]}
        value="pro"
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Validation">
  {#snippet template()}
    <Field.Field
      label="Payment Method"
      description="Select your preferred payment method"
      required
      error="Please select a payment method"
    >
      <RadioGroup 
        options={[
          { id: "card", label: "Credit Card", value: "card" },
          { id: "paypal", label: "PayPal", value: "paypal" },
          { id: "bank", label: "Bank Transfer", value: "bank" },
        ]}
        value=""
        error={true}
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Card Variant">
  {#snippet template()}
    <Field.Field
      label="Choose Your Plan"
      description="Select the subscription tier that best fits your needs"
    >
      <RadioGroup 
        options={[
          { id: "free", label: "Free Plan", value: "free", description: "Basic features for personal use - $0/month" },
          { id: "pro", label: "Pro Plan", value: "pro", description: "Advanced features for professionals - $29/month" },
          { id: "enterprise", label: "Enterprise", value: "enterprise", description: "Custom solutions for large teams - $99/month" },
        ]}
        value="pro"
        isCard={true}
        variant="success"
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Horizontal Layout">
  {#snippet template()}
    <Field.Field
      label="Notification Frequency"
      description="How often would you like to receive updates?"
    >
      <RadioGroup 
        options={[
          { id: "realtime", label: "Real-time", value: "realtime" },
          { id: "daily", label: "Daily", value: "daily" },
          { id: "weekly", label: "Weekly", value: "weekly" },
        ]}
        orientation="horizontal"
        radioSize="lg"
      />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Complete Subscription Form">
  {#snippet template()}
    <div class="w-full max-w-2xl">
      <Field.Set>
        <Field.Legend>Subscription Settings</Field.Legend>
        <Field.Description>Configure your subscription preferences</Field.Description>
        
        <Field.Separator />
        
        <Field.Group class="gap-6">
          <Field.Field
            label="Plan Selection"
            description="Choose your subscription tier"
            required
          >
            <RadioGroup 
              options={[
                { id: "free", label: "Free", value: "free", description: "$0/month" },
                { id: "pro", label: "Pro", value: "pro", description: "$29/month" },
                { id: "enterprise", label: "Enterprise", value: "enterprise", description: "$99/month" },
              ]}
              value="pro"
              isCard={true}
            />
          </Field.Field>
          
          <Field.Field
            label="Billing Cycle"
            description="Select how you'd like to be billed"
            required
          >
            <RadioGroup 
              options={[
                { id: "monthly", label: "Monthly", value: "monthly", description: "Pay monthly" },
                { id: "yearly", label: "Yearly", value: "yearly", description: "Save 20%" },
              ]}
              value="monthly"
              orientation="horizontal"
              radioSize="lg"
            />
          </Field.Field>
          
          <Field.Field
            label="Support Channel"
            description="Preferred method for customer support"
          >
            <RadioGroup 
              options={[
                { id: "email", label: "Email Support", value: "email" },
                { id: "chat", label: "Live Chat", value: "chat" },
                { id: "phone", label: "Phone Support", value: "phone" },
              ]}
              value="email"
              variant="success"
            />
          </Field.Field>
        </Field.Group>
        
        <div class="flex gap-4 pt-4">
          <Button type="submit">Save Preferences</Button>
          <Button variant="outline" type="button">Cancel</Button>
        </div>
      </Field.Set>
    </div>
  {/snippet}
</Story>