import { useState, useRef, ChangeEvent } from 'react';
import { mutate } from 'swr';
import { deleteTodoItem, updateTodoItem } from '@/helpers';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const useTodoItem = (
	id: string,
	text: string,
	done: boolean,
	todoCollectionId: string,
	currentTodoListId: string
) => {
	const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
	const [newTodoText, setNewTodoText] = useState<string>(text || '');
	const [isChecked, setIsChecked] = useState<boolean>(done || false);
	const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleDeleteTodoItem = async () => {
		const deleteTodoResponse = await deleteTodoItem(
			todoCollectionId,
			currentTodoListId,
			id
		);

		if (deleteTodoResponse) {
			mutate(`${baseUrl}/api/v1/todo-collection/${currentTodoListId}`);
		}
	};

	const handleUpdateTodoItem = async () => {
		setIsChecked(!isChecked);

		const updateTodoResponse = await updateTodoItem(
			todoCollectionId,
			currentTodoListId,
			id,
			newTodoText || text,
			!isChecked
		);

		if (updateTodoResponse) {
			mutate(`${baseUrl}/api/v1/todo-collection/${currentTodoListId}`);
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
				const updateTodoResponse = await updateTodoItem(
					todoCollectionId,
					currentTodoListId,
					id,
					text
				);

				if (updateTodoResponse) {
					mutate(
						`${baseUrl}/api/v1/todo-collection/${currentTodoListId}`
					);
				}

				setIsInputOpen(false);
			}, 2000);
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
					todoCollectionId,
					currentTodoListId,
					id,
					newTodoText
				);

				if (updateTodoResponse) {
					mutate(
						`${baseUrl}/api/v1/todo-collection/${currentTodoListId}`
					);
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
