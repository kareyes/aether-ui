import { type FileInputState } from "./file-input-variants.js";
import {
	validateFiles,
	type FileValidationConfig,
} from "./file-input-utils.js";

/**
 * Creates file input handlers and state management
 *
 * @param config - File validation configuration
 * @param callbacks - Event callbacks
 */
export function createFileInputHandlers(
	config: FileValidationConfig,
	callbacks: {
		onFilesChange?: (files: FileList | null) => void;
		onError?: (error: string) => void;
	} = {},
) {
	/**
	 * Handles file change events from input or drop
	 */
	function handleFileChange(files: FileList | null) {
		if (!files) return;

		const validation = validateFiles(files, config);
		if (!validation.isValid) {
			callbacks.onError?.(validation.error!);
			return;
		}

		callbacks.onFilesChange?.(files);
	}

	/**
	 * Handles input change events
	 */
	function handleInputChange(event: Event) {
		const input = event.target as HTMLInputElement;
		handleFileChange(input.files);
	}

	/**
	 * Drag and drop handlers
	 */
	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();

		const droppedFiles = event.dataTransfer?.files;
		if (droppedFiles) {
			handleFileChange(droppedFiles);
		}
	}

	return {
		handleInputChange,
		handleDragOver,
		handleDragLeave,
		handleDrop,
	};
}

/**
 * Removes a file from an array and creates a new FileList-like object
 *
 * @param files - Array of files
 * @param index - Index to remove
 * @param onChange - Callback when files change
 */
export function removeFileFromArray(
	files: File[],
	index: number,
	onChange?: (files: FileList | null) => void,
): File[] {
	const updatedFiles = files.filter((_, i) => i !== index);

	if (onChange) {
		// Create a new FileList-like object
		const dataTransfer = new DataTransfer();
		updatedFiles.forEach((file) => dataTransfer.items.add(file));

		const newFileList = dataTransfer.files;
		onChange(newFileList.length > 0 ? newFileList : null);
	}

	return updatedFiles;
}
