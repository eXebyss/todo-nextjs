async function getTodoListData(todoListId: string) {
	const baseUrl = process.env.API_BASE_URL;

	const res = await fetch(`${baseUrl}/api/v1/todo-collection/${todoListId}`, {
		cache: 'no-store',
		method: 'GET',
	});

	if (!res.ok) {
		throw new Error('Failed to fetch collection list.');
	}

	return res.json();
}

export default getTodoListData;
