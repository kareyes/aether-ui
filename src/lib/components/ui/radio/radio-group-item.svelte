<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const radioGroupItemVariants = tv({
		base: "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 shadow-xs aspect-square shrink-0 rounded-full border outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
		variants: {
			variant: {
				default: "",
				card: "bg-background border-2",
				inline: "",
			},
			size: {
				sm: "size-3",
				default: "size-4",
				lg: "size-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "sm",
		},
	});

	export type RadioGroupItemVariant = VariantProps<typeof radioGroupItemVariants>["variant"];
	export type RadioGroupItemSize = VariantProps<typeof radioGroupItemVariants>["size"];
</script>

<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import CircleIcon from "@lucide/svelte/icons/circle";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		size = "default",
		error = false,
		onError,
		...restProps
	}: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> & {
		variant?: RadioGroupItemVariant;
		size?: RadioGroupItemSize;
		/**
		 * Error state - when true, applies error styling via aria-invalid
		 */
		error?: boolean;
		/**
		 * Callback function called when an error state is detected
		 */
		onError?: (error: boolean) => void;
	} = $props();

	// Track error state and notify parent
	$effect(() => {
		if (onError) {
			onError(error);
		}
	});


</script>

<RadioGroupPrimitive.Item
	bind:ref
	data-slot="radio-group-item"
	data-variant={variant}
	data-size={size}
	aria-invalid={error}
	class={cn(radioGroupItemVariants({ variant, size }), className)}
	{...restProps}
>
	{#snippet children({ checked })}
		<div data-slot="radio-group-indicator" class="relative flex items-center justify-center">
			{#if checked}
				<CircleIcon
					class={cn("fill-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2")}
				/>
			{/if}
		</div>
	{/snippet}
</RadioGroupPrimitive.Item>
