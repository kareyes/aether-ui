<script lang="ts">
	import {
		Timeline,
		TimelineItem,
		TimelineRoot,
		type TimelineEntry,
	} from "$lib/components/ui/timeline";
	import { Card } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Avatar } from "$lib/components/ui/avatar";
	import { Spinner } from "$lib/components/ui/spinner";
	import {
		AccordionContent,
		AccordionItem,
		AccordionRoot,
		AccordionTrigger,
	} from "$lib/components/ui/accordion";
	import {
		CheckCircle,
		CreditCard,
		FlaskConical,
		Hammer,
		Package,
		Rocket,
		Truck,
		UserPlus,
	} from "@lucide/svelte";

	let progressIndex = $state(1);
	let clickIndex = $state(1);

	const roadmap: TimelineEntry[] = [
		{
			title: "Project Initialized",
			description:
				"Successfully set up the project repository and initial architecture.",
			timestamp: "March 2024",
		},
		{
			title: "Beta Release",
			description: "Launched the beta version for early testers and feedback.",
			timestamp: "April 2024",
		},
		{
			title: "Official Launch",
			description: "The platform is now live for all users worldwide.",
			timestamp: "June 2024",
		},
	];

	const featureRoadmap: TimelineEntry[] = [
		{
			title: "AI Engine Integration",
			description:
				"Deep integration of advanced LLMs for real-time code generation and context-aware suggestions.",
			timestamp: "Jan 2025",
		},
		{
			title: "Collaborative Editing",
			description:
				"Multi-user real-time collaboration with shared cursors and instant synchronization across workspaces.",
			timestamp: "Feb 2025",
		},
		{
			title: "Visual Theme Builder",
			description:
				"Interactive interface for creating and managing custom design systems with automated CSS variable generation.",
			timestamp: "Mar 2025",
		},
		{
			title: "Enterprise Security",
			description:
				"Role-based access control, SOC2 compliance audit, and enhanced data encryption protocols.",
			timestamp: "Apr 2025",
		},
	];

	const sessions = [
		{
			title: "Current Session",
			location: "Sunrise Main",
			start: "2:28 PM",
			end: "Now",
			live: true,
		},
		{
			title: "Previous Session",
			location: "Sunrise Main",
			start: "1:30 PM",
			end: "1:33 PM",
			duration: "Duration: 2 min",
			live: false,
		},
	];

	const shipmentSteps: TimelineEntry[] = [
		{ title: "Placed", timestamp: "Jan 14", icon: Package },
		{ title: "Paid", timestamp: "Jan 14", icon: CreditCard },
		{ title: "Shipped", timestamp: "Jan 15", icon: Truck },
		{ title: "Delivered", timestamp: "Jan 17", icon: CheckCircle },
	];

	const avatarFeed: TimelineEntry[] = [
		{
			title: "Kath pushed 3 commits to feat/timekeeping-frontend-ui",
			timestamp: "12m ago",
		},
		{
			title: "Mara commented on PR #42",
			description: '"Nice catch on the selfie EXIF handling."',
			timestamp: "1h ago",
		},
		{
			title: "CI deployed build 142 to staging",
			timestamp: "2h ago",
			badge: { text: "deployed", color: "blue" },
		},
	];
	const avatarInitials = ["KR", "MJ", "CI"];

	const pipelineSteps: TimelineEntry[] = [
		{ title: "Build", timestamp: "41s", status: "completed", icon: Hammer },
		{
			title: "Test",
			timestamp: "2m 10s",
			status: "completed",
			icon: FlaskConical,
		},
		{ title: "Deploy to staging", status: "active" },
		{ title: "Release", status: "pending", icon: Rocket },
	];

	const deployments: TimelineEntry[] = [
		{
			title: "Deploy #142 — production",
			timestamp: "09:47",
			status: "completed",
		},
		{
			title: "Deploy #141 — staging",
			timestamp: "09:12",
			status: "completed",
		},
		{ title: "Deploy #140 — staging", timestamp: "08:55", status: "error" },
	];
	const deployLogs = [
		"→ build 142 · image sha-b20ffc4\n→ health check passed (12ms)\n→ traffic shifted 100%",
		"→ build 141 · image sha-1212bf1\n→ health check passed (18ms)\n→ traffic shifted 100%",
		"→ build 140 · image sha-a5a5a86\n✗ health check timed out after 30s\n→ rollback complete",
	];
