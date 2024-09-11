import { db } from "@/db/index";
import { categories } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import CategoriesClient from "./CategoriesClient";

async function getCategories() {
  return db.select().from(categories).orderBy(asc(categories.createdAt));
}

export default async function CategoriesPage() {
  const initialCategories = await getCategories();

  return <CategoriesClient initialCategories={initialCategories} />;
}
