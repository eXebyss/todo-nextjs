'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';
import { kv } from '@vercel/kv';
import { ITodoCollection, ITodoList } from '@/interfaces';

export default async function deleteTodoItem(
	todoListId: string,
	todoItemId: string,
	todoCollectionId?: string
) {
	try {
		if (process.env.USE_MONGODB === 'true') {
			await connectMongoDB();

			const todoCollection = await TodoCollection.findOne({
				'todoLists.id': todoListId,
			});
			const todoList = todoCollection?.todoLists.find(
				(todoList: { id: string }) => todoList.id === todoListId
			);

			todoList.todoCollection = todoList?.todoCollection.filter(
				(todoItem: { id: string }) => todoItem.id !== todoItemId
			);
			todoList.updatedAt = Date.now();
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
				const currentTodoList: ITodoList | null =
					todoCollection.todoLists?.find(
						(todoList: { id: string }) => todoList.id === todoListId
					) || null;

				if (currentTodoList) {
					currentTodoList.todoCollection =
						currentTodoList.todoCollection.filter(
							(todoItem: { id: string }) =>
								todoItem.id !== todoItemId
						);
					currentTodoList.updatedAt = Date.now();

					const todoListIndex = todoCollection.todoLists.findIndex(
						(todoList: { id: string }) => todoList.id === todoListId
					);

					if (todoListIndex !== -1) {
						todoCollection.todoLists[todoListIndex] =
							currentTodoList;
					}

					todoCollection.updatedAt = Date.now();

					await kv.set(
						todoCollectionId,
						JSON.stringify(todoCollection)
					);
				}
			}
		}

		if (!process.env.USE_MONGODB && !process.env.USE_VERCEL_KV) {
			throw new Error('No Storage Provider Specified.');
		}

		return { message: 'TODO item is deleted.', error: null };
	} catch (e) {
		console.error(e);

		return { message: 'Error deleting TODO item.', error: `Error: ${e}` };
	}
}
