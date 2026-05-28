<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from "$lib/components/ui/button-group";
  import { Button } from "$lib/components/ui/button";
  import { fn } from 'storybook/test';
  import type { ButtonGroupVariant } from "$lib/components/ui/button-group/button-group.svelte";
    import { type Args } from 'storybook/internal/types';

  const { Story } = defineMeta({
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['bg', 'ghost'],
        description: 'Visual variant of the button group',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'bg' },
        },
      },
      orientation: {
        control: { type: 'select' },
        options: ['horizontal', 'vertical'],
        description: 'Layout orientation of the button group',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'horizontal' },
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
          component: 'A flexible button group component that supports different variants and orientations. Can contain buttons, text labels, and separators.',
        },
        extractArgTypes: false,
      },
    },
    args: {
      variant: 'bg',
      orientation: 'horizontal',
    },
  });
</script>

<Story name="Default">
  {#snippet template(args: Args)}
  <ButtonGroup {...args} variant="bg" orientation="horizontal">
    <Button variant="outline">First</Button>
    <Button variant="outline">Second</Button>
    <Button variant="outline">Third</Button>
  </ButtonGroup>
    {/snippet}
</Story>

<Story name="Ghost Variant">
  {#snippet template(args: Args)}
  <div class="space-y-4">
    <div>
      <h3 class="mb-2 text-sm font-medium">Background Variant</h3>
      <ButtonGroup {...args} variant="bg">
        <Button variant="outline">Copy</Button>
        <Button variant="outline">Paste</Button>
        <Button variant="outline">Cut</Button>
      </ButtonGroup>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-medium">Ghost Variant</h3>
      <ButtonGroup {...args} variant="ghost">
        <Button variant="ghost">Copy</Button>
        <Button variant="ghost">Paste</Button>
        <Button variant="ghost">Cut</Button>
      </ButtonGroup>
    </div>
  </div>
    {/snippet}
</Story>

<Story name="With Text Labels">
  {#snippet template(args: Args)}
  <ButtonGroup {...args} variant="bg">
    <ButtonGroupText variant="bg">Actions</ButtonGroupText>
    <Button variant="outline">Save</Button>
    <Button variant="outline">Delete</Button>
    <Button variant="outline">Cancel</Button>
  </ButtonGroup>
    {/snippet}
</Story>

<Story name="With Separators">
  {#snippet template(args: Args)}
  <ButtonGroup {...args} variant="bg">
    <Button variant="outline">File</Button>
    <ButtonGroupSeparator />
    <Button variant="outline">Edit</Button>
    <Button variant="outline">View</Button>
    <ButtonGroupSeparator />
    <Button variant="outline">Help</Button>
  </ButtonGroup>
    {/snippet}
</Story>

<Story name="Vertical Orientation">
  {#snippet template(args: Args)}
  <ButtonGroup orientation="vertical" variant="bg">
    <Button variant="outline">Top</Button>
    <Button variant="outline">Middle</Button>
    <Button variant="outline">Bottom</Button>
  </ButtonGroup>
    {/snippet}
</Story>

<Story name="Complex Example">
  {#snippet template(args: Args)}
  <div class="space-y-4">
    <div>
      <h3 class="mb-2 text-sm font-medium">Toolbar with Text and Separators</h3>
      <ButtonGroup {...args} variant="bg">
        <ButtonGroupText variant="bg">Format</ButtonGroupText>
        <Button variant="outline" size="sm">Bold</Button>
        <Button variant="outline" size="sm">Italic</Button>
        <ButtonGroupSeparator />
        <Button variant="outline" size="sm">Align Left</Button>
        <Button variant="outline" size="sm">Center</Button>
        <Button variant="outline" size="sm">Align Right</Button>
      </ButtonGroup>
    </div>
    <div>
      <h3 class="mb-2 text-sm font-medium">Ghost Variant with Icons</h3>
      <ButtonGroup {...args} variant="ghost">
        <ButtonGroupText variant="ghost">Tools</ButtonGroupText>
        <Button variant="ghost" size="sm">🔧</Button>
        <Button variant="ghost" size="sm">⚙️</Button>
        <Button variant="ghost" size="sm">🔍</Button>
      </ButtonGroup>
    </div>
  </div>
  {/snippet}
</Story>

<Story name="Mixed Button Variants">
  {#snippet template(args: Args)}
  <ButtonGroup {...args} variant="bg">
    <Button variant="default">Primary</Button>
    <Button variant="outline">Secondary</Button>
    <Button variant="ghost">Tertiary</Button>
  </ButtonGroup>
  {/snippet}
</Story>