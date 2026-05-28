<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
    PopoverArrow
  } from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { fn } from 'storybook/test';
  import { Settings, User, Info, MoreVertical } from "@lucide/svelte";

  const { Story } = defineMeta({
    title: 'Components/Popover',
    component: Popover,
    tags: ['autodocs'],
    argTypes: {
      // Content props
      variant: {
        control: { type: 'select' },
        options: ['default', 'bordered', 'elevated', 'minimal', 'ghost'],
        description: 'Visual style variant of the popover content',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg', 'auto'],
        description: 'Size of the popover content',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      animation: {
        control: { type: 'select' },
        options: ['default', 'fade', 'scale', 'slide', 'none'],
        description: 'Entry/exit animation effect',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      side: {
        control: { type: 'select' },
        options: ['top', 'right', 'bottom', 'left'],
        description: 'Preferred placement side',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'bottom' },
        },
      },
      align: {
        control: { type: 'select' },
        options: ['start', 'center', 'end'],
        description: 'Alignment relative to trigger',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'center' },
        },
      },
      sideOffset: {
        control: { type: 'number' },
        description: 'Distance from trigger in pixels',
        table: {
          type: { summary: 'number' },
          defaultValue: { summary: '4' },
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
      open: {
        control: false,
        table: { disable: true },
      },
      onOpenChange: {
        control: false,
        table: { disable: true },
      },
    },
    args: {
      variant: 'default',
      size: 'default',
      animation: 'default',
      side: 'bottom',
      align: 'center',
      sideOffset: 4,
    },
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
  });
</script>

<!-- Default Variant -->
<Story name="Default">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Open Popover</PopoverTrigger>
      <PopoverContent>
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Dimensions</h4>
          <p class="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- Bordered Variant -->
<Story name="Bordered">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="outline">Open Bordered</PopoverTrigger>
      <PopoverContent variant="bordered">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Bordered Style</h4>
          <p class="text-sm text-muted-foreground">
            Emphasized border with lighter shadow.
          </p>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- Elevated Variant -->
<Story name="Elevated">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Open Elevated</PopoverTrigger>
      <PopoverContent variant="elevated">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Elevated Style</h4>
          <p class="text-sm text-muted-foreground">
            Floating appearance with larger shadow and no border.
          </p>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- Minimal Variant -->
<Story name="Minimal">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="ghost">Open Minimal</PopoverTrigger>
      <PopoverContent variant="minimal">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Minimal Style</h4>
          <p class="text-sm text-muted-foreground">
            Subtle appearance with light border and shadow.
          </p>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- Ghost Variant -->
<Story name="Ghost">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Open Ghost</PopoverTrigger>
      <PopoverContent variant="ghost" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Custom Styled</h4>
          <p class="text-sm">
            Transparent base for complete custom styling.
          </p>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- Small Size -->
<Story name="Small Size">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button" size="sm">Small</PopoverTrigger>
      <PopoverContent size="sm">
        <p class="text-sm">Compact popover content</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- Large Size -->
<Story name="Large Size">
  <div class="flex items-center justify-center h-[400px]">
    
      <PopoverTrigger variant="button" size="lg">Large</PopoverTrigger>
      <PopoverContent size="lg">
        <div class="space-y-3">
          <h3 class="text-lg font-semibold">Large Popover</h3>
          <p class="text-sm text-muted-foreground">
            This is a larger popover with more space for detailed content.
          </p>
          <div class="flex gap-2 pt-2">
            <Button size="sm">Action</Button>
            <Button variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- Auto Width -->
<Story name="Auto Width">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="outline">Auto Width</PopoverTrigger>
      <PopoverContent size="auto" class="w-auto">
        <p>Content width</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- Fade Animation -->
<Story name="Fade Animation">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Fade</PopoverTrigger>
      <PopoverContent animation="fade">
        <p class="text-sm">Simple fade in/out effect</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- Scale Animation -->
<Story name="Scale Animation">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Scale</PopoverTrigger>
      <PopoverContent animation="scale">
        <p class="text-sm">Zoom in/out effect</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- Slide Animation -->
<Story name="Slide Animation">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Slide</PopoverTrigger>
      <PopoverContent animation="slide">
        <p class="text-sm">Slide from placement direction</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- No Animation -->
<Story name="No Animation">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">No Animation</PopoverTrigger>
      <PopoverContent animation="none">
        <p class="text-sm">Instant show/hide</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- Placement - Top -->
<Story name="Placement Top">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Top Placement</PopoverTrigger>
      <PopoverContent side="top">
        <p class="text-sm">Appears above trigger</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- Placement - Right -->
