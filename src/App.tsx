import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import TodoAdd from "./pages/TodoAdd";
import TodoDetail from "./pages/TodoDetail";
import TodoEdit from "./pages/TodoEdit";
import TodoList from "./pages/TodoList";
import TodoLayout from "./components/layouts/TodoLayout";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/todos" element={<TodoLayout />}>
          <Route index element={<TodoList />} />
          <Route path=":id" element={<TodoDetail />} />
          <Route path="edit/:id" element={<TodoEdit />} />
          <Route path="add" element={<TodoAdd />} />
        </Route>

        {/* <Route path="/users" element={<UserLayout />}>
          <Route index element={<UserList />} />
          <Route path=":id" element={<UserDetail />} />
          <Route path="edit/:id" element={<UserEdit />} />
          <Route path="add" element={<UserAdd />} />
        </Route> */}

        <Route path="/" element={<Navigate to="/todos" replace />} />

        <Route path="*" element={<Navigate to="/todos" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
