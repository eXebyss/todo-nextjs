import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Todo Next.js',
		short_name: 'Todo',
		description: 'A simple todo app built with NextJS and TailwindCSS.',
		start_url: '/',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '64x64 32x32 24x24 16x16',
				type: 'image/x-icon',
			},
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
		theme_color: '#1d232a',
		background_color: '#1d232a',
		display: 'standalone',
	};
}
