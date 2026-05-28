<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileInputRegular from "../file-input-regular.svelte";
	import * as Field from '$lib/components/ui/field';
	import { Button } from '$lib/components/ui/button';
    import { type Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: 'Components/FileInput/Regular',
		component: FileInputRegular,
		tags: ['autodocs'],
		argTypes: {
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the file input is disabled',
			},
			multiple: {
				control: { type: 'boolean' },
				description: 'Allow multiple file selection',
			},
			label: {
				control: { type: 'text' },
				description: 'Label for the input',
			},
			placeholder: {
				control: { type: 'text' },
				description: 'Placeholder text',
			},
			showFileCount: {
				control: { type: 'boolean' },
				description: 'Show file count',
			},
			showFileList: {
				control: { type: 'boolean' },
				description: 'Show file list',
			},
		},
		args: {
			disabled: false,
			multiple: true,
			placeholder: 'Choose files...',
			showFileCount: true,
			showFileList: true,
		},
		parameters: {
			layout: 'centered',
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

<!-- Basic Regular Input -->
<Story name="Default" />

<Story name="With Label" args={{
		placeholder:"Choose project files..."
    }}
    />

<Story name="With Label and Count" args={{
        placeholder:"Select files...",
        showFileCount:true,
        showFileList:true
    }} />


<!-- Validation Examples -->
<Story name="Images Only" args={{
    validation: imageValidation,
    placeholder:"Choose images...",
    showFileCount:false
}} />


<Story name="Single Document" args={{
        validation: { ...singleFileValidation, acceptedTypes: ['.pdf'] },
        multiple: false,
        placeholder: "Choose a single file...",
        showFileList: false
    }} />


<Story name="Required Field" args={{
        required: true,
        placeholder: "Select required files..."
    }} />


<Story name="Documents Only" args={{
        validation: documentValidation,
        placeholder: "Choose up to 3 files..."
    }} />


<Story name="No File List" args={{
        placeholder: "Select files...",
        showFileList: false,
        showFileCount: true
    }} />


<!-- States -->
<Story name="Disabled" args={{
        disabled: true,
        placeholder: "Upload not available..."
    }} />

<!-- With Field Component -->
<Story name="Field with Label">
	{#snippet template(args: Args)}
		<Field.Field
			label="Resume"
			description="Upload your resume in PDF format"
			required
		>
			<FileInputRegular 
				validation={{
					maxFiles: 1,
					acceptedTypes: ['.pdf']
				}}
				multiple={false}
				placeholder="Choose PDF file..."
                {...args}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Multiple Files">
	{#snippet template(args: Args)}
		<Field.Field
			label="Project Documents"
			description="Upload project files (PDF, DOC, DOCX)"
		>
			<FileInputRegular 
				validation={{
					maxFiles: 5,
					maxSize: 10 * 1024 * 1024,
					acceptedTypes: ['.pdf', '.doc', '.docx']
				}}
				placeholder="Select documents..."
                {...args}
                />
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Validation">
	{#snippet template(args: Args)}
		<Field.Field
			label="Images"
			description="Upload images (JPG, PNG, max 5MB each)"
			required
			error="Please select at least one image"
		>
			<FileInputRegular 
			error={true}
				validation={{
					maxFiles: 3,
					maxSize: 5 * 1024 * 1024,
					acceptedTypes: ['image/*']
				}}
				placeholder="Choose images..."
                {...args}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Complete Form">
	{#snippet template()}
		<div class="w-full max-w-md">
			<Field.Set>
				<Field.Legend>Application Form</Field.Legend>
				<Field.Description>Upload required documents</Field.Description>
				
				<Field.Separator />
				
				<Field.Group class="gap-4">
					<Field.Field
						label="Resume"
						description="PDF format only"
						required
					>
						<FileInputRegular 
							validation={{
								maxFiles: 1,
								acceptedTypes: ['.pdf']
							}}
							multiple={false}
							placeholder="Choose PDF..."
						/>
					</Field.Field>
					
					<Field.Field
						label="Cover Letter"
						description="PDF or DOC format"
						required
					>
						<FileInputRegular 
							validation={{
								maxFiles: 1,
								acceptedTypes: ['.pdf', '.doc', '.docx']
							}}
							multiple={false}
							placeholder="Choose file..."
						/>
					</Field.Field>
					
					<Field.Field
						label="Certificates (Optional)"
						description="Upload relevant certificates"
					>
						<FileInputRegular 
							validation={{
								maxFiles: 3,
								acceptedTypes: ['.pdf', 'image/*']
							}}
							placeholder="Choose certificates..."
						/>
					</Field.Field>
				</Field.Group>
				
				<div class="flex gap-4 pt-4">
					<Button type="submit">Submit Application</Button>
					<Button variant="outline" type="button">Clear</Button>
				</div>
			</Field.Set>
		</div>
	{/snippet}
</Story>
