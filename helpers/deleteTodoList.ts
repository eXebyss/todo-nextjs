async function deleteTodoList(todoListId: string) {
	const baseUrl =
		process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

	const res = await fetch(`${baseUrl}/api/v1/todo-collection/${todoListId}`, {
		cache: 'no-store',
		method: 'DELETE',
	});

	if (!res.ok) {
		throw new Error('Failed to Delete todo list.');
	}

	return res.json();
}

export default deleteTodoList;
