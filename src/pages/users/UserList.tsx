import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import type { UsersQueryParams } from "../../types/user";

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

    // const { data: usersData, isLoading, error } = useUsers(queryParams);

    return (
        <div>
            <h1>User List</h1>
        </div>
    )
}