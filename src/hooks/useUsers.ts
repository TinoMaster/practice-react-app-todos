import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { User, UsersQueryParams } from "../types/user";
import { userService } from "../services/userService";

// identificatori univoci per la cache di TanStack Query
// invalidano cache specifiche, evitano richieste duplicate e permettono di aggiornare dati correlati
// TODO: chiedere più info
export const userKeys = {
    all: ["users"] as const,
    lists: () => [...userKeys.all, "list"] as const,
    list: (params?: UsersQueryParams) => [...userKeys.lists(), params] as const,
    details: () => [...userKeys.all, "detail"] as const,
    detail: (id: number) => [...userKeys.details(), id] as const
}

// hook per la query di lettura di dati
export const useUsers = (params?: UsersQueryParams): UseQueryResult<User[], Error> => {
    return useQuery({
        queryKey: userKeys.list(params),
        queryFn: () => userService.getUsers(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000 // 10 minutes (formerly cacheTime)
    })
}