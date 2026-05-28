<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Switch } from '$lib/components/ui/switch';
	import * as Field from '$lib/components/ui/field';

	const { Story } = defineMeta({
		title: 'Components/Switch',
		component: Switch,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'success', 'warning', 'danger', 'ghost'],
				description: 'Visual variant of the switch',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'default' },
				},
			},
			size: {
				control: { type: 'select' },
				options: ['sm', 'default', 'lg'],
				description: 'Size of the switch',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'default' },
				},
			},
			checked: {
				control: { type: 'boolean' },
				description: 'Whether the switch is checked',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the switch is disabled',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			name: {
				control: { type: 'text' },
				description: 'Name attribute for form submission',
				table: {
					type: { summary: 'string' },
				},
			},
			value: {
				control: { type: 'text' },
				description: 'Value attribute for form submission',
				table: {
					type: { summary: 'string' },
				},
			},
			required: {
				control: { type: 'boolean' },
				description: 'Whether the switch is required',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			error: {
				control: { type: 'boolean' },
				description: 'Error state - when true, applies error styling via aria-invalid',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			onError: {
				control: false,
				description: 'Callback function called when error state changes',
				table: {
					type: { summary: '(error: boolean) => void' },
				},
			},
			
			// Hide internal props from controls
			class: {
				control: false,
				table: { disable: true },
			},
			ref: {
				control: false,
				table: { disable: true },
			},
			onCheckedChange: {
				control: false,
				table: { disable: true },
			},
		},
		args: {
			variant: 'default',
			size: 'default',
			checked: false,
			disabled: false,
			required: false,
		},
		parameters: {
			layout: 'centered',
			docs: {
				extractArgTypes: false,
			},
		},
	});
</script>



<Story name="Default" args={{}} />

<Story name="Checked" args={{ checked: true }} />

<Story name="Disabled" args={{ disabled: true }} />

<Story name="Disabled Checked" args={{ disabled: true, checked: true }} />

<Story name="Error State" args={{ error: true }} />

<Story name="Error Checked" args={{ error: true, checked: true }} />



<Story name="Default Variant" args={{ variant: 'default' }} />


<Story name="Success Variant" args={{ variant: 'success' }} />


<Story name="Warning Variant" args={{ variant: 'warning' }} />


<Story name="Danger Variant" args={{ variant: 'danger' }} />


<Story name="Ghost Variant" args={{ variant: 'ghost' }} />


<Story name="Small Size" args={{ size: 'sm' }} />


<Story name="Default Size" args={{ size: 'default' }} />


<Story name="Large Size" args={{ size: 'lg' }} />




<!-- ========================================= -->
<!-- FORM INTEGRATION -->
<!-- ========================================= -->

<!-- <Story name="Form Field">
	<div class="space-y-4 max-w-md">
		<div class="flex items-center justify-between">
			<label for="notifications" class="text-sm font-medium">
				Email Notifications
			</label>
			<Switch
				id="notifications"
				name="notifications"
				variant="success"
				checked={true}
			/>
		</div>
		
		<div class="flex items-center justify-between">
			<label for="marketing" class="text-sm font-medium">
				Marketing Emails
			</label>
			<Switch
				id="marketing"
				name="marketing"
				variant="ghost"
				checked={false}
			/>
		</div>
		
		<div class="flex items-center justify-between">
			<label for="required" class="text-sm font-medium">
				Required Setting
			</label>
			<Switch
				id="required"
				name="required"
				variant="default"
				checked={true}
				required={true}
			/>
		</div>
	</div>
</Story> -->

<!-- ========================================= -->
<!-- INTERACTIVE EXAMPLES -->
<!-- ========================================= -->

<!-- <Story name="Interactive Examples">
	<div class="space-y-4 max-w-md">
		<div class="flex items-center justify-between">
			<span class="text-sm font-medium">Enable Notifications</span>
			<div class="flex items-center space-x-2">
				<Switch variant="success" size="lg" checked={false} />
				<span class="text-xs text-muted-foreground">Off</span>
			</div>
		</div>
		
		<div class="flex items-center justify-between">
			<span class="text-sm font-medium">Developer Mode</span>
			<div class="flex items-center space-x-2">
				<Switch variant="warning" size="default" checked={true} />
				<span class="text-xs text-muted-foreground">On</span>
			</div>
		</div>
		
		<div class="flex items-center justify-between">
			<span class="text-sm font-medium">Delete on Exit</span>
			<div class="flex items-center space-x-2">
				<Switch variant="danger" size="default" checked={false} />
				<span class="text-xs text-muted-foreground">Off</span>
			</div>
		</div>
		
		<div class="flex items-center justify-between">
			<span class="text-sm font-medium">Show Tooltips</span>
			<div class="flex items-center space-x-2">
				<Switch variant="ghost" size="sm" checked={true} />
				<span class="text-xs text-muted-foreground">On</span>
			</div>
		</div>
	</div>
</Story> -->

<!-- ========================================= -->
<!-- FIELD INTEGRATION -->
<!-- ========================================= -->

<Story name="Field with Basic Switch">
	{#snippet template()}
		<Field.Field
			label="Enable notifications"
			description="Receive email notifications for updates"
			orientation="horizontal"
			labelPosition="before"
		>
			<Switch checked={false} />
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Validation">
	{#snippet template()}
		<Field.Field
			label="Beta features"
			description="Enable experimental features"
			orientation="horizontal"
			labelPosition="before"
			required
			error="You must enable beta features to continue"
		>
			<Switch checked={false} error={true} />
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Success Variant">
	{#snippet template()}
		<Field.Field
			label="Auto-save enabled"
			description="Automatically save your work"
			orientation="horizontal"
			labelPosition="before"
		>
			<Switch variant="success" checked={true} />
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Multiple Switches">
	{#snippet template()}
		<Field.Set>
			<Field.Legend>Notification Settings</Field.Legend>
			<Field.Description>Configure how you receive notifications</Field.Description>
			
			<Field.Separator />
			
			<Field.Group class="gap-4">
				<Field.Field
					label="Email Notifications"
					description="Get notified via email"
					orientation="horizontal"
					labelPosition="before"
				>
					<Switch variant="success" checked={true} />
				</Field.Field>
				
				<Field.Field
					label="Push Notifications"
					description="Get browser push notifications"
					orientation="horizontal"
					labelPosition="before"
				>
					<Switch variant="default" checked={false} />
				</Field.Field>
				
				<Field.Field
					label="SMS Notifications"
					description="Get text message alerts"
					orientation="horizontal"
					labelPosition="before"
				>
					<Switch variant="warning" checked={false} />
				</Field.Field>
			</Field.Group>
		</Field.Set>
	{/snippet}
</Story>