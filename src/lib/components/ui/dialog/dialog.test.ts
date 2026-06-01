import { describe, it, expect } from "bun:test";
import { dialogVariants } from "./dialog-variants.js";

describe("dialogVariants", () => {
	describe("slot styles", () => {
		it("should return overlay styles", () => {
			const result = dialogVariants();
			expect(result.overlay()).toContain("fixed");
			expect(result.overlay()).toContain("inset-0");
			expect(result.overlay()).toContain("z-50");
			expect(result.overlay()).toContain("bg-black/50");
		});

		it("should return content styles", () => {
			const result = dialogVariants();
			expect(result.content()).toContain("bg-background");
			expect(result.content()).toContain("fixed");
			expect(result.content()).toContain("rounded-lg");
			expect(result.content()).toContain("shadow-lg");
		});

		it("should return header styles", () => {
			const result = dialogVariants();
			expect(result.header()).toContain("flex");
			expect(result.header()).toContain("flex-col");
		});

		it("should return footer styles", () => {
			const result = dialogVariants();
			expect(result.footer()).toContain("flex");
			expect(result.footer()).toContain("sm:justify-end");
		});

		it("should return title styles", () => {
			const result = dialogVariants();
			expect(result.title()).toContain("text-lg");
			expect(result.title()).toContain("font-semibold");
		});

		it("should return description styles", () => {
			const result = dialogVariants();
			expect(result.description()).toContain("text-muted-foreground");
			expect(result.description()).toContain("text-sm");
		});

		it("should return closeButton styles", () => {
			const result = dialogVariants();
			expect(result.closeButton()).toContain("absolute");
			expect(result.closeButton()).toContain("end-4");
			expect(result.closeButton()).toContain("top-4");
		});
	});

	describe("size variants", () => {
		it("should apply sm size to content", () => {
			const result = dialogVariants({ size: "sm" });
			expect(result.content()).toContain("sm:max-w-sm");
		});

		it("should apply default size to content", () => {
			const result = dialogVariants({ size: "default" });
			expect(result.content()).toContain("sm:max-w-lg");
		});

		it("should apply lg size to content", () => {
			const result = dialogVariants({ size: "lg" });
			expect(result.content()).toContain("sm:max-w-2xl");
		});

		it("should apply xl size to content", () => {
			const result = dialogVariants({ size: "xl" });
			expect(result.content()).toContain("sm:max-w-4xl");
		});

		it("should apply full size to content", () => {
			const result = dialogVariants({ size: "full" });
			expect(result.content()).toContain("sm:max-w-[90vw]");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = dialogVariants({ variant: "default" });
			expect(result.header()).toBeDefined();
			expect(result.footer()).toBeDefined();
		});

		it("should apply centered variant to header", () => {
			const result = dialogVariants({ variant: "centered" });
			expect(result.header()).toContain("text-center");
		});

		it("should apply centered variant to footer", () => {
			const result = dialogVariants({ variant: "centered" });
			expect(result.footer()).toContain("justify-center");
		});
	});

	describe("default variants", () => {
		it("should use default size when not specified", () => {
			const result = dialogVariants();
			expect(result.content()).toContain("sm:max-w-lg");
		});

		it("should use default variant when not specified", () => {
			const result = dialogVariants();
			// Default header has text-center for mobile but sm:text-left for larger screens
			expect(result.header()).toContain("sm:text-left");
		});
	});

	describe("animation styles", () => {
		it("should include animation classes for overlay", () => {
			const result = dialogVariants();
			expect(result.overlay()).toContain("data-[state=open]:animate-in");
			expect(result.overlay()).toContain("data-[state=closed]:animate-out");
		});

		it("should include animation classes for content", () => {
			const result = dialogVariants();
			expect(result.content()).toContain("data-[state=open]:animate-in");
			expect(result.content()).toContain("data-[state=closed]:animate-out");
		});
	});
});
