<script lang="ts" module>
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import CircleIcon from "@lucide/svelte/icons/circle";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { type VariantProps, tv } from "tailwind-variants";

	export const radioVariants = tv({
		base: "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 shadow-xs peer aspect-square shrink-0 rounded-full border outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
		variants: {
			size: {
				sm: "size-3",
				default: "size-4",
				lg: "size-5",
				xl: "size-6",
			},
			variant: {
				default: "",
				destructive: "data-[state=checked]:border-destructive",
				success: "data-[state=checked]:border-success",
				warning: "data-[state=checked]:border-warning",
			},
		},
		defaultVariants: {
			size: "default",
			variant: "default",
		},
	});

	export const radioIndicatorVariants = tv({
		base: "fill-primary",
		variants: {
			size: {
				sm: "size-1.5",
				default: "size-2",
				lg: "size-2.5",
				xl: "size-3",
			},
			variant: {
				default: "fill-primary",
				destructive: "fill-destructive",
				success: "fill-success",
				warning: "fill-warning",
			},
		},
		defaultVariants: {
			size: "default",
			variant: "default",
		},
	});

	export type RadioSize = VariantProps<typeof radioVariants>["size"];
	export type RadioVariant = VariantProps<typeof radioVariants>["variant"];

	export type RadioProps = WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> & {
		size?: RadioSize;
		variant?: RadioVariant;
		label?: string;
		description?: string;
		/**
		 * Error state - when true, applies error styling via aria-invalid
		 */
		error?: boolean;
		/**
		 * Callback function called when an error state is detected
		 */
		onError?: (error: boolean) => void;
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		class: className,
		size = "default",
		variant = "default",
		label,
		description,
		error = false,
		onError,
		...restProps
	}: RadioProps = $props();

	// Track error state and notify parent
	$effect(() => {
		if (onError) {
			onError(error);
		}
	});
</script>

<div class="flex gap-3 items-center-safe">
	<RadioGroupPrimitive.Item
		bind:ref
		data-slot="radio"
		class={cn(radioVariants({ size, variant }), className)}
		aria-invalid={error}
		{...restProps}
	>
		{#snippet children({ checked })}
			<div data-slot="radio-indicator" class="relative flex items-center justify-center">
				{#if checked}
					<CircleIcon
						class={cn(
							radioIndicatorVariants({ size, variant }),
							"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
						)}
					/>
				{/if}
			</div>
		{/snippet}
	</RadioGroupPrimitive.Item>

	{#if label || description}
		<div class="flex-1 space-y-1">
			{#if label}
				<label
					for={restProps.id}
					class={cn(
						"text-sm font-medium leading-none cursor-pointer transition-all",
						restProps.disabled && "cursor-not-allowed opacity-50"
					)}
				>
					{label}
				</label>
			{/if}
			{#if description}
				<p
					class={cn(
						"text-sm text-muted-foreground transition-all",
						restProps.disabled && "opacity-50"
					)}
				>
					{description}
				</p>
			{/if}
		</div>
	{/if}
</div>
