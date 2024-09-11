// app/actions/categoryActions.ts
"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { unstable_noStore } from "next/cache";

export async function getCategories() {
  unstable_noStore();
  return await db.select().from(categories).orderBy(categories.name);
}
