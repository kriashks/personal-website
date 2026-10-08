import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

import { dataset, projectId } from './config';
import type { ImageRef } from './types';

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

function imageUrl(source: SanityImageSource) {
	return builder ? builder.image(source).auto('format').fit('max') : null;
}

function assetUrl(img: ImageRef): string | null {
	const asset = img.asset as { url?: string } | undefined;
	return img.url ?? asset?.url ?? null;
}

function isSampleUrl(url: string): boolean {
	return url.includes('images.unsplash.com');
}

/** Resolve an image to a URL at the given width. Works for Sanity assets and sample URLs. */
export function srcFor(img: ImageRef | null | undefined, width: number, height?: number): string {
	if (!img) return '';
	const url = assetUrl(img);
	if (url && isSampleUrl(url)) {
		const u = new URL(url);
		u.searchParams.set('w', String(width));
		if (height) {
			u.searchParams.set('h', String(height));
			u.searchParams.set('fit', 'crop');
		}
		u.searchParams.set('q', '80');
		u.searchParams.set('auto', 'format');
		return u.toString();
	}
	let b = imageUrl(img as SanityImageSource)?.width(width).quality(82);
	if (!b) return url ?? '';
	if (height) b = b.height(height).fit('crop');
	return b.url();
}

export function srcsetFor(img: ImageRef | null | undefined, widths: number[], ratio?: number): string {
	if (!img) return '';
	return widths
		.map((w) => `${srcFor(img, w, ratio ? Math.round(w / ratio) : undefined)} ${w}w`)
		.join(', ');
}

export function lqipFor(img: ImageRef | null | undefined): string | null {
	if (!img) return null;
	const asset = img.asset as { metadata?: { lqip?: string } } | undefined;
	return img.metadata?.lqip ?? asset?.metadata?.lqip ?? null;
}

export function ratioFor(img: ImageRef | null | undefined, fallback = 3 / 2): number {
	if (!img) return fallback;
	const asset = img.asset as { metadata?: { dimensions?: { aspectRatio?: number } } } | undefined;
	return img.metadata?.dimensions?.aspectRatio ?? asset?.metadata?.dimensions?.aspectRatio ?? fallback;
}
