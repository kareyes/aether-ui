import { describe, it, expect } from "vitest";
import { alertDialogVariants } from "./alert-dialog-variants.js";

describe("alertDialogVariants", () => {
	describe("slot styles", () => {
		it("should return content styles", () => {
			const result = alertDialogVariants();
			expect(result.content()).toContain("bg-background");
			expect(result.content()).toContain("fixed");
			expect(result.content()).toContain("z-50");
			expect(result.content()).toContain("border");
		});

		it("should return header styles", () => {
			const result = alertDialogVariants();
			expect(result.header()).toContain("flex");
			expect(result.header()).toContain("flex-col");
		});

		it("should return title styles", () => {
			const result = alertDialogVariants();
			expect(result.title()).toContain("font-semibold");
			expect(result.title()).toContain("tracking-tight");
		});

		it("should return description styles", () => {
			const result = alertDialogVariants();
			expect(result.description()).toContain("text-sm");
			expect(result.description()).toContain("text-muted-foreground");
		});

		it("should return footer styles", () => {
			const result = alertDialogVariants();
			expect(result.footer()).toContain("flex");
			expect(result.footer()).toContain("sm:justify-end");
		});

		it("should return action slot (empty by default)", () => {
			const result = alertDialogVariants();
			expect(result.action).toBeDefined();
		});

		it("should return cancel slot (empty by default)", () => {
			const result = alertDialogVariants();
			expect(result.cancel).toBeDefined();
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = alertDialogVariants({ variant: "default" });
			expect(result.content()).toContain("rounded-lg");
			expect(result.content()).toContain("p-6");
			expect(result.title()).toContain("text-foreground");
		});

		it("should apply destructive variant", () => {
			const result = alertDialogVariants({ variant: "destructive" });
			expect(result.content()).toContain("border-destructive/50");
			expect(result.title()).toContain("text-destructive");
		});

		it("should apply success variant", () => {
			const result = alertDialogVariants({ variant: "success" });
			expect(result.content()).toContain("border-green-500/50");
			expect(result.title()).toContain("text-green-600");
		});

		it("should apply warning variant", () => {
			const result = alertDialogVariants({ variant: "warning" });
			expect(result.content()).toContain("border-yellow-500/50");
			expect(result.title()).toContain("text-yellow-600");
		});

		it("should apply info variant", () => {
			const result = alertDialogVariants({ variant: "info" });
			expect(result.content()).toContain("border-blue-500/50");
			expect(result.title()).toContain("text-blue-600");
		});
	});

	describe("size styles", () => {
		it("should apply sm size", () => {
			const result = alertDialogVariants({ size: "sm" });
			expect(result.content()).toContain("sm:max-w-sm");
			expect(result.content()).toContain("p-4");
			expect(result.title()).toContain("text-base");
			expect(result.description()).toContain("text-xs");
		});

		it("should apply default size", () => {
			const result = alertDialogVariants({ size: "default" });
			expect(result.content()).toContain("sm:max-w-lg");
			expect(result.content()).toContain("p-6");
			expect(result.title()).toContain("text-lg");
			expect(result.description()).toContain("text-sm");
		});

		it("should apply lg size", () => {
			const result = alertDialogVariants({ size: "lg" });
			expect(result.content()).toContain("sm:max-w-2xl");
			expect(result.content()).toContain("p-8");
			expect(result.title()).toContain("text-xl");
			expect(result.description()).toContain("text-base");
		});
	});

	describe("default variants", () => {
		it("should use default variant when not specified", () => {
			const result = alertDialogVariants();
			expect(result.title()).toContain("text-foreground");
		});

		it("should use default size when not specified", () => {
			const result = alertDialogVariants();
			expect(result.content()).toContain("sm:max-w-lg");
		});
	});

	describe("animation styles", () => {
		it("should include animation classes for content", () => {
			const result = alertDialogVariants();
			expect(result.content()).toContain("data-[state=open]:animate-in");
			expect(result.content()).toContain("data-[state=closed]:animate-out");
			expect(result.content()).toContain("data-[state=closed]:fade-out-0");
			expect(result.content()).toContain("data-[state=open]:fade-in-0");
		});

		it("should include zoom animation classes", () => {
			const result = alertDialogVariants();
			expect(result.content()).toContain("data-[state=closed]:zoom-out-95");
			expect(result.content()).toContain("data-[state=open]:zoom-in-95");
		});
	});

	describe("positioning styles", () => {
		it("should be centered on screen", () => {
			const result = alertDialogVariants();
			expect(result.content()).toContain("start-[50%]");
			expect(result.content()).toContain("top-[50%]");
			expect(result.content()).toContain("translate-x-[-50%]");
			expect(result.content()).toContain("translate-y-[-50%]");
		});
	});

	describe("combined variants", () => {
		it("should combine variant and size correctly", () => {
			const result = alertDialogVariants({
				variant: "destructive",
				size: "lg",
			});
			expect(result.content()).toContain("border-destructive/50");
			expect(result.content()).toContain("sm:max-w-2xl");
			expect(result.title()).toContain("text-destructive");
			expect(result.title()).toContain("text-xl");
		});
	});
});
