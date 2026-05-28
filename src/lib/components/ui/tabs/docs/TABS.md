# Tabs Component

A comprehensive, customizable tabs component with multiple visual variants, sizes, and animation options built with Svelte 5 and bits-ui.

## Features

- 🎨 **5 Visual Variants**: Default, Underline, Pills, Solid, Segmented
- 📏 **3 Size Options**: Small, Default, Large
- ✨ **4 Animation Styles**: None, Fade, Slide, Scale
- ♿ **Fully Accessible**: Built on bits-ui primitives
- 🎯 **Type-Safe**: Full TypeScript support
- 🎭 **Customizable**: Extensive styling options with Tailwind
- 🔄 **Reactive**: Svelte 5 runes for optimal performance

## Installation

The Tabs component is included in the `aether-ui` package.

```bash
pnpm add aether-ui
```

## Implementation Details

The Tabs component is built using **tailwind-variants** (tv) for a robust variant system:

### Component Architecture

#### TabsList Component
- Uses `tv()` function for variant management
- 5 visual variants with distinct styling
- 3 size options for flexible layouts
- Exported types: `TabsListVariant`, `TabsListSize`

#### TabsTrigger Component
- Matching variants with TabsList for consistency
- Each variant has unique active states:
  - **Default**: White background on active
  - **Underline**: Bottom border indicator on active
  - **Pills**: Rounded pill with shadow on active
  - **Solid**: Primary background and text on active
  - **Segmented**: White background with shadow on active
- Size variants adjust padding and text size
- Exported types: `TabsTriggerVariant`, `TabsTriggerSize`

#### TabsContent Component
- Animation and padding control via variants
- 4 animation options: none, fade, slide, scale
- 4 padding options: none, sm, default, lg
- Exported types: `TabsContentAnimation`, `TabsContentPadding`

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Tabs, TabsList, TabsTrigger, TabsContent } from "aether-ui";
</script>

<Tabs value="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Manage your account settings here.</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Change your password here.</p>
  </TabsContent>
  <TabsContent value="settings">
    <p>Configure your preferences here.</p>
  </TabsContent>
</Tabs>
```

## Variants

### Default Variant

The standard tabs style with background and rounded corners.

```svelte
<Tabs value="account">
  <TabsList variant="default">
    <TabsTrigger variant="default" value="account">Account</TabsTrigger>
    <TabsTrigger variant="default" value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="password">Password content</TabsContent>
</Tabs>
```

### Underline Variant

Clean underline style with active indicator at the bottom.

```svelte
<Tabs value="overview">
  <TabsList variant="underline">
    <TabsTrigger variant="underline" value="overview">Overview</TabsTrigger>
    <TabsTrigger variant="underline" value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
</Tabs>
```

### Pills Variant

Rounded pill-style tabs with smooth transitions.

```svelte
<Tabs value="home">
  <TabsList variant="pills">
    <TabsTrigger variant="pills" value="home">Home</TabsTrigger>
    <TabsTrigger variant="pills" value="profile">Profile</TabsTrigger>
  </TabsList>
  <TabsContent value="home">Home content</TabsContent>
  <TabsContent value="profile">Profile content</TabsContent>
</Tabs>
```

### Solid Variant

Bold solid background style with primary color for active state.

```svelte
<Tabs value="inbox">
  <TabsList variant="solid">
    <TabsTrigger variant="solid" value="inbox">Inbox</TabsTrigger>
    <TabsTrigger variant="solid" value="sent">Sent</TabsTrigger>
  </TabsList>
  <TabsContent value="inbox">Inbox content</TabsContent>
  <TabsContent value="sent">Sent content</TabsContent>
