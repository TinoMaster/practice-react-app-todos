import { useNavigate } from "react-router-dom";
import { TodoForm } from "../features/todos/components/TodoForm";
import { useCreateTodo } from "../hooks/useTodos";
import { type CreateTodoData } from "../types/todo";
import { Fragment } from "react";
import { HeaderPageDetail } from "../components/ui/HeaderPageDetail";

export default function TodoAdd() {
  const navigate = useNavigate();
  const createTodo = useCreateTodo();

  const handleSubmit = (data: CreateTodoData) => {
    console.log(data);
    createTodo.mutate(data, {
      onSuccess: () => {
        navigate("/todos");
      }
    });
  };

  return (
    <Fragment>
      <HeaderPageDetail title="Create New Todo" backUrl="/todos" />

      <div className="bg-gray-800/80 rounded-lg shadow-lg p-6 border border-gray-700">
        <TodoForm
          onSubmit={handleSubmit}
          isSubmitting={createTodo.isPending}
          submitButtonText="Create Todo"
        />
      </div>
    </Fragment>
  );
}
