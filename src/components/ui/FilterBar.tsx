interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

export const FilterBar = ({ onFilterChange, currentFilter }: FilterBarProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <h2 className="text-lg font-medium text-gray-200">Filter todos</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => onFilterChange("all")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentFilter === "all"
                ? "bg-gray-700 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700/70"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onFilterChange("active")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentFilter === "active"
                ? "bg-gray-700 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700/70"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => onFilterChange("completed")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentFilter === "completed"
                ? "bg-gray-700 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700/70"
            }`}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};
