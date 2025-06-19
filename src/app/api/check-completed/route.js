import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const c = await cookies();
  for (let i = 1; i <= 4; i++) {
    const room = c.get(`room${i}`)?.value;
    if (room != "true") {
      return NextResponse.json({ completed: false, room: i });
    }
  }

  return NextResponse.json({ completed: true });
}
