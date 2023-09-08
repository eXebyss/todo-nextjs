async function createNewTodoList(
	todoCollectionId: string,
	newTodoListTitle: string
) {
	const baseUrl =
		process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

	const res = await fetch(`${baseUrl}/api/v1/todo-collection`, {
		cache: 'no-store',
		method: 'PUT',
		body: JSON.stringify({
			id: todoCollectionId,
			title: newTodoListTitle,
		}),
	});

	if (!res.ok) {
		throw new Error('Failed to PUT new todo list.');
	}

	return res.json();
}

export default createNewTodoList;
