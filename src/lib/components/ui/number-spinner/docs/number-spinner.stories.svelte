<script context="module" lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { NumberSpinner } from "../index.js";
	import * as Field from '$lib/components/ui/field';
	import { Button } from '$lib/components/ui/button';
	import type {
		NumberSpinnerVariant,
		NumberSpinnerSize,
		NumberSpinnerOrientation,
	} from "../number-spinner-variants.js";

	const { Story } = defineMeta({
		title: "Components/NumberSpinner",
		component: NumberSpinner,
		tags: ["autodocs"],
		argTypes: {
			value: {
				control: "number",
				description: "Current value",
				table: {
					type: { summary: "number | null" },
					defaultValue: { summary: "null" },
				},
			},
			variant: {
				control: "select",
				options: ["default", "outline", "filled", "ghost"],
				description: "Visual variant of the number spinner",
				table: {
					type: { summary: "default | outline | filled | ghost" },
					defaultValue: { summary: "default" },
				},
			},
			size: {
				control: "select",
				options: ["sm", "default", "lg"],
				description: "Size of the number spinner",
				table: {
					type: { summary: "sm | default | lg" },
					defaultValue: { summary: "default" },
				},
			},
			orientation: {
				control: "select",
				options: ["vertical", "horizontal"],
				description: "Orientation of the increment/decrement buttons",
				table: {
					type: { summary: "vertical | horizontal" },
					defaultValue: { summary: "vertical" },
				},
			},
			min: {
				control: "number",
				description: "Minimum allowed value",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "undefined" },
				},
			},
			max: {
				control: "number",
				description: "Maximum allowed value",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "undefined" },
				},
			},
			step: {
				control: "number",
				description: "Increment/decrement step size",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "1" },
				},
			},
			precision: {
				control: "number",
				description: "Number of decimal places",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "undefined" },
				},
			},
			disabled: {
				control: "boolean",
				description: "Whether the spinner is disabled",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			loading: {
				control: "boolean",
				description: "Loading state - when true, shows spinners and disables the input",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			required: {
				control: "boolean",
				description: "Whether the field is required",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			error: {
				control: "boolean",
				description: "Error state",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			placeholder: {
				control: "text",
				description: "Placeholder text",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "undefined" },
				},
			},
		},
		args: {
			value: 0,
			variant: "default",
			size: "default",
			orientation: "vertical",
			step: 1,
			disabled: false,
			loading: false,
			required: false,
			error: false,
		},
		parameters: {
            layout: 'centered',
            docs: {
                extractArgTypes: false, // Disable automatic prop extraction
            },
        },
	});

	type Args = {
		value?: number | null;
		variant?: NumberSpinnerVariant;
		size?: NumberSpinnerSize;
		orientation?: NumberSpinnerOrientation;
		min?: number;
		max?: number;
		step?: number;
		precision?: number;
		disabled?: boolean;
		required?: boolean;
		error?: boolean;
		placeholder?: string;
	};
</script>


