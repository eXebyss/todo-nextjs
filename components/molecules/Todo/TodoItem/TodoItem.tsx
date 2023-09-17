import { TrashIcon } from '@/icons';
import useTodoItem from './useTodoItem';

interface ITodoItemProps {
	id: string;
	text: string;
	done: boolean;
	todoCollectionId: string;
	currentTodoListId: string;
}

const TodoItem = ({
	id,
	text,
	done,
	todoCollectionId,
	currentTodoListId,
}: ITodoItemProps) => {
	const {
		newTodoText,
		isInputOpen,
		isChecked,
		setIsInputOpen,
		handleDeleteTodoItem,
		handleUpdateTodoItem,
		handleUpdateTodoItemOnBlur,
		handleUpdateTodoItemOnChange,
	} = useTodoItem(id, text, done, todoCollectionId, currentTodoListId);

	return (
		<div key={id} className="flex items-center">
			<input
				title="Select"
				type="checkbox"
				className="checkbox"
				onChange={handleUpdateTodoItem}
				checked={isChecked}
			/>

			{!isInputOpen ? (
				<button
					type="button"
					className={`btn btn-ghost content-center normal-case break-all w-[75%] lg:w-[80%] mx-2 lg:mx-4 ${
						isChecked ? 'line-through' : ''
					}`}
					onClick={() => setIsInputOpen(true)}
				>
					{text || id || 'No text'}
				</button>
			) : (
				<input
					type="text"
					className="input my-2 lg:w-52"
					placeholder="Enter new todo list title"
					value={newTodoText}
					onChange={handleUpdateTodoItemOnChange}
					onBlur={handleUpdateTodoItemOnBlur}
				/>
			)}

			{isChecked && (
				<button
					type="button"
					title="Delete"
					className="btn btn-ghost content-center"
					onClick={handleDeleteTodoItem}
				>
					<TrashIcon />
				</button>
			)}
		</div>
	);
};

export default TodoItem;
