<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const alertVariants = tv({
		base: "relative w-full rounded-lg border px-4 py-3 text-sm transition-all",
		variants: {
			variant: {
				default: "bg-card text-card-foreground border-border",
				info: "bg-info/10 text-info border-info/30 dark:border-info/80",
				success: "bg-success/10 text-success border-success dark:border-success/80",
				warning: "bg-warning/10 text-warning border-warning dark:border-warning/80",
				error: "bg-destructive/10 text-destructive border-destructive/30 dark:border-destructive/80",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type AlertVariant = VariantProps<typeof alertVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { X } from "@lucide/svelte";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		icon,
		dismissible = false,
		onDismiss,
		actions,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
		icon?: Snippet;
		dismissible?: boolean;
		onDismiss?: () => void;
		actions?: Snippet;
	} = $props();

	let visible = $state(true);

	function handleDismiss() {
		visible = false;
		onDismiss?.();
	}
</script>

{#if visible}
	<div
		bind:this={ref}
		data-slot="alert"
		class={cn(alertVariants({ variant }), className)}
		{...restProps}
		role="alert"
	>
		<div class="flex gap-3">
			{#if icon}
				<div class="flex-shrink-0 mt-0.5 items-start">
					{@render icon()}
				</div>
			{/if}
			<div class="flex-1 space-y-1 content-center">
				{@render children?.()}
			</div>
			{#if dismissible}
				<button
					onclick={handleDismiss}
					class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
					aria-label="Dismiss"
				>
					<X class="size-4" />
				</button>
			{/if}
		</div>
		{#if actions}
			<div class="mt-3 flex gap-2">
				{@render actions()}
			</div>
		{/if}
	</div>
{/if}
