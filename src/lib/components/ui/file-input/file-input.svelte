<script lang="ts">
	import FileInputDragDrop from "./file-input-drag-drop.svelte";
	import FileInputRegular from "./file-input-regular.svelte";
	import FileInputButton from "./file-input-button.svelte";
	import type { FileInputProps } from "./utils/file-input-types.js";

	let {
		mode = "regular",
		files = $bindable(null),
		validation = {},
		onFilesChange,
		onError,
		disabled = false,
		class: className = "",
		id,
		name,
		multiple = false,
		accept,
		required = false,
		form,
		dragDropProps = {},
		regularProps = {},
		buttonProps = {},
		...restProps
	}: FileInputProps = $props();

	// Common props to pass to all components
	const commonProps = $derived.by(() => ({
		files,
		validation,
		onFilesChange,
		onError,
		disabled,
		class: className,
		id,
		name,
		multiple,
		accept,
		required,
		form,
		...restProps,
	}));
</script>

{#if mode === "drag-drop"}
	<FileInputDragDrop {...commonProps} {...dragDropProps} />
{:else if mode === "regular"}
	<FileInputRegular {...commonProps} {...regularProps} />
{:else if mode === "button-only"}
	<FileInputButton {...commonProps} {...buttonProps} />
{/if}
