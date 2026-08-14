<script lang="ts">
	/**
	 * The hour / minute / AM-PM columns beside the date-time picker's calendar.
	 *
	 * Split out of `date-time-picker.svelte`, which owns the value, the calendar
	 * and what "Done" commits. This owns only the reading and writing of a
	 * time-of-day: it derives what is selected from whatever `current` it is
	 * handed and reports picks back through `onSelect`, never touching a value
	 * itself. That keeps the two questions apart — which instant is being edited,
	 * and which clock entry is highlighted.
	 */

	import type { CalendarDateTime } from "@internationalized/date";
	import { cn } from "$lib/utils.js";

	type Period = "AM" | "PM";

	type Props = {
		/** The time being shown — the picker's `value ?? placeholder`. */
		current: CalendarDateTime | undefined;
		/** 12-hour (AM/PM) or 24-hour hour column. */
		hourCycle: 12 | 24;
		/** Increment between entries in the minute column. */
		minuteStep: number;
		disabled: boolean;
		/**
		 * Whether the popover is open. Recentres the columns on the transition, so
		 * the reader isn't dropped at the top of an unrelated part of the list.
		 */
		open: boolean;
		/** A pick, in the same shape `CalendarDateTime.set` takes. */
		onSelect: (fields: { hour?: number; minute?: number }) => void;
	};
	let {
		current,
		hourCycle,
		minuteStep,
		disabled,
		open,
		onSelect,
	}: Props = $props();

	const currentHour24 = $derived(current?.hour ?? 0);
	const currentMinute = $derived(current?.minute ?? 0);
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

	const itemClass = cn(
		"mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm tabular-nums",
		"hover:bg-accent hover:text-accent-foreground",
		"data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:hover:bg-primary/90",
	);
</script>

<!--
	The columns scroll *within* the calendar's height rather than growing the
	popover. `overflow-y-auto` only scrolls against a definite height, and a plain
	flex sibling has none — it just stretches to its content, so a 60-entry minute
	column (minuteStep={1}) would run off the popover. Stretching this wrapper to
	the flex line (i.e. the calendar) and absolutely filling it gives the columns
	that definite height. The wrapper carries an explicit width because absolute
	children contribute none: 3 × w-14 columns with AM/PM, 2 without.
-->
<div class={cn("relative border-l border-border", hourCycle === 12 ? "w-42" : "w-28")}>
	<div class="absolute inset-0 flex divide-x divide-border">
		<div
			bind:this={hourListEl}
			role="group"
			aria-label="Hour"
			class="flex min-h-0 w-14 flex-col gap-1 overflow-y-auto p-2"
		>
			{#each hours as h (h)}
				{@const selected = (hourCycle === 24 ? currentHour24 : currentHour12) === h}
				<button
					type="button"
					aria-pressed={selected}
					data-selected={selected ? "true" : undefined}
					class={itemClass}
					{disabled}
					onclick={() =>
						onSelect({
							hour: hourCycle === 24 ? h : to24Hour(h, currentPeriod),
						})}
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
					class={itemClass}
					{disabled}
					onclick={() => onSelect({ minute: m })}
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
						class={cn(itemClass, "w-10")}
						{disabled}
						onclick={() => onSelect({ hour: to24Hour(currentHour12, p) })}
					>
						{p}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
