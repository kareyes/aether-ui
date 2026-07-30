<script lang="ts">
	import { TimeField as TimeFieldPrimitive } from "bits-ui";
	import { Clock, ChevronDown } from "@lucide/svelte";
	import { Time, getLocalTimeZone, now, toTime } from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	// Shared with the date pickers: renders correctly inside a native <dialog>.
	// See that module's docs for why both a portal target and a fixed strategy
	// are needed — imported, not copied, so top-layer handling stays in one place.
	import { dialogPopover } from "$lib/components/ui/date-picker/dialog-popover.svelte.js";
	import TimeFieldSegment from "./time-field-segment.svelte";
	import TimeFieldLabel from "./time-field-label.svelte";
	import TimePickerColumns from "./time-picker-columns.svelte";
	import { timePickerVariants } from "./time-picker-variants.js";
	import type { TimePickerProps } from "./time-picker-types.js";
	import {
		formatTimeParts,
		isWithinBounds,
		normalizeStep,
		nowOnGrid,
		truncateToGranularity,
		type TimeParts,
	} from "./time-picker-utils.js";

	let {
		value = $bindable(),
		placeholder = $bindable(),
		label,
		ariaLabel,
		variant = "default",
		size = "default",
		hourCycle = 12,
		granularity = "minute",
		minuteStep = 5,
		secondStep = 5,
		minValue,
		maxValue,
		disabled = false,
		readonly = false,
		required = false,
		name,
		locale,
		showPicker = true,
		showNow = true,
		error = false,
		onError,
		onValueChange,
		class: className,
		fieldClass,
		icon,
		portalProps,
	}: TimePickerProps = $props();

	const styles = $derived(timePickerVariants({ variant, size }));

	const safeMinuteStep = $derived(normalizeStep(minuteStep));
	const safeSecondStep = $derived(normalizeStep(secondStep));

	let open = $state(false);

	let rootEl = $state<HTMLDivElement | null>(null);
	const dialogPop = dialogPopover(() => rootEl);
	const resolvedPortalProps = $derived(portalProps ?? dialogPop.portalProps);

	/**
	 * The time the columns highlight. Falls back to the placeholder (and then to
	 * midnight) so an empty field still opens with a coherent, navigable grid
	 * rather than with every column scrolled to the top and nothing selected.
	 */
	const currentParts: TimeParts = $derived({
		hour: value?.hour ?? placeholder?.hour ?? 0,
		minute: value?.minute ?? placeholder?.minute ?? 0,
		second: value?.second ?? placeholder?.second ?? 0,
	});

	const bounds = $derived({
		min: minValue
			? { hour: minValue.hour, minute: minValue.minute, second: minValue.second }
			: undefined,
		max: maxValue
			? { hour: maxValue.hour, minute: maxValue.minute, second: maxValue.second }
			: undefined,
	});

	// Only a *held* value can be out of bounds; an empty field is incomplete, not
	// invalid, and `currentParts` would be reporting the placeholder's verdict.
	const outOfBounds = $derived(
		value !== undefined && !isWithinBounds(currentParts, bounds),
	);
	const invalid = $derived(error || outOfBounds);

	$effect(() => {
		onError?.(outOfBounds);
	});

	/**
	 * Writes through to `value`, creating one from the highlighted parts when the
	 * field is still empty — clicking any column on an empty picker should commit
	 * a whole time, not leave the field half-set.
	 */
	function commit(fields: Partial<TimeParts>): void {
		const next = truncateToGranularity(
			{ ...currentParts, ...fields },
			granularity,
		);
		value = new Time(next.hour, next.minute, next.second);
		onValueChange?.(value);
	}

	/**
	 * What "Now" would commit. The clock is re-read whenever the dropdown opens
	 * (the only time the shortcut is on screen), so `nowAllowed` describes the
	 * value the button would actually write rather than a stale one.
	 */
	const nowParts: TimeParts = $derived.by(() => {
		void open;
		return nowOnGrid(toTime(now(getLocalTimeZone())), {
			minuteStep: safeMinuteStep,
			secondStep: safeSecondStep,
			granularity,
		});
	});

	// Struck out like any unreachable column entry: a shortcut that silently
	// writes a time no column would offer makes the range limits a lie.
	const nowAllowed = $derived(isWithinBounds(nowParts, bounds));

	function selectNow(): void {
		// Re-checked at click time, not just at render: a dropdown left open
		// across the bound can no longer commit past it.
		if (!isWithinBounds(nowParts, bounds)) return;
		commit(nowParts);
	}

	const triggerLabel = $derived(
		value
			? `Change time, currently ${formatTimeParts(currentParts, { hourCycle, granularity })}`
			: "Choose a time",
	);
</script>

<div bind:this={rootEl} class={cn(styles.root(), className)}>
	<TimeFieldPrimitive.Root
		bind:value
		bind:placeholder
		{granularity}
		{hourCycle}
		{minValue}
		{maxValue}
		{disabled}
		{readonly}
		{required}
		{locale}
		onValueChange={(next) => onValueChange?.(next)}
	>
		{#if label}
			<TimeFieldLabel>{label}</TimeFieldLabel>
		{/if}
		<div
			class={cn(styles.field(), fieldClass)}
			data-slot="time-picker-field"
			data-disabled={disabled ? "" : undefined}
			data-invalid={invalid ? "" : undefined}
		>
			{#if icon}
				{@render icon()}
			{:else}
				<Clock class="text-muted-foreground size-4 shrink-0" />
			{/if}
			<!--
				The bordered box lives on the wrapper above, so the segment row itself
				stays a plain transparent flex line inside it. That keeps the trigger
				button a sibling of the segments rather than a child of the element
				bits-ui drives keyboard navigation across.
			-->
			<TimeFieldPrimitive.Input
				{name}
				aria-invalid={invalid || undefined}
				aria-label={label ? undefined : ariaLabel}
				class="flex items-center"
			>
				{#snippet children({ segments })}
					<!-- Index-keyed: `literal` separators repeat at second granularity. -->
					{#each segments as segment, index (index)}
						<TimeFieldSegment part={segment.part} {size}>
							{segment.value}
						</TimeFieldSegment>
					{/each}
				{/snippet}
			</TimeFieldPrimitive.Input>

			{#if showPicker}
				<Popover.Root bind:open>
					<Popover.Trigger>
						{#snippet child({ props })}
							<button
								{...props}
								type="button"
								class={cn(styles.trigger())}
								disabled={disabled || readonly}
								aria-label={triggerLabel}
							>
								<ChevronDown />
							</button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content
						class="w-auto p-0"
						align="end"
						portalProps={resolvedPortalProps}
						strategy={dialogPop.strategy}
					>
						<TimePickerColumns
							parts={currentParts}
							{bounds}
							{hourCycle}
							{granularity}
							minuteStep={safeMinuteStep}
							secondStep={safeSecondStep}
							{disabled}
							{readonly}
							{open}
							{variant}
							{size}
							onSelect={commit}
						/>
						<div class={cn(styles.footer())}>
							{#if showNow}
								<Button
									size="sm"
									variant="ghost"
									disabled={disabled || readonly || !nowAllowed}
									onclick={selectNow}
								>
									Now
								</Button>
							{:else}
								<span></span>
							{/if}
							<Button size="sm" variant="outline" onclick={() => (open = false)}>
								Done
							</Button>
						</div>
					</Popover.Content>
				</Popover.Root>
			{/if}
		</div>
	</TimeFieldPrimitive.Root>
</div>
