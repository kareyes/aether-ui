<script lang="ts">
	import { cn } from "$lib/utils.js";
	import {
		timePickerVariants,
		type TimePickerSize,
		type TimePickerVariant,
	} from "./time-picker-variants.js";
	import {
		buildHourOptions,
		buildStepOptions,
		hourSpan,
		isSpanDisabled,
		minuteSpan,
		pad,
		periodOf,
		periodSpan,
		secondSpan,
		to12Hour,
		to24Hour,
		type Period,
		type TimeGranularity,
		type TimeParts,
		type TimeRangeBounds,
	} from "./time-picker-utils.js";

	type Props = {
		/** The time the columns highlight. */
		parts: TimeParts;
		bounds: TimeRangeBounds;
		hourCycle: 12 | 24;
		granularity: TimeGranularity;
		/** Already normalized by the caller — see `normalizeStep`. */
		minuteStep: number;
		secondStep: number;
		disabled?: boolean;
		readonly?: boolean;
		/** Each column re-centres its selection when this flips true. */
		open: boolean;
		variant?: TimePickerVariant;
		size?: TimePickerSize;
		/**
		 * Receives whole 24-hour fields: the 12-hour conversion (and the AM/PM
		 * column's own arithmetic) is done here, so the caller only ever writes a
		 * `TimeParts` patch.
		 */
		onSelect: (fields: Partial<TimeParts>) => void;
	};
	let {
		parts,
		bounds,
		hourCycle,
		granularity,
		minuteStep,
		secondStep,
		disabled = false,
		readonly = false,
		open,
		variant = "default",
		size = "default",
		onSelect,
	}: Props = $props();

	const styles = $derived(timePickerVariants({ variant, size }));

	const hours = $derived(buildHourOptions(hourCycle));
	const minutes = $derived(buildStepOptions(minuteStep));
	const seconds = $derived(buildStepOptions(secondStep));

	const selectedHour = $derived(
		hourCycle === 24 ? parts.hour : to12Hour(parts.hour),
	);
	const currentPeriod = $derived(periodOf(parts.hour));

	const selectHour = (hour: number): void => {
		onSelect({ hour: hourCycle === 24 ? hour : to24Hour(hour, currentPeriod) });
	};

	const selectPeriod = (period: Period): void => {
		onSelect({ hour: to24Hour(to12Hour(parts.hour), period) });
	};

	// Bring each column's selection into view when the dropdown opens, so the
	// user isn't dropped at the top of an unrelated part of the list.
	let hourListEl = $state<HTMLDivElement | null>(null);
	let minuteListEl = $state<HTMLDivElement | null>(null);
	let secondListEl = $state<HTMLDivElement | null>(null);
	let periodListEl = $state<HTMLDivElement | null>(null);

	// Scrolls the column itself rather than calling scrollIntoView, which walks
	// up and scrolls every scrollable ancestor — including the page — to reveal
	// the item.
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
			centerSelected(secondListEl);
			centerSelected(periodListEl);
		});
	});
</script>

<!--
	Columns scroll within a fixed height rather than growing the popover:
	`overflow-y-auto` only scrolls against a definite height, and a 60-entry
	minute column (minuteStep={1}) would otherwise run off the screen.
-->
<div class="flex h-56 divide-x divide-border">
	<div
		bind:this={hourListEl}
		role="group"
		aria-label="Hour"
		class={cn(styles.column())}
	>
		<div class={cn(styles.columnHeader())}>Hr</div>
		{#each hours as hour (hour)}
			{@const hour24 = hourCycle === 24 ? hour : to24Hour(hour, currentPeriod)}
			{@const selected = selectedHour === hour}
			<button
				type="button"
				aria-pressed={selected}
				data-selected={selected ? "true" : undefined}
				class={cn(styles.columnItem())}
				disabled={disabled || readonly || isSpanDisabled(hourSpan(hour24), bounds)}
				onclick={() => selectHour(hour)}
			>
				{hourCycle === 24 ? pad(hour) : hour}
			</button>
		{/each}
	</div>

	{#if granularity !== "hour"}
		<div
			bind:this={minuteListEl}
			role="group"
			aria-label="Minute"
			class={cn(styles.column())}
		>
			<div class={cn(styles.columnHeader())}>Min</div>
			{#each minutes as minute (minute)}
				{@const selected = parts.minute === minute}
				<button
					type="button"
					aria-pressed={selected}
					data-selected={selected ? "true" : undefined}
					class={cn(styles.columnItem())}
					disabled={disabled ||
						readonly ||
						isSpanDisabled(minuteSpan(parts.hour, minute), bounds)}
					onclick={() => onSelect({ minute })}
				>
					{pad(minute)}
				</button>
			{/each}
		</div>
	{/if}

	{#if granularity === "second"}
		<div
			bind:this={secondListEl}
			role="group"
			aria-label="Second"
			class={cn(styles.column())}
		>
			<div class={cn(styles.columnHeader())}>Sec</div>
			{#each seconds as second (second)}
				{@const selected = parts.second === second}
				<button
					type="button"
					aria-pressed={selected}
					data-selected={selected ? "true" : undefined}
					class={cn(styles.columnItem())}
					disabled={disabled ||
						readonly ||
						isSpanDisabled(
							secondSpan(parts.hour, parts.minute, second),
							bounds,
						)}
					onclick={() => onSelect({ second })}
				>
					{pad(second)}
				</button>
			{/each}
		</div>
	{/if}

	{#if hourCycle === 12}
		<div
			bind:this={periodListEl}
			role="group"
			aria-label="AM or PM"
			class={cn(styles.column())}
		>
			<div class={cn(styles.columnHeader())}>&nbsp;</div>
			{#each ["AM", "PM"] as const as period (period)}
				{@const selected = currentPeriod === period}
				<button
					type="button"
					aria-pressed={selected}
					data-selected={selected ? "true" : undefined}
					class={cn(styles.columnItem())}
					disabled={disabled ||
						readonly ||
						isSpanDisabled(periodSpan(period), bounds)}
					onclick={() => selectPeriod(period)}
				>
					{period}
				</button>
			{/each}
		</div>
	{/if}
</div>
