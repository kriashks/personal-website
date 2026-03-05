import { getPostPreviews } from '$lib/server/blog';
import { estimateReadTimeMinutes, fallbackTags } from '$lib/utils/blog';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const previews = await getPostPreviews();
	const posts = previews.map((post) => ({
		...post,
		readTime: estimateReadTimeMinutes(post.summary),
		tags: post.tags && post.tags.length > 0 ? post.tags.slice(0, 3) : fallbackTags(post.title)
	}));

	return { posts };
};
