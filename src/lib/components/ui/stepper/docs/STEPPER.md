# Stepper Component

A flexible stepper component for displaying multi-step processes, workflows, and progress indicators, built with Svelte 5.

## Features

- 🎯 **Multiple Orientations**: Horizontal and vertical layouts
- 📱 **Fully Responsive**: Mobile scroll or vertical auto-switch, tablet density reduction
- 🎞️ **Animated Connector**: Smooth fill animation on step progress (horizontal & vertical)
- 📏 **Size Options**: xs, sm, default, lg - flexible sizing
- 🎨 **Variants**: Default, outline, ghost, flat styles
- ✨ **Interactive**: Optional clickable steps for navigation
- ✅ **Completion States**: Automatic step completion tracking
- 🎭 **Custom Icons**: Per-step icon via `icon` in `steps[]` (declarative) or `{#snippet icon()}` (primitive)
- ⚠️ **Step States**: Per-step `error`, `loading`, and `disabled` states with distinct visuals
- 🔄 **Reactive**: Built with Svelte 5's modern reactivity system
- ♿ **Accessible**: Semantic HTML and ARIA support
- 🎯 **Type-Safe**: Full TypeScript support with Svelte 5 runes

## Installation

The Stepper component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Implementation Details

The Stepper component provides a flexible system for displaying step-by-step processes with support for different orientations, sizes, and interaction patterns.

### Component Architecture

#### Stepper (Declarative — primary API)
- Pass a `steps` array — no manual `<StepperStep>` or `<StepperSeparator>` needed
- Automatically assigns step indices and derives completed state from `activeStep`
- Auto-inserts separators between steps
- Thin wrapper around `StepperRoot` — all props are forwarded

#### StepperRoot (Primitive — advanced composition)
- Root component that manages stepper state and context
- Controls orientation, size, and variant
- Use when you need custom icons per step or inline step content

#### StepperStep
- Individual step indicator
- Displays step number or custom icon snippet
- Shows label and optional description
- Automatically displays check icon when completed

#### StepperSeparator
- Visual connector between steps
- Styled based on completion state
- Adapts to horizontal/vertical orientation

## Usage

### Declarative API (recommended)

```svelte
<script lang="ts">
  import { Stepper } from "aether-ui";

  let currentStep = $state(0);
</script>

<Stepper
  bind:activeStep={currentStep}
  clickable
  steps={[
    { label: "Account", description: "Create your account" },
    { label: "Profile", description: "Complete your profile" },
    { label: "Billing", description: "Add payment method" },
    { label: "Done", description: "All set!" },
  ]}
/>
```

### Vertical orientation

```svelte
<Stepper
  orientation="vertical"
  bind:activeStep={currentStep}
  clickable
  steps={[
    { label: "Personal Info", description: "Enter your basic information" },
    { label: "Address", description: "Add your address details" },
    { label: "Review", description: "Review and submit" },
  ]}
/>
```

### With `onStepClick` callback

```svelte
<Stepper
  clickable
  bind:activeStep={currentStep}
  onStepClick={(step) => console.log("Navigated to", step)}
  steps={[...]}
/>
```

### Primitive API — for custom icons or per-step content

Use `StepperRoot` when you need icon snippets or children inside individual steps:

```svelte
<script lang="ts">
  import { StepperRoot, StepperStep, StepperSeparator } from "aether-ui";
  import { User, CreditCard, CheckCircle } from "@lucide/svelte";

  let currentStep = $state(0);
</script>

<StepperRoot bind:activeStep={currentStep} clickable>
  <StepperStep step={0} label="Account">
    {#snippet icon()}<User class="size-4" />{/snippet}
  </StepperStep>
  <StepperSeparator completed={currentStep > 0} />
  <StepperStep step={1} label="Payment">
    {#snippet icon()}<CreditCard class="size-4" />{/snippet}
  </StepperStep>
  <StepperSeparator completed={currentStep > 1} />
  <StepperStep step={2} label="Done">
    {#snippet icon()}<CheckCircle class="size-4" />{/snippet}
  </StepperStep>
</StepperRoot>
```

