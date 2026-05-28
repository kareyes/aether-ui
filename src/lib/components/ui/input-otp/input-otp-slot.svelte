<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const inputOTPSlotVariants = tv({
		base: "relative flex items-center justify-center text-sm outline-none transition-all",
		variants: {
			variant: {
				default: "border-input aria-invalid:border-destructive dark:bg-input/30 border-y border-e first:rounded-s-md first:border-s last:rounded-e-md",
				outline: "border-input aria-invalid:border-destructive border rounded-md mx-0.5 first:ms-0 last:me-0",
				underline: "border-b-2 border-input aria-invalid:border-destructive bg-transparent rounded-none",
			},
			size: {
				sm: "size-8 text-sm",
				default: "size-9 text-sm",
				lg: "size-11 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type InputOTPSlotVariant = VariantProps<typeof inputOTPSlotVariants>["variant"];
	export type InputOTPSlotSize = VariantProps<typeof inputOTPSlotVariants>["size"];
</script>

<script lang="ts">
	import { PinInput as InputOTPPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		cell,
		class: className,
		...restProps
	}: InputOTPPrimitive.CellProps = $props();

	const otpContext = getContext<{ variant: InputOTPSlotVariant; size: InputOTPSlotSize }>("input-otp-context");
	const variant = $derived(otpContext?.variant ?? "default");
	const size = $derived(otpContext?.size ?? "default");

	const activeStyles = $derived.by(() => {
		const base = "z-10 ring-[3px] ring-offset-background";
		if (variant === "underline") {
			return `${base} border-ring ring-ring/50 aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20`;
		}
		return `${base} border-ring ring-ring/50 aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20`;
	});
</script>

<InputOTPPrimitive.Cell
	{cell}
	bind:ref
	data-slot="input-otp-slot"
	class={cn(
		inputOTPSlotVariants({ variant, size }),
		cell.isActive && activeStyles,
		className
	)}
	{...restProps}
>
	{cell.char}
	{#if cell.hasFakeCaret}
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<div class="animate-caret-blink bg-foreground h-4 w-px duration-1000"></div>
		</div>
	{/if}
</InputOTPPrimitive.Cell>
