<script lang="ts">
	import {
		CalendarWeek,
		type CalendarEvent,
	} from "$lib/components/ui/calendar";
	import { Card } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import {
		today,
		getLocalTimeZone,
		isWeekend,
		type DateValue,
	} from "@internationalized/date";

	const tz = getLocalTimeZone();
	const now = today(tz);

	let basicValue = $state<DateValue | undefined>();
	let eventValue = $state<DateValue | undefined>();
	let fluidValue = $state<DateValue | undefined>();
	let constrainedValue = $state<DateValue | undefined>();
	let controlledPlaceholder = $state<DateValue>(now);

	// Build ISO date strings (YYYY-MM-DD) for the current month.
	const iso = (day: number) =>
		`${now.year}-${String(now.month).padStart(2, "0")}-${String(
			Math.min(Math.max(day, 1), 28),
		).padStart(2, "0")}`;

	const sampleEvents: CalendarEvent[] = [
		{ date: iso(now.day), color: "#ef4444", label: "Standup" },
		{ date: iso(now.day), color: "#3b82f6", label: "1:1" },
		{ date: iso(now.day + 1), color: "#22c55e", label: "Review" },
		{ date: iso(now.day + 3), color: "#f59e0b", label: "Deadline" },
	];

	const fmt = (d: DateValue | undefined): string =>
		d ? d.toDate(tz).toLocaleDateString() : "—";
</script>

<div class="container mx-auto max-w-5xl space-y-12 p-8">
	<header class="mb-2">
		<h1 class="mb-2 text-4xl font-bold">CalendarWeek Component</h1>
		<p class="text-muted-foreground max-w-2xl">
			A single-week calendar variant with previous/next <em>week</em>
			navigation. Built on the same primitives as
			<code>Calendar</code>, so selection, today highlighting, disabled
			states and event markers behave identically.
		</p>
	</header>

	<!-- Basic -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Basic</h2>
		<p class="text-muted-foreground text-sm">
			Click a day to select it; use the chevrons to move between weeks.
		</p>
		<div class="flex flex-col items-start gap-3">
			<CalendarWeek type="single" bind:value={basicValue} />
			<p class="text-muted-foreground text-sm">
				Selected: <span class="text-foreground font-medium"
					>{fmt(basicValue)}</span
				>
			</p>
		</div>
	</section>

	<!-- Sizes -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Sizes</h2>
		<div class="flex flex-col gap-6">
			{#each ["sm", "default", "lg", "xl"] as const as s (s)}
				<div class="space-y-1">
					<p class="text-muted-foreground text-xs uppercase">{s}</p>
					<CalendarWeek type="single" size={s} />
				</div>
			{/each}
		</div>
	</section>

	<!-- Week starts on Monday -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Week Starts On Monday</h2>
		<p class="text-muted-foreground text-sm">
			<code>weekStartsOn={1}</code> — the week runs Monday → Sunday.
		</p>
		<CalendarWeek type="single" weekStartsOn={1} />
	</section>

	<!-- Events -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Event Markers</h2>
		<p class="text-muted-foreground text-sm">
			Pass <code>events</code> (ISO date strings) to render dots below the
			matching days.
		</p>
		<div class="flex flex-col items-start gap-3">
			<CalendarWeek
				type="single"
				bind:value={eventValue}
				events={sampleEvents}
			/>
			<p class="text-muted-foreground text-sm">
				Selected: <span class="text-foreground font-medium"
					>{fmt(eventValue)}</span
				>
			</p>
		</div>
	</section>

	<!-- Custom font size -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Custom Font Size</h2>
		<p class="text-muted-foreground text-sm">
			<code>fontSize</code> overrides the text size (day numbers, weekday
			headers and the range label) independently of <code>size</code>.
		</p>
		<div class="flex flex-col gap-6">
			<CalendarWeek type="single" fontSize="0.7rem" />
			<CalendarWeek type="single" fontSize="1rem" />
			<CalendarWeek type="single" fontSize="1.25rem" />
		</div>
	</section>

	<!-- Full size / scheduling -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Full Width (Scheduling)</h2>
		<p class="text-muted-foreground text-sm">
			<code>size="full"</code> stretches to the container width and renders
			events as labelled cards — suited to weekly schedulers.
		</p>
		<CalendarWeek type="single" size="full" events={sampleEvents} />
	</section>

	<!-- Full width, compact, via the fluid prop -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Full Width (compact)</h2>
		<p class="text-muted-foreground text-sm">
			The compact calendar is <code>w-fit</code> by default. Pass
			<code>fluid</code> to stretch it across the container with the seven
			day columns distributed evenly — while keeping the small cells
			(unlike the heavier <code>size="full"</code>).
		</p>
		<CalendarWeek
			type="single"
			fluid
			bind:value={fluidValue}
			events={sampleEvents}
		/>
		<p class="text-muted-foreground text-sm">
			Selected: <span class="text-foreground font-medium"
				>{fmt(fluidValue)}</span
			>
		</p>
	</section>

	<!-- Date constraints -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Date Constraints</h2>
		<p class="text-muted-foreground text-sm">
			Only today through three weeks ahead are selectable; navigation stops
			once a week is fully out of range.
		</p>
		<div class="flex flex-col items-start gap-3">
			<CalendarWeek
				type="single"
				bind:value={constrainedValue}
				minValue={now}
				maxValue={now.add({ weeks: 3 })}
			/>
			<p class="text-muted-foreground text-sm">
				Selected: <span class="text-foreground font-medium"
					>{fmt(constrainedValue)}</span
				>
			</p>
		</div>
	</section>

	<!-- Disabled weekends -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Disabled Weekends</h2>
		<CalendarWeek
			type="single"
			isDateDisabled={(date) => isWeekend(date, "en-US")}
		/>
	</section>

	<!-- Controlled placeholder -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Controlling the Visible Week</h2>
		<p class="text-muted-foreground text-sm">
			Bind <code>placeholder</code> to drive which week is shown from outside
			the component.
		</p>
		<Card class="space-y-3">
			<div class="flex flex-wrap gap-2">
				<Button
					variant="outline"
					text="− 4 weeks"
					onclick={() =>
						(controlledPlaceholder = controlledPlaceholder.subtract({
							weeks: 4,
						}))}
				/>
				<Button
					variant="outline"
					text="Today"
					onclick={() => (controlledPlaceholder = now)}
				/>
				<Button
					variant="outline"
					text="+ 4 weeks"
					onclick={() =>
						(controlledPlaceholder = controlledPlaceholder.add({
							weeks: 4,
						}))}
				/>
			</div>
			<CalendarWeek type="single" bind:placeholder={controlledPlaceholder} />
		</Card>
	</section>
</div>
