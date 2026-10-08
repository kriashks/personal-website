<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';
	import PtCode from './pt/PtCode.svelte';
	import PtImage from './pt/PtImage.svelte';
	import PtLink from './pt/PtLink.svelte';
	import PtListItem from './pt/PtListItem.svelte';

	// @portabletext/svelte looks list items up by block style, so register the default style too.
	const listItem = { normal: PtListItem, bullet: PtListItem, number: PtListItem };

	let { value, class: className = 'prose' }: { value: PortableTextBlock[]; class?: string } = $props();
</script>

<div class={className}>
	<PortableText {value} components={{ types: { image: PtImage, code: PtCode }, marks: { link: PtLink }, listItem }} />
</div>
