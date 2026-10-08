import { getSettings, isSampleContent } from '$lib/server/content';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const settings = await getSettings();
	return { settings, isSampleContent };
};
