import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./CategoriesClient";

export type setBool = React.Dispatch<React.SetStateAction<boolean>>;

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: setBool;
  form: UseFormReturn<
    {
      name: string;
      categoryId?: number | undefined;
      description?: string | undefined;
    },
    any,
    undefined
  >;
  onSubmit: (values: FormValues) => Promise<void>;
};

export default function AddEditCategory({
  isDialogOpen,
  setIsDialogOpen,
  form,
  onSubmit,
}: Props) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-4"
          onClick={() => {
            form.reset({
              name: "",
              description: "",
            });
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white bg-opacity-60"
                      placeholder="Category Name"
                      {...field}
                    />
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
                      className="bg-white bg-opacity-60"
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
  );
}
