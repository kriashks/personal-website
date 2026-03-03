export const SITE = {
	name: 'Adarsh Krishnan',
	tagline: 'Data Scientist',
	description:
		'Personal website of Adarsh Krishnan, focused on decision science, analytics, and data automation.',
	url: 'https://adarshkrishnan.com'
} as const;

export const NAV_LINKS = [
	{ href: '/', label: 'Home' },
	{ href: '/about/', label: 'About' },
	{ href: '/projects/', label: 'Projects' },
	{ href: '/blog/', label: 'Blog' },
	{ href: '/experiences/', label: 'Resume' }
] as const;
