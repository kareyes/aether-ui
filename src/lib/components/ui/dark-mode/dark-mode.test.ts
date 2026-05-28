import { describe, it, expect } from "vitest";
import {
	darkModeToggleVariants,
	darkModeSwitchVariants,
	darkModeDropdownVariants,
} from "./dark-mode-variants.js";

describe("darkModeToggleVariants", () => {
	describe("slot styles", () => {
		it("should return root styles", () => {
			const result = darkModeToggleVariants();
			expect(result.root()).toContain("inline-flex");
			expect(result.root()).toContain("items-center");
			expect(result.root()).toContain("justify-center");
			expect(result.root()).toContain("rounded-md");
		});

		it("should return icon styles", () => {
			const result = darkModeToggleVariants();
			expect(result.icon()).toContain("transition-all");
		});

		it("should include focus styles in root", () => {
			const result = darkModeToggleVariants();
			expect(result.root()).toContain("focus-visible:ring-2");
		});

		it("should include disabled styles in root", () => {
			const result = darkModeToggleVariants();
			expect(result.root()).toContain("disabled:pointer-events-none");
			expect(result.root()).toContain("disabled:opacity-50");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = darkModeToggleVariants({ variant: "default" });
			expect(result.root()).toContain("bg-secondary");
			expect(result.root()).toContain("text-secondary-foreground");
		});

		it("should apply outline variant", () => {
			const result = darkModeToggleVariants({ variant: "outline" });
			expect(result.root()).toContain("border");
			expect(result.root()).toContain("bg-background");
		});

		it("should apply ghost variant", () => {
			const result = darkModeToggleVariants({ variant: "ghost" });
			expect(result.root()).toContain("hover:bg-accent");
		});

		it("should apply flat variant", () => {
			const result = darkModeToggleVariants({ variant: "flat" });
			expect(result.root()).toContain("bg-primary/10");
			expect(result.root()).toContain("text-primary");
		});

		it("should apply minimal variant", () => {
			const result = darkModeToggleVariants({ variant: "minimal" });
			expect(result.root()).toContain("text-muted-foreground");
			expect(result.root()).toContain("hover:text-foreground");
		});
	});

	describe("size styles", () => {
		it("should apply sm size", () => {
			const result = darkModeToggleVariants({ size: "sm" });
			expect(result.root()).toContain("size-8");
			expect(result.icon()).toContain("size-4");
		});

		it("should apply default size", () => {
			const result = darkModeToggleVariants({ size: "default" });
			expect(result.root()).toContain("size-9");
			expect(result.icon()).toContain("size-5");
		});

		it("should apply lg size", () => {
			const result = darkModeToggleVariants({ size: "lg" });
			expect(result.root()).toContain("size-10");
			expect(result.icon()).toContain("size-6");
		});

		it("should apply xl size", () => {
			const result = darkModeToggleVariants({ size: "xl" });
			expect(result.root()).toContain("size-12");
			expect(result.icon()).toContain("size-7");
		});
	});

	describe("shape styles", () => {
		it("should apply square shape", () => {
			const result = darkModeToggleVariants({ shape: "square" });
			expect(result.root()).toContain("rounded-md");
		});

		it("should apply rounded shape", () => {
			const result = darkModeToggleVariants({ shape: "rounded" });
			expect(result.root()).toContain("rounded-lg");
		});

		it("should apply circle shape", () => {
			const result = darkModeToggleVariants({ shape: "circle" });
			expect(result.root()).toContain("rounded-full");
		});
	});

	describe("default variants", () => {
		it("should use default variant", () => {
			const result = darkModeToggleVariants();
			expect(result.root()).toContain("bg-secondary");
		});

		it("should use default size", () => {
			const result = darkModeToggleVariants();
			expect(result.root()).toContain("size-9");
		});

		it("should use square shape by default", () => {
			const result = darkModeToggleVariants();
			expect(result.root()).toContain("rounded-md");
		});
	});
});

