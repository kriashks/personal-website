<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import { SITE } from '$lib/site';
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();
	const s = $derived(data.settings);
</script>

<svelte:head>
	<title>{s.siteName}</title>
	<meta name="description" content={s.description} />
	<link rel="canonical" href={`${SITE.url}/`} />
	<meta property="og:title" content={s.siteName} />
	<meta property="og:description" content={s.description} />
</svelte:head>

<section class="page-head container">
	<h1 class="display">{s.heroHeading || s.siteName}</h1>
	{#if s.heroSubheading}
		<p class="lede">{s.heroSubheading}</p>
	{/if}
	<div class="mt-7 flex flex-wrap items-center justify-center gap-3">
		<a href="/blog/" class="btn btn-primary">Read the blog</a>
		<a href="/photography/" class="btn btn-secondary">See the photographs</a>
	</div>
</section>

{#if s.heroImage}
	<section class="container-wide pb-16 md:pb-24">
		<Reveal>
			<div class="frame" style="aspect-ratio: 16 / 9;">
				<Picture image={s.heroImage} ratio={16 / 9} sizes="(min-width: 90rem) 86rem, 100vw" priority />
			</div>
		</Reveal>
	</section>
{/if}

{#if data.latestPosts.length}
	<section class="section band">
		<div class="container-prose">
			<Reveal>
				<div class="flex items-end justify-between gap-4">
					<h2 class="title-2">Latest writing</h2>
					<a href="/blog/" class="link link-arrow whitespace-nowrap">All posts<Icon name="chevron-right" /></a>
				</div>
			</Reveal>
			<ul class="post-list mt-4">
				{#each data.latestPosts as post, i}
					<li>
						<Reveal delay={i * 60}>
							<article class="post-row">
								<time class="meta numeric" datetime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
								<div>
									<h2><a href={`/blog/${post.slug}/`}>{post.title}</a></h2>
									<p class="summary">{post.summary}</p>
									<p class="meta mt-3">{post.readTime}</p>
								</div>
							</article>
						</Reveal>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

{#if data.featuredAlbums.length}
	<section class="section">
		<div class="container-wide">
			<Reveal>
				<div class="flex items-end justify-between gap-4">
					<h2 class="title-2">Photography</h2>
					<a href="/photography/" class="link link-arrow whitespace-nowrap">All albums<Icon name="chevron-right" /></a>
				</div>
			</Reveal>
			<div class="album-grid mt-8">
				{#each data.featuredAlbums as album, i}
					<Reveal delay={i * 80}>
						<a href={`/photography/${album.slug}/`} class="album-card">
							<div class="frame frame-hover">
								<Picture image={album.cover} alt={album.cover?.alt ?? album.title} ratio={4 / 3} sizes="(min-width: 40rem) 50vw, 100vw" />
							</div>
							<h2>{album.title}</h2>
							<p>{album.photoCount} photographs{album.description ? ` · ${album.description}` : ''}</p>
						</a>
					</Reveal>
				{/each}
			</div>
		</div>
	</section>
{/if}
