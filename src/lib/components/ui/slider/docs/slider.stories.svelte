<script context="module" lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Slider } from "$lib/components/ui/slider";
	import type { SliderVariant, SliderSize, SliderMark } from "$lib/components/ui/slider";

	const { Story } = defineMeta({
		title: "Components/Slider",
		component: Slider,
		tags: ["autodocs"],
		argTypes: {
			value: {
				control: "number",
				description: "Current value",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "0" },
				},
			},
			variant: {
				control: "select",
				options: ["default", "primary", "secondary", "success", "warning", "destructive"],
				description: "Visual variant",
				table: {
					type: { summary: "default | primary | secondary | success | warning | destructive" },
					defaultValue: { summary: "default" },
				},
			},
			size: {
				control: "select",
				options: ["sm", "default", "lg"],
				description: "Size variant",
				table: {
					type: { summary: "sm | default | lg" },
					defaultValue: { summary: "default" },
				},
			},
			orientation: {
				control: "select",
				options: ["horizontal", "vertical"],
				description: "Slider orientation",
				table: {
					type: { summary: "horizontal | vertical" },
					defaultValue: { summary: "horizontal" },
				},
			},
			min: {
				control: "number",
				description: "Minimum value",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "0" },
				},
			},
			max: {
				control: "number",
				description: "Maximum value",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "100" },
				},
			},
			step: {
				control: "number",
				description: "Step increment",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "1" },
				},
			},
			showSteps: {
				control: "boolean",
				description: "Show step indicators",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			showTooltip: {
				control: "boolean",
				description: "Show tooltip on hover",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			disabled: {
				control: "boolean",
				description: "Disable the slider",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
		},
        parameters: {
            docs: {
                extractArgTypes: false, // Disable automatic prop extraction
            },
        },
		args: {
			type: "single",
			value: 50,
			variant: "default",
			size: "default",
			orientation: "horizontal",
			min: 0,
			max: 100,
			step: 1,
			showSteps: false,
			showTooltip: false,
			disabled: false,
		},
	});

	type Args = {
		type?: "single" | "multiple";
		value?: number | number[];
		variant?: SliderVariant;
		size?: SliderSize;
		orientation?: "horizontal" | "vertical";
		min?: number;
		max?: number;
		step?: number | number[];
		showSteps?: boolean;
		marks?: SliderMark[];
		showTooltip?: boolean;
		formatTooltip?: (value: number) => string;
		disabled?: boolean;
	};

</script>

<Story name="Default"/>


