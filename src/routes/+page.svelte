<script lang="ts">
	import { formatDate } from '$lib/utils/date';

	let { data } = $props();
</script>

<svelte:head>
	<title>Adarsh Krishnan | Data Scientist</title>
	<meta
		name="description"
		content="Adarsh Krishnan's work on analytics, experimentation, and practical data systems."
	/>
	<link rel="canonical" href="https://adarshkrishnan.com/" />
</svelte:head>

<section class="panel hero-panel px-5 py-6 md:px-8 md:py-8 fade-slide delay-1">
	<p class="kicker">Data Science • Analytics • Automation</p>
	<h1 class="section-title mb-3 text-4xl font-black md:text-5xl">Hi, I am Adarsh.</h1>
	<p class="max-w-3xl text-base text-surface-800 md:text-lg">
		I work at the intersection of analytics, experimentation, and product decision-making. I build practical
		systems that turn messy data into clear actions.
	</p>
	<div class="mt-5 flex flex-wrap gap-2.5">
		<a class="btn preset-filled-primary-500" href="/projects/">View Projects</a>
		<a class="btn preset-outlined-secondary-700-300" href="/blog/">Read Blog</a>
		<a class="btn preset-outlined-surface-700-300" href="mailto:adarshkrish@proton.me">Email</a>
		<a class="btn preset-outlined-surface-700-300" href="https://github.com/kriashks" rel="noreferrer" target="_blank"
			>GitHub</a
		>
	</div>
</section>

<section class="panel p-5 md:p-6 fade-slide delay-2">
	<h2 class="section-title mb-4">What I Focus On</h2>
	<div class="grid gap-4 md:grid-cols-2">
		<article class="card p-4 preset-tonal-secondary">
			<h3 class="mb-2 text-xl font-bold">Decision-focused analytics</h3>
			<p class="text-surface-800">
				I translate broad business questions into measurable metrics and robust analysis plans.
			</p>
			<div class="mt-3 flex flex-wrap gap-2">
				<span class="chip">A/B Testing</span>
				<span class="chip">Causal Inference</span>
				<span class="chip">Statistical Modeling</span>
			</div>
		</article>
		<article class="card p-4 preset-tonal-primary">
			<h3 class="mb-2 text-xl font-bold">Data products and automation</h3>
			<p class="text-surface-800">
				I automate manual reporting and build internal tools that reduce cycle time for teams.
			</p>
			<div class="mt-3 flex flex-wrap gap-2">
				<span class="chip">Python</span>
				<span class="chip">SQL</span>
				<span class="chip">Snowflake</span>
			</div>
		</article>
	</div>
</section>

<section class="panel p-5 md:p-6 fade-slide delay-3">
	<h2 class="section-title mb-4">Latest Posts</h2>
	<div class="grid gap-4 md:grid-cols-2">
		{#if data.latestPosts.length === 0}
			<article class="card p-4 preset-tonal-surface">
				<h3 class="text-xl font-bold">No posts yet</h3>
				<p class="mt-2">Use <code>npm run blog:new -- --title "My New Post"</code> to publish your first article.</p>
			</article>
		{:else}
			{#each data.latestPosts as post}
				<article class="card p-4 preset-tonal-surface card-hover">
					<p class="kicker mb-2">{formatDate(post.date)}</p>
					<h3 class="text-xl font-bold"><a href={`/blog/${post.slug}/`}>{post.title}</a></h3>
					<p class="mt-2 text-surface-800">{post.summary}</p>
					<a class="mt-3 inline-flex text-sm font-semibold" href={`/blog/${post.slug}/`}>Read post →</a>
				</article>
			{/each}
		{/if}
	</div>
</section>
