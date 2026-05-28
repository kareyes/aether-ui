import Root from "./tabs.svelte";
import Content from "./tabs-content.svelte";
import List from "./tabs-list.svelte";
import Trigger from "./tabs-trigger.svelte";

export {
	Root,
	Content,
	List,
	Trigger,
	//
	Root as Tabs,
	Content as TabsContent,
	List as TabsList,
	Trigger as TabsTrigger,
};

export type {
	TabsListVariant,
	TabsListSize,
} from "./tabs-list.svelte";

export type {
	TabsTriggerVariant,
	TabsTriggerSize,
} from "./tabs-trigger.svelte";

export type {
	TabsContentAnimation,
	TabsContentPadding,
} from "./tabs-content.svelte";

export type { TabItem } from "./tabs.svelte";