### Migration: Primitive → Declarative

```svelte
<!-- Before (primitive API) -->
<Stepper bind:activeStep={step} clickable>
  <StepperStep step={0} label="Account" description="Create account" />
  <StepperSeparator completed={step > 0} />
  <StepperStep step={1} label="Profile" description="Complete profile" />
  <StepperSeparator completed={step > 1} />
  <StepperStep step={2} label="Billing" description="Add payment" />
</Stepper>

<!-- After (declarative API) -->
<Stepper
  bind:activeStep={step}
  clickable
  steps={[
    { label: "Account", description: "Create account" },
    { label: "Profile", description: "Complete profile" },
    { label: "Billing", description: "Add payment" },
  ]}
/>
```

## Sizes

### Extra Small

```svelte
<Stepper size="xs" steps={[{ label: "Extra Small" }, { label: "Step" }]} />
```

### Small

```svelte
<Stepper size="sm" steps={[{ label: "Small" }, { label: "Step" }]} />
```

### Default

```svelte
<Stepper size="default" steps={[{ label: "Default" }, { label: "Step" }]} />
```

### Large

```svelte
<Stepper size="lg" steps={[{ label: "Large" }, { label: "Step" }]} />
```

### Custom Pixel Size

Override the indicator diameter precisely. Font, icon, and connector thickness scale proportionally.

```svelte
<!-- 20px — smaller than xs -->
<Stepper indicatorSize={20} steps={[{ label: "Tiny" }, { label: "Steps" }]} />

<!-- 56px — larger than lg -->
<Stepper indicatorSize={56} steps={[{ label: "Jumbo" }, { label: "Steps" }]} />
```

### Disable Responsive Scaling

By default, `lg` and `default` sizes scale down one level on tablet (≤768px). Use `disableResponsiveScaling` to lock the size.

```svelte
<Stepper size="lg" disableResponsiveScaling steps={[{ label: "Always lg" }, { label: "48px always" }]} />
```

## Variants

### Default Variant

Filled background for active and completed steps.

```svelte
<Stepper variant="default" steps={[{ label: "Default" }, { label: "Variant" }]} />
```

### Outline Variant

Outlined style with border emphasis.

```svelte
<Stepper variant="outline" steps={[{ label: "Outline" }, { label: "Variant" }]} />
```

### Ghost Variant

Subtle background without borders.

```svelte
<Stepper variant="ghost" steps={[{ label: "Ghost" }, { label: "Variant" }]} />
```

### Flat Variant

Horizontal progress bar style with labels above.

```svelte
<Stepper
  variant="flat"
  steps={[
    { label: "Personal Info", description: "Completed" },
    { label: "Education", description: "Completed" },
    { label: "Company", description: "Pending" },
    { label: "Review", description: "Pending" },
  ]}
/>
```

## Advanced Examples

### Registration Flow

```svelte
<script lang="ts">
  import { Stepper } from "aether-ui";
  import { Button } from "aether-ui";

  let currentStep = $state(0);
</script>

<div class="space-y-6">
  <Stepper
    bind:activeStep={currentStep}
    steps={[
      { label: "Create Account", description: "Enter your email and password" },
      { label: "Personal Info", description: "Tell us about yourself" },
      { label: "Complete", description: "Review and confirm" },
    ]}
  />

  <div class="flex gap-3">
    <Button variant="outline" disabled={currentStep === 0} onclick={() => currentStep--}>
      Previous
    </Button>
    <Button disabled={currentStep === 2} onclick={() => currentStep++}>
      {currentStep === 2 ? "Complete" : "Next"}
    </Button>
  </div>
</div>
```

### Form Wizard with Content

