export interface PhotoSettings {
	aperture: string;
	shutter: string;
	iso: string;
}

export interface Photo {
	id: string;
	url: string;
	title: string;
	caption: string;
	camera: string;
	lens: string;
	settings: PhotoSettings;
}

export interface Album {
	id: string;
	title: string;
	description: string;
	coverUrl: string;
	photos: Photo[];
}

export const PHOTOGRAPHY_ALBUMS: Album[] = [
	{
		id: 'urban-nights',
		title: 'Urban Nights',
		description: 'City lights and architecture from around the world',
		coverUrl:
			'https://images.unsplash.com/photo-1679097844800-b0cb637306ee?auto=format&fit=crop&w=1200&q=80',
		photos: [
			{
				id: 'urban-1',
				url: 'https://images.unsplash.com/photo-1679097844800-b0cb637306ee?auto=format&fit=crop&w=1600&q=80',
				title: 'Tokyo Nights',
				caption:
					'The vibrant streets of Shibuya after dark, where neon lights paint the city in electric hues.',
				camera: 'Sony A7III',
				lens: '24-70mm f/2.8',
				settings: { aperture: 'f/2.8', shutter: '1/60s', iso: '3200' }
			},
			{
				id: 'urban-2',
				url: 'https://images.unsplash.com/photo-1570304816841-906a17d7b067?auto=format&fit=crop&w=1600&q=80',
				title: 'Manhattan Skyline',
				caption: 'Golden hour view of New York City from Brooklyn Bridge Park.',
				camera: 'Sony A7III',
				lens: '70-200mm f/2.8',
				settings: { aperture: 'f/8', shutter: '1/250s', iso: '400' }
			},
			{
				id: 'urban-3',
				url: 'https://images.unsplash.com/photo-1745016176874-cd3ed3f5bfc6?auto=format&fit=crop&w=1600&q=80',
				title: 'London Evening',
				caption: 'Big Ben illuminated against the twilight sky, a timeless icon.',
				camera: 'Sony A7III',
				lens: '24-70mm f/2.8',
				settings: { aperture: 'f/5.6', shutter: '1/125s', iso: '1600' }
			}
		]
	}
];
