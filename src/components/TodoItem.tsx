import { useUpdateTodo } from "../hooks/useTodos";
import type { Todo } from "../types/todo";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const { mutate: updateTodo, isPending: isLoading } = useUpdateTodo();

  const handleToggle = () => {
    updateTodo({ id: todo.id, data: { completed: !todo.completed } });
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

        <button
          type="button"
          disabled={isLoading}
          onClick={handleToggle}
          className={`ml-4 px-3 py-1 text-xs font-medium rounded-md transition-all ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } ${
            todo.completed
              ? "bg-amber-700 hover:bg-amber-800 text-gray-100"
              : "bg-emerald-700 hover:bg-emerald-800 text-gray-100"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-1">
              <svg
                className="animate-spin h-3 w-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Updating</span>
            </div>
          ) : todo.completed ? (
            "Mark Incomplete"
          ) : (
            "Mark Complete"
          )}
        </button>
      </div>
    </div>
  );
};
