import { tick } from "svelte";

export function useAutoResize(
	element: HTMLTextAreaElement | null,
	enabled: boolean,
	minRows?: number,
	maxRows?: number,
) {
	if (!element || !enabled) return () => {};

	const resize = () => {
		if (!element) return;

		// Reset height to auto to get correct scrollHeight
		element.style.height = "auto";

		// Calculate line height
		const styles = window.getComputedStyle(element);
		const lineHeight = parseFloat(styles.lineHeight);
		const paddingTop = parseFloat(styles.paddingTop);
		const paddingBottom = parseFloat(styles.paddingBottom);

		// Calculate min and max heights based on rows
		let minHeight = 0;
		let maxHeight = Infinity;

		if (minRows) {
			minHeight = lineHeight * minRows + paddingTop + paddingBottom;
		}

		if (maxRows) {
			maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;
		}

		// Set new height
		const newHeight = Math.min(
			Math.max(element.scrollHeight, minHeight),
			maxHeight,
		);
		element.style.height = `${newHeight}px`;
	};

	// Initial resize
	tick().then(resize);

	// Listen for input events
	element.addEventListener("input", resize);

	// Cleanup function
	return () => {
		element?.removeEventListener("input", resize);
	};
}

export function getCharacterCount(
	value: string | undefined | null,
	maxLength?: number,
): string {
	const current = value?.length || 0;
	return maxLength ? `${current}/${maxLength}` : `${current}`;
}
