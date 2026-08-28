import { describe, expect, it } from "bun:test";
import {
	TOAST_SURFACE_TYPES,
	buildToastClasses,
	toastFrameClasses,
	toastSizeClasses,
	toastSurfaceClasses,
	toastTypeClass,
	toasterVariants,
	type ToastSurfaceType,
	type ToasterSize,
	type ToasterStyle,
} from "./sonner-variants.js";

const VARIANTS = Object.keys(
	toasterVariants.variants.variant,
) as ToasterStyle[];
const SIZES = Object.keys(toasterVariants.variants.size) as ToasterSize[];

/**
 * The role tokens these maps are allowed to name. Deliberately a closed list: a
 * typo, or a raw Tailwind palette hue where a role token belongs, then fails to
 * classify as either colour or geometry and the coverage tests below catch it.
 * (No literal hue name appears here — `styles/vocabulary.test.ts` sweeps this
 * directory for exactly that and would flag the example.)
 */
const ROLE = [
	"transparent",
	"background",
	"foreground",
	"border",
	"card",
	"card-foreground",
	"primary",
	"primary-foreground",
	"muted",
	"muted-foreground",
	"success",
	"success-foreground",
	"destructive",
	"destructive-foreground",
	"warning",
	"warning-foreground",
	"info",
	"info-foreground",
].join("|");

/** Utilities that set a colour — the half `toastSurfaceClasses` owns. */
const COLOUR = new RegExp(
	`^(?:bg|text|border(?:-[lrtbxy])?)-(?:${ROLE})(?:/\\d+)?$`,
);
/** Utilities that set geometry — the half `toastFrameClasses` owns. */
const GEOMETRY =
	/^(?:rounded(?:-\w+)?|shadow(?:-\w+)?|border|border-[lrtbxy]-\d+)$/;

const classesOf = (value: string): string[] =>
	value.split(/\s+/).filter(Boolean);

/** Strips a `dark:` / `hover:` style prefix so the utility can be classified. */
const bare = (token: string): string => token.split(":").at(-1) ?? token;

describe("toasterVariants", () => {
	it("declares the four visual styles and three sizes", () => {
		expect(VARIANTS).toEqual(["default", "bordered", "filled", "minimal"]);
		expect(SIZES).toEqual(["sm", "default", "lg"]);
	});

	it("defaults to a bottom-right, richColors toaster", () => {
		expect(toasterVariants.defaultVariants).toMatchObject({
			position: "bottom-right",
			variant: "default",
			size: "default",
			richColors: true,
		});
	});
});

describe("toastSizeClasses", () => {
	it("covers every size", () => {
		for (const size of SIZES) expect(toastSizeClasses[size]).toBeDefined();
	});

	it("matches alert's `px-4 py-3 text-sm` on the default row", () => {
		expect(classesOf(toastSizeClasses.default.toast)).toEqual(
			expect.arrayContaining(["px-4", "py-3", "text-sm"]),
		);
	});

	it("scales padding and icon box monotonically", () => {
		expect(toastSizeClasses.sm.toast).toContain("px-3");
		expect(toastSizeClasses.lg.toast).toContain("px-5");
		expect(toastSizeClasses.sm.icon).toBe("size-3.5");
		expect(toastSizeClasses.default.icon).toBe("size-4");
		expect(toastSizeClasses.lg.icon).toBe("size-5");
	});
});

