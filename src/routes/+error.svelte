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

<section class="panel hero-panel p-6 md:p-8 fade-slide delay-1">
	<p class="kicker">{status}</p>
	<h1 class="section-title mb-3">{status === 404 ? 'Page not found' : 'Unexpected error'}</h1>
	<p class="max-w-2xl text-surface-800">{message}</p>
	<div class="mt-5 flex flex-wrap gap-2.5">
		<a class="btn preset-filled-primary-500" href="/">Back to Home</a>
		<a class="btn preset-outlined-secondary-700-300" href="/blog/">Go to Blog</a>
	</div>
</section>
