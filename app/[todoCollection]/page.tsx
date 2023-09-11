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
		console.error(e);

		return (
			<main>
				<p className="w-full my-4 text-center text-error">
					Render Error!
				</p>
			</main>
		);
	}
}
