import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const response = NextResponse.next();
  return response;
}


