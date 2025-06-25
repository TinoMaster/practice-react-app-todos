import { useNavigate, useParams } from "react-router-dom";
import { useTodo, useUpdateTodo } from "../hooks/useTodos";
import { LoadingContent } from "../components/loaders/LoadingContent";
import { DisplayError } from "../components/ui/DisplayError";
import { type UpdateTodoData } from "../types/todo";
import { TodoForm } from "../features/todos/components/TodoForm";
import { Fragment } from "react/jsx-runtime";
import { HeaderPageDetail } from "../components/ui/HeaderPageDetail";

export default function TodoEdit() {
  const { id } = useParams<{ id: string }>();
  const todoId = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();

  const { data: todo, isLoading, error } = useTodo(todoId);
  const updateTodo = useUpdateTodo();

  const handleSubmit = async (data: UpdateTodoData) => {
    updateTodo.mutate(
      { id: todoId, data: data },
      {
        onSuccess: () => {
          navigate(`/todos`);
        }
      }
    );
  };

  if (isLoading) return <LoadingContent />;
  if (error) return <DisplayError error={error} />;
  if (!todo) return <div className="text-red-500">Todo not found</div>;

  return (
    <Fragment>
      <HeaderPageDetail title="Edit Todo" backUrl={`/todos`} />

      <div className="bg-gray-800/80 rounded-lg shadow-lg p-6 border border-gray-700">
        <TodoForm
          initialData={todo}
          onSubmit={handleSubmit}
          isSubmitting={updateTodo.isPending}
          submitButtonText="Update Todo"
        />
      </div>
    </Fragment>
  );
}
