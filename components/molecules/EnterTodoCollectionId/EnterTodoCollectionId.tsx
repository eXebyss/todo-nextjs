'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTodoContext } from '@/context';

const EnterTodoCollectionId = () => {
	const router = useRouter();
	const pathname = usePathname();

	const [todoCollectionId, setTodoCollectionId] = useState('');
	const { handleEnterTodoCollectionId, handleIsTodoCollectionExisting } =
		useTodoContext();

	const handleSubmitTodoId = () => {
		handleEnterTodoCollectionId(todoCollectionId);

		if (todoCollectionId && pathname === '/') {
			console.log('4');
			router.push(`/${todoCollectionId}`);
		}
	};

	return (
		<div className="hero min-h-[50vh] w-11/12 mx-auto my-8 rounded-2xl text-center">
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
					<div className="flex w-full justify-between lg:justify-evenly">
						<button
							type="button"
							className="btn lg:btn-ghost"
							onClick={handleSubmitTodoId}
						>
							Submit
						</button>
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

export default EnterTodoCollectionId;
