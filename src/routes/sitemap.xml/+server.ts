import { getPostPreviews } from '$lib/server/blog';
import { SITE } from '$lib/site';

import type { RequestHandler } from './$types';

export const prerender = true;

const staticRoutes = ['/', '/about/', '/blog/', '/experiences/'];

export const GET: RequestHandler = async () => {
	const posts = await getPostPreviews();

	const urls = [
		...staticRoutes.map((route) => `${SITE.url}${route}`),
		...posts.map((post) => `${SITE.url}/blog/${post.slug}/`)
	];

	const body = urls
		.map((url) => `  <url><loc>${url}</loc></url>`)
		.join('\n');

	const xml =
		'<?xml version="1.0" encoding="UTF-8"?>\n' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
		`${body}\n` +
		'</urlset>\n';

	return new Response(xml, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'max-age=0, s-maxage=3600'
		}
	});
};
