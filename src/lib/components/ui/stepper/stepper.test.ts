import { describe, it, expect } from "bun:test";
import { stepperVariants } from "./stepper-variants.js";

describe("stepperVariants", () => {
	describe("slot styles", () => {
		it("should return root styles", () => {
			const result = stepperVariants();
			expect(result.root()).toContain("flex");
			expect(result.root()).toContain("gap-0");
		});

		it("should return step styles", () => {
			const result = stepperVariants();
			expect(result.step()).toContain("flex");
			expect(result.step()).toContain("items-center");
			expect(result.step()).toContain("transition-all");
		});

		it("should return stepButton styles", () => {
			const result = stepperVariants();
			expect(result.stepButton()).toContain("flex");
			expect(result.stepButton()).toContain("items-center");
			expect(result.stepButton()).toContain("justify-center");
			expect(result.stepButton()).toContain("rounded-full");
		});

		it("should return stepIcon styles", () => {
			const result = stepperVariants();
			expect(result.stepIcon()).toContain("flex");
			expect(result.stepIcon()).toContain("items-center");
		});

		it("should return stepContent styles", () => {
			const result = stepperVariants();
			expect(result.stepContent()).toContain("flex");
			expect(result.stepContent()).toContain("flex-col");
		});

		it("should return stepLabel styles", () => {
			const result = stepperVariants();
			expect(result.stepLabel()).toContain("font-medium");
			expect(result.stepLabel()).toContain("transition-colors");
		});

		it("should return stepDescription styles", () => {
			const result = stepperVariants();
			expect(result.stepDescription()).toContain("text-sm");
			expect(result.stepDescription()).toContain("text-muted-foreground");
		});

		it("should return separator styles", () => {
			const result = stepperVariants();
			expect(result.separator()).toContain("flex");
			expect(result.separator()).toContain("flex-1");
		});

		it("should return separatorLine styles", () => {
			const result = stepperVariants();
			// separatorLine is the animated fill; the track colour lives on separator
			expect(result.separatorLine()).toContain("bg-primary");
			expect(result.separatorLine()).toContain("rounded-full");
			expect(result.separator()).toContain("bg-border");
		});
	});

	describe("orientation styles", () => {
		it("should apply horizontal orientation to root", () => {
			const result = stepperVariants({ orientation: "horizontal" });
			expect(result.root()).toContain("flex-row");
			expect(result.root()).toContain("items-start");
		});

		it("should apply horizontal orientation to step", () => {
			const result = stepperVariants({ orientation: "horizontal" });
			expect(result.step()).toContain("flex-col");
			expect(result.step()).toContain("items-center");
		});

		it("should apply vertical orientation to root", () => {
			const result = stepperVariants({ orientation: "vertical" });
			expect(result.root()).toContain("flex-col");
		});

		it("should apply vertical orientation to step", () => {
			const result = stepperVariants({ orientation: "vertical" });
			expect(result.step()).toContain("flex-row");
		});
	});

	describe("size styles", () => {
		it("should apply xs size", () => {
			const result = stepperVariants({ size: "xs" });
			expect(result.stepButton()).toContain("size-6");
			expect(result.stepLabel()).toContain("text-xs");
		});

		it("should apply sm size", () => {
			const result = stepperVariants({ size: "sm" });
			expect(result.stepButton()).toContain("size-8");
			expect(result.stepLabel()).toContain("text-sm");
		});

		it("should apply default size", () => {
			const result = stepperVariants({ size: "default" });
			expect(result.stepButton()).toContain("size-10");
			expect(result.stepLabel()).toContain("text-base");
		});

		it("should apply lg size", () => {
			const result = stepperVariants({ size: "lg" });
			expect(result.stepButton()).toContain("size-12");
			expect(result.stepLabel()).toContain("text-lg");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = stepperVariants({ variant: "default" });
			expect(result.stepButton()).toContain(
				"data-[state=completed]:bg-primary",
			);
			expect(result.stepButton()).toContain("data-[state=active]:bg-primary");
		});

		it("should apply outline variant", () => {
			const result = stepperVariants({ variant: "outline" });
			expect(result.stepButton()).toContain(
				"data-[state=completed]:bg-background",
			);
			expect(result.stepButton()).toContain(
				"data-[state=completed]:text-primary",
			);
		});

		it("should apply ghost variant", () => {
			const result = stepperVariants({ variant: "ghost" });
			expect(result.stepButton()).toContain("border-0");
			expect(result.stepButton()).toContain(
				"data-[state=completed]:bg-primary/10",
			);
		});

		it("should apply flat variant", () => {
			const result = stepperVariants({ variant: "flat" });
			expect(result.stepButton()).toContain("rounded-none");
			expect(result.stepButton()).toContain("w-full");
			expect(result.separator()).toContain("hidden");
		});
	});

	describe("clickable styles", () => {
		it("should apply clickable styles when true", () => {
			const result = stepperVariants({ clickable: true });
			expect(result.stepButton()).toContain("cursor-pointer");
			expect(result.stepButton()).toContain("hover:scale-105");
		});

		it("should apply non-clickable styles when false", () => {
			const result = stepperVariants({ clickable: false });
			expect(result.stepButton()).toContain("cursor-default");
		});
	});

	describe("compound variants", () => {
		it("should apply vertical + xs compound variant", () => {
			const result = stepperVariants({ orientation: "vertical", size: "xs" });
			expect(result.separatorLine()).toContain("w-px");
			expect(result.separator()).toContain("h-12");
		});

		it("should apply vertical + default compound variant", () => {
			const result = stepperVariants({
				orientation: "vertical",
				size: "default",
			});
			expect(result.separatorLine()).toContain("w-0.5");
			expect(result.separator()).toContain("h-20");
		});

		it("should apply horizontal + sm compound variant", () => {
			const result = stepperVariants({ orientation: "horizontal", size: "sm" });
			// button size-8 (32px), connector h-0.5 (2px) -> mt = 16 - 1 = 15px
			expect(result.separator()).toContain("mt-[15px]");
		});

		it("should apply horizontal + lg compound variant", () => {
			const result = stepperVariants({ orientation: "horizontal", size: "lg" });
			// button size-12 (48px), connector h-0.5 (2px) -> mt = 24 - 1 = 23px
			expect(result.separator()).toContain("mt-[23px]");
		});
	});

	describe("default variants", () => {
		it("should use horizontal orientation by default", () => {
			const result = stepperVariants();
			expect(result.root()).toContain("flex-row");
		});

		it("should use default size by default", () => {
			const result = stepperVariants();
			expect(result.stepButton()).toContain("size-10");
		});

		it("should use default variant by default", () => {
			const result = stepperVariants();
			expect(result.stepButton()).toContain(
				"data-[state=completed]:bg-primary",
			);
		});

		it("should not be clickable by default", () => {
			const result = stepperVariants();
			expect(result.stepButton()).toContain("cursor-default");
		});
	});

	describe("combined variants", () => {
		it("should combine orientation, size, and variant correctly", () => {
			const result = stepperVariants({
				orientation: "vertical",
				size: "lg",
				variant: "outline",
			});
			expect(result.root()).toContain("flex-col");
			expect(result.stepButton()).toContain("size-12");
			expect(result.stepButton()).toContain(
				"data-[state=completed]:text-primary",
			);
		});
	});
});
