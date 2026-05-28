<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import {Card} from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Input } from "$lib/components/ui/input";
	import { Switch } from "$lib/components/ui/switch";
	import {Field} from "$lib/components/ui/field";
    import {type Args } from 'storybook/internal/types';

  const { Story } = defineMeta({
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
      // Main props we want to control
      variant: {
        control: { type: 'select' },
        options: ['default', 'outline', 'ghost', 'elevated', 'filled'],
        description: 'Visual variant of the card',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      padding: {
        control: { type: 'select' },
        options: ['none', 'sm', 'default', 'lg'],
        description: 'Internal padding size',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      hover: {
        control: { type: 'boolean' },
        description: 'Enable hover effects',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      interactive: {
        control: { type: 'boolean' },
        description: 'Enable interactive/clickable state',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      title: {
        control: { type: 'text' },
        description: 'Card title text',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      description: {
        control: { type: 'text' },
        description: 'Card description/subtitle',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      
      // Hide unwanted props from controls
      class: {
        control: false,
        table: { disable: true },
      },
      children: {
        control: false,
        table: { disable: true },
      },
      headerAction: {
        control: false,
        table: { disable: true },
        description: 'Snippet for header actions',
      },
      footer: {
        control: false,
        table: { disable: true },
        description: 'Snippet for footer content',
      },
    },
    args: {
      // onclick: fn(),
    },
    
    // Disable automatic prop extraction
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
  });
</script>

<!-- Basic Variants -->
<Story name="Default" args={{title: "Default Card", description: "Standard card with border and shadow"}}>
  
    <p class="text-sm">This is the default card variant with standard styling.</p>
</Story>

<Story name="Outline" args={{variant: "outline", title: "Outline Card", description: "Card with emphasized border"}}>
  
    <p class="text-sm">This card has a thicker border for more emphasis.</p>
</Story>

<Story name="Ghost" args={{variant: "ghost", title: "Ghost Card", description: "Minimal styling"}}>
  
    <p class="text-sm">This card has minimal styling without border or shadow.</p>
</Story>

<Story name="Elevated" args={{variant: "elevated", title: "Elevated Card", description: "Enhanced shadow"}}>
  
    <p class="text-sm">This card has an enhanced shadow for more depth.</p>
</Story>

<Story name="Filled" args={{variant: "filled", title: "Filled Card", description: "Filled background"}}>
  
    <p class="text-sm">This card has a filled background color.</p>
</Story>

<!-- Padding Options -->
<Story name="No Padding" args={{padding: "none", title: "No Padding"}}>
  
    <div class="bg-muted p-4 rounded">
      <p class="text-sm">Content fills the entire card with no padding.</p>
    </div>
</Story>

<Story name="Small Padding" args={{padding: "sm", title: "Small Padding"}}>
    <p class="text-sm">Compact card with small padding.</p>

</Story>

<Story name="Large Padding" args={{padding: "lg", title: "Large Padding"}}>
    <p class="text-sm">Spacious card with large padding.</p>

</Story>

<!-- Interactive States -->
<Story name="Hover Effect" args={{hover: true, title: "Hover Card", description: "Hover over this card"}}>
    <p class="text-sm">This card responds to hover with enhanced shadow and border color.</p>

</Story>

<Story name="Interactive" args={{interactive: true, title: "Interactive Card", description: "This card is clickable"}}>
    <p class="text-sm">Click anywhere on this card to trigger an action.</p>
</Story>

<!-- Cards with Header Actions -->
<Story name="With Header Action">
  {#snippet template(args: Args)}
  <Card {...args} title="Edit Profile" description="Update your personal information">
    {#snippet headerAction()}
      <Button variant="ghost" size="sm">Edit</Button>
    {/snippet}
    <div class="space-y-3">
      <Field label="Full Name">
        <Input id="full-name" value="John Doe" />
      </Field>
      <Field label="Email">
        <Input id="email" type="email" value="john@example.com" />
      </Field>
    </div>
  </Card>
    {/snippet}
</Story>

<Story name="With Badge Action">
  {#snippet template(args: Args)}
  <Card {...args} title="Notifications" description="Control your notification preferences">
    {#snippet headerAction()}
      <Badge>3 New</Badge>
    {/snippet}
    <div class="space-y-3">
      <Field label="Email notifications" orientation="horizontal">
        <Switch id="email-notif" checked={true} />
      </Field>
      <Field label="Push notifications" orientation="horizontal">
        <Switch id="push-notif" checked={true} />
      </Field>
    </div>
  </Card>
    {/snippet}
</Story>

<!-- Cards with Footers -->
<Story name="With Footer">
  {#snippet template(args: Args)}
  <Card {...args} title="Confirm Action" description="This action requires confirmation">
    <p class="text-sm text-muted-foreground">
      Are you sure you want to proceed? This action cannot be undone.
    </p>
    {#snippet footer()}
      <Button variant="outline" size="sm">Cancel</Button>
      <Button variant="destructive" size="sm">Confirm</Button>
    {/snippet}
  </Card>
    {/snippet}
</Story>

<Story name="Footer with Info">
  {#snippet template(args: Args)}
  <Card {...args} title="Save Changes" description="Update your preferences">
    <Field label="Username">
      <Input id="username-save" value="johndoe" />
    </Field>
    {#snippet footer()}
      <div class="flex-1 text-xs text-muted-foreground">Last saved: 5 minutes ago</div>
      <Button variant="outline" size="sm">Discard</Button>
      <Button size="sm">Save</Button>
    {/snippet}
  </Card>
    {/snippet}
</Story>

<!-- Complex Examples -->
<Story name="Subscription Card">
  {#snippet template(args: Args)}
  <Card 
    {...args}
    title="Subscription Plan" 
    description="Manage your subscription and billing"
    variant="elevated"
    hover={true}
  >
    {#snippet headerAction()}
      <Badge>Active</Badge>
    {/snippet}

    <div class="space-y-4">
      <Field label="Current Plan">
        <Input id="current-plan" value="Pro Plan" disabled />
      </Field>

      <Field label="Auto-renew subscription" orientation="horizontal">
        <Switch id="auto-renew" checked={true} />
      </Field>
      <div class="rounded bg-muted p-4 space-y-1">
        <div class="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>$29.00</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Tax</span>
          <span>$2.32</span>
        </div>
        <hr class="my-2" />
        <div class="flex justify-between font-semibold">
          <span>Total</span>
          <span>$31.32/month</span>
        </div>
      </div>
    </div>

    {#snippet footer()}
      <div class="flex-1 text-xs text-muted-foreground">
        Next billing: Dec 1, 2025
      </div>
      <Button variant="outline" size="sm">Cancel Plan</Button>
      <Button size="sm">Upgrade</Button>
    {/snippet}
  </Card>
    {/snippet}
</Story>

<Story name="Settings Card">
  {#snippet template(args: Args)}
  <Card 
    {...args}
    title="Project Settings" 
    description="Configure your project preferences"
    variant="outline"
    interactive={true}
  >
    {#snippet headerAction()}
      <Button variant="ghost" size="sm">Export</Button>
    {/snippet}

    <div class="space-y-4">
      <Field label="Project Name">
        <Input id="project-name" value="My Awesome Project" />
      </Field>

      <Field label="Description">
        <Input id="project-desc" value="A description of the project" />
      </Field>
      <div class="space-y-2">
        <Field label="Enable analytics" orientation="horizontal">
          <Switch id="analytics" checked={true} />
        </Field>
        <Field label="Allow comments" orientation="horizontal">
          <Switch id="comments" checked={true} />
        </Field>
      </div>
    </div>

    {#snippet footer()}
      <div class="flex-1"></div>
      <Button variant="outline" size="sm">Reset</Button>
      <Button size="sm">Save Settings</Button>
    {/snippet}
  </Card>
    {/snippet}
</Story>

<Story name="Stats Card">
  {#snippet template(args: Args)}
  <Card {...args} variant="elevated" padding="lg">
    <div class="text-center">
      <p class="text-sm text-muted-foreground">Total Users</p>
      <p class="text-4xl font-bold mt-2">12,345</p>
      <p class="text-xs text-green-600 mt-1">↑ 12% from last month</p>
    </div>
  </Card>
    {/snippet}
</Story>

<Story name="Product Card">
  {#snippet template(args: Args)}
  <Card 
    {...args}
    title="Premium Plan" 
    description="Best for teams"
    variant="outline"
    interactive={true}
  >
    <div class="space-y-2">
      <p class="text-3xl font-bold">$29/month</p>
      <ul class="space-y-1 text-sm">
        <li>✓ Unlimited projects</li>
        <li>✓ Advanced analytics</li>
        <li>✓ Priority support</li>
      </ul>
    </div>
    
    {#snippet footer()}
      <Button class="w-full">Get Started</Button>
    {/snippet}
  </Card>
    {/snippet}
</Story>

<!-- Variant Combinations -->
<Story name="Ghost + Small Padding">
  {#snippet template(args: Args)}
  <Card {...args} variant="ghost" padding="sm" title="Compact Ghost">
    <p class="text-sm">Minimal card with compact padding.</p>
  </Card>
    {/snippet}
</Story>

<Story name="Outline + Large + Hover">
  {#snippet template(args: Args)}
  <Card {...args} variant="outline" padding="lg" hover={true} title="Spacious Outline">
    <p class="text-sm">Emphasized border with spacious padding and hover effect.</p>
  </Card>
    {/snippet}
</Story>

<Story name="Elevated + Interactive">
  {#snippet template(args: Args)}
  <Card {...args} variant="elevated" interactive={true} title="Clickable Elevated">
    <p class="text-sm">Lifted appearance with full interactivity.</p>
  </Card>
    {/snippet}
</Story>

<Story name="Filled + No Padding">
  {#snippet template(args: Args)}
  <Card {...args} variant="filled" padding="none" title="Full Bleed Filled">
    <div class="bg-primary/5 p-4 rounded">
      <p class="text-sm">Filled background with custom internal padding.</p>
    </div>
  </Card>
    {/snippet}
</Story>

<!-- Only Title -->
<Story name="Title Only">
  {#snippet template(args: Args)}
  <Card {...args} title="Simple Title Card">
    <p class="text-sm">A card with only a title, no description.</p>
  </Card>
    {/snippet}
</Story>

<!-- Only Description -->
<Story name="Description Only">
  {#snippet template(args: Args)}
  <Card {...args} description="This card has only a description">
    <p class="text-sm">No title, just content with description.</p>
  </Card>
    {/snippet}
</Story>

<!-- No Header -->
<Story name="Content Only">
  {#snippet template(args: Args)}
  <Card {...args}>
    <p class="text-sm">A simple card with just content, no header or footer.</p>
  </Card>
    {/snippet}
</Story>

<!-- Team Members Card -->
<Story name="Team Members">
  {#snippet template(args: Args)}
  <Card {...args} title="Team Members" description="Manage your team">
    <div class="space-y-2">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-full bg-primary/10"></div>
        <div class="flex-1">
          <p class="text-sm font-medium">John Doe</p>
          <p class="text-xs text-muted-foreground">john@example.com</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-full bg-primary/10"></div>
        <div class="flex-1">
          <p class="text-sm font-medium">Jane Smith</p>
          <p class="text-xs text-muted-foreground">jane@example.com</p>
        </div>
      </div>
    </div>
    {#snippet footer()}
      <Button variant="outline" size="sm" class="w-full">Invite Member</Button>
    {/snippet}
  </Card>
    {/snippet}
</Story>

<!-- API Key Card -->
<Story name="API Key">
  {#snippet template(args: Args)}
  <Card {...args} title="API Key" description="Manage your API credentials">
    {#snippet headerAction()}
      <Button variant="outline" size="sm">Regenerate</Button>
    {/snippet}
    <div class="space-y-3">
      <div class="rounded bg-muted p-3 font-mono text-xs">
        sk_live_abc123def456ghi789
      </div>
      <p class="text-xs text-muted-foreground">
        Keep your API key secure. Never share it publicly.
      </p>
    </div>
  </Card>
    {/snippet}
</Story>
