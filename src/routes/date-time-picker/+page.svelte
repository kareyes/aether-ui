<script lang="ts">
	import { DateTimePicker } from "$lib/components/ui/date-picker";
	import { Card } from "$lib/components/ui/card";
	import * as Field from "$lib/components/ui/field";
	import {
		CalendarDateTime,
		getLocalTimeZone,
		today,
	} from "@internationalized/date";

	const tz = getLocalTimeZone();

	let basicValue = $state<CalendarDateTime | undefined>();
	let initialValue = $state<CalendarDateTime | undefined>(
		new CalendarDateTime(
			today(tz).year,
			today(tz).month,
			today(tz).day,
			14,
			30,
		),
	);
	let hour24Value = $state<CalendarDateTime | undefined>();
	let minuteStep1Value = $state<CalendarDateTime | undefined>();
	let minuteStep15Value = $state<CalendarDateTime | undefined>();
	let customFormatValue = $state<CalendarDateTime | undefined>();
	let disabledValue = $state<CalendarDateTime | undefined>(
		new CalendarDateTime(
			today(tz).year,
			today(tz).month,
			today(tz).day,
			9,
			0,
		),
	);
	let errorValue = $state<CalendarDateTime | undefined>();
	let formValue = $state<CalendarDateTime | undefined>();
	let seededValue = $state<CalendarDateTime | undefined>();
	let unseededValue = $state<CalendarDateTime | undefined>();
	let dialogValue = $state<CalendarDateTime | undefined>();
	let modal = $state<HTMLDialogElement | null>(null);
	let submitted = $state<string | null>(null);

	const fmt = (d: CalendarDateTime | undefined): string =>
		d ? d.toDate(tz).toLocaleString() : "—";

	const customFormat = (d: CalendarDateTime | undefined): string =>
		d
			? `${d.year}-${String(d.month).padStart(2, "0")}-${String(
					d.day,
				).padStart(2, "0")} @ ${String(d.hour).padStart(2, "0")}:${String(
					d.minute,
				).padStart(2, "0")}`
			: "Choose a moment…";

	const onSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		submitted = String(data.get("meetingStart") || "");
	};
</script>

