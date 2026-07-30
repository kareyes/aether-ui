# TimePicker Component

A segmented, keyboard-editable time field with an optional dropdown of hour /
minute / second / AM-PM columns. Built on bits-ui's headless `TimeField` and
`Time` from `@internationalized/date` — a zone-less wall-clock time, matching
native `<input type="time">` semantics.

## Features

- ✅ **Segmented input**: each part is independently focusable and editable
- ✅ **Full keyboard control**: type digits, arrow up/down to step, arrow left/right between segments
- ✅ **Column dropdown**: scrollable hour / minute / second / AM-PM lists
- ✅ **12 or 24-hour**: `hourCycle` drives both the segments and the columns
- ✅ **Granularity**: `hour`, `minute` (default), or `second`
- ✅ **Steps**: configurable minute/second increments for the columns
- ✅ **Range limits**: `minValue` / `maxValue` strike out unreachable options — including the "Now" shortcut
- ✅ **Variants & sizes**: matches Select / NumberSpinner (`default`, `outline`, `filled`, `ghost`, `underline` × `sm`, `default`, `lg`)
- ✅ **Form participation**: `name` submits an ISO time string via a hidden input
- ✅ **Dialog-safe**: the dropdown renders correctly inside a modal `<dialog>`
- ✅ **Error state**: destructive styling plus `aria-invalid`, forced by `error` or self-reported via `onError`

## Basic Usage

```svelte
<script lang="ts">
  import { TimePicker } from "aether-ui";
  import { Time } from "@internationalized/date";

  let shiftStart = $state<Time | undefined>(new Time(9, 0));
</script>

<TimePicker bind:value={shiftStart} label="Shift start" />
```

`value` is a `Time`, so reading it back is just field access:

```ts
shiftStart?.hour;      // 9
shiftStart?.toString(); // "09:00:00"
```

## Hour Cycle

```svelte
<TimePicker bind:value={time} hourCycle={24} />
```

The AM/PM column and segment disappear on a 24-hour clock, and hours render
zero-padded `00`–`23`.

## Granularity

```svelte
<TimePicker bind:value={time} granularity="hour" />
<TimePicker bind:value={time} granularity="minute" />
<TimePicker bind:value={time} granularity="second" />
```

Granularity controls which segments and columns exist. Anything below the
chosen granularity is zeroed on selection, so an hour-granularity picker never
carries stray minutes from a seeded value.

## Steps

```svelte
<TimePicker bind:value={time} minuteStep={15} />
<TimePicker bind:value={time} granularity="second" minuteStep={1} secondStep={10} />
```

Steps affect the **columns only** — typing into a segment or arrowing through
it still reaches every value, the same way a native time input does.

## Range Limits

```svelte
<script lang="ts">
  import { Time } from "@internationalized/date";
</script>

<TimePicker
  bind:value={time}
  minValue={new Time(9, 30)}
  maxValue={new Time(17, 0)}
/>
```

Out-of-range options are disabled and struck through. An entry is only
disabled when *nothing* it could still become is legal — with a 09:30 minimum,
hour 9 stays selectable (09:45 is reachable) while its 00 and 15 minute entries
do not.

The **"Now" shortcut obeys the same bounds**: it is disabled when the value it
would commit falls outside them, and re-checks at click time so a dropdown left
open across a bound can't write past it. The check runs on the *snapped* value,
not the raw clock — under a 09:30 minimum and a 60-minute step, a 09:45 clock
would commit 09:00, so the raw reading passing is not enough.

A time typed into the segments can still land out of range (the keyboard reaches
every value, as it does in a native time input). The picker marks itself invalid
when that happens and reports it through `onError`.

## Variants and Sizes

```svelte
<TimePicker bind:value={time} variant="outline" size="lg" />
```

| Prop | Values |
|------|--------|
| `variant` | `default`, `outline`, `filled`, `ghost`, `underline` |
| `size` | `sm`, `default`, `lg` |

## Field-only (no dropdown)

```svelte
<TimePicker bind:value={time} showPicker={false} />
```

Leaves a purely keyboard-driven segmented field — useful in dense tables where
a popover would be noise.

## Forms

```svelte
<form method="POST">
  <TimePicker name="startTime" label="Start" bind:value={time} required />
  <button type="submit">Save</button>
</form>
```

