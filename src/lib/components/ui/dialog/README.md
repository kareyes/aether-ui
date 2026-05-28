# Dialog Component

A comprehensive modal dialog component with variants, sizes, and extensive customization options.

## Quick Start

```svelte
<script>
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
  } from "aether-ui";
  import { Button } from "aether-ui";
</script>

<Dialog>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description text.</DialogDescription>
    </DialogHeader>
    <div class="py-4">
      <!-- Your content -->
    </div>
    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Features

- **5 Sizes**: `sm`, `default`, `lg`, `xl`, `full`
- **2 Variants**: `default`, `centered`
- **Fully Accessible**: ARIA compliant with keyboard navigation
- **Customizable**: Optional close button, custom styling
- **Type-Safe**: Full TypeScript support

## Props

### DialogContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "lg" \| "xl" \| "full"` | `"default"` | Dialog size |
| `variant` | `"default" \| "centered"` | `"default"` | Layout variant |
| `showCloseButton` | `boolean` | `true` | Show/hide close button |

## Examples

### Different Sizes

```svelte
<DialogContent size="sm">Small dialog</DialogContent>
<DialogContent size="lg">Large dialog</DialogContent>
<DialogContent size="full">Full width dialog</DialogContent>
```

### Centered Layout

```svelte
<DialogContent variant="centered">
  <DialogHeader>
    <DialogTitle>Centered Title</DialogTitle>
  </DialogHeader>
</DialogContent>
```

### Controlled State

```svelte
<script>
  let open = $state(false);
</script>

<Dialog bind:open>
  <DialogTrigger>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <!-- Content -->
  </DialogContent>
</Dialog>

<Button onclick={() => open = true}>Open from code</Button>
```

## Resources

- **Full Documentation**: [docs/DIALOG.md](./docs/DIALOG.md)
- **Storybook**: [docs/dialog.stories.svelte](./docs/dialog.stories.svelte)
- **Demo Page**: `/dialog-demo`

## Files

```
dialog/
├── dialog-variants.ts          # Tailwind variants configuration
├── dialog-content.svelte       # Main content component with sizes/variants
├── dialog-overlay.svelte       # Backdrop overlay
├── dialog-header.svelte        # Header container
├── dialog-footer.svelte        # Footer container
├── dialog-title.svelte         # Title component
├── dialog-description.svelte   # Description component
├── dialog-trigger.svelte       # Trigger button
├── dialog-close.svelte         # Close button
├── index.ts                    # Main exports
├── docs/
│   ├── DIALOG.md              # Full documentation
│   └── dialog.stories.svelte  # Storybook stories
└── README.md                   # This file
```

## Implementation Details

Built on top of bits-ui's Dialog primitive with:
- Tailwind Variants for styling system
- Svelte 5 runes for reactivity
- Full TypeScript support
- Accessible by default (ARIA, keyboard navigation, focus management)

## Changelog

### v1.0.0 (2026-01-13)
- Initial implementation with variants system
- 5 size options (sm, default, lg, xl, full)
- 2 layout variants (default, centered)
- Comprehensive documentation and examples
- Storybook integration
- Demo page with practical examples
