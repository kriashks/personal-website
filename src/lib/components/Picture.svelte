<script lang="ts">
	import { lqipFor, ratioFor, srcFor, srcsetFor } from '$lib/sanity/image';
	import type { ImageRef } from '$lib/sanity/types';

	type Props = {
		image: ImageRef | null | undefined;
		alt?: string;
		sizes?: string;
		widths?: number[];
		ratio?: number | null;
		priority?: boolean;
		class?: string;
	};

	let {
		image,
		alt,
		sizes = '100vw',
		widths = [480, 768, 1024, 1440, 1920, 2560],
		ratio = null,
		priority = false,
		class: className = ''
	}: Props = $props();

	const cropRatio = $derived(ratio ?? undefined);
	const naturalRatio = $derived(ratioFor(image));
	const lqip = $derived(lqipFor(image));
	const altText = $derived(alt ?? image?.alt ?? '');
	let loaded = $state(false);

	function watch(node: HTMLImageElement) {
		if (node.complete && node.naturalWidth > 0) loaded = true;
	}
</script>

{#if image}
	<img
		src={srcFor(image, 1440, cropRatio ? Math.round(1440 / cropRatio) : undefined)}
		srcset={srcsetFor(image, widths, cropRatio)}
		{sizes}
		alt={altText}
		loading={priority ? 'eager' : 'lazy'}
		fetchpriority={priority ? 'high' : undefined}
		decoding="async"
		class={className}
		style={`aspect-ratio: ${cropRatio ?? naturalRatio}; ${lqip && !loaded ? `background: url(${lqip}) center / cover;` : ''} opacity: ${loaded ? 1 : 0}; transition: opacity 500ms var(--ease);`}
		onload={() => (loaded = true)}
		onerror={() => (loaded = true)}
		use:watch
	/>
{/if}
