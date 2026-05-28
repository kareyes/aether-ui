<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Badge } from "$lib/components/ui/badge";
  import { fn } from 'storybook/test';
  import { Check, Star, Heart, Zap, AlertCircle, ShoppingCart, LoaderIcon } from '@lucide/svelte';

  const { Story } = defineMeta({
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
      // Main props we want to control
      variant: {
        control: { type: 'select' },
        options: ['default', 'secondary', 'flat', 'outline', 'dashed'],
        description: 'Visual variant of the badge',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      shape: {
        control: { type: 'select' },
        options: ['rounded', 'circle', 'square'],
        description: 'Shape of the badge',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'rounded' },
        },
      },
      color: {
        control: { type: 'select' },
        options: ['default', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'gray'],
        description: 'Color theme of the badge',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg'],
        description: 'Size of the badge',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      text: {
        control: { type: 'text' },
        description: 'Text content of the badge',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      dismissable: {
        control: { type: 'boolean' },
        description: 'Whether the badge can be dismissed',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      loading: {
        control: { type: 'boolean' },
        description: 'Whether the badge shows a loading spinner',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      clickable: {
        control: { type: 'boolean' },
        description: 'Whether the badge is clickable',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      href: {
        control: { type: 'text' },
        description: 'URL to link to (makes badge a link)',
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
      ref: {
        control: false,
        table: { disable: true },
      },
      children: {
        control: false,
        table: { disable: true },
      },
      onclick: {
        control: false,
        table: { disable: true },
        description: 'Click handler (not controllable in Storybook)',
      },
      onDismiss: {
        control: false,
        table: { disable: true },
        description: 'Dismiss handler (not controllable in Storybook)',
      },
    },
    args: {
      onclick: fn(),
      onDismiss: fn(),
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
<Story name="Default" args={{ text: "Default" }} />

<Story name="Default Variants" >
    {#snippet template()}
				<div class="flex flex-wrap gap-2">
					<Badge text="Default" variant="default" />
					<Badge text="Red" variant="default" color="red" />
					<Badge text="Orange" variant="default" color="orange" />
          <Badge text="Yellow" variant="default" color="yellow" />
					<Badge text="Green" variant="default" color="green" />
					<Badge text="Blue" variant="default" color="blue" />
					<Badge text="Purple" variant="default" color="purple" />
          <Badge text="Pink" variant="default" color="pink" />
          <Badge text="Gray" variant="default" color="gray" />
				</div>
    {/snippet}
</Story>


<Story name="Secondary Variants" >
    {#snippet template()}
				<div class="flex flex-wrap gap-2">
					<Badge text="Default" variant="secondary" />
					<Badge text="Red" variant="secondary" color="red" />
					<Badge text="Orange" variant="secondary" color="orange" />
          <Badge text="Yellow" variant="secondary" color="yellow" />
					<Badge text="Green" variant="secondary" color="green" />
					<Badge text="Blue" variant="secondary" color="blue" />
					<Badge text="Purple" variant="secondary" color="purple" />
          <Badge text="Pink" variant="secondary" color="pink" />
          <Badge text="Gray" variant="secondary" color="gray" />
				</div>
    {/snippet}
</Story>

<Story name="Flat Variants" >
    {#snippet template()}
				<div class="flex flex-wrap gap-2">
					<Badge text="Default" variant="flat" />
					<Badge text="Red" variant="flat" color="red" />
					<Badge text="Orange" variant="flat" color="orange" />
					<Badge text="Yellow" variant="flat" color="yellow" />
					<Badge text="Green" variant="flat" color="green" />
					<Badge text="Blue" variant="flat" color="blue" />
					<Badge text="Purple" variant="flat" color="purple" />
          <Badge text="Pink" variant="flat" color="pink" />
          <Badge text="Gray" variant="flat" color="gray" />
				</div>
    {/snippet}
</Story>


<Story name="Outline Variants" >
    {#snippet template()}
        <div class="flex flex-wrap gap-2">
          <Badge text="Default" variant="outline" />
          <Badge text="Red" variant="outline" color="red" />
          <Badge text="Orange" variant="outline" color="orange" />
          <Badge text="Yellow" variant="outline" color="yellow" />
          <Badge text="Green" variant="outline" color="green" />
          <Badge text="Blue" variant="outline" color="blue" />
          <Badge text="Purple" variant="outline" color="purple" />
          <Badge text="Pink" variant="outline" color="pink" />
          <Badge text="Gray" variant="outline" color="gray" />
        </div>
    {/snippet}
</Story>
<Story name="Dashed Variants" >
    {#snippet template()}
        <div class="flex flex-wrap gap-2">
          <Badge text="Default" variant="dashed" />
          <Badge text="Red" variant="dashed" color="red" />
          <Badge text="Orange" variant="dashed" color="orange" />
          <Badge text="Yellow" variant="dashed" color="yellow" />
          <Badge text="Green" variant="dashed" color="green" />
          <Badge text="Blue" variant="dashed" color="blue" />
          <Badge text="Purple" variant="dashed" color="purple" />
          <Badge text="Pink" variant="dashed" color="pink" />
          <Badge text="Gray" variant="dashed" color="gray" />
        </div>
    {/snippet}
</Story>

<Story name="Sizes" >
    {#snippet template()}
        <div class="flex flex-wrap gap-2 items-center">
          <Badge text="Small" size="sm" />
          <Badge text="Default" size="default" />
          <Badge text="Large" size="lg" />
        </div>
    {/snippet}
</Story>

<Story name="Shapes" >
    {#snippet template()}
        <div class="flex flex-wrap gap-2 items-center">
          <Badge text="Rounded" shape="rounded" />
          <Badge text="Circle" shape="circle" />
          <Badge text="Square" shape="square" />
        </div>
    {/snippet}
</Story>


<Story name="With Icons">
    {#snippet template()}
        <div class="flex flex-wrap gap-2 items-center">
          <Badge variant="default">
            {#snippet icon()}
              <Check class="size-3" />
            {/snippet}
            Verified
          </Badge>
          <Badge variant="secondary">
            {#snippet icon()}
              <Star class="size-3" />
            {/snippet}
            Premium
          </Badge>
          <Badge color="yellow">
            {#snippet icon()}
              <AlertCircle class="size-3" />
            {/snippet}
            Warning
          </Badge>
          <Badge text="Favorite" variant="outline" color="pink">
          {#snippet icon()}
            <Heart class="size-3" />
          {/snippet}
         </Badge>

        	<Badge text="Fast" variant="flat" color="purple">
          {#snippet icon()}
            <Zap class="size-3" />
          {/snippet}
        </Badge>

      		<Badge text="Cart" variant="dashed" color="blue">
          {#snippet icon()}
            <ShoppingCart class="size-3" />
          {/snippet}
        </Badge>
        <Badge text="In Progress" variant="outline" shape="circle" color="default">
          {#snippet icon()}
            <LoaderIcon  class="size-3" />
          {/snippet}
        </Badge>

        </div>
    {/snippet}
</Story>

<Story name="Loading State">
    {#snippet template()}
        <div class="flex flex-wrap gap-2 items-center">
          <Badge text="Loading" loading={true} />
          <Badge text="Processing" variant="secondary" loading={true} />
          <Badge text="Saving" variant="flat" color="blue" loading={true} />
          <Badge text="Updating" variant="outline" color="green" loading={true} />
          <Badge text="Syncing" variant="dashed" color="purple" loading={true} />
        </div>
    {/snippet}
</Story>

<Story name="Dismissable Badges">
    {#snippet template()}
        <div class="flex flex-wrap gap-2 items-center">
          <Badge text="Dismiss Me" dismissable={true} onDismiss={fn()} />
          <Badge text="Closeable" variant="secondary" dismissable={true} onDismiss={fn()} />
          <Badge text="Remove" variant="flat" color="red" dismissable={true} onDismiss={fn()} />
          <Badge text="Delete" variant="outline" color="orange" dismissable={true} onDismiss={fn()} />
          <Badge text="Clear" variant="dashed" color="green" dismissable={true} onDismiss={fn()} />
        </div>
    {/snippet}
</Story>

<Story name="Clickable Badges">
    {#snippet template()}
        <div class="flex flex-wrap gap-2 items-center">
          <Badge text="Click Me" clickable={true} onclick={fn()} />
          <Badge text="Press Here" variant="secondary" clickable={true} onclick={fn()} />
          <Badge text="Tap This" variant="flat" color="blue" clickable={true} onclick={fn()} />
          <Badge text="Select" variant="outline" color="purple" clickable={true} onclick={fn()} />
          <Badge text="Choose" variant="dashed" color="green" clickable={true} onclick={fn()} />
        </div>
    {/snippet}
</Story>


<Story name="Link Badge" args={{ 
  text: "Link", 
  href: "https://example.com",
  color: "blue"
}} />


<!-- Custom Content -->
<Story name="Custom Content" args={{ variant: "outline" }}>
  📊 Analytics
</Story>
