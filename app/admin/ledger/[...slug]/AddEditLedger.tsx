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
import { Calendar as CalendarIcon } from "lucide-react";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { setBool } from "../../categories/AddEditCategory";

type Props = {
  categories: categoriesSelect[];
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: setBool;
  editingEntry: boolean;
  // currentLedgerEntry: ledgerEntriesSelect | null;
  form: UseFormReturn<FormValues, any, undefined>;
  onSubmit: (values: FormValues) => Promise<void>;
};

export const formSchema = z.object({
  entryId: z.number().optional(),
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  entryDate: z.date(),
  entryType: z.enum(["income", "expense"] as const),
  categoryId: z.number().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export default function AddEditLedger({
  categories,
  form,
  isAddDialogOpen,
  setIsAddDialogOpen,
  onSubmit,
  editingEntry,
}: Props) {
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
                              !field.value && "text-muted-foreground",
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
                          e.target.value ? parseInt(e.target.value) : undefined,
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
