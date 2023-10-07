'use server';

import { v4 as uuid } from 'uuid';
import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';
import { kv } from '@vercel/kv';
import { ITodoCollection } from '@/interfaces';

export default async function createNewTodoList(
	todoCollectionId: string,
	newTodoListTitle: string
) {
	try {
		const newTodoList = {
			id: uuid(),
			title: newTodoListTitle,
			updatedAt: Date.now(),
			todoCollection: [],
		};

		if (process.env.USE_MONGODB === 'true') {
			await connectMongoDB();

			const todoCollection = await TodoCollection.findOne({
				id: todoCollectionId,
			});

			todoCollection.todoLists.push(newTodoList);
			todoCollection.updatedAt = Date.now();
			await todoCollection.save();
		}

		if (process.env.USE_VERCEL_KV === 'true') {
			const todoCollection: ITodoCollection | null =
				await kv.get(todoCollectionId);

			if (todoCollection) {
				todoCollection?.todoLists.push(newTodoList);
				todoCollection.updatedAt = Date.now();

				await kv.set(todoCollectionId, JSON.stringify(todoCollection));
			}
		}

		if (!process.env.USE_MONGODB && !process.env.USE_VERCEL_KV) {
			throw new Error('No Storage Provider Specified.');
		}

		return { message: 'TODO list is added.', error: null };
	} catch (e) {
		console.error(e);
		return {
			message: 'Error adding TODO list.',
			error: `Error: ${e}`,
		};
	}
}
