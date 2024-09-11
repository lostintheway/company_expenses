// app/ledger/[...slug]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getLedgerEntries } from "@/app/actions/expensesActions";
import CategorySelector from "@/components/common/expenses/CategorySelector";
import DateRangeSelector from "@/components/common/expenses/DateRangeSelector";
import LedgerEntriesList from "@/components/common/expenses/LedgerEntriesList";
import { getCategories } from "@/app/actions/categoryActions";
import SortSelector from "@/components/common/expenses/SortSelector";

export default async function LedgerPage({
  params,
}: {
  params: { slug: string[] };
}) {
  console.log({ params });

  const [sort = "latest", categoryId = ""] = params.slug;

  if (
    !["latest", "oldest"].includes(sort) ||
    (categoryId && isNaN(Number(categoryId)))
  ) {
    notFound();
  }

  const today = new Date();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const initialEntriesPromise = await getLedgerEntries({
    sort: sort as "latest" | "oldest",
    categoryId: categoryId ? Number(categoryId) : undefined,
    startDate: thirtyDaysAgo.toISOString(),
    endDate: new Date().toISOString(),
  });

  const categoriesPromise = await getCategories();

  const [initialEntries, categories] = await Promise.all([
    initialEntriesPromise,
    categoriesPromise,
  ]);

  return (
    <main className="bg-gray-300 min-h-screen p-4">
      <div className="container mb-3 mx-auto p-4 bg-white bg-opacity-60">
        <h1 className="text-2xl font-bold mb-4">Ledger Entries</h1>
        <div className="flex flex-wrap gap-4 mb-4">
          <Suspense fallback={<div>Loading...</div>}>
            <DateRangeSelector
              initialEndDate={today.toISOString()}
              initialStartDate={thirtyDaysAgo.toISOString()}
            />
            <SortSelector
              currentSort={sort}
              showOldest={categoryId ? true : false}
            />
            <CategorySelector
              currentCategoryId={categoryId}
              categories={categories}
            />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div>Loading entries...</div>}>
        <LedgerEntriesList initialEntries={initialEntries} />
      </Suspense>
    </main>
  );
}
