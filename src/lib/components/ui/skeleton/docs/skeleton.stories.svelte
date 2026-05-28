<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { 
    Skeleton, 
    SkeletonText, 
    SkeletonAvatar, 
    SkeletonCard, 
    SkeletonTable, 
    skeletonVariants,
    type SkeletonProps
  } from "$lib/components/ui/skeleton";
    import { keysOf } from '$lib/utils';

  	var variants = keysOf(skeletonVariants.variants.variant);
    var animations = keysOf(skeletonVariants.variants.animation);
    var shapes = keysOf(skeletonVariants.variants.shape);
    var sizes = keysOf(skeletonVariants.variants.size);


  const { Story } = defineMeta({
    title: 'Components/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: variants,
        description: 'Visual variant of the skeleton',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      animation: {
        control: { type: 'select' },
        options: animations,
        description: 'Animation type',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'pulse' },
        },
      },
      shape: {
        control: { type: 'select' },
        options: shapes,
        description: 'Shape of the skeleton',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      size: {
        control: { type: 'select' },
        options: sizes,
        description: 'Preset height size',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'md' },
        },
      },
      width: {
        control: { type: 'text' },
        description: 'Custom width (e.g., "200px", "50%", "full")',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      height: {
        control: { type: 'text' },
        description: 'Custom height (overrides size)',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      count: {
        control: { type: 'number' },
        description: 'Number of skeleton items to render',
        table: {
          type: { summary: 'number' },
          defaultValue: { summary: '1' },
        },
      },
      delay: {
        control: { type: 'number' },
        description: 'Animation delay in ms (stagger effect)',
        table: {
          type: { summary: 'number' },
          defaultValue: { summary: '0' },
        },
      },
      visible: {
        control: { type: 'boolean' },
        description: 'Whether to show the skeleton',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'true' },
        },
      },
      class: {
        control: false,
        table: { disable: true },
      },
    },
    args: {
      width: 'full',
    },
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
  });

  type Args = SkeletonProps;
</script>

