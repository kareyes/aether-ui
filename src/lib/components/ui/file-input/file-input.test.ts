import { describe, it, expect } from "bun:test";
import { fileInputVariants } from "./utils/file-input-variants.js";

describe("fileInputVariants", () => {
	describe("common slot styles", () => {
		it("should return fileList styles", () => {
			const result = fileInputVariants();
			expect(result.fileList()).toContain("space-y-2");
		});

		it("should return fileItem styles", () => {
			const result = fileInputVariants();
			expect(result.fileItem()).toContain("flex");
			expect(result.fileItem()).toContain("items-center");
			expect(result.fileItem()).toContain("bg-muted");
			expect(result.fileItem()).toContain("rounded");
		});

		it("should return fileName styles", () => {
			const result = fileInputVariants();
			expect(result.fileName()).toContain("flex-1");
			expect(result.fileName()).toContain("truncate");
		});

		it("should return fileSize styles", () => {
			const result = fileInputVariants();
			expect(result.fileSize()).toContain("text-xs");
			expect(result.fileSize()).toContain("text-muted-foreground");
		});

		it("should return removeButton styles", () => {
			const result = fileInputVariants();
			expect(result.removeButton()).toContain("text-destructive");
		});

		it("should return errorText styles", () => {
			const result = fileInputVariants();
			expect(result.errorText()).toContain("text-xs");
			expect(result.errorText()).toContain("text-destructive");
		});

		it("should return infoText styles", () => {
			const result = fileInputVariants();
			expect(result.infoText()).toContain("text-xs");
			expect(result.infoText()).toContain("text-muted-foreground");
		});
	});

	describe("drag and drop slot styles", () => {
		it("should return dragContainer styles", () => {
			const result = fileInputVariants();
			expect(result.dragContainer()).toContain("relative");
			expect(result.dragContainer()).toContain("border-2");
			expect(result.dragContainer()).toContain("border-dashed");
			expect(result.dragContainer()).toContain("rounded-lg");
			expect(result.dragContainer()).toContain("cursor-pointer");
		});

		it("should return dragInput styles", () => {
			const result = fileInputVariants();
			expect(result.dragInput()).toContain("absolute");
			expect(result.dragInput()).toContain("inset-0");
			expect(result.dragInput()).toContain("opacity-0");
		});

		it("should return dragContent styles", () => {
			const result = fileInputVariants();
			expect(result.dragContent()).toContain("flex");
			expect(result.dragContent()).toContain("flex-col");
			expect(result.dragContent()).toContain("items-center");
			expect(result.dragContent()).toContain("text-center");
		});

		it("should return dragIcon styles", () => {
			const result = fileInputVariants();
			expect(result.dragIcon()).toContain("text-muted-foreground");
		});

		it("should return dragText styles", () => {
			const result = fileInputVariants();
			expect(result.dragText()).toContain("text-muted-foreground");
		});

		it("should return dragSubtext styles", () => {
			const result = fileInputVariants();
			expect(result.dragSubtext()).toContain("text-muted-foreground");
		});
	});

	describe("regular input slot styles", () => {
		it("should return regularContainer styles", () => {
			const result = fileInputVariants();
			expect(result.regularContainer()).toContain("space-y-2");
		});

		it("should return regularInput styles", () => {
			const result = fileInputVariants();
			expect(result.regularInput()).toContain("flex");
			expect(result.regularInput()).toContain("w-full");
			expect(result.regularInput()).toContain("rounded-md");
			expect(result.regularInput()).toContain("border");
		});
	});

	describe("button mode slot styles", () => {
		it("should return buttonContainer styles", () => {
			const result = fileInputVariants();
			expect(result.buttonContainer()).toContain("space-y-2");
		});

		it("should return button styles", () => {
			const result = fileInputVariants();
			expect(result.button()).toContain("inline-flex");
			expect(result.button()).toContain("items-center");
			expect(result.button()).toContain("rounded-md");
		});

		it("should return buttonInput styles", () => {
			const result = fileInputVariants();
			expect(result.buttonInput()).toContain("sr-only");
		});

		it("should return buttonIcon styles", () => {
			const result = fileInputVariants();
			expect(result.buttonIcon()).toContain("mr-2");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = fileInputVariants({ variant: "default" });
			expect(result.dragContainer()).toContain("border-input");
			expect(result.dragContainer()).toContain("bg-background");
			expect(result.regularInput()).toContain("border-input");
		});

		it("should apply filled variant", () => {
			const result = fileInputVariants({ variant: "filled" });
			expect(result.dragContainer()).toContain("border-muted");
			expect(result.dragContainer()).toContain("bg-muted/50");
			expect(result.regularInput()).toContain("border-transparent");
			expect(result.regularInput()).toContain("bg-muted");
		});

		it("should apply ghost variant", () => {
			const result = fileInputVariants({ variant: "ghost" });
			expect(result.dragContainer()).toContain("border-transparent");
			expect(result.dragContainer()).toContain("bg-transparent");
			expect(result.regularInput()).toContain("border-transparent");
		});
	});

	describe("size styles", () => {
		it("should apply sm size", () => {
			const result = fileInputVariants({ size: "sm" });
			expect(result.dragContainer()).toContain("min-h-[80px]");
			expect(result.dragContent()).toContain("p-4");
			expect(result.dragText()).toContain("text-xs");
			expect(result.regularInput()).toContain("h-8");
			expect(result.button()).toContain("h-8");
			expect(result.buttonIcon()).toContain("size-3");
		});

		it("should apply default size", () => {
			const result = fileInputVariants({ size: "default" });
			expect(result.dragContainer()).toContain("min-h-[120px]");
			expect(result.dragContent()).toContain("p-6");
			expect(result.dragText()).toContain("text-sm");
			expect(result.regularInput()).toContain("h-9");
			expect(result.button()).toContain("h-9");
			expect(result.buttonIcon()).toContain("size-4");
		});

		it("should apply lg size", () => {
			const result = fileInputVariants({ size: "lg" });
			expect(result.dragContainer()).toContain("min-h-[160px]");
			expect(result.dragContent()).toContain("p-8");
			expect(result.dragText()).toContain("text-base");
			expect(result.regularInput()).toContain("h-10");
			expect(result.button()).toContain("h-10");
			expect(result.buttonIcon()).toContain("size-5");
		});
	});

	describe("state styles", () => {
		it("should apply default state", () => {
			const result = fileInputVariants({ state: "default" });
			expect(result.dragContainer()).toBeDefined();
		});

		it("should apply dragover state", () => {
			const result = fileInputVariants({ state: "dragover" });
			expect(result.dragContainer()).toContain("border-primary");
			expect(result.dragContainer()).toContain("bg-primary/5");
			expect(result.dragContainer()).toContain("border-solid");
		});

		it("should apply error state", () => {
			const result = fileInputVariants({ state: "error" });
			expect(result.dragContainer()).toContain("border-destructive");
			expect(result.dragContainer()).toContain("bg-destructive/5");
			expect(result.regularInput()).toContain("border-destructive");
			expect(result.button()).toContain("border-destructive");
		});

		it("should apply disabled state", () => {
			const result = fileInputVariants({ state: "disabled" });
			expect(result.dragContainer()).toContain("opacity-50");
			expect(result.dragContainer()).toContain("cursor-not-allowed");
			expect(result.dragInput()).toContain("cursor-not-allowed");
			expect(result.button()).toContain("opacity-50");
		});
	});

	describe("default variants", () => {
		it("should use default variant", () => {
			const result = fileInputVariants();
			expect(result.dragContainer()).toContain("border-input");
		});

		it("should use default size", () => {
			const result = fileInputVariants();
			expect(result.dragContainer()).toContain("min-h-[120px]");
		});

		it("should use default state", () => {
			const result = fileInputVariants();
			expect(result.dragContainer()).not.toContain("border-destructive");
		});
	});

	describe("combined variants", () => {
		it("should combine variant, size, and state correctly", () => {
			const result = fileInputVariants({
				variant: "filled",
				size: "lg",
				state: "dragover",
			});
			expect(result.dragContainer()).toContain("bg-primary/5");
			expect(result.dragContainer()).toContain("min-h-[160px]");
			expect(result.dragContent()).toContain("p-8");
		});
	});

	describe("focus styles", () => {
		it("should include focus styles on dragContainer", () => {
			const result = fileInputVariants();
			expect(result.dragContainer()).toContain("focus-within:ring-2");
		});

		it("should include focus styles on regularInput", () => {
			const result = fileInputVariants();
			expect(result.regularInput()).toContain("focus-visible:ring-1");
		});

		it("should include focus styles on button", () => {
			const result = fileInputVariants();
			expect(result.button()).toContain("focus-visible:ring-1");
		});
	});
});
