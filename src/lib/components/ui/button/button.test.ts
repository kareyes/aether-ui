import { describe, it, expect } from "bun:test";
import { buttonVariants } from "./button-variants.js";

describe("buttonVariants", () => {
	describe("base styles", () => {
		it("should include base focus and accessibility styles", () => {
			const result = buttonVariants();
			expect(result).toContain("focus-visible:ring");
			expect(result).toContain("disabled:pointer-events-none");
			expect(result).toContain("disabled:opacity-50");
		});

		it("should include layout styles", () => {
			const result = buttonVariants();
			expect(result).toContain("inline-flex");
			expect(result).toContain("items-center");
			expect(result).toContain("justify-center");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant styles", () => {
			const result = buttonVariants({ variant: "default" });
			expect(result).toContain("bg-primary");
			expect(result).toContain("text-primary-foreground");
		});

		it("should apply destructive variant styles", () => {
			const result = buttonVariants({ variant: "destructive" });
			expect(result).toContain("bg-destructive");
			expect(result).toContain("text-destructive-foreground");
		});

		it("should apply outline variant styles", () => {
			const result = buttonVariants({ variant: "outline" });
			expect(result).toContain("border");
			expect(result).toContain("bg-background");
		});

		it("should apply secondary variant styles", () => {
			const result = buttonVariants({ variant: "secondary" });
			expect(result).toContain("bg-secondary");
			expect(result).toContain("text-secondary-foreground");
		});

		it("should apply ghost variant styles", () => {
			const result = buttonVariants({ variant: "ghost" });
			expect(result).toContain("hover:bg-accent");
		});

		it("should apply link variant styles", () => {
			const result = buttonVariants({ variant: "link" });
			expect(result).toContain("text-primary");
			expect(result).toContain("underline-offset-4");
		});

		it("should apply bordered variant styles", () => {
			const result = buttonVariants({ variant: "bordered" });
			expect(result).toContain("border-2");
			expect(result).toContain("bg-transparent");
		});

		it("should apply flat variant styles", () => {
			const result = buttonVariants({ variant: "flat" });
			expect(result).toContain("bg-primary/10");
			expect(result).toContain("text-primary");
		});
	});

	describe("size styles", () => {
		it("should apply default size styles", () => {
			const result = buttonVariants({ size: "default" });
			expect(result).toContain("h-9");
			expect(result).toContain("px-4");
		});

		it("should apply sm size styles", () => {
			const result = buttonVariants({ size: "sm" });
			expect(result).toContain("h-8");
			expect(result).toContain("px-3");
		});

		it("should apply lg size styles", () => {
			const result = buttonVariants({ size: "lg" });
			expect(result).toContain("h-10");
			expect(result).toContain("px-6");
		});

		it("should apply icon size styles", () => {
			const result = buttonVariants({ size: "icon" });
			expect(result).toContain("size-9");
		});

		it("should apply icon-sm size styles", () => {
			const result = buttonVariants({ size: "icon-sm" });
			expect(result).toContain("size-8");
		});

		it("should apply icon-lg size styles", () => {
			const result = buttonVariants({ size: "icon-lg" });
			expect(result).toContain("size-10");
		});
	});

	describe("color styles", () => {
		it("should apply green color with default variant", () => {
			const result = buttonVariants({ variant: "default", color: "green" });
			expect(result).toContain("bg-success");
		});

		it("should apply yellow color with default variant", () => {
			const result = buttonVariants({ variant: "default", color: "yellow" });
			expect(result).toContain("bg-warning");
		});

		it("should apply red color with default variant", () => {
			const result = buttonVariants({ variant: "default", color: "red" });
			expect(result).toContain("bg-destructive");
		});

		it("should apply blue color with default variant", () => {
			const result = buttonVariants({ variant: "default", color: "blue" });
			expect(result).toContain("bg-info");
		});

		it("should render deprecated semantic aliases identically to their hue", () => {
			for (const [hue, alias] of [
				["red", "danger"],
				["green", "success"],
				["yellow", "warning"],
				["blue", "info"],
			] as const) {
				expect(buttonVariants({ variant: "default", color: hue })).toBe(
					buttonVariants({ variant: "default", color: alias }),
				);
			}
		});

		it("should apply green color with outline variant", () => {
			const result = buttonVariants({ variant: "outline", color: "green" });
			expect(result).toContain("border-success");
			expect(result).toContain("text-success");
		});

		it("should apply green color with ghost variant", () => {
			const result = buttonVariants({ variant: "ghost", color: "green" });
			expect(result).toContain("text-success");
		});
	});

	describe("default variants", () => {
		it("should use default variant when not specified", () => {
			const result = buttonVariants();
			expect(result).toContain("bg-primary");
		});

		it("should use default size when not specified", () => {
			const result = buttonVariants();
			expect(result).toContain("h-9");
		});
	});

	describe("combined variants", () => {
		it("should combine variant and size correctly", () => {
			const result = buttonVariants({ variant: "outline", size: "lg" });
			expect(result).toContain("border");
			expect(result).toContain("h-10");
		});

		it("should combine variant, size, and color correctly", () => {
			const result = buttonVariants({
				variant: "flat",
				size: "sm",
				color: "green",
			});
			expect(result).toContain("h-8");
			expect(result).toContain("bg-success/10");
		});
	});
});
