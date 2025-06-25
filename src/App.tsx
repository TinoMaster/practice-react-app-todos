import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/todos" element={<TodoList />} />

        <Route path="/" element={<Navigate to="/todos" replace />} />

        <Route path="*" element={<Navigate to="/todos" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
