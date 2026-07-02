# Calendar Component

A fully-featured calendar component for displaying and selecting dates. Built on top of `bits-ui` Calendar primitives with support for single date selection, multiple months, dropdown navigation, and custom day rendering.

## Basic Usage

```svelte
<script>
  import { Calendar } from "aether-ui";
  import type { DateValue } from "@internationalized/date";

  let value = $state<DateValue | undefined>();
</script>

<Calendar bind:value={value} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateValue \| DateValue[]` | `undefined` | The selected date(s) (bindable) |
| `placeholder` | `DateValue` | `undefined` | Placeholder date for initial calendar view (bindable) |
| `weekdayFormat` | `"narrow" \| "short" \| "long"` | `"short"` | Format for weekday headers |
| `captionLayout` | `"label" \| "dropdown" \| "dropdown-months" \| "dropdown-years"` | `"label"` | Navigation caption style |
| `buttonVariant` | `ButtonVariant` | `"ghost"` | Variant for prev/next navigation buttons |
| `locale` | `string` | `"en-US"` | Locale for date formatting |
| `months` | `Month[]` | `undefined` | Custom months for dropdown (when using captionLayout dropdown) |
| `years` | `Year[]` | `undefined` | Custom years for dropdown |
| `monthFormat` | `"numeric" \| "2-digit" \| "narrow" \| "short" \| "long" \| function` | Auto | Month display format |
| `yearFormat` | `"numeric" \| "2-digit" \| function` | `"numeric"` | Year display format |
| `numberOfMonths` | `number` | `1` | Number of months to display |
| `pagedNavigation` | `boolean` | `false` | Navigate by number of months displayed |
| `preventDeselect` | `boolean` | `false` | Prevent deselecting the current value |
| `weekStartsOn` | `0-6` | `0` | Day the week starts on (0 = Sunday) |
| `fixedWeeks` | `boolean` | `false` | Always show 6 weeks |
| `disabled` | `boolean` | `false` | Disable the calendar |
| `readonly` | `boolean` | `false` | Make the calendar read-only |
| `minValue` | `DateValue` | `undefined` | Minimum selectable date |
| `maxValue` | `DateValue` | `undefined` | Maximum selectable date |
| `isDateDisabled` | `(date: DateValue) => boolean` | `undefined` | Function to disable specific dates |
| `isDateUnavailable` | `(date: DateValue) => boolean` | `undefined` | Function to mark dates as unavailable |
| `disableDaysOutsideMonth` | `boolean` | `false` | Disable days outside the current month |
| `day` | `Snippet` | `undefined` | Custom snippet for rendering day cells |
| `size` | `"sm" \| "default" \| "lg" \| "xl"` | `"default"` | Calendar size variant |
| `events` | `CalendarEvent[]` | `[]` | Array of events to display as markers |
| `class` | `string` | `undefined` | Additional CSS classes |

## Size Variants

The calendar supports four size variants.

### Small
```svelte
<Calendar size="sm" />
```

### Default
```svelte
<Calendar size="default" />
```

### Large
```svelte
<Calendar size="lg" />
```

### Extra Large
```svelte
<Calendar size="xl" />
```

### Full (Responsive)
Full-width calendar with event cards. Perfect for scheduling applications.

```svelte
<Calendar size="full" fixedWeeks={true} {events} />
```

Features of full size:
- Full-width responsive layout
- Events display as colored cards with labels
- Cells expand to show multiple events
- Header with weekday names in primary color
- Mobile responsive (smaller cells on mobile)

## Event Markers

Display event indicators on specific dates. Events show as dots on smaller sizes (sm, default) and badges on larger sizes (lg, xl).

### CalendarEvent Type
```typescript
type CalendarEvent = {
  date: string;    // ISO date string (YYYY-MM-DD)
  color?: string;  // Optional color (CSS color value)
  label?: string;  // Optional label (shown in badge on lg/xl)
};
```

### Basic Events
```svelte
<script>
  import { Calendar, type CalendarEvent } from "aether-ui";

  const events: CalendarEvent[] = [
    { date: "2024-12-05", color: "#ef4444", label: "Meeting" },
    { date: "2024-12-10", color: "#22c55e", label: "Event" },
    { date: "2024-12-15", color: "#3b82f6" },
  ];
</script>

<Calendar {events} />
```

### Events with Different Sizes
```svelte
<!-- Dots display (small/default sizes) -->
<Calendar size="sm" {events} />
<Calendar size="default" {events} />

<!-- Badge display (large/xl sizes) -->
<Calendar size="lg" {events} />
<Calendar size="xl" {events} />
```

### Multiple Events on Same Date
When multiple events fall on the same date:
- **Small/Default sizes**: Shows multiple colored dots (up to 2-3 based on size)
- **Large/XL sizes**: Shows event count badge when multiple events

```svelte
<script>
  const events: CalendarEvent[] = [
    { date: "2024-12-15", color: "#ef4444", label: "Meeting" },
    { date: "2024-12-15", color: "#3b82f6", label: "Call" },
    { date: "2024-12-15", color: "#22c55e" },
  ];
</script>

<!-- Shows 3 dots on default, shows "3" badge on xl -->
<Calendar size="default" {events} />
<Calendar size="xl" {events} />
```

