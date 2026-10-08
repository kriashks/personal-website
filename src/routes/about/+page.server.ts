import { getAbout } from '$lib/server/content';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { about: await getAbout() };
};
