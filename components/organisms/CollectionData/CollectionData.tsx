'use client';

import Navbar from '@/components/atoms/Navbar';
import Todo from '@/components/molecules/Todo';
import useCollectionData from './useCollectionData';
import { ICollectionData } from '@/interfaces';
import TodoList from '@/components/molecules/TodoList';

const CollectionData = ({
	collectionData,
}: {
	collectionData: ICollectionData;
}) => {
	const {
		currentCollectionData,
		successMessage,
		infoMessage,
		currentTodoListId,
		setCurrentTodoListId,
		setSuccessMessage,
		setInfoMessage,
		setCurrentCollectionData,
	} = useCollectionData(collectionData);

	if (!!currentCollectionData?.todoCollection) {
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
						todoCollectionId={
							currentCollectionData?.todoCollection?.id
						}
						currentTodoListId={currentTodoListId}
						setSuccessMessage={setSuccessMessage}
						setCurrentCollectionData={setCurrentCollectionData}
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
		</main>
	);
};

export default CollectionData;
