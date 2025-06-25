import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTodoSchema, type CreateTodoData, type Todo } from "../../../types/todo";
import { getGreaterTodoId } from "../../../utils/globals.utils";
import { useTodos } from "../../../hooks/useTodos";

interface TodoFormProps {
  initialData?: Todo;
  onSubmit: (data: CreateTodoData) => void;
  isSubmitting: boolean;
  submitButtonText?: string;
}

export const TodoForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText = "Save"
}: TodoFormProps) => {
  const todos = useTodos().data;
  const greaterTodoId = getGreaterTodoId(todos ?? []);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTodoData>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: initialData
      ? {
          userId: initialData.userId,
          title: initialData.title,
          completed: initialData.completed,
          id: initialData.id
        }
      : {
          title: "",
          completed: false,
          userId: 1,
          id: String(Number(greaterTodoId) + 1)
        }
  });

  const handleFormSubmit = async (data: CreateTodoData) => {
    const dataToSubmit = {
      ...data,
      userId: 1,
      id: String(Number(greaterTodoId) + 1)
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-2">
          Task Title
        </label>
        <div className="relative">
          <input
            id="title"
            type="text"
            {...register("title")}
            className="w-full bg-gray-700/80 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all"
            placeholder="What needs to be done?"
            autoFocus
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>
        {errors.title && (
          <p className="mt-2 text-sm text-red-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="flex items-center bg-gray-700/50 p-3 rounded-lg border border-gray-600/50">
        <input
          id="completed"
          type="checkbox"
          {...register("completed")}
          className="h-5 w-5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-gray-800 border-gray-500 rounded transition-all"
        />
        <label htmlFor="completed" className="ml-3 block text-sm font-medium text-gray-200">
          Mark as completed
        </label>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-gray-200 text-sm rounded-lg transition-all flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Cancel</span>
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-md flex items-center space-x-2 transition-all transform hover:scale-105 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{submitButtonText}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
