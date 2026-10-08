#!/usr/bin/env node
/**
 * Posts every published blog post that has `linkedin.share == true` and no
 * `linkedin.sharedAt` to LinkedIn, then stamps `linkedin.sharedAt` in Sanity so
 * it is never posted twice. Runs in CI after the site has deployed.
 *
 * Env:
 *   PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN       Editor token (writes sharedAt)
 *   LINKEDIN_ACCESS_TOKEN    member token with scopes: openid profile w_member_social
 *   LINKEDIN_API_VERSION     optional, YYYYMM (defaults below)
 *   SITE_URL                 optional, defaults to https://adarshkrishnan.com
 *   DRY_RUN=1                print what would be posted, do not post or write
 */
import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? 'xsttrmdn';
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const sanityToken = process.env.SANITY_WRITE_TOKEN;
const linkedinToken = process.env.LINKEDIN_ACCESS_TOKEN;
const apiVersion = process.env.LINKEDIN_API_VERSION ?? '202509';
const siteUrl = (process.env.SITE_URL ?? 'https://adarshkrishnan.com').replace(/\/$/, '');
const dryRun = process.env.DRY_RUN === '1';

if (!linkedinToken) fail('LINKEDIN_ACCESS_TOKEN is not set.');
if (!sanityToken && !dryRun) fail('SANITY_WRITE_TOKEN is not set.');

const sanity = createClient({ projectId, dataset, token: sanityToken, apiVersion: '2025-10-01', useCdn: false });

const pending = await sanity.fetch(
	`*[_type == "post" && defined(slug.current) && linkedin.share == true && !defined(linkedin.sharedAt)]{
		_id, title, summary, "slug": slug.current, "message": linkedin.message
	}`
);

if (pending.length === 0) {
	console.log('Nothing to share.');
	process.exit(0);
}

const me = await linkedin('GET', 'https://api.linkedin.com/v2/userinfo');
const author = `urn:li:person:${me.sub}`;

for (const post of pending) {
	const url = `${siteUrl}/blog/${post.slug}/`;
	const commentary = (post.message?.trim() || `${post.title}\n\n${post.summary}`).slice(0, 2900);

	const body = {
		author,
		commentary,
		visibility: 'PUBLIC',
		distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
		content: { article: { source: url, title: post.title, description: post.summary } },
		lifecycleState: 'PUBLISHED',
		isReshareDisabledByAuthor: false
	};

	if (dryRun) {
		console.log(`[dry run] would post ${post.slug}:\n${JSON.stringify(body, null, 2)}`);
		continue;
	}

	const res = await linkedin('POST', 'https://api.linkedin.com/rest/posts', body, true);
	const postUrn = res.headers.get('x-restli-id') ?? res.headers.get('x-linkedin-id') ?? null;
	await sanity
		.patch(post._id)
		.set({ 'linkedin.sharedAt': new Date().toISOString(), ...(postUrn ? { 'linkedin.postUrn': postUrn } : {}) })
		.commit();
	console.log(`Shared ${post.slug}${postUrn ? ` (${postUrn})` : ''}`);
}

async function linkedin(method, url, body, rawResponse = false) {
	const res = await fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${linkedinToken}`,
			'LinkedIn-Version': apiVersion,
			'X-Restli-Protocol-Version': '2.0.0',
			'Content-Type': 'application/json'
		},
		body: body ? JSON.stringify(body) : undefined
	});
	if (!res.ok) {
		const text = await res.text();
		if (res.status === 401) {
			fail(`LinkedIn rejected the token (401). It has probably expired; run \`node scripts/linkedin-auth.mjs\` and update the LINKEDIN_ACCESS_TOKEN secret.\n${text}`);
		}
		fail(`LinkedIn ${method} ${url} failed: ${res.status}\n${text}`);
	}
	if (rawResponse) return res;
	return res.json();
}

function fail(message) {
	console.error(message);
	process.exit(1);
}
