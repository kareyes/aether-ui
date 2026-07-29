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
	import { dialogPopover } from "./dialog-popover.svelte.js";
	import { untrack } from "svelte";
	import type { ComponentProps } from "svelte";

	type Period = "AM" | "PM";

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

	const currentSource = $derived(value ?? placeholder);
	const currentHour24 = $derived(currentSource?.hour ?? 0);
	const currentMinute = $derived(currentSource?.minute ?? 0);
	const currentPeriod: Period = $derived(currentHour24 < 12 ? "AM" : "PM");
	const currentHour12 = $derived.by(() => {
		const h = currentHour24 % 12;
		return h === 0 ? 12 : h;
	});

	const hours = $derived(
		hourCycle === 24
			? Array.from({ length: 24 }, (_, i) => i)
			: Array.from({ length: 12 }, (_, i) => i + 1),
	);
	const minutes = $derived(
		Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep),
	);

	function to24Hour(hour12: number, period: Period): number {
		const base = hour12 % 12;
		return period === "PM" ? base + 12 : base;
	}

	function applyTime(fields: { hour?: number; minute?: number }): void {
		if (value) {
			value = value.set(fields);
		} else if (placeholder) {
			placeholder = placeholder.set(fields);
		}
	}

	function selectHour24(hour: number): void {
		applyTime({ hour });
	}

	function selectHour12(hour12: number): void {
		applyTime({ hour: to24Hour(hour12, currentPeriod) });
	}

	function selectPeriod(period: Period): void {
		applyTime({ hour: to24Hour(currentHour12, period) });
	}

	function selectMinute(minute: number): void {
		applyTime({ minute });
	}

	// Bring the currently-selected hour/minute/period into view whenever the
	// popover opens, so the user isn't dropped at the top of an unrelated part
	// of the list.
	let hourListEl = $state<HTMLDivElement | null>(null);
	let minuteListEl = $state<HTMLDivElement | null>(null);
	let periodListEl = $state<HTMLDivElement | null>(null);

	// Scroll the column itself rather than calling scrollIntoView, which walks up
	// and scrolls every scrollable ancestor — including the page — to reveal the
	// item.
	function centerSelected(el: HTMLDivElement | null): void {
		const target = el?.querySelector<HTMLElement>('[data-selected="true"]');
		if (!el || !target) return;
		const list = el.getBoundingClientRect();
		const item = target.getBoundingClientRect();
		el.scrollTop += item.top - list.top - (list.height - item.height) / 2;
	}

	$effect(() => {
		if (!open) return;
		requestAnimationFrame(() => {
			centerSelected(hourListEl);
			centerSelected(minuteListEl);
			centerSelected(periodListEl);
		});
	});

	const timeColumnItemClass = cn(
		"mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm tabular-nums",
		"hover:bg-accent hover:text-accent-foreground",
		"data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:hover:bg-primary/90",
	);
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
				<!--
					The columns scroll *within* the calendar's height rather than growing
					the popover. `overflow-y-auto` only scrolls against a definite height,
					and a plain flex sibling has none — it just stretches to its content,
					so a 60-entry minute column (minuteStep={1}) would run off the popover.
					Stretching this wrapper to the flex line (i.e. the calendar) and
					absolutely filling it gives the columns that definite height.
					The wrapper carries an explicit width because absolute children
					contribute none: 3 × w-14 columns with AM/PM, 2 without.
				-->
				<div
					class={cn(
						"relative border-l border-border",
						hourCycle === 12 ? "w-42" : "w-28",
					)}
				>
					<div class="absolute inset-0 flex divide-x divide-border">
						<div
							bind:this={hourListEl}
							role="group"
							aria-label="Hour"
							class="flex min-h-0 w-14 flex-col gap-1 overflow-y-auto p-2"
						>
							{#each hours as h (h)}
								{@const selected =
									(hourCycle === 24 ? currentHour24 : currentHour12) === h}
								<button
									type="button"
									aria-pressed={selected}
									data-selected={selected ? "true" : undefined}
									class={timeColumnItemClass}
									{disabled}
									onclick={() =>
										hourCycle === 24 ? selectHour24(h) : selectHour12(h)}
								>
									{h}
								</button>
							{/each}
						</div>
						<div
							bind:this={minuteListEl}
							role="group"
							aria-label="Minute"
							class="flex min-h-0 w-14 flex-col gap-1 overflow-y-auto p-2"
						>
							{#each minutes as m (m)}
								{@const selected = currentMinute === m}
								<button
									type="button"
									aria-pressed={selected}
									data-selected={selected ? "true" : undefined}
									class={timeColumnItemClass}
									{disabled}
									onclick={() => selectMinute(m)}
								>
									{String(m).padStart(2, "0")}
								</button>
							{/each}
						</div>
						{#if hourCycle === 12}
							<div
								bind:this={periodListEl}
								role="group"
								aria-label="AM or PM"
								class="flex min-h-0 w-14 flex-col gap-1 overflow-y-auto p-2"
							>
								{#each ["AM", "PM"] as const as p (p)}
									{@const selected = currentPeriod === p}
									<button
										type="button"
										aria-pressed={selected}
										data-selected={selected ? "true" : undefined}
										class={cn(timeColumnItemClass, "w-10")}
										{disabled}
										onclick={() => selectPeriod(p)}
									>
										{p}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
			<div class="flex justify-end border-t border-border p-3">
				<Button
					size="sm"
					variant="outline"
					{disabled}
					onclick={() => (open = false)}
				>
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
