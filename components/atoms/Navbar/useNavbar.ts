import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTodoContext } from '@/context';
import { ITodoCollection } from '@/interfaces';

const useNavbar = (
	successMessage: string,
	setSuccessMessage: (message: string) => void,
	currentCollectionData: ITodoCollection,
	infoMessage: string,
	setInfoMessage: (message: string) => void
) => {
	const {
		handleDeleteTodoCollectionId,
		handleEnterTodoCollectionId,
		handleIsTodoCollectionExisting,
	} = useTodoContext();
	const router = useRouter();

	useEffect(() => {
		if (infoMessage) {
			const timer = setTimeout(() => {
				setInfoMessage('');
			}, 3500);

			return () => clearTimeout(timer);
		}
	}, [infoMessage, setInfoMessage]);

	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage('');
			}, 3500);

			return () => clearTimeout(timer);
		}
	}, [successMessage, setSuccessMessage]);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(
				currentCollectionData?.id || ''
			);
			setInfoMessage('Copied to clipboard');
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	const refreshCollectionId = () => {
		localStorage.removeItem('currentTodoListId');

		localStorage.removeItem('currentTodoCollectionId');

		handleIsTodoCollectionExisting(null);

		handleEnterTodoCollectionId('');

		setSuccessMessage('Reset.');

		router.push(`/`);
	};

	const deleteCollectionId = () => {
		handleDeleteTodoCollectionId();

		setSuccessMessage('Deleted');
	};

	return {
		copyToClipboard,
		refreshCollectionId,
		infoMessage,
		deleteCollectionId,
	};
};

export default useNavbar;
