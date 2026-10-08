import { getPosts, getSettings } from '$lib/server/content';
import { SITE } from '$lib/site';

import type { RequestHandler } from './$types';

export const prerender = true;

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const toDate = (value: string) =>
	new Date(value.length === 10 ? `${value}T00:00:00Z` : value).toUTCString();

export const GET: RequestHandler = async () => {
	const [settings, posts] = await Promise.all([getSettings(), getPosts()]);

	const sorted = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

	const items = sorted.map((post) => {
		const link = `${SITE.url}/blog/${post.slug}/`;
		return [
			'    <item>',
			`      <title>${escapeXml(post.title)}</title>`,
			`      <link>${escapeXml(link)}</link>`,
			`      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
			`      <pubDate>${toDate(post.publishedAt)}</pubDate>`,
			`      <description>${escapeXml(post.summary)}</description>`,
			'    </item>'
		].join('\n');
	});

	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
		'  <channel>',
		`    <title>${escapeXml(settings.siteName)}</title>`,
		`    <link>${escapeXml(SITE.url)}</link>`,
		`    <description>${escapeXml(settings.description)}</description>`,
		'    <language>en</language>',
		`    <atom:link href="${escapeXml(`${SITE.url}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
		...items,
		'  </channel>',
		'</rss>',
		''
	].join('\n');

	return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
};
