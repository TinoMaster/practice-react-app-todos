import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../../hooks/useUsers";
import type { User } from "../../../types/user";

export const UserItem = ({user}: {user: User}) => {

    const navigate = useNavigate();
    // senza rinomina sarebbe: const updateUserMutation = useUpdateUser();
    // updateUserMutation.mutate(data);
    // updateUserMutation.isPending;
   const {mutate: deleteUser, isPending: isDeleting} = useDeleteUser()

    const handleDelete = () => {
        if (confirm(`sei sicuro di voler eliminare l'utente "${user.name}"?`)) {
            deleteUser(user.id);
        }
    }

    const handleEdit = () => {
        navigate(`/users/edit/${user.id}`);
    }

    const handleView = () => {
        navigate(`/users/${user.id}`);
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                    <span className="text-sm md:text-base font-medium transition-all">
                        {user.name}
                    </span>
                </div>

                <div className="flex items-center space-x-3">
                    {/* visualizza */}
                    <button
                        type="button"
                        onClick={handleView}
                        title="Visualizza"
                        className="p-1.5 text-gray-300 bg-black/20 shadow-sm hover:bg-gray-700 hover:text-gray-100 rounded-full transition-all"
                    >
                        <FaEye size={12} />
                    </button>

                    {/* modifica */}
                    <button
                        type="button"
                        onClick={handleEdit}
                        title="Modifica"
                        className="p-1.5 text-gray-300 bg-black/20 shadow-sm hover:bg-gray-700 hover:text-gray-100 rounded-full transition-all"
                    >
                        <FaEdit size={12} />
                    </button>

                    {/* elimina */}
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={handleDelete}
                        title="Elimina"
                        className="p-1.5 text-gray-300 bg-black/20 shadow-sm hover:bg-gray-700 hover:text-gray-100 rounded-full transition-all"
                    >
                        <FaTrash size={12} />
                    </button>
                </div>
            </div>
        </div>
    )
}