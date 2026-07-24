import { describe, expect, it } from "bun:test";
import { emptyMediaVariants } from "./empty-media-variants.js";

describe("emptyMediaVariants", () => {
	it("defaults to the transparent `default` variant", () => {
		const result = emptyMediaVariants();
		expect(result).toContain("bg-transparent");
		// The base always centers the media and disables svg pointer events.
		expect(result).toContain("items-center");
		expect(result).toContain("justify-center");
	});

	describe("icon variant", () => {
		it("boxes the icon and forces un-sized svgs to size-6", () => {
			const result = emptyMediaVariants({ variant: "icon" });
			expect(result).toContain("bg-muted");
			expect(result).toContain("size-10");
			expect(result).toContain("rounded-lg");
			// Small line icons get pinned to a consistent 24px.
			expect(result).toContain("[&_svg:not([class*='size-'])]:size-6");
		});
	});

	describe("illustration variant", () => {
		it("is transparent and never forces a shrinking svg size", () => {
			const result = emptyMediaVariants({ variant: "illustration" });
			expect(result).toContain("bg-transparent");
			// Regression guard: illustrations must NOT be crushed like the
			// `icon` variant does — no fixed box, no forced size-6.
			expect(result).not.toContain("size-10");
			expect(result).not.toContain("[&_svg:not([class*='size-'])]:size-6");
		});

		it("scales large illustrations down responsively while keeping aspect", () => {
			const result = emptyMediaVariants({ variant: "illustration" });
			expect(result).toContain("max-w-full");
			expect(result).toContain("[&_svg]:h-auto");
			expect(result).toContain("[&_svg]:max-w-full");
		});
	});
});
