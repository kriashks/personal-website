<script lang="ts">
	import { page } from '$app/state';

	const status = $derived(page.status);
	const message = $derived(page.error?.message ?? 'Something went wrong.');
</script>

<svelte:head>
	<title>{status} | Adarsh Krishnan</title>
	<meta name="description" content="Page not found" />
	<link rel="canonical" href="https://adarshkrishnan.com/404/" />
</svelte:head>

<section class="page-shell">
	<article class="terminal-card max-w-3xl p-7 sm:p-9">
		<p class="terminal-command mb-4">$ status {status}</p>
		<h1 class="terminal-heading mb-3 text-3xl sm:text-4xl">
			{status === 404 ? 'Page not found' : 'Unexpected error'}
		</h1>
		<p class="text-gray-400">{message}</p>
		<div class="mt-6 flex flex-wrap gap-3">
			<a href="/" class="terminal-tag">Back to Home</a>
			<a href="/blog/" class="terminal-tag">Go to Blog</a>
		</div>
	</article>
</section>
