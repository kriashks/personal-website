<script lang="ts">
	import { page } from '$app/state';

	import Icon from '$lib/components/Icon.svelte';
	import { NAV_LINKS } from '$lib/data/navigation';

	import '../app.css';

	let { children } = $props();

	const normalizePath = (path: string): string => {
		if (path === '/') return '/';
		return path.endsWith('/') ? path.slice(0, -1) : path;
	};

	const isActive = (href: string): boolean => {
		const current = normalizePath(page.url.pathname);
		const target = normalizePath(href);

		if (target === '/') {
			return current === '/';
		}

		return current.startsWith(target);
	};
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="app-root">
	<div class="grid-overlay" aria-hidden="true"></div>

	<header class="site-nav" aria-label="Main navigation">
		<div class="nav-inner">
			<a href="/" class="brand-link" aria-label="Home">
				<Icon name="terminal" className="h-5 w-5" />
				<span class="brand-label">adarsh.krishnan</span>
			</a>

			<ul class="nav-list">
				{#each NAV_LINKS as link}
					<li>
						<a
							href={link.href}
							class="nav-item"
							class:active={isActive(link.href)}
							aria-current={isActive(link.href) ? 'page' : undefined}
						>
							<Icon name={link.icon} className="nav-icon" />
							<span class:nav-label-mobile={!!link.mobileLabel}>{link.label}</span>
							{#if link.mobileLabel}
								<span class="nav-label-short">{link.mobileLabel}</span>
							{/if}
							{#if isActive(link.href)}
								<span class="nav-active-line" aria-hidden="true"></span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</header>

	<main>
		{@render children()}
	</main>
</div>
