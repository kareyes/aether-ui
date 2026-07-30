<script lang="ts">
	import {
		TimePicker,
		Field,
		Input,
		Segment,
		Label,
	} from "$lib/components/ui/time-picker";
	import { Card } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Time, parseTime } from "@internationalized/date";

	let basic = $state<Time | undefined>();
	let seeded = $state<Time | undefined>(new Time(9, 30));
	let hour24 = $state<Time | undefined>(new Time(18, 45));
	let hourOnly = $state<Time | undefined>(new Time(11, 0));
	let withSeconds = $state<Time | undefined>(new Time(11, 30, 15));
	let stepped = $state<Time | undefined>(new Time(10, 0));
	let bounded = $state<Time | undefined>(new Time(10, 0));
	let fieldOnly = $state<Time | undefined>(new Time(8, 0));
	let errored = $state<Time | undefined>();
	let formValue = $state<Time | undefined>(new Time(9, 0));
	let dialogValue = $state<Time | undefined>(new Time(13, 0));
	let composed = $state<Time | undefined>(new Time(7, 45));
	let modal = $state<HTMLDialogElement | null>(null);
	let submitted = $state<string | null>(null);

	const show = (time: Time | undefined): string => time?.toString() ?? "—";

	const onSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		submitted = String(data.get("startTime") || "");
	};
</script>

