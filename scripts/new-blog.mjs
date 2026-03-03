#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const TEMPLATE_PATH = path.join(ROOT, 'templates', 'blog-post.md');

const usage = `Usage:
  npm run blog:new -- --title "Your Post Title" [--summary "One-line summary"] [--slug "custom-slug"] [--date YYYY-MM-DD]

Examples:
  npm run blog:new -- --title "How I Evaluate Experiments"
  npm run blog:new -- --title "Shipping Reliable Dashboards" --summary "A checklist for production dashboards"
`;

function slugify(input) {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, '-');
}

function assertValidDate(date) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		throw new Error(`Invalid date \"${date}\". Use format YYYY-MM-DD.`);
	}
}

async function main() {
	const { values } = parseArgs({
		options: {
			title: { type: 'string' },
			summary: { type: 'string' },
			slug: { type: 'string' },
			date: { type: 'string' },
			help: { type: 'boolean', short: 'h' }
		}
	});

	if (values.help) {
		console.log(usage);
		return;
	}

	if (!values.title) {
		throw new Error(`Missing --title.\n\n${usage}`);
	}

	const title = values.title.trim();
	const slug = values.slug ? slugify(values.slug) : slugify(title);
	const date = values.date ?? new Date().toISOString().slice(0, 10);
	const summary =
		values.summary?.trim() ??
		'Add a one-line summary that appears on the blog list and metadata.';

	if (!slug) {
		throw new Error('Unable to derive a valid slug from the provided title.');
	}

	assertValidDate(date);

	const targetPath = path.join(CONTENT_DIR, `${slug}.md`);
	await fs.mkdir(CONTENT_DIR, { recursive: true });

	try {
		await fs.access(targetPath);
		throw new Error(`Post already exists at ${targetPath}`);
	} catch (error) {
		if (error.code && error.code !== 'ENOENT') throw error;
	}

	const template = await fs.readFile(TEMPLATE_PATH, 'utf8');
	const output = template
		.replaceAll('{{TITLE}}', title)
		.replaceAll('{{DATE}}', date)
		.replaceAll('{{SLUG}}', slug)
		.replaceAll('{{SUMMARY}}', summary);

	await fs.writeFile(targetPath, output, 'utf8');

	console.log(`Created ${targetPath}`);
	console.log('Next steps:');
	console.log(`1. Edit ${targetPath}`);
	console.log('2. Run npm run dev and preview /blog/');
	console.log('3. Commit the new markdown file');
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
