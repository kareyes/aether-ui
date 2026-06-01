import { describe, it, expect } from "bun:test";
import { inputVariants } from "./utils/input-variants.js";

describe("inputVariants", () => {
	describe("base styles", () => {
		it("should include base input styles", () => {
			const result = inputVariants();
			expect(result).toContain("flex");
			expect(result).toContain("w-full");
			expect(result).toContain("rounded-md");
			expect(result).toContain("border");
		});

		it("should include focus styles", () => {
			const result = inputVariants();
			expect(result).toContain("focus-visible:ring-[3px]");
		});

		it("should include disabled styles", () => {
			const result = inputVariants();
			expect(result).toContain("disabled:cursor-not-allowed");
			expect(result).toContain("disabled:opacity-50");
		});

		it("should include invalid state styles", () => {
			const result = inputVariants();
			expect(result).toContain("aria-invalid:border-destructive");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = inputVariants({ variant: "default" });
			expect(result).toContain("border-input");
			expect(result).toContain("bg-background");
			expect(result).toContain("focus-visible:border-ring");
		});

		it("should apply outline variant", () => {
			const result = inputVariants({ variant: "outline" });
			expect(result).toContain("border-2");
			expect(result).toContain("hover:border-muted-foreground/50");
		});

		it("should apply filled variant", () => {
			const result = inputVariants({ variant: "filled" });
			expect(result).toContain("border-transparent");
			expect(result).toContain("bg-muted");
		});

		it("should apply ghost variant", () => {
			const result = inputVariants({ variant: "ghost" });
			expect(result).toContain("border-transparent");
			expect(result).toContain("bg-transparent");
			expect(result).toContain("hover:bg-muted");
		});

		it("should apply underline variant", () => {
			const result = inputVariants({ variant: "underline" });
			expect(result).toContain("border-b-2");
			expect(result).toContain("rounded-none");
			expect(result).toContain("focus-visible:border-b-primary");
		});
	});

	describe("size styles", () => {
		it("should apply sm size", () => {
			const result = inputVariants({ size: "sm" });
			expect(result).toContain("h-8");
			expect(result).toContain("px-2");
			expect(result).toContain("text-xs");
		});

		it("should apply default size", () => {
			const result = inputVariants({ size: "default" });
			expect(result).toContain("h-9");
			expect(result).toContain("px-3");
			expect(result).toContain("text-sm");
		});

		it("should apply lg size", () => {
			const result = inputVariants({ size: "lg" });
			expect(result).toContain("h-10");
			expect(result).toContain("px-4");
			expect(result).toContain("text-base");
		});
	});

	describe("compound variants", () => {
		it("should apply underline + sm compound variant", () => {
			const result = inputVariants({ variant: "underline", size: "sm" });
			expect(result).toContain("h-6");
		});

		it("should apply underline + lg compound variant", () => {
			const result = inputVariants({ variant: "underline", size: "lg" });
			expect(result).toContain("h-12");
		});
	});

	describe("default variants", () => {
		it("should use default variant when not specified", () => {
			const result = inputVariants();
			expect(result).toContain("border-input");
			expect(result).toContain("bg-background");
		});

		it("should use default size when not specified", () => {
			const result = inputVariants();
			expect(result).toContain("h-9");
		});
	});

	describe("combined variants", () => {
		it("should combine variant and size correctly", () => {
			const result = inputVariants({ variant: "filled", size: "lg" });
			expect(result).toContain("bg-muted");
			expect(result).toContain("h-10");
		});
	});
});
