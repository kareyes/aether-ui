<script lang="ts">
	import { Calendar as CalendarIcon, ChevronDown } from "@lucide/svelte";
	import type { DateValue } from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";

	/**
	 * One end of a `DateRangePickerSplit`. The two ends differ only in their
	 * label, which half of the range they read/write, and which side clamps their
	 * calendar — so they share this component rather than two near-identical
	 * copies. `placeholder` (the calendar's focused month) is bindable because
	 * bits-ui's Calendar has no `onPlaceholderChange`.
	 */
	type Props = {
		label: string;
		value: DateValue | undefined;
		onSelect: (date: DateValue | undefined) => void;
		placeholder?: DateValue;
		minValue?: DateValue;
		maxValue?: DateValue;
		disabled?: boolean;
		triggerClass?: string;
		format: (date: DateValue | undefined) => string;
		calendarProps?: Record<string, unknown>;
	};

	let {
		label,
		value,
		onSelect,
		placeholder = $bindable(),
		minValue,
		maxValue,
		disabled = false,
		triggerClass,
		format,
		calendarProps = {},
	}: Props = $props();

	let open = $state(false);

	function select(date: DateValue | undefined): void {
		onSelect(date);
		open = false;
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<button {...props} type="button" {disabled} class={triggerClass}>
				<span class="text-xs font-medium text-muted-foreground">{label}</span>
				<span class="flex w-full items-center gap-2">
					<CalendarIcon class="size-4 text-muted-foreground" />
					<span class={cn("flex-1 text-sm", !value && "text-muted-foreground")}>
						{format(value)}
					</span>
					<ChevronDown
						class="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
					/>
				</span>
			</button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
		<Calendar
			type="single"
			{value}
			bind:placeholder
			{minValue}
			{maxValue}
			onValueChange={select}
			{...calendarProps}
		/>
	</Popover.Content>
</Popover.Root>
