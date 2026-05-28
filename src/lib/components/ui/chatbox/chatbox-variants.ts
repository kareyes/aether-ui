import { tv, type VariantProps } from "tailwind-variants";

export type ChatMessage = {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp?: Date | string;
	avatar?: string;
	name?: string;
};

export const chatboxVariants = tv({
	slots: {
		root: "flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm",
		messages: "flex flex-col gap-4 overflow-y-auto p-4",
		inputArea: "flex items-end gap-2 border-t border-border p-3",
	},
	variants: {
		variant: {
			default: {},
			ghost: {
				root: "border-transparent bg-transparent shadow-none",
			},
			elevated: {
				root: "border border-border shadow-lg",
			},
		},
		size: {
			sm: {
				messages: "gap-3 p-3 text-sm",
				inputArea: "gap-1.5 p-2",
			},
			default: {},
			lg: {
				messages: "gap-5 p-5",
				inputArea: "gap-3 p-4",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export const chatboxMessageVariants = tv({
	slots: {
		wrapper: "flex items-end gap-2",
		bubble: "break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
		meta: "mt-1 text-[11px] text-muted-foreground",
		nameLabel: "mb-1 text-xs font-medium text-muted-foreground",
	},
	variants: {
		role: {
			user: {
				wrapper: "flex-row-reverse",
				bubble: "rounded-br-sm bg-primary text-primary-foreground",
				meta: "text-right",
			},
			assistant: {
				wrapper: "flex-row",
				bubble: "rounded-bl-sm bg-muted text-foreground",
			},
		},
	},
	defaultVariants: {
		role: "assistant",
	},
});

export type ChatboxVariant = VariantProps<typeof chatboxVariants>["variant"];
export type ChatboxSize = VariantProps<typeof chatboxVariants>["size"];
export type ChatboxMessageRole = NonNullable<
	VariantProps<typeof chatboxMessageVariants>["role"]
>;
