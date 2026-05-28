# FileInput Component

A flexible file upload component with three display modes, built-in file validation, and full form integration support.

## Table of Contents

- [Features](#features)
- [Modes](#modes)
- [Basic Usage](#basic-usage)
- [Props Reference](#props-reference)
  - [Shared Props](#shared-props)
  - [Drag & Drop Mode Props](#drag--drop-mode-props)
  - [Regular Mode Props](#regular-mode-props)
  - [Button-Only Mode Props](#button-only-mode-props)
  - [Validation Config](#validation-config)
- [Examples](#examples)
- [Direct Component Usage](#direct-component-usage)
- [Validation](#validation)
- [Event Handling](#event-handling)
- [With Field Component](#with-field-component)
- [SchemaForm Integration](#schemaform-integration)
- [Utilities](#utilities)

---

## Features

- **3 display modes**: drag-drop, regular input, button-only
- **File validation**: type checking, size limits, max file count
- **Blur event**: `onblur` fires when the interactive element loses focus — integrates with form touched state
- **Drag & drop**: visual feedback with intelligent drag-leave detection
- **File management**: built-in file list with per-file remove buttons
- **Bindable files**: two-way `bind:files` or one-way `onFilesChange` callback
- **Error state**: `error` prop drives visual error styling
- **Keyboard accessible**: Enter / Space triggers the file picker in drag-drop mode
- **TypeScript**: complete type safety for all modes and props

---

## Modes

| Mode | Prop value | Description |
|------|------------|-------------|
| Regular | `"regular"` *(default)* | Traditional styled input with Browse button |
| Drag & Drop | `"drag-drop"` | Full drop-zone with visual drag feedback |
| Button Only | `"button-only"` | Minimal button trigger |

---

## Basic Usage

```svelte
<script lang="ts">
  import { FileInput } from "aether-ui";

  let files = $state<FileList | null>(null);
</script>

<!-- Default: regular mode -->
<FileInput bind:files />

<!-- Drag & drop -->
<FileInput mode="drag-drop" bind:files />

<!-- Button only -->
<FileInput mode="button-only" bind:files />
```

---

## Props Reference

### Shared Props

These apply to all three modes via the `FileInput` wrapper.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'regular' \| 'drag-drop' \| 'button-only'` | `'regular'` | Display mode |
| `files` | `FileList \| null` | `null` | Selected files — bindable |
| `validation` | `FileValidationConfig` | `{}` | File validation rules (see below) |
| `onFilesChange` | `(files: FileList \| null) => void` | — | Called when selection changes |
| `onError` | `(error: string) => void` | — | Called when validation fails |
| `onblur` | `(event: FocusEvent) => void` | — | Called when the interactive element loses focus |
| `accept` | `string` | — | HTML `accept` attribute (e.g. `"image/*"`, `".pdf,.docx"`) — alternative to `validation.acceptedTypes` |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `disabled` | `boolean` | `false` | Disable the input |
| `required` | `boolean` | `false` | Mark as required for native form submission |
| `error` | `boolean` | `false` | Show error visual state |
| `id` | `string` | — | Input element id |
| `name` | `string` | — | Input element name |
| `form` | `string` | — | Associated form id |
| `class` | `string` | `""` | Additional CSS classes |
| `dragDropProps` | `Partial<DragDropFileInputProps>` | `{}` | Props forwarded to drag-drop sub-component |
| `regularProps` | `Partial<RegularFileInputProps>` | `{}` | Props forwarded to regular sub-component |
| `buttonProps` | `Partial<ButtonFileInputProps>` | `{}` | Props forwarded to button-only sub-component |

### Drag & Drop Mode Props

Pass via `dragDropProps` or use `FileInputDragDrop` directly.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Drag and drop files here"` | Primary text inside the drop zone |
| `description` | `string` | `"or click to select files"` | Secondary text below label |
| `showFileList` | `boolean` | `true` | Show selected files below the drop zone |
| `height` | `string` | — | Custom `min-height` CSS value for the drop zone |

### Regular Mode Props

Pass via `regularProps` or use `FileInputRegular` directly.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `"Choose files..."` | Placeholder text when no file is selected |
| `showFileCount` | `boolean` | `true` | Show file count in the input field |
| `showFileList` | `boolean` | `true` | Show selected files below the input |

### Button-Only Mode Props

Pass via `buttonProps` or use `FileInputButton` directly.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonText` | `string` | `"Choose Files"` | Button label text |
| `variant` | `'default' \| 'filled' \| 'ghost' \| 'danger'` | `'default'` | Button variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Button size |
| `showCount` | `boolean` | `true` | Show selected file count in the button label |
| `showFileList` | `boolean` | `true` | Show selected files below the button |

### Validation Config

Passed as the `validation` prop object.

```typescript
interface FileValidationConfig {
  maxFiles?: number;    // Maximum number of files allowed
  maxSize?: number;     // Maximum size per file in bytes
  acceptedTypes?: string[];  // MIME types or extensions
}
```

Validation runs in this order: **max files → file types → file size**. The first failure triggers `onError` and briefly shows an error state (auto-clears after 3 seconds).

> **Note:** `accept` (the HTML attribute string) and `validation.acceptedTypes` (the array) both restrict the file picker. They are independent — you can use either or both.

---

## Examples

### Drag & Drop — Image Upload

```svelte
<FileInput
  mode="drag-drop"
  bind:files
  accept="image/png,image/jpeg,image/webp"
  validation={{ maxFiles: 1, maxSize: 5 * 1024 * 1024 }}
  dragDropProps={{
    label: "Drop your profile photo here",
    description: "PNG, JPG, or WebP — max 5 MB"
  }}
  onError={(err) => console.error(err)}
/>
```

### Regular Mode — Multiple Documents

```svelte
<FileInput
  mode="regular"
  bind:files
  multiple
  accept=".pdf,.doc,.docx"
  validation={{
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024,
    acceptedTypes: [".pdf", ".doc", ".docx"]
  }}
  regularProps={{ placeholder: "Choose documents..." }}
/>
```

### Button Only — Minimal Attachment

```svelte
<FileInput
  mode="button-only"
  bind:files
  multiple
  buttonProps={{
    buttonText: "Attach Files",
    variant: "ghost",
    size: "sm"
  }}
/>
```

### Custom Drop Zone Height

```svelte
<FileInput
  mode="drag-drop"
  bind:files
  dragDropProps={{ height: "200px", showFileList: false }}
/>
```

### Callback Pattern (no bind:)

```svelte
<FileInput
  mode="regular"
  onFilesChange={(files) => {
    if (files) console.log("Selected:", Array.from(files).map(f => f.name));
  }}
  onError={(err) => console.warn("Validation error:", err)}
/>
```

---

## Direct Component Usage

When you know the display mode upfront, import the sub-components directly instead of going through the `FileInput` wrapper. Props are passed **flat** — no `dragDropProps`/`regularProps`/`buttonProps` nesting needed.

```svelte
<script lang="ts">
  import {
    FileInputDragDrop,
    FileInputRegular,
    FileInputButton,
  } from "aether-ui";
</script>
```

### `FileInputDragDrop`

Full drop-zone with drag-over visual feedback. All shared props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Drag and drop files here"` | Primary text inside the drop zone |
| `description` | `string` | `"or click to select files"` | Secondary text below label |
| `showFileList` | `boolean` | `true` | Show selected files below the drop zone |
| `height` | `string` | — | Custom `min-height` CSS value for the drop zone |

```svelte
<FileInputDragDrop
  bind:files
  label="Drop your avatar here"
  description="PNG or JPG — max 2 MB"
  height="180px"
  accept="image/png,image/jpeg"
  validation={{ maxFiles: 1, maxSize: 2 * 1024 * 1024 }}
  onError={(err) => console.error(err)}
/>
```

### `FileInputRegular`

Traditional styled input with a Browse button and optional file list. All shared props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `"Choose files..."` | Placeholder text when no file is selected |
| `showFileCount` | `boolean` | `true` | Show file count in the input field |
| `showFileList` | `boolean` | `true` | Show selected files below the input |

```svelte
<FileInputRegular
  bind:files
  multiple
  placeholder="Choose documents..."
  showFileCount={true}
  accept=".pdf,.doc,.docx"
  validation={{ maxFiles: 5, maxSize: 10 * 1024 * 1024 }}
  onError={(err) => console.error(err)}
/>
```

### `FileInputButton`

Minimal button trigger with an optional file list. All shared props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonText` | `string` | `"Choose Files"` | Button label text |
| `variant` | `'default' \| 'filled' \| 'ghost' \| 'danger'` | `'default'` | Button visual variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Button size |
| `showCount` | `boolean` | `true` | Show selected file count next to the button label |
| `showFileList` | `boolean` | `true` | Show selected files below the button |

```svelte
<FileInputButton
  bind:files
  multiple
  buttonText="Attach Files"
  variant="ghost"
  size="sm"
  showCount={true}
  validation={{ maxFiles: 5, acceptedTypes: ["image/*", ".pdf"] }}
  onError={(err) => console.error(err)}
/>
```

### When to use direct components vs `FileInput`

| Situation | Recommendation |
|-----------|----------------|
| Mode is known at author time | Use `FileInputDragDrop` / `FileInputRegular` / `FileInputButton` directly — cleaner props, no nesting |
| Mode is dynamic (driven by a variable) | Use `FileInput` with `mode` prop |
| Used inside `SchemaForm` | Always `FileInput` — the schema renderer uses it internally |

---

## Validation

### Built-In Validation (via `validation` prop)

```svelte
<FileInput
  bind:files
  validation={{
    maxFiles: 3,
    maxSize: 2 * 1024 * 1024,        // 2 MB per file
    acceptedTypes: ["image/*", ".pdf"] // MIME types or extensions
  }}
  onError={(err) => (errorMsg = err)}
/>
```

### Accepted Types Formats

```typescript
// MIME types
acceptedTypes: ["image/*", "video/*", "application/pdf"]

// File extensions
acceptedTypes: [".jpg", ".png", ".pdf", ".docx"]

// Mixed
acceptedTypes: ["image/*", ".pdf", ".txt"]
```

### Using `commonFileTypes` and `commonSizeLimits`

```svelte
<script>
  import { commonFileTypes, commonSizeLimits } from "aether-ui";
</script>

<FileInput
  bind:files
  validation={{
    maxFiles: 5,
    maxSize: commonSizeLimits.LARGE,           // 10 MB
    acceptedTypes: commonFileTypes.DOCUMENTS   // [".pdf", ".doc", ".docx", ".txt"]
  }}
/>
```

Available `commonFileTypes` keys: `IMAGES`, `DOCUMENTS`, `SPREADSHEETS`, `PRESENTATIONS`, `VIDEOS`, `AUDIO`, `ARCHIVES`, `CODE`.

Available `commonSizeLimits`: `SMALL` (1 MB), `MEDIUM` (5 MB), `LARGE` (10 MB), `XLARGE` (50 MB).

---

## Event Handling

### `onblur`

Fires when the primary interactive element loses focus:
- **drag-drop** → when the drop zone div loses focus
- **regular** → when the trigger button loses focus
- **button-only** → when the button loses focus

Useful for marking fields as touched in form libraries:

```svelte
<FileInput
  bind:files
  onFilesChange={(f) => (value = f)}
  onblur={() => (touched = true)}
/>
```

### `onFilesChange`

Called with the current `FileList | null` whenever files are added or cleared.

```svelte
<FileInput
  onFilesChange={(files) => {
    selectedFiles = files;
  }}
/>
```

### `onError`

Called with a string message when validation fails. Error visual state auto-clears after 3 seconds.

```svelte
<FileInput
  onError={(err) => {
    toast.error(err);
  }}
/>
```

---

## With Field Component

Wrap with `Field` to get consistent labels, descriptions, and error display:

```svelte
<script lang="ts">
  import { FileInput, Field } from "aether-ui";

  let files = $state<FileList | null>(null);
  let error = $state("");
</script>

<Field
  label="Resume"
  description="PDF only, max 5 MB"
  required
  error={error || undefined}
>
  <FileInput
    mode="regular"
    bind:files
    validation={{ maxFiles: 1, maxSize: 5 * 1024 * 1024, acceptedTypes: [".pdf"] }}
    error={!!error}
    onError={(err) => (error = err)}
    onblur={() => { if (!files) error = "Please upload your resume"; }}
  />
</Field>
```

### Complete Upload Form

```svelte
<script lang="ts">
  import { FileInput, Field, Button } from "aether-ui";

  let resume      = $state<FileList | null>(null);
  let coverLetter = $state<FileList | null>(null);
  let portfolio   = $state<FileList | null>(null);
  let errors      = $state({ resume: "", coverLetter: "", portfolio: "" });

  function handleSubmit() {
    if (!resume)      { errors.resume = "Required"; return; }
    if (!coverLetter) { errors.coverLetter = "Required"; return; }
    console.log("Submit:", { resume, coverLetter, portfolio });
  }
</script>

<div class="space-y-6">
  <Field label="Resume" required error={errors.resume || undefined}>
    <FileInput
      mode="drag-drop"
      bind:files={resume}
      validation={{ maxFiles: 1, maxSize: 5 * 1024 * 1024, acceptedTypes: [".pdf"] }}
      error={!!errors.resume}
      onFilesChange={() => (errors.resume = "")}
      onError={(err) => (errors.resume = err)}
      dragDropProps={{ label: "Drop your resume here", description: "PDF only — max 5 MB" }}
    />
  </Field>

  <Field label="Cover Letter" required error={errors.coverLetter || undefined}>
    <FileInput
      mode="regular"
      bind:files={coverLetter}
      validation={{ maxFiles: 1, acceptedTypes: [".pdf", ".doc", ".docx"] }}
      error={!!errors.coverLetter}
      onFilesChange={() => (errors.coverLetter = "")}
      onError={(err) => (errors.coverLetter = err)}
    />
  </Field>

  <Field label="Portfolio" description="Optional — images or PDFs">
    <FileInput
      mode="button-only"
      bind:files={portfolio}
      multiple
      validation={{ maxFiles: 5, acceptedTypes: ["image/*", ".pdf"] }}
      onError={(err) => (errors.portfolio = err)}
      buttonProps={{ buttonText: "Attach Portfolio Files", variant: "ghost" }}
    />
  </Field>

  <Button onclick={handleSubmit}>Submit Application</Button>
</div>
```

---

## SchemaForm Integration

When using the `SchemaForm` component, declare file fields using `inputType: "file"` in `withField`. Use `RequiredFile` or `requiredFile()` for required fields — `Schema.Any` accepts `null` and should only be used for optional file fields.

```typescript
import {
  withField, withFormLayout,
  RequiredFile, requiredFile,
  FormController
} from "aether-ui/forms";
import { Schema, pipe } from "effect";

const UploadSchema = pipe(
  Schema.Struct({
    // Required — default message: "Please select a file"
    avatar: pipe(
      RequiredFile,
      withField({
        label: "Profile Photo",
        inputType: "file",
        accept: "image/png,image/jpeg",
        // fileMode defaults to "drag-drop" inside SchemaForm
      })
    ),

    // Required — custom message
    resume: pipe(
      requiredFile("Please upload your resume"),
      withField({
        label: "Resume",
        inputType: "file",
        fileMode: "regular",
        accept: ".pdf",
      })
    ),

    // Optional — null is valid
    attachments: pipe(
      Schema.Any,
      withField({
        label: "Attachments",
        inputType: "file",
        fileMode: "button-only",
        multiple: true,
        description: "Optional"
      })
    ),
  }),
  withFormLayout({ columns: 1 })
);

const controller = new FormController(UploadSchema, { validateOnBlur: true });
```

### File-specific `withField` options

| Option | Type | Description |
|--------|------|-------------|
| `inputType` | `"file"` | Renders a `FileInput` component |
| `fileMode` | `'drag-drop' \| 'regular' \| 'button-only'` | Display mode (default: `'drag-drop'`) |
| `multiple` | `boolean` | Allow multiple file selection |
| `accept` | `string` | HTML accept attribute string |

### `RequiredFile` vs `Schema.Any`

```typescript
// ✅ Required — fails validation when no file is selected
avatar: pipe(RequiredFile, withField({ ... }))

// ✅ Required — custom error message
resume: pipe(requiredFile("Upload your CV"), withField({ ... }))

// ✅ Optional — null (no file) is valid
attachment: pipe(Schema.Any, withField({ ... }))
```

> `RequiredFile` checks `value instanceof FileList && value.length > 0` and includes a `typeof FileList !== "undefined"` guard for SSR safety.

### Handling file data in `onSubmit`

File fields store a `FileList | null` as their value — not a URL or base64 string. Upload the files in your `onSubmit` handler:

```svelte
<SchemaForm
  {controller}
  onSubmit={async (data) => {
    const formData = new FormData();
    if (data.avatar) formData.append("avatar", data.avatar[0]);
    if (data.resume) formData.append("resume", data.resume[0]);
    await fetch("/api/upload", { method: "POST", body: formData });
  }}
/>
```

---

## Visual States

| State | Description |
|-------|-------------|
| Default | Ready for interaction |
| Drag Over | Blue highlight while files are dragged over the drop zone |
| Error | Destructive border/text on validation failure — auto-clears after 3 seconds |
| Disabled | Reduced opacity, non-interactive |

---

## Accessibility

- `role="button"` and `tabindex` on the drag-drop zone — activates with **Enter** or **Space**
- `aria-disabled` on the drag-drop zone when disabled
- `aria-describedby` links the trigger to the file list when files are selected
- `aria-label` on all remove buttons
- `sr-only` hidden `<input type="file">` receives focus for screen readers
