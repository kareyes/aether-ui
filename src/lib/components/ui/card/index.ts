import Root from "./card-root.svelte";
import Content from "./card-content.svelte";
import Description from "./card-description.svelte";
import Footer from "./card-footer.svelte";
import Header from "./card-header.svelte";
import Title from "./card-title.svelte";
import Action from "./card-action.svelte";
import Card from "./card.svelte";

export {
	Root,
	Content,
	Description,
	Footer,
	Header,
	Title,
	Action,
	Card,
	//
	Root as CardRoot,
	Content as CardContent,
	Description as CardDescription,
	Footer as CardFooter,
	Header as CardHeader,
	Title as CardTitle,
	Action as CardAction,
};

export type { CardVariant, CardPadding } from "./card-variants.js";
