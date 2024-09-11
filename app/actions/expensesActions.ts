// app/actions/ledgerActions.ts
"use server";

import { db } from "@/db";
import { ledgerEntries } from "@/db/schema";
import { desc, eq, and, gte, lte } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

interface GetLedgerEntriesParams {
  sort?: "latest" | "oldest";
  categoryId?: number;
  startDate?: string;
  endDate?: string;
}

export async function getLedgerEntries({
  sort = "latest",
  categoryId,
  startDate,
  endDate,
}: GetLedgerEntriesParams) {
  unstable_noStore();
  // console.log({ sort, categoryId, startDate, endDate });
  let query = db.select().from(ledgerEntries);

  if (categoryId) {
    query = query.where(eq(ledgerEntries.categoryId, categoryId));
  }

  if (startDate && endDate) {
    query = query.where(
      and(
        gte(ledgerEntries.entryDate, new Date(startDate)),
        lte(ledgerEntries.entryDate, new Date(endDate))
      )
    );
  }

  query = query.orderBy(
    sort === "latest" ? desc(ledgerEntries.entryDate) : ledgerEntries.entryDate
  );

  return await query;
}
