<script lang="ts">
	import Reveal from '$lib/components/Reveal.svelte';
	import { SITE } from '$lib/site';
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog | {data.settings.siteName}</title>
	<meta name="description" content={data.settings.blogIntro || `Writing by ${data.settings.siteName}.`} />
	<link rel="canonical" href={`${SITE.url}/blog/`} />
</svelte:head>

<section class="page-head container">
	<h1 class="title-1">Blog</h1>
	{#if data.settings.blogIntro}<p class="lede">{data.settings.blogIntro}</p>{/if}
</section>

<section class="container-prose pb-24">
	{#if data.posts.length === 0}
		<p class="muted text-center">Nothing published yet.</p>
	{:else}
		<ul class="post-list" aria-label="Blog posts">
			{#each data.posts as post, i}
				<li>
					<Reveal delay={Math.min(i, 6) * 50}>
						<article class="post-row">
							<time class="meta numeric" datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
							<div>
								<h2><a href={`/blog/${post.slug}/`}>{post.title}</a></h2>
								<p class="summary">{post.summary}</p>
								<div class="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
									<span class="meta">{post.readTime}</span>
									{#if post.tags.length}
										<ul class="tags !mt-0" aria-label="Tags">
											{#each post.tags as tag}<li class="tag">{tag}</li>{/each}
										</ul>
									{/if}
								</div>
							</div>
						</article>
					</Reveal>
				</li>
			{/each}
		</ul>
	{/if}
</section>
