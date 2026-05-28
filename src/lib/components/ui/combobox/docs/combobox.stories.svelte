<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Combobox from "../combobox.svelte";

	const { Story } = defineMeta({
		title: "Components/Combobox",
		component: Combobox,
		tags: ["autodocs"],
		argTypes: {
			placeholder: { control: "text" },
			searchPlaceholder: { control: "text" },
			emptyMessage: { control: "text" },
			triggerVariant: {
				control: "select",
				options: ["default", "secondary", "outline", "ghost", "destructive"],
			},
			triggerSize: {
				control: "select",
				options: ["sm", "default", "lg"],
			},
			align: {
				control: "select",
				options: ["start", "center", "end"],
			},
			side: {
				control: "select",
				options: ["top", "right", "bottom", "left"],
			},
		},
	});
</script>

<script lang="ts">
	const frameworks = [
		{ value: "sveltekit", label: "SvelteKit" },
		{ value: "next.js", label: "Next.js" },
		{ value: "nuxt.js", label: "Nuxt.js" },
		{ value: "remix", label: "Remix" },
		{ value: "astro", label: "Astro" },
		{ value: "gatsby", label: "Gatsby" },
		{ value: "angular", label: "Angular" },
		{ value: "vue", label: "Vue" },
		{ value: "react", label: "React" },
	];

	const languages = [
		{ value: "javascript", label: "JavaScript" },
		{ value: "typescript", label: "TypeScript" },
		{ value: "python", label: "Python" },
		{ value: "java", label: "Java" },
		{ value: "csharp", label: "C#" },
		{ value: "go", label: "Go" },
		{ value: "rust", label: "Rust" },
		{ value: "ruby", label: "Ruby" },
		{ value: "php", label: "PHP" },
		{ value: "swift", label: "Swift" },
	];

	const countries = [
		{ value: "us", label: "United States" },
		{ value: "uk", label: "United Kingdom" },
		{ value: "ca", label: "Canada" },
		{ value: "au", label: "Australia" },
		{ value: "de", label: "Germany" },
		{ value: "fr", label: "France" },
		{ value: "jp", label: "Japan" },
		{ value: "cn", label: "China" },
	];

	const statusItems = [
		{ value: "active", label: "Active" },
		{ value: "inactive", label: "Inactive" },
		{ value: "pending", label: "Pending" },
		{ value: "archived", label: "Archived" },
	];

	let selectedValue = $state("");
</script>

<!-- Default -->
<Story name="Default"
	args={{
		items: frameworks,
		placeholder: "Select framework...",
		searchPlaceholder: "Search framework..."
	}}
/>

<!-- With Initial Value -->
<Story name="With Initial Value"
	args={{
		items: frameworks,
		value: "sveltekit"
	}}
/>

<!-- Custom Placeholder -->
<Story name="Custom Placeholder"
	args={{
		items: languages,
		placeholder: "Pick a language...",
		searchPlaceholder: "Type to search...",
		emptyMessage: "No language found."
	}}
/>

<!-- Different Sizes -->
<Story name="Small Size"
	args={{
		items: frameworks,
		triggerSize: "sm",
		placeholder: "Select framework..."
	}}
/>

<Story name="Large Size"
	args={{
		items: frameworks,
		triggerSize: "lg",
		placeholder: "Select framework..."
	}}
/>

<!-- Different Variants -->
<Story name="Default Variant"
	args={{
		items: frameworks,
		triggerVariant: "default",
		placeholder: "Select framework..."
	}}
/>

<Story name="Secondary Variant"
	args={{
		items: frameworks,
		triggerVariant: "secondary",
		placeholder: "Select framework..."
	}}
/>

<Story name="Ghost Variant"
	args={{
		items: frameworks,
		triggerVariant: "ghost",
		placeholder: "Select framework..."
	}}
/>

<!-- Full Width -->
<Story name="Full Width"
	args={{
		items: frameworks,
		triggerClass: "w-full",
		contentClass: "w-[var(--bits-popover-trigger-width)]",
		placeholder: "Select framework..."
	}}
/>

<!-- Custom Width -->
<Story name="Custom Width"
	args={{
		items: countries,
		triggerClass: "w-[300px]",
		contentClass: "w-[300px]",
		placeholder: "Select country...",
		searchPlaceholder: "Search countries..."
	}}
/>

<!-- With Disabled Items -->
<Story name="With Disabled Items"
	args={{
		items: [
			{ value: "option1", label: "Option 1" },
			{ value: "option2", label: "Option 2", disabled: true },
			{ value: "option3", label: "Option 3" },
			{ value: "option4", label: "Option 4", disabled: true },
			{ value: "option5", label: "Option 5" },
		],
		placeholder: "Select option..."
	}}
/>

<!-- Content Alignment -->
<Story name="Align Start"
	args={{
		items: frameworks,
		align: "start",
		placeholder: "Align Start"
	}}
/>

<Story name="Align Center"
	args={{
		items: frameworks,
		align: "center",
		placeholder: "Align Center"
	}}
/>

<Story name="Align End"
	args={{
		items: frameworks,
		align: "end",
		placeholder: "Align End"
	}}
/>

<!-- Reactive Value -->
<!-- <Story name="Reactive Value">
	{@const value = $state("next.js")}
	<div class="space-y-4">
		<Combobox
			items={frameworks}
			bind:value
			placeholder="Select framework..."
		/>
		<div class="text-sm text-muted-foreground">
			Selected: <span class="font-medium">{value || "None"}</span>
		</div>
	</div>
</Story> -->

<!-- Multiple Comboboxes -->
<!-- <Story name="Multiple Comboboxes">
	{@const framework = $state("")}
	{@const language = $state("")}
	{@const country = $state("")}
	<div class="space-y-4">
		<div class="space-y-2">
			<label class="text-sm font-medium">Framework</label>
			<Combobox
				items={frameworks}
				bind:value={framework}
				placeholder="Select framework..."
			/>
		</div>
		<div class="space-y-2">
			<label class="text-sm font-medium">Language</label>
			<Combobox
				items={languages}
				bind:value={language}
				placeholder="Select language..."
			/>
		</div>
		<div class="space-y-2">
			<label class="text-sm font-medium">Country</label>
			<Combobox
				items={countries}
				bind:value={country}
				placeholder="Select country..."
			/>
		</div>
	</div>
</Story> -->
