import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema({
	id: { type: String, required: true },
	text: { type: String, default: 'No text' },
	done: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const todoListSchema = new Schema({
	id: { type: String, required: true },
	title: { type: String, default: 'No title' },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	todoCollection: [todoSchema],
});

const todoCollectionSchema = new Schema({
	id: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	todoLists: [todoListSchema],
});

const TodoCollection =
	mongoose.models.TodoCollection ||
	mongoose.model('TodoCollection', todoCollectionSchema);

export default TodoCollection;
