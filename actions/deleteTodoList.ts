'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';
import { kv } from '@vercel/kv';
import { ITodoCollection, ITodoList } from '@/interfaces';

export default async function deleteTodoList(
	todoListId: string,
	todoCollectionId?: string
) {
	try {
		if (process.env.USE_MONGODB === 'true') {
			await connectMongoDB();

			const todoCollection = await TodoCollection.findOne({
				'todoLists.id': todoListId,
			});
			todoCollection.todoLists = todoCollection.todoLists.filter(
				(todoList: { id: string }) => todoList.id !== todoListId
			);

			todoCollection.updatedAt = Date.now();

			await todoCollection.save();
		}

		if (process.env.USE_VERCEL_KV === 'true') {
			if (!todoCollectionId) {
				throw new Error('Missing todo collection ID.');
			}

			const todoCollection: ITodoCollection | null =
				await kv.get(todoCollectionId);

			if (todoCollection) {
				todoCollection.todoLists = todoCollection.todoLists.filter(
					(todoList: { id: string }) => todoList.id !== todoListId
				);

				todoCollection.updatedAt = Date.now();

				await kv.set(todoCollectionId, JSON.stringify(todoCollection));
			}
		}

		if (!process.env.USE_MONGODB && !process.env.USE_VERCEL_KV) {
			throw new Error('No Storage Provider Specified.');
		}

		return { message: 'TODO list is deleted.', error: null };
	} catch (e) {
		console.error(e);

		return { message: 'Error deleting TODO list.', error: `Error: ${e}` };
	}
}
