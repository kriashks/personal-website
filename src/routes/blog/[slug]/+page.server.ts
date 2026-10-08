import { error } from '@sveltejs/kit';

import { getPost, getPostSlugs } from '$lib/server/content';

import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => (await getPostSlugs()).map((slug) => ({ slug }));

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPost(params.slug);
	if (!post) throw error(404, 'Post not found');
	return { post };
};
