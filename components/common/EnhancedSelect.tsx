import { categoriesSelect } from "@/db/schema";
import React from "react";

const EnhancedSelect = ({
  value,
  onChange,
  categories,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: categoriesSelect[];
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`block w-auto px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 
            rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-200 
            focus:border-indigo-200 transition duration-150 ease-in-out hover:border-gray-400 shadow-sm`}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default EnhancedSelect;