```svelte
<script lang="ts">
  import { Stepper } from "aether-ui";
  import { Button, Input, Label } from "aether-ui";

  let currentStep = $state(0);
  let formData = $state({ name: "", email: "", address: "" });
</script>

<div class="space-y-8">
  <Stepper
    bind:activeStep={currentStep}
    clickable
    steps={[
      { label: "Basic Info" },
      { label: "Contact" },
      { label: "Review" },
    ]}
  />

  <!-- step content rendered below the stepper -->
  <div class="min-h-[200px]">
    {#if currentStep === 0}
      <Label for="name">Full Name</Label>
      <Input id="name" bind:value={formData.name} />
    {:else if currentStep === 1}
      <Label for="email">Email</Label>
      <Input id="email" type="email" bind:value={formData.email} />
    {:else}
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
    {/if}
  </div>
</div>
```

### Custom icons — declarative API

Pass any Svelte component (e.g. a Lucide icon) as the `icon` field in the `steps` array:

```svelte
<script lang="ts">
  import { Stepper } from "aether-ui";
  import { ShoppingCart, Truck, CreditCard, CheckCircle } from "@lucide/svelte";

  let step = $state(0);
</script>

<Stepper
  bind:activeStep={step}
  clickable
  steps={[
    { label: "Cart",     description: "Review items",    icon: ShoppingCart },
    { label: "Shipping", description: "Enter address",   icon: Truck },
    { label: "Payment",  description: "Add card",        icon: CreditCard },
    { label: "Confirm",  description: "Place order",     icon: CheckCircle },
  ]}
/>
```

Icons are **automatically sized** to match the `size` prop. Completed steps show the checkmark instead; error steps show X; loading steps show a spinner.

### Custom icons — primitive API

Use `StepperRoot` when you need icon snippets combined with inline children per step:

```svelte
<script lang="ts">
  import { StepperRoot, StepperStep, StepperSeparator } from "aether-ui";
  import { ShoppingCart, CreditCard, Package, CheckCircle } from "@lucide/svelte";

  let currentStep = $state(1);
</script>

<StepperRoot orientation="vertical" bind:activeStep={currentStep}>
  <StepperStep step={0} label="Cart" description="Review your items" completed>
    {#snippet icon()}<ShoppingCart class="size-4" />{/snippet}
  </StepperStep>
  <StepperSeparator completed />
  <StepperStep step={1} label="Payment" description="Enter payment details">
    {#snippet icon()}<CreditCard class="size-4" />{/snippet}
  </StepperStep>
  <StepperSeparator />
  <StepperStep step={2} label="Shipping" description="Choose shipping method">
    {#snippet icon()}<Package class="size-4" />{/snippet}
  </StepperStep>
  <StepperSeparator />
  <StepperStep step={3} label="Confirm" description="Review and place order">
    {#snippet icon()}<CheckCircle class="size-4" />{/snippet}
  </StepperStep>
</StepperRoot>
```

### Step States

Per-step `error`, `loading`, and `disabled` flags override the default completed/active/inactive appearance.

**Priority (highest → lowest):** `disabled` → `error` → `loading` → `completed` → `active` → `inactive`

```svelte
<!-- Error: red X icon, destructive colors -->
<Stepper
  activeStep={1}
  steps={[
    { label: "Upload",   description: "Done" },
    { label: "Validate", description: "Checksum failed", error: true },
    { label: "Process",  description: "Waiting" },
  ]}
/>

<!-- Loading: spinning loader, active/primary colors -->
<Stepper
  activeStep={1}
  steps={[
    { label: "Upload",     description: "Done" },
    { label: "Processing", description: "Converting…", loading: true },
    { label: "Complete",   description: "Waiting" },
  ]}
/>

<!-- Disabled: muted colors, not clickable even when stepper is clickable -->
<Stepper
  activeStep={1}
  clickable
  steps={[
    { label: "Starter",    description: "Active plan" },
    { label: "Pro",        description: "Current step" },
    { label: "Enterprise", description: "Contact sales", disabled: true },
  ]}
/>
```

States also work on `StepperStep` in the primitive API:

```svelte
<StepperStep step={1} label="Payment" error />
<StepperStep step={2} label="Processing" loading />
<StepperStep step={3} label="Locked" disabled />
```

### Numbers Only (No Labels)

```svelte
<Stepper steps={[{}, {}, {}, {}]} />
```

