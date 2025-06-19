import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request) {
  const { password } = await request.json();

  if (password === process.env.APP_PASSWORD) {
    const session = process.env.SESSION_SECRET;
    const response = NextResponse.json({ success: true });
    response.headers.set(
      "Set-Cookie",
      serialize("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
      })
    );
    return response;
  }

  return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
}
