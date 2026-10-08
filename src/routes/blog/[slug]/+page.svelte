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
</svelte:head>

<article>
	<header class="page-head container-prose">
		<h1 class="title-1">{post.title}</h1>
		<p class="lede">{post.summary}</p>
		<p class="meta numeric mt-5">
			<time datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readTime}
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
