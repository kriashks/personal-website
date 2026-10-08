import { env } from '$env/dynamic/public';

export const projectId = env.PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = env.PUBLIC_SANITY_DATASET ?? 'production';
export const useSample = env.PUBLIC_SANITY_SAMPLE === '1' || !projectId;
export const apiVersion = '2025-10-01';
