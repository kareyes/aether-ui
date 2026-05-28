<script lang="ts">
	import { fileInputVariants } from './utils/file-input-variants.js';
	import { createFileInputHandlers, removeFileFromArray } from './utils/file-input-hooks.js';
	import { createAcceptAttribute } from './utils/file-input-utils.js';
	import type { ButtonFileInputProps } from './utils/file-input-types.js';
	import { Upload, AlertCircle } from '@lucide/svelte';
	import { cn } from '$lib/utils.js';

	let {
		files = $bindable(null),
		validation = {},
		onFilesChange,
		onError,
		disabled = false,
		class: className = '',
		id,
		name,
		multiple = false,
		accept,
		required = false,
		form,
		error = false,
		buttonText = 'Choose Files',
		variant = 'default',
		size = 'default',
		showCount = true,
		showFileList = true,
		...restProps
	}: ButtonFileInputProps = $props();

	let internalFiles = $state<File[]>([]);
	let currentState = $state<'default' | 'error' | 'disabled'>('default');
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
			currentState = "error";
			setTimeout(() => { 
				currentState = disabled ? "disabled" : "default"; 
			}, 3000);
		}
	}));

	// Sync external files with internal state
	$effect(() => {
		if (files) {
			internalFiles = Array.from(files);
		} else {
			internalFiles = [];
		}
	});

	// Update state based on disabled and error props
	$effect(() => {
		if (disabled) {
			currentState = "disabled";
		} else if (error) {
			currentState = "error";
		} else {
			currentState = "default";
		}
	});

	const acceptAttribute = $derived.by(() => accept || createAcceptAttribute(validation.acceptedTypes));

	const variants = $derived.by(() => fileInputVariants({
		variant: variant === 'danger' ? 'default' : variant,
		size,
		state: currentState
	}));

	const fileCount = $derived.by(() => internalFiles.length);
	const buttonDisplayText = $derived.by(() =>
		showCount && fileCount > 0 
			? `${buttonText} (${fileCount})`
			: buttonText
	);

	function handleButtonClick() {
		if (!disabled) {
			fileInputRef?.click();
		}
	}

	function removeFile(index: number) {
		internalFiles = removeFileFromArray(internalFiles, index, onFilesChange);
	}
</script>

<div class={variants.buttonContainer({ class: className })}>
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
		{...restProps}
	/>

	<button
		type="button"
		class={cn(
			variants.button(),
			currentState === 'error' && 'ring-2 ring-destructive/20'
		)}
		onclick={handleButtonClick}
		{disabled}
		aria-describedby={fileCount > 0 ? `${id}-files` : undefined}
	>
		{#if currentState === 'error'}
			<AlertCircle class="h-4 w-4 mr-2 text-destructive" />
		{:else}
			<Upload class="h-4 w-4 mr-2" />
		{/if}
		{buttonDisplayText}
	</button>

	{#if showFileList && internalFiles.length > 0}
		<div class={variants.fileList()} id="{id}-files">
			{#each internalFiles as file, index}
				<div class={variants.fileItem()}>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium text-foreground truncate">{file.name}</p>
						<p class="text-xs text-muted-foreground">
							{(file.size / 1024 / 1024).toFixed(2)} MB
						</p>
					</div>
					<button
						type="button"
						class={variants.removeButton()}
						onclick={() => removeFile(index)}
						aria-label="Remove {file.name}"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>