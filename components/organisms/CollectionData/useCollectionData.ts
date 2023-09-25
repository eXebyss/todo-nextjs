import { ITodoCollection } from '@/interfaces';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTodoContext } from '@/context';

const useCollectionData = (collectionData: ITodoCollection) => {
	const [currentCollectionData, setCurrentCollectionData] =
		useState<ITodoCollection>(collectionData);
	const [currentTodoListId, setCurrentTodoListId] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [infoMessage, setInfoMessage] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();
	const { handleSetIsLoading, handleIsTodoCollectionExisting } =
		useTodoContext();

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
		if (!currentCollectionData) {
			refreshCollectionId();
		}
	}, [currentCollectionData, refreshCollectionId]);

	useEffect(() => {
		const currentCollectionDataFromLocalStorage = localStorage.getItem(
			'currentTodoCollectionId'
		);

		if (collectionData?.id === currentCollectionDataFromLocalStorage) {
			handleIsTodoCollectionExisting(null);
			handleSetIsLoading(false);
		}

		if (!currentCollectionDataFromLocalStorage && collectionData?.id) {
			localStorage.setItem('currentTodoCollectionId', collectionData.id);
		}
	}, [
		collectionData?.id,
		handleIsTodoCollectionExisting,
		handleSetIsLoading,
	]);

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
