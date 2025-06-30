import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import type { UsersQueryParams } from "../../types/user";
import { useUsers } from "../../hooks/useUsers";
import { getUsersOrderedById } from "../../utils/globals.utils";
import { HeaderPage } from "../../components/ui/HeaderPage";
import { LoadingContent } from "../../components/loaders/LoadingContent";
import { DisplayError } from "../../components/ui/DisplayError";
import { DisplayUsers } from "../../features/users/components/DisplayUsers";

export default function UserList() {

    // state per il filtro
    const [filter, setFilter] = useState("all")
    const navigate = useNavigate();
    
    // useMemo per memorizzare i query params (cache) ed evitare ricalcoli inutili
    // TODO: inserire altri filtri 
    const queryParams = useMemo<UsersQueryParams>(() => {
        return {
            filters: filter !== "all" ? { search: filter } : undefined
        };
    }, [filter])

    const { data: usersData, isLoading, error } = useUsers(queryParams);

    const users = useMemo(() => {
        if (!usersData) return [];
        return getUsersOrderedById(usersData);
    }, [usersData]);

    return (
        <>
            <HeaderPage
                title="Users"
                buttonLabel="Add User"
                buttonAction={() => navigate("/users/add")}
            />
            {/* <FilterBar onFilterChange={setFilter} currentFilter={filter} /> */}
            <DisplayUsers users={users} isLoading={isLoading} />
            {isLoading && <LoadingContent/>}
            {error && <DisplayError error={error}/>}

        </>
    )
}