// Main component
export { default as FileInput } from "./file-input.svelte";

// Specific mode components
export { default as FileInputDragDrop } from "./file-input-drag-drop.svelte";
export { default as FileInputRegular } from "./file-input-regular.svelte";
export { default as FileInputButton } from "./file-input-button.svelte";

// Utilities
export { fileInputVariants } from "./utils/file-input-variants.js";
export type {
	FileInputVariant,
	FileInputSize,
	FileInputState,
} from "./utils/file-input-variants.js";

export {
	validateFiles,
	formatFileSize,
	removeFileFromList,
	createAcceptAttribute,
	commonFileTypes,
	commonSizeLimits,
} from "./utils/file-input-utils.js";
export type { FileValidationConfig } from "./utils/file-input-utils.js";

export {
	createFileInputHandlers,
	removeFileFromArray,
} from "./utils/file-input-hooks.js";

export type {
	FileInputMode,
	BaseFileInputProps,
	DragDropFileInputProps,
	RegularFileInputProps,
	ButtonFileInputProps,
	FileInputProps,
	FileItem,
	FileInputContext,
	FileInputAttributes,
	FileInputHandlers,
	FileInputValidationResult,
	FileInputTheme,
	FileTypeGroup,
	FILE_TYPE_GROUPS,
} from "./utils/file-input-types.js";
