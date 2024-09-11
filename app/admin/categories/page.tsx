import { db } from "@/db/index";
import { categories } from "@/db/schema";
import { asc } from "drizzle-orm";
import CategoriesClient from "./CategoriesClient";
import { unstable_noStore } from "next/cache";

async function getCategories() {
  unstable_noStore();
  return db.select().from(categories).orderBy(asc(categories.createdAt));
}

export default async function CategoriesPage() {
  const initialCategories = await getCategories();

  return <CategoriesClient initialCategories={initialCategories} />;
}
