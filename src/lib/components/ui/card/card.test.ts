import { describe, it, expect } from "vitest";
import { cardVariants } from "./card-variants.js";

describe("cardVariants", () => {
	describe("base styles", () => {
		it("should include base card styles", () => {
			const result = cardVariants();
			expect(result).toContain("bg-card");
			expect(result).toContain("text-card-foreground");
		});

		it("should include responsive rounded corners", () => {
			const result = cardVariants();
			expect(result).toContain("rounded-lg");
			expect(result).toContain("sm:rounded-xl");
		});

		it("should include shadow", () => {
			const result = cardVariants();
			expect(result).toContain("shadow-sm");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant with border", () => {
			const result = cardVariants({ variant: "default" });
			expect(result).toContain("border");
			expect(result).toContain("border-border");
		});

		it("should apply outline variant with thicker border", () => {
			const result = cardVariants({ variant: "outline" });
			expect(result).toContain("border-2");
		});

		it("should apply ghost variant without visible border", () => {
			const result = cardVariants({ variant: "ghost" });
			expect(result).toContain("border-transparent");
			expect(result).toContain("shadow-none");
		});

		it("should apply elevated variant with larger shadow", () => {
			const result = cardVariants({ variant: "elevated" });
			expect(result).toContain("shadow-lg");
		});

		it("should apply filled variant with muted background", () => {
			const result = cardVariants({ variant: "filled" });
			expect(result).toContain("bg-muted");
		});
	});

	describe("padding styles", () => {
		it("should support none padding", () => {
			const result = cardVariants({ padding: "none" });
			expect(result).toBeDefined();
		});

		it("should support sm padding", () => {
			const result = cardVariants({ padding: "sm" });
			expect(result).toBeDefined();
		});

		it("should support default padding", () => {
			const result = cardVariants({ padding: "default" });
			expect(result).toBeDefined();
		});

		it("should support lg padding", () => {
			const result = cardVariants({ padding: "lg" });
			expect(result).toBeDefined();
		});
	});

	describe("hover styles", () => {
		it("should apply hover styles when hover is true", () => {
			const result = cardVariants({ hover: true });
			expect(result).toContain("hover:shadow-md");
			expect(result).toContain("transition-all");
		});

		it("should not apply hover styles when hover is false", () => {
			const result = cardVariants({ hover: false });
			expect(result).not.toContain("hover:shadow-md");
		});
	});

	describe("interactive styles", () => {
		it("should apply interactive styles when interactive is true", () => {
			const result = cardVariants({ interactive: true });
			expect(result).toContain("cursor-pointer");
			expect(result).toContain("hover:scale-[1.02]");
		});

		it("should not apply interactive styles when interactive is false", () => {
			const result = cardVariants({ interactive: false });
			expect(result).not.toContain("cursor-pointer");
		});
	});

	describe("default variants", () => {
		it("should use default variant when not specified", () => {
			const result = cardVariants();
			expect(result).toContain("border");
			expect(result).toContain("border-border");
		});

		it("should not be hoverable by default", () => {
			const result = cardVariants();
			expect(result).not.toContain("hover:shadow-md");
		});

		it("should not be interactive by default", () => {
			const result = cardVariants();
			expect(result).not.toContain("cursor-pointer");
		});
	});

	describe("combined variants", () => {
		it("should combine variant and hover correctly", () => {
			const result = cardVariants({ variant: "elevated", hover: true });
			expect(result).toContain("shadow-lg");
			expect(result).toContain("hover:shadow-md");
		});

		it("should combine variant and interactive correctly", () => {
			const result = cardVariants({ variant: "outline", interactive: true });
			expect(result).toContain("border-2");
			expect(result).toContain("cursor-pointer");
		});
	});
});
