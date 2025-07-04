import { NextResponse } from "next/server";
import { serialize } from "cookie";

const codes = [5719, 1914, 9810, 1324];

export async function POST(req) {
  const { code, room_id } = await req.json();

  if (code === `${codes[room_id - 1]}`) {
    const response = NextResponse.json({ success: true });
    response.headers.set(
      "Set-Cookie",
      serialize(`room${room_id}`, "true", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60,
      })
    );
    return response;
  }

  return NextResponse.json(
    { error: `${code} ist der falsche Code!` },
    { status: 401 }
  );
}
