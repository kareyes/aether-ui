<script lang="ts">
	import {
		Toaster,
		toast,
		type ToastSurfaceType,
		type ToasterPosition,
		type ToasterSize,
		type ToasterStyle,
	} from "$lib/components/ui/sonner";
	import { Button } from "$lib/components/ui/button";
	import { Card } from "$lib/components/ui/card";
	import { Switch } from "$lib/components/ui/switch";
	import { Label } from "$lib/components/ui/label";

	const VARIANTS: readonly ToasterStyle[] = [
		"default",
		"bordered",
		"filled",
		"minimal",
	];
	const SIZES: readonly ToasterSize[] = ["sm", "default", "lg"];
	const POSITIONS: readonly ToasterPosition[] = [
		"top-left",
		"top-center",
		"top-right",
		"bottom-left",
		"bottom-center",
		"bottom-right",
	];

	const TYPES: readonly ToastSurfaceType[] = [
		"default",
		"success",
		"error",
		"warning",
		"info",
		"loading",
	];

	/** Long enough to switch themes and watch the stack restyle in place. */
	const DEMO_TOAST_MS = 20_000;

	let variant = $state<ToasterStyle>("default");
	let size = $state<ToasterSize>("default");
	let position = $state<ToasterPosition>("bottom-right");
	let richColors = $state(true);
	let closeButton = $state(false);
	let expand = $state(false);

	// The wrapper derives its `toastOptions.classes` from these props, but
	// sonner hands those classes to a toast when it mounts. Re-keying the
	// Toaster on every knob remounts it, so toasts already on screen pick the
	// new styling up instead of keeping the config they were fired under.
	const configKey = $derived(
		`${variant}-${size}-${position}-${richColors}-${closeButton}-${expand}`,
	);

	// Keyed by type so a typo is a type error rather than a silent fall-through
	// to the untyped toast.
	const MESSAGES: Readonly<Record<ToastSurfaceType, string>> = {
		default: "Shift saved to the draft schedule",
		success: "Timesheet approved",
		error: "Payroll service unreachable",
		warning: "Week already published",
		info: "Cut-off moves to Friday",
		loading: "Recomputing hours…",
	};

	const fireOne = (type: ToastSurfaceType) => {
		const message = MESSAGES[type];
		const options = {
			description: `${variant} · ${size} · fired at ${new Date().toLocaleTimeString()}`,
		};
		if (type === "default") toast(message, options);
		else toast[type](message, options);
	};

	const fireAll = () => {
		toast.dismiss();
		for (const type of TYPES) fireOne(type);
	};
</script>