bits-ui renders the hidden input, so the value posts as an ISO time string
(`"09:30:00"`). Parse it back with `parseTime` from `@internationalized/date`.

## Error State

`error` is the caller's own verdict — "this field is required and empty", say.
It forces destructive styling plus `aria-invalid`.

```svelte
<TimePicker bind:value={time} error={!time} />
```

`onError` is the *picker's* verdict, and reports something the caller cannot
compute for itself: the held value is outside `minValue` / `maxValue`. It fires
with `false` again once the value comes back into range, so it can drive form
state directly.

```svelte
<script lang="ts">
  let outOfHours = $state(false);
</script>

<TimePicker
  bind:value={time}
  minValue={new Time(9, 0)}
  maxValue={new Time(17, 0)}
  onError={(invalid) => (outOfHours = invalid)}
/>
{#if outOfHours}
  <p>Pick a time inside opening hours.</p>
{/if}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Time \| undefined` | `undefined` | Selected time (bindable) |
| `placeholder` | `Time \| undefined` | granularity default | Seeds format + starting point (bindable) |
| `label` | `string` | — | Visible, associated label |
| `variant` | `TimePickerVariant` | `"default"` | Visual style |
| `size` | `TimePickerSize` | `"default"` | Control size |
| `hourCycle` | `12 \| 24` | `12` | Clock convention |
| `granularity` | `"hour" \| "minute" \| "second"` | `"minute"` | Smallest visible unit |
| `minuteStep` | `number` | `5` | Minute column increment |
| `secondStep` | `number` | `5` | Second column increment |
| `minValue` | `Time` | — | Earliest selectable time (inclusive) |
| `maxValue` | `Time` | — | Latest selectable time (inclusive) |
| `disabled` | `boolean` | `false` | Disable the control |
| `readonly` | `boolean` | `false` | Display without editing |
| `required` | `boolean` | `false` | Mark the hidden input required |
| `name` | `string` | — | Form field name |
| `locale` | `string` | `"en"` | Formatting locale |
| `showPicker` | `boolean` | `true` | Show the dropdown trigger |
| `showNow` | `boolean` | `true` | Show the "Now" shortcut |
| `error` | `boolean` | `false` | Force error styling + `aria-invalid` |
| `onError` | `(error: boolean) => void` | — | Fires with the picker's own out-of-bounds verdict |
| `onValueChange` | `(value: Time \| undefined) => void` | — | Value change callback |
| `class` | `string` | — | Classes for the outer wrapper |
| `fieldClass` | `string` | — | Classes for the bordered field box |
| `icon` | `Snippet` | clock icon | Replaces the leading icon |
| `portalProps` | `PortalProps` | auto | Popover portal target override |

## Composition (primitives)

Reach for these only when the declarative component can't express the layout:

```svelte
<script lang="ts">
  import { TimePickerPrimitives } from "aether-ui";
  const { Field, Input, Segment, Label } = TimePickerPrimitives;
</script>

<Field bind:value={time} granularity="minute">
  <Label>Start time</Label>
  <Input name="startTime">
    {#snippet children({ segments })}
      {#each segments as segment, i (i)}
        <Segment part={segment.part}>{segment.value}</Segment>
      {/each}
    {/snippet}
  </Input>
</Field>
```

`Input` renders default styled segments when given no children, so the snippet
above is only needed to interleave extra markup.

## Keyboard

| Key | Action |
|-----|--------|
| `0`–`9` | Type into the focused segment |
| `↑` / `↓` | Increment / decrement the focused segment |
| `←` / `→` | Move between segments |
| `A` / `P` | Set AM / PM on the day-period segment |
| `Backspace` | Clear the focused segment |
| `Tab` | Move to the dropdown trigger |

## Accessibility

- Segments carry `role="spinbutton"` with `aria-valuenow` / `aria-valuetext`, supplied by bits-ui
- The dropdown trigger announces the current selection (`"Change time, currently 1:05 PM"`)
- Each column is a labelled `group`; entries expose `aria-pressed`
- The field shows a focus ring via `:focus-within` while a segment holds focus
- `error` sets `aria-invalid`; bits-ui sets `data-invalid` for out-of-range values
