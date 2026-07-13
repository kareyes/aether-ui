<script lang="ts">
	import { setContext } from "svelte";
	import type { Snippet } from "svelte";
	import {
		DateFormatter,
		getLocalTimeZone,
		isEqualMonth,
		isSameDay,
		today,
		type DateValue,
	} from "@internationalized/date";
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import * as Calendar from "./index.js";
	import { Card } from "$lib/components/ui/card/index.js";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import type { ButtonVariant } from "../button/button.svelte";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import {
		calendarVariants,
		type CalendarEvent,
		type CalendarSize,
	} from "./calendar.svelte";

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		style: styleProp,
		weekStartsOn = 0,
		weekdayFormat = "short",
		locale = "en-US",
		buttonVariant = "ghost",
		size = "default",
		fluid = false,
		events = [],
		fontSize,
		day,
		headerAction,
		...restProps
	}: WithoutChildrenOrChild<CalendarPrimitive.RootProps> & {
		buttonVariant?: ButtonVariant;
		size?: CalendarSize;
		/**
		 * Stretch to fill the container width, distributing the seven day
		 * columns evenly (instead of the default `w-fit` compact width). Handy
		 * inside a full-width card or mobile layout.
		 */
		fluid?: boolean;
		events?: CalendarEvent[];
		/**
		 * Overrides the calendar's text size — any CSS `font-size` value
		 * (e.g. `"0.75rem"`, `"14px"`, `"1rem"`). Drives the day numbers,
		 * weekday headers and the week range label together. When omitted,
		 * the text scales with the `size` variant.
		 */
		fontSize?: string;
		day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
		/**
		 * Trailing content for the header row, rendered after the next-week
		 * button (e.g. a "Today" jump). Receives the visible week so the caller
		 * can act on it; `goToWeek` re-anchors the strip on any date.
		 */
		headerAction?: Snippet<
			[{ week: DateValue[]; goToWeek: (date: DateValue) => void }]
		>;
	} = $props();

	const timeZone = getLocalTimeZone();
	const isFullSize = $derived(size === "full");

	// `fluid` stretches each cell across its share of the row, but the day
	// button keeps its fixed `--cell-size`. The cell is not a flex container,
	// and the button is block-level, so `text-center` (which centers the
	// weekday headers) can't center it — it hugs the left edge and the numbers
	// drift out of line with their headers. Make the cell center its own child.
	// Full size opts out: its days deliberately fill the cell and align left.
	const cellClass = $derived(
		fluid
			? isFullSize
				? "flex-1"
				: "flex flex-1 items-center justify-center"
			: undefined,
	);

	// `fontSize` overrides the size variant's `--cell-text` / `--head-text`
	// tokens (weekday headers read `--head-text` directly; the day-number span
	// is nudged onto `--cell-text` via a scoped utility on the root). Merge with
	// any caller-supplied `style` so both survive.
	const rootStyle = $derived(
		[
			fontSize && `--cell-text:${fontSize};--head-text:${fontSize};`,
			styleProp,
		]
			.filter(Boolean)
			.join(" ") || undefined,
	);

	// The visible week is the one containing the placeholder (bits-ui's source
	// of truth for the displayed range). Fall back to value, then today for the
	// transient first paint before `bind:placeholder` is populated.
	const anchor = $derived(
		(placeholder ?? value ?? today(timeZone)) as DateValue,
	);

	// Expose size + events to the shared Day/Cell sub-components via context, so
	// event markers and size-aware styling work exactly like the month Calendar.
	const eventsByDate = $derived.by(() => {
		const map = new Map<string, CalendarEvent[]>();
		for (const event of events) {
			const existing = map.get(event.date) ?? [];
			existing.push(event);
			map.set(event.date, existing);
		}
		return map;
	});
	setContext("calendar-size", () => size);
	setContext("calendar-events", () => eventsByDate);

	// Pull the single week (7 dates) that contains the anchor out of the month
	// grid bits-ui already computed for us.
	function weekContaining(
		months: { value: DateValue; weeks: DateValue[][] }[],
		target: DateValue,
	): DateValue[] {
		for (const month of months) {
			for (const week of month.weeks) {
				if (week.some((date) => isSameDay(date, target))) return week;
			}
		}
		return months[0]?.weeks[0] ?? [];
	}

	function goToPreviousWeek(week: DateValue[]) {
		if (week.length > 0) placeholder = week[0].subtract({ weeks: 1 });
	}

	function goToNextWeek(week: DateValue[]) {
		if (week.length > 0) placeholder = week[0].add({ weeks: 1 });
	}

	/** Re-anchor the strip on the week containing `date`. */
	function goToWeek(date: DateValue) {
		placeholder = date;
	}

	function formatDate(
		date: DateValue,
		opts: Intl.DateTimeFormatOptions,
	): string {
		return new DateFormatter(locale, opts).format(date.toDate(timeZone));
	}

	// e.g. "May 19 – May 25, 2024" (same year) / "Dec 30, 2024 – Jan 5, 2025".
	function rangeLabel(week: DateValue[]): string {
		if (week.length === 0) return "";
		const start = week[0];
		const end = week[week.length - 1];
		if (start.year === end.year) {
			const from = formatDate(start, { month: "short", day: "numeric" });
			const to = formatDate(end, { month: "short", day: "numeric" });
			const year = formatDate(start, { year: "numeric" });
			return `${from} – ${to}, ${year}`;
		}
		const from = formatDate(start, {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
		const to = formatDate(end, {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
		return `${from} – ${to}`;
	}
</script>

<!--
Discriminated Unions + Destructuring (required for bindable) do not get along,
so we cast `value` to `never` to quiet TypeScript — same trick as `Calendar`.
-->
<CalendarPrimitive.Root
	bind:value={value as never}
	bind:ref
	bind:placeholder
	{weekStartsOn}
	weekdayFormat={isFullSize ? "long" : weekdayFormat}
	{locale}
	style={rootStyle}
	class={cn(
		calendarVariants({ size }),
		isFullSize || fluid ? "w-full" : "w-fit",
		// When a custom fontSize is set, make the day-number span honor
		// `--cell-text` (it otherwise hardcodes text-xs/sm).
		fontSize &&
			"[&_[data-bits-day]>span:first-child]:text-[length:var(--cell-text)]",
		className,
	)}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		{@const week = weekContaining(months, anchor)}
		{@const referenceMonth = months[0]?.value ?? anchor}
		<!-- Header: prev/next week navigation + week range label -->
		<Calendar.Header class="w-full justify-between">
			<button
				type="button"
				aria-label="Previous week"
				onclick={() => goToPreviousWeek(week)}
				class={cn(
					buttonVariants({ variant: buttonVariant }),
					"size-(--cell-size) select-none bg-transparent p-0 rtl:rotate-180",
				)}
			>
				<ChevronLeftIcon class="size-4" />
			</button>

			<div
				aria-live="polite"
				style={fontSize ? `font-size:${fontSize}` : undefined}
			>
				{rangeLabel(week)}
			</div>

			<button
				type="button"
				aria-label="Next week"
				onclick={() => goToNextWeek(week)}
				class={cn(
					buttonVariants({ variant: buttonVariant }),
					"size-(--cell-size) select-none bg-transparent p-0 rtl:rotate-180",
				)}
			>
				<ChevronRightIcon class="size-4" />
			</button>

			{#if headerAction}
				{@render headerAction({ week, goToWeek })}
			{/if}
		</Calendar.Header>

		<Card class="mt-2 ">
			<Calendar.Grid class="mt-0">
				<Calendar.GridHead>
					<Calendar.GridRow class={cn("select-none", fluid && "w-full")}>
						{#each weekdays as weekday (weekday)}
							<Calendar.HeadCell
								class={fluid ? "flex-1 text-center" : undefined}
							>
								{#if isFullSize}
									<span class="hidden md:inline">{weekday}</span
									>
									<span class="md:hidden"
										>{weekday.slice(0, 2)}</span
									>
								{:else}
									{weekday.slice(0, 2)}
								{/if}
							</Calendar.HeadCell>
						{/each}
					</Calendar.GridRow>
				</Calendar.GridHead>
				<Calendar.GridBody>
					<Calendar.GridRow
						class={isFullSize ? "w-full" : "mt-2 w-full"}
					>
						{#each week as date (date)}
							<Calendar.Cell
								{date}
								month={referenceMonth}
								class={cellClass}
							>
								{#if day}
									{@render day({
										day: date,
										outsideMonth: !isEqualMonth(
											date,
											referenceMonth,
										),
									})}
								{:else}
									<Calendar.Day {date} />
								{/if}
							</Calendar.Cell>
						{/each}
					</Calendar.GridRow>
				</Calendar.GridBody>
			</Calendar.Grid>
		</Card>
	{/snippet}
</CalendarPrimitive.Root>
