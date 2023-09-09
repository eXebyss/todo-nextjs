'use client';

import { LoadingBar, ELoadingBarSize } from '@/components/atoms/Loading';
import { useTodoContext } from '@/context';

const CreateTodoCollectionId = () => {
	const {
		isLoading,
		handleCreateTodoCollectionId,
		handleIsTodoCollectionExisting,
	} = useTodoContext();

	return (
		<div className="hero min-h-[50vh] w-11/12 mx-auto my-8 rounded-2xl text-center">
			<div className="hero-content w-full">
				<div className="grid justify-items-center gap-y-4 w-full lg:w-auto lg:max-w-3xl">
					<h1 className="text-2xl lg:text-5xl font-bold">
						Create TODO
					</h1>

					<div className="flex w-full justify-evenly lg:justify-between">
						{isLoading ? (
							<LoadingBar size={ELoadingBarSize.lg} />
						) : (
							<button
								type="button"
								className="btn lg:btn-ghost"
								onClick={handleCreateTodoCollectionId}
							>
								Create
							</button>
						)}

						<button
							type="button"
							className="btn lg:btn-ghost"
							onClick={() => handleIsTodoCollectionExisting(null)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateTodoCollectionId;
