"use client";
import { Suspense, useState } from "react";
import CategorySelector from "@/components/common/ledger/CategorySelector";
import DateRangeSelector from "@/components/common/ledger/DateRangeSelector";
import LedgerTable from "@/components/common/ledger/LedgerTable";
import SortSelector from "@/components/common/ledger/SortSelector";
import AddEditLedger, { formSchema, FormValues } from "./AddEditLedger";
import { toast } from "sonner";
import { categoriesSelect, ledgerEntriesSelect } from "@/db/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  categories: categoriesSelect[];
  sort: string;
  categoryId: string;
  initialEntries: ledgerEntriesSelect[];
};

const LedgerClient = ({
  categories,
  sort,
  categoryId,
  initialEntries,
}: Props) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [ledgerEntries, setLedgerEntries] =
    useState<ledgerEntriesSelect[]>(initialEntries);

  const today = new Date();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
      entryDate: new Date(),
      entryType: "expense",
      categoryId: undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const isEditing = values.entryId !== undefined;
    try {
      const url = isEditing ? `/api/ledger/${values.entryId}` : "/api/ledger";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const updatedLedger = await response.json();
        setLedgerEntries((prevLedger) => {
          if (isEditing) {
            return prevLedger.map((cat) =>
              cat.categoryId === updatedLedger.categoryId ? updatedLedger : cat,
            );
          } else {
            return [...prevLedger, updatedLedger];
          }
        });
        toast(
          isEditing ? "Entry updated successfully" : "Entry added successfully",
        );
        setIsAddDialogOpen(false);
        form.reset();
      }
    } catch (error) {
      toast(isEditing ? "Error updating entry" : "Error adding entry");
    }
  };

  const handleDeleteEntry = async (categoryId: number) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLedgerEntries((prevLedger) =>
          prevLedger.filter((cat) => cat.categoryId !== categoryId),
        );
        toast("Category deleted successfully");
      }
    } catch (error) {
      toast("Error deleting category");
    }
  };

  const openEditModal = (entry: ledgerEntriesSelect) => {
    form.reset({
      categoryId: entry.categoryId,
      description: entry.description || "",
      amount: entry.amount,
      entryDate: new Date(entry.entryDate),
      entryType: entry.entryType,
      entryId: entry.entryId,
    });
    setIsAddDialogOpen(true);
  };

  return (
    <main className="bg-gray-300 min-h-screen">
      <div className="w-full container mb-3 p-4 bg-white bg-opacity-60">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Ledger Entries</h1>
          <AddEditLedger
            editingEntry={Boolean(ledgerEntries)}
            isAddDialogOpen={isAddDialogOpen}
            setIsAddDialogOpen={setIsAddDialogOpen}
            categories={categories}
            form={form}
            onSubmit={onSubmit}
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-4 relative items-center justify-start">
          <Suspense fallback={<div>Loading...</div>}>
            Categories:{" "}
            <CategorySelector
              currentCategoryId={categoryId}
              categories={categories}
            />
            <DateRangeSelector
              initialEndDate={today.toISOString().substring(0, 10)}
              initialStartDate={thirtyDaysAgo.toISOString().substring(0, 10)}
            />
            <SortSelector
              currentSort={sort}
              showOldest={categoryId ? true : false}
            />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div>Loading entries...</div>}>
        <LedgerTable
          initialEntries={initialEntries}
          openEditModal={openEditModal}
          handleDeleteEntry={handleDeleteEntry}
        />
      </Suspense>
    </main>
  );
};

export default LedgerClient;
