<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Adarsh Krishnan</title>
	<meta
		name="description"
		content="Adarsh Krishnan's work on analytics, experimentation, and practical data systems."
	/>
	<link rel="canonical" href="https://adarshkrishnan.com/" />
</svelte:head>

<section class="panel p-5 md:p-6 fade-slide delay-1">
	<h2 class="section-title mb-4">Latest Posts</h2>
	<div class="grid gap-4 md:grid-cols-2">
		{#if data.latestPosts.length === 0}
			<article class="card p-4 preset-tonal-surface">
				<h3 class="text-xl font-bold">No posts yet</h3>
				<p class="mt-2">Use <code>npm run blog:new -- --title "My New Post"</code> to publish your first article.</p>
			</article>
		{:else}
			{#each data.latestPosts as post}
				<PostCard {post} />
			{/each}
		{/if}
	</div>
</section>
