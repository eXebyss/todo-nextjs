'use client';

import {
	useReducer,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useCallback,
	FC,
	ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface ITodoContextProviderProps {
	children: ReactNode;
}

interface ITodoContextType {
	currentTodoCollectionId: string;
	isTodoCollectionExisting: boolean | null;
	isLoading: boolean;
	handleIsTodoCollectionExisting: (state: boolean | null) => void;
	handleEnterTodoCollectionId: (todoCollectionId: string) => void;
	handleCreateTodoCollectionId: () => void;
	handleDeleteTodoCollectionId: () => void;
	handleTodoCollectionDataUpdated: (payload: boolean) => void;
	handleSetIsLoading: (payload: boolean) => void;
}

interface ITodoContextState {
	currentTodoCollectionId: string;
	isTodoCollectionExisting: boolean | null;
	isTodoCollectionDataUpdated: boolean;
	isLoading: boolean;
}

type TTodoContextAction =
	| { type: 'SET_TODO_COLLECTION_ID'; payload: string }
	| { type: 'IS_TODO_COLLECTION_EXISTING'; payload: boolean | null }
	| { type: 'IS_TODO_COLLECTION_DATA_UPDATED'; payload: boolean }
	| { type: 'IS_LOADING'; payload: boolean };

const TodoContext = createContext<ITodoContextType>({
	currentTodoCollectionId: '',
	isTodoCollectionExisting: null,
	isLoading: false,
	handleIsTodoCollectionExisting: () => {},
	handleEnterTodoCollectionId: () => {},
	handleCreateTodoCollectionId: () => {},
	handleDeleteTodoCollectionId: () => {},
	handleTodoCollectionDataUpdated: () => {},
	handleSetIsLoading: () => {},
});

export const useTodoContext = () => useContext(TodoContext);

export const TodoContextProvider: FC<ITodoContextProviderProps> = ({
	children,
}) => {
	const router = useRouter();
	const pathname = usePathname();

	const initialState = {
		currentTodoCollectionId: '',
		isTodoCollectionExisting: null,
		isTodoCollectionDataUpdated: false,
		isLoading: false,
	};

	const reducer = (state: ITodoContextState, action: TTodoContextAction) => {
		switch (action.type) {
			case 'SET_TODO_COLLECTION_ID':
				return {
					...state,
					currentTodoCollectionId: action.payload,
				};
			case 'IS_TODO_COLLECTION_EXISTING':
				return {
					...state,
					isTodoCollectionExisting: action.payload,
				};
			case 'IS_TODO_COLLECTION_DATA_UPDATED':
				return {
					...state,
					isTodoCollectionDataUpdated: action.payload,
				};
			case 'IS_LOADING':
				return {
					...state,
					isLoading: action.payload,
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleIsTodoCollectionExisting = (state: boolean | null) => {
		dispatch({
			type: 'IS_TODO_COLLECTION_EXISTING',
			payload: state,
		});
	};

	const handleSetIsLoading = (state: boolean) => {
		dispatch({
			type: 'IS_LOADING',
			payload: state,
		});
	};

	const handleEnterTodoCollectionId = (todoCollectionId: string) => {
		dispatch({
			type: 'SET_TODO_COLLECTION_ID',
			payload: todoCollectionId,
		});
	};

	const handleCreateTodoCollectionId = useCallback(async () => {
		handleSetIsLoading(true);

		try {
			const res = await fetch('/api/v1/todo-collection', {
				method: 'POST',
			});

			if (res.status === 201) {
				const { id } = await res.json();

				if (id) {
					dispatch({
						type: 'SET_TODO_COLLECTION_ID',
						payload: id,
					});

					localStorage.setItem('currentTodoCollectionId', id);

					router.push(`/${id}`);
				}

				dispatch({
					type: 'IS_TODO_COLLECTION_EXISTING',
					payload: null,
				});

				handleSetIsLoading(false);
			} else {
				throw new Error('Error Creating TODO Collection');
			}
		} catch (error) {
			console.error(error);
		}
	}, [dispatch, router]);

	const handleDeleteTodoCollectionId = useCallback(async () => {
		try {
			const res = await fetch(
				`/api/v1/todo-collection?todoCollectionId=${state.currentTodoCollectionId}`,
				{
					method: 'DELETE',
				}
			);

			if (res.status === 200) {
				localStorage.removeItem('currentTodoListId');

				localStorage.removeItem('currentTodoCollectionId');

				router.push(`/`);

				dispatch({
					type: 'SET_TODO_COLLECTION_ID',
					payload: '',
				});
			} else {
				throw new Error('Error Deleting TODO Collection');
			}
		} catch (error) {
			console.error(error);
		}
	}, [state.currentTodoCollectionId, router]);

	const handleTodoCollectionDataUpdated = useCallback((payload: boolean) => {
		dispatch({
			type: 'IS_TODO_COLLECTION_DATA_UPDATED',
			payload: payload,
		});
	}, []);

	// * Runs only once when the component is mounted.
	useEffect(() => {
		const currentTodoCollectionId = localStorage.getItem(
			'currentTodoCollectionId'
		);

		if (currentTodoCollectionId) {
			dispatch({
				type: 'SET_TODO_COLLECTION_ID',
				payload: currentTodoCollectionId,
			});
		} else {
			dispatch({
				type: 'IS_TODO_COLLECTION_EXISTING',
				payload: null,
			});
		}
	}, [router, pathname]);

	const contextValue = useMemo(() => {
		const { currentTodoCollectionId, isTodoCollectionExisting, isLoading } =
			state;

		return {
			currentTodoCollectionId,
			isTodoCollectionExisting,
			isLoading,
			handleIsTodoCollectionExisting,
			handleEnterTodoCollectionId,
			handleCreateTodoCollectionId,
			handleDeleteTodoCollectionId,
			handleTodoCollectionDataUpdated,
			handleSetIsLoading,
		};
	}, [
		state,
		handleCreateTodoCollectionId,
		handleDeleteTodoCollectionId,
		handleTodoCollectionDataUpdated,
	]);

	return (
		<TodoContext.Provider value={contextValue}>
			{children}
		</TodoContext.Provider>
	);
};
