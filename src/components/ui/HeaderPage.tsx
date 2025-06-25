interface HeaderPageProps {
  title: string;
  buttonLabel: string;
  buttonAction: () => void;
}

export const HeaderPage = ({ title, buttonLabel, buttonAction }: HeaderPageProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>

      <button
        type="button"
        onClick={buttonAction}
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
        <span>{buttonLabel}</span>
      </button>
    </div>
  );
};
