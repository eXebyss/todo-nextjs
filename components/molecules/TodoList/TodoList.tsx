import { PlusIcon, TrashIcon } from '@/icons';
import { ICollectionData, ITodoList } from '@/interfaces';
import useTodoList from './useTodoList';
import { Dispatch, SetStateAction } from 'react';
import { useTodoContext } from '@/context';
import { ELoadingBarSize, LoadingBar } from '@/components/atoms/Loading';
import { useWindowSize } from '@/hooks';

interface ITodoListProps {
	currentCollectionData: ICollectionData;
	currentTodoListId: string;
	setCurrentTodoListId: (id: string) => void;
	setCurrentCollectionData: Dispatch<SetStateAction<ICollectionData>>;
	setSuccessMessage: (message: string) => void;
}

const TodoList = ({
	currentCollectionData,
	currentTodoListId,
	setCurrentTodoListId,
	setCurrentCollectionData,
	setSuccessMessage,
}: ITodoListProps) => {
	const {
		openNewTodoListInput,
		handleDeleteTodoList,
		setOpenNewTodoListInput,
		handleCancelNewTodoListInputOnBlur,
		handleCreateNewTodoListOnChange,
	} = useTodoList(
		currentCollectionData,
		currentTodoListId,
		setCurrentTodoListId,
		setSuccessMessage,
		setCurrentCollectionData
	);
	const { isLoading } = useTodoContext();
	const { width } = useWindowSize();

	const isDesktop: boolean = width >= 1024;

	const mobileTodoList: JSX.Element = (
		<div className="w-full my-8 text-center sticky top-0 shadow-lg lg:shadow-none lg:col-start-2 lg:row-start-1">
			<div className="collapse collapse-plus bg-base-200 lg:bg-transparent pt-4 lg:pt-0">
				<input title="Todo list" type="checkbox" />
				<div className="collapse-title text-xl font-medium">
					<h3 className="text-3xl font-bold">TODO list: </h3>
				</div>
				<div className="collapse-content mb-4">
					{currentCollectionData?.todoCollection?.todoLists.length >
					0 ? (
						<div className="menu w-full rounded-box pb-0">
							{currentCollectionData?.todoCollection?.todoLists.map(
								(todoList: ITodoList) => (
									<div
										key={todoList.id}
										className="flex items-center"
									>
										<button
											type="button"
											className={`btn btn-ghost content-center normal-case break-all w-[80%] ${
												currentTodoListId ===
												todoList.id
													? 'text-primary'
													: ''
											}`}
											onClick={() =>
												setCurrentTodoListId(
													todoList.id
												)
											}
										>
											{todoList?.title || 'No Title'}
										</button>
										<button
											type="button"
											title="Delete"
											className="btn btn-ghost content-center"
											onClick={() =>
												handleDeleteTodoList(
													todoList.id
												)
											}
										>
											<TrashIcon />
										</button>
									</div>
								)
							)}
						</div>
					) : (
						<p className="my-4 text-warning">
							Todo list is not found!
						</p>
					)}

					<div className="h-16 flex justify-center">
						{isLoading ? (
							<LoadingBar size={ELoadingBarSize.lg} />
						) : !openNewTodoListInput ? (
							<button
								title="Add new todo list"
								className="btn btn-ghost m-2 w-52 p-0 border-dashed border-2 border-neutral-content"
								type="button"
								onClick={() => setOpenNewTodoListInput(true)}
							>
								<PlusIcon />
							</button>
						) : (
							<input
								type="text"
								className="input m-2 w-52 text-center"
								placeholder="Enter todo list title"
								onChange={handleCreateNewTodoListOnChange}
								onBlur={handleCancelNewTodoListInputOnBlur}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);

	const desktopTodoList: JSX.Element = (
		<div className="w-full my-8 text-center sticky top-0 shadow-lg lg:shadow-none lg:col-start-2 lg:row-start-1 lg:p-4">
			<h3 className="text-3xl font-bold">TODO list: </h3>
			{currentCollectionData?.todoCollection?.todoLists.length > 0 ? (
				<div className="menu w-full rounded-box pb-0 lg:my-4">
					{currentCollectionData?.todoCollection?.todoLists.map(
						(todoList: ITodoList) => (
							<div
								key={todoList.id}
								className="grid grid-cols-[3fr_1fr]"
							>
								<button
									type="button"
									className={`btn btn-ghost content-center normal-case break-all ${
										currentTodoListId === todoList.id
											? 'text-primary'
											: ''
									}`}
									onClick={() =>
										setCurrentTodoListId(todoList.id)
									}
								>
									{todoList?.title || 'No Title'}
								</button>
								<button
									type="button"
									title="Delete"
									className="btn btn-ghost content-center"
									onClick={() =>
										handleDeleteTodoList(todoList.id)
									}
								>
									<TrashIcon />
								</button>
							</div>
						)
					)}
				</div>
			) : (
				<p className="my-4 text-warning">Todo list is not found!</p>
			)}

			<div className="h-16 flex justify-center">
				{isLoading ? (
					<LoadingBar size={ELoadingBarSize.lg} />
				) : !openNewTodoListInput ? (
					<button
						title="Add new todo list"
						className="btn btn-ghost m-2 w-52 p-0 border-dashed border-2 border-neutral-content"
						type="button"
						onClick={() => setOpenNewTodoListInput(true)}
					>
						<PlusIcon />
					</button>
				) : (
					<input
						type="text"
						className="input m-2 w-52 text-center"
						placeholder="Enter todo list title"
						onChange={handleCreateNewTodoListOnChange}
						onBlur={handleCancelNewTodoListInputOnBlur}
					/>
				)}
			</div>
		</div>
	);

	return <> {isDesktop ? desktopTodoList : mobileTodoList}</>;
};

export default TodoList;
