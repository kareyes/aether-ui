<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { DarkModeToggle } from "$lib";
	import { ModeWatcher } from "mode-watcher";
	import DarkModeSwitch from "$lib/components/ui/dark-mode/dark-mode-switch.svelte";
	import DarkModeDropdown from "$lib/components/ui/dark-mode/dark-mode-dropdown.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<ModeWatcher />
<div class="relative min-h-screen">
	<DarkModeToggle
		class="fixed top-4 right-4 z-50"
		animation="scale"
		showTooltip={true}
	/>
	<!-- <DarkModeSwitch class="fixed top-16 right-4 z-50" />

	<DarkModeDropdown class="fixed top-28 right-4 z-50" /> -->
	{@render children?.()}
</div>
