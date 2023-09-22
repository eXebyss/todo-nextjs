'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export default async function deleteTodoCollection(todoCollectionId: string) {
	try {
		await connectMongoDB();

		await TodoCollection.findOneAndDelete({ id: todoCollectionId });

		return { message: 'TODO collection is deleted.', error: null };
	} catch (e) {
		console.error(e);

		return {
			message: 'Error Deleting TODO Collection.',
			error: `Error: ${e}`,
		};
	}
}
