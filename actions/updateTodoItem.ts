'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';
import { kv } from '@vercel/kv';
import { ITodoCollection, ITodoList, ITodo } from '@/interfaces';

export default async function updateTodoItem(
	todoListId: string,
	todoItemId: string,
	{
		todoText,
		todoDone,
		todoCollectionId,
	}: {
		todoText?: string | null;
		todoDone?: boolean;
		todoCollectionId?: string;
	}
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
			const todo = todoList?.todoCollection.find(
				(todoItem: { id: string }) => todoItem.id === todoItemId
			);

			todo.text = todoText || todo.text || '';
			todo.done =
				typeof todoDone !== 'undefined' && todoDone !== null
					? todoDone
					: todo.done;
			todo.updatedAt = Date.now();
			todoList.updatedAt = Date.now();
			todoCollection.updatedAt = Date.now();

			await todoCollection.save();
		}

		if (process.env.USE_VERCEL_KV === 'true') {
			if (!todoCollectionId) {
				throw new Error('Missing todo collection ID.');
			}

			const todoCollection: ITodoCollection | null = await kv.get(
				todoCollectionId
			);

			if (todoCollection) {
				const currentTodoList: ITodoList | null =
					todoCollection.todoLists?.find(
						(todoList: { id: string }) => todoList.id === todoListId
					) || null;

				if (currentTodoList) {
					const currentTodoItem: ITodo | null =
						currentTodoList.todoCollection?.find(
							(todoItem: { id: string }) =>
								todoItem.id === todoItemId
						) || null;

					if (currentTodoItem) {
						currentTodoItem.text =
							todoText || currentTodoItem.text || '';
						currentTodoItem.done =
							typeof todoDone !== 'undefined' && todoDone !== null
								? todoDone
								: currentTodoItem.done;
						currentTodoItem.updatedAt = Date.now();
					}

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

		return { message: 'TODO item is updated.', error: null };
	} catch (e) {
		console.error(e);

		return { message: 'Error updating TODO item.', error: `Error: ${e}` };
	}
}
