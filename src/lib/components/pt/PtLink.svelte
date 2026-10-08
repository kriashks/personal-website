<script lang="ts">
	import type { MarkComponentProps } from '@portabletext/svelte';
	import type { Snippet } from 'svelte';

	let { portableText, children }: { portableText: MarkComponentProps<{ href?: string; blank?: boolean }>; children: Snippet } = $props();
	const value = $derived(portableText.value);
	const external = $derived(!!value.href && /^https?:\/\//.test(value.href) && !value.href.includes('adarshkrishnan.com'));
</script>

<a href={value.href} target={value.blank || external ? '_blank' : undefined} rel={value.blank || external ? 'noreferrer noopener' : undefined}>
	{@render children()}
</a>
