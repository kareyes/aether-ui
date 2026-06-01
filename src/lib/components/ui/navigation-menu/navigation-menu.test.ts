import { describe, it, expect } from "bun:test";
import { navigationMenuVariants } from "./navigation-menu-variants.js";

describe("navigationMenuVariants", () => {
	describe("slot styles", () => {
		it("should return root styles", () => {
			const result = navigationMenuVariants();
			expect(result.root()).toContain("relative");
			expect(result.root()).toContain("z-10");
			expect(result.root()).toContain("flex");
		});

		it("should return list styles", () => {
			const result = navigationMenuVariants();
			expect(result.list()).toContain("flex");
			expect(result.list()).toContain("flex-1");
			expect(result.list()).toContain("list-none");
		});

		it("should return item styles", () => {
			const result = navigationMenuVariants();
			expect(result.item()).toContain("relative");
		});

		it("should return trigger styles", () => {
			const result = navigationMenuVariants();
			expect(result.trigger()).toContain("inline-flex");
			expect(result.trigger()).toContain("items-center");
			expect(result.trigger()).toContain("justify-center");
			expect(result.trigger()).toContain("rounded-md");
		});

		it("should return content styles", () => {
			const result = navigationMenuVariants();
			expect(result.content()).toContain("left-0");
			expect(result.content()).toContain("top-0");
			expect(result.content()).toContain("w-full");
		});

		it("should return link styles", () => {
			const result = navigationMenuVariants();
			expect(result.link()).toContain("flex");
			expect(result.link()).toContain("select-none");
			expect(result.link()).toContain("rounded-md");
		});

		it("should return viewport styles", () => {
			const result = navigationMenuVariants();
			expect(result.viewport()).toContain("bg-popover");
			expect(result.viewport()).toContain("rounded-md");
			expect(result.viewport()).toContain("border");
		});

		it("should return viewportWrapper styles", () => {
			const result = navigationMenuVariants();
			expect(result.viewportWrapper()).toContain("absolute");
			expect(result.viewportWrapper()).toContain("left-0");
		});

		it("should return indicator styles", () => {
			const result = navigationMenuVariants();
			expect(result.indicator()).toContain("top-full");
			expect(result.indicator()).toContain("z-[1]");
		});

		it("should return indicatorArrow styles", () => {
			const result = navigationMenuVariants();
			expect(result.indicatorArrow()).toContain("bg-border");
			expect(result.indicatorArrow()).toContain("rotate-45");
		});
	});

	describe("orientation styles", () => {
		it("should apply horizontal orientation to root", () => {
			const result = navigationMenuVariants({ orientation: "horizontal" });
			expect(result.root()).toContain("flex-row");
		});

		it("should apply horizontal orientation to list", () => {
			const result = navigationMenuVariants({ orientation: "horizontal" });
			expect(result.list()).toContain("flex-row");
		});

		it("should apply vertical orientation to root", () => {
			const result = navigationMenuVariants({ orientation: "vertical" });
			expect(result.root()).toContain("flex-col");
		});

		it("should apply vertical orientation to list", () => {
			const result = navigationMenuVariants({ orientation: "vertical" });
			expect(result.list()).toContain("flex-col");
			expect(result.list()).toContain("items-start");
		});
	});

	describe("trigger interaction styles", () => {
		it("should include hover styles", () => {
			const result = navigationMenuVariants();
			expect(result.trigger()).toContain("hover:bg-accent");
			expect(result.trigger()).toContain("hover:text-accent-foreground");
		});

		it("should include focus styles", () => {
			const result = navigationMenuVariants();
			expect(result.trigger()).toContain("focus:bg-accent");
			expect(result.trigger()).toContain("focus:outline-none");
		});

		it("should include disabled styles", () => {
			const result = navigationMenuVariants();
			expect(result.trigger()).toContain("disabled:pointer-events-none");
			expect(result.trigger()).toContain("disabled:opacity-50");
		});

		it("should include open state styles", () => {
			const result = navigationMenuVariants();
			expect(result.trigger()).toContain("data-[state=open]:bg-accent/50");
		});
	});

	describe("link interaction styles", () => {
		it("should include hover styles", () => {
			const result = navigationMenuVariants();
			expect(result.link()).toContain("hover:bg-accent");
			expect(result.link()).toContain("hover:text-accent-foreground");
		});

		it("should include focus styles", () => {
			const result = navigationMenuVariants();
			expect(result.link()).toContain("focus:bg-accent");
		});
	});

	describe("animation styles", () => {
		it("should include animation classes for content", () => {
			const result = navigationMenuVariants();
			expect(result.content()).toContain("data-[motion^=from-]:animate-in");
			expect(result.content()).toContain("data-[motion^=to-]:animate-out");
		});

		it("should include animation classes for viewport", () => {
			const result = navigationMenuVariants();
			expect(result.viewport()).toContain("data-[state=open]:animate-in");
			expect(result.viewport()).toContain("data-[state=closed]:animate-out");
		});

		it("should include animation classes for indicator", () => {
			const result = navigationMenuVariants();
			expect(result.indicator()).toContain("data-[state=visible]:animate-in");
			expect(result.indicator()).toContain("data-[state=hidden]:animate-out");
		});
	});

	describe("default variants", () => {
		it("should use horizontal orientation by default", () => {
			const result = navigationMenuVariants();
			expect(result.root()).toContain("flex-row");
			expect(result.list()).toContain("flex-row");
		});
	});
});
