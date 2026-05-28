import Root from "./progress.svelte";
import ProgressImpl from "./progress-impl.svelte";

export {
	Root,
	// Declarative single-component API
	ProgressImpl as Progress,
	// Named alias for primitive imports
	Root as ProgressRoot,
};

export type {
	ProgressVariant,
	ProgressSize,
	ProgressRadius,
	ProgressAnimation,
} from "./progress.svelte";
