<script lang="ts">
	import { Illustrations, Empty, Button } from "$lib";

	const gallery: Array<{ name: string; component: (typeof Illustrations)[keyof typeof Illustrations] }> = [
		{ name: "Time", component: Illustrations.Time },
		{ name: "ReadyToWork", component: Illustrations.ReadyToWork },
		{ name: "TodayActivity", component: Illustrations.TodayActivity },
		{ name: "NoTimeEntries", component: Illustrations.NoTimeEntries },
		{ name: "NoReports", component: Illustrations.NoReports },
		{ name: "NoSchedule", component: Illustrations.NoSchedule },
		{ name: "NoBranch", component: Illustrations.NoBranch },
		{ name: "NoSearchResults", component: Illustrations.NoSearchResults },
		{ name: "Offline", component: Illustrations.Offline },
		{ name: "Success", component: Illustrations.Success },
		{ name: "ErrorState", component: Illustrations.ErrorState },
		{ name: "EmptyDashboard", component: Illustrations.EmptyDashboard },
	];

	const emptyStates: Array<{
		name: string;
		component: (typeof Illustrations)[keyof typeof Illustrations];
		title: string;
		description: string;
		action?: { text: string; variant?: "default" | "outline" };
	}> = [
		{
			name: "ReadyToWork",
			component: Illustrations.ReadyToWork,
			title: "Ready to Work",
			description:
				"You haven't clocked in yet today. Start your shift whenever you're ready.",
			action: { text: "Clock In", variant: "default" },
		},
		{
			name: "TodayActivity",
			component: Illustrations.TodayActivity,
			title: "No Activity Yet",
			description:
				"Your check-ins, breaks, and check-outs will appear here as they happen.",
		},
		{
			name: "NoTimeEntries",
			component: Illustrations.NoTimeEntries,
			title: "No Time Entries",
			description:
				"You haven't logged any hours yet. Clock in to start tracking today's work.",
			action: { text: "Add Entry", variant: "outline" },
		},
		{
			name: "NoReports",
			component: Illustrations.NoReports,
			title: "No Reports Available",
			description:
				"Reports will appear here once time data has been recorded for this period.",
		},
		{
			name: "NoSchedule",
			component: Illustrations.NoSchedule,
			title: "No Schedule Assigned",
			description:
				"You don't have any upcoming shifts. Check back later or contact your manager.",
		},
		{
			name: "NoBranch",
			component: Illustrations.NoBranch,
			title: "No Branch Assigned",
			description:
				"You're not assigned to a location yet. Contact your administrator to get set up.",
			action: { text: "Request Branch", variant: "outline" },
		},
		{
			name: "NoSearchResults",
			component: Illustrations.NoSearchResults,
			title: "No Results Found",
			description:
				"We couldn't find anything matching your search. Try different keywords or filters.",
			action: { text: "Clear Filters", variant: "outline" },
		},
		{
			name: "Offline",
			component: Illustrations.Offline,
			title: "You're Offline",
			description:
				"Entries will sync automatically once your connection is restored.",
		},
		{
			name: "Success",
			component: Illustrations.Success,
			title: "All Set!",
			description: "Your timesheet has been submitted successfully.",
			action: { text: "Back to Dashboard", variant: "default" },
		},
		{
			name: "Error",
			component: Illustrations.ErrorState,
			title: "Something Went Wrong",
			description: "We couldn't process your request. Please try again.",
			action: { text: "Retry", variant: "outline" },
		},
		{
			name: "EmptyDashboard",
			component: Illustrations.EmptyDashboard,
			title: "Welcome to Your Dashboard",
			description:
				"Once you start tracking time, your stats and activity will show up here.",
		},
	];

	const sizes = [64, 96, 128, 160, 240];
</script>

<div class="container mx-auto space-y-16 p-8">
	<div class="space-y-2">
		<h1 class="text-4xl font-bold">Illustrations</h1>
		<p class="text-muted-foreground">
			Handcrafted SVG illustrations for empty, offline, success, and error
			states across Aether UI.
		</p>
	</div>

	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-semibold">Empty States in Context</h2>
			<p class="text-muted-foreground text-sm">
				Each illustration paired with <code>Empty</code> — the intended real-world
				usage.
			</p>
		</div>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			{#each emptyStates as state (state.name)}
				{#if state.action}
					{@const buttonAction = state.action}
					<Empty
						title={state.title}
						description={state.description}
						variant="outline"
						size="lg"
						iconVariant="illustration"
					>
						{#snippet icon()}<state.component size={140} />{/snippet}
						{#snippet action()}
							<Button text={buttonAction.text} variant={buttonAction.variant} size="sm" />
						{/snippet}
					</Empty>
				{:else}
					<Empty
						title={state.title}
						description={state.description}
						variant="outline"
						size="lg"
						iconVariant="illustration"
					>
						{#snippet icon()}<state.component size={140} />{/snippet}
					</Empty>
				{/if}
			{/each}
		</div>
	</section>

	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-semibold">All Illustrations</h2>
			<p class="text-muted-foreground text-sm">
				The full set, rendered standalone at a fixed size.
			</p>
		</div>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each gallery as item (item.name)}
				<div
					class="border-border bg-card flex flex-col items-center gap-3 rounded-xl border p-6"
				>
					<item.component size={160} />
					<span class="text-muted-foreground text-sm">{item.name}</span>
				</div>
			{/each}
		</div>
	</section>

	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-semibold">Sizes</h2>
			<p class="text-muted-foreground text-sm">
				Every illustration accepts a <code>size</code> prop (defaults to 240).
			</p>
		</div>
		<div class="border-border bg-card flex flex-wrap items-end gap-8 rounded-xl border p-6">
			{#each sizes as size (size)}
				<div class="flex flex-col items-center gap-2">
					<Illustrations.Success {size} />
					<span class="text-muted-foreground text-xs">{size}px</span>
				</div>
			{/each}
		</div>
	</section>
</div>
