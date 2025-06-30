import type { User } from "../../../types/user";
import { UserItem } from "./UserItem";

export const DisplayUsers = ({users, isLoading}: {users: User[], isLoading: boolean}) => {
    return (
        <div className="space-y-4">
        {users?.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-400">
            <svg
              className="mx-auto h-12 w-12 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
            <p className="mt-2">There are no todos</p>
          </div>
        )}
  
        {users?.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
}