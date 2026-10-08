<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import { srcFor } from '$lib/sanity/image';
	import { SITE } from '$lib/site';
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();
	const post = $derived(data.post);
	const url = $derived(`${SITE.url}/blog/${post.slug}/`);
</script>

<svelte:head>
	<title>{post.title} | {data.settings.siteName}</title>
	<meta name="description" content={post.summary} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.summary} />
	{#if post.coverImage}<meta property="og:image" content={srcFor(post.coverImage, 1200, 630)} />{/if}
	<meta property="article:published_time" content={post.publishedAt} />
	{#if post.updatedAt}<meta property="article:modified_time" content={post.updatedAt} />{/if}
</svelte:head>

<article>
	<header class="page-head container-prose">
		<h1 class="title-1">{post.title}</h1>
		<p class="lede">{post.summary}</p>
		<p class="meta numeric mt-5">
			<time datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
			{#if post.updatedAt && post.updatedAt > post.publishedAt}
				· Updated <time datetime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
			{/if}
			· {post.readTime}
		</p>
	</header>

	{#if post.coverImage}
		<div class="container pb-10">
			<div class="frame" style="aspect-ratio: 2 / 1;">
				<Picture image={post.coverImage} alt={post.coverImage.alt ?? ''} ratio={2} sizes="(min-width: 61rem) 61rem, 100vw" priority />
			</div>
		</div>
	{/if}

	<div class="container-prose pb-16">
		<RichText value={post.body} />

		{#if post.tags.length}
			<ul class="tags mt-12" aria-label="Tags">
				{#each post.tags as tag}<li class="tag">{tag}</li>{/each}
			</ul>
		{/if}

		<p class="mt-12"><a href="/blog/" class="link link-arrow link-back"><Icon name="arrow-left" />All posts</a></p>
	</div>
</article>

{#if data.olderPosts.length}
	<section class="section band">
		<div class="container-prose">
			<div class="flex items-end justify-between gap-4">
				<h2 class="title-2">More writing</h2>
				<a href="/blog/" class="link link-arrow whitespace-nowrap">All posts<Icon name="chevron-right" /></a>
			</div>
			<ul class="post-list mt-4">
				{#each data.olderPosts as older}
					<li>
						<article class="post-row">
							<time class="meta numeric" datetime={older.publishedAt}>{formatDate(older.publishedAt)}</time>
							<div>
								<h2><a href={`/blog/${older.slug}/`}>{older.title}</a></h2>
								<p class="summary">{older.summary}</p>
								<p class="meta mt-3">{older.readTime}</p>
							</div>
						</article>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}
