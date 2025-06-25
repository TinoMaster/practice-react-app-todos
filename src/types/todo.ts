import { z } from "zod";

// Zod schemas for validation
export const todoSchema = z.object({
  id: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val)),
  userId: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val)),
  title: z.string().min(1, "Title is required"),
  completed: z.boolean()
});

export const createTodoSchema = todoSchema.omit({ id: true });
export const updateTodoSchema = todoSchema.partial().required({ id: true });

// TypeScript types derived from Zod schemas
export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoData = z.infer<typeof createTodoSchema>;
export type UpdateTodoData = z.infer<typeof updateTodoSchema>;

// API Response types
export interface TodosApiResponse {
  data: Todo[];
  total: number;
}

// Filter and pagination types
export interface TodoFilters {
  userId?: number;
  completed?: boolean;
  search?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface TodosQueryParams extends PaginationParams {
  filters?: TodoFilters;
}