<div class="container mx-auto max-w-5xl space-y-12 p-8">
	<header class="mb-2">
		<h1 class="mb-2 text-4xl font-bold">TimePicker Component</h1>
		<p class="text-muted-foreground max-w-2xl">
			A segmented, keyboard-editable time field with an optional dropdown of
			hour / minute / second / AM-PM columns. Built on bits-ui's headless
			<code>TimeField</code> and <code>Time</code> from
			<code>@internationalized/date</code> — a zone-less wall-clock time,
			matching native <code>&lt;input type="time"&gt;</code> semantics.
		</p>
	</header>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Basic</h2>
		<div class="grid gap-6 md:grid-cols-2">
			<Card title="Empty" description="Type digits or use the dropdown">
				<TimePicker bind:value={basic} label="Start time" />
				<p class="text-muted-foreground mt-3 text-sm">
					Value: <code>{show(basic)}</code>
				</p>
			</Card>
			<Card title="Seeded" description="Starts at 09:30">
				<TimePicker bind:value={seeded} label="Shift start" />
				<p class="text-muted-foreground mt-3 text-sm">
					Value: <code>{show(seeded)}</code>
				</p>
			</Card>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Variants</h2>
		<Card>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each ["default", "outline", "filled", "ghost", "underline"] as const as variant (variant)}
					<div class="space-y-2">
						<p class="text-sm font-medium capitalize">{variant}</p>
						<TimePicker {variant} value={new Time(9, 30)} />
					</div>
				{/each}
			</div>
		</Card>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Sizes</h2>
		<Card>
			<div class="flex flex-wrap items-end gap-6">
				{#each ["sm", "default", "lg"] as const as size (size)}
					<div class="space-y-2">
						<p class="text-sm font-medium">{size}</p>
						<TimePicker {size} value={new Time(14, 15)} />
					</div>
				{/each}
			</div>
		</Card>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Hour cycle and granularity</h2>
		<div class="grid gap-6 md:grid-cols-3">
			<Card title="24-hour" description="No AM/PM segment or column">
				<TimePicker bind:value={hour24} hourCycle={24} />
				<p class="text-muted-foreground mt-3 text-sm">
					Value: <code>{show(hour24)}</code>
				</p>
			</Card>
			<Card title="Hour granularity" description="Minutes are zeroed on select">
				<TimePicker bind:value={hourOnly} granularity="hour" />
				<p class="text-muted-foreground mt-3 text-sm">
					Value: <code>{show(hourOnly)}</code>
				</p>
			</Card>
			<Card title="Second granularity" description="Adds a seconds column">
				<TimePicker
					bind:value={withSeconds}
					granularity="second"
					minuteStep={1}
					secondStep={10}
				/>
				<p class="text-muted-foreground mt-3 text-sm">
					Value: <code>{show(withSeconds)}</code>
				</p>
			</Card>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Steps</h2>
		<Card
			title="Column increments"
			description="Steps affect the dropdown only — typing still reaches every value"
		>
			<div class="flex flex-wrap items-end gap-6">
				{#each [1, 5, 15, 30] as step (step)}
					<div class="space-y-2">
						<p class="text-sm font-medium">minuteStep={step}</p>
						<TimePicker minuteStep={step} value={new Time(10, 0)} />
					</div>
				{/each}
			</div>
			<div class="mt-6 space-y-2">
				<p class="text-sm font-medium">Bound example (step 15)</p>
				<TimePicker bind:value={stepped} minuteStep={15} />
				<p class="text-muted-foreground text-sm">
					Value: <code>{show(stepped)}</code>
				</p>
			</div>
		</Card>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Range limits</h2>
		<Card title="Business hours" description="09:30 – 17:00, inclusive">
			<TimePicker
				bind:value={bounded}
				minValue={new Time(9, 30)}
				maxValue={new Time(17, 0)}
				minuteStep={15}
				label="Appointment"
			/>
			<p class="text-muted-foreground mt-3 max-w-md text-sm">
				Unreachable options are struck through. Hour 9 stays selectable because
				09:30 is still reachable within it — only its <code>00</code> and
				<code>15</code> minute entries are disabled. Typing an out-of-range time
				marks the field invalid.
			</p>
			<p class="text-muted-foreground mt-2 text-sm">
				Value: <code>{show(bounded)}</code>
			</p>
		</Card>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">States</h2>
		<div class="grid gap-6 md:grid-cols-2">
			<Card title="Field only" description="showPicker={false}">
				<TimePicker bind:value={fieldOnly} showPicker={false} label="Clock in" />
				<p class="text-muted-foreground mt-3 text-sm">
					Value: <code>{show(fieldOnly)}</code>
				</p>
			</Card>
			<Card title="Disabled / readonly">
				<div class="space-y-4">
					<TimePicker disabled value={new Time(9, 0)} label="Disabled" />
					<TimePicker readonly value={new Time(9, 0)} label="Readonly" />
				</div>
			</Card>
			<Card title="Error" description="Destructive styling plus aria-invalid">
				<TimePicker bind:value={errored} error={!errored} label="End time" />
				{#if !errored}
					<p class="text-destructive mt-2 text-xs">An end time is required.</p>
				{/if}
			</Card>
			<Card title="No 'Now' shortcut" description="showNow={false}">
				<TimePicker showNow={false} value={new Time(12, 0)} />
			</Card>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Forms</h2>
		<Card
			title="Native submission"
			description="bits-ui renders a hidden input with the ISO time string"
		>
			<form onsubmit={onSubmit} class="space-y-4">
				<TimePicker name="startTime" bind:value={formValue} label="Start" required />
				<Button type="submit" size="sm">Submit</Button>
			</form>
			{#if submitted !== null}
				<p class="text-muted-foreground mt-3 text-sm">
					Submitted: <code>{submitted || "(empty)"}</code>
					{#if submitted}
						→ parsed back: <code>{parseTime(submitted).toString()}</code>
					{/if}
				</p>
			{/if}
		</Card>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Inside a modal dialog</h2>
		<Card
			title="Top-layer handling"
			description="The dropdown portals into the dialog and positions against the viewport"
		>
			<Button size="sm" variant="outline" onclick={() => modal?.showModal()}>
				Open dialog
			</Button>
			<dialog
				bind:this={modal}
				class="bg-background text-foreground rounded-lg border p-6 shadow-lg backdrop:bg-black/50"
			>
				<h3 class="mb-4 text-lg font-semibold">Reschedule</h3>
				<TimePicker bind:value={dialogValue} label="New time" />
				<div class="mt-6 flex justify-end gap-2">
					<Button size="sm" variant="outline" onclick={() => modal?.close()}>
						Close
					</Button>
				</div>
			</dialog>
			<p class="text-muted-foreground mt-3 text-sm">
				Value: <code>{show(dialogValue)}</code>
			</p>
		</Card>
	</section>

	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Composition (primitives)</h2>
		<Card
			title="Hand-assembled field"
			description="For layouts the declarative component can't express"
		>
			<Field bind:value={composed} granularity="minute" hourCycle={12}>
				<div class="space-y-2">
					<Label>Break start</Label>
					<Input name="breakStart">
						{#snippet children({ segments })}
							{#each segments as segment, index (index)}
								<Segment part={segment.part}>{segment.value}</Segment>
							{/each}
						{/snippet}
					</Input>
				</div>
			</Field>
			<p class="text-muted-foreground mt-3 text-sm">
				Value: <code>{show(composed)}</code>
			</p>
		</Card>
	</section>
</div>