describe("toastSurfaceClasses", () => {
	it("covers every visual style × type pair", () => {
		for (const variant of VARIANTS)
			for (const type of TOAST_SURFACE_TYPES)
				expect(toastSurfaceClasses[variant][type]).toBeTruthy();
	});

	it("includes `default`, because a bare toast() dispatches as that type", () => {
		expect(TOAST_SURFACE_TYPES).toContain("default");
		for (const variant of VARIANTS)
			expect(toastSurfaceClasses[variant].default).toBeTruthy();
	});

	it("mirrors alertVariants on the default style", () => {
		expect(toastSurfaceClasses.default.success).toBe(
			"bg-success/10 text-success border-success dark:border-success/80",
		);
		expect(toastSurfaceClasses.default.error).toBe(
			"bg-destructive/10 text-destructive border-destructive/30 dark:border-destructive/80",
		);
	});

	it("pairs every filled surface with its own -foreground token", () => {
		// A filled toast supplies both halves of the pair, so neither can be
		// left to inherit — that is how you get `-foreground` on the card ground.
		for (const type of TOAST_SURFACE_TYPES) {
			const tokens = classesOf(toastSurfaceClasses.filled[type]);
			expect(tokens.some((t) => t.startsWith("bg-"))).toBe(true);
			expect(tokens.some((t) => t.startsWith("text-"))).toBe(true);
		}
	});

	it("carries only colour, never geometry", () => {
		// Geometry and colour must stay in disjoint property groups: sonner puts
		// `classes.toast` and `classes[type]` on the same element and joins them
		// with a bare `join(' ')`, so anything both set is settled by Tailwind's
		// emission order rather than by this file. Asserted positively, so an
		// unrecognised utility fails rather than slipping through.
		for (const variant of VARIANTS)
			for (const type of TOAST_SURFACE_TYPES)
				for (const token of classesOf(toastSurfaceClasses[variant][type])) {
					expect(bare(token)).toMatch(COLOUR);
					expect(bare(token)).not.toMatch(GEOMETRY);
				}
	});

	it("uses role tokens rather than palette hues", () => {
		for (const variant of VARIANTS)
			for (const type of TOAST_SURFACE_TYPES)
				expect(toastSurfaceClasses[variant][type]).not.toMatch(
					/-(red|green|blue|yellow|orange|amber|emerald|rose)-\d/,
				);
	});
});

describe("toastFrameClasses", () => {
	it("covers every visual style", () => {
		for (const variant of VARIANTS)
			expect(toastFrameClasses[variant]).toBeTruthy();
	});

	it("carries only geometry, never colour", () => {
		for (const variant of VARIANTS)
			for (const token of classesOf(toastFrameClasses[variant])) {
				expect(bare(token)).toMatch(GEOMETRY);
				expect(bare(token)).not.toMatch(COLOUR);
			}
	});

	it("gives bordered its accent edge and minimal square corners", () => {
		expect(toastFrameClasses.bordered).toContain("border-l-4");
		expect(toastFrameClasses.minimal).toContain("rounded-none");
		expect(toastFrameClasses.minimal).toContain("shadow-none");
	});
});

describe("toastTypeClass", () => {
	it("returns the type's own surface when richColors is on", () => {
		expect(toastTypeClass("default", "success", true)).toBe(
			toastSurfaceClasses.default.success,
		);
	});

	it("collapses every type onto the neutral surface when richColors is off", () => {
		for (const variant of VARIANTS)
			for (const type of TOAST_SURFACE_TYPES)
				expect(toastTypeClass(variant, type, false)).toBe(
					toastSurfaceClasses[variant].default,
				);
	});

	it("still distinguishes types when richColors is on", () => {
		const surfaces = new Set(
			TOAST_SURFACE_TYPES.map((type) => toastTypeClass("default", type, true)),
		);
		expect(surfaces.size).toBe(TOAST_SURFACE_TYPES.length);
	});
});

