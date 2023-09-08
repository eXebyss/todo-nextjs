import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export async function GET(req: NextRequest) {
	try {
		const todoCollectionId =
			req.nextUrl.searchParams.get('todoCollectionId');

		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			id: todoCollectionId,
		});

		return NextResponse.json({ todoCollection }, { status: 200 });
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{
				message: 'Error Getting TODO Collection',
				error: e,
			},
			{ status: 500 }
		);
	}
}

export async function POST() {
	try {
		await connectMongoDB();

		const id = uuid();

		await TodoCollection.create({ id: id, todoList: [] });

		return NextResponse.json(
			{ message: 'TODO Collection Created', id: id },
			{ status: 201 }
		);
	} catch (e) {
		console.error(e);

		return NextResponse.json(
			{ message: 'Error Creating TODO Collection', error: e },
			{ status: 500 }
		);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const { id: todoCollectionId, title } = await req.json();

		await connectMongoDB();

		const todoCollection = await TodoCollection.findOne({
			id: todoCollectionId,
		});

		const newTodoList = {
			id: uuid(),
			title: title,
			updatedAt: Date.now(),
			todoCollection: [],
		};

		todoCollection.todoLists.push(newTodoList);
		todoCollection.updatedAt = Date.now();
		await todoCollection.save();

		return NextResponse.json(
			{ message: 'TODO Collection updated' },
			{ status: 201 }
		);
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{ message: 'Error updating TODO Collection', error: e },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest) {
	const todoCollectionId =
		request.nextUrl.searchParams.get('todoCollectionId');

	try {
		await connectMongoDB();

		await TodoCollection.findOneAndDelete({ id: todoCollectionId });

		return NextResponse.json(
			{ message: 'TODO collection deleted' },
			{ status: 200 }
		);
	} catch (e) {
		console.error(e);

		return NextResponse.json(
			{ message: 'Error Deleting TODO Collection', error: e },
			{ status: 500 }
		);
	}
}
