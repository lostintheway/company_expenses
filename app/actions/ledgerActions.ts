// app/actions/ledgerActions.ts
"use server";

import { db } from "@/db";
import { ledgerEntries } from "@/db/schema";
import { desc, eq, and, gte, lte, asc, sql } from "drizzle-orm";
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

  try {
    let query = db.select().from(ledgerEntries);

    const conditions = [];

    if (categoryId) {
      conditions.push(eq(ledgerEntries.categoryId, categoryId));
    }

    if (startDate) {
      conditions.push(
        gte(
          sql`(${ledgerEntries.entryDate})`,
          sql`strftime('%s', ${startDate.substring(0, 10)})`
        )
      );
    }

    if (endDate) {
      conditions.push(
        lte(
          sql`(${ledgerEntries.entryDate})`,
          sql`strftime('%s', ${endDate.substring(0, 10)})`
        )
      );
    }
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(
      sort === "latest"
        ? desc(ledgerEntries.entryDate)
        : asc(ledgerEntries.entryDate)
    );
    // query.toSQL()
    const results = await query;

    return results;
  } catch (error) {
    console.error("Error fetching ledger entries:", error);
    throw error;
  }
}
