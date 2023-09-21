import nextMDX from '@next/mdx';

const withMDX = nextMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	experimental: {
		appDir: true,
		mdxRs: true,
		serverActions: true,
	},
};

export default withMDX(nextConfig);
