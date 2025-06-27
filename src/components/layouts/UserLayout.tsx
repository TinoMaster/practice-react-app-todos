import { Outlet } from "react-router-dom";


export default function UserLayout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
}