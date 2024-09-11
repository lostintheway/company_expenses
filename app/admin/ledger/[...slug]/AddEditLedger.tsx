"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categoriesSelect, ledgerEntriesSelect } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Select } from "@radix-ui/react-select";
import { revalidatePath } from "next/cache";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddEditLedger({
  categories,
  currentLedgerEntry,
}: {
  categories: categoriesSelect[];
  currentLedgerEntry: ledgerEntriesSelect | null;
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ledgerEntriesSelect | null>(
    null
  );
  const [alertMessage, setAlertMessage] = useState("");

  const formSchema = z.object({
    ledgerId: z.number().optional(),
    description: z.string().min(1, "Description is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    entryDate: z.date(),
    entryType: z.enum(["income", "expense"] as const),
    categoryId: z.number().optional(),
  });

  type FormValues = z.infer<typeof formSchema>;
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
    const isEditing = values.ledgerId !== undefined;
    try {
      const url = isEditing ? `/api/ledger/${values.ledgerId}` : "/api/ledger";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        revalidatePath("/admin/ledger/[...slug]");
        setAlertMessage(
          isEditing ? "Entry updated successfully" : "Entry added successfully"
        );
        setIsAddDialogOpen(false);
        form.reset();
      }
    } catch (error) {
      setAlertMessage(
        isEditing ? "Error updating entry" : "Error adding entry"
      );
    }
  };

  return (
    <div className="absolute top-1 right-0">
      <Dialog
        open={isAddDialogOpen}
        onOpenChange={(open) => setIsAddDialogOpen(open)}
      >
        <DialogTrigger asChild>
          <Button
            className="ml-2"
            onClick={() => {
              setEditingEntry(null);
              form.reset();
            }}
          >
            + Add Entry
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby="category-form-description">
          <DialogHeader>
            <DialogTitle>
              {editingEntry ? "Edit Entry" : "Add New Entry"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      {...field}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId.toString()}
                        >
                          {category.name}
                        </option>
                      ))}
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {editingEntry ? "Update" : "Add"} Entry
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
