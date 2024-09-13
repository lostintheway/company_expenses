"use client";
import { CategoriesTable } from "./CategoriesTable";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { categoriesSelect } from "@/db/schema";
import AddEditCategory from "./AddEditCategory";

type CategoriesClientProps = {
  initialCategories: categoriesSelect[];
};

const formSchema = z.object({
  categoryId: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export default function CategoriesClient({
  initialCategories,
}: CategoriesClientProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [categories, setCategories] = useState(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
                : cat,
            );
          } else {
            return [...prevCategories, updatedCategory];
          }
        });
        setAlertMessage(
          isEditing
            ? "Category updated successfully"
            : "Category added successfully",
        );
        setIsDialogOpen(false);
        form.reset();
      }
    } catch (error) {
      setAlertMessage(
        isEditing ? "Error updating category" : "Error adding category",
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
          prevCategories.filter((cat) => cat.categoryId !== categoryId),
        );
        setAlertMessage("Category deleted successfully");
      }
    } catch (error) {
      setAlertMessage("Error deleting category");
    }
  };

  const openEditModal = (category: categoriesSelect) => {
    form.reset({
      categoryId: category.categoryId,
      name: category.name,
      description: category.description || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container">
      <Card className="bg-white bg-opacity-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <AddEditCategory
              form={form}
              onSubmit={onSubmit}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
            />
          </div>

          {alertMessage && (
            <Alert className="mb-4">
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          )}

          <CategoriesTable
            categories={categories}
            openEditModal={openEditModal}
            handleDeleteCategory={handleDeleteCategory}
          />
        </CardContent>
      </Card>
    </div>
  );
}
