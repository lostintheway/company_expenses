"use client";
// components/common/expenses/CategorySelector.tsx

import { useRouter, usePathname } from "next/navigation";
import EnhancedSelect from "../EnhancedSelect";

export default function CategorySelector({
  currentCategoryId,
  categories,
}: {
  currentCategoryId: string;
  categories: any[];
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
    <EnhancedSelect
      value={currentCategoryId}
      onChange={handleChange}
      categories={categories}
    />
  );
}
