export interface ITodo {
	id: string;
	text: string;
	done: boolean;
}

export interface ITodoList {
	id: string;
	title: string;
	todos: ITodo[];
}

export interface ITodoCollection {
	id: string;
	todoLists: ITodoList[];
}

export interface ICollectionData {
	todoCollection: ITodoCollection;
}
