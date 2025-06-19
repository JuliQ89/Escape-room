import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  const expiredCookie = serialize("session", "", {
    httpOnly: true,
    path: "/",
    maxAge: -1,
  });

  for (let i = 1; i <= 4; i++) {
    const expiredRoom = serialize(`room${i}`, "", {
      httpOnly: true,
      path: "/",
      maxAge: -1,
    });
    response.headers.append("Set-Cookie", expiredRoom);
  }
  response.headers.append("Set-Cookie", expiredCookie);
  return response;
}
