<script lang="ts">
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} | Adarsh Krishnan</title>
	<meta name="description" content={data.post.summary} />
	<link rel="canonical" href={`https://adarshkrishnan.com/blog/${data.post.slug}/`} />
</svelte:head>

<section class="page-shell">
	<article class="terminal-card p-6 sm:p-8 md:p-10">
		<p class="terminal-command mb-4">$ cat {data.post.slug}.md</p>
		<h1 class="terminal-heading mb-3 text-3xl sm:text-4xl md:text-5xl">{data.post.title}</h1>
		<p class="font-mono text-sm text-gray-500">{formatDate(data.post.date)}</p>
		<div class="article-content mt-6">
			{@html data.post.html}
		</div>
	</article>
</section>
