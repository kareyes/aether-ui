import Root from "./skeleton.svelte";
import Text from "./skeleton-text.svelte";
import Avatar from "./skeleton-avatar.svelte";
import Card from "./skeleton-card.svelte";
import Table from "./skeleton-table.svelte";

export type {
	SkeletonVariant,
	SkeletonAnimation,
	SkeletonShape,
	SkeletonSize,
	SkeletonProps,
} from "./skeleton.svelte";

export type { SkeletonTextProps } from "./skeleton-text.svelte";
export type { SkeletonAvatarProps } from "./skeleton-avatar.svelte";
export type { SkeletonCardProps } from "./skeleton-card.svelte";
export type { SkeletonTableProps } from "./skeleton-table.svelte";

export { skeletonVariants } from "./skeleton.svelte";

export {
	Root,
	Text,
	Avatar,
	Card,
	Table,
	//
	Root as Skeleton,
	Text as SkeletonText,
	Avatar as SkeletonAvatar,
	Card as SkeletonCard,
	Table as SkeletonTable,
};
