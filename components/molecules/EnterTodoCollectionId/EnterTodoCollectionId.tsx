'use client';

import { useState } from 'react';
import { useTodoContext } from '@/context';

const EnterTodoCollectionId = () => {
	const [todoCollectionId, setTodoCollectionId] = useState('');
	const { handleEnterTodoCollectionId, handleIsTodoCollectionExisting } =
		useTodoContext();

	return (
		<div className="hero min-h-[50vh] bg-base-200 w-11/12 mx-auto my-8 rounded-2xl shadow-lg text-center">
			<div className="hero-content">
				<div className="grid justify-items-center gap-y-4 max-w-3xl">
					<h1 className="text-2xl lg:text-5xl font-bold">
						Enter TODO collection ID:
					</h1>
					<input
						placeholder="Collection ID"
						className="input input-bordered w-full max-w-xs text-center"
						onChange={(e) => setTodoCollectionId(e.target.value)}
					/>
					<div className="flex w-full justify-around">
						<button
							type="button"
							className="btn btn-primary w-fit"
							onClick={() =>
								handleEnterTodoCollectionId(todoCollectionId)
							}
						>
							Submit
						</button>
						<button
							type="button"
							className="btn btn-secondary w-fit"
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

export default EnterTodoCollectionId;
