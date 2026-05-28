<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import FileInputButton from "../file-input-button.svelte";
	import * as Field from "$lib/components/ui/field";
	import { Button } from "$lib/components/ui/button";

	const { Story } = defineMeta({
		title: "Components/FileInput/Button",
		component: FileInputButton,
		tags: ["autodocs"],
		argTypes: {
			disabled: {
				control: { type: "boolean" },
				description: "Whether the file input is disabled",
			},
			multiple: {
				control: { type: "boolean" },
				description: "Allow multiple file selection",
			},
			buttonText: {
				control: { type: "text" },
				description: "Text for the button",
			},
			variant: {
				control: { type: "select" },
				options: ["default", "filled", "ghost"],
				description: "Button variant",
			},
			size: {
				control: { type: "select" },
				options: ["sm", "default", "lg"],
				description: "Button size",
			},
			showCount: {
				control: { type: "boolean" },
				description: "Show file count in button text",
			},
			showFileList: {
				control: { type: "boolean" },
				description: "Show file list below button",
			},
		},
		args: {
			disabled: false,
			multiple: true,
			buttonText: "Choose Files",
			variant: "default",
			size: "default",
			showCount: true,
			showFileList: true,
		},
		parameters: {
			layout: "centered",
		},
	});

	// Shared validation examples
	const imageValidation = {
		acceptedTypes: ["image/*"],
		maxSize: 5 * 1024 * 1024, // 5MB
	};

	const documentValidation = {
		acceptedTypes: [".pdf", ".doc", ".docx", ".txt"],
		maxFiles: 3,
	};

	const singleFileValidation = {
		maxFiles: 1,
	};
</script>

<Story
	name="Default Variant"
	args={{
		buttonText: "Choose Files",
		variant: "default",
		size: "default",
	}}
/>

<Story
	name="Filled Variant"
	args={{
		buttonText: "Upload Media",
		variant: "filled",
		size: "lg",
	}}
/>

<Story
	name="Ghost Variant"
	args={{
		buttonText: "Add Files",
		variant: "ghost",
		size: "sm",
		showCount: false,
	}}
/>

<Story
	name="Small Size"
	args={{
		buttonText: "Upload",
		size: "sm",
	}}
/>

<Story
	name="Large Size"
	args={{
		buttonText: "Upload Files",
		size: "lg",
		variant: "filled",
	}}
/>

<Story
	name="Avatar Upload"
	args={{
		validation: { ...imageValidation, maxFiles: 1 },
		multiple: false,
		buttonText: "Upload Avatar",
		showFileList: false,
	}}
/>

<Story
	name="Document Upload"
	args={{
		validation: documentValidation,
		buttonText: "Upload Documents",
		variant: "default",
		showCount: true,
	}}
/>

<Story
	name="Images Only"
	args={{
		validation: imageValidation,
		buttonText: "Upload Images",
		variant: "filled",
	}}
/>

<Story
	name="Single File"
	args={{
		validation: singleFileValidation,
		multiple: false,
		buttonText: "Choose File",
		showCount: false,
	}}
/>

<Story
	name="No File Count"
	args={{
		buttonText: "Upload Files",
		showCount: false,
	}}
/>

<Story
	name="No File List"
	args={{
		buttonText: "Quick Upload",
		showFileList: false,
	}}
/>

<Story
	name="Disabled"
	args={{
		disabled: true,
		buttonText: "Upload Disabled",
		variant: "ghost",
	}}
/>

<!-- With Field Component -->
<Story name="Field with Label">
	{#snippet template()}
		<Field.Field
			label="Profile Photo"
			description="Upload your profile picture"
		>
			<FileInputButton
				validation={{
					maxFiles: 1,
					maxSize: 2 * 1024 * 1024,
					acceptedTypes: ["image/*"],
				}}
				multiple={false}
				buttonText="Choose Image"
				variant="filled"
				size="lg"
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Documents">
	{#snippet template()}
		<Field.Field
			label="Supporting Documents"
			description="Upload up to 3 documents (PDF, DOC, DOCX)"
			required
		>
			<FileInputButton
				validation={{
					maxFiles: 3,
					maxSize: 5 * 1024 * 1024,
					acceptedTypes: [".pdf", ".doc", ".docx"],
				}}
				buttonText="Upload Documents"
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Validation">
	{#snippet template()}
		<Field.Field
			label="Resume"
			description="PDF only, maximum 5MB"
			required
			error="Please upload your resume"
		>
			<FileInputButton
				error={true}
				validation={{
					maxFiles: 1,
					maxSize: 5 * 1024 * 1024,
					acceptedTypes: [".pdf"],
				}}
				multiple={false}
				buttonText="Choose Resume"
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Complete Form">
	{#snippet template()}
		<div class="w-full max-w-md">
			<Field.Set>
				<Field.Legend>File Uploads</Field.Legend>
				<Field.Description>Upload required files</Field.Description>

				<Field.Separator />

				<Field.Group class="gap-4">
					<Field.Field
						label="Profile Picture"
						description="JPG or PNG, max 2MB"
						required
					>
						<FileInputButton
							validation={{
								maxFiles: 1,
								maxSize: 2 * 1024 * 1024,
								acceptedTypes: ["image/*"],
							}}
							multiple={false}
							buttonText="Upload Photo"
							variant="filled"
							showFileList={false}
						/>
					</Field.Field>

					<Field.Field
						label="Resume"
						description="PDF format only"
						required
					>
						<FileInputButton
							validation={{
								maxFiles: 1,
								acceptedTypes: [".pdf"],
							}}
							multiple={false}
							buttonText="Choose Resume"
							variant="default"
						/>
					</Field.Field>

					<Field.Field
						label="Certificates (Optional)"
						description="Upload relevant certificates"
					>
						<FileInputButton
							validation={{
								maxFiles: 3,
								acceptedTypes: [".pdf", "image/*"],
							}}
							buttonText="Add Certificates"
							variant="ghost"
						/>
					</Field.Field>
				</Field.Group>

				<div class="flex gap-4 pt-4">
					<Button type="submit">Submit</Button>
					<Button variant="outline" type="button">Clear</Button>
				</div>
			</Field.Set>
		</div>
	{/snippet}
</Story>
