<script lang="ts">
	import { ArrowRight } from "@lucide/svelte";
	import { type DateValue, getLocalTimeZone } from "@internationalized/date";
	import type { DateRange } from "bits-ui";
	import { cn, rangeFieldNames } from "$lib/utils.js";
	import type { DatePickerProps } from ".";
	import Endpoint from "./date-range-picker-endpoint.svelte";

	type Props = DatePickerProps & {
		value?: DateRange;
		/** Label for the start (left) field. Defaults to "From". */
		fromLabel?: string;
		/** Label for the end (right) field. Defaults to "To". */
		toLabel?: string;
		/**
		 * Layout style. `"default"` renders the two fields inline; `"card"`
		 * wraps them in a bordered card with a heading.
		 */
		variant?: "default" | "card";
		/** Heading shown at the top of the `"card"` variant. Defaults to "Date Range". */
		label?: string;
		format?: (date: DateValue | undefined) => string;
		onValueChange?: (value: DateRange | undefined) => void;
	};

	function defaultFormat(date: DateValue | undefined): string {
		if (!date?.toDate) return "Pick a date";

		try {
			return date.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "2-digit",
			});
		} catch {
			return "Pick a date";
		}
	}

	let {
		value = $bindable(),
		placeholder,
		disabled = false,
		class: className,
		buttonClass,
		calendarProps = {},
		fromLabel = "From",
		toLabel = "To",
		variant = "default",
		label = "Date Range",
		format = defaultFormat,
		error = false,
		onError,
		onValueChange,
		name,
		// Accepted for API parity with the other pickers, but not used here —
		// the split fields are styled as inputs, not buttons.
		buttonVariant,
		...restProps
	}: Props = $props();

	// Each calendar keeps its own focused month; seed once from the range
	// (or the shared `placeholder`) so it opens on the relevant month.
	let startPlaceholder = $state<DateValue | undefined>();
	let endPlaceholder = $state<DateValue | undefined>();
	let seeded = false;

	$effect(() => {
		if (seeded) return;
		seeded = true;
		startPlaceholder = value?.start ?? placeholder;
		endPlaceholder = value?.end ?? placeholder;
	});

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

	function selectStart(date: DateValue | undefined): void {
		value = { start: date, end: value?.end };
	}

	function selectEnd(date: DateValue | undefined): void {
		value = { start: value?.start, end: date };
	}

	const fieldNames = $derived(name ? rangeFieldNames(name) : null);

	// In the card variant the surrounding card provides the only border, so the
	// fields render borderless and "conjoined"; the default variant keeps the
	// standalone input look with its own border.
	const triggerClass = $derived(
		cn(
			"group flex flex-1 flex-col items-start gap-1 px-3 py-2 text-left transition-colors",
			"hover:bg-accent/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
			variant === "card"
				? "rounded-md focus-visible:bg-accent/50"
				: "rounded-lg border border-input bg-background shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			error && "border-destructive ring-destructive/20 ring-[3px]",
			buttonClass,
		),
	);
</script>

{#snippet fields()}
	<Endpoint
		label={fromLabel}
		value={value?.start}
		onSelect={selectStart}
		bind:placeholder={startPlaceholder}
		maxValue={value?.end}
		{disabled}
		{triggerClass}
		{format}
		{calendarProps}
	/>

	<div
		aria-hidden="true"
		class="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
	>
		<ArrowRight class="size-4" />
	</div>

	<Endpoint
		label={toLabel}
		value={value?.end}
		onSelect={selectEnd}
		bind:placeholder={endPlaceholder}
		minValue={value?.start}
		{disabled}
		{triggerClass}
		{format}
		{calendarProps}
	/>

	<!--
		The triggers are buttons, not form controls, so the selected range is not
		submitted on its own. When a `name` is given, mirror each endpoint into a
		hidden input (ISO `YYYY-MM-DD` via DateValue.toString()) so the picker
		participates in native form / SvelteKit `enhance` submissions. The keys
		come from `rangeFieldNames` so a form action can read the same contract
		instead of hard-coding the separator.
	-->
	{#if fieldNames}
		<input
			type="hidden"
			name={fieldNames.start}
			value={value?.start ? value.start.toString() : ""}
		/>
		<input
			type="hidden"
			name={fieldNames.end}
			value={value?.end ? value.end.toString() : ""}
		/>
	{/if}
{/snippet}

{#if variant === "card"}
	<div class={cn("grid gap-1.5", className)} {...restProps}>
		{#if label}
			<div class="text-sm font-medium">{label}</div>
		{/if}
		<div
			class="flex items-center gap-2 rounded-lg border border-border bg-card p-2 text-card-foreground shadow-sm sm:rounded-xl"
		>
			{@render fields()}
		</div>
	</div>
{:else}
	<div class={cn("flex items-center gap-3", className)} {...restProps}>
		{@render fields()}
	</div>
{/if}
