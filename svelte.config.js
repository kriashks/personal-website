import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html'
		}),
		prerender: {
			handleHttpError: 'warn',
			// Dynamic routes may have no entries yet (e.g. no albums published); that is not an error.
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