</Tabs>
```

### Segmented Variant

Segmented control style with continuous background.

```svelte
<Tabs value="daily">
  <TabsList variant="segmented">
    <TabsTrigger variant="segmented" value="daily">Daily</TabsTrigger>
    <TabsTrigger variant="segmented" value="weekly">Weekly</TabsTrigger>
  </TabsList>
  <TabsContent value="daily">Daily content</TabsContent>
  <TabsContent value="weekly">Weekly content</TabsContent>
</Tabs>
```

## Sizes

### Small

Compact size for dense UIs.

```svelte
<TabsList size="sm">
  <TabsTrigger size="sm" value="tab1">Tab 1</TabsTrigger>
  <TabsTrigger size="sm" value="tab2">Tab 2</TabsTrigger>
</TabsList>
```

### Default

Standard size for most use cases.

```svelte
<TabsList size="default">
  <TabsTrigger size="default" value="tab1">Tab 1</TabsTrigger>
  <TabsTrigger size="default" value="tab2">Tab 2</TabsTrigger>
</TabsList>
```

### Large

Larger size for better touch targets and prominence.

```svelte
<TabsList size="lg">
  <TabsTrigger size="lg" value="tab1">Tab 1</TabsTrigger>
  <TabsTrigger size="lg" value="tab2">Tab 2</TabsTrigger>
</TabsList>
```

## Animations

### Fade (Default)

Smooth fade-in transition.

```svelte
<TabsContent value="tab1" animation="fade">
  Content with fade animation
</TabsContent>
```

### Slide

Content slides in from bottom.

```svelte
<TabsContent value="tab1" animation="slide">
  Content with slide animation
</TabsContent>
```

### Scale

Content zooms in on appear.

```svelte
<TabsContent value="tab1" animation="scale">
  Content with scale animation
</TabsContent>
```

### None

No animation.

```svelte
<TabsContent value="tab1" animation="none">
  Content without animation
</TabsContent>
```

## With Icons

Enhance tabs with icons for better visual communication.

```svelte
<script>
  import { Home, User, Settings } from "@lucide/svelte";
</script>

<TabsList variant="pills">
  <TabsTrigger variant="pills" value="home">
    <Home class="size-4" />
    Home
  </TabsTrigger>
  <TabsTrigger variant="pills" value="profile">
    <User class="size-4" />
    Profile
  </TabsTrigger>
  <TabsTrigger variant="pills" value="settings">
    <Settings class="size-4" />
    Settings
  </TabsTrigger>
</TabsList>
```

## Content Padding

Control the spacing above the content area.

```svelte
<!-- No padding -->
<TabsContent value="tab1" padding="none">
  Content without top padding
</TabsContent>

<!-- Small padding -->
<TabsContent value="tab1" padding="sm">
  Content with small padding
</TabsContent>

<!-- Default padding -->
<TabsContent value="tab1" padding="default">
  Content with default padding
</TabsContent>

<!-- Large padding -->
<TabsContent value="tab1" padding="lg">
  Content with large padding
</TabsContent>
```

## Responsive Behavior

The Tabs component is fully responsive out of the box. No additional props are needed — responsive styles are applied automatically via Tailwind CSS breakpoints.

### Mobile (≤640px)

- **Horizontal scroll**: The tab list scrolls horizontally with hidden scrollbar for a clean look
- **Touch-friendly**: Triggers have a minimum height of 44px (WCAG touch target) and increased padding
- **No wrapping**: Tabs stay in a single row with `flex-nowrap` and `shrink-0` on triggers
- **Vertical → Horizontal**: Vertical tabs automatically convert to horizontal orientation on mobile

### Tablet (≤768px)

- **Full width**: The tab list stretches to fill available width
- **Font capping**: Text size is capped at `text-sm` for consistent readability

### Desktop (>768px)

- **Unchanged**: Standard `w-fit` behavior with all existing variant/size styling

### Vertical Tabs on Mobile

When using `orientation="vertical"`, the root component detects mobile screens (≤640px) and automatically switches to horizontal orientation:

```svelte
<!-- Renders vertically on desktop, horizontally on mobile -->
<Tabs orientation="vertical" value="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Many Tabs (Overflow)

