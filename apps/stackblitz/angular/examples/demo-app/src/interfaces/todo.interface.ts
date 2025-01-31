import { Pagination } from './pagination.interface';

export interface Todo {
  completed: boolean;
  id: number;
  todo: string;
  userId: number;
}

export interface TodoResponse extends Pagination {
  todos: Todo[];
}
