<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: className = '', delay = 0 }: { children: Snippet; class?: string; delay?: number } = $props();

	function reveal(node: HTMLElement) {
		if (typeof IntersectionObserver === 'undefined') {
			node.classList.add('in');
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.style.transitionDelay = `${delay}ms`;
						node.classList.add('in');
						io.disconnect();
					}
				}
			},
			{ rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
		);
		io.observe(node);
		return { destroy: () => io.disconnect() };
	}
</script>

<div class={`reveal ${className}`} use:reveal>
	{@render children()}
</div>
