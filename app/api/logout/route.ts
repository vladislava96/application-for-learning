import { deleteSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  await deleteSession();
  return NextResponse.json({ message: "Выход выполнен" });
}