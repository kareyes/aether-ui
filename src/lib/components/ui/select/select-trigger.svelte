<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const selectTriggerVariants = tv({
		base: "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 shadow-xs flex w-fit select-none items-center justify-between gap-2 whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: "",
				outline: "border-2 bg-background hover:bg-accent hover:text-accent-foreground",
				filled: "bg-muted border-transparent hover:bg-muted/80",
				ghost: "border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground",
				underline: "border-0 border-b-2 rounded-none px-0 focus-visible:border-b-primary",
			},
			size: {
				sm: "h-8 px-2 text-xs",
				default: "h-9 px-3 py-2 text-sm",
				lg: "h-10 px-4 text-base",
			},
		},
		compoundVariants: [
			{
				variant: "underline",
				size: "sm",
				class: "h-6",
			},
			{
				variant: "underline", 
				size: "lg",
				class: "h-12",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type SelectTriggerVariant = VariantProps<typeof selectTriggerVariants>["variant"];
	export type SelectTriggerSize = VariantProps<typeof selectTriggerVariants>["size"];
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { Spinner } from '$lib/components/ui/spinner';
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		variant = "default",
		error = false,
		loading = false,
		onError,
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> & {
		size?: SelectTriggerSize;
		variant?: SelectTriggerVariant;
		/**
		 * Error state - when true, applies error styling via aria-invalid
		 */
		error?: boolean;
		/**
		 * Loading state - when true, shows a spinner
		 */
		loading?: boolean;
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

<SelectPrimitive.Trigger
	bind:ref
	data-slot="select-trigger"
	data-size={size}
	data-variant={variant}
	aria-invalid={error}
	class={cn(
		selectTriggerVariants({ variant, size }),
		error && "border-destructive ring-destructive/20 ring-[3px]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	{#if loading}
		<Spinner class="opacity-50" />
	{:else}
		<ChevronDownIcon class="size-4 opacity-50" />
	{/if}
</SelectPrimitive.Trigger>
