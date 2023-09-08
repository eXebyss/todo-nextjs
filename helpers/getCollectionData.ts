async function getCollectionData(todoCollectionId: string) {
	const baseUrl =
		process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

	const res = await fetch(
		`${baseUrl}/api/v1/todo-collection?todoCollectionId=${todoCollectionId}`,
		{
			cache: 'no-store',
			method: 'GET',
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch collection.');
	}

	return res.json();
}

export default getCollectionData;
