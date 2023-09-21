import { EMetaTitle } from '@/enums';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: EMetaTitle.changelog,
	description: 'Patch notes.',
};

export default function ChangelogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
