<script lang="ts">
	import { page } from '$app/state';
	import Icon from '$lib/components/Icon.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { NAV_LINKS } from '$lib/data/navigation';

	import '../app.css';

	let { children, data } = $props();

	let scrolled = $state(false);
	const onscroll = () => (scrolled = window.scrollY > 8);

	const normalize = (p: string) => (p === '/' ? '/' : p.replace(/\/$/, ''));
	const isActive = (href: string) => normalize(page.url.pathname).startsWith(normalize(href));
	const year = new Date().getFullYear();
</script>

<svelte:window {onscroll} />

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
	<link rel="alternate" type="application/rss+xml" title="{data.settings.siteName} blog" href="/rss.xml" />
	<meta property="og:site_name" content={data.settings.siteName} />
</svelte:head>

<a href="#main" class="sr-only">Skip to content</a>

<header class="site-nav" class:scrolled aria-label="Main navigation">
	<div class="nav-inner">
		<a href="/" class="brand" aria-label="Home">{data.settings.siteName}</a>
		<ul class="nav-links">
			{#each NAV_LINKS as link}
				<li>
					<a href={link.href} class="nav-link" aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</a>
				</li>
			{/each}
			<li><ThemeToggle /></li>
		</ul>
	</div>
</header>

<main id="main">
	{@render children()}
</main>

<footer class="site-footer">
	<div class="container footer-inner">
		<p>&copy; {year} {data.settings.siteName}</p>
		<ul class="footer-links">
			{#each data.settings.social as s}
				<li>
					<a href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel={s.href.startsWith('http') ? 'noreferrer noopener' : undefined}>
						<span class="inline-flex items-center gap-1.5"><Icon name={s.icon} className="h-3.5 w-3.5" />{s.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
	{#if data.isSampleContent}
		<p class="notice container" style="margin-top: 1.5rem;">Built with sample content. Photographs are placeholders.</p>
	{/if}
</footer>
