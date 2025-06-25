import { LoadingContent } from "../components/loaders/LoadingContent";
import { TodoItem } from "../components/TodoItem";
import { DisplayError } from "../components/ui/DisplayError";
import { FilterBar } from "../components/ui/FilterBar";
import { useTodos } from "../hooks/useTodos";

export default function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Todos</h1>

          <button
            type="button"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg flex items-center space-x-2 transition-all transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <span>Add Todo</span>
          </button>
        </div>
        <FilterBar />

        {isLoading && <LoadingContent />}

        {error && <DisplayError error={error} />}

        <div className="space-y-4">
          {todos?.length === 0 && !isLoading && (
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

          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}
