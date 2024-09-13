// app/api/ledgerEntries/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { ledgerEntries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  const body = await request.json();
  const { amount, description, categoryId, entryDate, entryType } = body;

  try {
    const updatedLedger = await db
      .update(ledgerEntries)
      .set({
        amount,
        categoryId,
        description,
        entryDate,
        userId: user.id,
        entryType,
        updatedAt: Date.now(),
      })
      .where(eq(ledgerEntries.categoryId, id))
      .returning();

    return NextResponse.json(updatedLedger[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating Entry" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id);

  try {
    await db.delete(ledgerEntries).where(eq(ledgerEntries.categoryId, id));
    return NextResponse.json({ message: "Entry deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting Entry" },
      { status: 500 },
    );
  }
}
