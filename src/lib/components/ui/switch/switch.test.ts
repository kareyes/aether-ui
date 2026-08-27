import { describe, it, expect } from "bun:test";
import { switchVariants } from "./switch-variants.js";

describe("switchVariants", () => {
	describe("slot styles", () => {
		it("should return root styles", () => {
			const result = switchVariants();
			expect(result.root()).toContain("inline-flex");
			expect(result.root()).toContain("items-center");
			expect(result.root()).toContain("rounded-full");
		});

		it("should return thumb styles", () => {
			const result = switchVariants();
			expect(result.thumb()).toContain("rounded-full");
			expect(result.thumb()).toContain("transition-all");
		});

		it("should include focus styles in root", () => {
			const result = switchVariants();
			expect(result.root()).toContain("focus-visible:ring-2");
		});

		it("should include disabled styles in root", () => {
			const result = switchVariants();
			expect(result.root()).toContain("disabled:cursor-not-allowed");
			expect(result.root()).toContain("disabled:opacity-50");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant to root", () => {
			const result = switchVariants({ variant: "default" });
			expect(result.root()).toContain("data-[state=checked]:bg-primary");
			expect(result.root()).toContain("data-[state=unchecked]:bg-input");
		});

		it("should apply default variant to thumb", () => {
			const result = switchVariants({ variant: "default" });
			expect(result.thumb()).toContain("bg-background");
		});

		it("should apply success variant to root", () => {
			const result = switchVariants({ variant: "success" });
			expect(result.root()).toContain("data-[state=checked]:bg-success");
		});

		it("should apply warning variant to root", () => {
			const result = switchVariants({ variant: "warning" });
			expect(result.root()).toContain("data-[state=checked]:bg-warning");
		});

		it("should apply destructive variant to root", () => {
			const result = switchVariants({ variant: "destructive" });
			expect(result.root()).toContain("data-[state=checked]:bg-destructive");
		});

		it("should render the deprecated danger alias identically to destructive", () => {
			expect(switchVariants({ variant: "danger" }).root()).toBe(
				switchVariants({ variant: "destructive" }).root(),
			);
		});

		it("should apply ghost variant to root", () => {
			const result = switchVariants({ variant: "ghost" });
			expect(result.root()).toContain("data-[state=checked]:bg-accent");
			expect(result.root()).toContain("border");
		});
	});

	describe("size styles", () => {
		it("should apply sm size to root", () => {
			const result = switchVariants({ size: "sm" });
			expect(result.root()).toContain("h-4");
			expect(result.root()).toContain("w-7");
		});

		it("should apply sm size to thumb", () => {
			const result = switchVariants({ size: "sm" });
			expect(result.thumb()).toContain("size-3");
		});

		it("should apply default size to root", () => {
			const result = switchVariants({ size: "default" });
			expect(result.root()).toContain("h-[1.15rem]");
			expect(result.root()).toContain("w-8");
		});

		it("should apply default size to thumb", () => {
			const result = switchVariants({ size: "default" });
			expect(result.thumb()).toContain("size-4");
		});

		it("should apply lg size to root", () => {
			const result = switchVariants({ size: "lg" });
			expect(result.root()).toContain("h-6");
			expect(result.root()).toContain("w-10");
		});

		it("should apply lg size to thumb", () => {
			const result = switchVariants({ size: "lg" });
			expect(result.thumb()).toContain("size-5");
		});
	});

	describe("default variants", () => {
		it("should use default variant when not specified", () => {
			const result = switchVariants();
			expect(result.root()).toContain("data-[state=checked]:bg-primary");
		});

		it("should use default size when not specified", () => {
			const result = switchVariants();
			expect(result.root()).toContain("h-[1.15rem]");
		});
	});

	describe("combined variants", () => {
		it("should combine variant and size correctly", () => {
			const result = switchVariants({ variant: "success", size: "lg" });
			expect(result.root()).toContain("data-[state=checked]:bg-success");
			expect(result.root()).toContain("h-6");
			expect(result.thumb()).toContain("size-5");
		});
	});

	describe("transition styles", () => {
		it("should include transition in root", () => {
			const result = switchVariants();
			expect(result.root()).toContain("transition-all");
		});

		it("should include transition in thumb", () => {
			const result = switchVariants();
			expect(result.thumb()).toContain("transition-all");
		});
	});
});
