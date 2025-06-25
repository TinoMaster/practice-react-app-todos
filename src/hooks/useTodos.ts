import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult
} from "@tanstack/react-query";
import { todoService } from "../services/todoService";
import {
  type CreateTodoData,
  type Todo,
  type TodosQueryParams,
  type UpdateTodoData
} from "../types/todo";

// Query Keys
export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (params?: TodosQueryParams) => [...todoKeys.lists(), params] as const,
  details: () => [...todoKeys.all, "detail"] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const
};

// Hooks for queries
export const useTodos = (params?: TodosQueryParams): UseQueryResult<Todo[], Error> => {
  return useQuery({
    queryKey: todoKeys.list(params),
    queryFn: () => todoService.getTodos(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes (formerly cacheTime)
  });
};

export const useTodo = (id: number): UseQueryResult<Todo, Error> => {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoService.getTodoById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });
};

// Hooks for mutations
export const useCreateTodo = (): UseMutationResult<Todo, Error, CreateTodoData> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.createTodo,
    onSuccess: (newTodo) => {
      // Invalidate todos list queries
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });

      // Optionally, add the new todo to existing cache
      queryClient.setQueryData(todoKeys.detail(newTodo.id), newTodo);
    },
    onError: (error) => {
      console.error("Error creating todo:", error);
    }
  });
};

export const useUpdateTodo = (): UseMutationResult<
  Todo,
  Error,
  { id: number; data: Partial<UpdateTodoData> }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => todoService.updateTodo(id, data),
    onSuccess: (updatedTodo) => {
      // Update the specific todo in cache
      queryClient.setQueryData(todoKeys.detail(updatedTodo.id), updatedTodo);

      // Invalidate todos list queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
    onError: (error) => {
      console.error("Error updating todo:", error);
    }
  });
};

export const useDeleteTodo = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoService.deleteTodo,
    onSuccess: (_, deletedId) => {
      // Remove the todo from cache
      queryClient.removeQueries({ queryKey: todoKeys.detail(deletedId) });

      // Invalidate todos list queries
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
    onError: (error) => {
      console.error("Error deleting todo:", error);
    }
  });
};

// Custom hook for bulk operations
export const useBulkUpdateTodos = (): UseMutationResult<
  Todo[],
  Error,
  { ids: number[]; data: Partial<UpdateTodoData> }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ids, data }) => {
      const promises = ids.map((id) => todoService.updateTodo(id, data));
      return Promise.all(promises);
    },
    onSuccess: () => {
      // Invalidate all todo queries for consistency
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
    onError: (error) => {
      console.error("Error bulk updating todos:", error);
    }
  });
};
