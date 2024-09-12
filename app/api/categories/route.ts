import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { categories } from "@/db/schema";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description } = body;

  try {
    const newCategory = await db
      .insert(categories)
      .values({
        name,
        description,
        updatedAt: Date.now(),
        createdAt: Date.now(),
      })
      .returning();

    return NextResponse.json(newCategory[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating category" },
      { status: 500 }
    );
  }
}
