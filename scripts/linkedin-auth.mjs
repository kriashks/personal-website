#!/usr/bin/env node
/**
 * One-time (and every ~60 days) web login that mints a LinkedIn member token.
 *
 * 1. Create an app at https://www.linkedin.com/developers/apps (free). Under
 *    Products, add "Share on LinkedIn" and "Sign In with LinkedIn using OpenID Connect".
 * 2. Under Auth, add http://localhost:8765/callback as an authorized redirect URL
 *    and copy the Client ID and Client Secret.
 * 3. Run: LINKEDIN_CLIENT_ID=... LINKEDIN_CLIENT_SECRET=... node scripts/linkedin-auth.mjs
 *    A browser opens; approve; the token prints here. Put it in the GitHub secret
 *    LINKEDIN_ACCESS_TOKEN. Tokens last 60 days.
 */
import http from 'node:http';
import { exec } from 'node:child_process';
import { randomBytes } from 'node:crypto';

const clientId = process.env.LINKEDIN_CLIENT_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
if (!clientId || !clientSecret) {
	console.error('Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET (see the comment at the top of this file).');
	process.exit(1);
}

const port = 8765;
const redirectUri = `http://localhost:${port}/callback`;
const state = randomBytes(16).toString('hex');
const scope = 'openid profile w_member_social';
const authUrl =
	'https://www.linkedin.com/oauth/v2/authorization?' +
	new URLSearchParams({ response_type: 'code', client_id: clientId, redirect_uri: redirectUri, state, scope });

const server = http.createServer(async (req, res) => {
	const url = new URL(req.url, redirectUri);
	if (url.pathname !== '/callback') return res.end();
	if (url.searchParams.get('state') !== state) {
		res.end('State mismatch; try again.');
		return;
	}
	const code = url.searchParams.get('code');
	try {
		const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code,
				redirect_uri: redirectUri,
				client_id: clientId,
				client_secret: clientSecret
			})
		});
		const token = await tokenRes.json();
		if (!tokenRes.ok) throw new Error(JSON.stringify(token));
		const days = Math.round((token.expires_in ?? 0) / 86400);
		res.end('Done. You can close this tab and return to the terminal.');
		console.log(`\nLINKEDIN_ACCESS_TOKEN=${token.access_token}\n\nExpires in about ${days} days. Add it as a GitHub Actions secret named LINKEDIN_ACCESS_TOKEN.`);
	} catch (err) {
		res.end('Token exchange failed; see terminal.');
		console.error(err);
	} finally {
		server.close();
	}
});

server.listen(port, () => {
	console.log('Opening LinkedIn in your browser. If it does not open, visit:\n' + authUrl);
	exec(`open "${authUrl}"`);
});
