import { error } from '@sveltejs/kit';

import { getPostBySlug, getPostEntries } from '$lib/server/blog';

import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => {
	return getPostEntries();
};

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return { post };
};
