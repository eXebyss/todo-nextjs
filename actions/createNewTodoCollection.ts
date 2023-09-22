'use server';

import { v4 as uuid } from 'uuid';
import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export default async function createNewTodoCollection() {
	try {
		await connectMongoDB();

		const id = uuid();

		await TodoCollection.create({ id: id, todoList: [] });

		return { message: 'TODO Collection Created', id: id, error: null };
	} catch (e) {
		console.error(e);

		return {
			message: 'Error Creating TODO Collection.',
			error: `Error: ${e}`,
		};
	}
}
