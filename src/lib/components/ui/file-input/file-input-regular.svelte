<script lang="ts">
	import { fileInputVariants } from "./utils/file-input-variants.js";
	import {
		createFileInputHandlers,
		removeFileFromArray,
	} from "./utils/file-input-hooks.js";
	import { createAcceptAttribute } from "./utils/file-input-utils.js";
	import type { RegularFileInputProps } from "./utils/file-input-types.js";
	import { File as FileIcon, Upload, X } from "@lucide/svelte";
	import {
		InputGroup,
		InputGroupInput,
		InputGroupAddon,
		InputGroupButton,
	} from "$lib/components/ui/input-group";
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
		placeholder = "Choose files...",
		showFileCount = true,
		showFileList = true,
		...restProps
	}: RegularFileInputProps = $props();

	let internalFiles = $state<File[]>([]);
	let currentState = $state<"default" | "error" | "disabled">("default");
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

	const acceptAttribute = $derived.by(() =>
		accept || createAcceptAttribute(validation.acceptedTypes),
	);

	const variants = $derived.by(() =>
		fileInputVariants({
			variant: "default",
			size: "default",
			state: currentState,
		}),
	);

	const fileCount = $derived.by(() => internalFiles.length);
	const displayText = $derived.by(() =>
		fileCount > 0
			? showFileCount
				? `${fileCount} file${fileCount !== 1 ? "s" : ""} selected`
				: internalFiles.map((f) => f.name).join(", ")
			: placeholder,
	);

	function removeFile(index: number) {
		internalFiles = removeFileFromArray(
			internalFiles,
			index,
			onFilesChange,
		);
	}

	function clearAllFiles() {
		internalFiles = [];
		if (fileInputRef) {
			fileInputRef.value = "";
		}
		onFilesChange?.(null);
	}
</script>

<div class={cn("space-y-2", className)}>
	<div>
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

		<InputGroup
			class={cn(
				"transition-all",
				currentState === "error" &&
					"border-destructive ring-destructive/20",
				disabled && "opacity-50 cursor-not-allowed",
			)}
		>
			<InputGroupAddon align="inline-start">
				<FileIcon class="size-4" />
			</InputGroupAddon>

			<button
				type="button"
				onclick={() => fileInputRef?.click()}
				{disabled}
				aria-describedby={fileCount > 0 ? `${id}-files` : undefined}
				class={cn(
					"flex-1 px-3 py-2 text-left bg-transparent text-sm outline-none transition-colors",
					"focus:outline-none",
					disabled && "cursor-not-allowed",
					!disabled && "cursor-pointer",
				)}
			>
				<span
					class={cn(
						"truncate block",
						fileCount === 0 && "text-muted-foreground",
					)}
				>
					{displayText}
				</span>
			</button>

			{#if fileCount > 0}
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						size="icon-xs"
						variant="ghost"
						onclick={clearAllFiles}
						{disabled}
						aria-label="Clear all files"
					>
						<X class="size-3.5" />
					</InputGroupButton>
				</InputGroupAddon>
			{/if}

			<InputGroupAddon align="inline-end">
				<InputGroupButton
					size="xs"
					onclick={() => fileInputRef?.click()}
					{disabled}
				>
					<Upload class="size-3.5" />
					Browse
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	</div>

	{#if showFileList && internalFiles.length > 0}
		<div class={variants.fileList()} id="{id}-files">
			{#each internalFiles as file, index}
				<div
					class={cn(
						"flex items-center gap-3 p-2.5 rounded-md border border-border bg-muted/30 hover:bg-muted/50 transition-colors",
						"group",
					)}
				>
					<div
						class="flex items-center justify-center w-8 h-8 rounded bg-primary/10"
					>
						<FileIcon class="size-4 text-primary" />
					</div>

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
						class={cn(
							"flex items-center justify-center w-6 h-6 rounded hover:bg-destructive/10",
							"text-muted-foreground hover:text-destructive transition-colors",
							"opacity-0 group-hover:opacity-100",
						)}
						onclick={() => removeFile(index)}
						aria-label="Remove {file.name}"
					>
						<X class="size-4" />
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
