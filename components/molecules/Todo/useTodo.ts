import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { createNewTodoItem } from '@/helpers';
import useSWR, { mutate } from 'swr';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const useTodo = (currentTodoListId: string, todoCollectionId: string) => {
	const [openNewTodoItemInput, setOpenNewTodoItemInput] =
		useState<boolean>(false);
	const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [isTodoLoading, setIsTodoLoading] = useState<boolean>(false);
	const fetcher = (url: string) => fetch(url).then((res) => res.json());

	const refreshInterval = 60000;

	const {
		data: todoListData,
		error,
		isLoading,
	} = useSWR(
		`${baseUrl}/api/v1/todo-collection/${currentTodoListId}`,
		fetcher,
		{ refreshInterval: refreshInterval }
	);

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
					todoCollectionId,
					currentTodoListId,
					text
				);

				if (createTodoItemResponse) {
					mutate(
						`${baseUrl}/api/v1/todo-collection/${currentTodoListId}`
					);
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
					todoCollectionId,
					currentTodoListId,
					text
				);

				if (createTodoItemResponse) {
					mutate(
						`${baseUrl}/api/v1/todo-collection/${currentTodoListId}`
					);
				}

				setOpenNewTodoItemInput(false);

				setIsTodoLoading(false);
			}, 0);
		}

		return;
	};

	return {
		todoListData,
		error,
		isLoading,
		isTodoLoading,
		openNewTodoItemInput,
		setOpenNewTodoItemInput,
		handleNewTodoItemOnChange,
		handleTodoItemInputOnBlur,
	};
};

export default useTodo;
