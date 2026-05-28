<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileInput from "../file-input.svelte";
	import * as Field from '$lib/components/ui/field';
	import { Button } from '$lib/components/ui/button';

	const { Story } = defineMeta({
		title: 'Components/FileInput/All Modes',
		component: FileInput,
		tags: ['autodocs'],
		argTypes: {
			// Mode selection
			mode: {
				control: { type: 'select' },
				options: ['drag-drop', 'regular', 'button-only'],
				description: 'File input UI mode',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'drag-drop' },
				},
			},
			
			// Common props
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the file input is disabled',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			multiple: {
				control: { type: 'boolean' },
				description: 'Allow multiple file selection',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			
			// Validation props
			'validation.maxFiles': {
				control: { type: 'number' },
				description: 'Maximum number of files allowed',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: 'undefined (unlimited)' },
				},
			},
			'validation.maxSize': {
				control: { type: 'number' },
				description: 'Maximum file size in bytes',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: 'undefined (no limit)' },
				},
			},
			'validation.acceptedTypes': {
				control: { type: 'object' },
				description: 'Array of accepted file types',
				table: {
					type: { summary: 'string[]' },
					defaultValue: { summary: 'undefined (all types)' },
				},
			},
			
			// Drag-drop specific props
			'dragDropProps.label': {
				control: { type: 'text' },
				description: 'Main label for drag-drop area',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'Drop files here or click to browse' },
				},
			},
			'dragDropProps.description': {
				control: { type: 'text' },
				description: 'Description text for drag-drop area',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: '' },
				},
			},
			'dragDropProps.showFileList': {
				control: { type: 'boolean' },
				description: 'Show selected files in drag-drop mode',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			
			// Regular input specific props
			'regularProps.label': {
				control: { type: 'text' },
				description: 'Label for regular input',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: '' },
				},
			},
			'regularProps.placeholder': {
				control: { type: 'text' },
				description: 'Placeholder text for regular input',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'Choose files...' },
				},
			},
			'regularProps.showFileCount': {
				control: { type: 'boolean' },
				description: 'Show file count in regular mode',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			'regularProps.showFileList': {
				control: { type: 'boolean' },
				description: 'Show file list in regular mode',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			
			// Button specific props
			'buttonProps.buttonText': {
				control: { type: 'text' },
				description: 'Text for the button',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'Choose Files' },
				},
			},
			'buttonProps.variant': {
				control: { type: 'select' },
				options: ['default', 'filled', 'ghost'],
				description: 'Button variant',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'default' },
				},
			},
			'buttonProps.size': {
				control: { type: 'select' },
				options: ['sm', 'default', 'lg'],
				description: 'Button size',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'default' },
				},
			},
			'buttonProps.showCount': {
				control: { type: 'boolean' },
				description: 'Show file count in button text',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			'buttonProps.showFileList': {
				control: { type: 'boolean' },
				description: 'Show file list below button',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			
			// Hide internal props from controls
			class: {
				control: false,
				table: { disable: true },
			},
			id: {
				control: false,
				table: { disable: true },
			},
			name: {
				control: false,
				table: { disable: true },
			},
			files: {
				control: false,
				table: { disable: true },
			},
			onFilesChange: {
				control: false,
				table: { disable: true },
			},
			onError: {
				control: false,
				table: { disable: true },
			},
		},
		
		args: {
			mode: 'drag-drop',
			disabled: false,
			multiple: true,
			validation: {},
		},
		
		parameters: {
			layout: 'centered',
			docs: {
				extractArgTypes: false,
			},
		},
	});

	// Shared validation examples
	const imageValidation = {
		acceptedTypes: ['image/*'],
		maxSize: 5 * 1024 * 1024 // 5MB
	};
	
	const documentValidation = {
		acceptedTypes: ['.pdf', '.doc', '.docx', '.txt'],
		maxFiles: 3
	};
	
	const singleFileValidation = {
		maxFiles: 1
	};
</script>


<!-- Mode Selection Examples -->
<Story name="Drag & Drop Mode (Default)" args={{ 
	mode: 'drag-drop',
	dragDropProps: {
		label: 'Drop files here or click to browse',
		description: 'Upload your files',
		showFileList: true
	}
}} />

<Story name="Regular Input Mode" args={{ 
	mode: 'regular',
	regularProps: {
		placeholder: 'Select your files...',
		showFileCount: true,
		showFileList: true
	}
}} />