## Circular Progress Mode

`mobileLayout="circular"` replaces the vertical step list below the `md` breakpoint (768px) with a radial progress ring. The full horizontal stepper is preserved on desktop.

### What the ring shows

- **Progress arc** — animated fill from 0% to 100% as steps advance
- **Counter** — current step / total (e.g. `2 / 5`) with fade-scale animation on change
- **Percentage** — numeric fill percentage below the counter
- **Step label** — current step's label below the ring, animates on change
- **Checkmark** — scale-in animation when the final step is reached
- **Expand hint** — a subtle chevron indicating the ring is tappable

### Opening the step drawer

Tapping the ring opens a bottom Sheet listing all steps with their state (completed/active/inactive), label, and description. If `clickable` is true, tapping a step in the drawer navigates to it.

### Code example

```svelte
<script lang="ts">
  import { Stepper } from "aether-ui";

  let step = $state(0);
</script>

<!-- Circular on mobile, normal horizontal on desktop -->
<Stepper
  bind:activeStep={step}
  clickable
  mobileLayout="circular"
  steps={[
    { label: "Account", description: "Create your account" },
    { label: "Profile", description: "Complete your profile" },
    { label: "Billing", description: "Add payment method" },
    { label: "Done", description: "All set!" },
  ]}
/>

<!-- Force circular on ALL breakpoints (desktop preview) -->
<Stepper bind:activeStep={step} clickable mobileLayout="circular" circularAlways circularSize={200} steps={[...]} />

<!-- Non-expandable ring (no drawer on tap) -->
<Stepper bind:activeStep={step} mobileLayout="circular" circularAlways circularExpandable={false} steps={[...]} />
```

### Circular mode props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `circularSize` | `number` | `160` | Ring diameter in pixels |
| `circularExpandable` | `boolean` | `true` | Tap opens step-list drawer |
| `circularAlways` | `boolean` | `false` | Show ring at all breakpoints |

### Architecture note

When circular mode is active, both the desktop stepper (hidden below `md` via CSS) and the circular widget are always present in the DOM. This ensures:
- Steps register themselves in context so the ring and drawer have accurate data
- No layout shift when resizing — only `display` toggles, not component mounts/unmounts

## Responsive Behavior

### Mobile (< 640px)

**`mobileLayout="vertical"` (default)**
- Horizontal steppers automatically switch to vertical layout
- Step buttons get `min-height: 44px` / `min-width: 44px` for touch friendliness
- Use `hideDescriptionOnMobile` to hide descriptions and save space

**`mobileLayout="scroll"`**
- Stepper stays horizontal with `overflow-x: auto` scrolling
- Steps have `shrink-0` so they don't collapse
- Scrollbar is hidden for a clean look
- Best for many steps that won't fit on screen

### Tablet (≤ 768px)

- Layout remains horizontal
- `lg` buttons scale down to `default` size, `default` scales to `sm`
- Label and description font sizes reduce one step
- Connector margin-top adjusts to stay aligned with smaller buttons

### Animated Connector

- **Horizontal**: Connector fills left-to-right via `width` animation
- **Vertical**: Connector fills top-to-bottom via CSS `::after` `height` animation
- Both use 500ms `ease-in-out` transition
- Completion resets instantly when going back to a previous step

```svelte
<!-- Auto-switch to vertical on mobile (default) -->
<Stepper mobileLayout="vertical" hideDescriptionOnMobile>
  ...
</Stepper>

<!-- Horizontal scroll on mobile -->
<Stepper mobileLayout="scroll">
  ...
</Stepper>
```

## API Reference

### Stepper (declarative wrapper)

