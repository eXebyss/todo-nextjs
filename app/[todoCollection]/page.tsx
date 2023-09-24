import { getCollectionData, getTodoListData } from '@/actions';
import { CollectionData } from '@/components/organisms/CollectionData';

export default async function TodoCollection({
	params,
	searchParams,
}: {
	params: { todoCollection: string };
	searchParams: { q: string };
}) {
	try {
		const collectionDataResponse = await getCollectionData(
			params.todoCollection
		);
		const { message: collectionData, error: collectionDataError } =
			collectionDataResponse;

		if (collectionDataError) {
			throw new Error(collectionDataError);
		}

		const parsedCollectionData = JSON.parse(collectionData);

		const todoListId = searchParams.q;

		if (todoListId) {
			const todoListDataResponse = await getTodoListData(todoListId);

			const { message: todoListData, error: todoListDataError } =
				todoListDataResponse;

			if (todoListDataError) {
				throw new Error(todoListDataError);
			}

			const parsedTodoListData = JSON.parse(todoListData);

			return (
				<CollectionData
					collectionData={parsedCollectionData}
					todoListData={parsedTodoListData}
				/>
			);
		}

		return <CollectionData collectionData={parsedCollectionData} />;
	} catch (e) {
		console.error(e);

		return (
			<main>
				<h1 className="w-full my-4 text-center text-error">
					Render Error!
				</h1>
			</main>
		);
	}
}
