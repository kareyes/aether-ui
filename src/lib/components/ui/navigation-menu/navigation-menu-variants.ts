import { tv, type VariantProps } from "tailwind-variants";

export const navigationMenuVariants = tv({
	slots: {
		root: ["relative z-10 flex max-w-max flex-1 items-center justify-center"],
		list: ["group flex flex-1 list-none items-center justify-center gap-1"],
		item: ["relative"],
		trigger: [
			"group inline-flex h-9 w-max items-center justify-center gap-1",
			"rounded-md bg-background px-4 py-2 text-sm font-medium",
			"transition-colors",
			"hover:bg-accent hover:text-accent-foreground",
			"focus:bg-accent focus:text-accent-foreground focus:outline-none",
			"disabled:pointer-events-none disabled:opacity-50",
			"data-[state=open]:bg-accent/50",
			"[&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0",
		],
		content: [
			"left-0 top-0 w-full md:absolute md:w-auto",
			"data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
			"data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
			"data-[motion=from-end]:slide-in-from-right-52",
			"data-[motion=from-start]:slide-in-from-left-52",
			"data-[motion=to-end]:slide-out-to-right-52",
			"data-[motion=to-start]:slide-out-to-left-52",
		],
		link: [
			"flex select-none flex-col gap-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
			"hover:bg-accent hover:text-accent-foreground",
			"focus:bg-accent focus:text-accent-foreground",
		],
		viewport: [
			"origin-top-center bg-popover text-popover-foreground",
			"relative mt-1.5 h-[var(--bits-navigation-menu-viewport-height)]",
			"w-full overflow-hidden rounded-md border shadow-lg",
			"data-[state=open]:animate-in data-[state=closed]:animate-out",
			"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
			"md:w-[var(--bits-navigation-menu-viewport-width)]",
		],
		viewportWrapper: ["absolute left-0 top-full flex justify-center"],
		indicator: [
			"top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
			"data-[state=visible]:animate-in data-[state=hidden]:animate-out",
			"data-[state=hidden]:fade-out data-[state=visible]:fade-in",
		],
		indicatorArrow: [
			"bg-border relative top-[60%] size-2 rotate-45 rounded-tl-sm shadow-md",
		],
	},
	variants: {
		orientation: {
			horizontal: {
				root: "flex-row",
				list: "flex-row",
			},
			vertical: {
				root: "flex-col",
				list: "flex-col items-start",
			},
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

export type NavigationMenuVariants = VariantProps<
	typeof navigationMenuVariants
>;
export type NavigationMenuOrientation = NonNullable<
	NavigationMenuVariants["orientation"]
>;
