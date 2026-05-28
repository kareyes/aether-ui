<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from "../button.svelte";
  import { fn } from 'storybook/test';
  	import DownloadIcon from "@lucide/svelte/icons/download";
    import { Sizes, Variants, Colors } from '..';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      // Main props we want to control
      variant: {
        control: { type: 'select' },
        options: Variants,
        description: 'Visual variant of the button',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      size: {
        control: { type: 'select' },
        options: Sizes,
        description: 'Size of the button',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      color: {
        control: { type: 'select' },
        options: Colors,
        description: 'Color variant of the button',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      text: {
        control: { type: 'text' },
        description: 'Button text content',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      loading: {
        control: { type: 'boolean' },
        description: 'Whether the button is in loading state',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      loadingText: {
        control: { type: 'text' },
        description: 'Text to show during loading state',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'Loading...' },
        },
      },
      iconPosition: {
        control: { type: 'select' },
        options: ['left', 'right'],
        description: 'Position of the icon relative to text',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'left' },
        },
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the button is disabled',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
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
      href: {
        control: false,
        table: { disable: true },
      },
      type: {
        control: false,
        table: { disable: true },
      },
      onclick: {
        control: false,
        table: { disable: true },
      },
      children: {
        control: false,
        table: { disable: true },
      },
      icon: {
        control: false,
        table: { disable: true },
        description: 'Lucide Icon component (not controllable in Storybook)',
      },
    },
    args: {
      onclick: fn(),
    },
    
    // Disable automatic prop extraction
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
  });
</script>

<Story name="Default" args={{ variant: 'default', text: 'Button' }} />
<Story name="Secondary" args={{ variant: 'secondary', text: 'Button' }} />
<Story name="Outline" args={{ variant: 'outline', text: 'Button' }} />
<Story name="Destructive" args={{ variant: 'destructive', text: 'Button' }} />
<Story name="Ghost" args={{ variant: 'ghost', text: 'Button' }} />
<Story name="Link" args={{ variant: 'link', text: 'Button' }} />
<Story name="Bordered" args={{ variant: 'bordered', text: 'Button' }} />
<Story name="Flat" args={{ variant: 'flat', text: 'Button' }} />

<!-- Color Variants -->
<Story name="Success" args={{ variant: 'default', color: 'success', text: 'Success' }} />
<Story name="Warning" args={{ variant: 'default', color: 'warning', text: 'Warning' }} />
<Story name="Danger" args={{ variant: 'default', color: 'danger', text: 'Danger' }} />
<Story name="Info" args={{ variant: 'default', color: 'info', text: 'Info' }} />

<!-- Outline Colors -->
<Story name="Outline Success" args={{ variant: 'outline', color: 'success', text: 'Success' }} />
<Story name="Outline Warning" args={{ variant: 'outline', color: 'warning', text: 'Warning' }} />
<Story name="Outline Danger" args={{ variant: 'outline', color: 'danger', text: 'Danger' }} />
<Story name="Outline Info" args={{ variant: 'outline', color: 'info', text: 'Info' }} />

<!-- Bordered Colors -->
<Story name="Bordered Success" args={{ variant: 'bordered', color: 'success', text: 'Success' }} />
<Story name="Bordered Warning" args={{ variant: 'bordered', color: 'warning', text: 'Warning' }} />
<Story name="Bordered Danger" args={{ variant: 'bordered', color: 'danger', text: 'Danger' }} />
<Story name="Bordered Info" args={{ variant: 'bordered', color: 'info', text: 'Info' }} />

<!-- Flat Colors -->
<Story name="Flat Success" args={{ variant: 'flat', color: 'success', text: 'Success' }} />
<Story name="Flat Warning" args={{ variant: 'flat', color: 'warning', text: 'Warning' }} />
<Story name="Flat Danger" args={{ variant: 'flat', color: 'danger', text: 'Danger' }} />
<Story name="Flat Info" args={{ variant: 'flat', color: 'info', text: 'Info' }} />

<!-- Ghost Colors -->
<Story name="Ghost Success" args={{ variant: 'ghost', color: 'success', text: 'Success' }} />
<Story name="Ghost Warning" args={{ variant: 'ghost', color: 'warning', text: 'Warning' }} />
<Story name="Ghost Danger" args={{ variant: 'ghost', color: 'danger', text: 'Danger' }} />
<Story name="Ghost Info" args={{ variant: 'ghost', color: 'info', text: 'Info' }} />

<Story name="With Icon" args={{ variant: 'default', text: 'Button', icon: DownloadIcon }} />
<Story name="With Icon Position" args={{ variant: 'default', text: 'Button', icon: DownloadIcon, iconPosition: 'right' }} />


<Story name="Loading State" args={{ variant: 'default', text: 'Loading...', loading: true }} />
<Story name="Icon Only" args={{ variant: 'default', icon: DownloadIcon, size: 'icon'}} />

<Story name="Custom Content" args={{ variant: 'outline' }}>
    <DownloadIcon class="size-4 mr-2" />
    Custom Content
</Story>

