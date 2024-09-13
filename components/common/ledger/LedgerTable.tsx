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
import { Pencil } from "lucide-react";
import DeleteAlertDialog from "../DeleteAlertDialog";

type Props = {
  initialEntries: ledgerEntriesSelect[];
  openEditModal: (category: ledgerEntriesSelect) => void;
  handleDeleteEntry: (categoryId: number) => Promise<void>;
};

export default function LedgerTable({
  initialEntries,
  openEditModal,
  handleDeleteEntry,
}: Props) {
  return (
    <div className="border bg-white bg-opacity-90 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialEntries.map((entry) => (
            <TableRow key={entry.entryId}>
              <TableCell>{entry.entryId}</TableCell>
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
                  onClick={() => openEditModal(entry)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <DeleteAlertDialog
                  onDelete={() => handleDeleteEntry(entry.entryId)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
