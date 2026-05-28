<script lang="ts">
	import { Calendar as CalendarIcon } from "@lucide/svelte";
	import { type DateValue, today, getLocalTimeZone } from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
    import type { DatePickerProps } from ".";
    import type { ComponentProps } from "svelte";

    type Props = DatePickerProps & {
        value?: DateValue;
		presets?: Preset[];
		format?: (date: DateValue | undefined) => string;
		onValueChange?: (value: DateValue | undefined) => void;
	};

    type Preset = {
		label: string;
		value: DateValue;
	};

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

	let {
		value = $bindable(),
		placeholder = $bindable(),
		disabled = false,
		class: className,
		buttonVariant = "outline",
		buttonClass,
		calendarProps = {},
		error = false,
		onError,
		onValueChange,
		presets = [
			{ label: "Today", value: today(getLocalTimeZone()) },
			{ label: "Tomorrow", value: today(getLocalTimeZone()).add({ days: 1 }) },
			{ label: "In 3 days", value: today(getLocalTimeZone()).add({ days: 3 }) },
			{ label: "In a week", value: today(getLocalTimeZone()).add({ weeks: 1 }) },
			{ label: "In a month", value: today(getLocalTimeZone()).add({ months: 1 }) },
		],
		format = defaultFormat,
		...restProps
	}: Props = $props();
     let dropdown =
    $state<ComponentProps<typeof Calendar>["captionLayout"]>("dropdown");


    
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
		if (value && !placeholder) placeholder = value;
		if (value) open = false;
	});

	function selectPreset(preset: Preset): void {
		value = preset.value;
	}
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
		<Popover.Content class="w-auto p-0 flex" align="start">
			<div class="border-r border-border">
				<div class="flex flex-col gap-1 p-3">
					<div class="text-xs font-medium text-muted-foreground mb-1">Presets</div>
				{#each presets as preset}
					<Button
						variant="ghost"
						size="sm"
						class="justify-start font-normal"
						onclick={() => selectPreset(preset)}
					>
						{preset.label}
					</Button>
				{/each}
			</div>
		</div>
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
</div>
