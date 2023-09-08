import { ICollectionData } from '@/interfaces';
import { useState } from 'react';

const useCollectionData = (collectionData: ICollectionData) => {
	const [currentCollectionData, setCurrentCollectionData] =
		useState<ICollectionData>(collectionData);
	const [currentTodoListId, setCurrentTodoListId] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [infoMessage, setInfoMessage] = useState<string>('');

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
