# Date Picker Components

A comprehensive set of date picker components built with Calendar, RangeCalendar, and Popover components. Fully typed with TypeScript and styled with Tailwind CSS.

## Components

### DatePicker
A simple date picker for selecting a single date.

```svelte
<script>
  import { DatePicker } from "aether-ui";
  let date = $state();
</script>

<DatePicker bind:value={date} />
```

### DateRangePicker
A date range picker with two calendars for selecting start and end dates.

```svelte
<script>
  import { DateRangePicker } from "aether-ui";
  let range = $state();
</script>

<DateRangePicker bind:value={range} />
```

### DatePickerWithPresets
A date picker with quick preset options (Today, Tomorrow, In a week, etc.).

```svelte
<script>
  import { DatePickerWithPresets } from "aether-ui";
  let date = $state();
</script>

<DatePickerWithPresets bind:value={date} />
```

### DateRangePickerWithPresets
A date range picker with preset ranges (Last 7 days, Last 30 days, This month, etc.).

```svelte
<script>
  import { DateRangePickerWithPresets } from "aether-ui";
  let range = $state();
</script>

<DateRangePickerWithPresets bind:value={range} />
```

## Props

### Common Props (All Components)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateValue \| DateRange` | `undefined` | The selected date or range (bindable) |
| `placeholder` | `DateValue` | `undefined` | Placeholder date for the calendar (bindable) |
| `disabled` | `boolean` | `false` | Disable the date picker |
| `class` | `string` | `undefined` | Additional CSS classes for the container |
| `buttonVariant` | `ButtonVariant` | `"outline"` | Button style variant |
| `buttonClass` | `string` | `undefined` | Additional CSS classes for the button |
| `calendarProps` | `object` | `{}` | Props to pass to the underlying Calendar/RangeCalendar |
| `format` | `function` | Default formatter | Custom date formatting function |
| `error` | `boolean` | `false` | Error state with visual feedback |
| `onError` | `(error: boolean) => void` | `undefined` | Callback when error state changes |

### Preset Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `presets` | `Preset[]` | Default presets | Array of preset options |

## Button Variants

All date picker components support the following button variants:
- `default`
- `outline` (default)
- `ghost`
- `secondary`
- `destructive`
- `link`
- `bordered`
- `flat`

## Custom Format

You can customize how dates are displayed:

```svelte
<DatePicker 
  format={(date) => {
    if (!date) return "Select date";
    return date.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }}
/>
```

## Custom Presets

```svelte
<script>
  import { today, getLocalTimeZone } from "@internationalized/date";
  
  const customPresets = [
    { label: "Today", value: today(getLocalTimeZone()) },
    { label: "Next Week", value: today(getLocalTimeZone()).add({ weeks: 1 }) },
    { label: "Next Month", value: today(getLocalTimeZone()).add({ months: 1 }) },
  ];
</script>

<DatePickerWithPresets presets={customPresets} />
```

## Calendar Props

Pass additional props to the underlying calendar:

```svelte
<DatePicker 
  calendarProps={{ 
    captionLayout: "dropdown",
    weekdayFormat: "short",
    numberOfMonths: 1
  }} 
/>
```

## Working with Dates

The date picker uses `@internationalized/date` for date handling:

```svelte
<script>
  import { DatePicker } from "aether-ui";
  import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
  
  let date = $state();
  
  // Set initial value
  date = today(getLocalTimeZone());
  
  // Create specific date
  date = new CalendarDate(2024, 12, 25);
  
  // Get JavaScript Date
  const jsDate = date?.toDate(getLocalTimeZone());
</script>
```

## Examples

### Basic Usage
```svelte
<DatePicker bind:value={date} />
```

### With Initial Value
```svelte
<DatePicker value={today(getLocalTimeZone())} />
```

### Date Range
```svelte
<DateRangePicker bind:value={range} />
```

### With Presets
```svelte
<DatePickerWithPresets bind:value={date} />
```

### Custom Button Style
```svelte
<DatePicker buttonVariant="default" buttonClass="w-64" />
```

### Disabled
```svelte
<DatePicker disabled />
```

## Error States

### Basic Error State
```svelte
<script>
  let date = $state();
  let hasError = $derived(!date);
</script>

<DatePicker 
  bind:value={date}
  error={hasError}
/>
```

### With Field Component
```svelte
<script>
  import { Field } from "aether-ui";
  
  let startDate = $state();
</script>

<Field
  label="Start Date"
  description="Select the project start date"
  error={!startDate ? "Please select a start date" : undefined}
  required
>
  <DatePicker 
    bind:value={startDate}
    error={!startDate}
  />
</Field>
```

### Error Callback
```svelte
<script>
  function handleError(hasError: boolean) {
    console.log('Date picker error state:', hasError);
  }
</script>

<DatePicker 
  bind:value={date}
  error={!date}
  onError={handleError}
/>
```

## Features

- ✅ Single date selection
- ✅ Date range selection
- ✅ Preset options for quick selection
- ✅ Custom date formatting
- ✅ Multiple button variants
- ✅ Error handling with visual feedback
- ✅ Field component integration
- ✅ Disabled state
- ✅ Fully typed with TypeScript
- ✅ Accessible with keyboard navigation
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Customizable calendar props
- ✅ Bindable value and placeholder

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader friendly

## Dependencies

