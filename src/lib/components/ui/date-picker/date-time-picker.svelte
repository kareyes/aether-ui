<script lang="ts">
	import { Calendar as CalendarIcon } from "@lucide/svelte";
	import {
		CalendarDateTime,
		getLocalTimeZone,
		now,
		toCalendarDateTime,
		today,
	} from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import type { DatePickerProps } from ".";
	import { commitDateTime } from "./date-time-commit.js";
	import DateTimeColumns from "./date-time-columns.svelte";
	import { dialogPopover } from "./dialog-popover.svelte.js";
	import { untrack } from "svelte";
	import type { ComponentProps } from "svelte";

	type Props = DatePickerProps & {
		value?: CalendarDateTime;
		placeholder?: CalendarDateTime;
		/** 12-hour (AM/PM) or 24-hour hour column and trigger label. Defaults to 12. */
		hourCycle?: 12 | 24;
		/** Increment between entries in the minute column. Defaults to 5. */
		minuteStep?: number;
		/**
		 * Seed an unset `value` with the current date + time on mount, so closing
		 * the popover with "Done" always yields a value instead of `undefined`.
		 * Defaults to true.
		 *
		 * Pass `false` where an empty picker is meaningful — e.g. a partial-update
		 * form whose contract is "leave blank to keep the existing value", which a
		 * seeded default would silently turn into an overwrite.
		 */
		defaultToNow?: boolean;
		format?: (date: CalendarDateTime | undefined) => string;
		onValueChange?: (value: CalendarDateTime | undefined) => void;
		/**
		 * Forwarded to the popover's portal. Leave unset to get the default
		 * behaviour, which auto-targets an ancestor `<dialog>` when there is one.
		 */
		portalProps?: ComponentProps<typeof Popover.Content>["portalProps"];
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
		hourCycle = 12,
		minuteStep = 5,
		defaultToNow = true,
		error = false,
		onError,
		onValueChange,
		name,
		portalProps,
		...restProps
	}: Props = $props();

	/**
	 * The current time snapped down onto the minute column's grid — an unsnapped
	 * seed (10:03 with minuteStep 5) would have no matching entry to highlight,
	 * so the column would open with nothing selected.
	 */
	function nowOnGrid(): CalendarDateTime {
		const current = toCalendarDateTime(now(getLocalTimeZone()));
		return current.set({
			minute: Math.floor(current.minute / minuteStep) * minuteStep,
			second: 0,
			millisecond: 0,
		});
	}

	// Seed once during init rather than in an $effect, so the parent's bound state
	// receives the default immediately and a later clear (value = undefined) isn't
	// fought by a re-run. untrack states that the one-shot read is deliberate.
	untrack(() => {
		if (defaultToNow && !value) value = nowOnGrid();
	});

	let dropdown = $state<ComponentProps<typeof Calendar>["captionLayout"]>("dropdown");

	let open = $state(false);

	// Renders correctly inside a native <dialog>; see dialogPopover's docs.
	let rootEl = $state<HTMLDivElement | null>(null);
	const dialogPop = dialogPopover(() => rootEl);
	const resolvedPortalProps = $derived(portalProps ?? dialogPop.portalProps);

	function defaultFormat(date: CalendarDateTime | undefined): string {
		if (!date?.toDate) return "Pick a date and time";

		try {
			return date.toDate(getLocalTimeZone()).toLocaleString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
				hour12: hourCycle === 12,
			});
		} catch {
			return "Pick a date and time";
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

	// The Calendar needs a placeholder to seed its displayed month, and bits-ui
	// derives each grid day's type from the placeholder's type. Defaulting it
	// to a CalendarDateTime here (instead of letting bits-ui fall back to a
	// plain CalendarDate) keeps every clicked day time-aware from the very
	// first selection, so bits-ui's own time-preserving merge can carry the
	// chosen time-of-day across subsequent date changes.
	$effect(() => {
		if (value && !placeholder) placeholder = value;
		if (!placeholder) placeholder = toCalendarDateTime(today(getLocalTimeZone()));
	});

	/** What the columns highlight: the picked value, or the placeholder's time. */
	const currentSource = $derived(value ?? placeholder);

	/**
	 * Whether a time column has been used while no day was ever clicked. With no
	 * `value` the columns write into `placeholder` (see `applyTime`), which the
	 * calendar owns and nothing submits — so without this the popover closes on
	 * `undefined` and the time the user just picked is silently dropped. "Done"
	 * commits it against today; see `confirm`.
	 *
	 * It must stay an *interaction* flag rather than "is there a placeholder":
	 * under `defaultToNow={false}` the empty picker means "keep the existing
	 * value", and seeding on a popover that was merely opened and closed would
	 * turn every visit into an overwrite.
	 */
	let timeTouched = $state(false);

	function applyTime(fields: { hour?: number; minute?: number }): void {
		if (value) {
			value = value.set(fields);
		} else if (placeholder) {
			timeTouched = true;
			placeholder = placeholder.set(fields);
		}
	}

	/**
	 * Close, committing a time picked against no date. The rule itself lives in
	 * the pure {@link commitDateTime} — it is the one piece of this component with
	 * a wrong answer in both directions (a dropped selection, or an overwrite of a
	 * value nobody touched), so it is tested rather than trusted.
	 */
	function confirm(): void {
		value = commitDateTime({
			value,
			placeholder,
			timeTouched,
			today: today(getLocalTimeZone()),
		});
		timeTouched = false;
		open = false;
	}
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
						buttonClass,
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
			portalProps={resolvedPortalProps}
			strategy={dialogPop.strategy}
		>
			<div class="flex">
				<Calendar
					type="single"
					bind:value
					bind:placeholder
					initialFocus
					captionLayout={dropdown}
					{...calendarProps}
				/>
				<DateTimeColumns
					current={currentSource}
					{hourCycle}
					{minuteStep}
					{disabled}
					{open}
					onSelect={applyTime}
				/>
			</div>
			<div class="flex justify-end border-t border-border p-3">
				<Button size="sm" variant="outline" {disabled} onclick={confirm}>
					Done
				</Button>
			</div>
		</Popover.Content>
	</Popover.Root>
	<!--
		The trigger is a button, not a form control, so the selected date/time is
		not submitted on its own. When a `name` is given, mirror the value into a
		hidden input (ISO `YYYY-MM-DDTHH:mm:ss` via DateValue.toString()) so the
		picker participates in native form / SvelteKit `enhance` submissions.
	-->
	{#if name}
		<input type="hidden" {name} value={value ? value.toString() : ""} />
	{/if}
</div>
