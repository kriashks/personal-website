import { getLatestPostPreviews } from '$lib/server/blog';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const latestPosts = await getLatestPostPreviews(2);
	return { latestPosts };
};
