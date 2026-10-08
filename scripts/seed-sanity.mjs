#!/usr/bin/env node
/**
 * One-time seed: pushes site settings, the about page, and the markdown posts in content/blog
 * into the Sanity dataset. Albums are not seeded (add real photographs in the Studio).
 *
 * Usage:
 *   node scripts/seed-sanity.mjs --ndjson > seed.ndjson   then   npx sanity dataset import seed.ndjson production --replace
 *   (run the import inside studio-personal-website/, using the CLI's own login; no API token needed)
 *   SANITY_WRITE_TOKEN=... node scripts/seed-sanity.mjs   writes directly with an Editor token
 *   node scripts/seed-sanity.mjs --dry-run              prints the documents as JSON
 * Reads PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET from .env if present.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

import { createClient } from '@sanity/client';
import { htmlToBlocks } from '@portabletext/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';
import matter from 'gray-matter';
import { marked } from 'marked';

const dryRun = process.argv.includes('--dry-run');
const ndjson = process.argv.includes('--ndjson');

async function loadEnv() {
	try {
		const raw = await fs.readFile(path.join(process.cwd(), '.env'), 'utf8');
		for (const line of raw.split('\n')) {
			const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
			if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
		}
	} catch {
		/* no .env */
	}
}
await loadEnv();

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId) throw new Error('PUBLIC_SANITY_PROJECT_ID missing');
if (!token && !dryRun && !ndjson) throw new Error('SANITY_WRITE_TOKEN missing (create an Editor token at sanity.io/manage)');

const client = createClient({ projectId, dataset, token, apiVersion: '2025-10-01', useCdn: false });

// Minimal schema so block-tools knows which styles/marks/lists are valid.
const schema = Schema.compile({
	name: 'seed',
	types: [
		{
			name: 'post',
			type: 'document',
			fields: [
				{
					name: 'body',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: ['normal', 'h2', 'h3', 'h4', 'blockquote'].map((v) => ({ title: v, value: v })),
							lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
							marks: {
								decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }, { title: 'Code', value: 'code' }],
								annotations: [{ name: 'link', type: 'object', fields: [{ name: 'href', type: 'url' }] }]
							}
						},
						{ type: 'object', name: 'code', fields: [{ name: 'code', type: 'text' }, { name: 'language', type: 'string' }] }
					]
				}
			]
		}
	]
});
const blockContentType = schema.get('post').fields.find((f) => f.name === 'body').type;

let keyN = 0;
const key = () => `seed${(keyN += 1)}`;

function markdownToBlocks(markdown) {
	const html = marked.parse(markdown, { async: false });
	return htmlToBlocks(html, blockContentType, {
		parseHtml: (h) => new JSDOM(h).window.document,
		rules: [
			{
				deserialize(el, next, block) {
					if (el.tagName?.toLowerCase() !== 'pre') return undefined;
					const codeEl = el.querySelector('code');
					const lang = (codeEl?.className.match(/language-([\w-]+)/) ?? [])[1];
					return block({ _type: 'code', _key: key(), code: (codeEl ?? el).textContent ?? '', language: lang ?? 'text' });
				}
			}
		]
	}).map((b) => ({ _key: key(), ...b, children: b.children?.map((c) => ({ _key: key(), ...c })) }));
}

function p(text) {
	return { _type: 'block', _key: key(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] };
}

const docs = [];

docs.push({
	_id: 'siteSettings',
	_type: 'siteSettings',
	siteName: 'Adarsh Krishnan',
	description: "Adarsh Krishnan's writing on analytics, experimentation and practical data systems, and photography from travel.",
	heroHeading: 'Adarsh Krishnan',
	heroSubheading: 'I build practical data systems, write about what works, and photograph the places in between.',
	blogIntro: 'Practical notes on analytics, experimentation and shipping data work.',
	photographyIntro: 'Cities, landscapes and wildlife, mostly from travel.',
	social: [
		{ _key: key(), label: 'GitHub', href: 'https://github.com/kriashks', icon: 'github' },
		{ _key: key(), label: 'LinkedIn', href: 'https://www.linkedin.com/in/kriash/', icon: 'linkedin' },
		{ _key: key(), label: 'Email', href: 'mailto:adarshkrish@proton.me', icon: 'mail' }
	]
});

docs.push({
	_id: 'aboutPage',
	_type: 'aboutPage',
	heading: 'About',
	tagline: 'Developer, photographer and analytics practitioner, based in London.',
	intro: [
		p('I enjoy translating messy data into products and insights that teams can use immediately. Most of my day-to-day work sits at the intersection of experimentation, analytics strategy, and automation.'),
		p('This site is where I publish practical lessons from shipping data work and archive photography projects from outside of work.')
	],
	focus: [
		{ _key: key(), title: 'Development', description: 'Building robust analytics products and internal tools with modern web technologies.' },
		{ _key: key(), title: 'Photography', description: 'Capturing travel and street moments that preserve atmosphere and story.' },
		{ _key: key(), title: 'Writing', description: 'Sharing practical lessons from experimentation, data strategy, and delivery.' }
	],
	skills: ['Python', 'SQL', 'SvelteKit', 'Experimentation', 'Causal Inference', 'Snowflake', 'Dashboarding', 'Automation', 'Product Analytics', 'Data Storytelling'],
	experience: [
		{ _key: key(), title: 'Data Consultant', company: 'Stonehaven', period: 'Jul 2023 - Present', description: 'Own end-to-end analytics delivery across data pipelines, reporting, and internal automation that accelerates decision cycles.' },
		{ _key: key(), title: 'Data Analyst', company: 'Stonehaven', period: 'Sep 2021 - Jul 2023', description: 'Built internal data exploration tools, delivered large-scale survey analytics, and drove product decisions with multi-source insights.' },
		{ _key: key(), title: 'Data Science Intern', company: 'Breathe Happy', period: 'Feb 2021 - Jun 2021', description: 'Developed computer vision prototypes for pose estimation and translated model outcomes into product recommendations.' }
	],
	education: [
		{ _key: key(), degree: 'M.Sc. Data Science (Distinction)', institution: 'London South Bank University', year: '2021' },
		{ _key: key(), degree: 'BS-MS in Physics', institution: 'IISER Mohali', year: '2019' }
	]
});

const blogDir = path.join(process.cwd(), 'content', 'blog');
for (const file of (await fs.readdir(blogDir)).filter((f) => f.endsWith('.md'))) {
	const { data, content } = matter(await fs.readFile(path.join(blogDir, file), 'utf8'));
	const slug = data.slug ?? file.replace(/\.md$/, '');
	const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
	docs.push({
		_id: `post-${slug}`,
		_type: 'post',
		title: data.title,
		slug: { _type: 'slug', current: slug },
		publishedAt: date,
		summary: data.summary ?? '',
		tags: Array.isArray(data.tags) ? data.tags : [],
		body: markdownToBlocks(content)
	});
}

if (ndjson) {
	process.stdout.write(docs.map((d) => JSON.stringify(d)).join('\n') + '\n');
	process.exit(0);
}

if (dryRun) {
	console.log(JSON.stringify(docs, null, 2));
	process.exit(0);
}

let tx = client.transaction();
for (const doc of docs) tx = tx.createOrReplace(doc);
const result = await tx.commit();
console.log(`Seeded ${docs.length} documents (transaction ${result.transactionId}).`);
