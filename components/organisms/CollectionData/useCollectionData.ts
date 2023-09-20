import { ICollectionData } from '@/interfaces';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const useCollectionData = (collectionData: ICollectionData) => {
	const [currentCollectionData, setCurrentCollectionData] =
		useState<ICollectionData>(collectionData);
	const [currentTodoListId, setCurrentTodoListId] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [infoMessage, setInfoMessage] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const refreshCollectionId = useCallback(() => {
		localStorage.removeItem('currentTodoCollectionId');

		setTimeout(() => {
			setIsLoading(true);
		}, 500);

		setTimeout(() => {
			setIsLoading(false);

			router.push(`/`);
		}, 2000);
	}, [router]);

	useEffect(() => {
		if (!currentCollectionData?.todoCollection) {
			refreshCollectionId();
		}
	}, [currentCollectionData?.todoCollection, refreshCollectionId]);

	return {
		currentCollectionData,
		successMessage,
		infoMessage,
		currentTodoListId,
		isLoading,
		setCurrentTodoListId,
		setSuccessMessage,
		setCurrentCollectionData,
		setInfoMessage,
	};
};

export default useCollectionData;
