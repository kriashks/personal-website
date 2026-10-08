const image = `{ ..., asset->{ _id, url, metadata { lqip, dimensions, palette { dominant } } } }`;

export const settingsQuery = `*[_id == "siteSettings"][0]{
	siteName, description, heroHeading, heroSubheading, blogIntro, photographyIntro,
	heroImage ${image},
	social[]{ label, href, icon }
}`;

export const postPreviewFields = `
	"slug": slug.current, title, publishedAt, updatedAt, summary, "tags": coalesce(tags, []),
	coverImage ${image},
	"plain": pt::text(body)
`;

export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){ ${postPreviewFields} }`;

export const postQuery = `*[_type == "post" && slug.current == $slug][0]{
	${postPreviewFields},
	body[]{
		...,
		_type == "image" => ${image},
		markDefs[]{ ... }
	}
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)].slug.current`;

const albumPreviewFields = `
	"slug": slug.current, title, description, date, "featured": coalesce(featured, false),
	"cover": coalesce(cover, photos[0].image) ${image},
	"photoCount": count(photos)
`;

export const albumsQuery = `*[_type == "album" && defined(slug.current)] | order(coalesce(date, "0000-01-01") desc, _createdAt desc){ ${albumPreviewFields} }`;

export const albumQuery = `*[_type == "album" && slug.current == $slug][0]{
	${albumPreviewFields},
	photos[]{
		"key": _key, title, caption, location, takenAt, camera, lens, aperture, shutter, iso,
		image ${image}
	}
}`;

export const albumSlugsQuery = `*[_type == "album" && defined(slug.current)].slug.current`;

export const aboutQuery = `*[_id == "aboutPage"][0]{
	heading, tagline, portrait ${image}, intro,
	focus[]{ title, description },
	"skills": coalesce(skills, []),
	experience[]{ title, company, period, description },
	education[]{ degree, institution, year }
}`;
