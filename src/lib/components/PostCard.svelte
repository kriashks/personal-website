<script lang="ts">
	import type { BlogPostPreview } from '$lib/types';
	import { formatDate } from '$lib/utils/date';

	type Props = {
		post: BlogPostPreview;
		showSummary?: boolean;
	};

	let { post, showSummary = true }: Props = $props();
</script>

<article class="card p-4 preset-tonal-surface card-hover">
	<p class="kicker mb-2">{formatDate(post.date)}</p>
	<h2 class="text-2xl font-bold leading-tight">
		<a href={`/blog/${post.slug}/`}>{post.title}</a>
	</h2>
	{#if showSummary}
		<p class="mt-2 text-surface-800">{post.summary}</p>
	{/if}
	<a class="mt-3 inline-flex text-sm font-semibold" href={`/blog/${post.slug}/`}>Read post →</a>
</article>
