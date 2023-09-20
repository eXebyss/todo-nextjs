import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTodoContext } from '@/context';
import { LoadingBar, ELoadingBarSize } from '@/components/atoms/Loading';

const TodoCheck = () => {
	const { isLoading, handleIsTodoCollectionExisting } = useTodoContext();

	const router = useRouter();

	useEffect(() => {
		const currentTodoCollectionIdFromLocalStorage = localStorage.getItem(
			'currentTodoCollectionId'
		);

		if (currentTodoCollectionIdFromLocalStorage) {
			router.push(`/${currentTodoCollectionIdFromLocalStorage}`);
		}
	}, [router]);

	return (
		<div className="hero min-h-[50vh] w-11/12 mx-auto my-8 rounded-2xl text-center">
			<div className="hero-content">
				<div className="max-w-3xl">
					<h1 className="text-2xl lg:text-5xl font-bold">
						Do you have any{' '}
						<span className="text-secondary">TODO</span> collection{' '}
						<span className="text-secondary">ID</span>?
					</h1>
					<div className="flex w-full mt-4">
						<div className="grid h-20 flex-grow card rounded-box place-items-center">
							<button
								type="button"
								onClick={() =>
									handleIsTodoCollectionExisting(true)
								}
								className="btn lg:btn-ghost"
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
									className="btn lg:btn-ghost"
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
