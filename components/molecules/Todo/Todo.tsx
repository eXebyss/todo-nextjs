import { PlusIcon } from '@/icons';
import { Dispatch, SetStateAction } from 'react';
import TodoItem from './TodoItem';
import useTodo from './useTodo';
import { ICollectionData } from '@/interfaces';
import { ELoadingBarSize, LoadingBar } from '@/components/atoms/Loading';

interface ITodoProps {
	todoCollectionId: string;
	currentTodoListId: string;
	setSuccessMessage: Dispatch<SetStateAction<string>>;
	setCurrentCollectionData: Dispatch<SetStateAction<ICollectionData>>;
}

const Todo = ({ todoCollectionId, currentTodoListId }: ITodoProps) => {
	const {
		todoListData,
		error,
		isLoading,
		isTodoLoading,
		openNewTodoItemInput,
		setOpenNewTodoItemInput,
		handleNewTodoItemOnChange,
		handleTodoItemInputOnBlur,
	} = useTodo(currentTodoListId, todoCollectionId);

	const collectionListTodo =
		todoListData && todoListData.length > 0
			? todoListData?.map(
					(todo: { id: string; text: string; done: boolean }) => (
						<TodoItem
							key={todo.id || todo.text}
							id={todo.id}
							text={todo.text}
							done={todo.done}
							todoCollectionId={todoCollectionId}
							currentTodoListId={currentTodoListId}
						/>
					)
			  )
			: null;

	return (
		<div className="hero min-h-[50vh] lg:min-h-0 lg:h-fit lg:bg-base-200 w-full p-4 my-8 rounded-2xl lg:shadow-lg text-center lg:col-start-1 lg:row-start-1">
			<div className="text-center w-full lg:px-12">
				<h3 className="text-3xl font-bold">TODO: </h3>
				<div className="grid justify-items-center my-4 gap-y-4">
					{error && <p className="text-error">Loading data error!</p>}
					{isLoading && <LoadingBar size={ELoadingBarSize.lg} />}
					{todoListData && (
						<div className="menu w-full rounded-box pb-0">
							{collectionListTodo}
						</div>
					)}
					{todoListData?.length === 0 && <p>No todo items.</p>}
					{todoListData?.todoCollection === null && (
						<p>Select todo list.</p>
					)}
					{todoListData?.message && (
						<p className="text-error">{todoListData?.message}</p>
					)}

					<div className="h-16 flex justify-center">
						{isTodoLoading ? (
							<LoadingBar size={ELoadingBarSize.lg} />
						) : !openNewTodoItemInput ? (
							<button
								title="Add new todo item"
								className="btn btn-ghost m-2 w-52 p-0 border-dashed border-2 border-neutral-content"
								type="button"
								onClick={() => setOpenNewTodoItemInput(true)}
							>
								<PlusIcon />
							</button>
						) : (
							<input
								type="text"
								className="input m-2 w-52 text-center"
								placeholder="Type here..."
								onChange={handleNewTodoItemOnChange}
								onBlur={handleTodoItemInputOnBlur}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="hero-content flex-col lg:flex-row-reverse gap-x-8"></div>
		</div>
	);
};

export default Todo;
