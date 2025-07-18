import { NextRequest } from "next/server";

export function getUserFromHeaders(request: NextRequest): {
  userId: string;
} {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return { userId };
}
