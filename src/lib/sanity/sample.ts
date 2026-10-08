/**
 * Sample content used when PUBLIC_SANITY_SAMPLE=1 or no project id is set.
 * Photographs are Unsplash placeholders, not the owner's work, and are labelled as such in the UI.
 */
import type { PortableTextBlock } from '@portabletext/types';
import type { AboutPage, Album, ImageRef, Post, SiteSettings } from './types';

let keyCounter = 0;
const key = () => `k${(keyCounter += 1)}`;

function unsplash(id: string, w: number, h: number, alt: string): ImageRef {
	return {
		url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`,
		alt,
		metadata: { dimensions: { width: w, height: h, aspectRatio: w / h } }
	};
}

function p(text: string, style: 'normal' | 'h2' | 'h3' | 'blockquote' = 'normal'): PortableTextBlock {
	return { _type: 'block', _key: key(), style, markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] };
}

function li(text: string, listItem: 'bullet' | 'number' = 'bullet'): PortableTextBlock {
	return { ...p(text), listItem, level: 1 };
}

function code(code: string, language: string, filename?: string): PortableTextBlock {
	return { _type: 'code', _key: key(), code, language, filename } as unknown as PortableTextBlock;
}

export const SAMPLE_SETTINGS: SiteSettings = {
	siteName: 'Adarsh Krishnan',
	description: "Adarsh Krishnan's writing on analytics, experimentation and practical data systems, and photography from travel.",
	heroHeading: 'Adarsh Krishnan',
	heroSubheading: 'I build practical data systems, write about what works, and photograph the places in between.',
	heroImage: unsplash('photo-1470071459604-3b5ec3a7fe05', 2400, 1600, 'Sample placeholder: a mountain valley under morning fog'),
	blogIntro: 'Practical notes on analytics, experimentation and shipping data work.',
	photographyIntro: 'Cities, landscapes and wildlife, mostly from travel.',
	social: [
		{ label: 'GitHub', href: 'https://github.com/kriashks', icon: 'github' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/kriash/', icon: 'linkedin' },
		{ label: 'Email', href: 'mailto:adarshkrish@proton.me', icon: 'mail' }
	]
};

export const SAMPLE_POSTS: Post[] = [
	{
		slug: 'install-linux-instead-windows',
		title: 'Should you install Linux instead of Windows?',
		publishedAt: '2026-03-07',
		updatedAt: '2026-03-07',
		summary: 'Musings on choosing Linux instead of Windows.',
		tags: ['Linux', 'Opinion'],
		readTime: '1 min read',
		coverImage: null,
		body: [
			p('Bioinformatics combines biology and computing to analyze biological data such as sequences, expression data, and protein structures.'),
			p('Why it matters', 'h2'),
			li('Accelerates drug discovery and biomarker research.'),
			li('Supports personalized medicine with genomic analysis.'),
			li('Enables large-scale analysis impossible to do manually.'),
			p('Core skills', 'h2'),
			li('Statistics and machine learning.'),
			li('Programming in Python or R.'),
			li('Strong foundation in molecular biology.')
		]
	},
	{
		slug: 'how-to-use-streamlit-for-interactive-data-visualisations',
		title: 'How to use Streamlit for interactive Data Visualisations?',
		publishedAt: '2026-01-15',
		updatedAt: '2026-01-15',
		summary: 'A concise introduction to using Streamlit for building interactive data visualizations in Python.',
		tags: ['Python', 'Streamlit'],
		readTime: '1 min read',
		coverImage: unsplash('photo-1551288049-bebda4e38f71', 2000, 1333, 'Sample placeholder: a dashboard on a laptop screen'),
		body: [
			p('Streamlit is a lightweight framework that makes it easy to build interactive data apps using Python.'),
			p('Practical learning path', 'h2'),
			li('Build basic UI blocks: text, charts, inputs, and layout primitives.', 'number'),
			li('Connect to real data and add useful filters.', 'number'),
			li('Add caching and state management for better UX.', 'number'),
			li('Deploy and iterate from stakeholder feedback.', 'number'),
			code(`import streamlit as st\nimport pandas as pd\n\n@st.cache_data\ndef load(path: str) -> pd.DataFrame:\n    return pd.read_parquet(path)\n\ndf = load("events.parquet")\nst.line_chart(df.set_index("day")["sessions"])`, 'python', 'app.py'),
			p('Why this works', 'h2'),
			p('Start with a real internal workflow and solve one pain point end-to-end.'),
			p('The fastest way to learn a tool is to ship something small with it that someone else uses on Monday.', 'blockquote')
		]
	}
];

export const SAMPLE_ALBUMS: Album[] = [
	{
		slug: 'urban-nights',
		title: 'Urban Nights',
		description: 'City lights and architecture after dark.',
		date: '2024-06-01',
		featured: true,
		cover: unsplash('photo-1679097844800-b0cb637306ee', 1600, 1067, 'Sample placeholder: neon street at night'),
		photoCount: 3,
		photos: [
			{ key: 'u1', image: unsplash('photo-1679097844800-b0cb637306ee', 1600, 1067, 'Sample placeholder: neon street at night'), title: 'Shibuya after dark', caption: 'Neon paints the crossing in electric hues.', location: 'Tokyo', camera: 'Sony A7 III', lens: '24-70mm f/2.8', aperture: 'f/2.8', shutter: '1/60s', iso: '3200' },
			{ key: 'u2', image: unsplash('photo-1570304816841-906a17d7b067', 1600, 1067, 'Sample placeholder: Manhattan skyline at dusk'), title: 'Manhattan at golden hour', caption: 'From Brooklyn Bridge Park, waiting for the lights.', location: 'New York', camera: 'Sony A7 III', lens: '70-200mm f/2.8', aperture: 'f/8', shutter: '1/250s', iso: '400' },
			{ key: 'u3', image: unsplash('photo-1745016176874-cd3ed3f5bfc6', 1067, 1600, 'Sample placeholder: Big Ben at twilight'), title: 'Westminster, twilight', caption: 'Big Ben against the last of the blue hour.', location: 'London', camera: 'Sony A7 III', lens: '24-70mm f/2.8', aperture: 'f/5.6', shutter: '1/125s', iso: '1600' }
		]
	},
	{
		slug: 'natural-wonders',
		title: 'Natural Wonders',
		description: 'Raw landscapes in dramatic light.',
		date: '2023-09-14',
		featured: true,
		cover: unsplash('photo-1665073018619-9e8d648a8a45', 1600, 1067, 'Sample placeholder: sunset coastline'),
		photoCount: 3,
		photos: [
			{ key: 'n1', image: unsplash('photo-1665073018619-9e8d648a8a45', 1600, 1067, 'Sample placeholder: sunset coastline'), title: 'Golden coast', caption: 'Sunset on the shoreline as the tide comes in.', camera: 'Nikon Z7', lens: '24-120mm f/4', aperture: 'f/16', shutter: '1/60s', iso: '100' },
			{ key: 'n2', image: unsplash('photo-1717008236999-26cdf9024648', 1067, 1600, 'Sample placeholder: waterfall long exposure'), title: 'Flowing water', caption: 'A four second exposure turns the fall to silk.', camera: 'Nikon Z7', lens: '70-200mm f/2.8', aperture: 'f/22', shutter: '4s', iso: '64' },
			{ key: 'n3', image: unsplash('photo-1723566424162-3f0ce22a99a3', 1600, 1067, 'Sample placeholder: aurora over snow'), title: 'Arctic sky', caption: 'Aurora sweeping across the night.', camera: 'Nikon Z7', lens: '14-24mm f/2.8', aperture: 'f/2.8', shutter: '20s', iso: '2500' }
		]
	},
	{
		slug: 'wildlife',
		title: 'Wildlife',
		description: 'Portraits of animals in their own places.',
		date: '2023-03-02',
		featured: false,
		cover: unsplash('photo-1575039804649-12b9734bcd96', 1600, 1067, 'Sample placeholder: lion on the savanna'),
		photoCount: 3,
		photos: [
			{ key: 'w1', image: unsplash('photo-1575039804649-12b9734bcd96', 1600, 1067, 'Sample placeholder: lion on the savanna'), title: 'King of the savanna', camera: 'Canon EOS R5', lens: '100-500mm', aperture: 'f/5.6', shutter: '1/1000s', iso: '800' },
			{ key: 'w2', image: unsplash('photo-1578935028408-f9413a9c7356', 1600, 1067, 'Sample placeholder: elephants at sunset'), title: 'Giants crossing', camera: 'Canon EOS R5', lens: '100-500mm', aperture: 'f/8', shutter: '1/500s', iso: '400' },
			{ key: 'w3', image: unsplash('photo-1556597386-347226bd1776', 1600, 1067, 'Sample placeholder: eagle in flight'), title: 'Full extension', camera: 'Canon EOS R5', lens: '100-500mm', aperture: 'f/5.6', shutter: '1/2000s', iso: '640' }
		]
	}
];

export const SAMPLE_ABOUT: AboutPage = {
	heading: 'About',
	tagline: 'Developer, photographer and analytics practitioner, based in London.',
	portrait: null,
	intro: [
		p('I enjoy translating messy data into products and insights that teams can use immediately. Most of my day-to-day work sits at the intersection of experimentation, analytics strategy, and automation.'),
		p('This site is where I publish practical lessons from shipping data work and archive photography projects from outside of work.')
	],
	focus: [
		{ title: 'Development', description: 'Building robust analytics products and internal tools with modern web technologies.' },
		{ title: 'Photography', description: 'Capturing travel and street moments that preserve atmosphere and story.' },
		{ title: 'Writing', description: 'Sharing practical lessons from experimentation, data strategy, and delivery.' }
	],
	skills: ['Python', 'SQL', 'SvelteKit', 'Experimentation', 'Causal Inference', 'Snowflake', 'Dashboarding', 'Automation', 'Product Analytics', 'Data Storytelling'],
	experience: [
		{ title: 'Data Consultant', company: 'Stonehaven', period: 'Jul 2023 - Present', description: 'Own end-to-end analytics delivery across data pipelines, reporting, and internal automation that accelerates decision cycles.' },
		{ title: 'Data Analyst', company: 'Stonehaven', period: 'Sep 2021 - Jul 2023', description: 'Built internal data exploration tools, delivered large-scale survey analytics, and drove product decisions with multi-source insights.' },
		{ title: 'Data Science Intern', company: 'Breathe Happy', period: 'Feb 2021 - Jun 2021', description: 'Developed computer vision prototypes for pose estimation and translated model outcomes into product recommendations.' }
	],
	education: [
		{ degree: 'M.Sc. Data Science (Distinction)', institution: 'London South Bank University', year: '2021' },
		{ degree: 'BS-MS in Physics', institution: 'IISER Mohali', year: '2019' }
	]
};
