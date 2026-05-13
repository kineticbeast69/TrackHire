import { NextResponse } from "next/server";
import { getSession } from "./lib/auth";
export async function proxy(request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
