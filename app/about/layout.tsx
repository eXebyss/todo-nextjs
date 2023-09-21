import { EMetaTitle } from '@/enums';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: EMetaTitle.about,
	description: 'Overall info about this TODO app.',
};

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
