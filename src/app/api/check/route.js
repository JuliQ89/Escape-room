import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { room_id } = await req.json();
  const c = await cookies();
  for (let i = 1; i < room_id; i++) {
    const room = c.get(`room${i}`)?.value;
    if (room != "true") {
      return NextResponse.json({ success: false, room: i });
    }
  }

  return NextResponse.json({ success: true });
}
