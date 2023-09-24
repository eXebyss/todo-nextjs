'use server';

import { v4 as uuid } from 'uuid';
import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export default async function createNewTodoItem(
	currentTodoListId: string,
	text: string | null
) {
	try {
		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			'todoLists.id': currentTodoListId,
		});
		const todoList = todoCollection?.todoLists.find(
			(todoList: { id: string }) => todoList.id === currentTodoListId
		);

		const newTodo = {
			id: uuid(),
			text: text || 'No text',
			done: false,
			updatedAt: Date.now(),
		};

		todoList?.todoCollection.push(newTodo);
		todoList.updatedAt = Date.now();
		todoCollection.updatedAt = Date.now();

		await todoCollection.save();

		return { message: 'TODO Collection is updated.', error: null };
	} catch (e) {
		console.error(e);

		return {
			message: 'Error getting TODO Collection',
			error: `Error: ${e}`,
		};
	}
}
