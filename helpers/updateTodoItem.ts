async function updateTodoItem(
	todoCollectionId: string,
	todoListId: string,
	todoId: string,
	todoText?: string,
	todoDone?: boolean
) {
	const baseUrl =
		process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

	const res = await fetch(
		`${baseUrl}/api/v1/todo-collection/${todoCollectionId}/todo`,
		{
			cache: 'no-store',
			method: 'PUT',
			body: JSON.stringify({
				todoListId,
				todoId,
				todoText,
				todoDone,
			}),
		}
	);

	if (!res.ok) {
		throw new Error('Failed to update todo.');
	}

	return res.json();
}

export default updateTodoItem;
