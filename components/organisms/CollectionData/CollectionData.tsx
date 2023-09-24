'use client';

import Navbar from '@/components/atoms/Navbar';
import Todo from '@/components/molecules/Todo';
import useCollectionData from './useCollectionData';
import { ITodo, ITodoCollection } from '@/interfaces';
import TodoList from '@/components/molecules/TodoList';
import { ELoadingBarSize, LoadingBar } from '@/components/atoms/Loading';

const CollectionData = ({
	collectionData,
	todoListData,
}: {
	collectionData: ITodoCollection;
	todoListData?: ITodo[];
}) => {
	const {
		currentCollectionData,
		successMessage,
		infoMessage,
		currentTodoListId,
		isLoading,
		setCurrentTodoListId,
		setSuccessMessage,
		setInfoMessage,
		setCurrentCollectionData,
	} = useCollectionData(collectionData);

	if (!!currentCollectionData) {
		return (
			<main className="lg:max-w-7xl w-11/12 mx-auto lg:min-h-screen">
				<Navbar
					currentCollectionData={currentCollectionData}
					successMessage={successMessage}
					setSuccessMessage={setSuccessMessage}
					infoMessage={infoMessage}
					setInfoMessage={setInfoMessage}
				/>

				<div className="lg:grid lg:grid-cols-[4fr_2fr] lg:min-h-[70vh]">
					<TodoList
						currentCollectionData={currentCollectionData}
						currentTodoListId={currentTodoListId}
						setCurrentTodoListId={setCurrentTodoListId}
						setSuccessMessage={setSuccessMessage}
						setCurrentCollectionData={setCurrentCollectionData}
					/>
					<Todo
						todoCollectionId={currentCollectionData?.id}
						currentTodoListId={currentTodoListId}
						setSuccessMessage={setSuccessMessage}
						setCurrentCollectionData={setCurrentCollectionData}
						todoListData={todoListData || null}
					/>
				</div>
			</main>
		);
	}

	return (
		<main>
			<h1 className="w-full mx-auto my-8 text-warning text-center">
				Nothing is found! 🤷
			</h1>
			{isLoading && (
				<div className="w-full flex justify-center my-8">
					<LoadingBar size={ELoadingBarSize.lg} />
				</div>
			)}
		</main>
	);
};

export default CollectionData;