describe("buildToastClasses", () => {
	const build = (
		overrides: Partial<{
			variant: ToasterStyle;
			size: ToasterSize;
			richColors: boolean;
		}> = {},
	) =>
		buildToastClasses({
			variant: "default",
			size: "default",
			richColors: true,
			...overrides,
		});

	it("emits every slot sonner reads", () => {
		const classes = build();
		for (const slot of [
			"toast",
			"title",
			"description",
			"icon",
			"content",
			"loader",
			"actionButton",
			"cancelButton",
			"closeButton",
			...TOAST_SURFACE_TYPES,
		] as const)
			expect(classes[slot]).toBeTruthy();
	});

	it("uses no `!important`, because nothing is competing", () => {
		for (const value of Object.values(build()))
			expect(value).not.toContain("!");
	});

	it("builds the toast row as a flex container, since the row is the toast", () => {
		const { toast } = build();
		expect(classesOf(toast)).toEqual(
			expect.arrayContaining(["flex", "items-center", "w-full"]),
		);
	});

	it("omits `relative` and `transition-all` from the row", () => {
		// Sonner's own ungated `[data-sonner-toast]` rule sets `position:
		// absolute` and a transition, and it is unlayered — both utilities would
		// be dead weight that reads as intentional.
		const tokens = classesOf(build().toast);
		expect(tokens).not.toContain("relative");
		expect(tokens).not.toContain("transition-all");
	});

	it("keeps `relative` on the icon box, where the spinner needs it", () => {
		// Sonner's loading spinner is absolutely positioned with `inset: 0`.
		expect(classesOf(build().icon)).toContain("relative");
	});

	it("resolves rounded-lg against minimal's rounded-none", () => {
		const tokens = classesOf(build({ variant: "minimal" }).toast);
		expect(tokens).toContain("rounded-none");
		expect(tokens).not.toContain("rounded-lg");
	});

	it("keeps the row's geometry disjoint from every type's colour", () => {
		// The pair lands on one element joined by sonner without tailwind-merge.
		for (const variant of VARIANTS) {
			const classes = buildToastClasses({
				variant,
				size: "default",
				richColors: true,
			});
			const rowColours = classesOf(classes.toast)
				.map(bare)
				.filter((t) => COLOUR.test(t));
			expect(rowColours).toEqual([]);
		}
	});

	it("threads the size through the row, title, buttons and icon", () => {
		const lg = build({ size: "lg" });
		expect(lg.toast).toContain("px-5");
		expect(lg.title).toContain("text-base");
		expect(lg.actionButton).toContain("px-4");
		expect(lg.cancelButton).toContain("px-4");
		expect(lg.icon).toContain("size-5");
	});

	it("dims the description rather than re-colouring it", () => {
		const { description } = build();
		expect(description).toContain("opacity-90");
		expect(description).not.toContain("text-muted-foreground");
	});

	it("positions the close button off the direction-aware custom properties", () => {
		const { closeButton } = build();
		expect(closeButton).toContain("left-(--toast-close-button-start)");
		expect(closeButton).toContain("right-(--toast-close-button-end)");
		expect(closeButton).toContain(
			"[transform:var(--toast-close-button-transform)]",
		);
	});

	it("collapses type surfaces when richColors is off", () => {
		const off = build({ richColors: false });
		expect(off.success).toBe(off.error);
		expect(off.success).toBe(off.default);
	});

	it("keeps type surfaces distinct when richColors is on", () => {
		const on = build({ richColors: true });
		expect(on.success).not.toBe(on.error);
	});

	it("is pure — same options, same strings", () => {
		expect(build({ variant: "filled", size: "sm" })).toEqual(
			build({ variant: "filled", size: "sm" }),
		);
	});

	it("covers every variant × size × richColors combination without gaps", () => {
		for (const variant of VARIANTS)
			for (const size of SIZES)
				for (const richColors of [true, false]) {
					const classes = buildToastClasses({ variant, size, richColors });
					for (const value of Object.values(classes)) {
						expect(value).toBeTruthy();
						expect(value).not.toContain("undefined");
					}
				}
	});
});

describe("surface type coverage", () => {
	it("matches the types svelte-sonner dispatches", () => {
		// `toast.promise` resolves into loading/success/error, so it needs no
		// surface of its own.
		const dispatched: ToastSurfaceType[] = [
			"default",
			"success",
			"error",
			"warning",
			"info",
			"loading",
		];
		expect([...TOAST_SURFACE_TYPES]).toEqual(dispatched);
	});
});
