import DeleteAlertDialog from "@/components/common/DeleteAlertDialog";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { categoriesSelect } from "@/db/schema";
import { Pencil, Trash2 } from "lucide-react";

export function CategoriesTable({
  categories,
  openEditModal,
  handleDeleteCategory,
}: {
  categories: categoriesSelect[];
  openEditModal: (category: categoriesSelect) => void;
  handleDeleteCategory: (categoryId: number) => Promise<void>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.categoryId}>
            <TableCell>{category.categoryId}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openEditModal(category)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              {/* <DeleteAlertDialog
                onDelete={() => handleDeleteCategory(category.categoryId)}
              /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
