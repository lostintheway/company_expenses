import { z } from "zod";
import { categoriesSelect, ledgerEntriesSelect } from "@/db/schema";

export type LedgerEntryWithCategory = LedgerEntry & {
  categories: Category | null;
};

export type PageProps = {
  searchParams: {
    sortBy?: string;
    sortOrder?: string;
  };
};

export type LedgerEntriesPageProps = {
  initialEntries: ledgerEntriesSelect[];
  categories: categoriesSelect[];
};

export type Category = {
  categoryId: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type LedgerEntry = {
  entryId: number;
  userId: string;
  description: string;
  amount: number;
  entryDate: Date;
  entryType: "income" | "expense";
  categoryId: number | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};
