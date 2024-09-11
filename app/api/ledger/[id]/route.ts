// app/api/categories/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const body = await request.json();
  const { name, description } = body;

  try {
    const updatedCategory = await db
      .update(categories)
      .set({ name, description })
      .where(eq(categories.categoryId, id))
      .returning();

    return NextResponse.json(updatedCategory[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    await db.delete(categories).where(eq(categories.categoryId, id));
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 }
    );
  }
}
