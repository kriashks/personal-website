import { createClient, type SanityClient } from '@sanity/client';

import { apiVersion, dataset, projectId } from '$lib/sanity/config';

let cached: SanityClient | null = null;

export function sanity(): SanityClient {
	if (!projectId) {
		throw new Error('PUBLIC_SANITY_PROJECT_ID is not set. Copy .env.example to .env.');
	}
	cached ??= createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' });
	return cached;
}
