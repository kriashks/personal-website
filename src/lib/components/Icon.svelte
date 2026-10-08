<script lang="ts">
	import type { IconName } from '$lib/types/icon';

	type Props = { name: IconName; className?: string; title?: string };
	let { name, className = 'h-5 w-5', title }: Props = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="1.75"
	class={className}
	aria-hidden={title ? undefined : true}
	aria-label={title}
	role={title ? 'img' : undefined}
>
	{#if name === 'github'}
		<path d="M12 4a8 8 0 0 0-2.5 15.6V17c-2.8.6-3.4-1.2-3.4-1.2-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1 .1 1.6 1.1 1.6 1.1 1 .1 1.6-.5 2-.9.1-.7.4-1.2.7-1.5-2.3-.2-4.6-1.1-4.6-4.8 0-1 .4-2 1.1-2.7-.1-.2-.5-1.2.1-2.5 0 0 .9-.3 2.8 1.1a9.2 9.2 0 0 1 5.1 0c1.9-1.4 2.8-1.1 2.8-1.1.6 1.3.2 2.3.1 2.5.7.7 1.1 1.7 1.1 2.7 0 3.7-2.3 4.6-4.6 4.8.4.4.7 1 .7 2v2.6A8 8 0 0 0 12 4" />
	{:else if name === 'linkedin'}
		<rect x="4" y="4" width="16" height="16" rx="2" />
		<path d="M8 10v6" />
		<circle cx="8" cy="7.5" r="1" />
		<path d="M12 16v-3.5a2 2 0 0 1 4 0V16" />
		<path d="M12 10v1.2" />
	{:else if name === 'mail'}
		<rect x="3" y="6" width="18" height="12" rx="2" />
		<path d="m4 8 8 6 8-6" />
	{:else if name === 'instagram'}
		<rect x="4" y="4" width="16" height="16" rx="4.5" />
		<circle cx="12" cy="12" r="3.5" />
		<circle cx="17" cy="7" r="0.6" fill="currentColor" />
	{:else if name === 'x'}
		<path d="M5 4h4l10 16h-4z" />
		<path d="M19 4 5 20" />
	{:else if name === 'link'}
		<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
		<path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
	{:else if name === 'sun'}
		<circle cx="12" cy="12" r="4" />
		<path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
	{:else if name === 'moon'}
		<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
	{:else if name === 'close'}
		<path d="M6 6l12 12M18 6 6 18" />
	{:else if name === 'chevron-left'}
		<path d="m14 6-6 6 6 6" />
	{:else if name === 'chevron-right'}
		<path d="m10 6 6 6-6 6" />
	{:else if name === 'arrow-left'}
		<path d="M19 12H5" />
		<path d="m11 7-5 5 5 5" />
	{/if}
</svg>
