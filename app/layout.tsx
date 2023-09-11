import { TodoContextProvider } from '@/context';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Footer } from '@/components/atoms/Footer';
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
	title: 'TODO App NextJS',
	description: 'TODO App created with Next.js.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={poppins.className}>
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
