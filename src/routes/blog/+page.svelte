<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog | Adarsh Krishnan</title>
	<meta name="description" content="Posts by Adarsh Krishnan." />
	<link rel="canonical" href="https://adarshkrishnan.com/blog/" />
</svelte:head>

<section class="panel p-5 md:p-6 fade-slide delay-1">
	<h1 class="section-title mb-4">Blog</h1>
	{#if data.posts.length === 0}
		<article class="card p-5 preset-tonal-surface">
			<h2 class="text-2xl font-bold">No posts published yet</h2>
			<p class="mt-3">Use <code>npm run blog:new -- --title "Your Post Title"</code> to scaffold one.</p>
		</article>
	{:else}
		<div class="grid gap-4 md:grid-cols-2">
			{#each data.posts as post}
				<PostCard {post} showSummary={false} />
			{/each}
		</div>
	{/if}
</section>