Preferred API — pass a `steps` array and let the component handle the rest.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepItem[]` | `[]` | Array of step definitions — auto-renders indicators and separators |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout orientation |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Size of the stepper |
| `variant` | `"default" \| "outline" \| "ghost" \| "flat"` | `"default"` | Visual variant |
| `activeStep` | `number` | `0` | Current active step (bindable) |
| `clickable` | `boolean` | `false` | Allow clicking steps to navigate |
| `mobileLayout` | `"vertical" \| "scroll" \| "circular"` | `"vertical"` | Mobile behavior: vertical switch, horizontal scroll, or circular progress ring |
| `hideDescriptionOnMobile` | `boolean` | `false` | Hide step descriptions on mobile screens |
| `indicatorSize` | `number` | - | Override indicator circle diameter in pixels; font, icon, and connector scale proportionally |
| `disableResponsiveScaling` | `boolean` | `false` | Opt-out of automatic one-level size scale-down on tablet (≤768px) |
| `circularSize` | `number` | `72` | Diameter of the circular progress ring in px |
| `circularExpandable` | `boolean` | `true` | Whether tapping the ring opens a step-list bottom drawer |
| `circularAlways` | `boolean` | `false` | Force circular mode at all breakpoints (desktop override) |
| `onStepClick` | `(step: number) => void` | - | Callback when step is clicked |
| `ref` | `HTMLDivElement` | - | Root element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |

### StepItem

Shape of each object in the `steps` array.

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Step label text |
| `description` | `string` | Optional short description |
| `icon` | `Component` | Svelte component for the indicator icon (e.g. a Lucide icon) |
| `error` | `boolean` | Show error state — X icon, destructive colors |
| `loading` | `boolean` | Show loading state — spinner, primary colors |
| `disabled` | `boolean` | Disable the step — muted colors, not clickable |

### StepperRoot (primitive base)

Identical props to `Stepper` minus `steps`, plus `children` (required for composition).
Use when steps need custom icon snippets or inline content children.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| *(all Stepper props except `steps`)* | | | |
| `children` | `Snippet` | - | `<StepperStep>` and `<StepperSeparator>` nodes |

### StepperStep

Individual step component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | **required** | Step index (0-based) |
| `label` | `string` | - | Step label text |
| `description` | `string` | - | Step description text |
| `icon` | `Snippet` | - | Custom icon snippet rendered in the indicator |
| `completed` | `boolean` | `false` | Manually mark as completed |
| `error` | `boolean` | `false` | Error state — X icon, destructive colors |
| `loading` | `boolean` | `false` | Loading state — spinner, primary colors |
| `disabled` | `boolean` | `false` | Disabled — muted colors, not clickable |
| `ref` | `HTMLDivElement` | - | Step element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Custom content rendered below label/description |

### StepperSeparator

Visual separator between steps.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `completed` | `boolean` | `false` | Mark separator as completed |
| `ref` | `HTMLDivElement` | - | Separator element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |

## Accessibility

The Stepper component follows accessibility best practices:

- **Semantic HTML**: Uses proper HTML elements for structure
- **Button Elements**: Steps are actual `<button>` elements when clickable
- **Disabled State**: Non-clickable steps are properly disabled
- **Visual States**: Clear visual indication of active, completed, and inactive states
- **Keyboard Navigation**: Full keyboard support when clickable

## Best Practices

1. **Keep it simple** - Don't use too many steps (3-5 is ideal)
2. **Clear labels** - Use concise, descriptive labels for each step
3. **Show progress** - Make it clear which step is active and completed
4. **Vertical for mobile** - Consider using vertical orientation on small screens
5. **Enable navigation** - Use clickable steps for non-linear workflows
6. **Provide feedback** - Use descriptions to guide users
7. **Validate before advancing** - Don't let users skip required steps

## Common Use Cases

- **Registration flows** - Multi-step account creation
- **Checkout processes** - Shopping cart to payment to confirmation
- **Form wizards** - Breaking long forms into manageable steps
- **Onboarding** - Guiding new users through setup
- **Progress tracking** - Showing completion status
- **Order tracking** - Displaying order/shipping status

## Demo & Storybook

- **Demo Page**: `/stepper-demo` - Comprehensive examples and use cases
- **Storybook**: `Components/Stepper` - Interactive component playground

## Technical Implementation

### Variant System

The Stepper component uses tailwind-variants for the styling system:

```typescript
export const stepperVariants = tv({
  slots: {
    root: ["flex gap-2"],
    step: ["flex items-center gap-2 relative"],
    stepButton: ["flex items-center justify-center rounded-full"],
    stepContent: ["flex flex-col gap-1"],
    separator: ["flex-1"],
  },
  variants: {
    orientation: { horizontal: {...}, vertical: {...} },
    size: { sm: {...}, default: {...}, lg: {...} },
    variant: { default: {...}, outline: {...}, ghost: {...} },
  }
});
```

### State Management

- Uses Svelte 5 context API for sharing state between components
- Automatic step completion tracking based on activeStep
- Support for manual completion overrides
- Reactive updates across all child components

## Changelog

### v1.5.0
- Added `icon` field to `StepItem` — accepts any Svelte component (e.g. Lucide icons); auto-sized to match `size` prop
- Added `error`, `loading`, `disabled` fields to `StepItem` (declarative API) and props to `StepperStep` (primitive API)
- `error` state: renders X icon with destructive colors across all variants
- `loading` state: renders animated spinner with active/primary colors (per-variant)
- `disabled` state: renders muted colors, prevents click even when stepper `clickable=true`
- State priority: `disabled > error > loading > completed > active > inactive`
- Extended `StepState` type: `"inactive" | "active" | "completed" | "error" | "disabled" | "loading"`

### v1.4.0
- Introduced declarative `Stepper` component — accepts `steps` array, auto-generates indicators and separators, derives completed state from `activeStep`
- Renamed internal primitive root to `StepperRoot` — exported for advanced composition (custom icons, per-step children)
- Added `StepItem` type (`{ label?, description? }`) exported from the package
- `Stepper` is a thin wrapper around `StepperRoot` using `ComponentProps<typeof StepperRoot>` — all props forward cleanly with zero duplication
- Migration: replace `<Stepper><StepperStep>...</Stepper>` with `<Stepper steps={[...]} />`; use `<StepperRoot>` for custom icons

### v1.3.0
- Added `mobileLayout="circular"` — radial progress ring on mobile, normal horizontal on desktop
- Added `circularSize` prop: ring diameter in px (120–200 recommended, default: 160)
- Added `circularExpandable` prop: tap ring to open step-list bottom drawer (default: true)
- Added `circularAlways` prop: force circular mode at all breakpoints
- Step registration via `$effect` in StepperStep — circular ring reads labels/descriptions automatically
- Ring fill animated via SVG `stroke-dashoffset` (600ms cubic-bezier)
- Counter/label fade-scale in via CSS `@keyframes` + `{#key activeStep}` remount
- Checkmark scale-in animation on final step completion
- Bottom drawer uses existing `Sheet` component — fully accessible

### v1.2.0
- Added `indicatorSize` prop: pixel override for the step circle; font, icon, and connector scale proportionally
- Added `disableResponsiveScaling` prop: opt-out of automatic tablet scale-down
- JS-driven responsive scaling: tablet (≤768px) reduces size one level via `IsMobile(768)` — no `max-md:` CSS overrides
- Exported `ICON_SIZE_MAP`, `CONNECTOR_SIZE_MAP`, `STEPPER_SIZE_ORDER` constants for external consumers
- Vertical connector alignment uses `separatorColumn` slot (exact button width + `justify-center`) — pixel-perfect at every size and breakpoint

### v1.1.0
- Added `mobileLayout` prop: `"vertical"` (auto-switch) or `"scroll"` (horizontal scroll) on mobile
- Added `hideDescriptionOnMobile` prop to hide descriptions on small screens
- Animated connector: smooth left-to-right (horizontal) and top-to-bottom (vertical) fill
- Tablet responsive: `lg`/`default` sizes auto-scale down, reduced gap density
- Touch-friendly 44px minimum tap targets on mobile

### v1.0.0
- Initial implementation with horizontal and vertical orientations
- 4 size options (xs, sm, default, lg)
- 4 visual variants (default, outline, ghost, flat)
- Clickable navigation support
- Custom icons support
- Automatic completion states
- Comprehensive documentation and examples
