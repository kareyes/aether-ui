<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const codeBlockVariants = tv({
		base: "relative rounded-lg border bg-muted/50 text-sm",
		variants: {
			variant: {
				default: "bg-muted/50 border-border",
				dark: "bg-zinc-950 border-zinc-800 text-zinc-100",
				light: "bg-zinc-50 border-zinc-200 text-zinc-900",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type CodeBlockVariant = VariantProps<
		typeof codeBlockVariants
	>["variant"];

	// Color schemes for different variants
	const colorSchemes = {
		default: {
			keyword: "text-purple-600 dark:text-purple-400",
			string: "text-green-600 dark:text-green-400",
			comment: "text-zinc-500 dark:text-zinc-500 italic",
			number: "text-orange-600 dark:text-orange-400",
			function: "text-blue-600 dark:text-blue-400",
			operator: "text-pink-600 dark:text-pink-400",
			tag: "text-red-600 dark:text-red-400",
			attribute: "text-yellow-600 dark:text-yellow-500",
			punctuation: "text-zinc-600 dark:text-zinc-400",
		},
		dark: {
			keyword: "text-purple-400",
			string: "text-green-400",
			comment: "text-zinc-500 italic",
			number: "text-orange-400",
			function: "text-blue-400",
			operator: "text-pink-400",
			tag: "text-red-400",
			attribute: "text-yellow-400",
			punctuation: "text-zinc-400",
		},
		light: {
			keyword: "text-purple-700",
			string: "text-green-700",
			comment: "text-zinc-500 italic",
			number: "text-orange-700",
			function: "text-blue-700",
			operator: "text-pink-700",
			tag: "text-red-700",
			attribute: "text-yellow-700",
			punctuation: "text-zinc-600",
		},
	};

	// Token types for syntax highlighting
	type TokenType =
		| "keyword"
		| "string"
		| "comment"
		| "number"
		| "function"
		| "tag"
		| "attribute"
		| "punctuation"
		| "text";

	interface Token {
		type: TokenType;
		value: string;
	}

	const jsKeywords = new Set([
		"const",
		"let",
		"var",
		"function",
		"return",
		"if",
		"else",
		"for",
		"while",
		"do",
		"switch",
		"case",
		"break",
		"continue",
		"try",
		"catch",
		"finally",
		"throw",
		"new",
		"delete",
		"typeof",
		"instanceof",
		"in",
		"of",
		"class",
		"extends",
		"super",
		"import",
		"export",
		"default",
		"from",
		"as",
		"async",
		"await",
		"yield",
		"static",
		"get",
		"set",
		"null",
		"undefined",
		"true",
		"false",
		"this",
		"void",
		"interface",
		"type",
		"enum",
		"implements",
		"private",
		"public",
		"protected",
		"readonly",
		"abstract",
		"declare",
	]);

	const cssKeywords = new Set([
		"@import",
		"@media",
		"@keyframes",
		"@font-face",
		"@supports",
		"@charset",
		"!important",
		"inherit",
		"initial",
		"unset",
		"none",
		"auto",
	]);

	function tokenize(code: string, language: string | undefined): Token[] {
		const tokens: Token[] = [];
		const lang = language?.toLowerCase() || "";
		let i = 0;

		while (i < code.length) {
			// Single-line comments
			if (code.slice(i, i + 2) === "//") {
				const end = code.indexOf("\n", i);
				const value = end === -1 ? code.slice(i) : code.slice(i, end);
				tokens.push({ type: "comment", value });
				i += value.length;
				continue;
			}

			// Multi-line comments
			if (code.slice(i, i + 2) === "/*") {
				const end = code.indexOf("*/", i + 2);
				const value =
					end === -1 ? code.slice(i) : code.slice(i, end + 2);
				tokens.push({ type: "comment", value });
				i += value.length;
				continue;
			}

			// Shell/bash comments
			if (
				(lang === "bash" || lang === "sh" || lang === "shell") &&
				code[i] === "#"
			) {
				const end = code.indexOf("\n", i);
				const value = end === -1 ? code.slice(i) : code.slice(i, end);
				tokens.push({ type: "comment", value });
				i += value.length;
				continue;
			}

			// CSS comments
			if (lang === "css" && code.slice(i, i + 2) === "/*") {
				const end = code.indexOf("*/", i + 2);
				const value =
					end === -1 ? code.slice(i) : code.slice(i, end + 2);
				tokens.push({ type: "comment", value });
				i += value.length;
				continue;
			}

			// Double-quoted strings
			if (code[i] === '"') {
				let j = i + 1;
				while (
					j < code.length &&
					(code[j] !== '"' || code[j - 1] === "\\")
				) {
					j++;
				}
				const value = code.slice(i, j + 1);
				tokens.push({ type: "string", value });
				i = j + 1;
				continue;
			}

			// Single-quoted strings
			if (code[i] === "'") {
				let j = i + 1;
				while (
					j < code.length &&
					(code[j] !== "'" || code[j - 1] === "\\")
				) {
					j++;
				}
				const value = code.slice(i, j + 1);
				tokens.push({ type: "string", value });
				i = j + 1;
				continue;
			}

			// Template literals
			if (code[i] === "`") {
				let j = i + 1;
				while (
					j < code.length &&
					(code[j] !== "`" || code[j - 1] === "\\")
				) {
					j++;
				}
				const value = code.slice(i, j + 1);
				tokens.push({ type: "string", value });
				i = j + 1;
				continue;
			}

			// HTML/JSX tags
			if (
				["html", "svelte", "vue", "jsx", "tsx"].includes(lang) &&
				code[i] === "<"
			) {
				// Check if it's a tag
				const match = code.slice(i).match(/^<\/?[\w-]+/);
				if (match) {
					tokens.push({ type: "punctuation", value: code[i] });
					i++;
					// Check for closing slash
					if (code[i] === "/") {
						tokens.push({ type: "punctuation", value: "/" });
						i++;
					}
					// Get tag name
					const tagMatch = code.slice(i).match(/^[\w-]+/);
					if (tagMatch) {
						tokens.push({ type: "tag", value: tagMatch[0] });
						i += tagMatch[0].length;
					}
					continue;
				}
			}

			// Numbers
			if (/\d/.test(code[i])) {
				let j = i;
				while (j < code.length && /[\d.eE+-]/.test(code[j])) {
					j++;
				}
				const value = code.slice(i, j);
				if (/^\d+\.?\d*([eE][+-]?\d+)?$/.test(value)) {
					tokens.push({ type: "number", value });
					i = j;
					continue;
				}
			}

			// Words (keywords, identifiers, function calls)
			if (/[a-zA-Z_$@]/.test(code[i])) {
				let j = i;
				while (j < code.length && /[\w$@-]/.test(code[j])) {
					j++;
				}
				const value = code.slice(i, j);

				// Check if it's a function call (followed by parenthesis)
				let k = j;
				while (k < code.length && /\s/.test(code[k])) k++;
				const isFunction = code[k] === "(";

				if (
					[
						"js",
						"javascript",
						"ts",
						"typescript",
						"jsx",
						"tsx",
						"svelte",
					].includes(lang) &&
					jsKeywords.has(value)
				) {
					tokens.push({ type: "keyword", value });
				} else if (lang === "css" && cssKeywords.has(value)) {
					tokens.push({ type: "keyword", value });
				} else if (isFunction) {
					tokens.push({ type: "function", value });
				} else {
					tokens.push({ type: "text", value });
				}
				i = j;
				continue;
			}

			// Default: single character
			tokens.push({ type: "text", value: code[i] });
			i++;
		}

		return tokens;
	}

	function escapeHtml(text: string): string {
		return text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
	}

	export function highlightCode(
		code: string,
		language: string | undefined,
		variant: CodeBlockVariant,
	): string {
		const scheme = colorSchemes[variant || "default"];
		const tokens = tokenize(code, language);

		return tokens
			.map((token) => {
				const escaped = escapeHtml(token.value);
				const colorClass = scheme[token.type as keyof typeof scheme];

				if (colorClass && token.type !== "text") {
					return `<span class="${colorClass}">${escaped}</span>`;
				}
				return escaped;
			})
			.join("");
	}
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import { Button } from "$lib/components/ui/button/index.js";

	type Props = {
		/**
		 * The code to display
		 */
		code: string;
		/**
		 * Programming language for display label and syntax highlighting
		 */
		language?: string;
		/**
		 * Title/filename to display in the header
		 */
		title?: string;
		/**
		 * Show line numbers
		 */
		showLineNumbers?: boolean;
		/**
		 * Allow collapsing the code block
		 */
		collapsible?: boolean;
		/**
		 * Initial collapsed state (only if collapsible is true)
		 */
		collapsed?: boolean;
		/**
		 * Show copy button
		 */
		showCopyButton?: boolean;
		/**
		 * Maximum height before scrolling (e.g., "300px", "20rem")
		 */
		maxHeight?: string;
		/**
		 * Variant style
		 */
		variant?: CodeBlockVariant;
		/**
		 * Enable syntax highlighting
		 */
		highlight?: boolean;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	};

	let {
		code,
		language,
		title,
		showLineNumbers = false,
		collapsible = false,
		collapsed = $bindable(false),
		showCopyButton = true,
		maxHeight,
		variant = "default",
		highlight = true,
		class: className,
	}: Props = $props();

	let copied = $state(false);

	const lines = $derived(code.split("\n"));
	const hasHeader = $derived(!!title || !!language || collapsible);
	const highlightedCode = $derived(
		highlight ? highlightCode(code, language, variant) : escapeHtml(code),
	);
	const highlightedLines = $derived(
		highlight
			? lines.map((line) => highlightCode(line, language, variant))
			: lines.map((line) => escapeHtml(line)),
	);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	}

	function toggleCollapsed() {
		if (collapsible) {
			collapsed = !collapsed;
		}
	}
</script>

<div class={cn(codeBlockVariants({ variant }), className)}>
	{#if hasHeader}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class={cn(
				"flex items-center justify-between gap-2 border-b px-4 py-2",
				variant === "dark" && "border-zinc-800",
				variant === "light" && "border-zinc-200",
				collapsible && "cursor-pointer select-none hover:bg-accent/50",
			)}
			onclick={collapsible ? toggleCollapsed : undefined}
			onkeydown={collapsible
				? (e) => e.key === "Enter" && toggleCollapsed()
				: undefined}
			role={collapsible ? "button" : undefined}
			tabindex={collapsible ? 0 : undefined}
		>
			<div class="flex items-center gap-2">
				{#if collapsible}
					{#if collapsed}
						<ChevronRightIcon
							class="size-4 text-muted-foreground"
						/>
					{:else}
						<ChevronDownIcon class="size-4 text-muted-foreground" />
					{/if}
				{/if}
				{#if title}
					<span class="font-medium">{title}</span>
				{/if}
				{#if language}
					<span
						class={cn(
							"rounded px-2 py-0.5 text-xs font-medium",
							variant === "dark"
								? "bg-zinc-800 text-zinc-400"
								: "bg-muted text-muted-foreground",
						)}
					>
						{language}
					</span>
				{/if}
			</div>
			{#if showCopyButton && !collapsed}
				<Button
					variant="ghost"
					size="icon-sm"
					class="size-7"
					onclick={(e) => {
						e.stopPropagation();
						copyToClipboard();
					}}
					aria-label={copied ? "Copied!" : "Copy code"}
				>
					{#if copied}
						<CheckIcon class="size-4 text-green-500" />
					{:else}
						<CopyIcon class="size-4" />
					{/if}
				</Button>
			{/if}
		</div>
	{/if}

	{#if !collapsed}
		<div
			class={cn("relative", !hasHeader && showCopyButton && "group")}
			style={maxHeight
				? `max-height: ${maxHeight}; overflow: auto;`
				: undefined}
		>
			{#if !hasHeader && showCopyButton}
				<Button
					variant="ghost"
					size="icon-sm"
					class="absolute right-2 top-2 size-7 opacity-0 transition-opacity group-hover:opacity-100"
					onclick={copyToClipboard}
					aria-label={copied ? "Copied!" : "Copy code"}
				>
					{#if copied}
						<CheckIcon class="size-4 text-green-500" />
					{:else}
						<CopyIcon class="size-4" />
					{/if}
				</Button>
			{/if}
			<pre
				class={cn(
					"overflow-x-auto p-4",
					showLineNumbers && "pl-0",
				)}><code class="font-mono text-sm"
					>{#if showLineNumbers}{#each highlightedLines as line, i}<span
								class="inline-block w-10 select-none pr-4 text-right text-muted-foreground"
								>{i + 1}</span
							>{@html line}{i < highlightedLines.length - 1
								? "\n"
								: ""}{/each}{:else}{@html highlightedCode}{/if}</code
				></pre>
		</div>
	{/if}
</div>
