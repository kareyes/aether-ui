<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    BreadcrumbEllipsis
  } from "$lib/components/ui/breadcrumb";
  import { Home, Folder, File } from "@lucide/svelte";

  const { Story } = defineMeta({
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    argTypes: {
      // List props
      listVariant: {
        control: { type: 'select' },
        options: ['default', 'solid', 'subtle', 'bold'],
        description: 'Visual variant of the breadcrumb list',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg'],
        description: 'Size of the breadcrumbs',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      spacing: {
        control: { type: 'select' },
        options: ['compact', 'default', 'relaxed'],
        description: 'Spacing between breadcrumb items',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      linkVariant: {
        control: { type: 'select' },
        options: ['default', 'underline', 'bold', 'subtle'],
        description: 'Visual variant of breadcrumb links',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      separatorVariant: {
        control: { type: 'select' },
        options: ['default', 'slash', 'dot', 'arrow'],
        description: 'Style of the separator',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      pageVariant: {
        control: { type: 'select' },
        options: ['default', 'bold', 'muted', 'accent'],
        description: 'Visual variant of the current page',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
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
    },
    
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
  });
</script>

<!-- Basic Default -->
<Story name="Default">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<!-- List Variants -->
<Story name="Solid Variant">
    <BreadcrumbList variant="solid">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Getting Started</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<Story name="Subtle Variant">
    <BreadcrumbList variant="subtle">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Article</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<Story name="Bold Variant">
    <BreadcrumbList variant="bold">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Laptops</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<!-- Link Variants -->
<Story name="Underline Links">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink variant="underline" href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink variant="underline" href="/settings">Settings</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Profile</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<Story name="Bold Links">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink variant="bold" href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink variant="bold" href="/dashboard">Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Analytics</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<Story name="Subtle Links">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink variant="subtle" href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink variant="subtle" href="/help">Help</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>FAQ</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<!-- Separator Variants -->
<Story name="Slash Separator">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator variant="slash" />
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator variant="slash" />
      <BreadcrumbItem>
        <BreadcrumbPage>Introduction</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<Story name="Dot Separator">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator variant="dot" />
      <BreadcrumbItem>
        <BreadcrumbLink href="/about">About</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator variant="dot" />
      <BreadcrumbItem>
        <BreadcrumbPage>Team</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<Story name="Arrow Separator">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator variant="arrow" />
      <BreadcrumbItem>
        <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator variant="arrow" />
      <BreadcrumbItem>
        <BreadcrumbPage>Website</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<!-- Page Variants -->
<Story name="Bold Page">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage variant="bold">Current Page</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<Story name="Muted Page">
  <BreadcrumbList>
    <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage variant="muted">Current Page</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<Story name="Accent Page">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage variant="accent">Current Page</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<!-- Sizes -->
<Story name="Small">
    <BreadcrumbList size="sm">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator size="sm" />
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator size="sm" />
      <BreadcrumbItem>
        <BreadcrumbPage>Small</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<Story name="Large">
    <BreadcrumbList size="lg">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator size="lg" />
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator size="lg" />
      <BreadcrumbItem>
        <BreadcrumbPage>Large</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<!-- Spacing -->
<Story name="Compact Spacing">
    <BreadcrumbList spacing="compact">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Compact</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<Story name="Relaxed Spacing">
  <BreadcrumbList spacing="relaxed">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Relaxed</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<!-- With Icons -->
<Story name="With Icons">
  <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Home class="size-4" />
          <span>Home</span>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/documents">
          <Folder class="size-4" />
          <span>Documents</span>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>
          <File class="size-4" />
          <span>readme.md</span>
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<!-- With Ellipsis -->
<Story name="With Ellipsis">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<!-- Custom Separator -->
<Story name="Custom Separator">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <span class="text-muted-foreground">→</span>
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="/custom">Custom</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <span class="text-muted-foreground">→</span>
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Separator</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>

<!-- Combination: Bold + Slash + Large -->
<Story name="Bold Slash Large">
    <BreadcrumbList variant="bold" size="lg" spacing="relaxed">
      <BreadcrumbItem>
        <BreadcrumbLink variant="bold" href="/">
          <Home class="size-5" />
          <span>Home</span>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator variant="slash" size="lg" />
      <BreadcrumbItem>
        <BreadcrumbLink variant="bold" href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator variant="slash" size="lg" />
      <BreadcrumbItem>
        <BreadcrumbPage variant="bold">Electronics</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
</Story>
