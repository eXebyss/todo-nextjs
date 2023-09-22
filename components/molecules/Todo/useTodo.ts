import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createNewTodoItem, getTodoListData } from '@/actions';
import { ITodo } from '@/interfaces';

const useTodo = (currentTodoListId: string, todoListData: ITodo[]) => {
	const [openNewTodoItemInput, setOpenNewTodoItemInput] =
		useState<boolean>(false);
	const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [todoListDataItems, setTodoListDataItems] = useState<ITodo[]>(
		todoListData || []
	);
	const [isTodoLoading, setIsTodoLoading] = useState<boolean>(false);
	const router = useRouter();
	const pathname = usePathname();

	const refreshInterval = 60000;

	useEffect(() => {
		if (currentTodoListId) {
			router.push(`${pathname}?q=${currentTodoListId}`);
		}
	}, [currentTodoListId, router, pathname]);

	const handleNewTodoItemOnChange = async (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const text = e.target.value;

		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		}

		if (text.length > 0) {
			timeoutIdRef.current = setTimeout(async () => {
				setIsTodoLoading(true);

				const createTodoItemResponse = await createNewTodoItem(
					currentTodoListId,
					text
				);

				const { message, error } = createTodoItemResponse;

				if (message) {
					const getTodoListDataResponse = await getTodoListData(
						currentTodoListId
					);

					const { message: todoListData, error: todoListDataError } =
						getTodoListDataResponse;

					if (todoListDataError) {
						throw new Error(todoListDataError);
					}

					const parsedTodoListData = JSON.parse(todoListData);

					parsedTodoListData &&
						setTodoListDataItems(parsedTodoListData);
				}

				if (error) {
					throw new Error(error);
				}

				setOpenNewTodoItemInput(false);

				setIsTodoLoading(false);
			}, 1000);
		}

		return;
	};

	const handleTodoItemInputOnBlur = async (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const text = e.target.value;

		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		}

		if (text.length > 0) {
			timeoutIdRef.current = setTimeout(async () => {
				setIsTodoLoading(true);

				const createTodoItemResponse = await createNewTodoItem(
					currentTodoListId,
					text
				);

				const { error } = createTodoItemResponse;

				if (error) {
					throw new Error(error);
				}

				setOpenNewTodoItemInput(false);

				setIsTodoLoading(false);
			}, 0);
		}

		return;
	};

	return {
		isTodoLoading,
		openNewTodoItemInput,
		todoListDataItems,
		setOpenNewTodoItemInput,
		handleNewTodoItemOnChange,
		handleTodoItemInputOnBlur,
	};
};

export default useTodo;
