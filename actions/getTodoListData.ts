'use server';

import { ITodoCollection, ITodoList } from '@/interfaces';
import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';
import { kv } from '@vercel/kv';

export default async function getTodoListData(
	todoListId: string,
	todoCollectionId?: string
) {
	try {
		if (!todoListId) {
			throw new Error('Missing todo list ID.');
		}

		let todoList: ITodoList | [] = [];

		if (process.env.USE_MONGODB === 'true') {
			await connectMongoDB();

			const todoCollection = await TodoCollection.findOne({
				'todoLists.id': todoListId,
			});

			todoList =
				todoCollection?.todoLists?.find(
					(todoList: { id: string }) => todoList.id === todoListId
				) || [];
		}

		if (process.env.USE_VERCEL_KV === 'true') {
			if (!todoCollectionId) {
				throw new Error('Missing todo collection ID.');
			}

			const todoCollection: ITodoCollection | null =
				await kv.get(todoCollectionId);

			todoList =
				todoCollection?.todoLists?.find(
					(todoList: { id: string }) => todoList.id === todoListId
				) || [];
		}

		if (!process.env.USE_MONGODB && !process.env.USE_VERCEL_KV) {
			throw new Error('No Storage Provider Specified.');
		}

		return {
			message: JSON.stringify(
				'todoCollection' in todoList ? todoList.todoCollection : []
			),
			error: null,
		};
	} catch (e) {
		console.error(e);
		return {
			message: 'Error getting TODO Collection.',
			error: `Error: ${e}`,
		};
	}
}
