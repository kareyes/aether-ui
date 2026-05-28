<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Stepper, StepperStep, StepperSeparator, StepperRoot } from "../index.js";
	import { fn } from "storybook/test";
	import { User, CreditCard, CheckCircle, ShoppingCart, Package, Settings, MapPin, Truck } from "@lucide/svelte";
    import { type Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/Stepper",
		component: Stepper,
		tags: ["autodocs"],
		argTypes: {
			orientation: {
				control: { type: "select" },
				options: ["horizontal", "vertical"],
				description: "Layout orientation of the stepper",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "horizontal" },
				},
			},
			size: {
				control: { type: "select" },
				options: ["xs", "sm", "default", "lg"],
				description: "Size of the stepper",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "default" },
				},
			},
			variant: {
				control: { type: "select" },
				options: ["default", "outline", "ghost", "flat"],
				description: "Visual variant of the stepper",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "default" },
				},
			},
			activeStep: {
				control: { type: "number" },
				description: "Current active step (0-based index)",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "0" },
				},
			},
			clickable: {
				control: { type: "boolean" },
				description: "Allow clicking steps to navigate",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			onStepClick: {
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
			onStepClick: fn(),
		},
	});
</script>

<Story name="Default">
	{#snippet template(args: Args)}
	<Stepper {...args} activeStep={1}>
		<StepperStep step={0} label="Step 1" description="Choose a plan" />
		<StepperSeparator />
		<StepperStep step={1} label="Step 2" description="Enter details" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" description="Confirm" />
	</Stepper>
	{/snippet}

</Story>

<Story name="Horizontal">
	{#snippet template(args: Args)}
	<Stepper orientation="horizontal" {...args} activeStep={1}>
		<StepperStep step={0} label="Account" description="Create your account" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Profile" description="Complete your profile" />
		<StepperSeparator />
		<StepperStep step={2} label="Finish" description="Review and finish" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Vertical">
	{#snippet template(args: Args)}
	<Stepper orientation="vertical" {...args} activeStep={1}>
		<StepperStep step={0} label="Personal Info" description="Enter your basic information" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Address" description="Add your address details" />
		<StepperSeparator />
		<StepperStep step={2} label="Review" description="Review and submit" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Extra Small Size">
	{#snippet template(args: Args)}
	<Stepper size="xs" {...args} activeStep={1}>
		<StepperStep step={0} label="Step 1" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Small Size">
	{#snippet template(args: Args)}
	<Stepper size="sm" {...args} activeStep={1}>
		<StepperStep step={0} label="Step 1" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Default Size">
	{#snippet template(args: Args)}
	<Stepper size="default" {...args} activeStep={1}>
		<StepperStep step={0} label="Step 1" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Large Size">
	{#snippet template(args: Args)}
	<Stepper size="lg" {...args} activeStep={1}>
		<StepperStep step={0} label="Step 1" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Outline Variant">
	
	{#snippet template(args: Args)}
	<Stepper variant="outline" {...args} activeStep={1}>
		<StepperStep step={0} label="Start" description="Begin the process" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Middle" description="In progress" />
		<StepperSeparator />
		<StepperStep step={2} label="End" description="Complete" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Ghost Variant">
	{#snippet template(args: Args)}
	<Stepper variant="ghost" {...args} activeStep={1}>
		<StepperStep step={0} label="Start" description="Begin the process" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Middle" description="In progress" />
		<StepperSeparator />
		<StepperStep step={2} label="End" description="Complete" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Flat Variant">
	{#snippet template(args: Args)}
	<Stepper variant="flat" {...args} activeStep={1}>
		<StepperStep step={0} label="Personal Info" description="Completed" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Education" description="Completed" />
		<StepperSeparator />
		<StepperStep step={2} label="Company" description="Pending" />
		<StepperSeparator />
		<StepperStep step={3} label="Testing" description="Pending" />
		<StepperSeparator />
		<StepperStep step={4} label="Review" description="Pending" />
	</Stepper>
	{/snippet}
</Story>

<Story name="With Icons">
	
	{#snippet template(args: Args)}
	<Stepper activeStep={1} {...args}>
		<StepperStep step={0} label="Account" description="Create account">
			{#snippet icon()}
				<User class="size-4" />
			{/snippet}
		</StepperStep>
		<StepperSeparator completed />
		<StepperStep step={1} label="Payment" description="Add payment">
			{#snippet icon()}
				<CreditCard class="size-4" />
			{/snippet}
		</StepperStep>
		<StepperSeparator />
		<StepperStep step={2} label="Done" description="All set!">
			{#snippet icon()}
				<CheckCircle class="size-4" />
			{/snippet}
		</StepperStep>
	</Stepper>
	{/snippet}
</Story>

<Story name="Clickable">
	
	{#snippet template(args: Args)}
	<Stepper clickable activeStep={1} {...args}>
		<StepperStep step={0} label="Step 1" description="First step" />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" description="Second step" />
		<StepperSeparator />
		<StepperStep step={2} label="Step 3" description="Third step" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Numbers Only">
	{#snippet template(args: Args)}
	<Stepper activeStep={2} {...args}>
		<StepperStep step={0} />
		<StepperSeparator completed />
		<StepperStep step={1} />
		<StepperSeparator completed />
		<StepperStep step={2} />
		<StepperSeparator />
		<StepperStep step={3} />
	</Stepper>
	{/snippet}
</Story>

<Story name="Checkout Process">
	
	{#snippet template(args: Args)}
	<Stepper orientation="vertical" activeStep={1} size="lg" {...args}>
		<StepperStep step={0} label="Cart" description="Review your items" completed>
			{#snippet icon()}
				<ShoppingCart class="size-4" />
			{/snippet}
		</StepperStep>
		<StepperSeparator completed />
		<StepperStep step={1} label="Payment" description="Enter payment details">
			{#snippet icon()}
				<CreditCard class="size-4" />
			{/snippet}
		</StepperStep>
		<StepperSeparator />
		<StepperStep step={2} label="Shipping" description="Choose shipping method">
			{#snippet icon()}
				<Package class="size-4" />
			{/snippet}
		</StepperStep>
		<StepperSeparator />
		<StepperStep step={3} label="Confirm" description="Review and place order">
			{#snippet icon()}
				<CheckCircle class="size-4" />
			{/snippet}
		</StepperStep>
	</Stepper>
	{/snippet}
</Story>

<Story name="All Completed">
	{#snippet template(args: Args)}
	<Stepper activeStep={3} {...args}>
		<StepperStep step={0} label="Step 1" completed />
		<StepperSeparator completed />
		<StepperStep step={1} label="Step 2" completed />
		<StepperSeparator completed />
		<StepperStep step={2} label="Step 3" completed />
		<StepperSeparator completed />
		<StepperStep step={3} label="Step 4" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Vertical Large">
	{#snippet template(args: Args)}
	<Stepper orientation="vertical" size="lg" activeStep={1} {...args}>
		<StepperStep step={0} label="Configuration" description="Set up your preferences">
			{#snippet icon()}
				<Settings class="size-4" />
			{/snippet}
		</StepperStep>
		<StepperSeparator completed />
		<StepperStep step={1} label="Profile" description="Complete your profile information">
			{#snippet icon()}
				<User class="size-4" />
			{/snippet}
		</StepperStep>
		<StepperSeparator />
		<StepperStep step={2} label="Finish" description="Review and complete setup">
			{#snippet icon()}
				<CheckCircle class="size-4" />
			{/snippet}
		</StepperStep>
	</Stepper>
	{/snippet}
</Story>

<Story name="Simple Three Steps">
	{#snippet template(args: Args)}
	<Stepper activeStep={0} {...args}>
		<StepperStep step={0} label="Start" />
		<StepperSeparator />
		<StepperStep step={1} label="Progress" />
		<StepperSeparator />
		<StepperStep step={2} label="Complete" />
	</Stepper>
	{/snippet}
</Story>

<Story name="Custom Styling">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<Stepper orientation="vertical" activeStep={1} size="lg" {...args}>
			<StepperStep step={0}>
				{#snippet icon()}
					<Package class="size-5" />
				{/snippet}
				<div class="space-y-2 pb-4">
					<div class="font-semibold text-base">Order Placed</div>
					<div class="text-sm text-muted-foreground">
						Your order <span class="font-mono text-foreground">#ORD-12345</span> has been confirmed
					</div>
					<div class="text-xs text-muted-foreground">Jan 14, 2026 • 10:30 AM</div>
				</div>
			</StepperStep>
			<StepperSeparator completed />
			<StepperStep step={1}>
				{#snippet icon()}
					<ShoppingCart class="size-5" />
				{/snippet}
				<div class="space-y-2 pb-4">
					<div class="font-semibold text-base flex items-center gap-2">
						Processing
						<span class="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
					</div>
					<div class="text-sm text-muted-foreground">
						Your order is being prepared for shipment
					</div>
					<div class="text-xs text-muted-foreground">Estimated: 2-3 hours</div>
				</div>
			</StepperStep>
			<StepperSeparator />
			<StepperStep step={2}>
				{#snippet icon()}
					<MapPin class="size-5" />
				{/snippet}
				<div class="space-y-2">
					<div class="font-semibold text-base">Out for Delivery</div>
					<div class="text-sm text-muted-foreground">
						Package will arrive at your address
					</div>
					<div class="text-xs text-muted-foreground">Pending</div>
				</div>
			</StepperStep>
		</Stepper>
	</div>
	{/snippet}
</Story>

<Story name="Declarative With Icons">
	{#snippet template(args: Args)}
	<Stepper activeStep={1} clickable {...args}
		steps={[
			{ label: "Cart",     description: "Review items",    icon: ShoppingCart },
			{ label: "Shipping", description: "Enter address",   icon: Truck },
			{ label: "Payment",  description: "Add card",        icon: CreditCard },
			{ label: "Confirm",  description: "Place order",     icon: CheckCircle },
		]}
	/>
	{/snippet}
</Story>

<Story name="Error State">
	{#snippet template(args: Args)}
	<Stepper activeStep={1} {...args}
		steps={[
			{ label: "Upload",   description: "File uploaded" },
			{ label: "Validate", description: "Checksum failed", error: true },
			{ label: "Process",  description: "Waiting" },
		]}
	/>
	{/snippet}
</Story>

<Story name="Loading State">
	{#snippet template(args: Args)}
	<Stepper activeStep={1} {...args}
		steps={[
			{ label: "Upload",     description: "Done" },
			{ label: "Processing", description: "Converting file…", loading: true },
			{ label: "Complete",   description: "Waiting" },
		]}
	/>
	{/snippet}
</Story>

<Story name="Disabled Steps">
	{#snippet template(args: Args)}
	<Stepper activeStep={1} clickable {...args}
		steps={[
			{ label: "Starter",    description: "Current plan" },
			{ label: "Pro",        description: "Active step" },
			{ label: "Enterprise", description: "Contact sales", disabled: true },
			{ label: "Custom",     description: "Contact sales", disabled: true },
		]}
	/>
	{/snippet}
</Story>

<Story name="Mixed States">
	{#snippet template(args: Args)}
	<Stepper activeStep={2} {...args}
		steps={[
			{ label: "Upload",   description: "Done" },
			{ label: "Validate", description: "Checksum error",  error: true },
			{ label: "Process",  description: "Converting…",     loading: true },
			{ label: "Review",   description: "Pending" },
			{ label: "Deploy",   description: "Restricted",      disabled: true },
		]}
	/>
	{/snippet}
</Story>

<Story name="Icons With States">
	{#snippet template(args: Args)}
	<Stepper activeStep={1} {...args}
		steps={[
			{ label: "Cart",    description: "Items ready",   icon: ShoppingCart },
			{ label: "Payment", description: "Card declined", icon: CreditCard,   error: true },
			{ label: "Confirm", description: "Waiting",       icon: CheckCircle,  disabled: true },
		]}
	/>
	{/snippet}
</Story>
