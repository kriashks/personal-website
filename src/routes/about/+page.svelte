<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { ABOUT_EXPERIENCE, ABOUT_FOCUS, ABOUT_SKILLS } from '$lib/data/about';
</script>

<svelte:head>
	<title>About | Adarsh Krishnan</title>
	<meta name="description" content="About Adarsh Krishnan, based in London." />
	<link rel="canonical" href="https://adarshkrishnan.com/about/" />
</svelte:head>

<section class="page-shell">
	<header class="mb-12 sm:mb-16">
		<p class="terminal-command mb-4">$ cat about.md</p>
		<h1 class="terminal-heading mb-4 text-4xl sm:text-5xl md:text-6xl">About Me</h1>
		<p class="text-base text-gray-400 sm:text-lg">Developer, photographer, and analytics practitioner.</p>
	</header>

	<section class="mb-12 sm:mb-16" aria-labelledby="intro-heading">
		<h2 id="intro-heading" class="sr-only">Introduction</h2>
		<div class="terminal-card p-6 sm:p-8">
			<p class="leading-relaxed text-gray-300">
				I enjoy translating messy data into products and insights that teams can use immediately.
				Most of my day-to-day work sits at the intersection of experimentation, analytics strategy, and
				automation.
			</p>
			<p class="mt-4 leading-relaxed text-gray-300">
				This site is where I publish practical lessons from shipping data work and archive photography
				projects from outside of work.
			</p>
		</div>
	</section>

	<section class="mb-12 sm:mb-16" aria-labelledby="focus-heading">
		<h2 id="focus-heading" class="mb-6 font-mono text-2xl text-white sm:text-3xl">What I Do</h2>
		<div class="grid gap-4 sm:grid-cols-3 sm:gap-6">
			{#each ABOUT_FOCUS as item}
				<article class="terminal-card p-6">
					<Icon name={item.icon} className="mb-4 h-9 w-9 text-green-400" />
					<h3 class="mb-2 font-mono text-lg text-green-400 sm:text-xl">{item.title}</h3>
					<p class="text-sm text-gray-400 sm:text-base">{item.description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="mb-12 sm:mb-16" aria-labelledby="skills-heading">
		<h2 id="skills-heading" class="mb-6 font-mono text-2xl text-white sm:text-3xl">Skills & Technologies</h2>
		<div class="flex flex-wrap gap-3" role="list" aria-label="Skills and technologies">
			{#each ABOUT_SKILLS as skill}
				<span class="terminal-tag text-sm sm:text-base" role="listitem">{skill}</span>
			{/each}
		</div>
	</section>

	<section aria-labelledby="experience-heading">
		<h2 id="experience-heading" class="mb-6 font-mono text-2xl text-white sm:text-3xl">Experience</h2>
		<div class="space-y-5">
			{#each ABOUT_EXPERIENCE as role}
				<article class="terminal-card p-6 sm:p-8">
					<div class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
						<div>
							<h3 class="font-mono text-lg text-white sm:text-xl">{role.title}</h3>
							<p class="font-mono text-sm text-green-400 sm:text-base">{role.company}</p>
						</div>
						<span class="font-mono text-xs text-gray-500 sm:text-sm">{role.period}</span>
					</div>
					<p class="text-sm text-gray-400 sm:text-base">{role.description}</p>
				</article>
			{/each}
		</div>
	</section>
</section>
