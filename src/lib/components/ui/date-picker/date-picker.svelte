<script lang="ts">
    import { Calendar as CalendarIcon } from "@lucide/svelte";
    import { type DateValue, getLocalTimeZone } from "@internationalized/date";
    import { cn } from "$lib/utils.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Calendar } from "$lib/components/ui/calendar/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import type { DatePickerProps } from ".";
    import { dialogPopover } from "./dialog-popover.svelte.js";
    import type { ComponentProps } from "svelte";

    type Props = DatePickerProps & {
        value?: DateValue;
        format?: (date: DateValue | undefined) => string;
        onValueChange?: (value: DateValue | undefined) => void;
    };

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
        name,
        ...restProps
    }: Props = $props();

    let dropdown = $state<ComponentProps<typeof Calendar>["captionLayout"]>("dropdown");

    let open = $state(false);

    // Renders correctly inside a native <dialog>; see dialogPopover's docs.
    let rootEl = $state<HTMLDivElement | null>(null);
    const dialogPop = dialogPopover(() => rootEl);

    function defaultFormat(date: DateValue | undefined): string {
        if (!date?.toDate) return "Pick a date";
        
        try {
            return date.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        } catch {
            return "Pick a date";
        }
    }

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
        if (value && !placeholder) placeholder = value;
        if (value) open = false;
    });
</script>

<div bind:this={rootEl} class={cn("grid gap-2", className)} {...restProps}>
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
        <Popover.Content
            class="w-auto p-0"
            align="start"
            portalProps={dialogPop.portalProps}
            strategy={dialogPop.strategy}
        >
            <Calendar
                type="single"
                bind:value
                bind:placeholder
                initialFocus
                captionLayout={dropdown}
                {...calendarProps}
            />
        </Popover.Content>
    </Popover.Root>
    <!--
        The trigger is a button, not a form control, so the selected date is not
        submitted on its own. When a `name` is given, mirror the value into a
        hidden input (ISO `YYYY-MM-DD` via DateValue.toString()) so the picker
        participates in native form / SvelteKit `enhance` submissions.
    -->
    {#if name}
        <input type="hidden" {name} value={value ? value.toString() : ""} />
    {/if}
</div>
