import { useNavigate } from "react-router-dom";

interface HeaderPageDetailProps {
  title: string;
  backUrl?: string;
}

export const HeaderPageDetail = ({ title, backUrl }: HeaderPageDetailProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>

      <button
        type="button"
        onClick={() => navigate(backUrl ?? "/")}
        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg flex items-center space-x-2 transition-all transform hover:scale-105"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        <span>Back to List</span>
      </button>
    </div>
  );
};
