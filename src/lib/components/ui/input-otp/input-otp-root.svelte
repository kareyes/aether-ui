<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const inputOTPVariants = tv({
		base: "has-disabled:opacity-50 flex items-center gap-2 [&_input]:disabled:cursor-not-allowed",
		variants: {
			variant: {
				default: "",
				outline: "",
				underline: "gap-3",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type InputOTPVariant = VariantProps<typeof inputOTPVariants>["variant"];
	export type InputOTPSize = "sm" | "default" | "lg";
</script>

<script lang="ts">
	import { PinInput as InputOTPPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { setContext } from "svelte";
	import type { InputOTPSlotVariant, InputOTPSlotSize } from "./input-otp-slot.svelte";

	type Props = Omit<InputOTPPrimitive.RootProps, "size"> & {
		variant?: InputOTPVariant;
		size?: InputOTPSize;
	};

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		variant = "default",
		size = "default",
		...restProps
	}: Props = $props();

	// Provide variant and size context to child components
	setContext<{ variant: InputOTPSlotVariant; size: InputOTPSlotSize }>("input-otp-context", {
		get variant() {
			return variant as InputOTPSlotVariant;
		},
		get size() {
			return size as InputOTPSlotSize;
		},
	});
</script>

<InputOTPPrimitive.Root
	bind:ref
	bind:value
	data-slot="input-otp"
	data-variant={variant}
	data-size={size}
	class={cn(inputOTPVariants({ variant }), className)}
	{...restProps}
/>
