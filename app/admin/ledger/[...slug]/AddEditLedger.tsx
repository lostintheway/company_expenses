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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { categoriesSelect, ledgerEntriesSelect } from "@/db/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";

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
        body: JSON.stringify({
          ...values,
          entryDate: values.entryDate,
        }),
      });

      if (response.ok) {
        revalidatePath("/admin/ledger/[...slug]", "page");
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
    <div className="">
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
            <Plus className="mr-2 h-4 w-4" /> Add Entry
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
                    <Input
                      className="bg-white bg-opacity-60 shadow"
                      {...field}
                    />
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
                      className="bg-white bg-opacity-60 shadow"
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
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "bg-white bg-opacity-60 w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString("en-UK", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="entryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Type
                    </FormLabel>
                    <select
                      {...field}
                      className={`bg-white bg-opacity-70 py-1 px-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 
                        focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 
                        dark:border-gray-600 dark:text-white`}
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Category
                    </FormLabel>
                    <select
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      className="bg-white bg-opacity-70 py-1 px-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                    </select>
                    <FormMessage className="text-sm text-red-500" />
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
