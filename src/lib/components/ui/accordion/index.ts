import Root from "./accordion-root.svelte";
import Content from "./accordion-content.svelte";
import Item from "./accordion-item.svelte";
import Trigger from "./accordion-trigger.svelte";

export {
	accordionVariants,
	type AccordionVariant,
} from "./accordion-root.svelte";
export { accordionItemVariants } from "./accordion-item.svelte";
export { accordionTriggerVariants } from "./accordion-trigger.svelte";
export { accordionContentVariants } from "./accordion-content.svelte";

export {
	Root,
	Content,
	Item,
	Trigger,
	//
	Root as AccordionRoot,
	Content as AccordionContent,
	Item as AccordionItem,
	Trigger as AccordionTrigger,
};
