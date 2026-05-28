<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const popoverTriggerVariants = tv({
		base: "inline-flex items-center justify-center gap-2 outline-hidden transition-colors",
		variants: {
			variant: {
				default: "",
				button: "rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 font-medium shadow-sm disabled:pointer-events-none disabled:opacity-50",
				outline: "rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 font-medium disabled:pointer-events-none disabled:opacity-50",
				ghost: "rounded-md hover:bg-accent hover:text-accent-foreground px-4 py-2 font-medium disabled:pointer-events-none disabled:opacity-50",
				link: "text-primary underline-offset-4 hover:underline font-medium disabled:pointer-events-none disabled:opacity-50"
			},
			size: {
				default: "",
				sm: "px-3 py-1.5 text-sm",
				lg: "px-6 py-3 text-lg"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	});

	export type PopoverTriggerVariant = VariantProps<typeof popoverTriggerVariants>["variant"];
	export type PopoverTriggerSize = VariantProps<typeof popoverTriggerVariants>["size"];
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Popover as PopoverPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		size = "default",
		...restProps
	}: PopoverPrimitive.TriggerProps & {
		variant?: PopoverTriggerVariant;
		size?: PopoverTriggerSize;
	} = $props();
</script>

<PopoverPrimitive.Trigger
	bind:ref
	data-slot="popover-trigger"
	class={cn(popoverTriggerVariants({ variant, size }), className)}
	{...restProps}
/>
