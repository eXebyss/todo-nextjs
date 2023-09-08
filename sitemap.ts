import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://todo-nextjs-rose.vercel.app',
			lastModified: new Date(),
		},
		{
			url: 'https://todo-nextjs-rose.vercel.app/about',
			lastModified: new Date(),
		},
	];
}
