'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export default async function deleteTodoItem(
	todoListId: string,
	todoId: string
) {
	try {
		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			'todoLists.id': todoListId,
		});
		const todoList = todoCollection?.todoLists.find(
			(todoList: { id: string }) => todoList.id === todoListId
		);
		todoList.todoCollection = todoList?.todoCollection?.filter(
			(todo: { id: string }) => todo.id !== todoId
		);

		todoList.updatedAt = Date.now();
		todoCollection.updatedAt = Date.now();

		await todoCollection.save();

		return { message: 'TODO item is deleted.', error: null };
	} catch (error) {
		console.error(error);

		return {
			message: 'Error deleting TODO item.',
			error: `Error: ${error}`,
		};
	}
}
