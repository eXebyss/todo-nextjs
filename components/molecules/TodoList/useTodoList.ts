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
	deleteTodoList,
	getCollectionData,
} from '@/helpers';
import { ICollectionData } from '@/interfaces';
import { useTodoContext } from '@/context';

const useTodoList = (
	currentCollectionData: ICollectionData,
	currentTodoListId: string,
	setCurrentTodoListId: (id: string) => void,
	setSuccessMessage: (message: string) => void,
	setCurrentCollectionData: Dispatch<SetStateAction<ICollectionData>>
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

			if (currentCollectionData?.todoCollection?.todoLists[0]?.id) {
				setCurrentTodoListId(
					currentCollectionData?.todoCollection?.todoLists[0]?.id
				);

				localStorage.setItem('currentTodoListId', currentTodoListId);
			}
		}
	}, [
		currentTodoListId,
		currentCollectionData?.todoCollection?.todoLists,
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
					currentCollectionData?.todoCollection?.id,
					text
				);

				if (createListResponse) {
					setSuccessMessage('New list created');
					setOpenNewTodoListInput(false);

					const getCollectionResponse = await getCollectionData(
						currentCollectionData?.todoCollection?.id
					);

					if (getCollectionResponse) {
						setCurrentCollectionData(getCollectionResponse);
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
				currentCollectionData?.todoCollection?.id
			);

			if (getCollectionResponse) {
				setCurrentCollectionData(getCollectionResponse);
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
