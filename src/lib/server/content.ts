import { sanity } from '$lib/server/sanity';
import { useSample } from '$lib/sanity/config';
import * as q from '$lib/sanity/queries';
import { plainText, readTime } from '$lib/sanity/readtime';
import { SAMPLE_ABOUT, SAMPLE_ALBUMS, SAMPLE_POSTS, SAMPLE_SETTINGS } from '$lib/sanity/sample';
import type { AboutPage, Album, AlbumPreview, Post, PostPreview, SiteSettings } from '$lib/sanity/types';

export const isSampleContent = useSample;

const DEFAULT_SETTINGS: SiteSettings = {
	siteName: 'Adarsh Krishnan',
	description: 'Personal website of Adarsh Krishnan.',
	heroHeading: 'Adarsh Krishnan',
	heroSubheading: '',
	heroImage: null,
	blogIntro: '',
	photographyIntro: '',
	social: []
};

type RawPost = Omit<PostPreview, 'readTime'> & { plain?: string; body?: Post['body'] };

function withReadTime<T extends RawPost>(post: T): T & { readTime: string } {
	const text = post.plain ?? plainText(post.body);
	return { ...post, readTime: readTime(text), tags: post.tags ?? [] };
}

export async function getSettings(): Promise<SiteSettings> {
	if (useSample) return SAMPLE_SETTINGS;
	const data = await sanity().fetch<Partial<SiteSettings> | null>(q.settingsQuery);
	return { ...DEFAULT_SETTINGS, ...(data ?? {}), social: data?.social ?? [] };
}

export async function getPosts(): Promise<PostPreview[]> {
	if (useSample) return SAMPLE_POSTS.map(({ body, ...rest }) => rest);
	const rows = await sanity().fetch<RawPost[]>(q.postsQuery);
	return rows.map(withReadTime).map(({ plain, body, ...rest }) => rest);
}

export async function getPost(slug: string): Promise<Post | null> {
	if (useSample) return SAMPLE_POSTS.find((p) => p.slug === slug) ?? null;
	const row = await sanity().fetch<(RawPost & { body: Post['body'] }) | null>(q.postQuery, { slug });
	if (!row) return null;
	const { plain, ...rest } = withReadTime(row);
	return rest;
}

export async function getPostSlugs(): Promise<string[]> {
	if (useSample) return SAMPLE_POSTS.map((p) => p.slug);
	return sanity().fetch<string[]>(q.postSlugsQuery);
}

export async function getAlbums(): Promise<AlbumPreview[]> {
	if (useSample) return SAMPLE_ALBUMS.map(({ photos, ...rest }) => rest);
	return sanity().fetch<AlbumPreview[]>(q.albumsQuery);
}

export async function getAlbum(slug: string): Promise<Album | null> {
	if (useSample) return SAMPLE_ALBUMS.find((a) => a.slug === slug) ?? null;
	const album = await sanity().fetch<Album | null>(q.albumQuery, { slug });
	if (!album) return null;
	return { ...album, photos: album.photos ?? [] };
}

export async function getAlbumSlugs(): Promise<string[]> {
	if (useSample) return SAMPLE_ALBUMS.map((a) => a.slug);
	return sanity().fetch<string[]>(q.albumSlugsQuery);
}

export async function getAbout(): Promise<AboutPage | null> {
	if (useSample) return SAMPLE_ABOUT;
	const about = await sanity().fetch<AboutPage | null>(q.aboutQuery);
	if (!about) return null;
	return {
		...about,
		intro: about.intro ?? [],
		focus: about.focus ?? [],
		skills: about.skills ?? [],
		experience: about.experience ?? [],
		education: about.education ?? []
	};
}
