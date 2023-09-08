'use client';

import { useTodoContext } from '@/context';
import CreateTodoCollectionId from '@/components/molecules/CreateTodoCollectionId';
import EnterTodoCollectionId from '@/components/molecules/EnterTodoCollectionId';
import TodoCheck from '@/components/molecules/TodoCheck';
import { LoadingBar, ELoadingBarSize } from '@/components/atoms/Loading';

const InitialScreen = () => {
	const { isLoading, isTodoCollectionExisting } = useTodoContext();

	if (isTodoCollectionExisting === null) {
		if (isLoading) {
			return (
				<div className="w-fit mx-auto">
					<LoadingBar size={ELoadingBarSize.lg} />
				</div>
			);
		}

		return <TodoCheck />;
	}

	if (isTodoCollectionExisting) {
		return <EnterTodoCollectionId />;
	}

	if (!isTodoCollectionExisting) {
		return <CreateTodoCollectionId />;
	}

	return <h1 className="text-error">Render Error!</h1>;
};

export default InitialScreen;
