'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export default async function deleteTodoList(todoListId: string) {
	try {
		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			'todoLists.id': todoListId,
		});
		todoCollection.todoLists = todoCollection.todoLists.filter(
			(todoList: { id: string }) => todoList.id !== todoListId
		);

		todoCollection.updatedAt = Date.now();

		await todoCollection.save();

		return { message: 'TODO list is deleted.', error: null };
	} catch (e) {
		console.error(e);

		return { message: 'Error deleting TODO list.', error: `Error: ${e}` };
	}
}
