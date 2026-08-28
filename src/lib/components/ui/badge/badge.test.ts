import { describe, it, expect } from "bun:test";
import { badgeVariants } from "./badge-variants.js";

describe("badgeVariants", () => {
	describe("base styles", () => {
		it("should include base layout styles", () => {
			const result = badgeVariants();
			expect(result).toContain("inline-flex");
			expect(result).toContain("items-center");
			expect(result).toContain("justify-center");
		});

		it("should include typography styles", () => {
			const result = badgeVariants();
			expect(result).toContain("text-xs");
			expect(result).toContain("font-medium");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant styles", () => {
			const result = badgeVariants({ variant: "default" });
			expect(result).toContain("border-transparent");
		});

		it("should apply secondary variant styles", () => {
			const result = badgeVariants({ variant: "secondary" });
			expect(result).toContain("border-transparent");
		});

		it("should apply flat variant styles", () => {
			const result = badgeVariants({ variant: "flat" });
			expect(result).toContain("border-transparent");
		});

		it("should apply outline variant styles", () => {
			const result = badgeVariants({ variant: "outline" });
			expect(result).toContain("bg-background");
		});

		it("should apply dashed variant styles", () => {
			const result = badgeVariants({ variant: "dashed" });
			expect(result).toContain("border-dashed");
		});
	});

	describe("shape styles", () => {
		it("should apply rounded shape", () => {
			const result = badgeVariants({ shape: "rounded" });
			expect(result).toContain("rounded-md");
		});

		it("should apply circle shape", () => {
			const result = badgeVariants({ shape: "circle" });
			expect(result).toContain("rounded-full");
		});

		it("should apply square shape", () => {
			const result = badgeVariants({ shape: "square" });
			expect(result).toContain("rounded-none");
		});
	});

	describe("color styles", () => {
		const colors = [
			"red",
			"orange",
			"yellow",
			"green",
			"blue",
			"purple",
			"pink",
			"gray",
		] as const;

		colors.forEach((color) => {
			it(`should apply ${color} color with default variant`, () => {
				const result = badgeVariants({ variant: "default", color });
				expect(result).toContain(`bg-${color}-500`);
			});
		});

		it("should apply default color with default variant", () => {
			const result = badgeVariants({ variant: "default", color: "default" });
			expect(result).toContain("bg-primary");
			expect(result).toContain("text-primary-foreground");
		});

		it("should apply red color with secondary variant", () => {
			const result = badgeVariants({ variant: "secondary", color: "red" });
			expect(result).toContain("bg-red-100");
			expect(result).toContain("text-red-900");
		});

		it("should apply green color with outline variant", () => {
			const result = badgeVariants({ variant: "outline", color: "green" });
			expect(result).toContain("text-green-600");
			expect(result).toContain("border-green-300");
		});
	});

	describe("primary color", () => {
		it("should fill with the primary token on the default variant", () => {
			const result = badgeVariants({ variant: "default", color: "primary" });
			expect(result).toContain("bg-primary");
			expect(result).toContain("text-primary-foreground");
		});

		it("should tint on the secondary variant", () => {
			const result = badgeVariants({ variant: "secondary", color: "primary" });
			expect(result).toContain("bg-primary/20");
			expect(result).toContain("text-primary");
		});

		it("should tint more lightly on the flat variant", () => {
			const result = badgeVariants({ variant: "flat", color: "primary" });
			expect(result).toContain("bg-primary/10");
			expect(result).toContain("text-primary");
		});

		it("should color the text and border on the outline variant", () => {
			const result = badgeVariants({ variant: "outline", color: "primary" });
			expect(result).toContain("text-primary");
			expect(result).toContain("border-primary/40");
		});

		it("should color the text and border on the dashed variant", () => {
			const result = badgeVariants({ variant: "dashed", color: "primary" });
			expect(result).toContain("text-primary");
			expect(result).toContain("border-primary/40");
			expect(result).toContain("border-dashed");
		});

		it("should dim on hover when clickable", () => {
			const result = badgeVariants({
				variant: "default",
				color: "primary",
				clickable: true,
			});
			expect(result).toContain("hover:bg-primary/90");
		});
	});

	describe("size styles", () => {
		it("should apply sm size", () => {
			const result = badgeVariants({ size: "sm" });
			expect(result).toContain("px-1.5");
		});

		it("should apply default size", () => {
			const result = badgeVariants({ size: "default" });
			expect(result).toContain("px-2");
		});

		it("should apply lg size", () => {
			const result = badgeVariants({ size: "lg" });
			expect(result).toContain("px-2.5");
			expect(result).toContain("text-sm");
		});
	});

	describe("clickable styles", () => {
		it("should apply clickable styles when true", () => {
			const result = badgeVariants({ clickable: true });
			expect(result).toContain("cursor-pointer");
			expect(result).toContain("hover:scale-105");
		});

		it("should not apply clickable styles when false", () => {
			const result = badgeVariants({ clickable: false });
			expect(result).not.toContain("cursor-pointer");
		});
	});

	describe("compound variants", () => {
		it("should apply clickable hover styles for default variant with color", () => {
			const result = badgeVariants({
				variant: "default",
				color: "red",
				clickable: true,
			});
			expect(result).toContain("hover:bg-red-600");
		});

		it("should apply clickable hover styles for outline variant", () => {
			const result = badgeVariants({ variant: "outline", clickable: true });
			expect(result).toContain("hover:bg-accent");
		});
	});

	describe("default variants", () => {
		it("should use default variant when not specified", () => {
			const result = badgeVariants();
			expect(result).toContain("border-transparent");
		});

		it("should use default shape when not specified", () => {
			const result = badgeVariants();
			expect(result).toContain("rounded-md");
		});

		it("should not be clickable by default", () => {
			const result = badgeVariants();
			expect(result).not.toContain("cursor-pointer");
		});
	});

	describe("role colors", () => {
		// These four follow the active theme the way `primary` does; the fixed hues
		// (`red`, `green`, …) do not. `danger` reads `--destructive`, the single red
		// role token — `--danger` is a deprecated alias.
		const roles = [
			["success", "success"],
			["danger", "destructive"],
			["warning", "warning"],
			["info", "info"],
		] as const;

		roles.forEach(([color, token]) => {
			it(`should fill with the ${token} token on the default variant`, () => {
				const result = badgeVariants({ variant: "default", color });
				expect(result).toContain(`bg-${token}`);
				expect(result).toContain(`text-${token}-foreground`);
			});

			it(`should tint ${color} on the secondary variant`, () => {
				const result = badgeVariants({ variant: "secondary", color });
				expect(result).toContain(`bg-${token}/20`);
				expect(result).toContain(`text-${token}`);
			});

			it(`should tint ${color} more lightly on the flat variant`, () => {
				const result = badgeVariants({ variant: "flat", color });
				expect(result).toContain(`bg-${token}/10`);
				expect(result).toContain(`text-${token}`);
			});

			it(`should color the text and border for ${color} on outline and dashed`, () => {
				for (const variant of ["outline", "dashed"] as const) {
					const result = badgeVariants({ variant, color });
					expect(result).toContain(`text-${token}`);
					expect(result).toContain(`border-${token}/40`);
				}
			});

			it(`should dim ${color} on hover when clickable`, () => {
				const result = badgeVariants({
					variant: "default",
					color,
					clickable: true,
				});
				expect(result).toContain(`hover:bg-${token}/90`);
			});
		});

		it("resolves its red to --destructive, never the deprecated alias", () => {
			// The alias is substituted on the element `:root` matched, so a `.dark`
			// scoped to a subtree keeps the light red inside it. The key is named
			// `danger` for its info / warning / success siblings; what it emits is
			// the one red role token.
			for (const variant of [
				"default",
				"secondary",
				"flat",
				"outline",
				"dashed",
			] as const)
				expect(badgeVariants({ variant, color: "danger" })).not.toContain(
					"danger",
				);
		});
	});
});
