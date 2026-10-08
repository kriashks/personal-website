import { error } from '@sveltejs/kit';

import { getAlbum, getAlbumSlugs } from '$lib/server/content';

import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => (await getAlbumSlugs()).map((slug) => ({ slug }));

export const load: PageServerLoad = async ({ params }) => {
	const album = await getAlbum(params.slug);
	if (!album) throw error(404, 'Album not found');
	return { album };
};
