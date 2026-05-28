<script lang="ts">
    import { Calendar as CalendarIcon } from "@lucide/svelte";
    import { getLocalTimeZone } from "@internationalized/date";
    import type { DateRange } from "bits-ui";
    import { cn } from "$lib/utils.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import type { DatePickerProps } from ".";

    type Props = DatePickerProps & {
        value?: DateRange;
        format?: (range: DateRange | undefined) => string;
        onValueChange?: (value: DateRange | undefined) => void;
    };

    function defaultFormat(range: DateRange | undefined): string {
        if (!range?.start?.toDate) return "Pick a date range";
        
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric"
        };
        
        try {
            const start = range.start.toDate(getLocalTimeZone()).toLocaleDateString("en-US", options);
            const end = range.end?.toDate(getLocalTimeZone()).toLocaleDateString("en-US", options);
            return end ? `${start} - ${end}` : start;
        } catch {
            return "Pick a date range";
        }
    }

    let {
        value = $bindable(),
        placeholder = $bindable(),
        disabled = false,
        class: className,
        buttonVariant = "outline",
        buttonClass,
        calendarProps = {},
        format = defaultFormat,
        error = false,
        onError,
        onValueChange,
        ...restProps
    }: Props = $props();
    

    let open = $state(false);

    // Track error state and notify parent
    $effect(() => {
        if (onError) {
            onError(error);
        }
    });

    // Notify parent of value changes
    $effect(() => {
        if (onValueChange) {
            onValueChange(value);
        }
    });

    $effect(() => {
        if (value?.start && !placeholder) placeholder = value.start;
        if (value?.start && value?.end) open = false;
    });
</script>

<div class={cn("grid gap-2", className)} {...restProps}>
    <Popover.Root bind:open>
        <Popover.Trigger>
            {#snippet child({ props })}
                <Button
                    {...props}
                    variant={buttonVariant}
                    class={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        error && "border-destructive ring-destructive/20 ring-[3px]",
                        buttonClass
                    )}
                    aria-invalid={error}
                    {disabled}
                >
                    <CalendarIcon class="mr-2 size-4" />
                    {format(value)}
                </Button>
            {/snippet}
        </Popover.Trigger>
        <Popover.Content class="w-auto p-0" align="start">
            <RangeCalendar
                bind:value
                bind:placeholder
                numberOfMonths={2}
                {...calendarProps}
            />
        </Popover.Content>
    </Popover.Root>
</div>
