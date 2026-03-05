import type { IconName } from '$lib/types/icon';

export const SITE = {
	name: 'Adarsh Krishnan',
	description:
		'Personal website of Adarsh Krishnan, focused on analytics, experimentation, and practical data systems.',
	url: 'https://adarshkrishnan.com'
} as const;

export interface SocialLink {
	href: string;
	label: string;
	icon: IconName;
	external?: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
	{
		href: 'https://github.com/kriashks',
		label: 'GitHub',
		icon: 'github',
		external: true
	},
	{
		href: 'https://www.linkedin.com/in/kriash/',
		label: 'LinkedIn',
		icon: 'linkedin',
		external: true
	},
	{
		href: 'mailto:adarshkrish@proton.me',
		label: 'Email',
		icon: 'mail'
	}
];
