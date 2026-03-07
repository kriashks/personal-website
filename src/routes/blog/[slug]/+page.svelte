<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} | Adarsh Krishnan</title>
	<meta name="description" content={data.post.summary} />
	<link rel="canonical" href={`https://adarshkrishnan.com/blog/${data.post.slug}/`} />
</svelte:head>

<section class="page-shell">
	<div class="flex flex-col gap-8 lg:flex-row lg:items-start">
		<article class="terminal-card min-w-0 flex-1 p-6 sm:p-8 md:p-10">
			<p class="terminal-command mb-4">$ cat {data.post.slug}.md</p>
			<h1 class="terminal-heading mb-3 text-3xl sm:text-4xl md:text-5xl">{data.post.title}</h1>
			<div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
				<time class="font-mono" datetime={data.post.date}>Published {formatDate(data.post.date)}</time>
				{#if data.post.lastmod}
					<time class="font-mono" datetime={data.post.lastmod}>
						Updated {formatDate(data.post.lastmod)}
					</time>
				{/if}
			</div>
			<div class="article-content mt-6">
				{@html data.post.html}
			</div>
		</article>

		{#if data.olderPosts.length > 0}
			<aside class="lg:sticky lg:top-24 lg:w-80 lg:shrink-0" aria-labelledby="older-articles-title">
				<div class="terminal-card p-5 sm:p-6">
					<div class="mb-5 flex items-center gap-3">
						<Icon name="clock" className="h-5 w-5 text-green-400" />
						<div>
							<h2 id="older-articles-title" class="font-mono text-lg text-white">
								Older articles
							</h2>
							<p class="text-sm text-gray-500">Continue through the archive</p>
						</div>
					</div>

					<div class="space-y-4">
						{#each data.olderPosts as post}
							<a
								href={`/blog/${post.slug}/`}
								class="block rounded-xl border border-green-500/20 bg-black/30 p-4 transition-colors hover:border-green-500/50 hover:bg-green-500/5"
							>
								<div class="mb-3 flex flex-wrap gap-2">
									{#each post.tags as tag}
										<span class="terminal-tag">{tag}</span>
									{/each}
								</div>

								<h3 class="font-mono text-base text-white transition-colors hover:text-green-400">
									{post.title}
								</h3>
								<p class="mt-2 text-sm leading-relaxed text-gray-400">{post.summary}</p>

								<div class="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
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
							</a>
						{/each}
					</div>
				</div>
			</aside>
		{/if}
	</div>
</section>
