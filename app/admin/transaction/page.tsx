// app/ledger/[...slug]/page.tsx
import { notFound } from "next/navigation";
import { getCategories } from "@/app/actions/categoryActions";
import { getLedgerEntries } from "@/app/actions/ledgerActions";
import { categoriesSelect } from "@/db/schema";
import LedgerClient from "./LedgerClient";

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

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const initialEntriesPromise = await getLedgerEntries({
    sort: sort as "latest" | "oldest",
    categoryId: categoryId ? Number(categoryId) : undefined,
    startDate: searchParams.startDate || thirtyDaysAgo.toISOString(),
    endDate: searchParams.endDate || new Date().toISOString(),
  });

  const categoriesPromise: categoriesSelect[] = await getCategories();

  const [initialEntries, categories] = await Promise.all([
    initialEntriesPromise,
    categoriesPromise,
  ]);

  return (
    <LedgerClient
      categories={categories}
      categoryId={categoryId}
      initialEntries={initialEntries}
      sort={sort}
    />
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
