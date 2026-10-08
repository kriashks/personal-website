<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	type CodeValue = { code?: string; language?: string; filename?: string };
	let { portableText }: { portableText: CustomBlockComponentProps<CodeValue> } = $props();
	const value = $derived(portableText.value);
</script>

<div class="code-block">
	{#if value.filename}
		<div class="filename">{value.filename}</div>
	{/if}
	<pre><code class={value.language ? `language-${value.language}` : undefined}>{value.code ?? ''}</code></pre>
</div>
