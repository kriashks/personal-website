export interface TimelineRole {
	id: string;
	period: string;
	title: string;
	company: string;
	summary: string;
	cardToneClass: string;
}

export interface EducationItem {
	id: string;
	year: string;
	degree: string;
	institution: string;
}

export const TIMELINE_ROLES: TimelineRole[] = [
	{
		id: 'stonehaven-consultant',
		period: 'Jul 2023 - Present',
		title: 'Data Consultant',
		company: 'Stonehaven',
		summary:
			'Own end-to-end analytics delivery across data pipelines, stakeholder reporting, and internal tooling, including automation work that reduced repetitive reporting effort and sped up decision cycles.',
		cardToneClass: 'preset-tonal-secondary'
	},
	{
		id: 'stonehaven-analyst',
		period: 'Sep 2021 - Jul 2023',
		title: 'Data Analyst',
		company: 'Stonehaven',
		summary:
			'Built an internal data exploration platform, delivered large-scale survey analytics, and combined multi-source historical datasets into practical insights used by commercial teams.',
		cardToneClass: 'preset-tonal-primary'
	},
	{
		id: 'breathehappy-intern',
		period: 'Feb 2021 - Jun 2021',
		title: 'Data Science Intern',
		company: 'Breathe Happy',
		summary:
			'Developed computer vision prototypes for pose estimation and communicated model outcomes to leadership to support product direction.',
		cardToneClass: 'preset-tonal-tertiary'
	}
];

export const EDUCATION_ITEMS: EducationItem[] = [
	{
		id: 'msc-data-science',
		year: '2021',
		degree: 'M.Sc. Data Science (Distinction)',
		institution: 'London South Bank University'
	},
	{
		id: 'bsms-physics',
		year: '2019',
		degree: 'BS-MS in Physics',
		institution: 'IISER Mohali'
	}
];
