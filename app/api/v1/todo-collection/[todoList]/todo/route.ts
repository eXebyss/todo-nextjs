import { connectMongoDB } from '@/libs/mongodb';
import { v4 as uuid } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import TodoCollection from '@/models/todoCollection';

export async function POST(req: NextRequest) {
	try {
		const { todoListId, text = null, done = null } = await req.json();

		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			'todoLists.id': todoListId,
		});
		const todoList = todoCollection?.todoLists.find(
			(todoList: { id: string }) => todoList.id === todoListId
		);

		const newTodo = {
			id: uuid(),
			text: text || 'No text',
			done: done || false,
			updatedAt: Date.now(),
		};

		todoList?.todoCollection.push(newTodo);
		todoList.updatedAt = Date.now();
		todoCollection.updatedAt = Date.now();

		await todoCollection.save();

		return NextResponse.json(
			{ message: 'TODO Collection updated' },
			{ status: 201 }
		);
	} catch (e) {
		console.error(e);

		return NextResponse.json(
			{ message: 'Error getting TODO Collection', error: e },
			{ status: 500 }
		);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const {
			todoListId,
			todoId,
			todoText = null,
			todoDone = null,
		} = await req.json();

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

		console.log(todo.done);

		await todoCollection.save();

		return NextResponse.json({ message: 'TODO updated' }, { status: 200 });
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ message: 'Error updating TODO', error },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const { todoListId, todoId } = await req.json();

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

		return NextResponse.json({ message: 'TODO deleted' }, { status: 200 });
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{ message: 'Error deleting TODO', error },
			{ status: 500 }
		);
	}
}
