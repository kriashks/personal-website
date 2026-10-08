<script lang="ts">
	import Picture from '$lib/components/Picture.svelte';
	import Reveal from '$lib/components/Reveal.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import { SITE } from '$lib/site';

	let { data } = $props();
	const about = $derived(data.about);
</script>

<svelte:head>
	<title>About | {data.settings.siteName}</title>
	<meta name="description" content={about?.tagline ?? `About ${data.settings.siteName}.`} />
	<link rel="canonical" href={`${SITE.url}/about/`} />
</svelte:head>

{#if !about}
	<section class="page-head container">
		<h1 class="title-1">About</h1>
		<p class="lede">This page has not been written yet.</p>
	</section>
{:else}
	<section class="page-head container">
		<h1 class="title-1">{about.heading}</h1>
		{#if about.tagline}<p class="lede">{about.tagline}</p>{/if}
	</section>

	{#if about.portrait}
		<section class="container pb-12">
			<Reveal>
				<div class="frame mx-auto" style="max-width: 36rem; aspect-ratio: 4 / 5;">
					<Picture image={about.portrait} alt={about.portrait.alt ?? about.heading} ratio={4 / 5} sizes="(min-width: 40rem) 36rem, 100vw" priority />
				</div>
			</Reveal>
		</section>
	{/if}

	{#if about.intro.length}
		<section class="container-prose pb-16">
			<Reveal><RichText value={about.intro} class="prose" /></Reveal>
		</section>
	{/if}

	{#if about.focus.length}
		<section class="section band">
			<div class="container">
				<Reveal><h2 class="title-2">What I do</h2></Reveal>
				<div class="about-grid mt-10">
					{#each about.focus as item, i}
						<Reveal delay={i * 70}>
							<div class="about-item">
								<h3>{item.title}</h3>
								{#if item.description}<p>{item.description}</p>{/if}
							</div>
						</Reveal>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if about.experience.length || about.education.length}
		<section class="section">
			<div class="container">
				{#if about.experience.length}
					<Reveal><h2 class="title-2">Experience</h2></Reveal>
					<ul class="timeline mt-8">
						{#each about.experience as role, i}
							<Reveal delay={i * 50}>
								<li>
									<span class="period">{role.period}</span>
									<div>
										<h3>{role.title}{role.company ? `, ${role.company}` : ''}</h3>
										{#if role.description}<p>{role.description}</p>{/if}
									</div>
								</li>
							</Reveal>
						{/each}
					</ul>
				{/if}
				{#if about.education.length}
					<Reveal><h2 class="title-2 mt-20">Education</h2></Reveal>
					<ul class="timeline mt-8">
						{#each about.education as item}
							<li>
								<span class="period">{item.year}</span>
								<div>
									<h3>{item.degree}</h3>
									{#if item.institution}<p class="org">{item.institution}</p>{/if}
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</section>
	{/if}

	{#if about.skills.length}
		<section class="section-tight">
			<div class="container">
				<Reveal><h2 class="title-3">Skills</h2></Reveal>
				<ul class="chips mt-5 list-none p-0 m-0" aria-label="Skills">
					{#each about.skills as skill}<li class="tag">{skill}</li>{/each}
				</ul>
			</div>
		</section>
	{/if}
{/if}
