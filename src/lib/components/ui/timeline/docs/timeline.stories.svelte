<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		Timeline,
		TimelineItem,
		TimelineRoot,
		type TimelineEntry,
	} from "../index.js";
	import { Avatar } from "../../avatar/index.js";
	import { Spinner } from "../../spinner/index.js";
	import {
		AccordionContent,
		AccordionItem,
		AccordionRoot,
		AccordionTrigger,
	} from "../../accordion/index.js";
	import { fn } from "storybook/test";
	import {
		CheckCircle,
		CreditCard,
		FlaskConical,
		GitCommit,
		Hammer,
		Package,
		Rocket,
		Truck,
		UserPlus,
	} from "@lucide/svelte";
	import { type Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/Timeline",
		component: Timeline,
		tags: ["autodocs"],
		argTypes: {
			orientation: {
				control: { type: "select" },
				options: ["vertical", "horizontal"],
				description: "Layout orientation of the timeline",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "vertical" },
				},
			},
			compact: {
				control: { type: "boolean" },
				description: "Tighter spacing, smaller markers and text",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			markerVariant: {
				control: { type: "select" },
				options: ["ring", "dot", "plain"],
				description:
					"Marker shape: hollow ring, small solid dot, or unstyled (for avatars)",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "ring" },
				},
			},
			lineStyle: {
				control: { type: "select" },
				options: ["solid", "dashed"],
				description: "Connector line style",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "solid" },
				},
			},
			timePlacement: {
				control: { type: "select" },
				options: ["top", "left", "inline"],
				description:
					"Timestamp position: eyebrow above the title, left gutter, or inline",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "top" },
				},
			},
			activeIndex: {
				control: { type: "number" },
				description:
					"Highlighted item (0-based). Items before it read completed, after it pending. -1 renders a neutral history feed.",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "-1" },
				},
			},
			clickable: {
				control: { type: "boolean" },
				description:
					"Markers become focusable buttons with arrow-key navigation",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			onItemClick: {
				control: false,
				table: { disable: true },
			},
			items: {
				control: false,
				table: { disable: true },
			},
			icon: {
				control: false,
				table: { disable: true },
			},
			content: {
				control: false,
				table: { disable: true },
			},
			children: {
				control: false,
				table: { disable: true },
			},
			ref: {
				control: false,
				table: { disable: true },
			},
			class: {
				control: false,
				table: { disable: true },
			},
		},
		args: {
			onItemClick: fn(),
		},
	});

	const historyItems = [
		{
			title: "Order placed",
			description: "Order #ORD-12345 confirmed and queued.",
			timestamp: "Jan 14, 10:30 AM",
			datetime: "2026-01-14T10:30:00",
		},
		{
			title: "Payment received",
			description: "Visa ending in 4242 charged $128.00.",
			timestamp: "Jan 14, 10:31 AM",
			datetime: "2026-01-14T10:31:00",
		},
		{
			title: "Shipped",
			description: "Handed to carrier — tracking #1Z999AA1.",
			timestamp: "Jan 15, 8:12 AM",
			datetime: "2026-01-15T08:12:00",
		},
	];

	const progressItems = [
		{ title: "Order placed", timestamp: "Jan 14" },
		{ title: "Processing", timestamp: "Jan 14" },
		{ title: "Shipped", timestamp: "Jan 15" },
		{ title: "Delivered", timestamp: "Jan 17" },
	];

	// ─── reui.io-inspired example data ───────────────────────────────────────

	const roadmapItems: TimelineEntry[] = [
		{
			title: "Design system foundations",
			description: "Tokens, primitives, dark mode.",
			timestamp: "Q1",
			status: "completed",
			badge: { text: "shipped", color: "green" },
		},
		{
			title: "Timekeeping UI",
			description: "Offline-capable attendance capture.",
			timestamp: "Q2",
			status: "completed",
			badge: { text: "shipped", color: "green" },
		},
		{
			title: "Payroll engine",
			description: "Calculation runs and payslip generation.",
			timestamp: "Q3",
			status: "active",
			badge: { text: "in progress", color: "primary" },
		},
		{
			title: "Self-service portal",
			description: "Employee-facing payslips and leave.",
			timestamp: "Q4",
			status: "pending",
			badge: "planned",
		},
	];

	const gitActivity: TimelineEntry[] = [
		{
			title: "feat(timekeeping-ui): offline attendance capture",
			description: "b20ffc4",
			timestamp: "2h ago",
		},
		{
			title: "Merge pull request #42 from feat/pwa",
			description: "1212bf1",
			timestamp: "5h ago",
		},
		{
			title: "fix(badge): primary color variant contrast",
			description: "b56a759",
			timestamp: "1d ago",
		},
	];
	const gitAuthors = ["KR", "MJ", "TS"];

	const pipelineItems: TimelineEntry[] = [
		{
			title: "Build",
			timestamp: "41s",
			status: "completed",
			badge: "passed",
			icon: Hammer,
		},
		{
			title: "Test",
			timestamp: "2m 10s",
			status: "completed",
			badge: { text: "312 passed", color: "green" },
			icon: FlaskConical,
		},
		{
			title: "Deploy to staging",
			status: "active",
			badge: { text: "running", variant: "outline" },
		},
		{
			title: "Release",
			status: "pending",
			badge: "queued",
			icon: Rocket,
		},
	];

	const feedItems: TimelineEntry[] = [
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
	const feedAvatars = ["KR", "MJ", "CI"];

	const deployItems: TimelineEntry[] = [
		{
			title: "Deploy #142 — production",
			timestamp: "09:47",
			status: "completed",
			badge: { text: "success", color: "green" },
		},
		{
			title: "Deploy #141 — staging",
			timestamp: "09:12",
			status: "completed",
			badge: { text: "success", color: "green" },
		},
		{
			title: "Deploy #140 — staging",
			timestamp: "08:55",
			status: "error",
			badge: "failed",
		},
	];
	const deployLogs = [
		"→ build 142 · image sha-b20ffc4\n→ health check passed (12ms)\n→ traffic shifted 100%",
		"→ build 141 · image sha-1212bf1\n→ health check passed (18ms)\n→ traffic shifted 100%",
		"→ build 140 · image sha-a5a5a86\n✗ health check timed out after 30s\n→ rollback complete",
	];

	const milestoneItems: TimelineEntry[] = [
		{ title: "v1.0", timestamp: "Mar" },
		{ title: "v1.1", timestamp: "May" },
		{ title: "v1.2", timestamp: "Jul" },
		{ title: "v2.0", timestamp: "Sep" },
	];
</script>

<Story name="Default">
	{#snippet template(args: Args)}
		<Timeline {...args} items={historyItems} />
	{/snippet}
</Story>

<Story name="With Active Index">
	{#snippet template(args: Args)}
		<Timeline {...args} activeIndex={2} items={progressItems} />
	{/snippet}
</Story>

<Story name="Horizontal">
	{#snippet template(args: Args)}
		<Timeline
			{...args}
			orientation="horizontal"
			activeIndex={1}
			items={progressItems}
		/>
	{/snippet}
</Story>

<Story name="Compact">
	{#snippet template(args: Args)}
		<Timeline {...args} compact items={historyItems} />
	{/snippet}
</Story>

<Story name="Leading Label">
	{#snippet template(args: Args)}
		<Timeline
			{...args}
			timePlacement="left"
			activeIndex={1}
			items={roadmapItems}
		/>
	{/snippet}
</Story>

<Story name="Dotted and Dashed">
	{#snippet template(args: Args)}
		<Timeline
			{...args}
			markerVariant="dot"
			lineStyle="dashed"
			activeIndex={0}
			items={[
				{
					title: "Current Session",
					description: "Sunrise Main · 2:28 PM → Now",
					timestamp: "Now",
				},
				{
					title: "Previous Session",
					description: "Sunrise Main · 1:30 PM → 1:33 PM",
					timestamp: "1:33 PM",
				},
			]}
		/>
	{/snippet}
</Story>

<Story name="With Status Badges">
	{#snippet template(args: Args)}
		<Timeline
			{...args}
			activeIndex={2}
			items={[
				{
					title: "Build",
					timestamp: "09:41",
					badge: "passed",
				},
				{
					title: "Tests",
					timestamp: "09:44",
					badge: { text: "312 passed", color: "green" },
				},
				{
					title: "Deploy to staging",
					timestamp: "09:47",
					badge: { text: "running", variant: "outline" },
				},
				{
					title: "Deploy to production",
					badge: "queued",
				},
			]}
		/>
	{/snippet}
</Story>

<Story name="With Icons">
	{#snippet template(args: Args)}
		<Timeline
			{...args}
			activeIndex={2}
			items={[
				{
					title: "Account created",
					description: "Welcome aboard!",
					timestamp: "Mon",
					icon: UserPlus,
				},
				{
					title: "Payment added",
					description: "Visa ending in 4242.",
					timestamp: "Tue",
					icon: CreditCard,
				},
				{
					title: "First order",
					description: "Order #1 is on its way.",
					timestamp: "Wed",
					icon: Package,
				},
				{
					title: "Delivered",
					timestamp: "Fri",
					icon: CheckCircle,
				},
			]}
		/>
	{/snippet}
</Story>

<Story name="Error State">
	{#snippet template(args: Args)}
		<Timeline
			{...args}
			activeIndex={2}
			items={[
				{ title: "Build", timestamp: "09:41" },
				{
					title: "Tests failed",
					description: "3 assertions failed in payroll.test.ts.",
					timestamp: "09:44",
					status: "error",
					badge: "failed",
				},
				{ title: "Deploy", timestamp: "—" },
			]}
		/>
	{/snippet}
</Story>

<Story name="Clickable (Keyboard Navigation)">
	{#snippet template(args: Args)}
		<Timeline
			{...args}
			clickable
			activeIndex={1}
			items={progressItems}
		/>
	{/snippet}
</Story>

<Story name="Custom Icon Snippet">
	{#snippet template(args: Args)}
		<Timeline {...args} activeIndex={1} items={progressItems}>
			{#snippet icon({ status })}
				{#if status === "completed"}
					<CheckCircle class="size-4" />
				{:else}
					<GitCommit class="size-4" />
				{/if}
			{/snippet}
		</Timeline>
	{/snippet}
</Story>

<Story name="Custom Content Snippet">
	{#snippet template(args: Args)}
		<Timeline {...args} items={historyItems}>
			{#snippet content({ item, index })}
				<div class="space-y-1 rounded-lg border bg-card p-3">
					<div class="flex items-center gap-2">
						<span class="text-sm font-semibold">{item.title}</span>
						<span class="ms-auto text-xs text-muted-foreground">
							#{index + 1} · {item.timestamp}
						</span>
					</div>
					{#if item.description}
						<p class="text-sm text-muted-foreground">
							{item.description}
						</p>
					{/if}
				</div>
			{/snippet}
		</Timeline>
	{/snippet}
</Story>

<Story name="Primitive Composition">
	{#snippet template(args: Args)}
		<TimelineRoot {...args} activeIndex={1}>
			<TimelineItem
				index={0}
				title="Shipment picked up"
				timestamp="Jan 15, 8:12 AM"
				datetime="2026-01-15T08:12:00"
			>
				{#snippet icon()}
					<Truck class="size-4" />
				{/snippet}
			</TimelineItem>
			<TimelineItem index={1} title="In transit" badge="tracking">
				{#snippet icon()}
					<Rocket class="size-4" />
				{/snippet}
			</TimelineItem>
			<TimelineItem
				index={2}
				title="Delivery"
				description="Estimated Jan 17."
			/>
		</TimelineRoot>
	{/snippet}
</Story>

<Story name="Roadmap">
	{#snippet template(args: Args)}
		<Timeline {...args} items={roadmapItems} />
	{/snippet}
</Story>

<Story name="Git Activity">
	{#snippet template(args: Args)}
		<Timeline {...args} markerVariant="plain" items={gitActivity}>
			{#snippet icon({ index })}
				<Avatar size="xs" fallback={gitAuthors[index]} />
			{/snippet}
			{#snippet content({ item })}
				<div class="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
					<GitCommit class="size-3.5 text-muted-foreground" />
					<span class="text-sm font-medium">{item.title}</span>
					<code
						class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs"
					>
						{item.description}
					</code>
					<span class="ms-auto text-xs text-muted-foreground">
						{item.timestamp}
					</span>
				</div>
			{/snippet}
		</Timeline>
	{/snippet}
</Story>

<Story name="Pipeline Steps">
	{#snippet template(args: Args)}
		<Timeline {...args} items={pipelineItems}>
			{#snippet icon({ item, status })}
				{#if status === "active"}
					<Spinner class="size-3.5" />
				{:else if item.icon}
					{@const Icon = item.icon}
					<Icon class="size-3.5" />
				{/if}
			{/snippet}
		</Timeline>
	{/snippet}
</Story>

<Story name="Activity Feed">
	{#snippet template(args: Args)}
		<Timeline {...args} markerVariant="plain" items={feedItems}>
			{#snippet icon({ index })}
				<Avatar size="xs" fallback={feedAvatars[index]} />
			{/snippet}
		</Timeline>
	{/snippet}
</Story>

<Story name="Deployment Log (Collapsible)">
	{#snippet template(args: Args)}
		<Timeline {...args} items={deployItems}>
			{#snippet content({ item, index })}
				<AccordionRoot type="single" class="w-full">
					<AccordionItem value="log" class="border-b-0">
						<AccordionTrigger class="py-1.5 text-sm">
							<span
								class="flex flex-wrap items-center gap-x-2"
							>
								{item.title}
								<span
									class="text-xs text-muted-foreground"
								>
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
	{/snippet}
</Story>

<Story name="Horizontal Compact Milestones">
	{#snippet template(args: Args)}
		<Timeline
			{...args}
			orientation="horizontal"
			compact
			activeIndex={2}
			items={milestoneItems}
		/>
	{/snippet}
</Story>