<Story name="Button Only Mode" args={{ 
	mode: 'button-only',
	buttonProps: {
		buttonText: 'Upload Files',
		variant: 'default',
		size: 'default',
		showCount: true,
		showFileList: true
	}
}} />

<!-- Validation Examples -->
<Story name="Images Only" args={{ 
	mode: 'drag-drop',
	validation: imageValidation,
	dragDropProps: {
		label: 'Drop images here',
		description: 'PNG, JPG, GIF up to 5MB',
		showFileList: true
	}
}} />

<Story name="Documents Only" args={{ 
	mode: 'regular',
	validation: documentValidation,
	regularProps: {
		placeholder: 'Choose up to 3 documents...',
		showFileCount: true,
		showFileList: true
	}
}} />

<Story name="Single File" args={{ 
	mode: 'button-only',
	validation: singleFileValidation,
	multiple: false,
	buttonProps: {
		buttonText: 'Choose File',
		variant: 'default',
		showCount: false,
		showFileList: true
	}
}} />

<!-- State Examples -->
<Story name="Disabled" args={{ 
	mode: 'drag-drop',
	disabled: true,
	dragDropProps: {
		description: 'Please contact administrator',
		showFileList: true
	}
}} />

<!-- With Field Component -->
<Story name="Field with Drag & Drop">
	{#snippet template()}
		<Field.Field
			label="Upload Documents"
			description="Drag and drop or click to upload (Max 5MB)"
		>
			<FileInput 
				mode="drag-drop"
				validation={{
					maxFiles: 3,
					maxSize: 5 * 1024 * 1024,
					acceptedTypes: ['.pdf', '.doc', '.docx']
				}}
				dragDropProps={{
					label: 'Drop files here',
					description: 'PDF, DOC, DOCX',
					showFileList: true
				}}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Regular Input">
	{#snippet template()}
		<Field.Field
			label="Resume"
			description="Upload your resume in PDF format"
			required
		>
			<FileInput 
				mode="regular"
				validation={{
					maxFiles: 1,
					acceptedTypes: ['.pdf']
				}}
				regularProps={{
					placeholder: 'Choose PDF file...',
					showFileCount: false,
					showFileList: true
				}}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Button">
	{#snippet template()}
		<Field.Field
			label="Profile Picture"
			description="Upload your profile photo (JPG, PNG)"
			required
		>
			<FileInput 
				mode="button-only"
				validation={{
					maxFiles: 1,
					maxSize: 2 * 1024 * 1024,
					acceptedTypes: ['image/*']
				}}
				buttonProps={{
					buttonText: 'Upload Photo',
					variant: 'filled',
					size: 'lg',
					showCount: false,
					showFileList: false
				}}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Validation Error">
	{#snippet template()}
		<Field.Field
			label="Required Document"
			description="Please upload a valid PDF file"
			required
			error="This field is required"
		>
			<FileInput 
				validation={{
					maxFiles: 1,
					acceptedTypes: ['.pdf']
				}}
			/>
		</Field.Field>
	{/snippet}
</Story>


<Story name="Complete Upload Form with Field">
	{#snippet template()}
		<div class="w-full max-w-2xl">
			<Field.Set>
				<Field.Legend>Job Application</Field.Legend>
				<Field.Description>Upload your application documents</Field.Description>
				
				<Field.Separator />
				
				<Field.Group class="gap-6">
					<Field.Field
						label="Resume"
						description="Upload your resume (PDF only, max 5MB)"
						required
					>
						<FileInput 
							validation={{
								maxFiles: 1,
								maxSize: 5 * 1024 * 1024,
								acceptedTypes: ['.pdf']
							}}
						/>
					</Field.Field>
					
					<Field.Field
						label="Cover Letter"
						description="Upload your cover letter (PDF or DOC)"
						required
					>
						<FileInput 
							validation={{
								maxFiles: 1,
								maxSize: 3 * 1024 * 1024,
								acceptedTypes: ['.pdf', '.doc', '.docx']
							}}
						/>
					</Field.Field>
					
					<Field.Field
						label="Portfolio (Optional)"
						description="Upload portfolio samples (Images or PDFs, max 10MB total)"
					>
						<FileInput 
							validation={{
								maxFiles: 5,
								maxSize: 10 * 1024 * 1024,
								acceptedTypes: ['image/*', '.pdf']
							}}
						/>
					</Field.Field>
				</Field.Group>
				
				<div class="flex gap-4 pt-4">
					<Button type="submit">Submit Application</Button>
					<Button variant="outline" type="button">Save Draft</Button>
				</div>
			</Field.Set>
		</div>
	{/snippet}
</Story>

