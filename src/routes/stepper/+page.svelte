<script lang="ts">
	import {
		Stepper,
		StepperStep,
		StepperSeparator,
	} from "$lib/components/ui/stepper";
	import { Card } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import {
		CheckCircle,
		CreditCard,
		ShoppingCart,
		FileText,
		Truck,
		User,
	} from "@lucide/svelte";

	let activeStep = $state(1);
	let verticalStep = $state(1);
	let xsStep = $state(1);
	let smStep = $state(1);
	let lgStep = $state(1);
	let outlineStep = $state(1);
	let ghostStep = $state(1);
	let flatStep = $state(1);
	let checkoutStep = $state(0);
	let scrollStep = $state(1);
	let wizardStep = $state(0);
	let customSizeStep = $state(1);
	let noScaleStep = $state(1);
	let circularStep = $state(0);
	let circularAlwaysStep = $state(1);
	let circularLargeStep = $state(0);
	let circularIconStep = $state(1);

	const handleStepClick = (step: number) => {
		activeStep = step;
	};
</script>

<div class="container mx-auto p-8 space-y-12 max-w-5xl">
	<div class="mb-10">
		<h1 class="text-4xl font-bold mb-2">Stepper Component</h1>
		<p class="text-muted-foreground">
			Fully responsive multi-step progress indicator. Resize the browser
			to see mobile and tablet behavior.
		</p>
	</div>

	<!-- ─── Horizontal Default ─────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Horizontal (Default)</h2>
		<p class="text-sm text-muted-foreground">
			On mobile (&lt;640px) automatically switches to vertical layout via <code
				>mobileLayout="vertical"</code
			> (default).
		</p>
		<Card
			title="Clickable Horizontal Stepper"
			description="Click steps to navigate — switches to vertical on mobile"
		>
			<div class="space-y-4">
				<Stepper {activeStep} onStepClick={handleStepClick} clickable>
					<StepperStep
						step={0}
						label="Account"
						description="Create account"
					/>
					<StepperSeparator completed={activeStep > 0} />
					<StepperStep
						step={1}
						label="Profile"
						description="Complete profile"
					/>
					<StepperSeparator completed={activeStep > 1} />
					<StepperStep
						step={2}
						label="Billing"
						description="Add payment"
					/>
					<StepperSeparator completed={activeStep > 2} />
					<StepperStep step={3} label="Finish" description="Review" />
				</Stepper>
				<p class="text-sm text-muted-foreground">
					Active step: {activeStep + 1} of 4
				</p>
			</div>
		</Card>
	</section>

	<!-- ─── Responsive: Scroll on mobile ──────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Scroll on Mobile</h2>
		<p class="text-sm text-muted-foreground">
			<code>mobileLayout="scroll"</code> — stays horizontal on all screen
			sizes with overflow-x scroll on mobile.
			<code>hideDescriptionOnMobile</code> hides descriptions to save space.
		</p>
		<Card
			title="Horizontal Scroll Mode"
			description="Swipe horizontally on mobile — 5 steps without overflow"
		>
			<div class="space-y-4">
				<Stepper
					bind:activeStep={scrollStep}
					clickable
					mobileLayout="scroll"
					hideDescriptionOnMobile
				>
					<StepperStep
						step={0}
						label="Cart"
						description="Review your items"
					/>
					<StepperSeparator completed={scrollStep > 0} />
					<StepperStep
						step={1}
						label="Shipping"
						description="Enter your address"
					/>
					<StepperSeparator completed={scrollStep > 1} />
					<StepperStep
						step={2}
						label="Payment"
						description="Add payment method"
					/>
					<StepperSeparator completed={scrollStep > 2} />
					<StepperStep
						step={3}
						label="Confirm"
						description="Review and place order"
					/>
					<StepperSeparator completed={scrollStep > 3} />
					<StepperStep
						step={4}
						label="Done"
						description="Order confirmed"
					/>
				</Stepper>
				<div class="flex gap-2">
					<Button
						variant="outline"
						disabled={scrollStep === 0}
						onclick={() => scrollStep--}>Previous</Button
					>
					<Button
						disabled={scrollStep === 4}
						onclick={() => scrollStep++}>Next</Button
					>
				</div>
			</div>
		</Card>
	</section>

	<!-- ─── Animated connector demo ────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Animated Connector</h2>
		<p class="text-sm text-muted-foreground">
			Connector line fills left-to-right (horizontal) or top-to-bottom
			(vertical) with a smooth 500ms animation.
		</p>
		<Card
			title="Animated Progress Fill"
			description="Advance steps to watch the connector animate"
		>
			<div class="space-y-4">
				<Stepper
					bind:activeStep={wizardStep}
					orientation="vertical"
					clickable
					size="sm"
					variant="outline"
				>
					<StepperStep
						step={0}
						label="Start"
						description="Begin the process"
					>
						{#snippet icon()}<FileText class="size-4" />{/snippet}
					</StepperStep>
					<StepperSeparator completed={wizardStep > 0} />
					<StepperStep
						step={1}
						label="Review"
						description="Check your details"
					>
						{#snippet icon()}<User class="size-4" />{/snippet}
					</StepperStep>
					<StepperSeparator completed={wizardStep > 1} />
					<StepperStep
						step={2}
						label="Payment"
						description="Enter payment info"
					>
						{#snippet icon()}<CreditCard class="size-4" />{/snippet}
					</StepperStep>
					<StepperSeparator completed={wizardStep > 2} />
					<StepperStep
						step={3}
						label="Done"
						description="All finished!"
					>
						{#snippet icon()}<CheckCircle
								class="size-4"
							/>{/snippet}
					</StepperStep>
				</Stepper>
				<div class="flex gap-2">
					<Button
						variant="outline"
						disabled={wizardStep === 0}
						onclick={() => wizardStep--}>Back</Button
					>
					<Button
						disabled={wizardStep === 3}
						onclick={() => wizardStep++}
					>
						{wizardStep === 2 ? "Complete" : "Next"}
					</Button>
				</div>
			</div>
		</Card>
	</section>

	<!-- ─── Vertical Stepper ───────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Vertical Stepper</h2>
		<p class="text-sm text-muted-foreground">
			Always vertical — animated connector fills top-to-bottom.
		</p>
		<Card
			title="Vertical Layout"
			description="Steps stacked with animated separator"
		>
			<Stepper
				orientation="vertical"
				bind:activeStep={verticalStep}
				clickable
			>
				<StepperStep
					step={0}
					label="Personal Information"
					description="Enter your name and email"
				>
					<div class="text-sm text-muted-foreground mt-2">
						Step 0 content area
					</div>
				</StepperStep>
				<StepperSeparator completed={verticalStep > 0} />
				<StepperStep
					step={1}
					label="Address Details"
					description="Provide your address"
				>
					<div class="text-sm text-muted-foreground mt-2">
						Step 1 content area
					</div>
				</StepperStep>
				<StepperSeparator completed={verticalStep > 1} />
				<StepperStep
					step={2}
					label="Review"
					description="Check everything before submitting"
				>
					<div class="text-sm text-muted-foreground mt-2">
						Step 2 content area
					</div>
				</StepperStep>
			</Stepper>
		</Card>
	</section>

	<!-- ─── Size Variants ──────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Sizes</h2>
		<p class="text-sm text-muted-foreground">
			<code>default</code> and <code>lg</code> sizes automatically scale down
			one step on tablet (≤768px).
		</p>
		<div class="space-y-6">
			<Card
				title="Extra Small (xs)"
				description="24px buttons — no responsive scale-down"
			>
				<Stepper size="xs" bind:activeStep={xsStep} clickable>
					<StepperStep step={0} label="Step 1" />
					<StepperSeparator completed={xsStep > 0} />
					<StepperStep step={1} label="Step 2" />
					<StepperSeparator completed={xsStep > 1} />
					<StepperStep step={2} label="Step 3" />
				</Stepper>
			</Card>

			<Card
				title="Small (sm)"
				description="32px buttons — no responsive scale-down"
			>
				<Stepper size="sm" bind:activeStep={smStep} clickable>
					<StepperStep
						step={0}
						label="Step 1"
						description="Description"
					/>
					<StepperSeparator completed={smStep > 0} />
					<StepperStep
						step={1}
						label="Step 2"
						description="Description"
					/>
					<StepperSeparator completed={smStep > 1} />
					<StepperStep
						step={2}
						label="Step 3"
						description="Description"
					/>
				</Stepper>
			</Card>

			<Card
				title="Large (lg)"
				description="48px buttons → scales to 40px (default) on tablet"
			>
				<Stepper size="lg" bind:activeStep={lgStep} clickable>
					<StepperStep
						step={0}
						label="Step 1"
						description="Description text"
					/>
					<StepperSeparator completed={lgStep > 0} />
					<StepperStep
						step={1}
						label="Step 2"
						description="Description text"
					/>
					<StepperSeparator completed={lgStep > 1} />
					<StepperStep
						step={2}
						label="Step 3"
						description="Description text"
					/>
				</Stepper>
			</Card>
		</div>
	</section>

	<!-- ─── Visual Variants ─────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Visual Variants</h2>
		<div class="space-y-6">
			<Card
				title="Outline"
				description="Border-only active/completed style"
			>
				<Stepper
					variant="outline"
					bind:activeStep={outlineStep}
					clickable
				>
					<StepperStep
						step={0}
						label="Design"
						description="Define the scope"
					/>
					<StepperSeparator completed={outlineStep > 0} />
					<StepperStep
						step={1}
						label="Develop"
						description="Build the feature"
					/>
					<StepperSeparator completed={outlineStep > 1} />
					<StepperStep
						step={2}
						label="Deploy"
						description="Ship to production"
					/>
				</Stepper>
			</Card>

			<Card title="Ghost" description="Subtle background without border">
				<Stepper variant="ghost" bind:activeStep={ghostStep} clickable>
					<StepperStep step={0} label="Plan" description="Strategy" />
					<StepperSeparator completed={ghostStep > 0} />
					<StepperStep
						step={1}
						label="Create"
						description="Execution"
					/>
					<StepperSeparator completed={ghostStep > 1} />
					<StepperStep
						step={2}
						label="Launch"
						description="Go live"
					/>
				</Stepper>
			</Card>

			<Card
				title="Flat"
				description="Progress bar style — horizontal only"
			>
				<div class="pt-10">
					<Stepper
						variant="flat"
						bind:activeStep={flatStep}
						clickable
					>
						<StepperStep
							step={0}
							label="Step 1"
							description="Pending"
						/>
						<StepperStep
							step={1}
							label="Step 2"
							description="Active"
						/>
						<StepperStep
							step={2}
							label="Step 3"
							description="Pending"
						/>
						<StepperStep
							step={3}
							label="Complete"
							description="Done"
						/>
					</Stepper>
				</div>
			</Card>
		</div>
	</section>

	<!-- ─── With Icons ─────────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">With Custom Icons</h2>
		<Card
			title="Checkout Flow"
			description="Custom Lucide icons — switches to vertical on mobile"
		>
			<div class="space-y-4">
				<Stepper bind:activeStep={checkoutStep} clickable>
					<StepperStep
						step={0}
						label="Cart"
						description="Review items"
					>
						{#snippet icon()}<ShoppingCart
								class="size-4"
							/>{/snippet}
					</StepperStep>
					<StepperSeparator completed={checkoutStep > 0} />
					<StepperStep
						step={1}
						label="Shipping"
						description="Enter address"
					>
						{#snippet icon()}<Truck class="size-4" />{/snippet}
					</StepperStep>
					<StepperSeparator completed={checkoutStep > 1} />
					<StepperStep
						step={2}
						label="Payment"
						description="Add card"
					>
						{#snippet icon()}<CreditCard class="size-4" />{/snippet}
					</StepperStep>
					<StepperSeparator completed={checkoutStep > 2} />
					<StepperStep
						step={3}
						label="Confirm"
						description="Place order"
					>
						{#snippet icon()}<CheckCircle
								class="size-4"
							/>{/snippet}
					</StepperStep>
				</Stepper>
				<div class="flex gap-2">
					<Button
						variant="outline"
						disabled={checkoutStep === 0}
						onclick={() => checkoutStep--}>Previous</Button
					>
					<Button
						disabled={checkoutStep === 3}
						onclick={() => checkoutStep++}>Next</Button
					>
				</div>
			</div>
		</Card>
	</section>

	<!-- ─── Circular Progress Mode ────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Circular Progress Mode</h2>
		<p class="text-sm text-muted-foreground">
			<code>mobileLayout="circular"</code> — below <code>md</code> (768px)
			the step list is replaced by a radial progress ring. Desktop stays horizontal.
			Resize the browser to see the switch.
		</p>
		<div class="space-y-6">
			<Card
				title="Basic Circular (resize to see)"
				description="Switches to ring below md breakpoint"
			>
				<div class="space-y-4">
					<Stepper
						bind:activeStep={circularStep}
						clickable
						mobileLayout="circular"
					>
						<StepperStep
							step={0}
							label="Account"
							description="Create your account"
						/>
						<StepperSeparator completed={circularStep > 0} />
						<StepperStep
							step={1}
							label="Profile"
							description="Complete your profile"
						/>
						<StepperSeparator completed={circularStep > 1} />
						<StepperStep
							step={2}
							label="Billing"
							description="Add a payment method"
						/>
						<StepperSeparator completed={circularStep > 2} />
						<StepperStep
							step={3}
							label="Review"
							description="Confirm your details"
						/>
						<StepperSeparator completed={circularStep > 3} />
						<StepperStep
							step={4}
							label="Done"
							description="All set!"
						/>
					</Stepper>
					<p class="text-sm text-muted-foreground">
						Step {circularStep + 1} of 5
					</p>
				</div>
			</Card>

			<Card
				title="Circular Always (desktop preview)"
				description="circularAlways — ring visible at all breakpoints"
			>
				<div class="space-y-4">
					<Stepper
						bind:activeStep={circularAlwaysStep}
						clickable
						mobileLayout="circular"
						circularAlways
					>
						<StepperStep
							step={0}
							label="Plan"
							description="Define scope"
						/>
						<StepperSeparator completed={circularAlwaysStep > 0} />
						<StepperStep
							step={1}
							label="Build"
							description="Implement features"
						/>
						<StepperSeparator completed={circularAlwaysStep > 1} />
						<StepperStep
							step={2}
							label="Test"
							description="QA and review"
						/>
						<StepperSeparator completed={circularAlwaysStep > 2} />
						<StepperStep
							step={3}
							label="Ship"
							description="Deploy to production"
						/>
					</Stepper>
				</div>
			</Card>

			<Card
				title="Large Ring (circularSize=200)"
				description="Custom ring diameter — all measurements scale"
			>
				<div class="space-y-4">
					<Stepper
						bind:activeStep={circularLargeStep}
						clickable
						mobileLayout="circular"
						circularAlways
						circularSize={200}
					>
						<StepperStep
							step={0}
							label="Research"
							description="Gather requirements"
						/>
						<StepperSeparator completed={circularLargeStep > 0} />
						<StepperStep
							step={1}
							label="Design"
							description="Create wireframes"
						/>
						<StepperSeparator completed={circularLargeStep > 1} />
						<StepperStep
							step={2}
							label="Implement"
							description="Write the code"
						/>
						<StepperSeparator completed={circularLargeStep > 2} />
						<StepperStep
							step={3}
							label="Launch"
							description="Go live 🚀"
						/>
					</Stepper>
				</div>
			</Card>

			<Card
				title="With Custom Icons + Circular"
				description="Icons appear in the drawer list (circular), ring shows on mobile"
			>
				<div class="space-y-4">
					<Stepper
						bind:activeStep={circularIconStep}
						clickable
						mobileLayout="circular"
						circularAlways
						circularSize={140}
					>
						<StepperStep
							step={0}
							label="Cart"
							description="Review items"
						>
							{#snippet icon()}<ShoppingCart
									class="size-4"
								/>{/snippet}
						</StepperStep>
						<StepperSeparator completed={circularIconStep > 0} />
						<StepperStep
							step={1}
							label="Payment"
							description="Enter card details"
						>
							{#snippet icon()}<CreditCard
									class="size-4"
								/>{/snippet}
						</StepperStep>
						<StepperSeparator completed={circularIconStep > 1} />
						<StepperStep
							step={2}
							label="Confirm"
							description="Place order"
						>
							{#snippet icon()}<CheckCircle
									class="size-4"
								/>{/snippet}
						</StepperStep>
					</Stepper>
				</div>
			</Card>

			<Card
				title="Non-expandable Ring"
				description="circularExpandable=false — no drawer on click"
			>
				<Stepper
					bind:activeStep={circularAlwaysStep}
					mobileLayout="circular"
					circularAlways
					circularExpandable={false}
				>
					<StepperStep
						step={0}
						label="Step 1"
						description="First step"
					/>
					<StepperSeparator completed={circularAlwaysStep > 0} />
					<StepperStep
						step={1}
						label="Step 2"
						description="Second step"
					/>
					<StepperSeparator completed={circularAlwaysStep > 1} />
					<StepperStep
						step={2}
						label="Step 3"
						description="Third step"
					/>
					<StepperSeparator completed={circularAlwaysStep > 2} />
					<StepperStep
						step={3}
						label="Step 4"
						description="Final step"
					/>
				</Stepper>
			</Card>
		</div>
	</section>

	<!-- ─── Custom Indicator Size ──────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Custom Indicator Size</h2>
		<p class="text-sm text-muted-foreground">
			<code>indicatorSize</code> overrides the circle diameter in pixels. Font,
			icon, and connector thickness scale proportionally.
		</p>
		<div class="space-y-6">
			<Card
				title="20px Indicator"
				description="Smaller than xs — pixel override (indicatorSize=20)"
			>
				<Stepper
					bind:activeStep={customSizeStep}
					clickable
					indicatorSize={20}
				>
					<StepperStep
						step={0}
						label="Tiny Step 1"
						description="20px indicator"
					/>
					<StepperSeparator completed={customSizeStep > 0} />
					<StepperStep
						step={1}
						label="Tiny Step 2"
						description="Custom size"
					/>
					<StepperSeparator completed={customSizeStep > 1} />
					<StepperStep
						step={2}
						label="Tiny Step 3"
						description="Pixel perfect"
					/>
				</Stepper>
			</Card>

			<Card
				title="56px Indicator"
				description="Larger than lg — pixel override (indicatorSize=56)"
			>
				<Stepper
					bind:activeStep={customSizeStep}
					clickable
					indicatorSize={56}
				>
					<StepperStep
						step={0}
						label="Large Step 1"
						description="56px indicator"
					/>
					<StepperSeparator completed={customSizeStep > 0} />
					<StepperStep
						step={1}
						label="Large Step 2"
						description="Custom size"
					/>
					<StepperSeparator completed={customSizeStep > 1} />
					<StepperStep
						step={2}
						label="Large Step 3"
						description="Scales proportionally"
					/>
				</Stepper>
			</Card>

			<Card
				title="Disable Responsive Scaling"
				description="disableResponsiveScaling — stays lg at all breakpoints"
			>
				<Stepper
					size="lg"
					bind:activeStep={noScaleStep}
					clickable
					disableResponsiveScaling
				>
					<StepperStep
						step={0}
						label="Fixed lg"
						description="No scale-down on tablet"
					/>
					<StepperSeparator completed={noScaleStep > 0} />
					<StepperStep
						step={1}
						label="Fixed lg"
						description="Always 48px"
					/>
					<StepperSeparator completed={noScaleStep > 1} />
					<StepperStep
						step={2}
						label="Fixed lg"
						description="disableResponsiveScaling"
					/>
				</Stepper>
			</Card>
		</div>
	</section>

	<!-- ─── Responsive Summary ─────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Responsive Behavior</h2>
		<div class="grid gap-4 md:grid-cols-2">
			<Card
				title="Mobile < 640px"
				description="mobileLayout='vertical' (default)"
			>
				<ul class="text-sm text-muted-foreground space-y-1.5">
					<li>✓ Auto-switches to vertical layout</li>
					<li>✓ 44px minimum touch targets</li>
					<li>✓ Descriptions optionally hidden</li>
					<li>✓ Vertical connector animates top-to-bottom</li>
				</ul>
			</Card>

			<Card title="Mobile Scroll" description="mobileLayout='scroll'">
				<ul class="text-sm text-muted-foreground space-y-1.5">
					<li>✓ Stays horizontal, scrolls sideways</li>
					<li>✓ Steps stay fixed width (shrink-0)</li>
					<li>✓ Hidden scrollbar for clean appearance</li>
					<li>✓ Best for many steps</li>
				</ul>
			</Card>

			<Card
				title="Tablet ≤ 768px"
				description="JS-driven one-level scale-down"
			>
				<ul class="text-sm text-muted-foreground space-y-1.5">
					<li>✓ lg → default, default → sm scaling</li>
					<li>✓ Connector mt adjusts for scaled buttons</li>
					<li>✓ Opt-out with disableResponsiveScaling</li>
					<li>✓ Custom indicatorSize also respects tablet scaling</li>
				</ul>
			</Card>

			<Card
				title="Animated Connector"
				description="Smooth fill on step change"
			>
				<ul class="text-sm text-muted-foreground space-y-1.5">
					<li>✓ Horizontal: left-to-right width fill</li>
					<li>✓ Vertical: top-to-bottom height fill via ::after</li>
					<li>✓ 500ms ease-in-out transition</li>
					<li>✓ Instant reset when going backwards</li>
				</ul>
			</Card>
		</div>
	</section>
</div>
