<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const alertVariants = tv({
		base: "relative w-full rounded-lg border px-4 py-3 text-sm transition-all",
		variants: {
			variant: {
				default: "bg-card text-card-foreground border-border",
				info: "bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800",
				success: "bg-success/10 dark:bg-success/10 text-green-900 dark:text-green-200 border-success dark:border-success/80",
				warning: "bg-warning/10 dark:bg-warning/10 text-yellow-900 dark:text-yellow-200 border-warning dark:border-warning/80",
				error: "bg-danger/10 dark:bg-danger/10 text-red-900 dark:text-red-200 border-danger/30 dark:border-danger/80",
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
