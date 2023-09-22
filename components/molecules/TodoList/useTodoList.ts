import {
	useState,
	useEffect,
	useRef,
	ChangeEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import {
	createNewTodoList,
	getCollectionData,
	deleteTodoList,
} from '@/actions';
import { ITodoCollection } from '@/interfaces';
import { useTodoContext } from '@/context';

const useTodoList = (
	currentCollectionData: ITodoCollection,
	currentTodoListId: string,
	setCurrentTodoListId: (id: string) => void,
	setSuccessMessage: (message: string) => void,
	setCurrentCollectionData: Dispatch<SetStateAction<ITodoCollection>>
) => {
	const [openNewTodoListInput, setOpenNewTodoListInput] =
		useState<boolean>(false);
	const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const { handleSetIsLoading } = useTodoContext();

	useEffect(() => {
		if (currentTodoListId) {
			localStorage.setItem('currentTodoListId', currentTodoListId);
		}

		if (!currentTodoListId) {
			const storedTodoListId = localStorage.getItem('currentTodoListId');

			if (storedTodoListId) {
				setCurrentTodoListId(storedTodoListId);
			}

			if (currentCollectionData?.todoLists[0]?.id) {
				setCurrentTodoListId(currentCollectionData?.todoLists[0]?.id);

				localStorage.setItem('currentTodoListId', currentTodoListId);
			}
		}
	}, [
		currentTodoListId,
		currentCollectionData?.todoLists,
		setCurrentTodoListId,
	]);

	const handleCreateNewTodoListOnChange = async (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const text = e.target.value;

		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		}

		if (text.length > 0) {
			timeoutIdRef.current = setTimeout(async () => {
				handleSetIsLoading(true);

				const createListResponse = await createNewTodoList(
					currentCollectionData?.id,
					text
				);

				if (createListResponse) {
					setSuccessMessage('New list created');
					setOpenNewTodoListInput(false);

					const getCollectionResponse = await getCollectionData(
						currentCollectionData?.id
					);
					const { message, error } = getCollectionResponse;

					if (error) {
						throw new Error(error);
					}

					if (getCollectionResponse && !!JSON.parse(message)) {
						setCurrentCollectionData(JSON.parse(message));
					}
				}

				handleSetIsLoading(false);
			}, 1000);
		}

		return;
	};

	const cancelNewTodoListInput = () => {
		setOpenNewTodoListInput(false);
	};

	const handleCancelNewTodoListInputOnBlur = () => {
		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		}

		cancelNewTodoListInput();
	};

	const handleDeleteTodoList = async (todoListId: string) => {
		const deleteListResponse = await deleteTodoList(todoListId);

		if (deleteListResponse) {
			setSuccessMessage('List deleted');

			const getCollectionResponse = await getCollectionData(
				currentCollectionData?.id
			);

			const { message, error } = getCollectionResponse;

			if (error) {
				throw new Error(error);
			}

			if (getCollectionResponse && !!JSON.parse(message)) {
				setCurrentCollectionData(JSON.parse(message));
			}
		}
	};

	return {
		openNewTodoListInput,
		cancelNewTodoListInput,
		handleDeleteTodoList,
		setOpenNewTodoListInput,
		handleCreateNewTodoListOnChange,
		handleCancelNewTodoListInputOnBlur,
	};
};

export default useTodoList;