</script>

<div class="container mx-auto max-w-4xl space-y-12 p-8">
	<div class="mb-10">
		<h1 class="mb-2 text-4xl font-bold">Timeline Component</h1>
		<p class="text-muted-foreground">
			A minimalist timeline — hollow ring or dotted markers, thin
			connectors, and typography-led content. Vertical by default, with
			horizontal and compact modes.
		</p>
	</div>

	<!-- ─── Minimalist default (timestamp on top) ──────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Minimalist (Default)</h2>
		<p class="text-sm text-muted-foreground">
			Hollow ring markers, a thin connector, and the timestamp as a small
			muted eyebrow above each title.
		</p>
		<Card title="Project Milestones" description="activeIndex highlights one">
			<Timeline activeIndex={2} items={roadmap} />
		</Card>
	</section>

	<!-- ─── Leading label (timestamp in a left gutter) ─────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Leading Label</h2>
		<p class="text-sm text-muted-foreground">
			<code>timePlacement="left"</code> moves the timestamp into a fixed
			gutter to the left of the marker.
		</p>
		<Card title="Feature Roadmap" description="Dates lead each row">
			<Timeline
				timePlacement="left"
				activeIndex={1}
				items={featureRoadmap}
			/>
		</Card>
	</section>

	<!-- ─── Dotted + dashed (session feed, ref 3) ──────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Dotted &amp; Dashed</h2>
		<p class="text-sm text-muted-foreground">
			<code>markerVariant="dot"</code> with <code>lineStyle="dashed"</code>
			— the live item is accented, the rest muted.
		</p>
		<Card title="Sessions" description="Compact activity feed">
			<Timeline
				markerVariant="dot"
				lineStyle="dashed"
				activeIndex={0}
				items={sessions}
			>
				{#snippet content({ item, index })}
					{@const session = sessions[index]}
					<div class="flex flex-col gap-0.5">
						<span class="text-sm font-medium">{item.title}</span>
						<span class="text-sm text-muted-foreground">
							{session.location}
						</span>
						<span class="text-sm text-muted-foreground">
							{session.start}
							<span class="px-1">→</span>
							<span
								class={session.live
									? "font-medium text-primary"
									: ""}
							>
								{session.end}
							</span>
						</span>
						{#if session.duration}
							<span class="text-xs text-muted-foreground">
								{session.duration}
							</span>
						{/if}
					</div>
				{/snippet}
			</Timeline>
		</Card>
	</section>

	<!-- ─── Progress with activeIndex ──────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Active Index</h2>
		<p class="text-sm text-muted-foreground">
			Items before the active one derive "completed", items after it
			"pending". Icons render inside the ring.
		</p>
		<Card title="Shipment Progress" description="Bound to activeIndex">
			<div class="space-y-6">
				<Timeline bind:activeIndex={progressIndex} items={shipmentSteps} />
				<div class="flex gap-2">
					<Button
						text="Back"
						variant="outline"
						size="sm"
						disabled={progressIndex <= 0}
						onclick={() => (progressIndex -= 1)}
					/>
					<Button
						text="Advance"
						size="sm"
						disabled={progressIndex >= shipmentSteps.length - 1}
						onclick={() => (progressIndex += 1)}
					/>
				</div>
			</div>
		</Card>
	</section>

	<!-- ─── Horizontal ─────────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Horizontal</h2>
		<Card title="Shipment Tracker" description="orientation='horizontal'">
			<Timeline
				orientation="horizontal"
				activeIndex={2}
				items={shipmentSteps}
			/>
		</Card>
	</section>

	<!-- ─── Compact ────────────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Compact</h2>
		<p class="text-sm text-muted-foreground">
			Smaller markers and tighter spacing for dense feeds.
		</p>
		<Card title="Activity" description="compact">
			<Timeline compact items={roadmap} />
		</Card>
	</section>

	<!-- ─── Clickable + keyboard ───────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Clickable</h2>
		<p class="text-sm text-muted-foreground">
			Tab into the timeline, then Arrow keys to move, Home/End to jump,
			Enter/Space to select.
		</p>
		<Card
			title="Keyboard-Friendly"
			description={`Selected step: ${clickIndex}`}
		>
			<Timeline
				clickable
				bind:activeIndex={clickIndex}
				items={shipmentSteps}
			/>
		</Card>
	</section>

	<!-- ─── Avatar markers (plain) ─────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Avatar Markers</h2>
		<p class="text-sm text-muted-foreground">
			<code>markerVariant="plain"</code> drops the ring so an
			<code>Avatar</code> becomes the marker.
		</p>
		<Card title="Activity Feed" description="Who did what, when">
			<Timeline markerVariant="plain" items={avatarFeed}>
				{#snippet icon({ index })}
					<Avatar size="xs" fallback={avatarInitials[index]} />
				{/snippet}
			</Timeline>
		</Card>
	</section>

	<!-- ─── Pipeline steps with spinner ────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Pipeline Steps</h2>
		<p class="text-sm text-muted-foreground">
			The running stage shows a <code>Spinner</code> via the
			<code>icon</code> snippet.
		</p>
		<Card title="Deploy Pipeline" description="build → test → deploy">
			<Timeline items={pipelineSteps}>
				{#snippet icon({ item, status })}
					{#if status === "active"}
						<Spinner class="size-3.5" />
					{:else if item.icon}
						{@const Icon = item.icon}
						<Icon class="size-3.5" />
					{/if}
				{/snippet}
			</Timeline>
		</Card>
	</section>

	<!-- ─── Collapsible deployment log ─────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Collapsible Content</h2>
		<p class="text-sm text-muted-foreground">
			The <code>content</code> snippet composes an Accordion so each
			deployment expands inline.
		</p>
		<Card title="Deployment Log" description="Expand a row for details">
			<Timeline items={deployments}>
				{#snippet content({ item, index })}
					<AccordionRoot type="single" class="w-full">
						<AccordionItem value="log" class="border-b-0">
							<AccordionTrigger class="py-1.5 text-sm">
								<span class="flex flex-wrap items-center gap-x-2">
									{item.title}
									<span class="text-xs text-muted-foreground">
										{item.timestamp}
									</span>
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<pre
									class="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">{deployLogs[
										index
									]}</pre>
							</AccordionContent>
						</AccordionItem>
					</AccordionRoot>
				{/snippet}
			</Timeline>
		</Card>
	</section>

	<!-- ─── Compact horizontal milestones ──────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Compact Horizontal Milestones</h2>
		<Card title="Release Train" description="compact + horizontal">
			<Timeline
				orientation="horizontal"
				compact
				activeIndex={2}
				items={[
					{ title: "v1.0", timestamp: "Mar" },
					{ title: "v1.1", timestamp: "May" },
					{ title: "v1.2", timestamp: "Jul" },
					{ title: "v2.0", timestamp: "Sep" },
				]}
			/>
		</Card>
	</section>

	<!-- ─── Primitive API ──────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Primitive API</h2>
		<p class="text-sm text-muted-foreground">
			<code>TimelineRoot</code> + <code>TimelineItem</code> for layouts
			the declarative props can't express.
		</p>
		<Card title="Composed" description="Per-item children">
			<TimelineRoot activeIndex={1}>
				<TimelineItem
					index={0}
					title="Account created"
					timestamp="Mon 9:00 AM"
					datetime="2026-01-12T09:00:00"
				>
					{#snippet icon()}
						<UserPlus class="size-3.5" />
					{/snippet}
				</TimelineItem>
				<TimelineItem index={1} title="Verification" badge="active">
					{#snippet icon()}
						<CheckCircle class="size-3.5" />
					{/snippet}
				</TimelineItem>
				<TimelineItem
					index={2}
					title="First payroll run"
					description="Scheduled for the 15th."
				/>
			</TimelineRoot>
		</Card>
	</section>
</div>
