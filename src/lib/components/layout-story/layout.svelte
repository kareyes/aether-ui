<script lang="ts">
  import type { Snippet } from 'svelte';

  type LayoutProps = {
    children: Snippet;
  };

  let { children}: LayoutProps = $props();
</script>

<div class="layout">
  <main
    
  >
    {@render children()}
  </main>

</div>