## Caption Layouts

### Label (Default)
Shows month and year as plain text.

```svelte
<Calendar captionLayout="label" />
```

### Dropdown
Shows both month and year as dropdowns for quick navigation.

```svelte
<Calendar captionLayout="dropdown" />
```

### Dropdown Months
Shows month as dropdown, year as text.

```svelte
<Calendar captionLayout="dropdown-months" />
```

### Dropdown Years
Shows month as text, year as dropdown.

```svelte
<Calendar captionLayout="dropdown-years" />
```

## Multiple Months

Display multiple months side by side.

```svelte
<Calendar numberOfMonths={2} />
```

## Week View (`CalendarWeek`)

A compact variant that shows a **single week** at a time with previous/next
**week** navigation (the standard `Calendar` navigates by month). Useful for
weekly schedulers, timesheets, and day pickers where a full month is too much.

```svelte
<script>
  import { CalendarWeek } from "aether-ui";
  import type { DateValue } from "@internationalized/date";

  let value = $state<DateValue | undefined>();
</script>

<CalendarWeek type="single" bind:value={value} />
```

`CalendarWeek` is composed from the same `bits-ui` Calendar primitive and shared
`Calendar.*` sub-components as `Calendar` (so day selection, `today`, disabled
states and event markers behave identically). It simply renders the single week
that contains the `placeholder`, wraps it in a `Card`, and swaps the month
navigation for **week** navigation — the header shows the week's date range
(e.g. `May 19 – May 25, 2024`). Because it wraps `bits-ui`, it accepts the full
`Calendar` prop surface (`type`, `minValue`, `maxValue`, `isDateDisabled`,
`isDateUnavailable`, `readonly`, `disabled`, `onValueChange`, `locale`, …).

### `CalendarWeek` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | — | Selection mode (required, as with `Calendar`) |
| `value` | `DateValue` | `undefined` | The selected date (bindable). Clicking the selected day again clears it |
| `placeholder` | `DateValue` | `undefined` | Anchor date the visible week is derived from (bindable). Falls back to `value`, then today |
| `weekStartsOn` | `0-6` | `0` | Day the week starts on (0 = Sunday) |
| `weekdayFormat` | `"narrow" \| "short" \| "long"` | `"short"` | Format for weekday headers |
| `locale` | `string` | `"en-US"` | Locale for date/range formatting |
| `buttonVariant` | `ButtonVariant` | `"ghost"` | Variant for the prev/next navigation buttons |
| `size` | `"sm" \| "default" \| "lg" \| "xl" \| "full"` | `"default"` | Size variant (shares sizing with `Calendar`) |
| `fluid` | `boolean` | `false` | Stretch to the container width, distributing the seven day columns evenly (instead of the compact `w-fit` width) while keeping the compact cells |
| `fontSize` | `string` | `undefined` | Any CSS `font-size` value that overrides the calendar's text size — day numbers, weekday headers and the week range label. When omitted, text scales with `size` |
| `events` | `CalendarEvent[]` | `[]` | Events to display as markers (dots on compact sizes, cards on `full`) |
| `day` | `Snippet<[{ day: DateValue; outsideMonth: boolean }]>` | `undefined` | Custom day cell rendering (same signature as `Calendar`) |
| `class` | `string` | `undefined` | Additional CSS classes |

All other `Calendar` props (`minValue`, `maxValue`, `isDateDisabled`,
`isDateUnavailable`, `readonly`, `disabled`, `onValueChange`, `preventDeselect`,
…) are forwarded to the underlying primitive.

### Custom Font Size

Override the text size independently of the `size` variant (which controls the
cell dimensions). `fontSize` accepts any CSS `font-size` value and applies to the
day numbers, weekday headers and the range label:

```svelte
<CalendarWeek type="single" fontSize="1.25rem" />
<CalendarWeek type="single" size="lg" fontSize="14px" />
```

### Controlling the visible week

Bind `placeholder` to drive which week is shown from the parent:

```svelte
<script>
  import { CalendarWeek } from "aether-ui";
  import { today, getLocalTimeZone } from "@internationalized/date";

  let placeholder = $state(today(getLocalTimeZone()));
</script>

<CalendarWeek type="single" bind:placeholder={placeholder} />
<button onclick={() => (placeholder = placeholder.add({ weeks: 4 }))}>
  Jump 4 weeks ahead
</button>
```

## Date Constraints

### Min/Max Dates

```svelte
<script>
  import { Calendar } from "aether-ui";
  import { today, getLocalTimeZone } from "@internationalized/date";

  const now = today(getLocalTimeZone());
  const minDate = now;
  const maxDate = now.add({ months: 3 });
</script>

<Calendar minValue={minDate} maxValue={maxDate} />
```

### Disable Specific Dates

```svelte
<script>
  import { Calendar } from "aether-ui";
  import { isWeekend } from "@internationalized/date";

  // Disable weekends
  const isDateDisabled = (date) => isWeekend(date, "en-US");
</script>

<Calendar {isDateDisabled} />
```

