/**
 * Popover wiring shared by every picker in this folder, for the case where the
 * picker is rendered inside a native `<dialog>`.
 *
 * Two separate problems have to be solved together, and each fix alone makes
 * the other worse:
 *
 * 1. **Paint order.** A `<dialog>` opened with `showModal()` renders in the
 *    browser's *top layer*, which paints above everything in the normal flow no
 *    matter how high its z-index is. The popover portals to `document.body` by
 *    default, so inside a modal it lands underneath the dialog — invisible and
 *    unclickable. No z-index value can win this; the content has to live inside
 *    the top-layer subtree, so it gets portalled into the dialog itself.
 *
 * 2. **Clipping.** Being a DOM child of the dialog then makes the popover a
 *    *laid-out* child of a small box that is `overflow: auto` by UA default, so
 *    floating-ui's default "absolute" strategy leaves it clipped to the dialog
 *    (and adds scrollbars). A fixed-position element is positioned against the
 *    viewport, so it escapes ancestor `overflow` clipping while still sitting in
 *    the dialog's top-layer subtree — on top of the dialog, not trapped inside.
 *
 * Outside a dialog both fall away and the popover keeps bits-ui's defaults.
 *
 * Usage: bind an element that lives *inside* the potential dialog (the picker's
 * root, or its trigger when there is no wrapper) and spread the result onto
 * `Popover.Content`:
 *
 * ```svelte
 * let rootEl = $state<HTMLDivElement | null>(null);
 * const dialogPop = dialogPopover(() => rootEl);
 * ...
 * <div bind:this={rootEl}>
 *   <Popover.Content
 *     portalProps={dialogPop.portalProps}
 *     strategy={dialogPop.strategy}
 *   >
 * ```
 */
export type DialogPopover = {
	/** Portal target — the ancestor `<dialog>`, or undefined to keep the default. */
	readonly portalProps: { to: Element } | undefined;
	/** Floating-ui strategy — "fixed" inside a dialog, otherwise the default. */
	readonly strategy: "fixed" | undefined;
};

/**
 * @param getAnchor Getter for an element rendered inside the potential dialog.
 *   Passed as a getter (not a value) so the lookup re-runs once the `bind:this`
 *   lands, rather than capturing `null` from the first render.
 */
export function dialogPopover(
	getAnchor: () => HTMLElement | null | undefined,
): DialogPopover {
	const dialog = $derived(getAnchor()?.closest("dialog") ?? null);

	return {
		get portalProps() {
			return dialog ? { to: dialog } : undefined;
		},
		get strategy() {
			return dialog ? ("fixed" as const) : undefined;
		},
	};
}
