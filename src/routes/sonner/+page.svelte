<script lang="ts">
	import { Toaster, toast } from "$lib/components/ui/sonner";
	import { Button } from "$lib/components/ui/button";
	import { Card } from "$lib/components/ui/card";
	import PartyPopperIcon from "@lucide/svelte/icons/party-popper";

	// The preview app's layout does not mount a Toaster — nothing else in the
	// app toasts — so each sonner route brings its own. One per route is fine:
	// only one is ever alive, and sonner's queue is module-level, so a toast
	// fired here survives the navigation to /sonner/variants and re-renders
	// under that page's Toaster config.

	let lastResult = $state("");

	const fakeSave = (): Promise<{ readonly name: string }> =>
		new Promise((resolve) => setTimeout(() => resolve({ name: "timesheet" }), 1600));

	const fakeFail = (): Promise<never> =>
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error("network unreachable")), 1600),
		);
</script>

<Toaster />

<div class="container mx-auto max-w-5xl space-y-12 p-8">
	<div class="mb-10">
		<h1 class="mb-2 text-4xl font-bold">Sonner Toast</h1>
		<p class="text-muted-foreground">
			Toast notifications built on <code>svelte-sonner</code>. Every colour
			here resolves from the token layer, so switching the theme picker in
			the nav restyles the toasts without re-firing them. See
			<a class="text-primary underline" href="/sonner/variants">variants</a>
			for the visual-style matrix.
		</p>
	</div>

	<!-- ─── Types ──────────────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Toast Types</h2>
		<p class="text-muted-foreground text-sm">
			Six types. Each maps to a semantic token — <code>--success</code>,
			<code>--destructive</code>, <code>--warning</code>, <code>--info</code>
			— rather than to sonner's own rich-colour palette.
		</p>
		<Card title="Types" description="One button per toast type">
			<div class="flex flex-wrap gap-3">
				<Button
					text="Default"
					variant="outline"
					onclick={() => toast("Shift saved to the draft schedule.")}
				/>
				<Button
					text="Success"
					variant="outline"
					onclick={() => toast.success("Timesheet approved.")}
				/>
				<Button
					text="Error"
					variant="outline"
					onclick={() => toast.error("Could not reach the payroll service.")}
				/>
				<Button
					text="Warning"
					variant="outline"
					onclick={() => toast.warning("This week is already published.")}
				/>
				<Button
					text="Info"
					variant="outline"
					onclick={() => toast.info("Payroll cut-off moves to Friday.")}
				/>
				<Button
					text="Loading"
					variant="outline"
					onclick={() => toast.loading("Recomputing hours…")}
				/>
			</div>
		</Card>
	</section>

	<!-- ─── Descriptions ───────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Descriptions</h2>
		<p class="text-muted-foreground text-sm">
			A second line for the detail that does not fit the title. Dimmed with
			<code>opacity-90</code> rather than re-coloured, so it tracks the
			toast's role colour the way <code>alert-description</code> does.
		</p>
		<Card title="Title + description">
			<div class="flex flex-wrap gap-3">
				<Button
					text="With description"
					variant="outline"
					onclick={() =>
						toast.success("Timesheet approved", {
							description: "Week of 24 Aug — 32 h regular, 4 h overtime.",
						})}
				/>
				<Button
					text="Long description"
					variant="outline"
					onclick={() =>
						toast.error("Correction rejected", {
							description:
								"The pay period it belongs to was locked on 22 Aug. Reopen the period, or file the correction against the current one.",
						})}
				/>
			</div>
		</Card>
	</section>

	<!-- ─── Action buttons ─────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Action &amp; Cancel</h2>
		<p class="text-muted-foreground text-sm">
			Up to two buttons per toast. The last one clicked shows below.
		</p>
		<Card title="Buttons">
			<div class="flex flex-wrap gap-3">
				<Button
					text="Action"
					variant="outline"
					onclick={() =>
						toast("Shift deleted", {
							action: {
								label: "Undo",
								onClick: () => {
									lastResult = "Undo clicked";
								},
							},
						})}
				/>
				<Button
					text="Action + cancel"
					variant="outline"
					onclick={() =>
						toast.warning("Publish this week?", {
							description: "12 employees will be notified.",
							duration: 10_000,
							action: {
								label: "Publish",
								onClick: () => {
									lastResult = "Publish clicked";
								},
							},
							cancel: {
								label: "Cancel",
								onClick: () => {
									lastResult = "Cancel clicked";
								},
							},
						})}
				/>
			</div>
			{#if lastResult}
				<p class="text-muted-foreground mt-4 text-sm">
					Last button: <span class="text-foreground font-medium"
						>{lastResult}</span
					>
				</p>
			{/if}
		</Card>
	</section>

	<!-- ─── Promise ────────────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Promise</h2>
		<p class="text-muted-foreground text-sm">
			One toast that walks loading → success or error as the promise
			settles. Each takes ~1.6 s.
		</p>
		<Card title="Promise toasts">
			<div class="flex flex-wrap gap-3">
				<Button
					text="Resolves"
					variant="outline"
					onclick={() =>
						toast.promise(fakeSave, {
							loading: "Saving timesheet…",
							success: (data) => `Saved ${data.name}.`,
							error: "Save failed.",
						})}
				/>
				<Button
					text="Rejects"
					variant="outline"
					onclick={() =>
						toast.promise(fakeFail, {
							loading: "Submitting to payroll…",
							success: "Submitted.",
							error: (cause) =>
								`Submit failed: ${cause instanceof Error ? cause.message : "unknown"}`,
						})}
				/>
			</div>
		</Card>
	</section>

	<!-- ─── Duration & dismissal ───────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Duration &amp; Dismissal</h2>
		<p class="text-muted-foreground text-sm">
			<code>duration: 0</code> pins a toast open — pair it with an id so
			something can dismiss it later.
		</p>
		<Card title="Lifetime">
			<div class="flex flex-wrap gap-3">
				<Button
					text="1 second"
					variant="outline"
					onclick={() => toast.info("Gone in a second.", { duration: 1000 })}
				/>
				<Button
					text="Sticky (never closes)"
					variant="outline"
					onclick={() =>
						toast.warning("Pinned until dismissed.", {
							id: "sticky-demo",
							duration: 0,
						})}
				/>
				<Button
					text="Dismiss the sticky one"
					variant="secondary"
					onclick={() => toast.dismiss("sticky-demo")}
				/>
				<Button
					text="Dismiss all"
					variant="destructive"
					onclick={() => toast.dismiss()}
				/>
			</div>
		</Card>
	</section>

	<!-- ─── Custom icon ────────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Custom Icon</h2>
		<p class="text-muted-foreground text-sm">
			Pass any Svelte component as <code>icon</code> to replace the
			per-type default.
		</p>
		<Card title="Per-toast icon">
			<Button
				text="Celebrate"
				variant="outline"
				icon={PartyPopperIcon}
				onclick={() =>
					toast.success("Payroll run finished", {
						description: "142 payslips generated.",
						icon: PartyPopperIcon,
					})}
			/>
		</Card>
	</section>

	<!-- ─── Stacking ───────────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Stacking</h2>
		<p class="text-muted-foreground text-sm">
			Three visible by default; the rest queue behind. Hover the stack to
			expand it.
		</p>
		<Card title="Queue">
			<Button
				text="Fire six at once"
				variant="outline"
				onclick={() => {
					toast("First");
					toast.success("Second");
					toast.info("Third");
					toast.warning("Fourth");
					toast.error("Fifth");
					toast("Sixth");
				}}
			/>
		</Card>
	</section>
</div>
