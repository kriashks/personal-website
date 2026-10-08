<script lang="ts">
	import { page } from '$app/state';

	const status = $derived(page.status);
	const message = $derived(page.error?.message ?? 'Something went wrong.');
</script>

<svelte:head>
	<title>{status} | Adarsh Krishnan</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="page-head container" style="padding-bottom: 8rem;">
	<h1 class="title-1">{status === 404 ? 'Page not found' : 'Something went wrong'}</h1>
	<p class="lede">{status === 404 ? 'That page has moved or never existed.' : message}</p>
	<div class="mt-7 flex flex-wrap justify-center gap-3">
		<a href="/" class="btn btn-primary">Go home</a>
		<a href="/blog/" class="btn btn-secondary">Read the blog</a>
	</div>
</section>
