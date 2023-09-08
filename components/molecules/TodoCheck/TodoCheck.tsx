import { useTodoContext } from '@/context';
import { LoadingBar, ELoadingBarSize } from '@/components/atoms/Loading';

const TodoCheck = () => {
	const { isLoading, handleIsTodoCollectionExisting } = useTodoContext();

	return (
		<div className="hero min-h-[50vh] bg-base-200 w-11/12 mx-auto my-8 rounded-2xl shadow-lg text-center">
			<div className="hero-content">
				<div className="max-w-3xl">
					<h1 className="text-2xl lg:text-5xl font-bold">
						Do you have any TODO collection ID?
					</h1>
					<div className="flex w-full mt-4">
						<div className="grid h-20 flex-grow card rounded-box place-items-center">
							<button
								type="button"
								onClick={() =>
									handleIsTodoCollectionExisting(true)
								}
								className="btn btn-primary w-fit"
							>
								Yes
							</button>
						</div>
						<div className="divider divider-horizontal">OR</div>
						<div className="grid h-20 flex-grow card rounded-box place-items-center">
							{isLoading ? (
								<LoadingBar size={ELoadingBarSize.lg} />
							) : (
								<button
									type="button"
									onClick={() =>
										handleIsTodoCollectionExisting(false)
									}
									className="btn btn-secondary w-fit"
								>
									No
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoCheck;
