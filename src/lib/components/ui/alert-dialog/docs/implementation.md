# Alert Dialog Implementation

A comprehensive alert dialog component with multiple variants, sizes, and programmatic control.

## Features

- **Multiple Variants**: Default, Destructive, Success, Warning, and Info
- **Size Options**: Small, Default, and Large
- **Programmatic Control**: Trigger dialogs from script with `getAlertDialogContext()`
- **Customizable**: Icons, button text, callbacks, and more
- **Type-Safe**: Full TypeScript support

## Components

### AlertDialogProvider

Wrapper component that provides context for programmatic dialog control.

### AlertDialogImpl

Implementation component with built-in variants and configuration.

### getAlertDialogContext()

Context hook to access dialog controls programmatically.

## Basic Usage

### Setup

Wrap your app or page with `AlertDialogProvider`:

```svelte
<script lang="ts">
  import { AlertDialogProvider } from "aether-ui";
</script>

<AlertDialogProvider>
  <!-- Your content here -->
</AlertDialogProvider>
```

### Programmatic Triggering

```svelte
<script lang="ts">
  import { Button } from "aether-ui";
  import { 
    AlertDialogProvider, 
    getAlertDialogContext 
  } from "aether-ui";
  import { Trash2 } from "lucide-svelte";
</script>

<AlertDialogProvider>
  {#snippet content()}
    {@const dialog = getAlertDialogContext()}
    
    <Button
      onclick={() => {
        dialog?.open({
          variant: "destructive",
          title: "Delete Account",
          description: "This action cannot be undone.",
          icon: Trash2,
          actionText: "Delete",
          onAction: () => {
            // Handle delete action
            console.log("Account deleted");
          }
        });
      }}
    >
      Delete Account
    </Button>
  {/snippet}
  
  {@render content()}
</AlertDialogProvider>
```

## Variants

### Default
Standard alert dialog with primary button styling.

```typescript
dialog?.open({
  variant: "default",
  title: "Alert",
  description: "This is a default alert."
});
```

### Destructive
For dangerous or irreversible actions.

```typescript
dialog?.open({
  variant: "destructive",
  title: "Delete Item",
  description: "This action cannot be undone.",
  actionText: "Delete"
});
```

### Success
For positive confirmations.

```typescript
dialog?.open({
  variant: "success",
  title: "Success!",
  description: "Operation completed successfully.",
  icon: CheckCircle2,
  showCancel: false
});
```

### Warning
For cautionary messages.

```typescript
dialog?.open({
  variant: "warning",
  title: "Warning",
  description: "You have unsaved changes.",
  icon: AlertTriangle
});
```

### Info
For informational messages.

```typescript
dialog?.open({
  variant: "info",
  title: "Information",
  description: "Here's something you should know.",
  icon: Info
});
```

## Sizes

```typescript
// Small
dialog?.open({ size: "sm", title: "Small Dialog" });

// Default
dialog?.open({ size: "default", title: "Default Dialog" });

// Large
dialog?.open({ size: "lg", title: "Large Dialog" });
```

## Configuration Options

### AlertDialogConfig

```typescript
type AlertDialogConfig = {
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  size?: "sm" | "default" | "lg";
  title?: string;
  description?: string;
  icon?: Component<IconProps>;
  cancelText?: string;        // Default: "Cancel"
  actionText?: string;        // Default: "Continue"
  showCancel?: boolean;       // Default: true
  showAction?: boolean;       // Default: true
  onCancel?: () => void;
  onAction?: () => void;
};
```

### Examples

**No Cancel Button**
```typescript
dialog?.open({
  title: "Information",
  description: "Click OK to continue.",
  showCancel: false
});
```

**Custom Button Text**
```typescript
dialog?.open({
  title: "Confirm",
  description: "Are you sure?",
  cancelText: "No, go back",
  actionText: "Yes, proceed"
});
```

**With Callbacks**
```typescript
dialog?.open({
  title: "Save Changes",
  description: "Do you want to save your changes?",
  onCancel: () => {
    console.log("Changes discarded");
  },
  onAction: () => {
    console.log("Changes saved");
  }
});
```

**With Icon**
```typescript
import { AlertCircle } from "lucide-svelte";

dialog?.open({
  title: "Alert",
  description: "Something needs your attention.",
  icon: AlertCircle
});
```

## Advanced Usage

### Custom Content (Using Base Components)

For full customization, use the base components directly:

```svelte
<script lang="ts">
  import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel
  } from "aether-ui";
</script>

<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Custom Dialog</AlertDialogTitle>
      <AlertDialogDescription>
        Custom content goes here.
      </AlertDialogDescription>
    </AlertDialogHeader>
    
    <!-- Your custom content -->
    
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Context Methods

### open(config?: AlertDialogConfig)
Opens the dialog with the specified configuration.

```typescript
const dialog = getAlertDialogContext();
dialog?.open({
  title: "Hello",
  description: "World"
});
```

### close()
Closes the dialog programmatically.

```typescript
const dialog = getAlertDialogContext();
dialog?.close();
```

## Styling

The component uses Tailwind Variants for styling. Customize by overriding the variant slots in `alert-dialog-variants.ts`:

```typescript
export const alertDialogVariants = tv({
  slots: {
    content: "...",
    header: "...",
    title: "...",
    description: "...",
    footer: "...",
  },
  variants: {
    // Your custom variants
  }
});
```

## Accessibility

- Follows ARIA best practices for alert dialogs
- Keyboard navigation support (Escape to close)
- Focus management handled automatically
- Screen reader friendly

## Examples

See `/routes/alert-dialog-demo/+page.svelte` for comprehensive examples.
