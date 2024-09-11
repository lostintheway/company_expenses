import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { ledgerEntries, ledgerEntriesInsert } from "@/db/schema";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    amount,
    description,
    categoryId,
    entryDate,
    entryType,
    userId,
    createdAt,
    entryId,
    imageUrl,
    updatedAt,
  }: ledgerEntriesInsert = body;

  try {
    const newLedger = await db
      .insert(ledgerEntries)
      .values({
        amount,
        description,
        categoryId,
        entryDate,
        entryType,
        userId: userId,
        createdAt: Date.now(),
        entryId,
        imageUrl,
        updatedAt,
      })
      .returning();

    return NextResponse.json(newLedger[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating Ledger" },
      { status: 500 }
    );
  }
}