When there are too many tabs to fit on screen, the list scrolls horizontally on mobile. The scrollbar is hidden for a cleaner appearance, but scroll functionality is preserved via touch/drag:

```svelte
<TabsList variant="underline">
  <TabsTrigger variant="underline" value="t1">Dashboard</TabsTrigger>
  <TabsTrigger variant="underline" value="t2">Analytics</TabsTrigger>
  <TabsTrigger variant="underline" value="t3">Reports</TabsTrigger>
  <TabsTrigger variant="underline" value="t4">Settings</TabsTrigger>
  <TabsTrigger variant="underline" value="t5">Billing</TabsTrigger>
  <TabsTrigger variant="underline" value="t6">Team</TabsTrigger>
</TabsList>
```

### Dropdown Conversion on Mobile

For screens where even scrolling tabs feel cluttered, you can convert tabs to a `Select` dropdown on mobile. Pass `dropdownOnMobile` and `items` to the `Tabs` root:

```svelte
<script lang="ts">
  import type { TabItem } from "aether-ui";

  const tabs: TabItem[] = [
    { value: "general", label: "General" },
    { value: "appearance", label: "Appearance" },
    { value: "notifications", label: "Notifications" },
  ];
</script>

<Tabs value="general" dropdownOnMobile items={tabs}>
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="appearance">Appearance</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="general">General content</TabsContent>
  <TabsContent value="appearance">Appearance content</TabsContent>
  <TabsContent value="notifications">Notifications content</TabsContent>
</Tabs>
```

On desktop, tabs render normally. On mobile (≤640px), the TabsList is hidden and replaced by a Select dropdown. The `items` array provides the options for the dropdown. The `TabsContent` panels still work as usual since the value binding is shared.

## API Reference

### Tabs (Root)

The root tabs container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Currently active tab value (bindable) |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Tab orientation (vertical auto-converts to horizontal on mobile ≤640px) |
| `items` | `TabItem[]` | `[]` | Tab items for dropdown mode (requires `dropdownOnMobile`) |
| `dropdownOnMobile` | `boolean` | `false` | Convert tabs to a Select dropdown on mobile (≤640px) |
| `onValueChange` | `(value: string) => void` | - | Callback when active tab changes |
| `class` | `string` | - | Additional CSS classes |

### TabItem

Type definition for dropdown items:

```typescript
interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### TabsList

Container for tab triggers.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "underline" \| "pills" \| "solid" \| "segmented"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the tabs list |
| `class` | `string` | - | Additional CSS classes |

### TabsTrigger

Individual tab trigger button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Unique value for this tab |
| `variant` | `"default" \| "underline" \| "pills" \| "solid" \| "segmented"` | `"default"` | Visual style variant (should match TabsList) |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the trigger (should match TabsList) |
| `disabled` | `boolean` | `false` | Whether the tab is disabled |
| `class` | `string` | - | Additional CSS classes |

### TabsContent

Content panel for each tab.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Value matching the associated trigger |
| `animation` | `"none" \| "fade" \| "slide" \| "scale"` | `"fade"` | Animation effect when content appears |
| `padding` | `"none" \| "sm" \| "default" \| "lg"` | `"default"` | Top padding of content area |
| `class` | `string` | - | Additional CSS classes |

## Advanced Examples

### Controlled Tabs

```svelte
<script lang="ts">
  let activeTab = $state("account");

  function handleTabChange(value: string) {
    console.log("Tab changed to:", value);
    activeTab = value;
  }
</script>

<Tabs value={activeTab} onValueChange={handleTabChange}>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="password">Password content</TabsContent>
</Tabs>

<p>Current tab: {activeTab}</p>
```

### Disabled Tabs

```svelte
<TabsList>
  <TabsTrigger value="enabled">Enabled</TabsTrigger>
  <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
