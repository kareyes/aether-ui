/**
 * File input utilities for validation and formatting
 */

export interface FileValidationConfig {
	maxFiles?: number;
	maxSize?: number; // in bytes
	acceptedTypes?: string[];
}

export interface FileValidationResult {
	isValid: boolean;
	error?: string;
}

/**
 * Validates a FileList against the provided configuration
 *
 * @param fileList - The FileList to validate
 * @param config - Validation configuration
 * @returns Validation result
 */
export function validateFiles(
	fileList: FileList,
	config: FileValidationConfig,
): FileValidationResult {
	const filesArray = Array.from(fileList);

	// Check max files
	if (config.maxFiles && filesArray.length > config.maxFiles) {
		return {
			isValid: false,
			error: `Maximum ${config.maxFiles} file${config.maxFiles > 1 ? "s" : ""} allowed`,
		};
	}

	// Check file types
	if (config.acceptedTypes && config.acceptedTypes.length > 0) {
		for (const file of filesArray) {
			const isValidType = config.acceptedTypes.some((type) => {
				if (type.startsWith(".")) {
					return file.name.toLowerCase().endsWith(type.toLowerCase());
				}
				return file.type.match(type.replace("*", ".*"));
			});

			if (!isValidType) {
				return {
					isValid: false,
					error: `File type not accepted: ${file.name}`,
				};
			}
		}
	}

	// Check file sizes
	if (config.maxSize) {
		for (const file of filesArray) {
			if (file.size > config.maxSize) {
				return {
					isValid: false,
					error: `File too large: ${file.name} (${formatFileSize(file.size)} > ${formatFileSize(config.maxSize)})`,
				};
			}
		}
	}

	return { isValid: true };
}

/**
 * Formats file size in human-readable format
 *
 * @param bytes - Size in bytes
 * @returns Formatted size string
 */
export function formatFileSize(bytes: number): string {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Removes a file from an array and creates a new FileList-like object
 *
 * @param files - Array of files
 * @param index - Index to remove
 * @returns New FileList
 */
export function removeFileFromList(files: File[], index: number): FileList {
	const updatedFiles = files.filter((_, i) => i !== index);

	// Create a new FileList-like object
	const dataTransfer = new DataTransfer();
	updatedFiles.forEach((file) => dataTransfer.items.add(file));

	return dataTransfer.files;
}

/**
 * Creates an accept attribute string from accepted types array
 *
 * @param acceptedTypes - Array of accepted file types
 * @returns Accept attribute string or undefined
 */
export function createAcceptAttribute(
	acceptedTypes?: string[],
): string | undefined {
	if (!acceptedTypes || acceptedTypes.length === 0) return undefined;
	return acceptedTypes.join(",");
}

/**
 * Common file type patterns
 */
export const commonFileTypes = {
	IMAGES: ["image/*"],
	DOCUMENTS: [".pdf", ".doc", ".docx", ".txt"],
	SPREADSHEETS: [".xlsx", ".xls", ".csv"],
	PRESENTATIONS: [".pptx", ".ppt"],
	VIDEOS: ["video/*"],
	AUDIO: ["audio/*"],
	ARCHIVES: [".zip", ".rar", ".7z"],
	CODE: [".js", ".ts", ".py", ".java", ".cpp", ".c", ".html", ".css"],
} as const;

/**
 * Common size limits
 */
export const commonSizeLimits = {
	SMALL: 1024 * 1024, // 1MB
	MEDIUM: 5 * 1024 * 1024, // 5MB
	LARGE: 10 * 1024 * 1024, // 10MB
	XLARGE: 50 * 1024 * 1024, // 50MB
} as const;
