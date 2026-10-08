<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import { srcFor, srcsetFor } from '$lib/sanity/image';
	import type { Photo } from '$lib/sanity/types';

	let { photos, index = $bindable(0), onclose }: { photos: Photo[]; index: number; onclose: () => void } = $props();

	const photo = $derived(photos[index]);
	const prev = () => (index = (index - 1 + photos.length) % photos.length);
	const next = () => (index = (index + 1) % photos.length);

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
		else if (e.key === 'ArrowLeft') prev();
		else if (e.key === 'ArrowRight') next();
	}

	let touchX = 0;
	const ontouchstart = (e: TouchEvent) => (touchX = e.touches[0].clientX);
	const ontouchend = (e: TouchEvent) => {
		const dx = e.changedTouches[0].clientX - touchX;
		if (Math.abs(dx) > 50) dx > 0 ? prev() : next();
	};

	let closeBtn: HTMLButtonElement;
	onMount(() => {
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeBtn?.focus();
		return () => {
			document.body.style.overflow = prevOverflow;
		};
	});

	const exif = $derived(
		[
			['Camera', photo?.camera],
			['Lens', photo?.lens],
			['Aperture', photo?.aperture],
			['Shutter', photo?.shutter],
			['ISO', photo?.iso]
		].filter(([, v]) => !!v) as [string, string][]
	);
</script>

<svelte:window {onkeydown} />

<div class="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" tabindex="-1" {ontouchstart} {ontouchend}>
	<div class="lightbox-bar">
		<span class="numeric">{index + 1} of {photos.length}</span>
		<button type="button" class="lightbox-btn" onclick={onclose} aria-label="Close" bind:this={closeBtn}>
			<Icon name="close" className="h-4 w-4" />
		</button>
	</div>

	<div class="lightbox-stage">
		{#key photo.key}
			<img
				src={srcFor(photo.image, 1920)}
				srcset={srcsetFor(photo.image, [1024, 1600, 2400])}
				sizes="100vw"
				alt={photo.image.alt ?? photo.title}
				decoding="async"
			/>
		{/key}
		{#if photos.length > 1}
			<button type="button" class="lightbox-nav prev" onclick={prev} aria-label="Previous photo">
				<Icon name="chevron-left" className="h-5 w-5" />
			</button>
			<button type="button" class="lightbox-nav next" onclick={next} aria-label="Next photo">
				<Icon name="chevron-right" className="h-5 w-5" />
			</button>
		{/if}
	</div>

	<div class="lightbox-info">
		<h2 id="lightbox-title">{photo.title}{photo.location ? ` · ${photo.location}` : ''}</h2>
		{#if photo.caption}<p>{photo.caption}</p>{/if}
		{#if exif.length}
			<ul class="exif">
				{#each exif as [k, v]}
					<li><span class="k">{k}</span><span>{v}</span></li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
