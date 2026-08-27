import { describe, expect, it } from "bun:test";
import {
	resolveTimelineStatus,
	timelineVariants,
} from "./timeline-variants.js";

describe("timelineVariants", () => {
	describe("slot styles", () => {
		it("should return root styles", () => {
			const result = timelineVariants();
			expect(result.root()).toContain("flex");
			expect(result.root()).toContain("list-none");
		});

		it("should return item styles", () => {
			const result = timelineVariants();
			expect(result.item()).toContain("group/item");
			expect(result.item()).toContain("relative");
		});

		it("should return a hollow ring marker by default", () => {
			const result = timelineVariants();
			expect(result.marker()).toContain("rounded-full");
			expect(result.marker()).toContain("border-2");
			expect(result.marker()).toContain("bg-background");
			expect(result.marker()).toContain("size-5");
			// Minimalist: active fills the ring, no halo.
			expect(result.marker()).toContain("data-[state=active]:bg-primary");
			expect(result.marker()).not.toContain("ring-4");
			expect(result.marker()).toContain(
				"data-[state=error]:border-destructive",
			);
		});

		it("should keep titles a consistent weight (only errors recolor)", () => {
			const result = timelineVariants();
			expect(result.title()).toContain("font-medium");
			expect(result.title()).toContain("text-foreground");
			expect(result.title()).toContain("data-[state=error]:text-destructive");
			// State distinction lives in the marker, not the title.
			expect(result.title()).not.toContain("data-[state=active]:text-primary");
		});

		it("should return muted timestamp styles", () => {
			const result = timelineVariants();
			expect(result.timestamp()).toContain("text-muted-foreground");
			expect(result.timestamp()).toContain("tabular-nums");
		});

		it("should return description styles", () => {
			const result = timelineVariants();
			expect(result.description()).toContain("text-muted-foreground");
		});
	});

	describe("orientation styles", () => {
		it("should apply vertical orientation", () => {
			const result = timelineVariants({ orientation: "vertical" });
			expect(result.root()).toContain("flex-col");
			expect(result.item()).toContain("flex-row");
			expect(result.markerWrapper()).toContain("self-stretch");
			expect(result.markerWrapper()).toContain("items-center");
			expect(result.connector()).toContain("w-0.5");
			expect(result.connector()).toContain("flex-1");
		});

		it("should apply horizontal orientation", () => {
			const result = timelineVariants({ orientation: "horizontal" });
			expect(result.root()).toContain("flex-row");
			expect(result.item()).toContain("flex-col");
			expect(result.item()).toContain("flex-1");
			expect(result.markerWrapper()).toContain("w-full");
			expect(result.connector()).toContain("h-0.5");
		});
	});

	describe("marker variants", () => {
		it("should size ring markers uniformly whether or not they hold an icon", () => {
			// One size keeps every column the same width — straight line,
			// tight gap — regardless of which items carry an icon.
			const full = timelineVariants({ markerVariant: "ring" });
			const compact = timelineVariants({
				markerVariant: "ring",
				compact: true,
			});
			expect(full.marker()).toContain("size-5");
			expect(compact.marker()).toContain("size-4");
		});

		it("should render dot markers as small filled circles", () => {
			const result = timelineVariants({ markerVariant: "dot" });
			expect(result.marker()).toContain("size-3");
			expect(result.marker()).not.toContain("border-2");
			expect(result.marker()).toContain("data-[state=active]:bg-primary");
			expect(result.marker()).toContain(
				"data-[state=pending]:bg-muted-foreground/40",
			);
		});

		it("should leave plain markers unstyled for avatar content", () => {
			const result = timelineVariants({ markerVariant: "plain" });
			expect(result.marker()).not.toContain("border-2");
			expect(result.marker()).toContain("overflow-hidden");
		});
	});

	describe("marker spacing", () => {
		it("should hug the marker column instead of forcing a fixed width", () => {
			// A fixed column would leave small rings floating far from content;
			// the column shrinks to the marker so the gap stays tight and uniform.
			const result = timelineVariants({ markerVariant: "ring" });
			expect(result.markerWrapper()).toContain("shrink-0");
			expect(result.markerWrapper()).not.toMatch(/\bw-\d/);
		});

		it("should connect directly to the markers with no floating gap", () => {
			// flex-1 fills the span between markers; no axis margin means the
			// line meets each marker's edge instead of floating between them.
			const vertical = timelineVariants({
				orientation: "vertical",
			}).connector();
			const horizontal = timelineVariants({
				orientation: "horizontal",
			}).connector();
			expect(vertical).toContain("flex-1");
			expect(vertical).not.toContain("my-1.5");
			expect(horizontal).toContain("flex-1");
			expect(horizontal).not.toContain("mx-1.5");
		});
	});

	describe("line styles", () => {
		it("should draw a solid connector by default", () => {
			const result = timelineVariants({ lineStyle: "solid" });
			expect(result.connector()).toContain("bg-border");
			expect(result.connector()).toContain("data-[state=completed]:bg-primary");
			expect(result.connector()).not.toContain("border-dashed");
		});

		it("should draw a dashed connector when requested", () => {
			const result = timelineVariants({ lineStyle: "dashed" });
			expect(result.connector()).toContain("border-dashed");
			expect(result.connector()).toContain("border-l-2");
			expect(result.connector()).toContain(
				"data-[state=completed]:border-primary",
			);
		});

		it("should always hide the connector on the last item", () => {
			const result = timelineVariants();
			expect(result.connector()).toContain("group-last/item:hidden");
		});
	});

	describe("compact styles", () => {
		it("should use a full-size ring marker by default", () => {
			const result = timelineVariants({ compact: false });
			expect(result.marker()).toContain("size-5");
			expect(result.description()).toContain("text-sm");
		});

		it("should shrink the marker and text when compact", () => {
			const result = timelineVariants({ compact: true });
			expect(result.marker()).toContain("size-4");
			expect(result.description()).toContain("text-xs");
			expect(result.timeGutter()).toContain("w-14");
		});
	});

	describe("clickable styles", () => {
		it("should apply pointer and focus styles when true", () => {
			const result = timelineVariants({ clickable: true });
			expect(result.marker()).toContain("cursor-pointer");
			expect(result.marker()).toContain("focus-visible:outline-2");
		});

		it("should not apply pointer styles when false", () => {
			const result = timelineVariants({ clickable: false });
			expect(result.marker()).not.toContain("cursor-pointer");
		});
	});

	describe("compound variants", () => {
		it("should space vertical items via content padding", () => {
			const result = timelineVariants({
				orientation: "vertical",
				compact: false,
			});
			expect(result.content()).toContain("pb-8");
			expect(result.content()).toContain("group-last/item:pb-0");
		});

		it("should tighten vertical spacing when compact", () => {
			const result = timelineVariants({
				orientation: "vertical",
				compact: true,
			});
			expect(result.content()).toContain("pb-5");
		});

		it("should pad horizontal content on the inline end", () => {
			const result = timelineVariants({
				orientation: "horizontal",
				compact: false,
			});
			expect(result.content()).toContain("pe-6");
			expect(result.content()).toContain("group-last/item:pe-0");
		});
	});

	describe("default variants", () => {
		it("should be a vertical solid ring timeline by default", () => {
			const result = timelineVariants();
			expect(result.root()).toContain("flex-col");
			expect(result.marker()).toContain("size-5");
			expect(result.marker()).toContain("border-2");
			expect(result.connector()).not.toContain("border-dashed");
			expect(result.marker()).not.toContain("cursor-pointer");
		});
	});
});

describe("resolveTimelineStatus", () => {
	it("should return explicit status when provided", () => {
		expect(resolveTimelineStatus(0, 2, "error")).toBe("error");
		expect(resolveTimelineStatus(5, -1, "pending")).toBe("pending");
	});

	it("should return completed for every item without an active index", () => {
		expect(resolveTimelineStatus(0, -1)).toBe("completed");
		expect(resolveTimelineStatus(3, -1)).toBe("completed");
	});

	it("should return completed before the active index", () => {
		expect(resolveTimelineStatus(0, 2)).toBe("completed");
		expect(resolveTimelineStatus(1, 2)).toBe("completed");
	});

	it("should return active at the active index", () => {
		expect(resolveTimelineStatus(2, 2)).toBe("active");
		expect(resolveTimelineStatus(0, 0)).toBe("active");
	});

	it("should return pending after the active index", () => {
		expect(resolveTimelineStatus(3, 2)).toBe("pending");
		expect(resolveTimelineStatus(1, 0)).toBe("pending");
	});
});
