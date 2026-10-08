import { getAlbumSlugs, getPostSlugs } from '$lib/server/content';
import { SITE } from '$lib/site';

import type { RequestHandler } from './$types';

export const prerender = true;

const staticRoutes = ['/', '/about/', '/blog/', '/photography/'];

export const GET: RequestHandler = async () => {
	const [posts, albums] = await Promise.all([getPostSlugs(), getAlbumSlugs()]);

	const urls = [
		...staticRoutes.map((route) => `${SITE.url}${route}`),
		...posts.map((slug) => `${SITE.url}/blog/${slug}/`),
		...albums.map((slug) => `${SITE.url}/photography/${slug}/`)
	];

	const body = urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n');
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

	return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
};
