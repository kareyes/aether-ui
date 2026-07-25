import { describe, it, expect, mock } from "bun:test";
import { createDebouncer, defaultFilter } from "./utils/autocomplete-utils.js";

describe("createDebouncer", () => {
	it("only invokes the last scheduled callback within the window", async () => {
		const debouncer = createDebouncer();
		const calls: number[] = [];

		debouncer.schedule(() => calls.push(1), 20);
		debouncer.schedule(() => calls.push(2), 20);
		debouncer.schedule(() => calls.push(3), 20);

		await new Promise((resolve) => setTimeout(resolve, 40));

		expect(calls).toEqual([3]);
	});

	it("runs immediately when ms is 0", () => {
		const debouncer = createDebouncer();
		const fn = mock(() => {});

		debouncer.schedule(fn, 0);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it("does not invoke a cancelled callback", async () => {
		const debouncer = createDebouncer();
		const fn = mock(() => {});

		debouncer.schedule(fn, 20);
		debouncer.cancel();

		await new Promise((resolve) => setTimeout(resolve, 40));

		expect(fn).not.toHaveBeenCalled();
	});

	it("honors a different delay on each call", async () => {
		const debouncer = createDebouncer();
		const fn = mock(() => {});

		debouncer.schedule(fn, 100);
		debouncer.schedule(fn, 10);

		await new Promise((resolve) => setTimeout(resolve, 30));

		expect(fn).toHaveBeenCalledTimes(1);
	});
});

describe("defaultFilter", () => {
	type Item = { value: string; label: string };
	const itemLabel = (item: Item) => item.label;

	it("matches case-insensitively on a substring of the label", () => {
		const item: Item = { value: "svelte", label: "SvelteKit" };

		expect(defaultFilter("svelte", item, itemLabel)).toBe(true);
		expect(defaultFilter("KIT", item, itemLabel)).toBe(true);
	});

	it("returns false when the query isn't found in the label", () => {
		const item: Item = { value: "svelte", label: "SvelteKit" };

		expect(defaultFilter("react", item, itemLabel)).toBe(false);
	});

	it("matches everything for an empty query", () => {
		const item: Item = { value: "svelte", label: "SvelteKit" };

		expect(defaultFilter("", item, itemLabel)).toBe(true);
	});
});
