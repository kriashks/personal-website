import { getAlbums, getPosts } from '$lib/server/content';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [posts, albums] = await Promise.all([getPosts(), getAlbums()]);
	const featured = albums.filter((a) => a.featured);
	return {
		latestPosts: posts.slice(0, 3),
		featuredAlbums: (featured.length ? featured : albums).slice(0, 2)
	};
};
