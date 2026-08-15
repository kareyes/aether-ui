<script lang="ts" generics="T extends AutocompleteItem = AutocompleteItem">
	import { tick, untrack } from "svelte";
	import type { Snippet } from "svelte";
	import { Command as CommandPrimitive } from "bits-ui";
	import SearchIcon from "@lucide/svelte/icons/search";
	import XIcon from "@lucide/svelte/icons/x";
	import CheckIcon from "@lucide/svelte/icons/check";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { Empty } from "$lib/components/ui/empty/index.js";
	import {
		NoSearchResults,
		ErrorState,
	} from "$lib/components/ui/illustrations/index.js";
	import { Spinner } from "$lib/components/ui/spinner/index.js";
	import {
		inputVariants,
		type InputVariant,
		type InputSize,
	} from "$lib/components/ui/input/utils/input-variants.js";
	import { cn } from "$lib/utils.js";
	import { createDebouncer, defaultFilter } from "./utils/autocomplete-utils.js";
	import type { AutocompleteItem } from "./utils/autocomplete-types.js";

	type AutocompleteItemSnippetArgs = {
		item: T;
		/** Whether this item is the currently committed `value` */
		selected: boolean;
		/** Whether this item is highlighted by keyboard/pointer navigation */
		active: boolean;
	};

	type AutocompleteContentSnippetArgs = {
		/** Items to render — already filtered locally or fetched remotely */
		items: T[];
		loading: boolean;
		error: Error | null;
		query: string;
		/** `true` when in remote mode and `query` hasn't reached `minLength` yet */
		belowMinLength: boolean;
		/** Value of the item currently highlighted by keyboard/pointer nav */
		activeValue: string;
		/** Commits an item the same way the default row does (sets `value`, closes, focuses the input) */
		select: (item: T) => void;
	};

	interface Props {
		/** Selected item (bindable) */
		value?: T | null;
		/** Static local dataset — omit when searching remotely via `fetcher` */
		items?: T[];
		placeholder?: string;
		name?: string;
		/** Applied to the search input so a `<label for={id}>` can target it. */
		id?: string;
		disabled?: boolean;
		/** Forces the loading state on top of the internal fetcher-driven one */
		loading?: boolean;
		/** Debounce (ms) applied before `fetcher` runs or local filtering re-evaluates */
		debounce?: number;
		/** Minimum query length before a remote search fires (ignored in local mode) */
		minLength?: number;
		/**
		 * Remote search. Receives an `AbortSignal` so a fetch implementation can
		 * cancel stale in-flight requests; stale responses are also ignored
		 * internally even if the fetcher doesn't honor the signal.
		 */
		fetcher?: (query: string, signal: AbortSignal) => Promise<T[]>;
		itemLabel?: (item: T) => string;
		itemValue?: (item: T) => string;
		/** Local filter predicate — ignored once `fetcher` is provided */
		filter?: (query: string, item: T) => boolean;
		onSelect?: (item: T) => void;
		onSearch?: (query: string) => void;
		clearable?: boolean;
		/** CSS max-height applied to the results list, e.g. `"320px"` */
		maxHeight?: string;

		variant?: InputVariant;
		size?: InputSize;
		align?: "start" | "center" | "end";
		side?: "top" | "right" | "bottom" | "left";
		class?: string;
		contentClass?: string;

		leading?: Snippet;
		trailing?: Snippet;
		item?: Snippet<[AutocompleteItemSnippetArgs]>;
		loadingIndicator?: Snippet;
		empty?: Snippet;
		error?: Snippet<[{ error: Error }]>;
		header?: Snippet;
		footer?: Snippet;
		/**
		 * Fully replaces the panel body (header / list / states / footer) with
		 * custom markup. `header` / `footer` / `item` / `empty` / `error` /
		 * `loadingIndicator` are ignored when this is provided — build
		 * everything from the supplied state instead.
		 */
		content?: Snippet<[AutocompleteContentSnippetArgs]>;
	}

	let {
		value = $bindable(null),
		items = [],
		placeholder = "Search...",
		disabled = false,
		loading: loadingProp = false,
		debounce = 300,
		minLength = 1,
		fetcher,
		itemLabel = (item: T) => item.label,
		itemValue = (item: T) => item.value,
		filter,
		onSelect,
		onSearch,
		clearable = true,
		maxHeight = "320px",
		variant = "default",
		size = "default",
		align = "start",
		side = "bottom",
		class: className,
		contentClass,
		leading,
		trailing,
		item: itemSnippet,
		loadingIndicator,
		empty,
		error: errorSnippet,
		header,
		footer,
		content,
		name,
		id,
	}: Props = $props();

	let open = $state(false);
	// Populated by the value-sync effect below on mount (and on every
	// subsequent `value` change), so no need to read `itemLabel` here too.
	let query = $state("");
	// `Popover.Trigger`'s own `ref` prop has a `null` fallback ($bindable(null));
	// Svelte disallows binding an `undefined`-initialized variable to that, so
	// this is asserted non-null and populated by the trigger before any code
	// here reads it (`contentRef` below needs the same pattern for the same reason).
	let triggerRef = $state<HTMLInputElement>(null!);
	// Wraps the input plus its leading/trailing icon areas — used (instead of
	// `triggerRef` alone) to decide what counts as "inside" for the
	// outside-click handling below, since the trailing icon span is a
	// sibling of the input, not a descendant of it.
	let wrapperRef = $state<HTMLElement>();
	// `Popover.Content`'s own `ref` prop has a `null` fallback ($bindable(null));
	// Svelte disallows binding an `undefined`-initialized variable to that, so
	// this needs the same `null!` pattern as `triggerRef` above (`wrapperRef`
	// is fine as-is since `bind:this` on a plain element has no such constraint).
	let contentRef = $state<HTMLElement>(null!);
	let activeValue = $state("");

	let results = $state<T[]>([]);
	let fetchLoading = $state(false);
	let fetchError = $state<Error | null>(null);

	// Set right before a *programmatic* query change (select / clear) so the
	// search effect below doesn't immediately re-search for the label it just wrote.
	let suppressSearch = false;
	// Set right before the programmatic refocus() below (select / clear) so
	// handleFocus doesn't treat it as the user reopening the panel — clicking
	// a Command.Item or the clear button can blur the input, and refocusing
	// it afterwards would otherwise immediately flip `open` back to true.
	let suppressOpenOnFocus = false;

	const remoteMode = $derived(!!fetcher);
	const isLoading = $derived(loadingProp || fetchLoading);

	const localItems = $derived.by(() => {
		if (!query) return items;
		const test = filter ?? ((q: string, it: T) => defaultFilter(q, it, itemLabel));
		return items.filter((it) => test(query, it));
	});

	const visibleItems = $derived(remoteMode ? results : localItems);
	const belowMinLength = $derived(remoteMode && query.length < minLength);
	const hasClear = $derived(
		clearable &&
			!disabled &&
			(query.length > 0 || (value !== null && value !== undefined)),
	);

	const debouncer = createDebouncer();
	let controller: AbortController | null = null;

	async function runFetch(searchQuery: string) {
		controller?.abort();
		const ac = new AbortController();
		controller = ac;
		fetchLoading = true;
		fetchError = null;
		try {
			const found = await fetcher!(searchQuery, ac.signal);
			if (ac.signal.aborted) return;
			results = found;
		} catch (err) {
			if (ac.signal.aborted) return;
			fetchError = err instanceof Error ? err : new Error(String(err));
			results = [];
		} finally {
			if (!ac.signal.aborted) fetchLoading = false;
		}
	}

	$effect(() => {
		const currentQuery = query;
		if (suppressSearch) {
			suppressSearch = false;
			return;
		}
		onSearch?.(currentQuery);
		if (!remoteMode) return;
		if (currentQuery.length < minLength) {
			debouncer.cancel();
			controller?.abort();
			results = [];
			fetchLoading = false;
			fetchError = null;
			return;
		}
		debouncer.schedule(() => void runFetch(currentQuery), debounce);
	});

	// Keep the input's text in sync with the committed `value`, whether it
	// changed via selection/clear below or was rebound from outside. This
	// must depend on `value` alone — reading `query` normally here would make
	// it a tracked dependency too, so every keystroke would re-run this
	// effect, see `value` unchanged, and stomp the just-typed `query` back to
	// the value-derived one (usually ""). `untrack` reads current `query`
	// for the comparison without adding that dependency.
	$effect(() => {
		const current = value;
		const nextQuery = current ? itemLabel(current) : "";
		// Only touch `query` (and arm the suppress flag) when it's an actual
		// change — assigning the same string is a no-op for Svelte's
		// reactivity, so the search effect above would never re-run to
		// consume the flag, leaving it stuck `true` and silently swallowing
		// the next real keystroke.
		if (untrack(() => nextQuery !== query)) {
			suppressSearch = true;
			query = nextQuery;
		}
	});

	$effect(() => {
		return () => {
			debouncer.cancel();
			controller?.abort();
		};
	});

	// Close on outside click/tap and on focus moving outside the component.
	// Not relying on Popover's own dismiss-on-outside-interact here — it
	// didn't reliably fire in this Command+Popover composition (the search
	// input is rendered as the trigger via a custom child snippet, and
	// Command.Root wraps both the trigger and the portalled content).
	$effect(() => {
		if (!open) return;
		function isInside(target: EventTarget | null) {
			if (!(target instanceof Node)) return false;
			return !!(
				wrapperRef?.contains(target) || contentRef?.contains(target)
			);
		}
		function handlePointerDown(event: PointerEvent) {
			if (!isInside(event.target)) open = false;
		}
		function handleFocusIn(event: FocusEvent) {
			if (!isInside(event.target)) open = false;
		}
		document.addEventListener("pointerdown", handlePointerDown, {
			capture: true,
		});
		document.addEventListener("focusin", handleFocusIn);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown, {
				capture: true,
			});
			document.removeEventListener("focusin", handleFocusIn);
		};
	});

	function isSelected(it: T) {
		// Nullish, not just null: `itemValue` dereferences its argument, and the
		// hidden input below guards this same prop with a truthiness check.
		return (
			value !== null &&
			value !== undefined &&
			itemValue(value) === itemValue(it)
		);
	}

	function handleSelect(it: T) {
		value = it;
		open = false;
		onSelect?.(it);
		suppressOpenOnFocus = true;
		tick().then(() => {
			triggerRef?.focus();
			// In case focus() was a no-op (input was already focused, e.g. Enter
			// to select) and never fired to consume the flag itself.
			suppressOpenOnFocus = false;
		});
	}

	function handleClear(event: Event) {
		event.stopPropagation();
		value = null;
		results = [];
		fetchError = null;
		open = false;
		suppressOpenOnFocus = true;
		triggerRef?.focus();
		suppressOpenOnFocus = false;
	}

	function handleFocus() {
		if (suppressOpenOnFocus) {
			suppressOpenOnFocus = false;
			return;
		}
		if (!disabled) open = true;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			open = false;
		}
	}
