<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { CodeBlock } from "$lib/components/ui/code-block";
	import type { Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/CodeBlock",
		component: CodeBlock,
		tags: ["autodocs"],
	});

	const jsExample = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return name.toUpperCase();
}

greet("World");`;

	const tsExample = `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json());
}`;

	const svelteExample = `<script lang="ts">
  import { Button } from "@kareyes/aether";

  let count = $state(0);
<\/script>

<div class="flex items-center gap-4">
  <Button onclick={() => count++}>
    Count: {count}
  </Button>
</div>`;

	const cssExample = `.button {
  background-color: var(--primary);
  color: var(--primary-foreground);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: var(--primary-hover);
}`;

	const bashExample = `# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build`;

	const longExample = `import { useState, useEffect, useCallback, useMemo } from 'react';

interface DataItem {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UseDataOptions {
  initialPage?: number;
  pageSize?: number;
  sortBy?: keyof DataItem;
  sortOrder?: 'asc' | 'desc';
}

export function useData(options: UseDataOptions = {}) {
  const {
    initialPage = 1,
    pageSize = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;

  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        \`/api/data?page=\${page}&size=\${pageSize}&sort=\${sortBy}&order=\${sortOrder}\`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result.items);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortBy, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize]
  );

  return {
    data,
    loading,
    error,
    page,
    setPage,
    total,
    totalPages,
    refresh: fetchData,
  };
}`;
</script>

<Story name="Default">
	{#snippet template(args: Args)}
		<CodeBlock code={jsExample} {...args} />
	{/snippet}
</Story>

<Story name="With Language">
	{#snippet template(args: Args)}
		<CodeBlock code={jsExample} language="JavaScript" {...args} />
	{/snippet}
</Story>

<Story name="With Title">
	{#snippet template(args: Args)}
		<CodeBlock code={tsExample} title="user.ts" language="TypeScript" {...args} />
	{/snippet}
</Story>

<Story name="With Line Numbers">
	{#snippet template(args: Args)}
		<CodeBlock code={svelteExample} language="Svelte" showLineNumbers {...args} />
	{/snippet}
</Story>

<Story name="Collapsible">
	{#snippet template(args: Args)}
		<CodeBlock
			code={tsExample}
			title="Click to expand/collapse"
			language="TypeScript"
			collapsible
			{...args}
		/>
	{/snippet}
</Story>

<Story name="Initially Collapsed">
	{#snippet template(args: Args)}
		<CodeBlock
			code={tsExample}
			title="user-service.ts"
			language="TypeScript"
			collapsible
			collapsed={true}
			{...args}
		/>
	{/snippet}
</Story>

<Story name="With Max Height">
	{#snippet template(args: Args)}
		<CodeBlock
			code={longExample}
			title="useData.ts"
			language="TypeScript"
			maxHeight="300px"
			showLineNumbers
			{...args}
		/>
	{/snippet}
</Story>

<Story name="Dark Variant">
	{#snippet template(args: Args)}
		<CodeBlock
			code={jsExample}
			title="script.js"
			language="JavaScript"
			variant="dark"
			{...args}
		/>
	{/snippet}
</Story>

<Story name="Light Variant">
	{#snippet template(args: Args)}
		<CodeBlock
			code={cssExample}
			title="styles.css"
			language="CSS"
			variant="light"
			{...args}
		/>
	{/snippet}
</Story>

<Story name="Without Copy Button">
	{#snippet template(args: Args)}
		<CodeBlock code={bashExample} language="Bash" showCopyButton={false} {...args} />
	{/snippet}
</Story>

<Story name="Minimal">
	{#snippet template(args: Args)}
		<CodeBlock code="npm install @kareyes/aether" {...args} />
	{/snippet}
</Story>

<Story name="Full Featured">
	{#snippet template(args: Args)}
		<CodeBlock
			code={svelteExample}
			title="Counter.svelte"
			language="Svelte"
			showLineNumbers
			collapsible
			variant="dark"
			{...args}
		/>
	{/snippet}
</Story>
