import { About } from '@/content';

export default function AboutPage() {
	return (
		<article className="prose mx-auto">
			<section className="py-24 px-6 lg:px-0 text-justify">
				<About />
			</section>
		</article>
	);
}
