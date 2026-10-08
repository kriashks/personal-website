export interface NavLink {
	href: string;
	label: string;
}

export const NAV_LINKS: NavLink[] = [
	{ href: '/blog/', label: 'Blog' },
	{ href: '/photography/', label: 'Photography' },
	{ href: '/about/', label: 'About' }
];
