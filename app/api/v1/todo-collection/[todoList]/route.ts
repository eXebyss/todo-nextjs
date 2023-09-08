import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export async function GET(
	req: NextRequest,
	{ params: { todoList: todoListId } }: { params: { todoList: string } }
) {
	try {
		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			'todoLists.id': todoListId,
		});

		const todoList =
			todoCollection?.todoLists?.find(
				(todoList: { id: string }) => todoList.id === todoListId
			) || [];

		return NextResponse.json(todoList?.todoCollection || [], {
			status: 200,
		});
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{ message: 'Error getting TODO Collection', error: e },
			{ status: 500 }
		);
	}
}

export async function PUT(
	req: NextRequest,
	{ params: { todoList: todoListId } }: { params: { todoList: string } }
) {
	try {
		const { title = null } = await req.json();

		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			'todoLists.id': todoListId,
		});
		const todoList = todoCollection?.todoLists.find(
			(todoList: { id: string }) => todoList.id === todoListId
		);

		todoList.title = title || 'No title';
		todoList.updatedAt = Date.now();
		todoCollection.updatedAt = Date.now();

		await todoCollection.save();

		return NextResponse.json(
			{ message: 'TODO list is updated' },
			{ status: 201 }
		);
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{ message: 'Error updating TODO list', error: e },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params: { todoList: todoListId } }: { params: { todoList: string } }
) {
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

		return NextResponse.json(
			{ message: 'TODO list is deleted' },
			{ status: 201 }
		);
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{ message: 'Error deleting TODO list', error: e },
			{ status: 500 }
		);
	}
}
