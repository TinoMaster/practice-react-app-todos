import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/todos" className="text-white text-2xl font-bold">Todo Manager</Link>
                <Link to="/users" className="text-white text-2xl font-bold">User Manager</Link>
            </div>
        </nav>
    )
}

