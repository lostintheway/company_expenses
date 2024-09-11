"use client";
// components/common/expenses/CategorySelector.tsx

import { categoriesSelect } from "@/db/schema";
import { useRouter, usePathname } from "next/navigation";

export default function CategorySelector({
  currentCategoryId,
  categories,
}: {
  currentCategoryId: string;
  categories: categoriesSelect[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  //   const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryId = e.target.value;
    const mainUrl = pathname.substring(0, 20);
    const newPathname = mainUrl + "/" + newCategoryId;
    router.push(`${newPathname}`);
  };

  return (
    <select
      value={currentCategoryId}
      onChange={handleChange}
      className="block w-auto mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.categoryId} value={category.categoryId}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