<Story name="Default">
	{#snippet template(args: Args)}
		<NumberSpinner {...args} />
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template(args: Args)}
		<div class="space-y-4">
			<div>
				<h3 class="mb-2 text-sm font-medium">Default</h3>
				<NumberSpinner variant="default" value={10} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Outline</h3>
				<NumberSpinner variant="outline" value={10} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Filled</h3>
				<NumberSpinner variant="filled" value={10} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Ghost</h3>
				<NumberSpinner variant="ghost" value={10} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template(args: Args)}
		<div class="space-y-4">
			<div>
				<h3 class="mb-2 text-sm font-medium">Small</h3>
				<NumberSpinner size="sm" value={5} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Default</h3>
				<NumberSpinner size="default" value={5} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Large</h3>
				<NumberSpinner size="lg" value={5} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Orientations">
	{#snippet template(args: Args)}
		<div class="space-y-4">
			<div>
				<h3 class="mb-2 text-sm font-medium">Vertical (Default)</h3>
				<NumberSpinner orientation="vertical" value={10} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Horizontal</h3>
				<NumberSpinner orientation="horizontal" value={10} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Constraints">
	{#snippet template(args: Args)}
		<div class="space-y-4">
			<div>
				<h3 class="mb-2 text-sm font-medium">Min/Max (0-100)</h3>
				<NumberSpinner value={50} min={0} max={100} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Step Size (10)</h3>
				<NumberSpinner value={50} step={10} min={0} max={100} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Decimal Precision (2 places)</h3>
				<NumberSpinner value={9.99} step={0.01} precision={2} min={0} max={99.99} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Price Input">
	{#snippet template(args: Args)}
		<NumberSpinner
			value={19.99}
			min={0}
			max={9999.99}
			step={0.01}
			precision={2}
			placeholder="0.00"
			variant="outline"
		/>
	{/snippet}
</Story>

<Story name="Quantity Selector">
	{#snippet template(args: Args)}
		<NumberSpinner value={1} min={1} max={99} size="sm" orientation="horizontal" />
	{/snippet}
</Story>

<Story name="Temperature Control">
	{#snippet template(args: Args)}
		<NumberSpinner
			value={20.5}
			min={-50}
			max={50}
			step={0.5}
			precision={1}
			orientation="horizontal"
			size="lg"
		/>
	{/snippet}
</Story>

<Story name="Error State">
	{#snippet template(args: Args)}
		<div class="space-y-4">
			<div>
				<h3 class="mb-2 text-sm font-medium">With Error</h3>
				<NumberSpinner value={null} error={true} required />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Without Error</h3>
				<NumberSpinner value={10} error={false} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Disabled State">
	{#snippet template(args: Args)}
		<div class="space-y-4">
			<div>
				<h3 class="mb-2 text-sm font-medium">Disabled</h3>
				<NumberSpinner value={10} disabled={true} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Horizontal Disabled</h3>
				<NumberSpinner value={10} disabled={true} orientation="horizontal" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Loading State">
	{#snippet template(args: Args)}
		<div class="space-y-4">
			<div>
				<h3 class="mb-2 text-sm font-medium">Loading</h3>
				<NumberSpinner value={10} loading={true} />
			</div>
			<div>
				<h3 class="mb-2 text-sm font-medium">Horizontal Loading</h3>
				<NumberSpinner value={10} loading={true} orientation="horizontal" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="With Field Component">
	{#snippet template(args: Args)}
		<div class="space-y-6 max-w-md">
			<Field.Field
				label="Quantity"
				description="Enter the number of items (1-100)"
				required
			>
				<NumberSpinner value={1} min={1} max={100} />
			</Field.Field>

			<Field.Field
				label="Price"
				description="Enter the item price in USD"
				error="Price must be greater than 0"
				required
			>
				<NumberSpinner value={null} min={0} max={9999.99} step={0.01} precision={2} error={true} />
			</Field.Field>

			<Field.Field label="Temperature" description="Set the desired temperature (-50°C to 50°C)">
				<NumberSpinner
					value={20}
					min={-50}
					max={50}
					step={0.5}
					precision={1}
					orientation="horizontal"
				/>
			</Field.Field>
		</div>
	{/snippet}
</Story>

<Story name="All Variants Combined">
	{#snippet template(args: Args)}
		<div class="grid grid-cols-2 gap-6">
			<div class="space-y-4">
				<h3 class="font-semibold">Vertical Layout</h3>
				<div class="space-y-3">
					<NumberSpinner variant="default" value={10} />
					<NumberSpinner variant="outline" value={10} />
					<NumberSpinner variant="filled" value={10} />
					<NumberSpinner variant="ghost" value={10} />
				</div>
			</div>
			<div class="space-y-4">
				<h3 class="font-semibold">Horizontal Layout</h3>
				<div class="space-y-3">
					<NumberSpinner variant="default" value={10} orientation="horizontal" />
					<NumberSpinner variant="outline" value={10} orientation="horizontal" />
					<NumberSpinner variant="filled" value={10} orientation="horizontal" />
					<NumberSpinner variant="ghost" value={10} orientation="horizontal" />
				</div>
			</div>
		</div>
	{/snippet}
</Story>



<Story name="Complete Product Form">
	{#snippet template()}
		<div class="w-full max-w-md">
			<Field.Set>
				<Field.Legend>Product Details</Field.Legend>
				<Field.Description>Configure product pricing and inventory</Field.Description>
				
				<Field.Separator />
				
				<Field.Group class="gap-4">
					<Field.Field
						label="Price (USD)"
						description="Set the product price"
						required
					>
						<NumberSpinner 
							value={29.99}
							min={0}
							max={9999.99}
							step={0.01}
							precision={2}
							variant="outline"
							size="lg"
						/>
					</Field.Field>
					
					<Field.Field
						label="Quantity"
						description="Available stock quantity"
						required
					>
						<NumberSpinner 
							value={1}
							min={1}
							max={10000}
							variant="filled"
						/>
					</Field.Field>
					
					<Field.Field
						label="Discount (%)"
						description="Optional discount percentage"
					>
						<NumberSpinner 
							value={0}
							min={0}
							max={100}
							step={5}
							orientation="horizontal"
						/>
					</Field.Field>
					
					<Field.Field
						label="Weight (kg)"
						description="Product weight for shipping"
					>
						<NumberSpinner 
							value={1.5}
							min={0}
							max={1000}
							step={0.1}
							precision={1}
							variant="ghost"
						/>
					</Field.Field>
				</Field.Group>
				
				<div class="flex gap-4 pt-4">
					<Button type="submit">Save Product</Button>
					<Button variant="outline" type="button">Cancel</Button>
				</div>
			</Field.Set>
		</div>
	{/snippet}
</Story>
