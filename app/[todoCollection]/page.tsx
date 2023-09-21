import { getCollectionData } from '@/actions';
import { CollectionData } from '@/components/organisms/CollectionData';

export default async function TodoCollection({
	params,
}: {
	params: { todoCollection: string };
}) {
	try {
		const res = await getCollectionData(params.todoCollection);
		const { message: collectionData, error } = res;

		if (error) {
			throw new Error(error);
		}

		return <CollectionData collectionData={JSON.parse(collectionData)} />;
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
