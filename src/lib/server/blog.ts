import { promises as fs } from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { marked } from 'marked';

import type { BlogPost, BlogPostPreview } from '$lib/types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const shouldCachePosts = process.env.NODE_ENV === 'production';

let cachedPostsPromise: Promise<BlogPost[]> | null = null;

function toSlug(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, '-');
}

function isMarkdownFile(filePath: string): boolean {
	return filePath.endsWith('.md') || filePath.endsWith('.markdown');
}

function summaryFromBody(markdown: string): string {
	const firstParagraph = markdown
		.split(/\n\s*\n/g)
		.map((chunk) => chunk.trim())
		.find(Boolean);

	if (!firstParagraph) return 'Draft post summary.';

	return firstParagraph
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\*([^*]+)\*/g, '$1')
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
		.replace(/#+\s?/g, '')
		.slice(0, 180);
}

function normalizeDate(rawDate: unknown, source: string): string {
	if (rawDate instanceof Date && !Number.isNaN(rawDate.getTime())) {
		return rawDate.toISOString().slice(0, 10);
	}

	if (typeof rawDate !== 'string' || !rawDate.trim()) {
		throw new Error(`Missing required front matter "date" in ${source}.`);
	}

	const normalized = rawDate.trim();
	if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
		throw new Error(
			`Invalid date format "${rawDate}" in ${source}. Use YYYY-MM-DD.`
		);
	}

	return normalized;
}

function normalizeOptionalDate(rawDate: unknown, source: string, fieldName: string): string | undefined {
	if (rawDate === undefined || rawDate === null || rawDate === '') {
		return undefined;
	}

	if (rawDate instanceof Date && !Number.isNaN(rawDate.getTime())) {
		return rawDate.toISOString().slice(0, 10);
	}

	if (typeof rawDate !== 'string' || !rawDate.trim()) {
		throw new Error(`Invalid front matter "${fieldName}" in ${source}. Use YYYY-MM-DD.`);
	}

	const normalized = rawDate.trim();
	if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
		throw new Error(
			`Invalid ${fieldName} format "${rawDate}" in ${source}. Use YYYY-MM-DD.`
		);
	}

	return normalized;
}

function parsePost(source: string, rawMarkdown: string): BlogPost {
	const { data, content } = matter(rawMarkdown);

	const title = typeof data.title === 'string' ? data.title.trim() : '';
	const date = normalizeDate(data.date, source);
	const lastmod = normalizeOptionalDate(data.lastmod, source, 'lastmod');
	const slug =
		typeof data.slug === 'string' && data.slug.trim()
			? toSlug(data.slug)
			: toSlug(title || path.basename(source, path.extname(source)));
	const summary =
		typeof data.summary === 'string' && data.summary.trim()
			? data.summary.trim()
			: summaryFromBody(content);
	const tags = Array.isArray(data.tags)
		? data.tags
				.filter((tag): tag is string => typeof tag === 'string')
				.map((tag) => tag.trim())
				.filter(Boolean)
				.slice(0, 4)
		: undefined;

	if (!title) {
		throw new Error(`Missing required front matter "title" in ${source}.`);
	}

	if (!slug) {
		throw new Error(`Could not generate a valid slug for ${source}.`);
	}

	const html = marked.parse(content, {
		async: false,
		gfm: true
	}) as string;

	return {
		title,
		date,
		lastmod,
		slug,
		summary,
		tags,
		html
	};
}

async function readPostFiles(): Promise<string[]> {
	try {
		const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
		return entries
			.filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
			.map((entry) => path.join(BLOG_DIR, entry.name));
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
			return [];
		}

		throw error;
	}
}

async function readAllPostsFromDisk(): Promise<BlogPost[]> {
	const filePaths = await readPostFiles();

	const posts = await Promise.all(
		filePaths.map(async (filePath) => {
			const raw = await fs.readFile(filePath, 'utf8');
			return parsePost(filePath, raw);
		})
	);

	return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getAllPosts(): Promise<BlogPost[]> {
	if (!shouldCachePosts) {
		return readAllPostsFromDisk();
	}

	if (!cachedPostsPromise) {
		cachedPostsPromise = readAllPostsFromDisk().catch((error) => {
			cachedPostsPromise = null;
			throw error;
		});
	}

	return cachedPostsPromise;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
	const normalizedSlug = toSlug(slug);
	const posts = await getAllPosts();
	return posts.find((post) => post.slug === normalizedSlug);
}

export async function getPostPreviews(): Promise<BlogPostPreview[]> {
	const posts = await getAllPosts();
	return posts.map(({ html: _html, ...preview }) => preview);
}

export async function getLatestPostPreviews(count = 2): Promise<BlogPostPreview[]> {
	const posts = await getPostPreviews();
	return posts.slice(0, count);
}

export async function getPostEntries(): Promise<Array<{ slug: string }>> {
	const posts = await getPostPreviews();
	return posts.map((post) => ({ slug: post.slug }));
}
