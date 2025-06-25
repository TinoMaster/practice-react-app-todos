import { Fragment, useMemo, useState } from "react";
import { LoadingContent } from "../components/loaders/LoadingContent";
import { DisplayError } from "../components/ui/DisplayError";
import { FilterBar } from "../components/ui/FilterBar";
import { HeaderPage } from "../components/ui/HeaderPage";
import { DisplayTodos } from "../features/todos/components/DisplayTodos";
import { useTodos } from "../hooks/useTodos";
import type { TodosQueryParams } from "../types/todo";
import { useNavigate } from "react-router-dom";
import { getTodosOrderedById } from "../utils/globals.utils";

export default function TodoList() {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const queryParams = useMemo<TodosQueryParams>(() => {
    return {
      filters: filter !== "all" ? { completed: filter === "completed" } : undefined
    };
  }, [filter]);

  const { data: todosData, isLoading, error } = useTodos(queryParams);

  const todos = useMemo(() => {
    if (!todosData) return [];
    return getTodosOrderedById(todosData);
  }, [todosData]);

  return (
    <Fragment>
      <HeaderPage
        title="Todos"
        buttonLabel="Add Todo"
        buttonAction={() => navigate("/todos/add")}
      />

      <FilterBar onFilterChange={setFilter} currentFilter={filter} />

      <DisplayTodos todos={todos} isLoading={isLoading} />

      {isLoading && <LoadingContent />}
      {error && <DisplayError error={error} />}
    </Fragment>
  );
}