<div class="container mx-auto max-w-5xl space-y-12 p-8">
	<header class="mb-2">
		<h1 class="mb-2 text-4xl font-bold">DateTimePicker Component</h1>
		<p class="text-muted-foreground max-w-2xl">
			Combines the <code>Calendar</code> with hour / minute / AM-PM columns in
			a single popover, so a date and time can be picked together. Built on
			<code>CalendarDateTime</code> from <code>@internationalized/date</code>
			— zone-less, matching native <code>datetime-local</code> semantics.
		</p>
	</header>

	<!-- Basic -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Basic</h2>
		<p class="text-muted-foreground text-sm">
			Click the trigger, pick a day, then a hour / minute / period.
		</p>
		<div class="flex max-w-xs flex-col items-start gap-3">
			<DateTimePicker bind:value={basicValue} />
			<p class="text-muted-foreground text-sm">
				Selected: <span class="text-foreground font-medium"
					>{fmt(basicValue)}</span
				>
			</p>
		</div>
	</section>

	<!-- With initial value -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">With Initial Value</h2>
		<p class="text-muted-foreground text-sm">
			Seeded with today's date at 2:30 PM.
		</p>
		<div class="max-w-xs">
			<DateTimePicker bind:value={initialValue} />
		</div>
	</section>

	<!-- Hour cycle -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Hour Cycle</h2>
		<p class="text-muted-foreground text-sm">
			<code>hourCycle</code> switches between a 12-hour column with an AM/PM
			list (default) and a 24-hour column with no period picker.
		</p>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			<div class="space-y-1">
				<p class="text-muted-foreground text-xs uppercase">12-hour (default)</p>
				<DateTimePicker bind:value={basicValue} />
			</div>
			<div class="space-y-1">
				<p class="text-muted-foreground text-xs uppercase">24-hour</p>
				<DateTimePicker bind:value={hour24Value} hourCycle={24} />
			</div>
		</div>
	</section>

	<!-- Minute step -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Minute Step</h2>
		<p class="text-muted-foreground text-sm">
			<code>minuteStep</code> controls the increment between entries in the
			minute column — <code>5</code> (default) for scheduling, <code>1</code>
			for precise corrections, or a coarser step like <code>15</code>.
		</p>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
			<div class="space-y-1">
				<p class="text-muted-foreground text-xs uppercase">Step 1</p>
				<DateTimePicker bind:value={minuteStep1Value} minuteStep={1} />
			</div>
			<div class="space-y-1">
				<p class="text-muted-foreground text-xs uppercase">Step 5 (default)</p>
				<DateTimePicker bind:value={basicValue} />
			</div>
			<div class="space-y-1">
				<p class="text-muted-foreground text-xs uppercase">Step 15</p>
				<DateTimePicker bind:value={minuteStep15Value} minuteStep={15} />
			</div>
		</div>
	</section>

	<!-- Default value -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Default Value</h2>
		<p class="text-muted-foreground text-sm">
			An unset picker seeds itself with the current date and time on mount, so
			opening it and pressing <em>Done</em> without touching anything still
			produces a value. The seeded minute snaps to the
			<code>minuteStep</code> grid so it lines up with a real entry in the
			column. Pass <code>defaultToNow={false}</code> to keep it empty — do
			that wherever "blank" carries meaning, such as a partial-update form
			where an untouched field must be left alone.
		</p>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			<div class="space-y-1">
				<p class="text-muted-foreground text-xs uppercase">
					Seeded (default)
				</p>
				<DateTimePicker bind:value={seededValue} />
			</div>
			<div class="space-y-1">
				<p class="text-muted-foreground text-xs uppercase">
					defaultToNow=false
				</p>
				<DateTimePicker bind:value={unseededValue} defaultToNow={false} />
			</div>
		</div>
	</section>

	<!-- Inside a dialog -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Inside a Modal Dialog</h2>
		<p class="text-muted-foreground text-sm">
			A native <code>&lt;dialog&gt;</code> opened with
			<code>showModal()</code> renders in the browser's
			<strong>top layer</strong>, which paints above everything in the normal
			flow regardless of z-index. The popover portals to
			<code>document.body</code> by default, so inside a modal it would land
			<em>behind</em> the dialog. The picker detects an ancestor
			<code>&lt;dialog&gt;</code> and portals into it instead — no z-index
			tuning required.
		</p>
		<button
			type="button"
			class="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm font-medium"
			onclick={() => modal?.showModal()}
		>
			Open dialog
		</button>
		<dialog
			bind:this={modal}
			class="bg-card text-card-foreground m-auto w-[min(92vw,28rem)] rounded-xl border p-0 shadow-lg backdrop:bg-black/40"
		>
			<div class="space-y-4 p-4">
				<h3 class="text-base font-semibold">Schedule a follow-up</h3>
				<DateTimePicker bind:value={dialogValue} />
				<p class="text-muted-foreground text-sm">
					Selected: <span class="text-foreground font-medium"
						>{fmt(dialogValue)}</span
					>
				</p>
				<div class="flex justify-end">
					<button
						type="button"
						class="rounded-md border px-3 py-1.5 text-sm"
						onclick={() => modal?.close()}
					>
						Close
					</button>
				</div>
			</div>
		</dialog>
	</section>

	<!-- Custom format -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Custom Format</h2>
		<p class="text-muted-foreground text-sm">
			<code>format</code> overrides the trigger label — here rendered as
			<code>YYYY-MM-DD @ HH:mm</code> instead of the localized default.
		</p>
		<div class="max-w-xs">
			<DateTimePicker bind:value={customFormatValue} format={customFormat} />
		</div>
	</section>

	<!-- Disabled -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Disabled</h2>
		<div class="max-w-xs">
			<DateTimePicker bind:value={disabledValue} disabled />
		</div>
	</section>

	<!-- Field with validation -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Field With Validation</h2>
		<p class="text-muted-foreground text-sm">
			Wrapped in <code>Field.Field</code> with an <code>error</code> message;
			the picker's own <code>error</code> prop applies the destructive
			trigger styling.
		</p>
		<div class="max-w-xs">
			<Field.Field
				label="Meeting Start"
				description="When should the meeting begin?"
				required
				error={errorValue ? undefined : "Please select a date and time"}
			>
				<DateTimePicker
					bind:value={errorValue}
					error={!errorValue}
					defaultToNow={false}
				/>
			</Field.Field>
		</div>
	</section>

	<!-- Form integration -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Form Integration</h2>
		<p class="text-muted-foreground text-sm">
			Passing <code>name</code> mirrors the value into a hidden input as an
			ISO <code>YYYY-MM-DDTHH:mm:ss</code> string, so the picker participates
			in a native form submission without any extra wiring.
		</p>
		<Card class="max-w-xs space-y-3">
			<form class="space-y-3" onsubmit={onSubmit}>
				<DateTimePicker name="meetingStart" bind:value={formValue} />
				<button
					type="submit"
					class="bg-primary text-primary-foreground w-full rounded-md px-3 py-1.5 text-sm font-medium"
				>
					Submit
				</button>
			</form>
			{#if submitted}
				<p class="text-muted-foreground text-sm">
					Submitted <code>meetingStart</code>: <span
						class="text-foreground font-medium">{submitted}</span
					>
				</p>
			{/if}
		</Card>
	</section>
</div>
