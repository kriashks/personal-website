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
	},
	{
		id: 'european-wanderlust',
		title: 'European Wanderlust',
		description: 'Historic streets and iconic landmarks across Europe',
		coverUrl:
			'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1200&q=80',
		photos: [
			{
				id: 'europe-1',
				url: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1600&q=80',
				title: 'Eiffel Tower',
				caption: 'The Iron Lady stands tall against a dramatic Parisian sky at dusk.',
				camera: 'Canon 5D Mark IV',
				lens: '16-35mm f/2.8',
				settings: { aperture: 'f/11', shutter: '1/200s', iso: '200' }
			},
			{
				id: 'europe-2',
				url: 'https://images.unsplash.com/photo-1727001498963-4e26598dc486?auto=format&fit=crop&w=1600&q=80',
				title: 'Venice Canals',
				caption: 'Morning light reflects off the tranquil waters of Venice.',
				camera: 'Canon 5D Mark IV',
				lens: '24-70mm f/2.8',
				settings: { aperture: 'f/4', shutter: '1/320s', iso: '100' }
			},
			{
				id: 'europe-3',
				url: 'https://images.unsplash.com/photo-1638695233711-7e8c28dd7d17?auto=format&fit=crop&w=1600&q=80',
				title: 'Iceland Aurora',
				caption: 'The northern lights dance above Iceland\'s volcanic landscape.',
				camera: 'Canon 5D Mark IV',
				lens: '16-35mm f/2.8',
				settings: { aperture: 'f/2.8', shutter: '15s', iso: '3200' }
			}
		]
	},
	{
		id: 'natural-wonders',
		title: 'Natural Wonders',
		description: 'Raw landscapes captured in dramatic light',
		coverUrl:
			'https://images.unsplash.com/photo-1665073018619-9e8d648a8a45?auto=format&fit=crop&w=1200&q=80',
		photos: [
			{
				id: 'nature-1',
				url: 'https://images.unsplash.com/photo-1665073018619-9e8d648a8a45?auto=format&fit=crop&w=1600&q=80',
				title: 'Golden Coast',
				caption: 'Sunset paints the shoreline in warm tones as waves roll in.',
				camera: 'Nikon Z7',
				lens: '24-120mm f/4',
				settings: { aperture: 'f/16', shutter: '1/60s', iso: '100' }
			},
			{
				id: 'nature-2',
				url: 'https://images.unsplash.com/photo-1717008236999-26cdf9024648?auto=format&fit=crop&w=1600&q=80',
				title: 'Flowing Waters',
				caption: 'Long exposure turns a waterfall into a silky ribbon.',
				camera: 'Nikon Z7',
				lens: '70-200mm f/2.8',
				settings: { aperture: 'f/22', shutter: '4s', iso: '64' }
			},
			{
				id: 'nature-3',
				url: 'https://images.unsplash.com/photo-1723566424162-3f0ce22a99a3?auto=format&fit=crop&w=1600&q=80',
				title: 'Arctic Sky',
				caption: 'Aurora borealis sweeps across the Arctic night.',
				camera: 'Nikon Z7',
				lens: '14-24mm f/2.8',
				settings: { aperture: 'f/2.8', shutter: '20s', iso: '2500' }
			}
		]
	},
	{
		id: 'wildlife',
		title: 'Wildlife',
		description: 'Portraits of wildlife in their natural habitats',
		coverUrl:
			'https://images.unsplash.com/photo-1575039804649-12b9734bcd96?auto=format&fit=crop&w=1200&q=80',
		photos: [
			{
				id: 'wildlife-1',
				url: 'https://images.unsplash.com/photo-1575039804649-12b9734bcd96?auto=format&fit=crop&w=1600&q=80',
				title: 'King of the Savanna',
				caption: 'A male lion surveys his territory with regal composure.',
				camera: 'Canon EOS R5',
				lens: '100-500mm f/4.5-7.1',
				settings: { aperture: 'f/5.6', shutter: '1/1000s', iso: '800' }
			},
			{
				id: 'wildlife-2',
				url: 'https://images.unsplash.com/photo-1578935028408-f9413a9c7356?auto=format&fit=crop&w=1600&q=80',
				title: 'Giants of Africa',
				caption: 'An elephant family crosses the plains at sunset.',
				camera: 'Canon EOS R5',
				lens: '100-500mm f/4.5-7.1',
				settings: { aperture: 'f/8', shutter: '1/500s', iso: '400' }
			},
			{
				id: 'wildlife-3',
				url: 'https://images.unsplash.com/photo-1556597386-347226bd1776?auto=format&fit=crop&w=1600&q=80',
				title: 'Flight of the Eagle',
				caption: 'A bald eagle in full extension against an open sky.',
				camera: 'Canon EOS R5',
				lens: '100-500mm f/4.5-7.1',
				settings: { aperture: 'f/5.6', shutter: '1/2000s', iso: '640' }
			}
		]
	}
];
