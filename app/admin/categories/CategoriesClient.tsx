"use client";
import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

type Category = {
  categoryId: number;
  name: string;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type CategoriesClientProps = {
  initialCategories: Category[];
};

const formSchema = z.object({
  categoryId: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CategoriesClient({
  initialCategories,
}: CategoriesClientProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const isEditing = values.categoryId !== undefined;
    try {
      const url = isEditing
        ? `/api/categories/${values.categoryId}`
        : "/api/categories";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        setCategories((prevCategories) => {
          if (isEditing) {
            return prevCategories.map((cat) =>
              cat.categoryId === updatedCategory.categoryId
                ? updatedCategory
                : cat
            );
          } else {
            return [...prevCategories, updatedCategory];
          }
        });
        setAlertMessage(
          isEditing
            ? "Category updated successfully"
            : "Category added successfully"
        );
        setIsDialogOpen(false);
        form.reset();
      }
    } catch (error) {
      setAlertMessage(
        isEditing ? "Error updating category" : "Error adding category"
      );
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.categoryId !== categoryId)
        );
        setAlertMessage("Category deleted successfully");
      }
    } catch (error) {
      setAlertMessage("Error deleting category");
    }
  };

  const openEditModal = (category: Category) => {
    form.reset({
      categoryId: category.categoryId,
      name: category.name,
      description: category.description || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="bg-white bg-opacity-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="mb-4"
                  onClick={() => {
                    form.reset({ name: "", description: "" });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby="category-form-description">
                <DialogHeader>
                  <DialogTitle>
                    {form.getValues("categoryId")
                      ? "Edit Category"
                      : "Add New Category"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Category Name" {...field} />
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
                            <Textarea
                              placeholder="Category Description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">
                      {form.getValues("categoryId") ? "Update" : "Add"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {alertMessage && (
            <Alert className="mb-4">
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          )}

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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCategory(category.categoryId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
