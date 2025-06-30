import { useNavigate, useParams } from "react-router-dom";
import { HeaderPageDetail } from "../../components/ui/HeaderPageDetail";
import { useUpdateUser, useUser } from "../../hooks/useUsers";
import type { UpdateUserData } from "../../types/user";
import { LoadingContent } from "../../components/loaders/LoadingContent";
import { DisplayError } from "../../components/ui/DisplayError";
import { UserForm } from "../../features/users/components/UserForm";
// import { UserForm } from "../../features/users/components/UserForm";

export default function UserEdit() {

    const {id} = useParams<{id: string}>();
    const userId = id ? parseInt(id, 10) : 0;
    const navigate = useNavigate();


    const {data: user, isLoading, error} = useUser(userId);
    const updateUser = useUpdateUser();

    const handleSubmit = async (data: UpdateUserData) => {
        updateUser.mutate(
            {id: userId, data: data},
            {
                onSuccess: () => {
                    navigate(`/users`);
                }
            }
        )
    }

    if (isLoading) return <LoadingContent />;
    if (error) return <DisplayError error={error} />;
    if (!user) return <div className="text-red-500">User not found</div>;

    return (
        <>
            <HeaderPageDetail title="Edit User" backUrl={`/users`} />

            <div className="bg-gray-800/80 rounded-lg shadow-lg p-6 border border-gray-700">
                <UserForm initialData={user} onSubmit={handleSubmit} isSubmitting={updateUser.isPending} />
            </div>
        </>
    )
}