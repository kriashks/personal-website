<script lang="ts">
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} | Adarsh Krishnan</title>
	<meta name="description" content={data.post.summary} />
	<link rel="canonical" href={`https://adarshkrishnan.com/blog/${data.post.slug}/`} />
</svelte:head>

<article class="panel p-5 md:p-7 fade-slide delay-1 blog-article">
	<p class="kicker">Blog</p>
	<h1 class="section-title mb-2">{data.post.title}</h1>
	<p class="text-sm text-surface-700">{formatDate(data.post.date)}</p>
	<div class="mt-4 text-surface-900">
		{@html data.post.html}
	</div>
</article>
