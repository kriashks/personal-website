<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	let theme = $state<'light' | 'dark'>('light');

	onMount(() => {
		theme = (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ?? 'light';
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) apply(e.matches ? 'dark' : 'light', false);
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});

	function apply(next: 'light' | 'dark', persist: boolean) {
		const root = document.documentElement;
		root.classList.add('theme-transition');
		root.setAttribute('data-theme', next);
		theme = next;
		if (persist) {
			try {
				localStorage.setItem('theme', next);
			} catch {
				/* storage unavailable */
			}
		}
		window.setTimeout(() => root.classList.remove('theme-transition'), 350);
	}

	const toggle = () => apply(theme === 'dark' ? 'light' : 'dark', true);
</script>

<button
	type="button"
	class="theme-toggle"
	onclick={toggle}
	aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
>
	<Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4" />
</button>
