# CodeBlock Component

A versatile code block component for displaying code snippets with copy-to-clipboard functionality, collapsible sections, line numbers, and multiple style variants.

## Basic Usage

```svelte
<script>
  import { CodeBlock } from "aether-ui";

  const code = `function hello() {
  console.log("Hello, World!");
}`;
</script>

<CodeBlock {code} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | **required** | The code to display |
| `language` | `string` | `undefined` | Programming language label |
| `title` | `string` | `undefined` | Title or filename for the header |
| `showLineNumbers` | `boolean` | `false` | Show line numbers |
| `collapsible` | `boolean` | `false` | Allow collapsing the code block |
| `collapsed` | `boolean` | `false` | Initial collapsed state (bindable) |
| `showCopyButton` | `boolean` | `true` | Show the copy button |
| `maxHeight` | `string` | `undefined` | Maximum height before scrolling |
| `variant` | `"default" \| "dark" \| "light"` | `"default"` | Visual style variant |
| `class` | `string` | `undefined` | Additional CSS classes |

## With Language Label

Display a language badge in the header.

```svelte
<CodeBlock
  code={myCode}
  language="TypeScript"
/>
```

## With Title

Add a title or filename to the header.

```svelte
<CodeBlock
  code={myCode}
  title="utils.ts"
  language="TypeScript"
/>
```

## Line Numbers

Show line numbers for easier reference.

```svelte
<CodeBlock
  code={myCode}
  showLineNumbers
/>
```

## Collapsible

Make the code block collapsible to save space.

```svelte
<script>
  let collapsed = $state(false);
</script>

<CodeBlock
  code={myCode}
  title="Click to toggle"
  collapsible
  bind:collapsed
/>
```

### Initially Collapsed

Start in a collapsed state.

```svelte
<CodeBlock
  code={myCode}
  title="Expand to view code"
  collapsible
  collapsed={true}
/>
```

## Max Height

Limit the height and enable scrolling for long code.

```svelte
<CodeBlock
  code={longCode}
  maxHeight="300px"
  showLineNumbers
/>
```

## Variants

### Default

Uses the theme's muted background colors.

```svelte
<CodeBlock code={myCode} variant="default" />
```

### Dark

A dark theme suitable for any background.

```svelte
<CodeBlock code={myCode} variant="dark" />
```

### Light

A light theme for dark backgrounds.

```svelte
<CodeBlock code={myCode} variant="light" />
```

## Copy to Clipboard

The copy button is shown by default. Click it to copy the code to clipboard.

```svelte
<!-- With copy button (default) -->
<CodeBlock code={myCode} />

<!-- Without copy button -->
<CodeBlock code={myCode} showCopyButton={false} />
```

## Examples

### Minimal Inline Command

```svelte
<CodeBlock code="npm install aether-ui" />
```

### Full Featured

```svelte
<CodeBlock
  code={myCode}
  title="Component.svelte"
  language="Svelte"
  showLineNumbers
  collapsible
  maxHeight="400px"
  variant="dark"
/>
```

### Multiple Code Blocks

```svelte
<div class="space-y-4">
  <CodeBlock
    code={installCode}
    title="Installation"
    language="Bash"
  />
  <CodeBlock
    code={usageCode}
    title="Usage"
    language="TypeScript"
    showLineNumbers
  />
</div>
```

### Controlled Collapse State

```svelte
<script>
  let isCollapsed = $state(true);
</script>

<button onclick={() => isCollapsed = !isCollapsed}>
  {isCollapsed ? "Show" : "Hide"} Code
</button>

<CodeBlock
  code={myCode}
  collapsible
  bind:collapsed={isCollapsed}
/>
```

## Styling

The component uses CSS variables from your theme:

- `--muted` / `--muted-foreground` - Default variant colors
- `--border` - Border color
- `--accent` - Hover states

### Custom Styling

```svelte
<CodeBlock
  code={myCode}
  class="shadow-lg"
/>
```

## Features

- Copy to clipboard with visual feedback
- Collapsible code blocks
- Line numbers
- Language labels
- Title/filename display
- Scrollable with max height
- Multiple visual variants
- Keyboard accessible
- Dark mode support

## Accessibility

- Copy button has appropriate aria-label
- Collapsible header is keyboard accessible (Enter to toggle)
- Uses semantic `pre` and `code` elements
- Focus states for interactive elements

## Dependencies

- `@lucide/svelte` - Icons (copy, check, chevron)
- Tailwind CSS - Styling
