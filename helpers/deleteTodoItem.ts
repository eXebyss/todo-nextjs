async function deleteTodoItem(
	todoCollectionId: string,
	todoListId: string,
	todoId: string
) {
	const baseUrl =
		process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

	const res = await fetch(
		`${baseUrl}/api/v1/todo-collection/${todoCollectionId}/todo`,
		{
			cache: 'no-store',
			method: 'DELETE',
			body: JSON.stringify({
				todoListId,
				todoId,
			}),
		}
	);

	if (!res.ok) {
		throw new Error('Failed to create new todo.');
	}

	return res.json();
}

export default deleteTodoItem;
