// app/ledger/[...slug]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategorySelector from "@/components/common/ledger/CategorySelector";
import DateRangeSelector from "@/components/common/ledger/DateRangeSelector";
import LedgerEntriesList from "@/components/common/ledger/LedgerEntriesList";
import { getCategories } from "@/app/actions/categoryActions";
import SortSelector from "@/components/common/ledger/SortSelector";
import { getLedgerEntries } from "@/app/actions/ledgerActions";
import AddEditLedger from "./AddEditLedger";

export default async function LedgerPage({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { [key: string]: string };
}) {
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
    startDate: searchParams.startDate || thirtyDaysAgo.toISOString(),
    endDate: searchParams.endDate || new Date().toISOString(),
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
        <div className="flex flex-wrap gap-4 mb-4 relative">
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
            <AddEditLedger categories={categories} currentLedgerEntry={null} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div>Loading entries...</div>}>
        <LedgerEntriesList initialEntries={initialEntries} />
      </Suspense>
    </main>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
