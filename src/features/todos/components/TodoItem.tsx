import { useUpdateTodo, useDeleteTodo } from "../../../hooks/useTodos";
import type { Todo } from "../../../types/todo";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const navigate = useNavigate();
  const { mutate: updateTodo, isPending: isLoading } = useUpdateTodo();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  const handleToggle = () => {
    updateTodo({ id: Number(todo.id), data: { completed: !todo.completed } });
  };

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que deseas eliminar la tarea "${todo.title}"?`)) {
      deleteTodo(Number(todo.id));
    }
  };

  const handleEdit = () => {
    navigate(`/todos/edit/${todo.id}`);
  };

  const handleView = () => {
    navigate(`/todos/${todo.id}`);
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md border transition-all transform ${
        isLoading ? "opacity-70" : "opacity-100"
      } ${
        todo.completed
          ? "bg-gradient-to-r from-green-900/50 to-green-800/50 border-green-700/50 text-gray-100"
          : "bg-gray-800/80 border-gray-700 text-gray-100"
      } ${isLoading ? "animate-pulse" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleToggle}
            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            className={`relative w-5 h-5 flex items-center justify-center rounded-full transition-all ${
              isLoading ? "animate-pulse" : ""
            } ${
              todo.completed
                ? "bg-emerald-500 hover:bg-emerald-600 ring-2 ring-emerald-700"
                : "bg-gray-600 hover:bg-gray-500 ring-2 ring-gray-700"
            }`}
          >
            {todo.completed && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            )}
            {isLoading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="animate-ping absolute h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
              </span>
            )}
          </button>
          <span
            className={`text-sm md:text-base font-medium transition-all ${
              todo.completed ? "line-through text-gray-400" : "text-gray-100"
            }`}
          >
            {todo.title}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Botón para marcar/desmarcar como completado */}
          <button
            type="button"
            disabled={isLoading}
            onClick={handleToggle}
            title={todo.completed ? "Marcar como incompleta" : "Marcar como completada"}
            className={`p-1.5 rounded-full transition-all border ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
            } ${
              todo.completed ? "border-amber-500 text-gray-300" : "border-emerald-500 text-gray-300"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-3.5 w-3.5 border-2 border-t-transparent rounded-full"></div>
              </div>
            ) : todo.completed ? (
              <FaTimes size={12} />
            ) : (
              <FaCheck size={12} />
            )}
          </button>

          {/* Botón para ver detalles */}
          <button
            type="button"
            onClick={handleView}
            title="Ver detalles"
            className="p-1.5 text-gray-300 bg-black/20 shadow-sm hover:bg-gray-700 hover:text-gray-100 rounded-full transition-all"
          >
            <FaEye size={12} />
          </button>

          {/* Botón para editar */}
          <button
            type="button"
            onClick={handleEdit}
            title="Editar tarea"
            className="p-1.5 text-gray-300 bg-black/20 shadow-sm hover:bg-gray-700 hover:text-gray-100 rounded-full transition-all"
          >
            <FaEdit size={12} />
          </button>

          {/* Botón para eliminar */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Eliminar tarea"
            className={`p-1.5 text-gray-300 bg-black/20 shadow-sm hover:bg-gray-700 hover:text-gray-100 rounded-full transition-all ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaTrashAlt size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
