<script lang="ts">
	import { fileInputVariants } from "./utils/file-input-variants.js";
	import {
		createFileInputHandlers,
		removeFileFromArray,
	} from "./utils/file-input-hooks.js";
	import { createAcceptAttribute } from "./utils/file-input-utils.js";
	import type { DragDropFileInputProps } from "./utils/file-input-types.js";
	// import { Upload, AlertCircle } from '@lucide/svelte';
	import Upload from "@lucide/svelte/icons/upload";
	import AlertCircle from "@lucide/svelte/icons/circle-alert";
	import { cn } from "$lib/utils.js";

	let {
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
		error = false,
		label = "Drag and drop files here",
		description = "or click to select files",
		showFileList = true,
		height,
		...restProps
	}: DragDropFileInputProps = $props();

	let internalFiles = $state<File[]>([]);
	let isDragOver = $state(false);
	let currentState = $state<"default" | "dragover" | "error" | "disabled">(
		"default",
	);
	let errorMessage = $state<string | null>(null);
	let fileInputRef: HTMLInputElement;

	const fileHandlers = $derived.by(() => createFileInputHandlers(validation, {
		onFilesChange: (newFiles) => {
			if (newFiles) {
				internalFiles = Array.from(newFiles);
			} else {
				internalFiles = [];
			}
			onFilesChange?.(newFiles);
		},
		onError: (error) => {
			onError?.(error);
			errorMessage = error;
			currentState = "error";
			setTimeout(() => {
				errorMessage = null;
				currentState = disabled ? "disabled" : "default";
			}, 3000);
		},
	}));

	// Sync external files with internal state
	$effect(() => {
		if (files) {
			internalFiles = Array.from(files);
		} else {
			internalFiles = [];
		}
	});

	// Update state based on conditions
	$effect(() => {
		if (disabled) {
			currentState = "disabled";
		} else if (error) {
			currentState = "error";
		} else if (isDragOver) {
			currentState = "dragover";
		} else {
			currentState = "default";
		}
	});

	const acceptAttribute = $derived.by(() =>
		accept || createAcceptAttribute(validation.acceptedTypes),
	);

	const variants = $derived(
		fileInputVariants({
			variant: "default",
			size: "default",
			state: currentState,
		}),
	);

	function handleClick() {
		if (!disabled && fileInputRef) {
			fileInputRef.click();
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		if (!disabled) {
			isDragOver = true;
		}
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();

		// Only set isDragOver to false if we're leaving the container entirely
		const rect = (
			event.currentTarget as HTMLElement
		).getBoundingClientRect();
		const x = event.clientX;
		const y = event.clientY;

		if (
			x < rect.left ||
			x > rect.right ||
			y < rect.top ||
			y > rect.bottom
		) {
			isDragOver = false;
		}
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragOver = false;

		const droppedFiles = event.dataTransfer?.files;
		if (droppedFiles) {
			fileHandlers.handleDrop(event);
		}
	}

	function removeFile(index: number) {
		internalFiles = removeFileFromArray(
			internalFiles,
			index,
			onFilesChange,
		);
	}
</script>

<div
	class={variants.dragContainer({ class: className })}
	style={height ? `min-height: ${height}` : undefined}
	role="button"
	tabindex={disabled ? -1 : 0}
	aria-disabled={disabled}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
	onclick={handleClick}
	onkeydown={(e) => {
		if ((e.key === "Enter" || e.key === " ") && !disabled) {
			e.preventDefault();
			handleClick();
		}
	}}
	{...restProps}
>
	<input
		bind:this={fileInputRef}
		type="file"
		{id}
		{name}
		{multiple}
		accept={acceptAttribute}
		{required}
		{form}
		{disabled}
		class="sr-only"
		onchange={fileHandlers.handleInputChange}
	/>

	<div class={variants.dragContent()}>
		{#if currentState === "error"}
			<AlertCircle class="h-8 w-8 text-destructive mb-2" />
		{:else}
			<Upload class="h-8 w-8 text-muted-foreground mb-2" />
		{/if}
		<p
			class={cn(
				variants.dragText(),
				currentState === "error" && "text-destructive font-medium",
			)}
		>
			{label}
		</p>
		{#if description && currentState !== "error"}
			<p class={variants.dragSubtext()}>{description}</p>
		{/if}
		{#if errorMessage}
			<p class={variants.errorText()}>{errorMessage}</p>
		{/if}
	</div>

	{#if isDragOver && currentState !== "error"}
		<div
			class="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center"
		>
			<p class="text-sm font-medium text-primary">Drop files here</p>
		</div>
	{/if}
</div>

{#if showFileList && internalFiles.length > 0}
	<div class={variants.fileList()}>
		{#each internalFiles as file, index}
			<div class={variants.fileItem()}>
				<div class="flex-1 min-w-0">
					<p class="text-sm font-medium text-foreground truncate">
						{file.name}
					</p>
					<p class="text-xs text-muted-foreground">
						{(file.size / 1024 / 1024).toFixed(2)} MB
					</p>
				</div>
				<button
					type="button"
					class={variants.removeButton()}
					onclick={() => removeFile(index)}
					aria-label="Remove file"
				>
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		{/each}
	</div>
{/if}
