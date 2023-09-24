'use server';

import { v4 as uuid } from 'uuid';
import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export default async function createNewTodoList(
	todoCollectionId: string,
	newTodoListTitle: string
) {
	try {
		// const { id: todoCollectionId, title } = await req.json();

		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			id: todoCollectionId,
		});

		const newTodoList = {
			id: uuid(),
			title: newTodoListTitle,
			updatedAt: Date.now(),
			todoCollection: [],
		};

		todoCollection.todoLists.push(newTodoList);
		todoCollection.updatedAt = Date.now();
		await todoCollection.save();

		return { message: 'TODO list is added.', error: null };
	} catch (e) {
		console.error(e);
		return {
			message: 'Error adding TODO list.',
			error: `Error: ${e}`,
		};
	}
}
