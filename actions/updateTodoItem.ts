'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export default async function updateTodoItem(
	todoListId: string,
	todoId: string,
	todoText: string | null = null,
	todoDone: boolean = false
) {
	try {
		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			'todoLists.id': todoListId,
		});
		const todoList = todoCollection?.todoLists.find(
			(todoList: { id: string }) => todoList.id === todoListId
		);
		const todo = todoList?.todoCollection.find(
			(todo: { id: string }) => todo.id === todoId
		);

		todo.text = todoText || todo.text;
		todo.done =
			typeof todoDone !== 'undefined' || 'null' ? todoDone : todo.done;
		todo.updatedAt = Date.now();
		todoList.updatedAt = Date.now();
		todoCollection.updatedAt = Date.now();

		await todoCollection.save();

		return { message: 'TODO item is updated.', error: null };
	} catch (error) {
		console.error(error);

		return {
			message: 'Error updating TODO item.',
			error: `Error: ${error}`,
		};
	}
}
