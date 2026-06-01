import { describe, it, expect } from "bun:test";
import { sliderVariants } from "./slider-variants.js";

describe("sliderVariants", () => {
	describe("slot styles", () => {
		it("should return root styles", () => {
			const result = sliderVariants();
			expect(result.root()).toContain("relative");
			expect(result.root()).toContain("flex");
			expect(result.root()).toContain("w-full");
			expect(result.root()).toContain("touch-none");
		});

		it("should return track styles", () => {
			const result = sliderVariants();
			expect(result.track()).toContain("relative");
			expect(result.track()).toContain("grow");
			expect(result.track()).toContain("rounded-full");
		});

		it("should return range styles", () => {
			const result = sliderVariants();
			expect(result.range()).toContain("absolute");
			expect(result.range()).toContain("transition-all");
		});

		it("should return thumb styles", () => {
			const result = sliderVariants();
			expect(result.thumb()).toContain("rounded-full");
			expect(result.thumb()).toContain("border");
			expect(result.thumb()).toContain("shadow-sm");
		});

		it("should return marks styles", () => {
			const result = sliderVariants();
			expect(result.marks()).toContain("absolute");
			expect(result.marks()).toContain("pointer-events-none");
		});

		it("should return mark styles", () => {
			const result = sliderVariants();
			expect(result.mark()).toContain("absolute");
			expect(result.mark()).toContain("flex");
		});

		it("should return markIndicator styles", () => {
			const result = sliderVariants();
			expect(result.markIndicator()).toContain("rounded-full");
			expect(result.markIndicator()).toContain("bg-border");
		});

		it("should return markLabel styles", () => {
			const result = sliderVariants();
			expect(result.markLabel()).toContain("text-xs");
			expect(result.markLabel()).toContain("text-muted-foreground");
		});

		it("should return tooltip styles", () => {
			const result = sliderVariants();
			expect(result.tooltip()).toContain("absolute");
			expect(result.tooltip()).toContain("z-50");
			expect(result.tooltip()).toContain("rounded-md");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = sliderVariants({ variant: "default" });
			expect(result.track()).toContain("bg-muted");
			expect(result.range()).toContain("bg-primary");
			expect(result.thumb()).toContain("border-primary");
		});

		it("should apply primary variant", () => {
			const result = sliderVariants({ variant: "primary" });
			expect(result.track()).toContain("bg-primary/20");
			expect(result.range()).toContain("bg-primary");
			expect(result.thumb()).toContain("bg-primary");
		});

		it("should apply secondary variant", () => {
			const result = sliderVariants({ variant: "secondary" });
			expect(result.track()).toContain("bg-secondary");
			expect(result.range()).toContain("bg-secondary-foreground");
		});

		it("should apply success variant", () => {
			const result = sliderVariants({ variant: "success" });
			expect(result.track()).toContain("bg-green-100");
			expect(result.range()).toContain("bg-green-600");
			expect(result.thumb()).toContain("border-green-600");
		});

		it("should apply warning variant", () => {
			const result = sliderVariants({ variant: "warning" });
			expect(result.track()).toContain("bg-yellow-100");
			expect(result.range()).toContain("bg-yellow-600");
			expect(result.thumb()).toContain("border-yellow-600");
		});

		it("should apply destructive variant", () => {
			const result = sliderVariants({ variant: "destructive" });
			expect(result.track()).toContain("bg-destructive/20");
			expect(result.range()).toContain("bg-destructive");
			expect(result.thumb()).toContain("border-destructive");
		});
	});

	describe("size styles", () => {
		it("should apply sm size", () => {
			const result = sliderVariants({ size: "sm" });
			expect(result.thumb()).toContain("size-3");
			expect(result.markIndicator()).toContain("size-1");
		});

		it("should apply default size", () => {
			const result = sliderVariants({ size: "default" });
			expect(result.thumb()).toContain("size-4");
			expect(result.markIndicator()).toContain("size-1.5");
		});

		it("should apply lg size", () => {
			const result = sliderVariants({ size: "lg" });
			expect(result.thumb()).toContain("size-5");
			expect(result.markIndicator()).toContain("size-2");
		});
	});

	describe("default variants", () => {
		it("should use default variant when not specified", () => {
			const result = sliderVariants();
			expect(result.track()).toContain("bg-muted");
			expect(result.range()).toContain("bg-primary");
		});

		it("should use default size when not specified", () => {
			const result = sliderVariants();
			expect(result.thumb()).toContain("size-4");
		});
	});

	describe("interaction styles", () => {
		it("should include hover styles on thumb", () => {
			const result = sliderVariants();
			expect(result.thumb()).toContain("hover:ring-4");
			expect(result.thumb()).toContain("hover:scale-110");
		});

		it("should include focus styles on thumb", () => {
			const result = sliderVariants();
			expect(result.thumb()).toContain("focus-visible:ring-4");
		});

		it("should include active styles on thumb", () => {
			const result = sliderVariants();
			expect(result.thumb()).toContain("active:scale-95");
		});

		it("should include disabled styles on thumb", () => {
			const result = sliderVariants();
			expect(result.thumb()).toContain("disabled:pointer-events-none");
			expect(result.thumb()).toContain("disabled:opacity-50");
		});
	});

	describe("combined variants", () => {
		it("should combine variant and size correctly", () => {
			const result = sliderVariants({ variant: "success", size: "lg" });
			expect(result.track()).toContain("bg-green-100");
			expect(result.thumb()).toContain("size-5");
		});
	});
});