</TabsList>
```

### Custom Styling

```svelte
<TabsList class="bg-blue-100 dark:bg-blue-900">
  <TabsTrigger 
    value="custom" 
    class="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
  >
    Custom Styled
  </TabsTrigger>
</TabsList>
```

### Mixed Variants

```svelte
<!-- Pills list with large size -->
<TabsList variant="pills" size="lg">
  <TabsTrigger variant="pills" size="lg" value="tab1">Tab 1</TabsTrigger>
  <TabsTrigger variant="pills" size="lg" value="tab2">Tab 2</TabsTrigger>
</TabsList>

<!-- Underline list with small size -->
<TabsList variant="underline" size="sm">
  <TabsTrigger variant="underline" size="sm" value="tab1">Tab 1</TabsTrigger>
  <TabsTrigger variant="underline" size="sm" value="tab2">Tab 2</TabsTrigger>
</TabsList>
```

### Complex Content

```svelte
<Tabs value="dashboard">
  <TabsList variant="underline">
    <TabsTrigger variant="underline" value="dashboard">Dashboard</TabsTrigger>
    <TabsTrigger variant="underline" value="analytics">Analytics</TabsTrigger>
  </TabsList>
  
  <TabsContent value="dashboard" animation="slide" padding="lg">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>January 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">$45,231.89</div>
        </CardContent>
      </Card>
      <!-- More cards... -->
    </div>
  </TabsContent>
  
  <TabsContent value="analytics" animation="scale">
    <!-- Analytics charts and data -->
  </TabsContent>
</Tabs>
```

## Best Practices

### Variant Consistency

Always use matching variants for `TabsList` and `TabsTrigger`:

```svelte
<!-- ✅ Good -->
<TabsList variant="pills">
  <TabsTrigger variant="pills" value="tab1">Tab 1</TabsTrigger>
</TabsList>

<!-- ❌ Bad -->
<TabsList variant="pills">
  <TabsTrigger variant="underline" value="tab1">Tab 1</TabsTrigger>
</TabsList>
```

### Size Consistency

Keep sizes consistent across list and triggers:

```svelte
<!-- ✅ Good -->
<TabsList size="lg">
  <TabsTrigger size="lg" value="tab1">Tab 1</TabsTrigger>
</TabsList>

<!-- ❌ Bad -->
<TabsList size="lg">
  <TabsTrigger size="sm" value="tab1">Tab 1</TabsTrigger>
</TabsList>
```

### Accessible Labels

Use clear, descriptive labels for tabs:

```svelte
<!-- ✅ Good -->
<TabsTrigger value="account">Account Settings</TabsTrigger>

<!-- ❌ Bad -->
<TabsTrigger value="1">Tab 1</TabsTrigger>
```

### Performance

For content-heavy tabs, consider lazy loading:

```svelte
<script lang="ts">
  let activeTab = $state("overview");
</script>

