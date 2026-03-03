<script lang="ts">
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog | Adarsh Krishnan</title>
	<meta name="description" content="Notes and short explainers by Adarsh Krishnan." />
	<link rel="canonical" href="https://adarshkrishnan.com/blog/" />
</svelte:head>

<section class="panel p-5 md:p-6 fade-slide delay-1">
	<p class="kicker">Blog</p>
	<h1 class="section-title mb-2">Notes and short explainers</h1>
	<p class="max-w-3xl text-surface-800">
		Short practical posts on analytics, data tooling, and project execution.
	</p>
</section>

<section class="panel p-5 md:p-6 fade-slide delay-2">
	{#if data.posts.length === 0}
		<article class="card p-5 preset-tonal-surface">
			<h2 class="text-2xl font-bold">No posts published yet</h2>
			<p class="mt-3">Use <code>npm run blog:new -- --title "Your Post Title"</code> to scaffold one.</p>
		</article>
	{:else}
		<div class="grid gap-4 md:grid-cols-2">
			{#each data.posts as post}
				<article class="card p-4 preset-tonal-surface card-hover">
					<p class="kicker mb-2">{formatDate(post.date)}</p>
					<h2 class="text-2xl font-bold leading-tight">
						<a href={`/blog/${post.slug}/`}>{post.title}</a>
					</h2>
					<p class="mt-2 text-surface-800">{post.summary}</p>
					<a class="mt-3 inline-flex text-sm font-semibold" href={`/blog/${post.slug}/`}>Read post →</a>
				</article>
			{/each}
		</div>
	{/if}
</section>