<Story name="Placement Right">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Right Placement</PopoverTrigger>
      <PopoverContent side="right">
        <p class="text-sm">Appears to the right</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- Placement - Left -->
<Story name="Placement Left">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Left Placement</PopoverTrigger>
      <PopoverContent side="left">
        <p class="text-sm">Appears to the left</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- Align Start -->
<Story name="Align Start">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Align Start</PopoverTrigger>
      <PopoverContent align="start">
        <p class="text-sm">Aligned to start</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- Align End -->
<Story name="Align End">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Align End</PopoverTrigger>
      <PopoverContent align="end">
        <p class="text-sm">Aligned to end</p>
      </PopoverContent>
    
  </div>
</Story>

<!-- With Arrow -->
<Story name="With Arrow">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">With Arrow</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow class="fill-popover" />
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Arrow Indicator</h4>
          <p class="text-sm text-muted-foreground">
            Points to the trigger element.
          </p>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- Form Example -->
<Story name="Form Example">
  <div class="flex items-center justify-center h-[400px]">
    
      <PopoverTrigger variant="button">
        <Settings class="mr-2 h-4 w-4" />
        Dimensions
      </PopoverTrigger>
      <PopoverContent class="w-80">
        <div class="grid gap-4">
          <div class="space-y-2">
            <h4 class="font-medium leading-none">Dimensions</h4>
            <p class="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div class="grid gap-2">
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="width">Width</Label>
              <Input id="width" value="100%" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="maxWidth">Max. width</Label>
              <Input id="maxWidth" value="300px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="height">Height</Label>
              <Input id="height" value="25px" class="col-span-2 h-8" />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="maxHeight">Max. height</Label>
              <Input id="maxHeight" value="none" class="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- User Profile Example -->
<Story name="User Profile">
  <div class="flex items-center justify-center h-[400px]">
    
      <PopoverTrigger variant="default" class="rounded-full">
        <div class="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-accent">
          <User class="h-5 w-5" />
          <span class="text-sm font-medium">John Doe</span>
        </div>
      </PopoverTrigger>
      <PopoverContent variant="elevated" size="sm" align="end">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User class="h-5 w-5" />
            </div>
            <div>
              <p class="font-medium">John Doe</p>
              <p class="text-sm text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <Button variant="ghost" size="sm" class="justify-start">Profile</Button>
            <Button variant="ghost" size="sm" class="justify-start">Settings</Button>
            <Button variant="ghost" size="sm" class="justify-start">Sign out</Button>
          </div>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- Action Menu -->
<Story name="Action Menu">
  <div class="flex items-center justify-center h-[400px]">
    
      <PopoverTrigger variant="ghost" size="sm">
        <MoreVertical class="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent variant="minimal" size="auto" class="p-1 w-40">
        <div class="flex flex-col">
          <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left">Edit</button>
          <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left">Duplicate</button>
          <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left">Archive</button>
          <div class="h-px bg-border my-1"></div>
          <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left text-destructive">Delete</button>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- With Close Button -->
<Story name="With Close Button">
  <div class="flex items-center justify-center h-[300px]">
    
      <PopoverTrigger variant="button">Open</PopoverTrigger>
      <PopoverContent>
        <div class="space-y-4">
          <div class="space-y-2">
            <h4 class="font-medium leading-none">Information</h4>
            <p class="text-sm text-muted-foreground">
              This popover has a close button.
            </p>
          </div>
          <PopoverClose>
            <Button variant="outline" size="sm" class="w-full">Close</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    
  </div>
</Story>

<!-- Info Icon Trigger -->
<Story name="Info Icon Trigger">
  <div class="flex items-center justify-center h-[300px]">
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium">Hover for info</span>
      
        <PopoverTrigger variant="default" class="rounded-full p-1 hover:bg-accent">
          <Info class="h-4 w-4 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent size="sm" variant="minimal">
          <p class="text-sm">Additional information about this feature.</p>
        </PopoverContent>
      
    </div>
  </div>
</Story>

<!-- Link Trigger -->
<Story name="Link Trigger">
  <div class="flex items-center justify-center h-[300px]">
    <div class="max-w-md">
      <p class="text-sm text-muted-foreground">
        Learn more about our{" "}
        
          <PopoverTrigger variant="link" class="p-0">privacy policy</PopoverTrigger>
          <PopoverContent size="sm">
            <div class="space-y-2">
              <h4 class="font-medium">Privacy Policy</h4>
              <p class="text-sm text-muted-foreground">
                We respect your privacy and protect your data.
              </p>
            </div>
          </PopoverContent>
        
        {" "}and terms of service.
      </p>
    </div>
  </div>
</Story>