<TabsContent value="analytics">
  {#if activeTab === "analytics"}
    <ExpensiveAnalyticsComponent />
  {/if}
</TabsContent>
```

## Styling

### CSS Variables

The component uses the following CSS custom properties:

- `--background` - Default background color
- `--foreground` - Default text color
- `--muted` - Muted background color
- `--muted-foreground` - Muted text color
- `--primary` - Primary accent color
- `--primary-foreground` - Primary text color
- `--border` - Border color
- `--ring` - Focus ring color

### Tailwind Classes

You can customize any component with Tailwind classes:

```svelte
<TabsList class="bg-gradient-to-r from-blue-500 to-purple-500">
  <TabsTrigger class="text-white hover:text-gray-200">Tab</TabsTrigger>
</TabsList>
```

## Accessibility

The Tabs component is built on bits-ui primitives which provide:

- **Keyboard Navigation**: Arrow keys to navigate between tabs, Space/Enter to activate
- **Focus Management**: Proper focus handling and visible focus indicators
- **ARIA Attributes**: Correct ARIA roles, states, and properties
- **Screen Reader Support**: Announces tab state and content properly

### Keyboard Shortcuts

- `Tab` - Move focus into/out of the tab list
- `Arrow Left/Right` - Navigate between tabs (horizontal orientation)
- `Arrow Up/Down` - Navigate between tabs (vertical orientation)
- `Space/Enter` - Activate focused tab
- `Home` - Move to first tab
- `End` - Move to last tab

## Examples

Check out the demo page at [/tabs](/tabs) for interactive examples of all variants, sizes, and animations.

## Demo & Storybook

### Demo Page
Visit [/tabs](/tabs) for an interactive demonstration showcasing:
- All 5 variants (default, underline, pills, solid, segmented)
- All 3 sizes (sm, default, lg)
- Animation variants (slide, scale)
- Icons integration examples
- Responsive overflow scroll with many tabs
- Vertical tabs (auto horizontal on mobile)
- Dropdown conversion on mobile (`dropdownOnMobile`)
- Real-world usage patterns

### Storybook Stories
The component includes comprehensive Storybook stories:
- Basic variant stories (Default, Underline, Pills, Solid, Segmented)
- Size variations (Small, Large)
- Animation effects (Slide Animation, Scale Animation, No Animation)
- Feature demonstrations (Disabled tabs)
- Advanced combinations (Pills Large Slide, Underline Small)
- Responsive overflow (many tabs scroll)
- Responsive vertical (auto horizontal on mobile)
- Responsive pills overflow (icons + many tabs)

Access stories at: `src/lib/components/ui/tabs/docs/tabs.stories.svelte`

## Related Components

- [Card](../card) - Often used to contain tab content
- [Button](../button) - Similar variant system
- [Accordion](../accordion) - Alternative navigation pattern
- [Breadcrumb](../breadcrumb) - Navigation component

## Technical Implementation

### File Structure
```
tabs/
├── index.ts                 # Exports and type definitions
├── tabs.svelte             # Root component
├── tabs-list.svelte        # List container with variants
├── tabs-trigger.svelte     # Individual trigger buttons
├── tabs-content.svelte     # Content panels with animations
├── TABS.md                 # This documentation
└── docs/
    └── tabs.stories.svelte # Storybook stories
```

### Type Exports
All variant types are properly exported for TypeScript users:
- `TabItem`
- `TabsListVariant`
- `TabsListSize`
- `TabsTriggerVariant`
- `TabsTriggerSize`
- `TabsContentAnimation`
- `TabsContentPadding`

## Changelog

### Version 1.1.0 (February 2026)
- Added fully responsive behavior for mobile and tablet screens
- Mobile (≤640px): horizontal scroll, hidden scrollbar, touch-friendly 44px min-height triggers
- Tablet (≤768px): full-width tab list, capped font size
- Vertical tabs with proper `data-[orientation=vertical]` styling (flex-col, border-right for underline)
- Vertical tabs automatically convert to horizontal on mobile
- Added `dropdownOnMobile` prop to convert tabs to a Select dropdown on mobile
- Added `items` prop (`TabItem[]`) for dropdown mode option labels
- Exported `TabItem` type from index
- Increased trigger padding on small screens for better tap targets
- Size variants scale up on mobile (h-9→h-11, h-8→h-10, h-10→h-12)

### Version 1.0.0 (January 2026)
- Initial release with 5 variants (default, underline, pills, solid, segmented)
- Added 3 size options (sm, default, lg)
- Added 4 animation options (none, fade, slide, scale)
- Added content padding control (none, sm, default, lg)
- Full TypeScript support with exported types
- Comprehensive documentation and examples
- Storybook integration with 13 stories
- Demo page with all features
- Built with Svelte 5 runes and bits-ui primitives
- Uses tailwind-variants (tv) for variant management
- Full accessibility with keyboard navigation and ARIA support