### Unavailable Dates

```svelte
<script>
  import { Calendar } from "aether-ui";

  // Mark certain dates as unavailable (shown with strikethrough)
  const bookedDates = [5, 10, 15, 20];
  const isDateUnavailable = (date) => bookedDates.includes(date.day);
</script>

<Calendar {isDateUnavailable} />
```

## Custom Day Rendering

Use the `day` snippet to customize how each day cell is rendered.

```svelte
<script>
  import { Calendar } from "aether-ui";
  import * as CalendarPrimitives from "aether-ui";

  const events = {
    5: "Meeting",
    12: "Birthday",
    20: "Deadline"
  };
</script>

<Calendar>
  {#snippet day({ day, outsideMonth })}
    <CalendarPrimitives.Day>
      <span>{day.day}</span>
      {#if events[day.day] && !outsideMonth}
        <span class="text-[10px] text-primary">*</span>
      {/if}
    </CalendarPrimitives.Day>
  {/snippet}
</Calendar>
```

## Custom Year Range

Provide a specific range of years for the dropdown.

```svelte
<script>
  import { Calendar } from "aether-ui";

  // Generate years from 2020 to 2030
  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: String(2020 + i)
  }));
</script>

<Calendar captionLayout="dropdown" {years} />
```

## Locale Support

```svelte
<Calendar locale="es-ES" />
<Calendar locale="fr-FR" />
<Calendar locale="de-DE" />
<Calendar locale="ja-JP" />
```

## Week Starts On

```svelte
<!-- Week starts on Monday -->
<Calendar weekStartsOn={1} />

<!-- Week starts on Saturday -->
<Calendar weekStartsOn={6} />
```

## Working with Dates

The Calendar uses `@internationalized/date` for date handling:

```svelte
<script>
  import { Calendar } from "aether-ui";
  import {
    CalendarDate,
    today,
    getLocalTimeZone,
    parseDate
  } from "@internationalized/date";

  let value = $state();

  // Today's date
  value = today(getLocalTimeZone());

  // Specific date
  value = new CalendarDate(2024, 12, 25);

  // Parse from string
  value = parseDate("2024-06-15");

  // Convert to JavaScript Date
  const jsDate = value?.toDate(getLocalTimeZone());
</script>

<Calendar bind:value={value} />
```

## Styling

The Calendar uses CSS variables for theming and sizing:

```css
/* Size variants use these CSS variables: */
.calendar {
  /* sm: */
  --cell-size: var(--spacing-7);  /* 1.75rem */
  --cell-text: 0.75rem;
  --head-text: 0.7rem;

  /* default: */
  --cell-size: var(--spacing-8);  /* 2rem */
  --cell-text: 0.875rem;
  --head-text: 0.8rem;

  /* lg: */
  --cell-size: var(--spacing-10); /* 2.5rem */
  --cell-text: 0.875rem;
  --head-text: 0.8rem;

  /* xl: */
  --cell-size: var(--spacing-12); /* 3rem */
  --cell-text: 1rem;
  --head-text: 0.875rem;

  /* full: */
  /* Cells are flex-based, expand to fill width */
  --cell-text: 0.875rem;
  --head-text: 0.875rem;
}
```

### Button Variants for Navigation

```svelte
<Calendar buttonVariant="default" />
<Calendar buttonVariant="outline" />
<Calendar buttonVariant="ghost" />
<Calendar buttonVariant="secondary" />
```

## Primitives

For advanced customization, use the Calendar primitives directly:

```svelte
<script>
  import * as CalendarPrimitives from "aether-ui";
</script>

<CalendarPrimitives.Calendar>
  <!-- Custom implementation -->
</CalendarPrimitives.Calendar>
```

Available primitives:
- `Calendar` - Root component
- `Months` - Container for months
- `Month` - Single month container
- `Header` - Month header
- `Caption` - Month/year caption
- `Nav` - Navigation container
- `PrevButton` - Previous month button
- `NextButton` - Next month button
- `Grid` - Calendar grid
- `GridHead` - Grid header (weekdays)
- `GridBody` - Grid body (dates)
- `GridRow` - Grid row
- `HeadCell` - Weekday header cell
- `Cell` - Date cell container
- `Day` - Day button
- `EventMarker` - Event marker (dots/badge)
- `MonthSelect` - Month dropdown
- `YearSelect` - Year dropdown

## Features

- Single date selection
- Multiple months display
- Dropdown navigation for month/year
- Custom day rendering with snippets
- Date constraints (min/max, disabled, unavailable)
- Locale support
- Week start customization
- Fixed weeks option
- Keyboard navigation
- Full accessibility support
- Dark mode support
- **Size variants** (sm, default, lg, xl)
- **Event markers** (dots for small sizes, badges for large sizes)

## Accessibility

- Full keyboard navigation (Arrow keys, Home, End, Page Up/Down)
- ARIA labels and roles
- Focus management
- Screen reader announcements for date changes

## Dependencies

- `bits-ui` - Headless UI primitives
- `@internationalized/date` - Date handling
- `@lucide/svelte` - Icons (for navigation buttons)
- Tailwind CSS - Styling
