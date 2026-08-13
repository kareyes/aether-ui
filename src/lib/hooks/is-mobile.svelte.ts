import { DEFAULT_MOBILE_BREAKPOINT } from "$lib/constants.js";
import { MediaQuery } from "svelte/reactivity";

export class IsMobile extends MediaQuery {
	constructor(breakpoint: number = DEFAULT_MOBILE_BREAKPOINT) {
		super(`max-width: ${breakpoint - 1}px`);
	}
}
