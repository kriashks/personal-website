import { error } from '@sveltejs/kit';

import { getPost, getPosts, getPostSlugs } from '$lib/server/content';

import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => (await getPostSlugs()).map((slug) => ({ slug }));

export const load: PageServerLoad = async ({ params }) => {
	const [post, all] = await Promise.all([getPost(params.slug), getPosts()]);
	if (!post) throw error(404, 'Post not found');
	const olderPosts = all.filter((p) => p.slug !== post.slug).slice(0, 4);
	return { post, olderPosts };
};
