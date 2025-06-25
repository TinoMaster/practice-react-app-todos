import {
  type CreateTodoData,
  type Todo,
  type TodosQueryParams,
  type UpdateTodoData,
  todoSchema
} from "../types/todo";

const BASE_URL = "http://localhost:3001";
/* const BASE_URL = "https://jsonplaceholder.typicode.com/"; */

class TodoService {
  private async fetchWithValidation<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getTodos(params?: TodosQueryParams): Promise<Todo[]> {
    const url = new URL(`${BASE_URL}/todos`);

    // Add pagination parameters
    if (params?.page && params?.limit) {
      url.searchParams.set("_page", params.page.toString());
      url.searchParams.set("_limit", params.limit.toString());
    }

    // Add filters
    if (params?.filters?.userId) {
      url.searchParams.set("userId", params.filters.userId.toString());
    }

    if (params?.filters?.completed !== undefined) {
      url.searchParams.set("completed", params.filters.completed.toString());
    }

    const todos = await this.fetchWithValidation<Todo[]>(url.toString());

    // Validate response data
    return todos.map((todo) => todoSchema.parse(todo));
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.fetchWithValidation<Todo>(`${BASE_URL}/todos/${id}`);
    return todoSchema.parse(todo);
  }

  async createTodo(data: CreateTodoData): Promise<Todo> {
    const todo = await this.fetchWithValidation<Todo>(`${BASE_URL}/todos`, {
      method: "POST",
      body: JSON.stringify(data)
    });

    return todoSchema.parse(todo);
  }

  async updateTodo(id: number, data: Partial<UpdateTodoData>): Promise<Todo> {
    const todo = await this.fetchWithValidation<Todo>(`${BASE_URL}/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data)
    });

    return todoSchema.parse(todo);
  }

  async deleteTodo(id: number): Promise<void> {
    await this.fetchWithValidation(`${BASE_URL}/todos/${id}`, {
      method: "DELETE"
    });
  }

  filterTodos(todos: Todo[], filters?: { search?: string; completed?: boolean }): Todo[] {
    if (!filters) return todos;

    return todos.filter((todo) => {
      if (filters.search && !todo.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      if (filters.completed !== undefined && todo.completed !== filters.completed) {
        return false;
      }

      return true;
    });
  }
}

export const todoService = new TodoService();