describe("darkModeSwitchVariants", () => {
	describe("slot styles", () => {
		it("should return root styles", () => {
			const result = darkModeSwitchVariants();
			expect(result.root()).toContain("relative");
			expect(result.root()).toContain("inline-flex");
			expect(result.root()).toContain("rounded-full");
		});

		it("should return thumb styles", () => {
			const result = darkModeSwitchVariants();
			expect(result.thumb()).toContain("absolute");
			expect(result.thumb()).toContain("rounded-full");
			expect(result.thumb()).toContain("bg-background");
		});

		it("should return icon styles", () => {
			const result = darkModeSwitchVariants();
			expect(result.icon()).toContain("transition-all");
		});

		it("should return iconContainer styles", () => {
			const result = darkModeSwitchVariants();
			expect(result.iconContainer()).toContain("absolute");
			expect(result.iconContainer()).toContain("flex");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = darkModeSwitchVariants({ variant: "default" });
			expect(result.root()).toContain("bg-muted");
		});

		it("should apply primary variant", () => {
			const result = darkModeSwitchVariants({ variant: "primary" });
			expect(result.root()).toContain("bg-primary/30");
		});

		it("should apply accent variant", () => {
			const result = darkModeSwitchVariants({ variant: "accent" });
			expect(result.root()).toContain("bg-accent");
		});

		it("should apply contrast variant", () => {
			const result = darkModeSwitchVariants({ variant: "contrast" });
			expect(result.root()).toContain("bg-foreground/20");
		});
	});

	describe("size styles", () => {
		it("should apply sm size", () => {
			const result = darkModeSwitchVariants({ size: "sm" });
			expect(result.root()).toContain("h-6");
			expect(result.root()).toContain("w-11");
			expect(result.thumb()).toContain("size-5");
			expect(result.icon()).toContain("size-3");
		});

		it("should apply default size", () => {
			const result = darkModeSwitchVariants({ size: "default" });
			expect(result.root()).toContain("h-7");
			expect(result.root()).toContain("w-14");
			expect(result.thumb()).toContain("size-6");
		});

		it("should apply lg size", () => {
			const result = darkModeSwitchVariants({ size: "lg" });
			expect(result.root()).toContain("h-8");
			expect(result.root()).toContain("w-16");
			expect(result.thumb()).toContain("size-7");
		});
	});
});

describe("darkModeDropdownVariants", () => {
	describe("slot styles", () => {
		it("should return trigger styles", () => {
			const result = darkModeDropdownVariants();
			expect(result.trigger()).toContain("inline-flex");
			expect(result.trigger()).toContain("items-center");
			expect(result.trigger()).toContain("rounded-md");
		});

		it("should return icon styles", () => {
			const result = darkModeDropdownVariants();
			expect(result.icon()).toContain("transition-all");
		});

		it("should return content styles", () => {
			const result = darkModeDropdownVariants();
			expect(result.content()).toContain("z-50");
			expect(result.content()).toContain("rounded-md");
			expect(result.content()).toContain("border");
		});

		it("should return item styles", () => {
			const result = darkModeDropdownVariants();
			expect(result.item()).toContain("flex");
			expect(result.item()).toContain("cursor-pointer");
			expect(result.item()).toContain("rounded-sm");
		});

		it("should return itemIcon styles", () => {
			const result = darkModeDropdownVariants();
			expect(result.itemIcon()).toContain("size-4");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant", () => {
			const result = darkModeDropdownVariants({ variant: "default" });
			expect(result.trigger()).toContain("bg-secondary");
		});

		it("should apply outline variant", () => {
			const result = darkModeDropdownVariants({ variant: "outline" });
			expect(result.trigger()).toContain("border");
			expect(result.trigger()).toContain("bg-background");
		});

		it("should apply ghost variant", () => {
			const result = darkModeDropdownVariants({ variant: "ghost" });
			expect(result.trigger()).toContain("hover:bg-accent");
		});
	});

	describe("size styles", () => {
		it("should apply sm size", () => {
			const result = darkModeDropdownVariants({ size: "sm" });
			expect(result.trigger()).toContain("h-8");
			expect(result.icon()).toContain("size-4");
		});

		it("should apply default size", () => {
			const result = darkModeDropdownVariants({ size: "default" });
			expect(result.trigger()).toContain("h-9");
			expect(result.icon()).toContain("size-5");
		});

		it("should apply lg size", () => {
			const result = darkModeDropdownVariants({ size: "lg" });
			expect(result.trigger()).toContain("h-10");
			expect(result.icon()).toContain("size-6");
		});
	});

	describe("animation styles", () => {
		it("should include animation classes for content", () => {
			const result = darkModeDropdownVariants();
			expect(result.content()).toContain("data-[state=open]:animate-in");
			expect(result.content()).toContain("data-[state=closed]:animate-out");
		});
	});
});
