<script lang="ts">
	import type { IconName } from '$lib/types/icon';

	type Props = {
		name: IconName;
		className?: string;
		title?: string;
	};

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
	{#if name === 'terminal'}
		<rect x="3" y="5" width="18" height="14" rx="2" />
		<path d="m7 10 3 2-3 2" />
		<path d="M13 14h4" />
	{:else if name === 'book'}
		<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14H6.5A2.5 2.5 0 0 0 4 20.5z" />
		<path d="M4 6.5V20" />
		<path d="M12 7v10" />
	{:else if name === 'camera'}
		<path d="M4 8h4l1.5-2h5L16 8h4v10H4z" />
		<circle cx="12" cy="13" r="3.2" />
	{:else if name === 'user'}
		<circle cx="12" cy="8" r="3.2" />
		<path d="M5 19a7 7 0 0 1 14 0" />
	{:else if name === 'arrow-right'}
		<path d="M5 12h14" />
		<path d="m13 7 5 5-5 5" />
	{:else if name === 'github'}
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
	{:else if name === 'calendar'}
		<rect x="4" y="5" width="16" height="15" rx="2" />
		<path d="M8 3v4" />
		<path d="M16 3v4" />
		<path d="M4 10h16" />
	{:else if name === 'clock'}
		<circle cx="12" cy="12" r="8" />
		<path d="M12 8v4l3 2" />
	{:else if name === 'folders'}
		<path d="M3 8h7l2 2h9v9H3z" />
		<path d="M3 8V6h6l2 2" />
	{:else if name === 'x'}
		<path d="m6 6 12 12" />
		<path d="m18 6-12 12" />
	{:else if name === 'chevron-left'}
		<path d="m15 6-6 6 6 6" />
	{:else if name === 'chevron-right'}
		<path d="m9 6 6 6-6 6" />
	{:else if name === 'aperture'}
		<circle cx="12" cy="12" r="7" />
		<circle cx="12" cy="12" r="2" />
		<path d="m12 5 2.5 4.3" />
		<path d="m19 12-5 2.5" />
		<path d="m12 19-2.5-4.3" />
		<path d="M5 12l5-2.5" />
	{:else if name === 'zap'}
		<path d="m13 2-8 11h5l-1 9 8-11h-5z" />
	{:else if name === 'code'}
		<path d="m9 7-4 5 4 5" />
		<path d="m15 7 4 5-4 5" />
	{:else if name === 'heart'}
		<path d="M12 20s-7-4.3-7-9.1A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.9c0 4.8-7 9.1-7 9.1" />
	{:else if name === 'briefcase'}
		<rect x="3" y="7" width="18" height="12" rx="2" />
		<path d="M9 7V5h6v2" />
		<path d="M3 12h18" />
	{/if}
</svg>
