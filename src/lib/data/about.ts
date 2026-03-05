import type { IconName } from '$lib/types/icon';

export interface AboutFocusItem {
	title: string;
	description: string;
	icon: IconName;
}

export interface ExperienceItem {
	title: string;
	company: string;
	period: string;
	description: string;
}

export const ABOUT_FOCUS: AboutFocusItem[] = [
	{
		title: 'Development',
		description:
			'Building robust analytics products and internal tools with modern web technologies.',
		icon: 'code'
	},
	{
		title: 'Photography',
		description: 'Capturing travel and street moments that preserve atmosphere and story.',
		icon: 'heart'
	},
	{
		title: 'Writing',
		description: 'Sharing practical lessons from experimentation, data strategy, and delivery.',
		icon: 'briefcase'
	}
];

export const ABOUT_SKILLS: string[] = [
	'Python',
	'SQL',
	'SvelteKit',
	'Experimentation',
	'Causal Inference',
	'Snowflake',
	'Dashboarding',
	'Automation',
	'Product Analytics',
	'Data Storytelling'
];

export const ABOUT_EXPERIENCE: ExperienceItem[] = [
	{
		title: 'Data Consultant',
		company: 'Stonehaven',
		period: 'Jul 2023 - Present',
		description:
			'Own end-to-end analytics delivery across data pipelines, reporting, and internal automation that accelerates decision cycles.'
	},
	{
		title: 'Data Analyst',
		company: 'Stonehaven',
		period: 'Sep 2021 - Jul 2023',
		description:
			'Built internal data exploration tools, delivered large-scale survey analytics, and drove product decisions with multi-source insights.'
	},
	{
		title: 'Data Science Intern',
		company: 'Breathe Happy',
		period: 'Feb 2021 - Jun 2021',
		description:
			'Developed computer vision prototypes for pose estimation and translated model outcomes into product recommendations.'
	}
];
