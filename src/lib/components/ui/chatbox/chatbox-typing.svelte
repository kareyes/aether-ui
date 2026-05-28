<script lang="ts">
	import { cn } from "$lib/utils.js";

	let { class: className }: { class?: string } = $props();
</script>

<div data-slot="chatbox-typing" class={cn("flex items-end gap-2", className)}>
	<div class="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
		<span
			class="size-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]"
		></span>
		<span
			class="size-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]"
		></span>
		<span class="size-1.5 animate-bounce rounded-full bg-muted-foreground/50"></span>
	</div>
</div>
