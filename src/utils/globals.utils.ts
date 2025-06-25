import type { Todo } from "../types/todo";

export const getGreaterTodoId = (todos: Todo[]) => {
  return todos.reduce((maxId, todo) => Math.max(maxId, parseInt(todo.id)), 0);
};

export const getTodosOrderedById = (todos: Todo[]) => {
  return todos.sort((a, b) => parseInt(b.id) - parseInt(a.id));
};
