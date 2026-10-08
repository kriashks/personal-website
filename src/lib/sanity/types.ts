import type { PortableTextBlock } from '@portabletext/types';

export interface ImageRef {
	/** Sanity image asset reference, or an absolute URL in sample mode. */
	asset?: { _ref: string; _type: 'reference' } | { url: string; metadata?: ImageMeta };
	hotspot?: { x: number; y: number; width: number; height: number };
	crop?: { top: number; bottom: number; left: number; right: number };
	alt?: string;
	caption?: string;
	url?: string;
	metadata?: ImageMeta;
}

export interface ImageMeta {
	lqip?: string;
	dimensions?: { width: number; height: number; aspectRatio: number };
	palette?: { dominant?: { background?: string; foreground?: string } };
}

export interface SocialLink {
	label: string;
	href: string;
	icon: 'github' | 'linkedin' | 'mail' | 'instagram' | 'x' | 'link';
}

export interface SiteSettings {
	siteName: string;
	description: string;
	heroHeading: string;
	heroSubheading: string;
	heroImage: ImageRef | null;
	blogIntro: string;
	photographyIntro: string;
	social: SocialLink[];
}

export interface PostPreview {
	slug: string;
	title: string;
	publishedAt: string;
	summary: string;
	tags: string[];
	readTime: string;
	coverImage: ImageRef | null;
}

export interface Post extends PostPreview {
	body: PortableTextBlock[];
}

export interface Photo {
	key: string;
	image: ImageRef;
	title: string;
	caption?: string;
	location?: string;
	takenAt?: string;
	camera?: string;
	lens?: string;
	aperture?: string;
	shutter?: string;
	iso?: string;
}

export interface AlbumPreview {
	slug: string;
	title: string;
	description?: string;
	date?: string;
	featured: boolean;
	cover: ImageRef;
	photoCount: number;
}

export interface Album extends AlbumPreview {
	photos: Photo[];
}

export interface AboutPage {
	heading: string;
	tagline?: string;
	portrait: ImageRef | null;
	intro: PortableTextBlock[];
	focus: { title: string; description?: string }[];
	skills: string[];
	experience: { title: string; company?: string; period?: string; description?: string }[];
	education: { degree: string; institution?: string; year?: string }[];
}