<!-- Basic Variants -->
<Story name="Default" args={{ variant: "default", size: "lg", width: "full" }} >
  {#snippet template(args: Args)}
    <div class="w-64">
      <Skeleton {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Primary" args={{ variant: "primary", size: "lg", width: "full" }}>
   {#snippet template(args: Args)}
    <div class="w-64">
      <Skeleton {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Secondary" args={{ variant: "secondary", size: "lg", width: "full" }}>
  {#snippet template(args: Args)}
    <div class="w-64">
      <Skeleton {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Accent" args={{ variant: "accent", size: "lg", width: "full" }}>
   {#snippet template(args: Args)}
    <div class="w-64">
      <Skeleton {...args} />
    </div>
  {/snippet}
</Story>

<!-- Animations -->
<Story name="Pulse Animation" args={{ animation: "pulse", size: "lg", width: "full" }}>
   {#snippet template(args: Args)}
    <div class="w-64">
      <Skeleton {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Shimmer Animation" args={{ animation: "shimmer", size: "lg", width: "full" }}>
   {#snippet template(args: Args)}
    <div class="w-64">
      <Skeleton {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Wave Animation" args={{ animation: "wave", size: "lg", width: "full" }}>
   {#snippet template(args: Args)}
    <div class="w-64">
      <Skeleton {...args} />
    </div>
  {/snippet}
</Story>

<Story name="No Animation" args={{ animation: "none", size: "lg", width: "full" }}>
   {#snippet template(args: Args)}
    <div class="w-64">
      <Skeleton {...args} />
    </div>
  {/snippet}
</Story>

<!-- Sizes -->
<Story name="All Sizes">
  {#snippet template(args: Args)}
    <div class="w-64 space-y-3">
      <div class="flex items-center gap-4">
        <span class="w-8 text-xs text-muted-foreground">xs</span>
        <Skeleton size="xs" width="full" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-8 text-xs text-muted-foreground">sm</span>
        <Skeleton size="sm" width="full" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-8 text-xs text-muted-foreground">md</span>
        <Skeleton size="md" width="full" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-8 text-xs text-muted-foreground">lg</span>
        <Skeleton size="lg" width="full" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-8 text-xs text-muted-foreground">xl</span>
        <Skeleton size="xl" width="full" />
      </div>
    </div>
  {/snippet}
</Story>

<!-- Shapes -->
<Story name="Shapes">
 {#snippet template(args: Args)}
    <div class="flex flex-wrap gap-6">
      <div class="text-center">
        <Skeleton shape="default" class="h-16 w-24" />
        <span class="mt-2 block text-xs text-muted-foreground">default</span>
      </div>
      <div class="text-center">
        <Skeleton shape="circle" class="h-16 w-16" />
        <span class="mt-2 block text-xs text-muted-foreground">circle</span>
      </div>
      <div class="text-center">
        <Skeleton shape="square" class="h-16 w-24" />
        <span class="mt-2 block text-xs text-muted-foreground">square</span>
      </div>
      <div class="text-center">
        <Skeleton shape="pill" class="h-8 w-24" />
        <span class="mt-2 block text-xs text-muted-foreground">pill</span>
      </div>
    </div>
  {/snippet}
</Story>

<!-- Circle Avatar -->
<Story name="Circle Avatar" args={{ shape: "circle" }}>
   {#snippet template(args: Args)}
    <Skeleton {...args} class="h-12 w-12" />
  {/snippet}
</Story>

<!-- Width Shortcuts -->
<Story name="Width Shortcuts">
 {#snippet template(args: Args)}
    <div class="w-full max-w-md space-y-3">
      <div class="flex items-center gap-4">
        <span class="w-16 text-xs text-muted-foreground">full</span>
        <Skeleton size="md" width="full" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-16 text-xs text-muted-foreground">half</span>
        <Skeleton size="md" width="half" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-16 text-xs text-muted-foreground">third</span>
        <Skeleton size="md" width="third" />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-16 text-xs text-muted-foreground">quarter</span>
        <Skeleton size="md" width="quarter" />
      </div>
    </div>
  {/snippet}
</Story>

<!-- Multiple Count -->
<Story name="Multiple Count" args={{ count: 4, size: "sm", width: "full", delay: 100 }}>
   {#snippet template(args: Args)}
    <div class="w-64">
      <Skeleton {...args} />
    </div>
  {/snippet}
</Story>

<!-- Skeleton Text -->
<Story name="Skeleton Text - Default">
  {#snippet template(args: Args)}
    <div class="w-64">
      <SkeletonText />
    </div>
  {/snippet}
</Story>

<Story name="Skeleton Text - 5 Lines">
 {#snippet template(args: Args)}
    <div class="w-64">
      <SkeletonText lines={5} />
    </div>
  {/snippet}
</Story>

<Story name="Skeleton Text - Uniform">
  {#snippet template(args: Args)}
    <div class="w-64">
      <SkeletonText lines={4} varied={false} />
    </div>
  {/snippet}
</Story>

<!-- Skeleton Avatar -->
<Story name="Skeleton Avatar - Only">
  {#snippet template(args: Args)}
    <SkeletonAvatar size="lg" />
  {/snippet}
</Story>

<Story name="Skeleton Avatar - With Text">
  {#snippet template(args: Args)}
    <div class="w-64">
      <SkeletonAvatar withText size="md" />
    </div>
  {/snippet}
</Story>

<Story name="Skeleton Avatar - All Sizes">
  {#snippet template(args: Args)}
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <span class="w-8 text-xs text-muted-foreground">xs</span>
        <SkeletonAvatar size="xs" withText />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-8 text-xs text-muted-foreground">sm</span>
        <SkeletonAvatar size="sm" withText />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-8 text-xs text-muted-foreground">md</span>
        <SkeletonAvatar size="md" withText />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-8 text-xs text-muted-foreground">lg</span>
        <SkeletonAvatar size="lg" withText />
      </div>
      <div class="flex items-center gap-4">
        <span class="w-8 text-xs text-muted-foreground">xl</span>
        <SkeletonAvatar size="xl" withText />
      </div>
    </div>
  {/snippet}
</Story>

<!-- Skeleton Card -->
<Story name="Skeleton Card - Full">
  {#snippet template(args: Args)}
    <div class="w-80">
      <SkeletonCard />
    </div>
  {/snippet}
</Story>

<Story name="Skeleton Card - No Image">
 {#snippet template(args: Args)}
    <div class="w-80">
      <SkeletonCard withImage={false} />
    </div>
  {/snippet}
</Story>

<Story name="Skeleton Card - Minimal">
  {#snippet template(args: Args)}
    <div class="w-80">
      <SkeletonCard withImage={false} withAvatar={false} withFooter={false} bodyLines={4} />
    </div>
  {/snippet}
</Story>

<Story name="Skeleton Card - Square Image">
  {#snippet template(args: Args)}
    <div class="w-80">
      <SkeletonCard imageRatio="square" />
    </div>
  {/snippet}
</Story>

<!-- Skeleton Table -->
<Story name="Skeleton Table - Default">
 {#snippet template(args: Args)}
    <div class="w-full max-w-2xl">
      <SkeletonTable />
    </div>
  {/snippet}
</Story>

<Story name="Skeleton Table - Compact">
  {#snippet template(args: Args)}
    <div class="w-full max-w-md">
      <SkeletonTable rows={3} columns={2} />
    </div>
  {/snippet}
</Story>

<Story name="Skeleton Table - No Header">
  {#snippet template(args: Args)}
    <div class="w-full max-w-2xl">
      <SkeletonTable withHeader={false} rows={4} columns={3} />
    </div>
  {/snippet}
</Story>

<!-- Real-world Examples -->
<Story name="Social Post Loading">
  {#snippet template(args: Args)}
    <div class="w-80 space-y-4 rounded-lg border p-4">
      <SkeletonAvatar withText size="md" />
      <SkeletonText lines={2} />
      <Skeleton class="aspect-video w-full" />
      <div class="flex gap-4">
        <Skeleton shape="pill" size="sm" width="60px" />
        <Skeleton shape="pill" size="sm" width="60px" />
        <Skeleton shape="pill" size="sm" width="60px" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Product List Loading">
  {#snippet template(args: Args)}
    <div class="w-80 space-y-3 rounded-lg border p-4">
      {#each Array(3) as _, i}
        <div class="flex gap-4">
          <Skeleton shape="default" class="h-16 w-16 shrink-0" />
          <div class="flex-1 space-y-2">
            <Skeleton size="sm" width="70%" delay={i * 50} />
            <Skeleton size="xs" width="50%" delay={i * 50 + 25} />
            <Skeleton size="sm" width="30%" delay={i * 50 + 50} />
          </div>
        </div>
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Dashboard Stats Loading">
 {#snippet template(args: Args)}
    <div class="grid w-full max-w-2xl grid-cols-3 gap-4">
      {#each Array(3) as _, i}
        <div class="rounded-lg border p-4">
          <Skeleton size="xs" width="40%" delay={i * 30} class="mb-2" />
          <Skeleton size="xl" width="60%" delay={i * 30 + 15} />
        </div>
      {/each}
    </div>
  {/snippet}
</Story>
