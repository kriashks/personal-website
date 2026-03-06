<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { SOCIAL_LINKS } from '$lib/site';

	let { data } = $props();

	const latestPost = $derived(data.latestPosts[0] ?? null);
	const latestPostHref = $derived(latestPost ? `/blog/${latestPost.slug}/` : '/blog/');
</script>

<svelte:head>
	<title>Adarsh Krishnan</title>
	<meta
		name="description"
		content="Adarsh Krishnan's work on analytics, experimentation, and practical data systems."
	/>
	<link rel="canonical" href="https://adarshkrishnan.com/" />
</svelte:head>

<section class="page-shell">
	<header class="mb-16 sm:mb-20">
		<p class="terminal-command mb-4">$ whoami</p>
		<h1 class="terminal-heading mb-5 text-5xl sm:text-6xl lg:text-7xl">Adarsh Krishnan</h1>
		<p class="typing-line mb-7">
			<span class="typing-prompt text-gray-500">&gt;</span><span>developer. writer. photographer.</span>
		</p>
		<p class="max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg">
			Welcome to my corner of the internet. I build practical data systems, write about product and
			analytics, and document visual stories from everyday travel.
		</p>
		<div class="mt-7 flex flex-wrap gap-3" aria-label="Social links">
			{#each SOCIAL_LINKS as social}
				<a
					href={social.href}
					class="social-button"
					target={social.external ? '_blank' : undefined}
					rel={social.external ? 'noreferrer noopener' : undefined}
					aria-label={social.label}
				>
					<Icon name={social.icon} className="h-5 w-5" />
				</a>
			{/each}
		</div>
	</header>

	<div class="grid gap-5 md:grid-cols-2">
		<a href={latestPostHref} class="terminal-card group p-7">
			<div class="mb-4 flex items-center justify-between gap-3">
				<h2 class="text-xl font-medium text-green-400 sm:text-2xl font-mono">Latest Thoughts</h2>
				<Icon
					name="arrow-right"
					className="h-5 w-5 text-green-400 transition-transform duration-200 group-hover:translate-x-1"
				/>
			</div>
			<p class="text-gray-400">
				Exploring experimentation, analytics implementation, and practical software decisions.
			</p>
			{#if latestPost}
				<p class="mt-4 text-sm font-mono text-green-300/80 line-clamp-3">Latest: {latestPost.title}</p>
			{/if}
		</a>

		<a href="/photography/" class="terminal-card group p-7">
			<div class="mb-4 flex items-center justify-between gap-3">
				<h2 class="text-xl font-medium text-green-400 sm:text-2xl font-mono">Visual Stories</h2>
				<Icon
					name="arrow-right"
					className="h-5 w-5 text-green-400 transition-transform duration-200 group-hover:translate-x-1"
				/>
			</div>
			<p class="text-gray-400">
				A curated photography archive covering cities, landscapes, and wildlife captured through my
				lens.
			</p>
		</a>
	</div>
</section>
