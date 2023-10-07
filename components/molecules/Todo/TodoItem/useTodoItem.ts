import { useState, useRef, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { deleteTodoItem, getTodoListData, updateTodoItem } from '@/actions';
import { ITodo } from '@/interfaces';

const useTodoItem = (
	id: string,
	text: string,
	done: boolean,
	currentTodoListId: string,
	setTodoListDataItems: Dispatch<SetStateAction<ITodo[]>>,
	todoCollectionId?: string
) => {
	const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
	const [newTodoText, setNewTodoText] = useState<string>(text || '');
	const [isChecked, setIsChecked] = useState<boolean>(done || false);
	const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleDeleteTodoItem = async () => {
		const deleteTodoResponse = todoCollectionId
			? await deleteTodoItem(currentTodoListId, id, todoCollectionId)
			: await deleteTodoItem(currentTodoListId, id);

		const { message, error } = deleteTodoResponse;

		if (error) {
			throw new Error(error);
		}

		if (!error && message) {
			const getTodoListDataResponse = todoCollectionId
				? await getTodoListData(currentTodoListId, todoCollectionId)
				: await getTodoListData(currentTodoListId);

			const { message: todoListData, error: todoListDataError } =
				getTodoListDataResponse;

			if (todoListDataError) {
				throw new Error(todoListDataError);
			}

			const parsedTodoListData = JSON.parse(todoListData);

			parsedTodoListData && setTodoListDataItems(parsedTodoListData);
		}
	};

	const handleUpdateTodoItem = async () => {
		setIsChecked(!isChecked);

		const updateTodoResponse = todoCollectionId
			? await updateTodoItem(currentTodoListId, id, {
					todoText: newTodoText || text,
					todoDone: !isChecked,
					todoCollectionId: todoCollectionId,
			  })
			: await updateTodoItem(currentTodoListId, id, {
					todoText: newTodoText || text,
					todoDone: !isChecked,
			  });

		const { message, error } = updateTodoResponse;

		if (error) {
			throw new Error(error);
		}

		if (!error && message) {
			const getTodoListDataResponse = todoCollectionId
				? await getTodoListData(currentTodoListId, todoCollectionId)
				: await getTodoListData(currentTodoListId);

			const { message: todoListData, error: todoListDataError } =
				getTodoListDataResponse;

			if (todoListDataError) {
				throw new Error(todoListDataError);
			}

			const parsedTodoListData = JSON.parse(todoListData);

			parsedTodoListData && setTodoListDataItems(parsedTodoListData);
		}
	};

	const handleUpdateTodoItemOnChange = async (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const text = e.target.value;

		setNewTodoText(text);

		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		}

		if (text.length > 0) {
			timeoutIdRef.current = setTimeout(async () => {
				const updateTodoResponse = todoCollectionId
					? await updateTodoItem(currentTodoListId, id, {
							todoText: text,
							todoCollectionId,
					  })
					: await updateTodoItem(currentTodoListId, id, {
							todoText: text,
					  });

				const { message, error } = updateTodoResponse;

				if (error) {
					throw new Error(error);
				}

				if (!error && message) {
					const getTodoListDataResponse = todoCollectionId
						? await getTodoListData(
								currentTodoListId,
								todoCollectionId
						  )
						: await getTodoListData(currentTodoListId);

					const { message: todoListData, error: todoListDataError } =
						getTodoListDataResponse;

					if (todoListDataError) {
						throw new Error(todoListDataError);
					}

					const parsedTodoListData = JSON.parse(todoListData);

					parsedTodoListData &&
						setTodoListDataItems(parsedTodoListData);
				}

				setIsInputOpen(false);
			}, 1000);
		}

		return;
	};

	const handleUpdateTodoItemOnBlur = async () => {
		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		}

		if (newTodoText.length > 0) {
			timeoutIdRef.current = setTimeout(async () => {
				const updateTodoResponse = await updateTodoItem(
					currentTodoListId,
					id,
					{ todoText: newTodoText }
				);

				const { message, error } = updateTodoResponse;

				if (error) {
					throw new Error(error);
				}

				if (!error && message) {
					const getTodoListDataResponse =
						await getTodoListData(currentTodoListId);

					const { message: todoListData, error: todoListDataError } =
						getTodoListDataResponse;

					if (todoListDataError) {
						throw new Error(todoListDataError);
					}

					const parsedTodoListData = JSON.parse(todoListData);

					parsedTodoListData &&
						setTodoListDataItems(parsedTodoListData);
				}

				setIsInputOpen(false);
			}, 0);
		}

		setIsInputOpen(false);

		return;
	};

	return {
		newTodoText,
		isInputOpen,
		isChecked,
		setIsInputOpen,
		handleDeleteTodoItem,
		handleUpdateTodoItem,
		handleUpdateTodoItemOnBlur,
		handleUpdateTodoItemOnChange,
	};
};

export default useTodoItem;
