<script lang="ts">
	import { EDUCATION_ITEMS, TIMELINE_ROLES } from '$lib/data/resume';
</script>

<svelte:head>
	<title>Resume | Adarsh Krishnan</title>
	<meta name="description" content="Resume and experience of Adarsh Krishnan." />
	<link rel="canonical" href="https://adarshkrishnan.com/experiences/" />
</svelte:head>

<section class="panel p-5 md:p-6 fade-slide delay-1">
	<p class="kicker">Resume</p>
	<h1 class="section-title mb-2">Adarsh Krishnan</h1>
	<p class="text-sm text-surface-700">
		London, UK • <a href="mailto:adarshkrish@proton.me">adarshkrish@proton.me</a>
	</p>
	<p class="mt-3 max-w-3xl text-surface-800">
		Analytics and data practitioner with 4 years of experience delivering business impact through
		experimentation, reporting, and automation.
	</p>
</section>

<section class="panel p-5 md:p-6 fade-slide delay-2">
	<h2 class="section-title mb-2">Career Timeline</h2>
	<div class="timeline">
		{#each TIMELINE_ROLES as role (role.id)}
			<article class="timeline-item">
				<span class="timeline-dot" aria-hidden="true"></span>
				<div class={`card p-4 ${role.cardToneClass}`}>
					<p class="kicker mb-1">{role.period}</p>
					<h3 class="text-xl font-bold">{role.title} • {role.company}</h3>
					<p class="mt-2 text-surface-800">{role.summary}</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="panel p-5 md:p-6 fade-slide delay-3">
	<h2 class="section-title mb-3">Education</h2>
	<div class="grid gap-3">
		{#each EDUCATION_ITEMS as item (item.id)}
			<article class="card p-4 preset-tonal-surface">
				<p class="kicker mb-1">{item.year}</p>
				<h3 class="text-lg font-bold">{item.degree}</h3>
				<p class="text-surface-800">{item.institution}</p>
			</article>
		{/each}
	</div>
</section>