<Story name="Variants">
	{#snippet template(args: Args)}
		<div class="space-y-8">
			<div>
				<h3 class="mb-4 text-sm font-medium">Default</h3>
				<Slider type="single" variant="default" value={50} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Primary</h3>
				<Slider type="single" variant="primary" value={50} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Secondary</h3>
				<Slider type="single" variant="secondary" value={50} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Success</h3>
				<Slider type="single" variant="success" value={50} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Warning</h3>
				<Slider type="single" variant="warning" value={50} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Destructive</h3>
				<Slider type="single" variant="destructive" value={50} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template(args: Args)}
		<div class="space-y-8">
			<div>
				<h3 class="mb-4 text-sm font-medium">Small</h3>
				<Slider type="single" size="sm" value={50} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Default</h3>
				<Slider type="single" size="default" value={50} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Large</h3>
				<Slider type="single" size="lg" value={50} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Steps">
	{#snippet template(args: Args)}
		<div class="space-y-8">
			<div>
				<h3 class="mb-4 text-sm font-medium">Step 10 with Indicators</h3>
				<Slider type="single" value={50} min={0} max={100} step={10} showSteps={true} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Step 25 with Indicators (Primary)</h3>
				<Slider type="single" value={50} min={0} max={100} step={25} showSteps={true} variant="primary" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Marks">
	{#snippet template(args: Args)}
		<div class="space-y-8">
			<div>
				<h3 class="mb-4 text-sm font-medium">Labeled Marks</h3>
				<Slider
					type="single"
					value={50}
					min={0}
					max={100}
					marks={[
						{ value: 0, label: "Min" },
						{ value: 25, label: "Low" },
						{ value: 50, label: "Mid" },
						{ value: 75, label: "High" },
						{ value: 100, label: "Max" },
					]}
				/>
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Percentage Marks</h3>
				<Slider
					type="single"
					value={50}
					min={0}
					max={100}
					step={25}
					marks={[
						{ value: 0, label: "0%" },
						{ value: 25, label: "25%" },
						{ value: 50, label: "50%" },
						{ value: 75, label: "75%" },
						{ value: 100, label: "100%" },
					]}
					variant="success"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Tooltip">
	{#snippet template(args: Args)}
		<div class="space-y-8">
			<div>
				<h3 class="mb-4 text-sm font-medium">Default Tooltip</h3>
				<Slider type="single" value={50} showTooltip={true} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Custom Formatted Tooltip</h3>
				<Slider
					type="single"
					value={50}
					showTooltip={true}
					formatTooltip={(val) => `${val}%`}
					variant="primary"
				/>
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Temperature Tooltip</h3>
				<Slider
					type="single"
					value={22}
					min={-10}
					max={40}
					step={0.5}
					showTooltip={true}
					formatTooltip={(val) => `${val}°C`}
					variant="warning"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Combined Features">
	{#snippet template(args: Args)}
		<div class="space-y-8">
			<div>
				<h3 class="mb-4 text-sm font-medium">Steps + Marks + Tooltip</h3>
				<Slider
					type="single"
					value={50}
					min={0}
					max={100}
					step={10}
					showSteps={true}
					marks={[
						{ value: 0, label: "0%" },
						{ value: 50, label: "50%" },
						{ value: 100, label: "100%" },
					]}
					showTooltip={true}
					formatTooltip={(val) => `${val}%`}
					variant="primary"
					size="lg"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Range Slider">
	{#snippet template(args: Args)}
		<div class="space-y-8">
			<div>
				<h3 class="mb-4 text-sm font-medium">Basic Range</h3>
				<Slider type="multiple" value={[25, 75]} min={0} max={100} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Price Range</h3>
				<Slider
					type="multiple"
					value={[100, 500]}
					min={0}
					max={1000}
					step={10}
					showTooltip={true}
					formatTooltip={(val) => `$${val}`}
					variant="success"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Vertical Orientation">
	{#snippet template(args: Args)}
		<div class="flex gap-8">
			<div>
				<h3 class="mb-4 text-sm font-medium">Default Vertical</h3>
				<Slider type="single" value={50} orientation="vertical" class="h-64" />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">With Steps</h3>
				<Slider
					type="single"
					value={50}
					orientation="vertical"
					step={10}
					showSteps={true}
					variant="primary"
					class="h-64"
				/>
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">With Tooltip</h3>
				<Slider
					type="single"
					value={75}
					orientation="vertical"
					showTooltip={true}
					formatTooltip={(val) => `${val}%`}
					variant="success"
					size="lg"
					class="h-64"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Disabled State">
	{#snippet template(args: Args)}
		<div class="space-y-8">
			<div>
				<h3 class="mb-4 text-sm font-medium">Disabled</h3>
				<Slider type="single" value={50} disabled={true} />
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Disabled with Steps</h3>
				<Slider type="single" value={50} step={10} showSteps={true} disabled={true} variant="primary" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Use Cases">
	{#snippet template(args: Args)}
		<div class="space-y-8">
			<div>
				<h3 class="mb-4 text-sm font-medium">Volume Control</h3>
				<Slider
					type="single"
					value={70}
					min={0}
					max={100}
					step={5}
					marks={[
						{ value: 0, label: "🔇" },
						{ value: 50, label: "🔉" },
						{ value: 100, label: "🔊" },
					]}
					showTooltip={true}
					formatTooltip={(val) => `${val}%`}
					variant="primary"
				/>
			</div>
			<div>
				<h3 class="mb-4 text-sm font-medium">Rating Scale</h3>
				<Slider
					type="single"
					value={3}
					min={1}
					max={5}
					step={1}
					marks={[
						{ value: 1, label: "Poor" },
						{ value: 2, label: "Fair" },
						{ value: 3, label: "Good" },
						{ value: 4, label: "Great" },
						{ value: 5, label: "Excellent" },
					]}
					showSteps={true}
					variant="warning"
					size="lg"
				/>
			</div>
		</div>
	{/snippet}
</Story>
