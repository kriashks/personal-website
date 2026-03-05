import type { IconName } from '$lib/types/icon';

export interface NavLink {
	href: string;
	label: string;
	icon: IconName;
}

export const NAV_LINKS: NavLink[] = [
	{ href: '/', label: 'home', icon: 'terminal' },
	{ href: '/blog/', label: 'blog', icon: 'book' },
	{ href: '/photography/', label: 'photography', icon: 'camera' },
	{ href: '/about/', label: 'about', icon: 'user' }
];
