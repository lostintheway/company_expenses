// components/LedgerEntriesList.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ledgerEntriesSelect } from "@/db/schema";
import { Pencil, Trash2 } from "lucide-react";

export default function LedgerTable({
  initialEntries,
}: {
  initialEntries: ledgerEntriesSelect[];
}) {
  return (
    <div className="border bg-white bg-opacity-90 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right ">Amount</TableHead>
            <TableHead className="text-right ">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialEntries.map((entry) => (
            <TableRow key={entry.entryId}>
              <TableCell className="">{entry.entryId}</TableCell>
              <TableCell className="font-medium">{entry.description}</TableCell>
              <TableCell>
                {new Date(entry.entryDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="capitalize">{entry.entryType}</TableCell>
              <TableCell className="text-right">
                {entry.entryType === "income" ? "+" : "-"}{" "}
                {entry.amount.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  // onClick={() => openEditModal(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  // onClick={() => handleDeleteCategory(category.categoryId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
