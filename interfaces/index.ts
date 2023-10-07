export interface ITodo {
	id: string;
	text: string;
	done: boolean;
	updatedAt: number;
}

export interface ITodoList {
	id: string;
	title: string;
	todoCollection: ITodo[];
	updatedAt: number;
}

export interface ITodoCollection {
	id: string;
	todoLists: ITodoList[];
	updatedAt: number;
}

export interface ICollectionData {
	todoCollection: ITodoCollection;
}
