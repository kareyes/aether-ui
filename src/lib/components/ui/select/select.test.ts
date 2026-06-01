import { describe, it, expect } from "bun:test";
import { selectVariants } from "./utils/select-variants.js";

describe("selectVariants", () => {
	describe("slot styles", () => {
		it("should return trigger styles", () => {
			const result = selectVariants();
			expect(result.trigger()).toContain("flex");
			expect(result.trigger()).toContain("items-center");
			expect(result.trigger()).toContain("justify-between");
			expect(result.trigger()).toContain("rounded-md");
		});

		it("should return content styles", () => {
			const result = selectVariants();
			expect(result.content()).toContain("bg-popover");
			expect(result.content()).toContain("text-popover-foreground");
			expect(result.content()).toContain("rounded-md");
			expect(result.content()).toContain("border");
		});

		it("should return viewport styles", () => {
			const result = selectVariants();
			expect(result.viewport()).toContain("p-1");
		});

		it("should return item styles", () => {
			const result = selectVariants();
			expect(result.item()).toContain("cursor-default");
			expect(result.item()).toContain("select-none");
			expect(result.item()).toContain("rounded-sm");
		});

		it("should return checkIcon styles", () => {
			const result = selectVariants();
			expect(result.checkIcon()).toContain("absolute");
			expect(result.checkIcon()).toContain("right-2");
		});

		it("should return label styles", () => {
			const result = selectVariants();
			expect(result.label()).toContain("text-muted-foreground");
			expect(result.label()).toContain("text-xs");
		});

		it("should return separator styles", () => {
			const result = selectVariants();
			expect(result.separator()).toContain("bg-border");
			expect(result.separator()).toContain("h-px");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = selectVariants({ variant: "default" });
			expect(result.trigger()).toBeDefined();
		});

		it("should apply outline variant to trigger", () => {
			const result = selectVariants({ variant: "outline" });
			expect(result.trigger()).toContain("border-2");
			expect(result.trigger()).toContain("hover:bg-accent");
		});

		it("should apply filled variant to trigger", () => {
			const result = selectVariants({ variant: "filled" });
			expect(result.trigger()).toContain("bg-muted");
			expect(result.trigger()).toContain("border-transparent");
		});

		it("should apply ghost variant to trigger", () => {
			const result = selectVariants({ variant: "ghost" });
			expect(result.trigger()).toContain("border-transparent");
			expect(result.trigger()).toContain("bg-transparent");
		});

		it("should apply underline variant to trigger", () => {
			const result = selectVariants({ variant: "underline" });
			expect(result.trigger()).toContain("border-b-2");
			expect(result.trigger()).toContain("rounded-none");
		});
	});

	describe("size styles", () => {
		it("should apply sm size to trigger", () => {
			const result = selectVariants({ size: "sm" });
			expect(result.trigger()).toContain("h-8");
			expect(result.trigger()).toContain("px-2");
			expect(result.trigger()).toContain("text-xs");
		});

		it("should apply default size to trigger", () => {
			const result = selectVariants({ size: "default" });
			expect(result.trigger()).toContain("h-9");
			expect(result.trigger()).toContain("px-3");
			expect(result.trigger()).toContain("text-sm");
		});

		it("should apply lg size to trigger", () => {
			const result = selectVariants({ size: "lg" });
			expect(result.trigger()).toContain("h-10");
			expect(result.trigger()).toContain("px-4");
			expect(result.trigger()).toContain("text-base");
		});
	});

	describe("compound variants", () => {
		it("should apply underline + sm compound variant", () => {
			const result = selectVariants({ variant: "underline", size: "sm" });
			expect(result.trigger()).toContain("h-6");
		});

		it("should apply underline + lg compound variant", () => {
			const result = selectVariants({ variant: "underline", size: "lg" });
			expect(result.trigger()).toContain("h-12");
		});
	});

	describe("default variants", () => {
		it("should use default variant when not specified", () => {
			const result = selectVariants();
			expect(result.trigger()).toContain("border-input");
		});

		it("should use default size when not specified", () => {
			const result = selectVariants();
			expect(result.trigger()).toContain("h-9");
		});
	});

	describe("animation styles", () => {
		it("should include animation classes for content", () => {
			const result = selectVariants();
			expect(result.content()).toContain("data-[state=open]:animate-in");
			expect(result.content()).toContain("data-[state=closed]:animate-out");
		});
	});

	describe("combined variants", () => {
		it("should combine variant and size correctly", () => {
			const result = selectVariants({ variant: "filled", size: "lg" });
			expect(result.trigger()).toContain("bg-muted");
			expect(result.trigger()).toContain("h-10");
		});
	});
});
