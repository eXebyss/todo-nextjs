'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';
import { ITodoCollection } from '@/interfaces';
import { kv } from '@vercel/kv';

export default async function getCollectionData(todoCollectionId: string) {
	try {
		if (process.env.USE_MONGODB === 'true') {
			await connectMongoDB();

			const todoCollection: ITodoCollection | null =
				await TodoCollection.findOne({
					id: todoCollectionId,
				});

			return { message: JSON.stringify(todoCollection), error: null };
		}

		if (process.env.USE_VERCEL_KV === 'true') {
			const todoCollection = await kv.get(todoCollectionId);

			return { message: JSON.stringify(todoCollection), error: null };
		}

		throw new Error('No Storage Provider Specified.');
	} catch (e) {
		console.error(e);
		return {
			message: 'Error Getting TODO Collection.',
			error: `Error: ${e}`,
		};
	}
}
