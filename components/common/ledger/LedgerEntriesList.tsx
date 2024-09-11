// components/LedgerEntriesList.tsx
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ledgerEntriesSelect } from "@/db/schema";

export default function LedgerEntriesList({
  initialEntries,
}: {
  initialEntries: ledgerEntriesSelect[];
}) {
  return (
    <div className="border bg-white bg-opacity-60 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
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
              <TableCell
                className={
                  entry.entryType === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {entry.entryType === "income" ? "+" : "-"}{" "}
                {entry.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
