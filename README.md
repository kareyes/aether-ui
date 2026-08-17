# Aether

A modern, accessible Svelte 5 UI component library built with Tailwind CSS v4.

## Features

- **40+ Components** - Comprehensive set of UI components for building modern web applications
- **Svelte 5** - Built with the latest Svelte 5 runes and snippets
- **Tailwind CSS v4** - Styled with Tailwind CSS v4 using CSS variables for theming
- **Accessible** - Built on top of [bits-ui](https://bits-ui.com) for robust accessibility
- **Dark Mode** - Full dark mode support out of the box
- **TypeScript** - Fully typed components with TypeScript support
- **Customizable** - Easy to customize with CSS variables and Tailwind classes


## Documentation

https://aether-ui-svelte.web.app/


## Installation

### 1. Configure npm Registry

Create a `.npmrc` file in your project root:

```
@kareyes:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

> **Note**: You need a GitHub Personal Access Token with `read:packages` scope. Generate one at https://github.com/settings/tokens

### 2. Install the Package

```bash
pnpm add svelte @lucide/svelte tailwindcss

pnpm add @kareyes/aether-ui

# or

npm install svelte @lucide/svelte tailwindcss

npm install @kareyes/aether-ui
```

### 3. Configure Styles

Add the following to your main CSS file (e.g., `src/app.css`):

```css
@import "tailwindcss";
@import "@kareyes/aether-ui/styles";

/* Scan Aether components for Tailwind classes */
@source "../node_modules/@kareyes/aether-ui/dist/**/*.{svelte,js}";
```

### 3.2 Import `app.css` in Layout

**File:** `src/routes/+layout.svelte`

```svelte
<script lang="ts">
  import "../app.css";
  
  let { children } = $props();
</script>

{@render children()}
```

**Changes:**
- Add `import "../app.css";` at the top of the script section

---



## Quick Start

```svelte
<script>
  import { Button, Card, Input } from '@kareyes/aether-ui';
</script>

<Card title="Welcome to Aether" description="A beautiful UI component library">
    <Input placeholder="Enter your name..." />

    {#snippet footer()}
    <Button>Get Started</Button>
    {/snippet}
</Card>


```

## Components

### Layout & Structure
- **Card** - Container for grouping related content
- **Separator** - Visual divider between content
- **Sidebar** - Navigation sidebar with collapsible groups
- **Tabs** - Tabbed interface for organizing content

### Forms & Inputs
- **Button** - Primary action element with variants
- **ButtonGroup** - Group related buttons together
- **Checkbox** - Single or grouped checkboxes
- **ComboBox** - Searchable dropdown select
- **DatePicker** - Date and date range selection
- **Field** - Form field wrapper with label and error states
- **FileInput** - File upload with drag & drop support
- **Input** - Text input with variants
- **InputGroup** - Input with addons and buttons
- **InputOTP** - One-time password input
- **Label** - Form labels
- **NumberSpinner** - Numeric input with increment/decrement
- **RadioGroup** - Radio button groups
- **Select** - Dropdown selection
- **Slider** - Range slider input
- **Switch** - Toggle switch
- **Textarea** - Multi-line text input

### Feedback & Overlays
- **Alert** - Informational messages
- **AlertDialog** - Confirmation dialogs
- **Dialog** - Modal dialogs
- **Popover** - Floating content panels
- **Sheet** - Slide-out panels
- **Sonner** - Toast notifications
- **Tooltip** - Hover tooltips

### Data Display
- **Accordion** - Expandable content sections
- **Avatar** - User avatars with fallback
- **Badge** - Status indicators and labels
- **Breadcrumb** - Navigation breadcrumbs
- **Calendar** - Calendar display
- **DataTable** - Data tables with sorting and pagination
- **Skeleton** - Loading placeholders
- **Spinner** - Loading spinners
- **Stepper** - Multi-step progress indicator
- **Table** - Basic table components

### Navigation
- **Command** - Command palette / search
- **DropdownMenu** - Dropdown menus
- **NavigationMenu** - A collection of links for navigating websites

## Theming

Aether uses CSS variables for theming. You can customize the theme by overriding these variables:

```css
:root {
  --primary: oklch(0.488 0.243 264.376);
  --primary-foreground: oklch(0.97 0.014 254.604);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... see theme.css for all variables */
}

.dark {
  --primary: oklch(0.488 0.243 264.376);
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode overrides */
}
```

## Utilities

### `cn()` - Class Name Utility

Merge Tailwind classes with proper precedence:

```svelte
<script>
  import { cn } from '@kareyes/aether-ui/utils';
</script>

<div class={cn("p-4 bg-primary", someCondition && "bg-secondary")}>
  Content
</div>
```

## Requirements

- **Svelte** ^5.0.0
- **Tailwind CSS** ^4.0.0
- **Lucide Svelte** ^0.561.0



## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run Storybook
pnpm storybook

# Build the package
pnpm build:package

# Run tests
pnpm test
```

## License

MIT
