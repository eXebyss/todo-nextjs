'use server';

import { v4 as uuid } from 'uuid';
import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';
import { kv } from '@vercel/kv';
import { ITodoCollection, ITodoList } from '@/interfaces';

export default async function createNewTodoItem(
	currentTodoListId: string,
	text: string | null,
	todoCollectionId?: string
) {
	try {
		const newTodo = {
			id: uuid(),
			text: text || 'No text',
			done: false,
			updatedAt: Date.now(),
		};

		if (process.env.USE_MONGODB === 'true') {
			await connectMongoDB();

			const todoCollection = await TodoCollection.findOne({
				'todoLists.id': currentTodoListId,
			});
			const todoList = todoCollection?.todoLists.find(
				(todoList: { id: string }) => todoList.id === currentTodoListId
			);

			todoList?.todoCollection.push(newTodo);
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

			const currentTodoList: ITodoList | null =
				todoCollection?.todoLists?.find(
					(todoList: { id: string }) =>
						todoList.id === currentTodoListId
				) || null;

			if (currentTodoList && todoCollection) {
				currentTodoList.todoCollection.push(newTodo);
				currentTodoList.updatedAt = Date.now();

				const todoListIndex = todoCollection.todoLists.findIndex(
					(todoList: { id: string }) =>
						todoList.id === currentTodoListId
				);

				if (todoListIndex !== -1) {
					todoCollection.todoLists[todoListIndex] = currentTodoList;
				}

				todoCollection.updatedAt = Date.now();

				await kv.set(todoCollectionId, JSON.stringify(todoCollection));
			}
		}

		if (!process.env.USE_MONGODB && !process.env.USE_VERCEL_KV) {
			throw new Error('No Storage Provider Specified.');
		}

		return { message: 'TODO Collection is updated.', error: null };
	} catch (e) {
		console.error(e);
		return {
			message: 'Error getting TODO Collection',
			error: `Error: ${e}`,
		};
	}
}