</script>

<Command.Root class="contents" shouldFilter={false} loop bind:value={activeValue}>
	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<div class="relative w-full" bind:this={wrapperRef}>
					<span
						class="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
					>
						{#if leading}
							{@render leading()}
						{:else}
							<SearchIcon class="size-4" />
						{/if}
					</span>

					<CommandPrimitive.Input
						{...props}
						id={id ?? (typeof props.id === "string" ? props.id : undefined)}
						bind:value={query}
						{placeholder}
						{disabled}
						onclick={handleFocus}
						onfocus={handleFocus}
						onkeydown={handleKeydown}
						class={cn(
							inputVariants({ variant, size }),
							"w-full pl-9",
							(hasClear || isLoading || trailing) && "pr-9",
							className,
						)}
					/>

					<span class="absolute inset-y-0 right-0 flex items-center pr-3">
						{#if isLoading}
							<Spinner class="text-muted-foreground" />
						{:else if hasClear}
							<button
								type="button"
								tabindex="-1"
								class="text-muted-foreground hover:text-foreground transition-colors"
								onclick={handleClear}
								aria-label="Clear"
							>
								<XIcon class="size-4" />
							</button>
						{:else if trailing}
							{@render trailing()}
						{/if}
					</span>
				</div>
			{/snippet}
		</Popover.Trigger>

		<!--
			trapFocus={false}: this is a combobox listbox, not a modal — Tab
			should be free to move focus onward (closing the panel via the
			focusin handler above), not get trapped inside it.
		-->
		<Popover.Content
			bind:ref={contentRef}
			{align}
			{side}
			size="auto"
			trapFocus={false}
			onOpenAutoFocus={(event) => event.preventDefault()}
			onCloseAutoFocus={(event) => event.preventDefault()}
			class={cn(
				"w-[var(--bits-popover-anchor-width)] overflow-hidden p-0",
				contentClass,
			)}
		>
			{#if content}
				{@render content({
					items: visibleItems,
					loading: isLoading,
					error: fetchError,
					query,
					belowMinLength,
					activeValue,
					select: handleSelect,
				})}
			{:else}
				{#if header}
					<div class="border-b p-2">
						{@render header()}
					</div>
				{/if}

				<Command.List style="max-height: {maxHeight}" aria-busy={isLoading}>
					{#if belowMinLength}
						<div class="text-muted-foreground py-6 text-center text-sm">
							Type at least {minLength} character{minLength === 1 ? "" : "s"} to search
						</div>
					{:else if isLoading && visibleItems.length === 0}
						{#if loadingIndicator}
							{@render loadingIndicator()}
						{:else}
							<div
								class="text-muted-foreground flex items-center justify-center gap-2 py-6 text-sm"
							>
								<Spinner />
								Searching...
							</div>
						{/if}
					{:else if fetchError}
						{#if errorSnippet}
							{@render errorSnippet({ error: fetchError })}
						{:else}
							<Empty
								size="sm"
								iconVariant="illustration"
								title="Something went wrong"
								description={fetchError.message || "Please try again."}
							>
								{#snippet icon()}<ErrorState size={120} />{/snippet}
							</Empty>
						{/if}
					{:else if visibleItems.length === 0}
						{#if empty}
							{@render empty()}
						{:else}
							<Empty
								size="sm"
								iconVariant="illustration"
								title="Oops... No Results Found"
								description="Don't worry, it happens sometimes. Try another search term."
							>
								{#snippet icon()}<NoSearchResults size={96} />{/snippet}
							</Empty>
						{/if}
					{:else}
						<Command.Group>
							{#each visibleItems as it (itemValue(it))}
								<Command.Item
									value={itemValue(it)}
									disabled={it.disabled}
									onSelect={() => handleSelect(it)}
									class="gap-2"
								>
									{#if itemSnippet}
										{@render itemSnippet({
											item: it,
											selected: isSelected(it),
											active: activeValue === itemValue(it),
										})}
									{:else}
										<span class="min-w-0 flex-1 truncate">{itemLabel(it)}</span>
										{#if isSelected(it)}
											<CheckIcon class="text-primary size-4 shrink-0" />
										{/if}
									{/if}
								</Command.Item>
							{/each}
						</Command.Group>
					{/if}
				</Command.List>

				{#if footer}
					<div class="border-t p-2">
						{@render footer()}
					</div>
				{/if}
			{/if}
		</Popover.Content>
	</Popover.Root>
</Command.Root>
<!--
	Autocomplete has no native form element of its own — the visible input is
	a search box, not the submitted control. When a `name` is given, mirror
	the committed `value` into a hidden input so this participates in native
	form / SvelteKit `enhance` submissions, same as `DateRangePicker`'s
	`{name}.start` / `{name}.end` mirror.
-->
{#if name}
	<input type="hidden" {name} value={value ? itemValue(value) : ""} />
{/if}
