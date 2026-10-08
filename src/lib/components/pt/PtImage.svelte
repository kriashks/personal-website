<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import Picture from '$lib/components/Picture.svelte';
	import type { ImageRef } from '$lib/sanity/types';

	let { portableText }: { portableText: CustomBlockComponentProps<ImageRef> } = $props();
	const value = $derived(portableText.value);
</script>

<figure>
	<div class="frame">
		<Picture image={value} alt={value.alt} sizes="(min-width: 48rem) 42rem, 100vw" widths={[480, 768, 1024, 1344]} />
	</div>
	{#if value.caption}
		<figcaption>{value.caption}</figcaption>
	{/if}
</figure>
