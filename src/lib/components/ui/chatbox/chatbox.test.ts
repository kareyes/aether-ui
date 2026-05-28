import { describe, it, expect } from "vitest";
import { chatboxVariants, chatboxMessageVariants } from "./chatbox-variants.js";

describe("chatboxVariants", () => {
	describe("base styles", () => {
		it("should include rounded and border styles", () => {
			const result = chatboxVariants();
			expect(result.root()).toContain("rounded-lg");
			expect(result.root()).toContain("border-border");
		});

		it("should include flex column layout", () => {
			const result = chatboxVariants();
			expect(result.root()).toContain("flex");
			expect(result.root()).toContain("flex-col");
		});

		it("should make messages area scrollable", () => {
			const result = chatboxVariants();
			expect(result.messages()).toContain("overflow-y-auto");
		});
	});

	describe("variant styles", () => {
		it("should apply default variant with shadow", () => {
			const result = chatboxVariants({ variant: "default" });
			expect(result.root()).toContain("shadow-sm");
		});

		it("should apply ghost variant without border or shadow", () => {
			const result = chatboxVariants({ variant: "ghost" });
			expect(result.root()).toContain("border-transparent");
			expect(result.root()).toContain("shadow-none");
		});

		it("should apply elevated variant with larger shadow", () => {
			const result = chatboxVariants({ variant: "elevated" });
			expect(result.root()).toContain("shadow-lg");
		});
	});

	describe("size styles", () => {
		it("should apply smaller padding for sm size", () => {
			const result = chatboxVariants({ size: "sm" });
			expect(result.messages()).toContain("p-3");
			expect(result.inputArea()).toContain("p-2");
		});

		it("should apply larger padding for lg size", () => {
			const result = chatboxVariants({ size: "lg" });
			expect(result.messages()).toContain("p-5");
			expect(result.inputArea()).toContain("p-4");
		});
	});
});

describe("chatboxMessageVariants", () => {
	describe("user messages", () => {
		it("should reverse flex direction for user messages", () => {
			const result = chatboxMessageVariants({ role: "user" });
			expect(result.wrapper()).toContain("flex-row-reverse");
		});

		it("should use primary color for user bubble", () => {
			const result = chatboxMessageVariants({ role: "user" });
			expect(result.bubble()).toContain("bg-primary");
			expect(result.bubble()).toContain("text-primary-foreground");
		});

		it("should right-align meta text for user", () => {
			const result = chatboxMessageVariants({ role: "user" });
			expect(result.meta()).toContain("text-right");
		});
	});

	describe("assistant messages", () => {
		it("should use normal flex direction for assistant messages", () => {
			const result = chatboxMessageVariants({ role: "assistant" });
			expect(result.wrapper()).toContain("flex-row");
		});

		it("should use muted background for assistant bubble", () => {
			const result = chatboxMessageVariants({ role: "assistant" });
			expect(result.bubble()).toContain("bg-muted");
			expect(result.bubble()).toContain("text-foreground");
		});
	});

	describe("default variant", () => {
		it("should default to assistant role", () => {
			const result = chatboxMessageVariants();
			expect(result.bubble()).toContain("bg-muted");
		});
	});
});
