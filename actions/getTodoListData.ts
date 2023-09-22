'use server';

import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export default async function getTodoListData(todoListId: string) {
	try {
		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			'todoLists.id': todoListId,
		});

		const todoList =
			todoCollection?.todoLists?.find(
				(todoList: { id: string }) => todoList.id === todoListId
			) || [];

		return { message: todoList?.todoCollection || [], error: null };
	} catch (e) {
		console.error(e);
		return {
			message: 'Error getting TODO Collection.',
			error: `Error: ${e}`,
		};
	}
}
