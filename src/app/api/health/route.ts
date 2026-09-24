import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "Bickri AI Studio",
    version: "0.1.0"
  });
}
