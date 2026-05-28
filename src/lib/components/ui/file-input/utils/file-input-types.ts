import type { HTMLInputAttributes } from "svelte/elements";
import type { FileValidationConfig } from "./file-input-utils.js";

/**
 * File input mode variants
 */
export type FileInputMode = "drag-drop" | "regular" | "button-only";

/**
 * Base file input props shared across all modes
 */
export interface BaseFileInputProps {
	/** Files currently selected */
	files?: FileList | null;

	/** File validation configuration */
	validation?: FileValidationConfig;

	/** Callback when files change */
	onFilesChange?: (files: FileList | null) => void;

	/** Error callback */
	onError?: (error: string) => void;

	/** Whether the input is disabled */
	disabled?: boolean;

	/** Custom classes */
	class?: string;

	/** Input ID */
	id?: string;

	/** Input name */
	name?: string;

	/** Whether multiple files are allowed */
	multiple?: boolean;

	/** Accepted file types */
	accept?: string;

	/** Required field */
	required?: boolean;

	/** Form attribute */
	form?: string;

	/** Whether to show error state */
	error?: boolean;

	/** Blur event handler — called when the interactive element loses focus */
	onblur?: (event: FocusEvent) => void;
}

/**
 * Drag and drop specific props
 */
export interface DragDropFileInputProps extends BaseFileInputProps {
	/** Drop zone label text */
	label?: string;

	/** Drop zone description text */
	description?: string;

	/** Show file list below drop zone */
	showFileList?: boolean;

	/** Custom drop zone height */
	height?: string;
}

/**
 * Regular input specific props
 */
export interface RegularFileInputProps extends BaseFileInputProps {
	/** Input label */
	label?: string;

	/** Input placeholder text */
	placeholder?: string;

	/** Show selected files count */
	showFileCount?: boolean;

	/** Show file list */
	showFileList?: boolean;
}

/**
 * Button-only input specific props
 */
export interface ButtonFileInputProps extends BaseFileInputProps {
	/** Button text */
	buttonText?: string;

	/** Button variant */
	variant?: "default" | "filled" | "ghost" | "danger";

	/** Button size */
	size?: "sm" | "default" | "lg";

	/** Show selected files count in button */
	showCount?: boolean;

	/** Show file list below button */
	showFileList?: boolean;
}

/**
 * Complete file input props with mode selection
 */
export interface FileInputProps extends BaseFileInputProps {
	/** Input mode */
	mode?: FileInputMode;

	/** Mode-specific props */
	dragDropProps?: Partial<DragDropFileInputProps>;
	regularProps?: Partial<RegularFileInputProps>;
	buttonProps?: Partial<ButtonFileInputProps>;
}

/**
 * File item for display in file lists
 */
export interface FileItem {
	/** File object */
	file: File;

	/** File index in the list */
	index: number;

	/** Whether the file is valid */
	isValid: boolean;

	/** Validation error message if invalid */
	error?: string;
}

/**
 * File input context for child components
 */
export interface FileInputContext {
	/** Current files */
	files: File[];

	/** Current validation state */
	validation: FileValidationConfig;

	/** Remove file handler */
	removeFile: (index: number) => void;

	/** Current input state */
	currentState: string;

	/** Whether drag is active (for drag-drop mode) */
	isDragOver?: boolean;
}

/**
 * Extended HTML input attributes
 */
export interface FileInputAttributes
	extends Omit<HTMLInputAttributes, "type" | "files"> {
	type?: "file";
	files?: FileList | null;
}

/**
 * File input event handlers
 */
export interface FileInputHandlers {
	onchange?: (event: Event) => void;
	ondragover?: (event: DragEvent) => void;
	ondragleave?: (event: DragEvent) => void;
	ondrop?: (event: DragEvent) => void;
	onclick?: (event: MouseEvent) => void;
}

/**
 * File input validation result
 */
export interface FileInputValidationResult {
	/** Whether all files are valid */
	isValid: boolean;

	/** Error message if validation failed */
	error?: string;

	/** Valid files */
	validFiles: File[];

	/** Invalid files with reasons */
	invalidFiles: Array<{
		file: File;
		reason: string;
	}>;
}

/**
 * File input theme customization
 */
export interface FileInputTheme {
	/** Container styles */
	container?: string;

	/** Input styles */
	input?: string;

	/** Label styles */
	label?: string;

	/** Error styles */
	error?: string;

	/** File list styles */
	fileList?: string;

	/** File item styles */
	fileItem?: string;
}

/**
 * Common file type groups
 */
export const FILE_TYPE_GROUPS = {
	images: ["image/*"],
	documents: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
	spreadsheets: [".xlsx", ".xls", ".csv"],
	archives: [".zip", ".rar", ".7z", ".tar", ".gz"],
	media: ["video/*", "audio/*"],
	code: [".js", ".ts", ".html", ".css", ".json", ".xml"],
} as const;

/**
 * File type group keys
 */
export type FileTypeGroup = keyof typeof FILE_TYPE_GROUPS;
