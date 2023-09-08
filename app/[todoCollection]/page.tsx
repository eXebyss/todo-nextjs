import { CollectionData } from '@/components/organisms/CollectionData';
import { getCollectionData } from '@/helpers';
import { ICollectionData } from '@/interfaces';

export default async function TodoCollection({
	params,
}: {
	params: { todoCollection: string };
}) {
	try {
		const collectionData: ICollectionData = await getCollectionData(
			params.todoCollection
		);

		return <CollectionData collectionData={collectionData} />;
	} catch (e) {
		return (
			<main>
				<p className="text-error">Error</p>
			</main>
		);
	}
}
