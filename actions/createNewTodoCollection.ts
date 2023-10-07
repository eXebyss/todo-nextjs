'use server';

import { v4 as uuid } from 'uuid';
import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';
import { kv } from '@vercel/kv';

export default async function createNewTodoCollection() {
	try {
		const id = uuid();
		const todoCollection = { id: id, todoLists: [] };

		if (process.env.USE_MONGODB === 'true') {
			await connectMongoDB();
			await TodoCollection.create(todoCollection);
		}

		if (process.env.USE_VERCEL_KV === 'true') {
			await kv.set(id, JSON.stringify(todoCollection));
		}

		if (!process.env.USE_MONGODB && !process.env.USE_VERCEL_KV) {
			throw new Error('No Storage Provider Specified.');
		}

		return { message: 'TODO Collection Created', id: id, error: null };
	} catch (e) {
		console.error(e);

		return {
			message: 'Error Creating TODO Collection.',
			error: `Error: ${e}`,
		};
	}
}
