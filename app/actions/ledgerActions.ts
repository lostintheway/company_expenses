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
    let query: any = db.select().from(ledgerEntries);

    const conditions = [];

    if (categoryId) {
      conditions.push(eq(ledgerEntries.categoryId, categoryId));
    }

    if (startDate && endDate) {
      const startOfDay = `${startDate.substring(0, 10)}T00:00:00.000Z`;
      const endOfDay = `${endDate.substring(0, 10)}T23:59:59.999Z`;

      conditions.push(
        and(
          gte(
            sql`(${ledgerEntries.entryDate})`,
            sql`strftime('%s', ${startOfDay}) * 1000`
          ),
          lte(
            sql`(${ledgerEntries.entryDate})`,
            sql`strftime('%s', ${endOfDay}) * 1000`
          )
        )
      );
    }
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(
      sort === "latest"
        ? desc(ledgerEntries.entryId)
        : asc(ledgerEntries.entryId)
    );
    console.log(query.toSQL());
    const results = await query;

    return results;
  } catch (error) {
    console.error("Error fetching ledger entries:", error);
    throw error;
  }
}
