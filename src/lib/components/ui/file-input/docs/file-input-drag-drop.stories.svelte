<script module lang="ts">


	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileInputDragDrop from "../file-input-drag-drop.svelte";
	import * as Field from '$lib/components/ui/field';
	import { Button } from '$lib/components/ui/button';
    import  { type Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: 'Components/FileInput/DragDrop',
		component: FileInputDragDrop,
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
				description: 'Main label for drag-drop area',
			},
			description: {
				control: { type: 'text' },
				description: 'Description text for drag-drop area',
			},
			showFileList: {
				control: { type: 'boolean' },
				description: 'Show selected files list',
			},
		},
		args: {
			disabled: false,
			multiple: true,
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

<!-- Basic Drag & Drop -->
<Story name="Default" />

<Story name="With Label and Description" args={{
		label:"Drop files here or click to browse",
		description:"Upload your documents"
	}}
/>
<!-- Validation Examples -->
<Story name="Images Only" args={{
        validation: imageValidation,
        label:"Drop images here or click to browse",
        description:"PNG, JPG, GIF up to 5MB"
    }}
/>

<Story name="Single File" args={{
		validation: singleFileValidation,
		multiple: false,
		label: "Drop a single file here",
		description: "Only one file allowed"
    }}
	/>

<Story name="Documents Only" args={{
        validation: documentValidation,
        label: "Drop documents here",
        description: "PDF, DOC, DOCX, TXT files (max 3)"
    }}
/>


<Story name="No File List" args={{
        label: "Drop files here or click to browse",
        description: "Files will be processed immediately",
        showFileList: false
    }} />



<Story name="Disabled" args={{
        disabled: true,
        label: "File upload is disabled",
        description: "Please contact administrator"
    }}
/>

<Story name="Multiple Files" args={{
        label: "Drop multiple files here",
        description: "You can upload several files at once",
        multiple: true,
        showFileList: true
		
    }}
/>

<!-- With Field Component -->
<Story name="Field with Label">
	{#snippet template(args: Args)}
		<Field.Field
			label="Upload Documents"
			description="Drag and drop or click to browse"
		>
			<FileInputDragDrop 
                {...args}
				validation={{
					maxFiles: 3,
					maxSize: 5 * 1024 * 1024,
					acceptedTypes: ['.pdf', '.doc', '.docx']
				}}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Image Upload">
	{#snippet template(args: Args)}
		<Field.Field
			label="Profile Picture"
			description="Upload your profile photo (JPG, PNG, max 2MB)"
			required
		>
			<FileInputDragDrop 
				validation={{
					maxFiles: 1,
					maxSize: 2 * 1024 * 1024,
					acceptedTypes: ['image/*']
				}}
				multiple={false}
                {...args}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Validation">
	{#snippet template(args: Args)}
		<Field.Field
			label="Resume Upload"
			description="PDF only, maximum 5MB"
			required
			error="Please upload your resume"
		>
			<FileInputDragDrop 
				error={true}
				validation={{
					maxFiles: 1,
					maxSize: 5 * 1024 * 1024,
					acceptedTypes: ['.pdf']
				}}
				multiple={false}
                {...args}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Complete Form">
	{#snippet template()}
		<div class="w-full max-w-2xl">
			<Field.Set>
				<Field.Legend>Document Upload</Field.Legend>
				<Field.Description>Upload all required documents</Field.Description>
				
				<Field.Separator />
				
				<Field.Group class="gap-6">
					<Field.Field
						label="Resume"
						description="PDF only, max 5MB"
						required
					>
						<FileInputDragDrop 
							validation={{
								maxFiles: 1,
								maxSize: 5 * 1024 * 1024,
								acceptedTypes: ['.pdf']
							}}
							multiple={false}
							label="Drop resume here"
						/>
					</Field.Field>
					
					<Field.Field
						label="Portfolio Samples"
						description="Images or PDFs, max 10MB total"
					>
						<FileInputDragDrop 
							validation={{
								maxFiles: 5,
								maxSize: 10 * 1024 * 1024,
								acceptedTypes: ['image/*', '.pdf']
							}}
							label="Drop portfolio files here"
						/>
					</Field.Field>
				</Field.Group>
				
				<div class="flex gap-4 pt-4">
					<Button type="submit">Submit</Button>
					<Button variant="outline" type="button">Cancel</Button>
				</div>
			</Field.Set>
		</div>
	{/snippet}
</Story>
