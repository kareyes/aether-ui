import Root from "./empty.svelte";
import Header from "./empty-header.svelte";
import Media from "./empty-media.svelte";
import Title from "./empty-title.svelte";
import Description from "./empty-description.svelte";
import Content from "./empty-content.svelte";
import EmptyImpl from "./empty-impl.svelte";

export { emptyVariants } from "./empty.svelte";
export type { EmptyVariant, EmptySize } from "./empty.svelte";
export { emptyMediaVariants } from "./empty-media.svelte";
export type { EmptyMediaVariant } from "./empty-media.svelte";

export {
	Root,
	Header,
	Media,
	Title,
	Description,
	Content,
	// Declarative single-component API
	EmptyImpl as Empty,
	// Named aliases for primitive imports
	Root as EmptyRoot,
	Header as EmptyHeader,
	Media as EmptyMedia,
	Title as EmptyTitle,
	Description as EmptyDescription,
	Content as EmptyContent,
};
