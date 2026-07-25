/**
 * Debounces calls scheduled through it, cancelling any pending invocation
 * when a newer one is scheduled (or `cancel()` is called explicitly). The
 * delay is read fresh on each `schedule()` call rather than fixed at
 * creation, so callers can back it with a reactive value.
 */
export function createDebouncer() {
	let timer: ReturnType<typeof setTimeout> | undefined;

	return {
		schedule(fn: () => void, ms: number) {
			clearTimeout(timer);
			if (ms <= 0) {
				fn();
				return;
			}
			timer = setTimeout(fn, ms);
		},
		cancel() {
			clearTimeout(timer);
			timer = undefined;
		},
	};
}

/** Case-insensitive substring match against an item's label — the default `filter`. */
export function defaultFilter<T>(
	query: string,
	item: T,
	itemLabel: (item: T) => string,
): boolean {
	if (!query) return true;
	return itemLabel(item).toLowerCase().includes(query.toLowerCase());
}
