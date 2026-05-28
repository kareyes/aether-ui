<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const breadcrumbLinkVariants = tv({
		base: "transition-colors inline-flex items-center gap-1.5",
		variants: {
			variant: {
				default: "hover:text-foreground",
				underline: "hover:text-foreground hover:underline underline-offset-4",
				bold: "hover:text-foreground font-medium",
				subtle: "hover:text-foreground/80"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	});

	export type BreadcrumbLinkVariant = VariantProps<typeof breadcrumbLinkVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		href = undefined,
		variant = "default",
		child,
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BreadcrumbLinkVariant;
		child?: Snippet<[{ props: HTMLAnchorAttributes }]>;
	} = $props();

	const attrs = $derived({
		"data-slot": "breadcrumb-link",
		class: cn(breadcrumbLinkVariants({ variant }), className),
		href,
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<a bind:this={ref} {...attrs}>
		{@render children?.()}
	</a>
{/if}
