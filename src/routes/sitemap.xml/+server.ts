import { getAlbumSlugs, getPosts } from '$lib/server/content';
import { SITE } from '$lib/site';

import type { RequestHandler } from './$types';

export const prerender = true;

const staticRoutes = ['/', '/about/', '/blog/', '/photography/'];

export const GET: RequestHandler = async () => {
	const [posts, albums] = await Promise.all([getPosts(), getAlbumSlugs()]);

	const urls = [
		...staticRoutes.map((route) => `  <url><loc>${SITE.url}${route}</loc></url>`),
		...posts.map(
			(post) =>
				`  <url><loc>${SITE.url}/blog/${post.slug}/</loc><lastmod>${post.updatedAt ?? post.publishedAt}</lastmod></url>`
		),
		...albums.map((slug) => `  <url><loc>${SITE.url}/photography/${slug}/</loc></url>`)
	];

	const body = urls.join('\n');
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

	return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
};
