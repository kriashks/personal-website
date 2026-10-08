<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import { srcFor } from '$lib/sanity/image';
	import { SITE } from '$lib/site';

	let { data } = $props();
	const album = $derived(data.album);

	let open = $state(false);
	let index = $state(0);
	const show = (i: number) => {
		index = i;
		open = true;
	};
</script>

<svelte:head>
	<title>{album.title} | Photography | {data.settings.siteName}</title>
	<meta name="description" content={album.description ?? `${album.title}, a photo album by ${data.settings.siteName}.`} />
	<link rel="canonical" href={`${SITE.url}/photography/${album.slug}/`} />
	<meta property="og:image" content={srcFor(album.cover, 1200, 630)} />
</svelte:head>

<section class="page-head container">
	<h1 class="title-1">{album.title}</h1>
	{#if album.description}<p class="lede">{album.description}</p>{/if}
	<p class="meta mt-5">{album.photos.length} photographs</p>
	<p class="mt-3"><a href="/photography/" class="link link-arrow link-back"><Icon name="arrow-left" />All albums</a></p>
</section>

<section class="container-wide pb-24">
	<div class="photo-grid">
		{#each album.photos as photo, i}
			<Reveal delay={Math.min(i, 5) * 40}>
				<button type="button" class="photo-tile" onclick={() => show(i)} aria-label={`Open ${photo.title}`}>
					<figure>
						<div class="frame frame-hover">
							<Picture image={photo.image} alt={photo.image.alt ?? photo.title} sizes="(min-width: 64rem) 30rem, (min-width: 40rem) 50vw, 100vw" widths={[480, 768, 1024, 1440]} priority={i < 3} />
						</div>
						<figcaption>
							<span>{photo.title}</span>
							{#if photo.location}<span class="subtle">{photo.location}</span>{/if}
						</figcaption>
					</figure>
				</button>
			</Reveal>
		{/each}
	</div>
</section>

{#if open}
	<Lightbox photos={album.photos} bind:index onclose={() => (open = false)} />
{/if}
