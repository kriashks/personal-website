<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog | Adarsh Krishnan</title>
	<meta name="description" content="Posts by Adarsh Krishnan." />
	<link rel="canonical" href="https://adarshkrishnan.com/blog/" />
</svelte:head>

<section class="page-shell">
	<header class="mb-12 sm:mb-16">
		<p class="terminal-command mb-4">$ cat blog.log</p>
		<h1 class="terminal-heading mb-4 text-4xl sm:text-5xl md:text-6xl">Blog</h1>
		<p class="text-base text-gray-400 sm:text-lg">
			Thoughts on data systems, product analytics, and engineering tradeoffs.
		</p>
	</header>

	{#if data.posts.length === 0}
		<article class="terminal-card p-7 sm:p-8">
			<h2 class="font-mono text-2xl text-white">No posts published yet</h2>
			<p class="mt-3 text-gray-400">
				Run <code>npm run blog:new -- --title "Your Post Title"</code> to create your first post.
			</p>
		</article>
	{:else}
		<div class="space-y-6" role="list" aria-label="Blog posts">
			{#each data.posts as post}
				<article class="terminal-card group p-6 sm:p-8" role="listitem">
					<div class="mb-4 flex flex-wrap gap-2">
						{#each post.tags as tag}
							<span class="terminal-tag">{tag}</span>
						{/each}
					</div>

					<h2 class="mb-3 font-mono text-xl text-white transition-colors group-hover:text-green-400 sm:text-2xl">
						<a href={`/blog/${post.slug}/`}>{post.title}</a>
					</h2>

					<p class="mb-5 text-sm leading-relaxed text-gray-400 sm:text-base">{post.summary}</p>

					<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div class="flex flex-wrap items-center gap-4 text-xs text-gray-500 sm:text-sm">
							<time class="inline-flex items-center gap-1 font-mono" datetime={post.date}>
								<Icon name="calendar" className="h-4 w-4" />
								Published {formatDate(post.date)}
							</time>
							{#if post.lastmod}
								<time class="inline-flex items-center gap-1 font-mono" datetime={post.lastmod}>
									<Icon name="calendar" className="h-4 w-4" />
									Updated {formatDate(post.lastmod)}
								</time>
							{/if}
							<span class="inline-flex items-center gap-1 font-mono">
								<Icon name="clock" className="h-4 w-4" />
								{post.readTime}
							</span>
						</div>
						<a
							href={`/blog/${post.slug}/`}
							class="inline-flex items-center gap-2 font-mono text-sm text-green-400 transition-all hover:gap-3"
						>
							Read more
							<Icon name="arrow-right" className="h-4 w-4" />
						</a>
					</div>
				</article>
			{/each}
		</div>
	{/if}

	<div class="terminal-footer mt-9 sm:mt-12"><span class="animate-pulse">_</span> End of log file</div>
</section>
