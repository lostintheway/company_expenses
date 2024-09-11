import React from "react";

type SortOption = {
  label: string;
  value: string;
};

type Props = {
  options: SortOption[];
  currentSort: string;
  currentOrder: "asc" | "desc";
  onSort: (sortBy: string) => void;
};

export default function SortButton({
  options,
  currentSort,
  currentOrder,
  onSort,
}: Props) {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="sort-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Sort by:{" "}
          {options.find((option) => option.value === currentSort)?.label}
          {currentOrder === "asc" ? " ▲" : " ▼"}
        </button>
      </div>
      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="sort-menu"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onSort(option.value)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
