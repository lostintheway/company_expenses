import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { validateRequest } from "@/lib/auth";
import { ledgerEntries } from "@/db/schema";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  const body = await request.json();
  const { amount, description, categoryId, entryDate, entryType } = body;

  try {
    //log query

    const newLedger = await db
      .insert(ledgerEntries)
      .values({
        amount: amount as number,
        description: description as string,
        categoryId,
        entryDate: Date.parse(entryDate),
        userId: user.id,
        imageUrl: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        entryType,
      })
      .returning();
    // console.log({ newLedger });

    // revalidatePath("/admin/ledger/[...slug]", "page");

    return NextResponse.json(newLedger[0]);
  } catch (error) {
    console.log({ error });

    return NextResponse.json(
      { error: "Error creating Ledger" },
      { status: 500 }
    );
  }
}
