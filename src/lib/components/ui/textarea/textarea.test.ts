import { describe, it, expect } from "bun:test";
import { textareaVariants } from "./utils/textarea-variants.js";

describe("textareaVariants", () => {
	describe("base styles", () => {
		it("should include base textarea styles", () => {
			const result = textareaVariants();
			expect(result).toContain("flex");
			expect(result).toContain("w-full");
			expect(result).toContain("rounded-md");
			expect(result).toContain("border");
		});

		it("should include focus styles", () => {
			const result = textareaVariants();
			expect(result).toContain("focus-visible:ring-[3px]");
		});

		it("should include disabled styles", () => {
			const result = textareaVariants();
			expect(result).toContain("disabled:cursor-not-allowed");
			expect(result).toContain("disabled:opacity-50");
		});

		it("should include invalid state styles", () => {
			const result = textareaVariants();
			expect(result).toContain("aria-invalid:border-destructive");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = textareaVariants({ variant: "default" });
			expect(result).toContain("border-input");
			expect(result).toContain("bg-background");
		});

		it("should apply outline variant", () => {
			const result = textareaVariants({ variant: "outline" });
			expect(result).toContain("border-2");
			expect(result).toContain("hover:border-muted-foreground/50");
		});

		it("should apply filled variant", () => {
			const result = textareaVariants({ variant: "filled" });
			expect(result).toContain("border-transparent");
			expect(result).toContain("bg-muted");
		});

		it("should apply ghost variant", () => {
			const result = textareaVariants({ variant: "ghost" });
			expect(result).toContain("border-transparent");
			expect(result).toContain("bg-transparent");
			expect(result).toContain("hover:bg-muted");
		});

		it("should apply underline variant", () => {
			const result = textareaVariants({ variant: "underline" });
			expect(result).toContain("border-b-2");
			expect(result).toContain("rounded-none");
		});
	});

	describe("size styles", () => {
		it("should apply sm size", () => {
			const result = textareaVariants({ size: "sm" });
			expect(result).toContain("min-h-16");
			expect(result).toContain("text-xs");
		});

		it("should apply default size", () => {
			const result = textareaVariants({ size: "default" });
			expect(result).toContain("min-h-20");
			expect(result).toContain("text-sm");
		});

		it("should apply lg size", () => {
			const result = textareaVariants({ size: "lg" });
			expect(result).toContain("min-h-24");
			expect(result).toContain("text-base");
		});
	});

	describe("resize styles", () => {
		it("should apply none resize", () => {
			const result = textareaVariants({ resize: "none" });
			expect(result).toContain("resize-none");
		});

		it("should apply both resize", () => {
			const result = textareaVariants({ resize: "both" });
			expect(result).toContain("resize");
		});

		it("should apply vertical resize", () => {
			const result = textareaVariants({ resize: "vertical" });
			expect(result).toContain("resize-y");
		});

		it("should apply horizontal resize", () => {
			const result = textareaVariants({ resize: "horizontal" });
			expect(result).toContain("resize-x");
		});
	});

	describe("compound variants", () => {
		it("should apply underline + sm compound variant", () => {
			const result = textareaVariants({ variant: "underline", size: "sm" });
			expect(result).toContain("min-h-14");
		});

		it("should apply underline + lg compound variant", () => {
			const result = textareaVariants({ variant: "underline", size: "lg" });
			expect(result).toContain("min-h-28");
		});
	});

	describe("default variants", () => {
		it("should use default variant when not specified", () => {
			const result = textareaVariants();
			expect(result).toContain("border-input");
			expect(result).toContain("bg-background");
		});

		it("should use default size when not specified", () => {
			const result = textareaVariants();
			expect(result).toContain("min-h-20");
		});

		it("should use vertical resize by default", () => {
			const result = textareaVariants();
			expect(result).toContain("resize-y");
		});
	});

	describe("combined variants", () => {
		it("should combine variant, size, and resize correctly", () => {
			const result = textareaVariants({
				variant: "filled",
				size: "lg",
				resize: "both",
			});
			expect(result).toContain("bg-muted");
			expect(result).toContain("min-h-24");
			expect(result).toContain("resize");
		});
	});
});
