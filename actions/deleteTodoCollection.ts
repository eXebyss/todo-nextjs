'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';
import { kv } from '@vercel/kv';

export default async function deleteTodoCollection(todoCollectionId: string) {
	try {
		if (process.env.USE_MONGODB === 'true') {
			await connectMongoDB();
			await TodoCollection.findOneAndDelete({ id: todoCollectionId });
		}

		if (process.env.USE_VERCEL_KV === 'true') {
			await kv.del(todoCollectionId);
		}

		if (!process.env.USE_MONGODB && !process.env.USE_VERCEL_KV) {
			throw new Error('No Storage Provider Specified.');
		}

		return { message: 'TODO Collection Deleted', error: null };
	} catch (e) {
		console.error(e);

		return {
			message: 'Error Deleting TODO Collection.',
			error: `Error: ${e}`,
		};
	}
}
