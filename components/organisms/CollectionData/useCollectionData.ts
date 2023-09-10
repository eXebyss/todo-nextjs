import { ICollectionData } from '@/interfaces';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const useCollectionData = (collectionData: ICollectionData) => {
	const [currentCollectionData, setCurrentCollectionData] =
		useState<ICollectionData>(collectionData);
	const [currentTodoListId, setCurrentTodoListId] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [infoMessage, setInfoMessage] = useState<string>('');
	const router = useRouter();

	const refreshCollectionId = useCallback(() => {
		localStorage.removeItem('currentTodoCollectionId');

		setTimeout(() => {
			router.push(`/`);
		}, 2000);
	}, [router]);

	useEffect(() => {
		if (Boolean(currentCollectionData?.todoCollection) === false) {
			refreshCollectionId();
		}
	}, [currentCollectionData?.todoCollection, refreshCollectionId]);

	return {
		currentCollectionData,
		successMessage,
		infoMessage,
		currentTodoListId,
		setCurrentTodoListId,
		setSuccessMessage,
		setCurrentCollectionData,
		setInfoMessage,
	};
};

export default useCollectionData;
