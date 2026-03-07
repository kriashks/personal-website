import { error } from '@sveltejs/kit';

import { getPostBySlug, getPostEntries, getPostPreviews } from '$lib/server/blog';
import { estimateReadTimeMinutes, fallbackTags } from '$lib/utils/blog';

import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => {
	return getPostEntries();
};

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const olderPosts = (await getPostPreviews())
		.filter((entry) => entry.slug !== post.slug)
		.map((entry) => ({
			...entry,
			readTime: estimateReadTimeMinutes(entry.summary),
			tags:
				entry.tags && entry.tags.length > 0 ? entry.tags.slice(0, 3) : fallbackTags(entry.title)
		}));

	return { post, olderPosts };
};
