'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';
import { ITodoCollection } from '@/interfaces';

export default async function getCollectionData(todoCollectionId: string) {
	try {
		await connectMongoDB();

		const todoCollection: ITodoCollection | null =
			await TodoCollection.findOne({
				id: todoCollectionId,
			});

		return { message: JSON.stringify(todoCollection), error: null };
	} catch (e) {
		console.error(e);
		return {
			message: 'Error Getting TODO Collection.',
			error: `Error: ${e}`,
		};
	}
}
