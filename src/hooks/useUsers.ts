import { useMutation, useQuery, useQueryClient, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import type { CreateUserData, UpdateUserData, User, UsersQueryParams } from "../types/user";
import { userService } from "../services/userService";

// identificatori univoci per la cache di TanStack Query
// invalidano cache specifiche, evitano richieste duplicate e permettono di aggiornare dati correlati
// all: chiave per tutti gli utenti
// lists: chiave per la lista di utenti
// list: chiave per la lista di utenti con parametri opzionali
// details: chiave per i dettagli di un utente
// detail: chiave per i dettagli di un utente con id
export const userKeys = {
    all: ["users"] as const,
    lists: () => [...userKeys.all, "list"] as const,
    list: (params?: UsersQueryParams) => [...userKeys.lists(), params] as const,
    details: () => [...userKeys.all, "detail"] as const,
    detail: (id: number) => [...userKeys.details(), id] as const
}

// hook per la query di lettura di dati
// se non passiamo parametri, usiamo la chiave list, altrimenti usiamo la chiave list con i parametri
// usiamo staleTime e gcTime per gestire la cache
export const useUsers = (params?: UsersQueryParams): UseQueryResult<User[], Error> => {
    return useQuery({
        queryKey: userKeys.list(params),
        queryFn: () => userService.getUsers(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000 // 10 minutes (formerly cacheTime)
    })
}

// query per recuperare un singolo utente
export const useUser = (id: number): UseQueryResult<User, Error> => {
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: () => userService.getUserById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

// mutation per eliminare un utente
// usiamo queryClient per invalidare la cache della lista di utenti
// usiamo onError per gestire gli errori
export const useDeleteUser = (): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => userService.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
        onError: (error) => {
            console.error("Error deleting user:", error);
        }
    });
}

// mutation per creare un utente
// usiamo queryClient per invalidare la cache della lista di utenti
// usiamo onError per gestire gli errori
export const useCreateUser = (): UseMutationResult<User, Error, CreateUserData> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userData) => userService.createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
        onError: (error) => {
            console.error("Error creating user:", error);
        }
    });
}

export const useUpdateUser = (): UseMutationResult<User, Error, {id: number, data: Partial<UpdateUserData>}> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data}) => userService.updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
        onError: (error) => {
            console.error("Error updating user:", error);
        }
    })
}