- `bits-ui` - Headless UI primitives
- `@internationalized/date` - Date handling
- `@lucide/svelte` - Icons
- Tailwind CSS - Styling

## Using DatePicker with Field Component

The Field component provides a consistent way to add labels, descriptions, and error handling to your DatePicker components.

### Basic Field Usage

```svelte
<script>
  import { DatePicker } from "aether-ui";
  import { Field } from "aether-ui";
  import type { DateValue } from "@internationalized/date";
  
  let birthdate = $state<DateValue | undefined>();
</script>

<Field
  label="Date of Birth"
  description="Select your birth date"
>
  <DatePicker bind:value={birthdate} />
</Field>
```

### With Validation

```svelte
<script>
  import { DatePicker } from "aether-ui";
  import { Field } from "aether-ui";
  import type { DateValue } from "@internationalized/date";
  
  let startDate = $state<DateValue | undefined>();
  let error = $derived(!startDate);
</script>

<Field
  label="Project Start Date"
  description="When will your project begin?"
  required
  error={error ? "Please select a start date" : undefined}
>
  <DatePicker 
    bind:value={startDate}
    error={error}
  />
</Field>
```

### Date Range with Field

```svelte
<script>
  import { DateRangePicker } from "aether-ui";
  import { Field } from "aether-ui";
  import type { DateRange } from "bits-ui";
  
  let dateRange = $state<DateRange | undefined>();
</script>

<Field
  label="Event Duration"
  description="Select the start and end dates for your event"
  required
>
  <DateRangePicker bind:value={dateRange} />
</Field>
```

### With Presets and Field

```svelte
<script>
  import { DatePickerWithPresets } from "aether-ui";
  import { Field } from "aether-ui";
  
  let appointmentDate = $state();
</script>

<Field
  label="Appointment Date"
  description="Choose a date or select from quick options"
>
  <DatePickerWithPresets bind:value={appointmentDate} />
</Field>
```

### Different Button Variants

```svelte
<Field
  label="Deadline"
  description="Project completion deadline"
>
  <DatePicker 
    bind:value={deadline}
    buttonVariant="outline"
    buttonClass="w-full"
  />
</Field>

<Field
  label="Meeting Date"
  description="Schedule your meeting"
>
  <DatePicker 
    bind:value={meetingDate}
    buttonVariant="ghost"
  />
</Field>
```

### Complete Booking Form

```svelte
<script>
  import { DatePicker, DateRangePicker } from "aether-ui";
  import { FieldPrimitives } from "aether-ui";
  import { Button } from "aether-ui";
  import type { DateValue, DateRange } from "@internationalized/date";
  
  let formData = $state({
    checkIn: undefined as DateValue | undefined,
    checkOut: undefined as DateRange | undefined,
    birthdate: undefined as DateValue | undefined,
  });
  
  let checkInError = $derived(!formData.checkIn ? "Check-in date is required" : undefined);
  let checkOutError = $derived(!formData.checkOut ? "Check-out date is required" : undefined);
  
  function handleSubmit() {
    if (!checkInError && !checkOutError) {
      console.log("Booking data:", formData);
    }
  }
</script>

<div class="w-full max-w-md">
  <FieldPrimitives.Set>
    <FieldPrimitives.Legend>Hotel Booking</FieldPrimitives.Legend>
    <FieldPrimitives.Description>Select your stay dates and personal information</FieldPrimitives.Description>
    
    <FieldPrimitives.Separator />
    
    <FieldPrimitives.Group class="gap-4">
      <Field
        label="Check-in Date"
        description="Select your arrival date"
        required
        error={checkInError}
      >
        <DatePicker 
          bind:value={formData.checkIn}
          error={!!checkInError}
          buttonVariant="outline"
          buttonClass="w-full"
        />
      </Field>
      
      <Field
        label="Stay Duration"
        description="Select check-in and check-out dates"
        required
        error={checkOutError}
      >
        <DateRangePicker 
          bind:value={formData.checkOut}
          error={!!checkOutError}
          buttonVariant="outline"
          buttonClass="w-full"
        />
      </Field>
      
      <Field
        label="Date of Birth"
        description="For age verification (optional)"
      >
        <DatePicker 
          bind:value={formData.birthdate}
          buttonVariant="ghost"
        />
      </Field>
    </FieldPrimitives.Group>
    
    <div class="flex gap-4 pt-4">
      <Button 
        onclick={handleSubmit} 
        disabled={!!checkInError || !!checkOutError}
      >
        Book Now
      </Button>
      <Button variant="outline" type="button">
        Clear Dates
      </Button>
    </div>
  </FieldPrimitives.Set>
</div>
```

### With Custom Presets

```svelte
<script>
  import { DateRangePickerWithPresets } from "aether-ui";
  import { Field } from "aether-ui";
  import { today, getLocalTimeZone } from "@internationalized/date";
  
  const customPresets = [
    {
      label: "Next 7 Days",
      value: {
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ days: 7 }),
      },
    },
    {
      label: "Next 30 Days",
      value: {
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ days: 30 }),
      },
    },
    {
      label: "Next Quarter",
      value: {
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ months: 3 }),
      },
    },
  ];
  
  let reportRange = $state();
</script>

<Field
  label="Report Period"
  description="Select the date range for your report"
  required
>
  <DateRangePickerWithPresets 
    bind:value={reportRange}
    presets={customPresets}
  />
</Field>
```
