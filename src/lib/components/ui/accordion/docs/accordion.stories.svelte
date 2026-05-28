<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Accordion from '../index';
	import type { AccordionVariant } from '../index';
	
	type Args = {
		variant: AccordionVariant;
		type: 'single' | 'multiple';
		disabled: boolean;
	};

	const { Story } = defineMeta({
		title: 'Components/Accordion',
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['default', 'bordered', 'splitted', 'shadow'],
				description: 'Accordion variant',
			},
			type: {
				control: 'select',
				options: ['single', 'multiple'],
				description: 'Whether single or multiple items can be open',
			},
			disabled: {
				control: 'boolean',
				description: 'Disable the accordion',
			},
		},
	});
</script>

<script lang="ts">
</script>

{#snippet template(args: Args)}
	<Accordion.Root {...args} class="w-full max-w-md">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
			<Accordion.Content>
				Yes. It adheres to the WAI-ARIA design pattern.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger>Is it styled?</Accordion.Trigger>
			<Accordion.Content>
				Yes. It comes with default styles that match the other components' aesthetics.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger>Is it animated?</Accordion.Trigger>
			<Accordion.Content>
				Yes. It's animated by default, but you can disable it if you prefer.
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
{/snippet}

<Story name="Default" {template} args={{ type: "single" }} />

<!-- Variants -->
<Story name="Bordered" {template} args={{ 
	variant: "bordered",
	type: "single"
}} />

<Story name="Splitted" {template} args={{ 
	variant: "splitted",
	type: "single"
}} />

<Story name="Shadow" {template} args={{ 
	variant: "shadow",
	type: "single"
}} />

<!-- Multiple Selection -->
<Story name="Multiple">
	{#snippet template(args: Args)}
		<Accordion.Root type="multiple" variant="bordered" class="w-full max-w-md">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Frontend Development</Accordion.Trigger>
				<Accordion.Content>
					<ul class="list-disc list-inside space-y-1">
						<li>React, Vue, Svelte</li>
						<li>TypeScript</li>
						<li>CSS & Tailwind</li>
					</ul>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Backend Development</Accordion.Trigger>
				<Accordion.Content>
					<ul class="list-disc list-inside space-y-1">
						<li>Node.js, Python, Go</li>
						<li>REST & GraphQL APIs</li>
						<li>Database Design</li>
					</ul>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>DevOps & Cloud</Accordion.Trigger>
				<Accordion.Content>
					<ul class="list-disc list-inside space-y-1">
						<li>Docker & Kubernetes</li>
						<li>CI/CD Pipelines</li>
						<li>AWS, GCP, Azure</li>
					</ul>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	{/snippet}
</Story>

<!-- Disabled Item -->
<Story name="Disabled Item">
	{#snippet template(args: Args)}
		<Accordion.Root type="single" variant="splitted" class="w-full max-w-md">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Available Feature</Accordion.Trigger>
				<Accordion.Content>
					This feature is fully available and ready to use.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2" disabled>
				<Accordion.Trigger>Premium Feature (Locked)</Accordion.Trigger>
				<Accordion.Content>
					Upgrade to premium to unlock this feature.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>Another Available Feature</Accordion.Trigger>
				<Accordion.Content>
					This feature is also available for all users.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	{/snippet}
</Story>

<!-- Default Open -->
<Story name="Default Open">
	{#snippet template(args: Args)}
		<Accordion.Root type="single" value="item-2" variant="bordered" class="w-full max-w-md">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>First Section</Accordion.Trigger>
				<Accordion.Content>
					This section is collapsed by default.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Second Section (Default Open)</Accordion.Trigger>
				<Accordion.Content>
					This section is expanded by default. Users can still collapse it.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>Third Section</Accordion.Trigger>
				<Accordion.Content>
					This section is also collapsed by default.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	{/snippet}
</Story>

<!-- FAQ Example -->
<Story name="FAQ Example">
	{#snippet template(args: Args)}
		<div class="max-w-lg">
			<Accordion.Root type="single" variant="splitted" class="w-full">
				<Accordion.Item value="shipping">
					<Accordion.Trigger>What are your shipping options?</Accordion.Trigger>
					<Accordion.Content>
						<p class="mb-2">We offer several shipping options:</p>
						<ul class="list-disc list-inside space-y-1 text-muted-foreground">
							<li><strong>Standard:</strong> 5-7 business days - Free on orders over $50</li>
							<li><strong>Express:</strong> 2-3 business days - $9.99</li>
							<li><strong>Overnight:</strong> Next business day - $24.99</li>
						</ul>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="returns">
					<Accordion.Trigger>What is your return policy?</Accordion.Trigger>
					<Accordion.Content>
						We offer a hassle-free 30-day return policy. Items must be unused and in 
						their original packaging.
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="warranty">
					<Accordion.Trigger>Do your products come with a warranty?</Accordion.Trigger>
					<Accordion.Content>
						Yes! All our products come with a 1-year manufacturer's warranty. 
						Extended warranty options are available at checkout.
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	{/snippet}
</Story>
