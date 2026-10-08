<script lang="ts">
	import Picture from '$lib/components/Picture.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import { SITE } from '$lib/site';

	let { data } = $props();
</script>

<svelte:head>
	<title>Photography | {data.settings.siteName}</title>
	<meta name="description" content={data.settings.photographyIntro || `Photographs by ${data.settings.siteName}.`} />
	<link rel="canonical" href={`${SITE.url}/photography/`} />
</svelte:head>

<section class="page-head container">
	<h1 class="title-1">Photography</h1>
	{#if data.settings.photographyIntro}<p class="lede">{data.settings.photographyIntro}</p>{/if}
</section>

<section class="container-wide pb-24">
	{#if data.albums.length === 0}
		<p class="muted text-center">No albums yet.</p>
	{:else}
		<div class="album-grid">
			{#each data.albums as album, i}
				<Reveal delay={Math.min(i, 4) * 70}>
					<a href={`/photography/${album.slug}/`} class="album-card">
						<div class="frame frame-hover">
							<Picture image={album.cover} alt={album.cover?.alt ?? album.title} ratio={4 / 3} sizes="(min-width: 40rem) 50vw, 100vw" priority={i < 2} />
						</div>
						<h2>{album.title}</h2>
						<p>{album.photoCount} photographs{album.description ? ` · ${album.description}` : ''}</p>
					</a>
				</Reveal>
			{/each}
		</div>
	{/if}
</section>
