import { TodoContextProvider } from '@/context';
import './globals.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Rubik } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { EMetaTitle } from '@/enums';

const rubik = Rubik({ subsets: ['latin'], weight: '400' });

const Footer = dynamic(
	() => import('@/components/atoms/Footer').then((module) => module.Footer),
	{
		loading: () => (
			<p className="w-full mx-auto text-center text-warning">
				Loading...
			</p>
		),
	}
);

export const metadata: Metadata = {
	title: EMetaTitle.default,
	description: 'TODO App created with Next.js.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={rubik.className}>
			<head>
				<link
					rel="canonical"
					href="https://todo-nextjs-rose.vercel.app/"
					key="canonical"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
			</head>
			<body>
				<TodoContextProvider>{children}</TodoContextProvider>
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
