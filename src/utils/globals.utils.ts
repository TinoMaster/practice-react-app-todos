import type { Todo } from "../types/todo";
import type { User } from "../types/user";

export const getGreaterTodoId = (todos: Todo[]) => {
  return todos.reduce((maxId, todo) => Math.max(maxId, parseInt(todo.id)), 0);
};

export const getTodosOrderedById = (todos: Todo[]) => {
  return todos.sort((a, b) => parseInt(b.id) - parseInt(a.id));
};

export const getGreaterUserId = (users: User[]) => {
  return users.reduce((maxId, user) => Math.max(maxId, user.id), 0);
}

export const getUsersOrderedById = (users: User[]) => {
  return users.sort((a, b) => b.id - a.id);
};
