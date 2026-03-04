<script lang="ts">
	import { page } from '$app/state';

	import { NAV_LINKS, SITE } from '$lib/site';

	import '../app.css';

	let { children } = $props();

	const year = new Date().getFullYear();

	const isActive = (href: string): boolean => {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	};
</script>

<svelte:head>
	<meta name="description" content={SITE.description} />
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="site-shell">
	<header class="shell-nav panel card p-3 md:p-4 fade-slide">
		<div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
			<div>
				{#if SITE.tagline}
					<p class="text-xs uppercase tracking-[0.28em] text-surface-700">{SITE.tagline}</p>
				{/if}
				<p class="brand-title text-xl font-black tracking-tight text-surface-950">{SITE.name}</p>
			</div>

			<div class="flex flex-wrap items-center gap-2.5">
				<nav class="flex flex-wrap gap-1.5" aria-label="Primary">
					{#each NAV_LINKS as link}
						<a href={link.href} class="nav-link" class:active={isActive(link.href)}>{link.label}</a>
					{/each}
				</nav>
			</div>
		</div>
	</header>

	<main class="mt-5 flex flex-col gap-5">
		{@render children()}
	</main>

	<footer class="panel card px-4 py-4 text-sm text-surface-700 fade-slide delay-3">
		<div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
			<p>&copy; {year} {SITE.name}</p>
			<div class="flex flex-wrap gap-3 text-sm">
				<a href="mailto:adarshkrish@proton.me">Email</a>
				<a href="https://github.com/kriashks" rel="noreferrer" target="_blank">GitHub</a>
				<a href="https://www.linkedin.com/in/kriash/" rel="noreferrer" target="_blank">LinkedIn</a>
			</div>
		</div>
	</footer>
</div>
