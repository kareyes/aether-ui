import { describe, it, expect } from "vitest";
import { numberSpinnerVariants } from "./number-spinner-variants.js";

describe("numberSpinnerVariants", () => {
	describe("slot styles", () => {
		it("should return root styles", () => {
			const result = numberSpinnerVariants();
			expect(result.root()).toContain("relative");
			expect(result.root()).toContain("inline-flex");
			expect(result.root()).toContain("items-center");
		});

		it("should return input styles", () => {
			const result = numberSpinnerVariants();
			expect(result.input()).toContain("w-full");
			expect(result.input()).toContain("rounded-md");
			expect(result.input()).toContain("border");
			expect(result.input()).toContain("text-center");
		});

		it("should return buttonGroup styles", () => {
			const result = numberSpinnerVariants();
			expect(result.buttonGroup()).toContain("flex");
			expect(result.buttonGroup()).toContain("flex-col");
		});

		it("should return button styles", () => {
			const result = numberSpinnerVariants();
			expect(result.button()).toContain("inline-flex");
			expect(result.button()).toContain("items-center");
			expect(result.button()).toContain("justify-center");
		});

		it("should return buttonHorizontal styles", () => {
			const result = numberSpinnerVariants();
			expect(result.buttonHorizontal()).toContain("inline-flex");
			expect(result.buttonHorizontal()).toContain("items-center");
		});

		it("should hide native spinner arrows", () => {
			const result = numberSpinnerVariants();
			expect(result.input()).toContain("[appearance:textfield]");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = numberSpinnerVariants({ variant: "default" });
			expect(result.input()).toContain("border-input");
			expect(result.input()).toContain("bg-background");
		});

		it("should apply outline variant", () => {
			const result = numberSpinnerVariants({ variant: "outline" });
			expect(result.input()).toContain("border-2");
			expect(result.input()).toContain("hover:border-muted-foreground/50");
		});

		it("should apply filled variant", () => {
			const result = numberSpinnerVariants({ variant: "filled" });
			expect(result.input()).toContain("border-transparent");
			expect(result.input()).toContain("bg-muted");
		});

		it("should apply ghost variant", () => {
			const result = numberSpinnerVariants({ variant: "ghost" });
			expect(result.input()).toContain("border-transparent");
			expect(result.input()).toContain("bg-transparent");
		});
	});

	describe("size styles", () => {
		it("should apply sm size", () => {
			const result = numberSpinnerVariants({ size: "sm" });
			expect(result.input()).toContain("h-8");
			expect(result.button()).toContain("size-4");
			expect(result.buttonHorizontal()).toContain("h-8");
			expect(result.buttonHorizontal()).toContain("w-8");
		});

		it("should apply default size", () => {
			const result = numberSpinnerVariants({ size: "default" });
			expect(result.input()).toContain("h-9");
			expect(result.button()).toContain("size-4");
			expect(result.buttonHorizontal()).toContain("h-9");
		});

		it("should apply lg size", () => {
			const result = numberSpinnerVariants({ size: "lg" });
			expect(result.input()).toContain("h-10");
			expect(result.button()).toContain("size-5");
			expect(result.buttonHorizontal()).toContain("h-10");
		});
	});

	describe("orientation styles", () => {
		it("should apply vertical orientation", () => {
			const result = numberSpinnerVariants({ orientation: "vertical" });
			expect(result.root()).toContain("flex-col");
		});

		it("should apply horizontal orientation", () => {
			const result = numberSpinnerVariants({ orientation: "horizontal" });
			expect(result.root()).toContain("flex-row");
			expect(result.root()).toContain("gap-1");
		});
	});

	describe("compound variants", () => {
		it("should apply vertical + sm compound variant", () => {
			const result = numberSpinnerVariants({
				orientation: "vertical",
				size: "sm",
			});
			expect(result.buttonGroup()).toContain("absolute");
			expect(result.buttonGroup()).toContain("right-0");
			expect(result.buttonGroup()).toContain("h-8");
			expect(result.button()).toContain("h-4");
			expect(result.button()).toContain("w-8");
		});

		it("should apply vertical + default compound variant", () => {
			const result = numberSpinnerVariants({
				orientation: "vertical",
				size: "default",
			});
			expect(result.buttonGroup()).toContain("h-9");
			expect(result.button()).toContain("h-[18px]");
			expect(result.button()).toContain("w-9");
		});

		it("should apply vertical + lg compound variant", () => {
			const result = numberSpinnerVariants({
				orientation: "vertical",
				size: "lg",
			});
			expect(result.buttonGroup()).toContain("h-10");
			expect(result.button()).toContain("h-5");
			expect(result.button()).toContain("w-10");
		});
	});

	describe("default variants", () => {
		it("should use default variant", () => {
			const result = numberSpinnerVariants();
			expect(result.input()).toContain("border-input");
		});

		it("should use default size", () => {
			const result = numberSpinnerVariants();
			expect(result.input()).toContain("h-9");
		});

		it("should use vertical orientation by default", () => {
			const result = numberSpinnerVariants();
			expect(result.root()).toContain("flex-col");
		});
	});

	describe("focus and disabled styles", () => {
		it("should include focus styles on input", () => {
			const result = numberSpinnerVariants();
			expect(result.input()).toContain("focus-visible:ring-[3px]");
		});

		it("should include disabled styles on input", () => {
			const result = numberSpinnerVariants();
			expect(result.input()).toContain("disabled:cursor-not-allowed");
			expect(result.input()).toContain("disabled:opacity-50");
		});

		it("should include disabled styles on button", () => {
			const result = numberSpinnerVariants();
			expect(result.button()).toContain("disabled:pointer-events-none");
			expect(result.button()).toContain("disabled:opacity-50");
		});
	});

	describe("combined variants", () => {
		it("should combine variant, size, and orientation correctly", () => {
			const result = numberSpinnerVariants({
				variant: "filled",
				size: "lg",
				orientation: "horizontal",
			});
			expect(result.input()).toContain("bg-muted");
			expect(result.input()).toContain("h-10");
			expect(result.root()).toContain("flex-row");
		});
	});
});
