<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import { NAV_LINKS, SITE } from '$lib/site';

	import '../app.css';

	let { children } = $props();
	type ColorMode = 'light' | 'dark' | 'system';

	let colorMode = $state<ColorMode>('system');
	let resolvedMode = $state<'light' | 'dark'>('light');
	let modeLabel = $derived(colorMode === 'system' ? `System (${resolvedMode})` : resolvedMode);

	let mediaQuery: MediaQueryList | null = null;

	const year = new Date().getFullYear();

	const isActive = (href: string): boolean => {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	};

	const applyColorMode = (mode: ColorMode): void => {
		if (!browser) return;

		const root = document.documentElement;
		const systemPrefersDark = mediaQuery?.matches ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
		const nextResolvedMode = mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : mode;

		root.dataset.colorMode = mode;
		root.dataset.resolvedMode = nextResolvedMode;
		root.style.colorScheme = nextResolvedMode;
		resolvedMode = nextResolvedMode;

		if (mode === 'system') {
			localStorage.removeItem('color-mode');
			return;
		}

		localStorage.setItem('color-mode', mode);
	};

	const toggleColorMode = (): void => {
		const nextMode: ColorMode = resolvedMode === 'dark' ? 'light' : 'dark';
		colorMode = nextMode;
		applyColorMode(nextMode);
	};

	onMount(() => {
		mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const storedMode = localStorage.getItem('color-mode');

		if (storedMode === 'light' || storedMode === 'dark') {
			colorMode = storedMode;
		}

		const handleSystemModeChange = () => {
			if (colorMode !== 'system') return;
			applyColorMode('system');
		};

		mediaQuery.addEventListener('change', handleSystemModeChange);
		applyColorMode(colorMode);

		return () => mediaQuery?.removeEventListener('change', handleSystemModeChange);
	});
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
				<button
					type="button"
					class="theme-toggle"
					aria-label={`Switch to ${resolvedMode === 'dark' ? 'light' : 'dark'} mode`}
					onclick={toggleColorMode}
				>
					Theme: {modeLabel}
				</button>
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
