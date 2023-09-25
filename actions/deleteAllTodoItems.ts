'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export default async function deleteDoneTodoItems(todoListId: string) {
	try {
		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			'todoLists.id': todoListId,
		});
		const todoList = todoCollection?.todoLists.find(
			(todoList: { id: string }) => todoList.id === todoListId
		);

		todoList.todoCollection = todoList?.todoCollection?.filter(
			(todo: { id: string; done: boolean }) => !todo.done
		);

		todoList.updatedAt = Date.now();
		todoCollection.updatedAt = Date.now();

		await todoCollection.save();

		return { message: 'All done TODO items are deleted.', error: null };
	} catch (error) {
		console.error(error);

		return {
			message: 'Error deleting all done TODO items.',
			error: `Error: ${error}`,
		};
	}
}