{#key configKey}
	<Toaster
		{variant}
		{size}
		{position}
		{richColors}
		{closeButton}
		{expand}
		visibleToasts={6}
		duration={DEMO_TOAST_MS}
	/>
{/key}

<div class="container mx-auto max-w-5xl space-y-12 p-8">
	<div class="mb-10">
		<h1 class="mb-2 text-4xl font-bold">Sonner Variants</h1>
		<p class="text-muted-foreground">
			The style matrix, and the surface for checking a theme against toasts.
			Toasts live for 20 s here and re-render when a knob moves, so you can
			fire the set once and then walk the theme picker in the nav — every
			toast should restyle in place. See
			<a class="text-primary underline" href="/sonner">the main page</a> for
			behaviour (promises, actions, dismissal).
		</p>
	</div>

	<!-- ─── Controls ───────────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Toaster Configuration</h2>
		<Card title="Knobs" description="Applies to the live Toaster on this page">
			<div class="space-y-6">
				<div class="space-y-2">
					<p class="text-sm font-medium">Variant</p>
					<div class="flex flex-wrap gap-2">
						{#each VARIANTS as option (option)}
							<Button
								text={option}
								size="sm"
								variant={variant === option ? "default" : "outline"}
								onclick={() => (variant = option)}
							/>
						{/each}
					</div>
				</div>

				<div class="space-y-2">
					<p class="text-sm font-medium">Size</p>
					<div class="flex flex-wrap gap-2">
						{#each SIZES as option (option)}
							<Button
								text={option}
								size="sm"
								variant={size === option ? "default" : "outline"}
								onclick={() => (size = option)}
							/>
						{/each}
					</div>
				</div>

				<div class="space-y-2">
					<p class="text-sm font-medium">Position</p>
					<div class="flex flex-wrap gap-2">
						{#each POSITIONS as option (option)}
							<Button
								text={option}
								size="sm"
								variant={position === option ? "default" : "outline"}
								onclick={() => (position = option)}
							/>
						{/each}
					</div>
				</div>

				<div class="flex flex-wrap gap-6">
					<div class="flex items-center gap-2">
						<Switch id="rich-colors" bind:checked={richColors} />
						<Label for="rich-colors">Rich colors</Label>
					</div>
					<div class="flex items-center gap-2">
						<Switch id="close-button" bind:checked={closeButton} />
						<Label for="close-button">Close button</Label>
					</div>
					<div class="flex items-center gap-2">
						<Switch id="expand" bind:checked={expand} />
						<Label for="expand">Expand stack</Label>
					</div>
				</div>
			</div>
		</Card>
	</section>

	<!-- ─── Fire ───────────────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Fire Toasts</h2>
		<Card title="One of each type" description="Under the config above">
			<div class="flex flex-wrap gap-3">
				{#each TYPES as type (type)}
					<Button text={type} variant="outline" onclick={() => fireOne(type)} />
				{/each}
				<Button text="All six" onclick={fireAll} />
				<Button text="Dismiss all" variant="destructive" onclick={() => toast.dismiss()} />
			</div>
		</Card>
	</section>

	<!-- ─── What each variant is ───────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">What Each Variant Does</h2>
		<div class="grid gap-4 sm:grid-cols-2">
			<Card title="default" description="Tinted fill, full border">
				<p class="text-muted-foreground text-sm">
					A 10% wash of the semantic token behind the semantic text, with
					a matching border. The quietest of the four.
				</p>
			</Card>
			<Card title="bordered" description="Card fill, 4px accent edge">
				<p class="text-muted-foreground text-sm">
					Surface stays neutral; the type reads entirely off a thick left
					border and the text colour.
				</p>
			</Card>
			<Card title="filled" description="Solid token fill">
				<p class="text-muted-foreground text-sm">
					The semantic token as the background, with its paired
					<code>-foreground</code> for text. The loudest option.
				</p>
			</Card>
			<Card title="minimal" description="No fill, no shadow">
				<p class="text-muted-foreground text-sm">
					Transparent, bottom-rule only. Reads against whatever is behind
					it — worth checking on every theme.
				</p>
			</Card>
		</div>
	</section>

	<!-- ─── Theme checklist ────────────────────────────────── -->
	<section class="space-y-4">
		<h2 class="text-2xl font-semibold">Theme Checklist</h2>
		<Card title="What to look at" description="Fire all six, then switch themes">
			<ul class="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
				<li>
					<span class="text-foreground font-medium">Surface</span> — the
					default toast should be the theme's <code>--card</code> colour,
					not white or black.
				</li>
				<li>
					<span class="text-foreground font-medium">Frame</span> — border
					width, corner radius and shadow come from the theme's
					<code>[data-sonner-toast]</code> rules, so a square theme should
					give square toasts. Those rules opt out per variant via
					<code>data-toast-variant</code>, so also check that
					<code>bordered</code> keeps its accent edge, <code>minimal</code>
					its bare bottom rule, and <code>filled</code> its solid ground.
				</li>
				<li>
					<span class="text-foreground font-medium">Semantic colour</span>
					— success / error / warning / info should track the theme's
					tokens, not sonner's built-in green and red.
				</li>
				<li>
					<span class="text-foreground font-medium">Buttons</span> — turn
					on the close button and fire a typed toast, then check the
					action button on <a class="text-primary underline" href="/sonner"
						>the main page</a
					>. These are the two spots where sonner's own rules out-specify
					the wrapper — the close button in <em>dark mode</em> especially,
					which reaches the token layer only through the custom properties
					the <code>Toaster</code> sets.
				</li>
				<li>
					<span class="text-foreground font-medium">Dark mode</span> — the
					toggle in the nav, on every theme, with the stack still open.
				</li>
			</ul>
		</Card>
	</section>
</div>
