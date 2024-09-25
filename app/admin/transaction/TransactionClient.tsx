import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ledgerEntriesInsert } from "@/db/schema";

const accountTypes = [
  "ASSET",
  "LIABILITY",
  "EQUITY",
  "REVENUE",
  "EXPENSE",
] as const;

const schema = z.object({
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  debitAccountType: z.enum(accountTypes, {
    required_error: "Debit account type is required",
  }),
  debitAccountName: z.string().min(1, "Debit account name is required"),
  creditAccountType: z.enum(accountTypes, {
    required_error: "Credit account type is required",
  }),
  creditAccountName: z.string().min(1, "Credit account name is required"),
});

const LedgerEntryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: 0,
      debitAccountType: undefined,
      debitAccountName: "",
      creditAccountType: undefined,
      creditAccountName: "",
    },
  });

  const onSubmit = async (data: ledgerEntriesInsert) => {
    setIsSubmitting(true);
    try {
      const ledgerEntries = [
        {
          date: data.date,
          description: data.description,
          accountType: data.debitAccountType,
          accountName: data.debitAccountName,
          debit: data.amount,
          credit: 0,
        },
        {
          date: data.date,
          description: data.description,
          accountType: data.creditAccountType,
          accountName: data.creditAccountName,
          debit: 0,
          credit: data.amount,
        },
      ];

      const ledgerResponse = await fetch("/api/ledger-entries/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ledgerEntries),
      });

      if (!ledgerResponse.ok)
        throw new Error("Failed to submit ledger entries");

      const trialBalanceResponse = await fetch(
        "/api/recalculate-trial-balance",
        {
          method: "POST",
        }
      );

      if (!trialBalanceResponse.ok)
        throw new Error("Failed to recalculate trial balance");

      alert("Ledger entries submitted and trial balance updated successfully!");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="debitAccountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Debit Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select debit account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="debitAccountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Debit Account Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creditAccountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credit Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select credit account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creditAccountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credit Account Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Ledger Entries"}
        </Button>
      </form>
    </Form>
  );
};

export default LedgerEntryForm;
