import { z } from "zod";

export const geoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

export const addressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: geoSchema,
});

export const companySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

// Zod serve pèr la validazione di dati e creazione di tipi
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: addressSchema,
  phone: z.string(),
  website: z.string(),
  company: companySchema,
});

// partial creati per la creazione e l'aggiornamento di dati
export const createUserSchema = userSchema.partial();
export const updateUserSchema = userSchema.partial();

// tipi typescript generati dai zod schemas
export type User = z.infer<typeof userSchema>;
export type CreateUserData = z.infer<typeof createUserSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;

// tipi per la risposta dell'api
export interface UsersApiResponse {
  data: User[];
  total: number;
}

// filtri e paginatura
export interface UserFilters {
  name?: string;
  username?: string;
  email?: string;
  city?: string;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// filtro completo assieme alla paginatura
export interface UsersQueryParams extends PaginationParams {
  filters?: UserFilters;
}