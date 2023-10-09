import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/libs/mongodb';
import TodoCollection from '@/models/todoCollection';

export async function GET() {
	try {
		await connectMongoDB();

		let todoCollections = await TodoCollection.find({});

		const collectionsToRemove = todoCollections.filter((collection) => {
			// Filter out collections with empty todoLists
			const filteredTodoLists = collection.todoLists.filter(
				(list: { todoCollection: [] }) => list.todoCollection.length > 0
			);

			collection.todoLists = filteredTodoLists;

			// Check if updatedAt is more than a month ago
			const oneMonthAgo = new Date();
			oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

			if (new Date(collection.updatedAt) < oneMonthAgo) {
				return true;
			}

			return collection.todoLists.length === 0;
		});

		// Remove unwanted collections from MongoDB
		await Promise.all(
			collectionsToRemove.map((collection) =>
				TodoCollection.deleteOne({ _id: collection._id })
			)
		);

		todoCollections = todoCollections.filter(
			(collection) => collection.todoLists.length > 0
		);

		// Save the filtered todoCollections in MongoDB
		await Promise.all(
			todoCollections.map((collection) => {
				collection.markModified('todoLists');

				return collection.save();
			})
		);

		return NextResponse.json({ ok: true });
	} catch (e) {
		console.error(e);

		return NextResponse.json({ ok: false });
	}
}
